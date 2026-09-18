import { chromium } from 'playwright';
const url=process.argv[2];const isLive=url.includes('indiauncharted.com');
const UA='Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 Safari/604.1';
const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:360,height:800},deviceScaleFactor:1,userAgent:UA,isMobile:true});
const p=await ctx.newPage();await p.goto(url,{waitUntil:'domcontentloaded'});await p.waitForTimeout(isLive?2500:600);
const d=await p.evaluate((isLive)=>{const img=document.querySelector(isLive?'#Content .column_image img':'.cx-enquire__media img');const r=img.getBoundingClientRect();return{x:Math.round(r.x),y:Math.round(r.y+scrollY),w:Math.round(r.width),h:Math.round(r.height)};},isLive);
console.log(url.includes('local')?'PROTO':'LIVE',JSON.stringify(d));await b.close();
