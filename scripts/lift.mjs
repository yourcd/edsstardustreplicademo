// Ad-hoc CSS-lift probe: computed styles for key elements at a given width.
import { chromium } from 'playwright';

const url = process.argv[2] || 'https://indiauncharted.com/';
const width = +(process.argv[3] || 1440);
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

const b = await chromium.launch();
const ctx = await b.newContext({
  viewport: { width, height: 900 }, deviceScaleFactor: 1, userAgent: UA,
  extraHTTPHeaders: { 'Accept-Language': 'en-US,en;q=0.9' },
});
const p = await ctx.newPage();
await p.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
await p.waitForTimeout(2500);

const data = await p.evaluate(() => {
  const pick = (el, props) => {
    if (!el) return null;
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    const o = { rect: { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) } };
    props.forEach((pr) => { o[pr] = cs.getPropertyValue(pr); });
    return o;
  };
  const type = ['font-family', 'font-size', 'font-weight', 'line-height', 'letter-spacing', 'color', 'text-transform', 'text-align'];
  const box = ['padding', 'margin', 'background-color', 'border-radius', 'max-width', 'width', 'box-shadow'];
  const q = (s) => document.querySelector(s);
  const qa = (s) => [...document.querySelectorAll(s)];
  const out = {};
  // headers / nav
  out.header = pick(q('header, .site-header, #masthead, .header'), box);
  // hero
  const h1 = q('h1');
  out.h1 = h1 ? { ...pick(h1, type), text: h1.innerText.slice(0, 60) } : null;
  // section titles h2
  out.h2s = qa('h2').slice(0, 6).map((h) => ({ ...pick(h, type), text: h.innerText.slice(0, 40) }));
  // a section title
  // buttons
  const btn = qa('a, button').find((a) => /explore|enquire|send|discover|view all/i.test(a.innerText));
  out.button = btn ? { ...pick(btn, [...type, ...box]), text: btn.innerText.slice(0, 30) } : null;
  // body paragraph
  out.p = pick(q('p'), type);
  // footer
  out.footer = pick(q('footer, .site-footer, .footer'), box);
  // doc height
  out.docHeight = document.documentElement.scrollHeight;
  // fonts loaded errors
  const errs = [];
  document.fonts.forEach((f) => { if (f.status === 'error') errs.push(f.family); });
  out.fontErrors = errs;
  return out;
});

console.log(JSON.stringify(data, null, 1));
await b.close();
