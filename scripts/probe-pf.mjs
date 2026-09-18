import { chromium } from 'playwright';
const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:1440,height:900},deviceScaleFactor:1});
const p=await ctx.newPage();await p.goto('http://localhost:8791/contact-proposed.html',{waitUntil:'networkidle'});await p.waitForTimeout(600);
const d=await p.evaluate(()=>{const out=[];const h2=document.querySelector('.cx-form__title');out.push({t:'h2',y:Math.round(h2.getBoundingClientRect().y)});document.querySelectorAll('.cx-form form input').forEach((i,n)=>out.push({t:'in'+n,y:Math.round(i.getBoundingClientRect().y)}));return out;});
console.log(JSON.stringify(d));await b.close();
