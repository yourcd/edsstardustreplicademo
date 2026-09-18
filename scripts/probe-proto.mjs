import { chromium } from 'playwright';
const url=process.argv[2];const width=+(process.argv[3]||1440);
const b=await chromium.launch();const ctx=await b.newContext({viewport:{width,height:900},deviceScaleFactor:1});
const p=await ctx.newPage();await p.goto(url,{waitUntil:'networkidle',timeout:60000});await p.waitForTimeout(800);
const d=await p.evaluate(()=>{const g=s=>{const e=document.querySelector(s);if(!e)return null;const r=e.getBoundingClientRect();return{y:Math.round(r.y+scrollY),h:Math.round(r.height)};};
return{banner:g('.cx-banner'),info:g('.cx-info'),card:g('.cx-card'),enquire:g('.cx-enquire'),form:g('.cx-form'),media:g('.cx-enquire__media img'),footer:g('.iu-footer'),docH:document.documentElement.scrollHeight};});
console.log(JSON.stringify(d,null,1));await b.close();
