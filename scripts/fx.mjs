import { chromium } from 'playwright';
const b=await chromium.launch();const p=await(await b.newContext({viewport:{width:1440,height:900},deviceScaleFactor:1})).newPage();
await p.goto('http://localhost:8791/article-proposed.html',{waitUntil:'networkidle'});
const r=await p.evaluate(()=>{const i=document.querySelector('.art-featured img');const b=i.getBoundingClientRect();return{x:Math.round(b.x),w:Math.round(b.width)};});
console.log('proto featured img',JSON.stringify(r),'(live x=447 w=636)');await b.close();
