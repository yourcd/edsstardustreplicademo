import { chromium } from 'playwright';
async function m(url,proto){
const UA='Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1';
const b=await chromium.launch(); const ctx=await b.newContext({viewport:{width:360,height:800},deviceScaleFactor:1,userAgent:UA,isMobile:true});
const p=await ctx.newPage(); await p.goto(url,{waitUntil:'domcontentloaded',timeout:60000}); await p.waitForTimeout(2000);
await p.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=600){scrollTo(0,y);await new Promise(r=>setTimeout(r,40));}scrollTo(0,0);});
const r=await p.evaluate((proto)=>{
  const q=s=>{const e=document.querySelector(s);if(!e)return null;const r=e.getBoundingClientRect();return{y:Math.round(r.y+scrollY),h:Math.round(r.height)};};
  if(proto) return {img:q('.dl-intro__media img'),popH2:q('.dl-popular__title'),grid:q('.dl-grid')};
  return {img:q('.column_image img'),popH2:q('h2.wp-block-heading'),grid:q('.tour-grid')};
},proto);
console.log(url.includes('localhost')?'PROTO':'LIVE',JSON.stringify(r)); await b.close();
}
await m('https://indiauncharted.com/agra-tour-packages/',false);
await m('http://localhost:8791/destlanding-proposed.html',true);
