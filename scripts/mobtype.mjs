import { chromium } from 'playwright';
const UA='Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1';
const b=await chromium.launch(); const ctx=await b.newContext({viewport:{width:360,height:800},deviceScaleFactor:1,userAgent:UA,isMobile:true});
const p=await ctx.newPage(); await p.goto('https://indiauncharted.com/agra-tour-packages/',{waitUntil:'domcontentloaded',timeout:60000}); await p.waitForTimeout(2000);
const r=await p.evaluate(()=>{
  const g=(s,ps)=>{const e=document.querySelector(s);if(!e)return null;const c=getComputedStyle(e);const o={};ps.forEach(x=>o[x]=c.getPropertyValue(x));return o;};
  const t=['font-size','line-height','margin','padding','text-align'];
  return {
    subheader:g('#Subheader',['padding','min-height']),
    subTitle:g('#Subheader .title',['font-size','line-height']),
    section:g('.entry-content .section.mcb-section',['padding']),
    introH2:g('.column_visual h2',t),introP:g('.column_visual p',t),introH4:g('.column_visual h4',t),
    popH2:g('h2.wp-block-heading',t),
    title:g('.ova-product-title',['font-size','line-height','padding']),
    container:g('.section_wrapper',['padding','width','max-width']),
  };
});
console.log(JSON.stringify(r,null,1)); await b.close();
