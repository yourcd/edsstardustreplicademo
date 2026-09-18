import { chromium } from 'playwright';
const url=process.argv[2];const isLive=url.includes('indiauncharted.com');
const UA='Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 Safari/604.1';
const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:360,height:800},deviceScaleFactor:1,userAgent:UA,isMobile:true});
const p=await ctx.newPage();await p.goto(url,{waitUntil:'domcontentloaded'});await p.waitForTimeout(isLive?2500:600);
const d=await p.evaluate((isLive)=>{const inps=[...document.querySelectorAll(isLive?'.wpcf7-form input':'.cx-form form input')];const h2=document.querySelector(isLive?'.wpcf7':'.cx-form').closest(isLive?'.column_attr':'.cx-form').querySelector('h2');
 const out={h2y:Math.round(h2.getBoundingClientRect().y+scrollY)};out.inputs=inps.map(i=>({y:Math.round(i.getBoundingClientRect().y+scrollY),h:Math.round(i.getBoundingClientRect().height)}));return out;},isLive);
console.log(url.includes('local')?'PROTO':'LIVE',JSON.stringify(d));await b.close();
