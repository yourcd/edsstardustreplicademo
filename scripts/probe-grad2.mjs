import { chromium } from 'playwright';
const b=await chromium.launch();
const ctx=await b.newContext({viewport:{width:1440,height:900},deviceScaleFactor:1});
const p=await ctx.newPage(); await p.goto('https://indiauncharted.com/destinations/',{waitUntil:'networkidle',timeout:60000}); await p.waitForTimeout(1200);
const r=await p.evaluate(()=>{
  const c0=document.querySelector('.column.one-third.column_image');
  // walk all descendants + self, find any gradient bg
  const grads=[];
  const all=[c0,...c0.querySelectorAll('*')];
  for(const el of all){const cs=getComputedStyle(el);if(cs.backgroundImage&&cs.backgroundImage.includes('gradient')){grads.push({cls:el.className,bg:cs.backgroundImage.slice(0,120)});}
    for(const pe of ['::before','::after']){const pcs=getComputedStyle(el,pe);if(pcs.backgroundImage&&pcs.backgroundImage.includes('gradient')&&pcs.content!=='none'){grads.push({cls:el.className+pe,bg:pcs.backgroundImage.slice(0,120),content:pcs.content});}}}
  // image_frame position + caption offsetParent
  const frame=c0.querySelector('.image_frame');
  const cap=c0.querySelector('.wp-caption-text');
  const iw=c0.querySelector('.image_wrapper');
  return {grads,framePos:getComputedStyle(frame).position, iwPos:getComputedStyle(iw).position, capOffsetParent:cap.offsetParent?cap.offsetParent.className:null, iwOverflow:getComputedStyle(iw).overflow};
});
console.log(JSON.stringify(r,null,2));
await b.close();
