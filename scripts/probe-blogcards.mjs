import { chromium } from 'playwright';
const url=process.argv[2]; const width=+(process.argv[3]||1440);
const isLive=!url.includes('localhost');
const UA='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
const b=await chromium.launch(); const ctx=await b.newContext({viewport:{width,height:900},deviceScaleFactor:1,userAgent:UA});
const p=await ctx.newPage(); await p.goto(url,{waitUntil:'domcontentloaded',timeout:60000}); await p.waitForTimeout(2500);
await p.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=800){scrollTo(0,y);await new Promise(r=>setTimeout(r,60));}scrollTo(0,0);});
const sel=isLive?'.post-item':'.blog-card';
const imgSel=isLive?'.image_frame img, .post-photo-wrapper img':'.blog-card__media img';
const r=await p.evaluate(({sel,imgSel})=>{
  const cards=[...document.querySelectorAll(sel)];
  return {docH:document.documentElement.scrollHeight,
    cards:cards.map((c,i)=>{const b=c.getBoundingClientRect();
      const img=c.querySelector('img'); const ib=img?img.getBoundingClientRect():null;
      const cs=getComputedStyle(c);
      return {i,x:Math.round(b.x),y:Math.round(b.y+scrollY),w:Math.round(b.width),h:Math.round(b.height),
        imgH:ib?Math.round(ib.height):null,imgW:ib?Math.round(ib.width):null,
        mb:cs.marginBottom,ml:cs.marginLeft};
    })};
},{sel,imgSel});
console.log(isLive?'LIVE':'PROTO','docH',r.docH,'cards',r.cards.length);
r.cards.forEach(c=>console.log(`  #${c.i} x${c.x} y${c.y} ${c.w}x${c.h} img ${c.imgW}x${c.imgH} mb${c.mb} ml${c.ml}`));
await b.close();
