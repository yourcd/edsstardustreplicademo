import { chromium } from 'playwright';
const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:1440,height:900},deviceScaleFactor:1});
const p=await ctx.newPage();await p.goto('https://indiauncharted.com/destinations/',{waitUntil:'networkidle',timeout:60000});await p.waitForTimeout(800);
const r=await p.evaluate(()=>{
  const h1=document.querySelector('h1');
  // climb to the hero section
  let sec=h1; const chain=[];
  while(sec&&sec!==document.body){const rc=sec.getBoundingClientRect();const cs=getComputedStyle(sec);chain.push({cls:(sec.className||'').toString().slice(0,45),y:Math.round(rc.y+scrollY),h:Math.round(rc.height),minH:cs.minHeight,pt:cs.paddingTop,pb:cs.paddingBottom});sec=sec.parentElement;}
  return chain.slice(0,6);
});
console.log(JSON.stringify(r,null,2));await b.close();
