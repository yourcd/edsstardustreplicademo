import { chromium } from 'playwright';
const UA='Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1';
const b=await chromium.launch(); const ctx=await b.newContext({viewport:{width:360,height:800},deviceScaleFactor:1,userAgent:UA,isMobile:true});
const p=await ctx.newPage(); await p.goto('https://indiauncharted.com/agra-tour-packages/',{waitUntil:'domcontentloaded',timeout:60000}); await p.waitForTimeout(2000);
const r=await p.evaluate(()=>{
  const g=s=>{const e=document.querySelector(s);if(!e)return null;const c=getComputedStyle(e);const r=e.getBoundingClientRect();return{y:Math.round(r.y),h:Math.round(r.height),pos:c.position,mt:c.marginTop,pt:c.paddingTop};};
  return {header:g('#Header, header, .mfn-header, #Top_bar')||g('header'), body:g('body'), content:g('#Content'), wrapper:g('#Wrapper')};
});
console.log(JSON.stringify(r,null,1)); await b.close();
