import { chromium } from 'playwright';
const url=process.argv[2];
const UA='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:360,height:800},deviceScaleFactor:1,userAgent:UA});
const p=await ctx.newPage();await p.goto(url,{waitUntil:'domcontentloaded',timeout:60000});await p.waitForTimeout(2500);
const r=await p.evaluate(()=>{const h1=document.querySelector('h1');const hr=h1.getBoundingClientRect();const cs=getComputedStyle(h1);let bn=h1;while(bn&&!/url\(/.test(getComputedStyle(bn).backgroundImage)&&bn.parentElement)bn=bn.parentElement;const br=bn?bn.getBoundingClientRect():null;return{h1y:Math.round(hr.y+scrollY),h1h:Math.round(hr.height),size:cs.fontSize,lh:cs.lineHeight,banner:br?{y:Math.round(br.y+scrollY),h:Math.round(br.height)}:null};});
console.log(url.includes('localhost')?'PROTO':'LIVE',JSON.stringify(r));await b.close();
