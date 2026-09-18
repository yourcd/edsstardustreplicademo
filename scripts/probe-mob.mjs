import { chromium } from 'playwright';
const url=process.argv[2];const isLive=!url.includes('localhost');
const UA='Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1';
const b=await chromium.launch(); const ctx=await b.newContext({viewport:{width:360,height:800},deviceScaleFactor:1,userAgent:UA});
const p=await ctx.newPage(); await p.goto(url,{waitUntil:'domcontentloaded'}); await p.waitForTimeout(2000);
const r=await p.evaluate(({isLive})=>{
  const q=(s)=>document.querySelector(s);
  const g=(el)=>{if(!el)return null;const cs=getComputedStyle(el);const b=el.getBoundingClientRect();return{fs:cs.fontSize,lh:cs.lineHeight,mar:cs.margin,pad:cs.padding,w:Math.round(b.width),h:Math.round(b.height),ff:cs.fontFamily.split(',')[0]};};
  const title=isLive?'.entry-title':'.blog-card__title';
  const exc=isLive?'.post-excerpt':'.blog-card__excerpt';
  const body=isLive?'.post-desc':'.blog-card__body';
  const foot=isLive?'.post-footer':'.blog-card__footer';
  return {title:g(q(title)),excerpt:g(q(exc)),body:g(q(body)),footer:g(q(foot))};
},{isLive});
console.log(isLive?'LIVE':'PROTO',JSON.stringify(r,null,1));
await b.close();
