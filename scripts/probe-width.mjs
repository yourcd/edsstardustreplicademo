import { chromium } from 'playwright';
const url=process.argv[2]; const width=+(process.argv[3]||1440);
const UA='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
const b=await chromium.launch(); const ctx=await b.newContext({viewport:{width,height:900},deviceScaleFactor:1,userAgent:UA});
const p=await ctx.newPage(); await p.goto(url,{waitUntil:'domcontentloaded',timeout:60000}); await p.waitForTimeout(2000);
const r=await p.evaluate(()=>{
  const wrap=document.querySelector('.blog_wrapper, .blog-wrap, .posts_group, .blog-grid');
  const wb=wrap?wrap.getBoundingClientRect():null;
  return {innerWidth:window.innerWidth, clientWidth:document.documentElement.clientWidth,
    bodyW:document.body.clientWidth,
    wrap: wrap?{cls:wrap.className,x:Math.round(wb.x),w:Math.round(wb.width)}:null};
});
console.log(url.includes('localhost')?'PROTO':'LIVE', JSON.stringify(r));
await b.close();
