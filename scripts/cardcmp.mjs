import { chromium } from 'playwright';
async function m(url,proto){
const UA='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
const b=await chromium.launch(); const ctx=await b.newContext({viewport:{width:1440,height:1000},deviceScaleFactor:1,userAgent:UA});
const p=await ctx.newPage(); await p.goto(url,{waitUntil:'domcontentloaded',timeout:60000}); await p.waitForTimeout(2000);
const r=await p.evaluate((proto)=>{
  const q=s=>{const e=document.querySelector(s);if(!e)return null;const r=e.getBoundingClientRect();return{y:Math.round(r.y),h:Math.round(r.height)};};
  if(proto) return {card:q('.dl-card'),img:q('.dl-card__thumb img'),body:q('.dl-card__body'),title:q('.dl-card__title'),loc:q('.dl-card__loc'),rating:q('.dl-card__rating'),priceRow:q('.dl-card__price-row')};
  return {card:q('.tour-card'),img:q('.ova-product-thumbnail img'),body:q('.ova_foot_product'),title:q('.ova-product-title'),loc:q('.ova-product-location'),rating:q('.star-rating'),priceRow:q('.ova-product-wrapper-price')};
},proto);
console.log(url.includes('localhost')?'PROTO':'LIVE',JSON.stringify(r)); await b.close();
}
await m('https://indiauncharted.com/agra-tour-packages/',false);
await m('http://localhost:8791/destlanding-proposed.html',true);
