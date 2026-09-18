import { chromium } from 'playwright';
const url=process.argv[2];const isLive=url.includes('indiauncharted.com');
const UA='Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 Safari/604.1';
const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:360,height:800},deviceScaleFactor:1,userAgent:UA,isMobile:true});
const p=await ctx.newPage();await p.goto(url,{waitUntil:'domcontentloaded'});await p.waitForTimeout(isLive?2500:600);
const d=await p.evaluate((isLive)=>{const g=(s)=>{const e=document.querySelector(s);if(!e)return null;const r=e.getBoundingClientRect();return{y:Math.round(r.y+scrollY),h:Math.round(r.height)};};
 if(isLive){return{header:g('#Header'),subheader:g('#Subheader'),h1:g('#Subheader h1'),getintouch:g('#Content h2'),card:g('#Content .one-third .column_attr'),form:g('.wpcf7'),img:g('#Content .column_image img'),footer:g('#Footer'),docH:document.documentElement.scrollHeight};}
 return{header:g('.iu-header'),banner:g('.cx-banner'),h1:g('.cx-banner .iu-pagebanner__title'),getintouch:g('.cx-info__title'),card:g('.cx-card'),form:g('.cx-form'),img:g('.cx-enquire__media img'),footer:g('.iu-footer'),docH:document.documentElement.scrollHeight};
},isLive);
console.log(JSON.stringify(d,null,1));await b.close();
