import { chromium } from 'playwright';
const url=process.argv[2]||'https://indiauncharted.com/destinations/';
const width=+(process.argv[3]||1440);
const b=await chromium.launch();
const ctx=await b.newContext({viewport:{width,height:900},deviceScaleFactor:1});
const p=await ctx.newPage(); await p.goto(url,{waitUntil:'networkidle',timeout:60000}); await p.waitForTimeout(1500);
const r=await p.evaluate(()=>{
  const out={};
  const cols=[...document.querySelectorAll('.column.one-third.column_image')];
  out.count=cols.length;
  const rect=(el)=>el?el.getBoundingClientRect():null;
  const c0=cols[0], c1=cols[1], c3=cols[3];
  const g=(el)=>{const cs=getComputedStyle(el);const rc=el.getBoundingClientRect();return{w:Math.round(rc.width),h:Math.round(rc.height),x:Math.round(rc.x),y:Math.round(rc.y+scrollY),ml:cs.marginLeft,mr:cs.marginRight,mb:cs.marginBottom,mt:cs.marginTop,pl:cs.paddingLeft,pr:cs.paddingRight};};
  out.card0=g(c0); out.card1=g(c1); out.card3=g(c3);
  const img=c0.querySelector('img'); const ir=img.getBoundingClientRect();const ics=getComputedStyle(img);
  out.img={w:Math.round(ir.width),h:Math.round(ir.height),objectFit:ics.objectFit,borderRadius:ics.borderRadius};
  const frame=c0.querySelector('.image_frame');const fcs=getComputedStyle(frame);const fr=frame.getBoundingClientRect();
  out.frame={w:Math.round(fr.width),h:Math.round(fr.height),borderRadius:fcs.borderRadius,overflow:fcs.overflow,mb:fcs.marginBottom};
  const cap=c0.querySelector('.wp-caption-text');const ccs=getComputedStyle(cap);const cr=cap.getBoundingClientRect();
  out.cap={text:cap.innerText,tag:cap.tagName,fontSize:ccs.fontSize,fontFamily:ccs.fontFamily,fontWeight:ccs.fontWeight,color:ccs.color,position:ccs.position,bottom:ccs.bottom,left:ccs.left,textTransform:ccs.textTransform,x:Math.round(cr.x),y:Math.round(cr.y+scrollY),lineHeight:ccs.lineHeight};
  // section / wrap
  const sec=document.querySelector('.entry-content .section.mcb-section');const scs=getComputedStyle(sec);const sr=sec.getBoundingClientRect();
  out.section={y:Math.round(sr.y+scrollY),pt:scs.paddingTop,pb:scs.paddingBottom,w:Math.round(sr.width)};
  const wrap=sec.querySelector('.section_wrapper');const wcs=getComputedStyle(wrap);const wr=wrap.getBoundingClientRect();
  out.wrap={w:Math.round(wr.width),x:Math.round(wr.x),maxW:wcs.maxWidth,pl:wcs.paddingLeft,pr:wcs.paddingRight};
  // gap between card0 and card1 horizontally, card0 and card3 vertically
  const r0=rect(c0),r1=rect(c1),r3=rect(c3);
  out.hgap=Math.round(r1.x-(r0.x+r0.width));
  out.vgap=Math.round((r3.y+scrollY)-(r0.y+scrollY+r0.height));
  out.docH=document.documentElement.scrollHeight;
  // banner
  const h1=document.querySelector('h1');out.h1={text:h1.innerText,y:Math.round(h1.getBoundingClientRect().y+scrollY)};
  return out;
});
console.log(JSON.stringify(r,null,2));
await b.close();
