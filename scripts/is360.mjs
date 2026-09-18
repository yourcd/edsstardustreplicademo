import { chromium } from 'playwright';
const url=process.argv[2];const isLive=url.includes('indiauncharted.com');
const UA='Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 Safari/604.1';
const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:360,height:800},deviceScaleFactor:1,userAgent:UA,isMobile:true});
const p=await ctx.newPage();await p.goto(url,{waitUntil:'domcontentloaded'});await p.waitForTimeout(isLive?2500:600);
const d=await p.evaluate((isLive)=>{const info=document.querySelector(isLive?'#Content .section':'.cx-info');const cards=[...document.querySelectorAll(isLive?'#Content .one-third .column_attr':'.cx-card')];
 return{infoY:Math.round(info.getBoundingClientRect().y+scrollY),infoH:Math.round(info.getBoundingClientRect().height),cards:cards.map(c=>{const r=c.getBoundingClientRect();return{y:Math.round(r.y+scrollY),h:Math.round(r.height)};})};},isLive);
console.log(url.includes('local')?'PROTO':'LIVE',JSON.stringify(d));await b.close();
