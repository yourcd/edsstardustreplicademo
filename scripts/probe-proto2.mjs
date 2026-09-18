import { chromium } from 'playwright';
const b=await chromium.launch();
const ctx=await b.newContext({viewport:{width:1440,height:900},deviceScaleFactor:1});
const p=await ctx.newPage(); await p.goto('http://localhost:8791/listing-dest-proposed.html',{waitUntil:'networkidle',timeout:60000}); await p.waitForTimeout(800);
const r=await p.evaluate(()=>{
  const cards=[...document.querySelectorAll('.ld-card')];
  const g=el=>{const rc=el.getBoundingClientRect();return{w:Math.round(rc.width),h:Math.round(rc.height),x:Math.round(rc.x),y:Math.round(rc.y+scrollY)};};
  const grid=document.querySelector('.ld-grid');const gr=grid.getBoundingClientRect();
  const c0=cards[0],c1=cards[1],c3=cards[3];
  const cap=c0.querySelector('.ld-card__cap');const ccs=getComputedStyle(cap);const cr=cap.getBoundingClientRect();
  return {count:cards.length,card0:g(c0),card1:g(c1),card3:g(c3),
    gridW:Math.round(gr.width),gridX:Math.round(gr.x),
    hgap:Math.round(c1.getBoundingClientRect().x-(c0.getBoundingClientRect().x+c0.getBoundingClientRect().width)),
    vgap:Math.round((c3.getBoundingClientRect().y+scrollY)-(c0.getBoundingClientRect().y+scrollY+c0.getBoundingClientRect().height)),
    cap:{fs:ccs.fontSize,x:Math.round(cr.x),y:Math.round(cr.y+scrollY)},
    docH:document.documentElement.scrollHeight,
    h1y:Math.round(document.querySelector('h1').getBoundingClientRect().y+scrollY)};
});
console.log(JSON.stringify(r,null,2));
await b.close();
