import { chromium } from 'playwright';
const url=process.argv[2];
const UA='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
const b=await chromium.launch(); const ctx=await b.newContext({viewport:{width:1440,height:900},deviceScaleFactor:1,userAgent:UA});
const p=await ctx.newPage(); await p.goto(url,{waitUntil:'domcontentloaded',timeout:60000}); await p.waitForTimeout(2500);
const r=await p.evaluate(()=>{const f=document.querySelector('footer, .iu-footer, .footer, #Footer');const rr=f?f.getBoundingClientRect():null;return{footY:rr?Math.round(rr.y+scrollY):null,footH:rr?Math.round(rr.height):null,docH:document.documentElement.scrollHeight};});
console.log(url.includes('localhost')?'PROTO':'LIVE',JSON.stringify(r)); await b.close();
