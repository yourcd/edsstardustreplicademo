import { chromium } from 'playwright';
for(const url of ['https://indiauncharted.com/destinations/','http://localhost:8791/listing-dest-proposed.html']){
const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:1440,height:900},deviceScaleFactor:1});
const p=await ctx.newPage();await p.goto(url,{waitUntil:'networkidle',timeout:60000});await p.waitForTimeout(800);
const r=await p.evaluate(()=>{
  const bn=document.querySelector('.iu-pagebanner')||document.querySelector('[class*="title"]')||document.querySelector('.mfn-main-slider')||document.querySelector('#Wrapper .section');
  // find element containing the h1 banner region: use first section after header on live
  let banner=document.querySelector('.iu-pagebanner');
  if(!banner){ // live: the hero/title area
    const h1=document.querySelector('h1'); banner=h1.closest('.section')||h1.parentElement;
  }
  const rc=banner.getBoundingClientRect();const cs=getComputedStyle(banner);
  return {cls:banner.className.slice(0,40),y:Math.round(rc.y+scrollY),h:Math.round(rc.height),minH:cs.minHeight,pt:cs.paddingTop,pb:cs.paddingBottom};
});
console.log(url.includes('localhost')?'PROTO':'LIVE',JSON.stringify(r));await b.close();}
