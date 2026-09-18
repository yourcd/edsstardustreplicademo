import { chromium } from 'playwright';
const UA='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
const b=await chromium.launch(); const ctx=await b.newContext({viewport:{width:1440,height:900},deviceScaleFactor:1,userAgent:UA});
const p=await ctx.newPage(); await p.goto('http://localhost:8791/listing-blog-proposed.html',{waitUntil:'domcontentloaded'}); await p.waitForTimeout(1500);
await p.evaluate(()=>{const s=document.createElement('style');s.textContent='.iu-main{padding-right:10px;box-sizing:border-box}';document.head.appendChild(s);});
await p.evaluate(()=>scrollTo(0,500));
const r=await p.evaluate(()=>{const cards=[...document.querySelectorAll('.blog-card')].map(c=>+c.getBoundingClientRect().x.toFixed(1));const ct=document.querySelector('#Content').getBoundingClientRect();const ban=document.querySelector('.blog-banner').getBoundingClientRect();return{cardX:cards,contentW:+ct.width.toFixed(1),bannerW:+ban.width.toFixed(1)};});
console.log(JSON.stringify(r));
await b.close();
