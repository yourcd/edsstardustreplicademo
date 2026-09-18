import { chromium } from 'playwright';
const url=process.argv[2]; const width=+(process.argv[3]||1440);
const marks=process.argv[4].split('|');
const UA='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
const b=await chromium.launch(); const ctx=await b.newContext({viewport:{width,height:900},deviceScaleFactor:1,userAgent:UA});
const p=await ctx.newPage(); await p.goto(url,{waitUntil:'domcontentloaded',timeout:60000}); await p.waitForTimeout(2500);
await p.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=800){scrollTo(0,y);await new Promise(r=>setTimeout(r,50));}scrollTo(0,0);});
const r=await p.evaluate((marks)=>{const out=[];const all=[...document.querySelectorAll('h1,h2,h3,h4,p,a,li')];for(const m of marks){const el=all.find(e=>(e.innerText||'').trim().startsWith(m));out.push({m,y:el?Math.round(el.getBoundingClientRect().y+scrollY):null});}return{docH:document.documentElement.scrollHeight,out};},marks);
console.log(url.includes('localhost')?'PROTO':'LIVE','docH',r.docH); r.out.forEach(o=>console.log(' ',o.m,o.y)); await b.close();
