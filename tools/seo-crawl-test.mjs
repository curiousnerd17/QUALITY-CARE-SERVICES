#!/usr/bin/env node
/**
 * seo-crawl-test.mjs — internal crawl-architecture regression test.
 *
 * Zero dependencies, no network, no external APIs. Run from the repo root:
 *     node tools/seo-crawl-test.mjs            # assert (exit 1 on failure)
 *     node tools/seo-crawl-test.mjs --report   # print the full crawl graph
 *
 * Guards the invariants established 2026-09: sitemap completeness, canonical
 * correctness, no broken internal links, no stray noindex, and the internal
 * link architecture that makes the local-intent pages discoverable.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, dirname, posix } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const ORIGIN = 'https://qualitycareservices.in';
const SKIP = new Set(['.git', 'docs', 'evidence', 'node_modules', '.netlify', '.claude', '.vscode', 'assets', 'images', 'tools']);
const MAX_DEPTH = 3;          // homepage crawl depth ceiling
const MIN_NEAR_ME_INBOUND = 3; // contextual inbound links per near-me page

const SERVICES = ['patient-care', 'elder-care', 'mother-newborn-care', 'child-care',
                  'maid-services', 'home-cook-services', 'housekeeping-cleaning'];

/* ---------- collect files ---------- */
function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (SKIP.has(name)) continue;
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (name.endsWith('.html')) out.push(relative(ROOT, full).split('\\').join('/'));
  }
  return out;
}

/** Map a file path to its canonical public route (mirrors netlify.toml rules). */
function fileToRoute(rel) {
  if (rel === 'index.html') return '/';
  if (rel === '404.html') return '/404.html';
  if (rel === 'privacy-policy.html') return '/privacy-policy';
  if (rel.startsWith('services/') && rel.endsWith('.html') && rel !== 'services/index.html')
    return '/' + rel.slice(0, -5);
  if (rel.endsWith('/index.html')) return '/' + rel.slice(0, -'index.html'.length);
  return '/' + rel;
}

/** Normalise an href to its canonical route form. */
function canonicalise(href) {
  let h = href;
  if (h.endsWith('/index.html')) h = h.slice(0, -'index.html'.length);
  if (h.startsWith('/services/') && h.endsWith('.html')) h = h.slice(0, -5);
  if (h === '/privacy-policy.html') h = '/privacy-policy';
  return h;
}

const files = walk(ROOT).sort();
const routes = new Map();               // route -> file
for (const f of files) routes.set(fileToRoute(f), f);

/* ---------- parse ---------- */
const LINK = /<a\b[^>]*?href\s*=\s*["']([^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi;
const ZONE = /<(\/?)(header|footer|nav)\b/gi;
const CANON = /<link[^>]+rel=["']canonical["'][^>]*href=["']([^"']+)["']/i;
const ROBOTS = /<meta[^>]+name=["']robots["'][^>]*content=["']([^"']+)["']/i;

const inbound = new Map();  // route -> [{src, anchor, zone}]
const edges = new Map();    // route -> Set(route)
const canonical = new Map();
const metaRobots = new Map();
const broken = [], nonCanonicalHref = [], emptyAnchor = [];

for (const [route, file] of routes) {
  const raw = readFileSync(join(ROOT, file), 'utf8');
  canonical.set(route, (raw.match(CANON) || [])[1] || null);
  metaRobots.set(route, (raw.match(ROBOTS) || [])[1] || null);

  // spans covered by header/footer/nav = "template" links
  const spans = []; let depth = 0, start = null; ZONE.lastIndex = 0;
  for (let m; (m = ZONE.exec(raw));) {
    if (m[1] === '') { if (depth === 0) start = m.index; depth++; }
    else { depth--; if (depth === 0 && start !== null) { spans.push([start, m.index]); start = null; } if (depth < 0) depth = 0; }
  }
  const zoneOf = (p) => spans.some(([a, b]) => p >= a && p <= b) ? 'template' : 'content';

  LINK.lastIndex = 0;
  for (let m; (m = LINK.exec(raw));) {
    let h = m[1].trim();
    if (!h || /^(tel:|mailto:|javascript:|#)/i.test(h)) continue;
    if (h.startsWith(ORIGIN)) h = h.slice(ORIGIN.length) || '/';
    else if (/^https?:\/\//i.test(h)) continue;              // external, out of scope
    h = h.split('#')[0].split('?')[0];
    if (!h) continue;
    if (!h.startsWith('/')) h = posix.normalize(posix.join(posix.dirname(route.replace(/\/$/, '')) || '/', h));
    const target = canonicalise(h);
    if (target !== h) nonCanonicalHref.push(`${route} -> ${h}`);
    if (!routes.has(target)) { broken.push(`${route} -> ${h}`); continue; }
    if (target === route) continue;
    const text = m[2].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    if (!text) emptyAnchor.push(`${route} -> ${target}`);
    if (!inbound.has(target)) inbound.set(target, []);
    inbound.get(target).push({ src: route, anchor: text, zone: zoneOf(m.index) });
    if (!edges.has(route)) edges.set(route, new Set());
    edges.get(route).add(target);
  }
}

/* ---------- crawl depth (BFS from homepage) ---------- */
const depthOf = new Map([['/', 0]]);
for (const queue = ['/']; queue.length;) {
  const cur = queue.shift();
  for (const next of edges.get(cur) || []) {
    if (!depthOf.has(next)) { depthOf.set(next, depthOf.get(cur) + 1); queue.push(next); }
  }
}

/* ---------- sitemap ---------- */
const sitemapRaw = readFileSync(join(ROOT, 'sitemap.xml'), 'utf8');
const sitemapRoutes = new Set([...sitemapRaw.matchAll(/<loc>([^<]+)<\/loc>/g)]
  .map(m => m[1].replace(ORIGIN, '') || '/'));

const indexable = [...routes.keys()].filter(r => r !== '/404.html');
const contentInbound = (r) => (inbound.get(r) || []).filter(x => x.zone === 'content');
const linksFrom = (src, tgt) => (inbound.get(tgt) || []).some(x => x.src === src);

/* ---------- report mode ---------- */
if (process.argv.includes('--report')) {
  console.log(`ROUTE                                                            CONT TMPL DEPTH SITEMAP`);
  for (const r of [...routes.keys()].sort()) {
    const ib = inbound.get(r) || [];
    const c = ib.filter(x => x.zone === 'content').length;
    console.log(`${r.padEnd(64)} ${String(c).padStart(4)} ${String(ib.length - c).padStart(4)} ${String(depthOf.get(r) ?? '-').padStart(5)} ${sitemapRoutes.has(r) ? 'yes' : 'no'}`);
  }
  console.log(`\nroutes=${routes.size} indexable=${indexable.length} sitemap=${sitemapRoutes.size}`);
}

/* ---------- assertions ---------- */
const failures = [];
const check = (name, ok, detail = '') => {
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${ok || !detail ? '' : ' — ' + detail}`);
  if (!ok) failures.push(name);
};

check('sitemap covers every indexable page',
  indexable.every(r => sitemapRoutes.has(r)),
  indexable.filter(r => !sitemapRoutes.has(r)).join(', '));

check('every sitemap URL resolves to a real page',
  [...sitemapRoutes].every(r => routes.has(r)),
  [...sitemapRoutes].filter(r => !routes.has(r)).join(', '));

check('404 page is excluded from the sitemap', !sitemapRoutes.has('/404.html'));

check('no broken internal links', broken.length === 0, broken.slice(0, 10).join(', '));

check('no internal link uses a non-canonical URL form',
  nonCanonicalHref.length === 0, nonCanonicalHref.slice(0, 10).join(', '));

check('no empty anchor text on internal links',
  emptyAnchor.length === 0, emptyAnchor.slice(0, 5).join(', '));

check('no accidental noindex outside 404.html',
  indexable.every(r => !/noindex/i.test(metaRobots.get(r) || '')),
  indexable.filter(r => /noindex/i.test(metaRobots.get(r) || '')).join(', '));

check('404.html is noindex', /noindex/i.test(metaRobots.get('/404.html') || ''));

check('every indexable page has a correct self-referencing canonical',
  indexable.every(r => canonical.get(r) === ORIGIN + r),
  indexable.filter(r => canonical.get(r) !== ORIGIN + r).map(r => `${r} => ${canonical.get(r)}`).slice(0, 5).join(', '));

check('every indexable page has at least 1 inbound internal link',
  indexable.every(r => r === '/' || (inbound.get(r) || []).length >= 1),
  indexable.filter(r => r !== '/' && !(inbound.get(r) || []).length).join(', '));

for (const s of SERVICES) {
  const near = `/${s}-near-me/`;
  check(`${near} has >= ${MIN_NEAR_ME_INBOUND} contextual inbound links`,
    contentInbound(near).length >= MIN_NEAR_ME_INBOUND,
    `found ${contentInbound(near).length} from [${contentInbound(near).map(x => x.src).join(', ')}]`);
  check(`/services/${s} links to ${near}`, linksFrom(`/services/${s}`, near));
  check(`homepage links to ${near}`, linksFrom('/', near));
  check(`/services/ hub links to ${near}`, linksFrom('/services/', near));
}

for (const s of SERVICES) {
  const hub = `/knowledge/${s}/`;
  const articles = [...routes.keys()].filter(r => r.startsWith(hub) && r !== hub);
  check(`${hub} links to all ${articles.length} of its articles`,
    articles.length > 0 && articles.every(a => linksFrom(hub, a)),
    articles.filter(a => !linksFrom(hub, a)).join(', '));
}

check('no "Read the guide" placeholder anchors remain',
  ![...inbound.values()].flat().some(x => /^read the guide$/i.test(x.anchor)));

const deepest = Math.max(...indexable.map(r => depthOf.get(r) ?? Infinity));
check(`every indexable page is within ${MAX_DEPTH} clicks of the homepage`,
  deepest <= MAX_DEPTH, `deepest = ${deepest}`);

check('robots.txt allows crawling and declares the sitemap', (() => {
  const t = readFileSync(join(ROOT, 'robots.txt'), 'utf8');
  return /User-agent:\s*\*/i.test(t) && /Allow:\s*\//i.test(t)
      && t.includes(`Sitemap: ${ORIGIN}/sitemap.xml`) && !/^\s*Disallow:\s*\/\s*$/im.test(t);
})());

console.log(`\n${failures.length ? `FAILED (${failures.length})` : 'ALL CHECKS PASSED'} — ${indexable.length} indexable pages, deepest ${deepest} clicks`);
process.exit(failures.length ? 1 : 0);
