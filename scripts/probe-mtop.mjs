import { chromium } from 'playwright';
const url=process.argv[2];const isLive=!url.includes('localhost');
const UA='Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1';
const b=await chromium.launch(); const ctx=await b.newContext({viewport:{width:360,height:800},deviceScaleFactor:1,userAgent:UA});
const p=await ctx.newPage(); await p.goto(url,{waitUntil:'domcontentloaded'}); await p.waitForTimeout(2000);
const r=await p.evaluate(({isLive})=>{
  const q=(s)=>{const e=document.querySelector(s);if(!e)return null;const b=e.getBoundingClientRect();return{y:Math.round(b.y+scrollY),h:Math.round(b.height)};};
  const head=isLive?'#Top_bar, header':'.iu-header';
  const banner=isLive?'.section.mcb-section, #Subheader':'.blog-banner';
  const h1=isLive?'h1':'.iu-pagebanner__title';
  const heading=isLive?'.column_column h2, .title':'.blog-heading';
  return {header:q(isLive?'#Top_bar':'.iu-header'), subheader:q(isLive?'#Subheader':'.blog-banner'), h1:q(h1), ourblogs:null};
},{isLive});
console.log(isLive?'LIVE':'PROTO',JSON.stringify(r));
await b.close();
