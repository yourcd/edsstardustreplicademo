import { chromium } from 'playwright';
const b=await chromium.launch();
const ctx=await b.newContext({viewport:{width:1440,height:900},deviceScaleFactor:1});
const p=await ctx.newPage(); await p.goto('https://indiauncharted.com/destinations/',{waitUntil:'networkidle',timeout:60000}); await p.waitForTimeout(1200);
const r=await p.evaluate(()=>{
  const c0=document.querySelector('.column.one-third.column_image');
  const iw=c0.querySelector('.image_wrapper');const iwcs=getComputedStyle(iw);
  const mask=c0.querySelector('.mask');const mcs=mask?getComputedStyle(mask):null;
  const cap=c0.querySelector('.wp-caption-text');
  const capA=getComputedStyle(cap,'::after');const capB=getComputedStyle(cap,'::before');
  const capMain=getComputedStyle(cap);
  const iwA=getComputedStyle(iw,'::after');const iwB=getComputedStyle(iw,'::before');
  const frame=c0.querySelector('.image_frame');
  const frA=getComputedStyle(frame,'::after');
  return {
    imageWrapper:{position:iwcs.position,bg:iwcs.background.slice(0,80),overflow:iwcs.overflow,br:iwcs.borderRadius},
    mask: mcs?{position:mcs.position,bg:mcs.backgroundColor,bgImg:mcs.backgroundImage.slice(0,90),inset:mcs.inset,zIndex:mcs.zIndex,display:mcs.display}:null,
    capMain:{padding:capMain.padding,margin:capMain.margin,bg:capMain.backgroundColor,zIndex:capMain.zIndex,textShadow:capMain.textShadow,width:capMain.width},
    capAfter:{content:capA.content,bg:capA.backgroundImage.slice(0,90)},
    capBefore:{content:capB.content,bg:capB.backgroundImage.slice(0,90)},
    iwAfter:{content:iwA.content,bg:iwA.backgroundImage.slice(0,90),pos:iwA.position,inset:iwA.inset},
    iwBefore:{content:iwB.content,bg:iwB.backgroundImage.slice(0,90),pos:iwB.position,inset:iwB.inset},
    frameAfter:{content:frA.content,bg:frA.backgroundImage.slice(0,90),pos:frA.position},
  };
});
console.log(JSON.stringify(r,null,2));
await b.close();
