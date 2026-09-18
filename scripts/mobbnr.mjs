import { chromium } from 'playwright';
const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:360,height:800},deviceScaleFactor:1});
const p=await ctx.newPage();await p.goto('https://indiauncharted.com/destinations/',{waitUntil:'networkidle',timeout:60000});await p.waitForTimeout(800);
const r=await p.evaluate(()=>{
  const h1=document.querySelector('h1');
  let sec=h1;const chain=[];
  while(sec&&sec!==document.body){const rc=sec.getBoundingClientRect();const cs=getComputedStyle(sec);chain.push({cls:(sec.className||'').toString().slice(0,30),y:Math.round(rc.y+scrollY),h:Math.round(rc.height),pt:cs.paddingTop,pb:cs.paddingBottom});sec=sec.parentElement;}
  // header height
  const hdr=document.querySelector('#Header, header, .mfn-header-wrapper, #Top_bar');
  const hdrH= hdr?Math.round(hdr.getBoundingClientRect().height):null;
  // the grid wrap padding at mobile
  const wrap=document.querySelector('.entry-content .section_wrapper');
  const wcs=wrap?getComputedStyle(wrap):null;const wr=wrap?wrap.getBoundingClientRect():null;
  const col=document.querySelector('.column.one-third');const ccs=col?getComputedStyle(col):null;
  return {chain:chain.slice(0,5),hdrCls:hdr?hdr.className:null,hdrH,
    wrap:wr?{x:Math.round(wr.x),w:Math.round(wr.width),pl:wcs.paddingLeft,pr:wcs.paddingRight,maxW:wcs.maxWidth}:null,
    col:ccs?{ml:ccs.marginLeft,mr:ccs.marginRight,w:Math.round(col.getBoundingClientRect().width)}:null,
    h1y:Math.round(h1.getBoundingClientRect().y+scrollY)};
});
console.log(JSON.stringify(r,null,2));await b.close();
