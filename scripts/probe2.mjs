import { chromium } from 'playwright';
const url='https://indiauncharted.com/agra-tour-packages/';
const width=+(process.argv[2]||1440);
const UA='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
const b=await chromium.launch(); const ctx=await b.newContext({viewport:{width,height:1000},deviceScaleFactor:1,userAgent:UA});
const p=await ctx.newPage(); await p.goto(url,{waitUntil:'domcontentloaded',timeout:60000}); await p.waitForTimeout(2500);
await p.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=800){scrollTo(0,y);await new Promise(r=>setTimeout(r,40));}scrollTo(0,0);});
const data=await p.evaluate(()=>{
  const pick=(el,props)=>{if(!el)return null;const cs=getComputedStyle(el);const r=el.getBoundingClientRect();const o={rect:{x:Math.round(r.x),y:Math.round(r.y+scrollY),w:Math.round(r.width),h:Math.round(r.height)}};props.forEach(pr=>o[pr]=cs.getPropertyValue(pr));return o;};
  const t=['font-family','font-size','font-weight','line-height','color','margin','padding'];
  return {
    thumbImg: pick(document.querySelector('.ova-product-thumbnail img'),['width','height','object-fit']),
    thumbImgRect: pick(document.querySelector('.ova-product-thumbnail img'),[]),
    badge: pick(document.querySelector('.ova-tour-day'),['position','top','left','background-color','color','border','border-radius','padding','font-size','font-weight','box-shadow']),
    title: pick(document.querySelector('.ova-product-title'),t),
    titleLink: pick(document.querySelector('.ova-product-title a'),['color']),
    loc: pick(document.querySelector('.ova-product-location'),['color','font-size','padding','margin']),
    locSpan: pick(document.querySelector('.ova-product-location .location'),['font-size','color']),
    star: pick(document.querySelector('.star-rating'),['font-size','width','height','color']),
    priceRow: pick(document.querySelector('.ova-product-wrapper-price'),['padding','justify-content']),
    price: pick(document.querySelector('.new-product-price'),['font-size','font-weight','color']),
    btn: pick(document.querySelector('.product-btn-book-now'),['background-color','color','font-size','font-weight','padding','border-radius','line-height']),
    dayTitleLoc: pick(document.querySelector('.ova-product-day-title-location'),['padding','margin']),
    spacer1: pick(document.querySelector('.wp-block-spacer'),['height']),
  };
});
console.log(JSON.stringify(data,null,1));
await b.close();
