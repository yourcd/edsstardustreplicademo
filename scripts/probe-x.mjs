import { chromium } from 'playwright';
const url=process.argv[2]; const width=+(process.argv[3]||1440);
const UA='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
const b=await chromium.launch(); const ctx=await b.newContext({viewport:{width,height:900},deviceScaleFactor:1,userAgent:UA});
const p=await ctx.newPage(); await p.goto(url,{waitUntil:'domcontentloaded',timeout:60000}); await p.waitForTimeout(2000);
const r=await p.evaluate(()=>{
  const sel=document.querySelector('.post-item')?'.post-item':'.blog-card';
  const items=[...document.querySelectorAll(sel)].slice(0,3).map(e=>{const r=e.getBoundingClientRect();return {x:Math.round(r.x),w:Math.round(r.width),r:Math.round(r.right)};});
  return {clientW:document.documentElement.clientWidth, items};
});
console.log(url.includes('localhost')?'PROTO':'LIVE', JSON.stringify(r));
await b.close();
