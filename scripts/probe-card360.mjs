import { chromium } from 'playwright';
const url=process.argv[2];const isLive=url.includes('indiauncharted.com');
const UA='Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 Safari/604.1';
const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:360,height:800},deviceScaleFactor:1,userAgent:UA,isMobile:true});
const p=await ctx.newPage();await p.goto(url,{waitUntil:'domcontentloaded'});await p.waitForTimeout(isLive?2500:600);
const d=await p.evaluate((isLive)=>{const sel=isLive?'#Content .one-third .column_attr':'.cx-card';const c=document.querySelector(sel);
 const img=c.querySelector('img'),h6=c.querySelector('h6'),pp=c.querySelector('p');const gi=(e)=>{const r=e.getBoundingClientRect();return{y:Math.round(r.y+scrollY),h:Math.round(r.height),mb:getComputedStyle(e).marginBottom,mt:getComputedStyle(e).marginTop};};
 return{card:gi(c),cardPad:getComputedStyle(c).padding,img:gi(img),h6:gi(h6),h6fs:getComputedStyle(h6).fontSize,p:gi(pp),pfs:getComputedStyle(pp).fontSize,plh:getComputedStyle(pp).lineHeight};
},isLive);console.log(JSON.stringify(d,null,1));await b.close();
