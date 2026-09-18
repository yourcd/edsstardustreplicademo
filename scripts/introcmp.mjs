import { chromium } from 'playwright';
async function m(url,proto){
const UA='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
const b=await chromium.launch(); const ctx=await b.newContext({viewport:{width:1440,height:1000},deviceScaleFactor:1,userAgent:UA});
const p=await ctx.newPage(); await p.goto(url,{waitUntil:'domcontentloaded',timeout:60000}); await p.waitForTimeout(2000);
const r=await p.evaluate((proto)=>{
  const q=s=>{const e=document.querySelector(s);if(!e)return null;const r=e.getBoundingClientRect();return{x:Math.round(r.x),y:Math.round(r.y),w:Math.round(r.width),h:Math.round(r.height)};};
  if(proto) return {copy:q('.dl-intro__copy'),img:q('.dl-intro__media img'),h2:q('.dl-intro__copy h2')};
  return {copy:q('.column_visual'),img:q('.column_image img'),h2:q('.column_visual h2')};
},proto);
console.log(url.includes('localhost')?'PROTO':'LIVE',JSON.stringify(r)); await b.close();
}
await m('https://indiauncharted.com/agra-tour-packages/',false);
await m('http://localhost:8791/destlanding-proposed.html',true);
