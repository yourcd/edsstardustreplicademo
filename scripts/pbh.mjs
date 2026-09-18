import { chromium } from 'playwright';
const url=process.argv[2]; const width=+(process.argv[3]||1440);
const UA='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
const b=await chromium.launch(); const ctx=await b.newContext({viewport:{width,height:1000},deviceScaleFactor:1,userAgent:UA});
const p=await ctx.newPage(); await p.goto(url,{waitUntil:'domcontentloaded',timeout:60000}); await p.waitForTimeout(2000);
const r=await p.evaluate(()=>{
  const q=s=>{const e=document.querySelector(s);if(!e)return null;const r=e.getBoundingClientRect();return{y:Math.round(r.y),h:Math.round(r.height)};};
  return {banner:q('.iu-pagebanner')||q('#Subheader'), intro:q('.dl-intro')||q('.entry-content .section'), grid:q('.dl-grid')||q('.tour-grid'), card:q('.dl-card')||q('.tour-card')};
});
console.log(url.includes('localhost')?'PROTO':'LIVE', JSON.stringify(r));
await b.close();
