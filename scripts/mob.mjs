import { chromium } from 'playwright';
async function m(url,proto){
const UA='Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1';
const b=await chromium.launch(); const ctx=await b.newContext({viewport:{width:360,height:800},deviceScaleFactor:1,userAgent:UA,isMobile:true});
const p=await ctx.newPage(); await p.goto(url,{waitUntil:'domcontentloaded',timeout:60000}); await p.waitForTimeout(2000);
await p.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=600){scrollTo(0,y);await new Promise(r=>setTimeout(r,40));}scrollTo(0,0);});
const r=await p.evaluate((proto)=>{
  const q=s=>{const e=document.querySelector(s);if(!e)return null;const c=getComputedStyle(e);const r=e.getBoundingClientRect();return{y:Math.round(r.y+scrollY),h:Math.round(r.height),w:Math.round(r.width),disp:c.display};};
  if(proto) return {banner:q('.iu-pagebanner'),bTitle:q('.iu-pagebanner__title'),introInner:q('.dl-intro__inner'),copy:q('.dl-intro__copy'),img:q('.dl-intro__media img'),grid:q('.dl-grid'),card:q('.dl-card'),cardImg:q('.dl-card__thumb img')};
  return {banner:q('#Subheader'),bTitle:q('#Subheader .title'),introInner:q('.wrap.mcb-wrap'),copy:q('.column_visual'),img:q('.column_image img'),grid:q('.tour-grid'),card:q('.tour-card'),cardImg:q('.ova-product-thumbnail img')};
},proto);
console.log(url.includes('localhost')?'PROTO':'LIVE',JSON.stringify(r,null,0)); await b.close();
}
await m('https://indiauncharted.com/agra-tour-packages/',false);
await m('http://localhost:8791/destlanding-proposed.html',true);
