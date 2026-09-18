import { chromium } from 'playwright';
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, userAgent: UA });
const p = await ctx.newPage();
await p.goto('https://indiauncharted.com/', { waitUntil: 'domcontentloaded', timeout: 60000 });
await p.waitForTimeout(3500);
const data = await p.evaluate(() => {
  const walk = (root) => {
    const out = [];
    root.querySelectorAll('*').forEach((el) => {
      const t = (el.childNodes.length && [...el.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent.trim()).join(' ').trim()) || '';
      if (/Your Journey|Begins Here|Turning Vacations|Lifelong/i.test(t) && t.length < 80) {
        const cs = getComputedStyle(el);
        const r = el.getBoundingClientRect();
        out.push({ text: t, tag: el.tagName, cls: el.className?.toString().slice(0, 40),
          font: cs.fontFamily, size: cs.fontSize, weight: cs.fontWeight, lh: cs.lineHeight,
          color: cs.color, transform: cs.textTransform, rect: { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) } });
      }
    });
    return out;
  };
  // hero form
  const form = document.querySelector('form.wpcf7-form, .hero form, form');
  const fr = form ? form.getBoundingClientRect() : null;
  return { hero: walk(document.body), form: fr ? { x: Math.round(fr.x), y: Math.round(fr.y), w: Math.round(fr.width), h: Math.round(fr.height) } : null };
});
console.log(JSON.stringify(data, null, 1));
await b.close();
