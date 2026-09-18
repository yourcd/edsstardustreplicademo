import { chromium } from 'playwright';
const url=process.argv[2]; const width=+(process.argv[3]||1440);
const UA='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
const b=await chromium.launch(); const ctx=await b.newContext({viewport:{width,height:900},deviceScaleFactor:1,userAgent:UA});
const p=await ctx.newPage(); await p.goto(url,{waitUntil:'domcontentloaded',timeout:60000}); await p.waitForTimeout(2000);
// force scrollbar to appear like real capture
await p.evaluate(()=>scrollTo(0,500));
const r=await p.evaluate(()=>{
  const isLive=!!document.querySelector('.blog_wrapper');
  const chain=isLive
    ? ['#Content','.section','.section_wrapper','.blog_wrapper','.posts_group','.post-item']
    : ['#Content','.blog-section','.blog-wrap','.blog-grid','.blog-card'];
  const out=[];
  for(const s of chain){const el=document.querySelector(s);if(!el){out.push([s,'MISSING']);continue;}
    const b=el.getBoundingClientRect();const cs=getComputedStyle(el);
    out.push([s,{x:+b.x.toFixed(1),w:+b.width.toFixed(1),pad:cs.padding,mar:cs.margin,mw:cs.maxWidth,box:cs.boxSizing}]);}
  return {docClientW:document.documentElement.clientWidth,out};
});
console.log(url.includes('localhost')?'PROTO':'LIVE','clientW',r.docClientW);
r.out.forEach(o=>console.log('  ',o[0],JSON.stringify(o[1])));
await b.close();
