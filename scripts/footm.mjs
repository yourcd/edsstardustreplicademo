import { chromium } from 'playwright';
const url=process.argv[2];
const UA='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:360,height:800},deviceScaleFactor:1,userAgent:UA});
const p=await ctx.newPage();await p.goto(url,{waitUntil:'domcontentloaded',timeout:60000});await p.waitForTimeout(2500);
await p.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=700){scrollTo(0,y);await new Promise(r=>setTimeout(r,50));}scrollTo(0,0);});
const r=await p.evaluate(()=>{
  const f=document.querySelector('footer, #Footer, .footer');
  const cols=f?[...f.children].map(c=>({tag:c.tagName,h:Math.round(c.getBoundingClientRect().height)})):null;
  // quick link row height
  const ql=[...document.querySelectorAll('a')].find(a=>/About Us/.test(a.innerText)&&a.getBoundingClientRect().top>1500);
  const qr=ql?ql.getBoundingClientRect():null;
  const foot=f?f.getBoundingClientRect():null;
  return {footH:foot?Math.round(foot.height):null, footY:foot?Math.round(foot.y+scrollY):null, qlRow:qr?Math.round(qr.height):null, docH:document.documentElement.scrollHeight};
});
console.log(url.includes('localhost')?'PROTO':'LIVE',JSON.stringify(r));await b.close();
