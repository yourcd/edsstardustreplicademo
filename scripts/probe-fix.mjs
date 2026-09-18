import { chromium } from 'playwright';
const UA='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
const b=await chromium.launch(); const ctx=await b.newContext({viewport:{width:1440,height:900},deviceScaleFactor:1,userAgent:UA});
const p=await ctx.newPage(); await p.goto('http://localhost:8791/listing-blog-proposed.html',{waitUntil:'domcontentloaded'}); await p.waitForTimeout(1500);
for(const css of ['scrollbar-gutter','margin-left']){
  await p.evaluate((mode)=>{
    const s=document.createElement('style');
    if(mode==='scrollbar-gutter') s.textContent='html{scrollbar-gutter:stable;overflow-y:scroll}';
    else s.textContent='.blog-wrap{margin-left:54px !important;margin-right:auto !important}';
    document.head.appendChild(s);
  },css);
  await p.evaluate(()=>scrollTo(0,500));
  const r=await p.evaluate(()=>{const c=document.querySelector('.blog-card').getBoundingClientRect();const ct=document.querySelector('#Content').getBoundingClientRect();return{card:+c.x.toFixed(1),content:+ct.width.toFixed(1)};});
  console.log(css,'=> card x',r.card,'contentW',r.content);
}
await b.close();
