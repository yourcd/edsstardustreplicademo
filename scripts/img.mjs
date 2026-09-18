import { chromium } from 'playwright';
const url=process.argv[2];const sel=process.argv[3];
const UA='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:1440,height:900},deviceScaleFactor:1,userAgent:UA});
const p=await ctx.newPage();await p.goto(url,{waitUntil:'domcontentloaded',timeout:60000});await p.waitForTimeout(2500);
const r=await p.evaluate(()=>{const im=[...document.querySelectorAll("img")].find(i=>/goa1/.test(i.src));if(!im)return null;const rr=im.getBoundingClientRect();return{w:Math.round(rr.width),h:Math.round(rr.height),natW:im.naturalWidth,natH:im.naturalHeight};});
console.log(JSON.stringify(r));await b.close();
