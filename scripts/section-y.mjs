import { chromium } from 'playwright';
const url = process.argv[2];
const width = +(process.argv[3] || 1440);
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width, height: 900 }, deviceScaleFactor: 1, userAgent: UA });
const p = await ctx.newPage();
await p.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
await p.waitForTimeout(3000);
// settle scroll
await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 800) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 60)); } window.scrollTo(0, 0); });
await p.waitForTimeout(500);
const markers = ['Special Packages', 'Welcome To', 'Welcome to India', 'Find Travel Perfection', 'Top Destinations', 'happy clients', 'Explore Destinations By Theme', 'Crafted Journeys', 'Our Blog', 'Get In Touch', 'Quick Links'];
const res = await p.evaluate((markers) => {
  const out = [];
  const all = [...document.querySelectorAll('h1,h2,h3,h4,p,span,div')];
  for (const m of markers) {
    const el = all.find((e) => {
      const t = [...e.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent).join('').trim();
      return t.includes(m);
    });
    if (el) { const r = el.getBoundingClientRect(); out.push({ m, y: Math.round(r.y + window.scrollY), h: Math.round(r.height) }); }
    else out.push({ m, y: null });
  }
  return { docH: document.documentElement.scrollHeight, markers: out };
}, markers);
console.log(JSON.stringify(res, null, 1));
await b.close();
