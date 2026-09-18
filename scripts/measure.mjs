import { chromium } from 'playwright';
const url = process.argv[2];
const width = +(process.argv[3] || 1440);
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width, height: 900 }, deviceScaleFactor: 1, userAgent: UA });
const p = await ctx.newPage();
await p.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
await p.waitForTimeout(3000);
await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 800) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 60)); } window.scrollTo(0, 0); });
await p.waitForTimeout(500);
const r = await p.evaluate(() => {
  const rect = (el) => { if (!el) return null; const b = el.getBoundingClientRect(); return { y: Math.round(b.y + scrollY), w: Math.round(b.width), h: Math.round(b.height) }; };
  const byText = (needle, tags = 'h1,h2,h3,h4,p,a,span,img,div') => [...document.querySelectorAll(tags)].find((e) => (e.innerText || e.alt || '').trim().includes(needle));
  const out = {};
  // hero
  out.heroImg = rect(document.querySelector('.rev_slider, #rev_slider_1_1_wrapper, .rs-fullwidth, .forcefullwidth_wrapper_tp_banner'));
  // package cards — find images near dd.jpg/Y.jpg/lk.jpg
  const pk = [...document.querySelectorAll('img')].filter((i) => /dd\.jpg|Y\.jpg|lk\.jpg/.test(i.src)).map((i) => rect(i.closest('div,article,li') || i));
  out.pkgCard = pk[0];
  // feature cards
  const feat = byText('Personalized Journeys');
  out.featureCard = feat ? rect(feat.closest('.column, .wpb_column, .feature, div')) : null;
  // theme card
  const theme = byText('BEACH HOLIDAY') || byText('Beach');
  out.themeCard = theme ? rect(theme.closest('a, .column, div')) : null;
  // blog card
  const blog = byText('Fascinating Facts') || byText('Ayurvedic');
  out.blogCard = blog ? rect(blog.closest('article, .column, .post, div')) : null;
  // blog cards count + first-row width to infer columns
  const blogImgs = [...document.querySelectorAll('img')].filter((i) => /960x750|ChatGPT-Image|Untitled-design/.test(i.src)).map((i) => rect(i));
  out.blogImgs = blogImgs;
  out.docH = document.documentElement.scrollHeight;
  return out;
});
console.log(JSON.stringify(r, null, 1));
await b.close();
