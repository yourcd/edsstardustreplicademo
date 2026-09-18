import { chromium } from 'playwright';
const UA='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
const b=await chromium.launch(); const ctx=await b.newContext({viewport:{width:1440,height:900},deviceScaleFactor:1,userAgent:UA});
const p=await ctx.newPage(); await p.goto('https://indiauncharted.com/blogs/',{waitUntil:'domcontentloaded'}); await p.waitForTimeout(2000);
const r=await p.evaluate(()=>{
  const love=document.querySelector('.button-love');
  const lcs=love?getComputedStyle(love):null;
  const lb=love?love.getBoundingClientRect():null;
  const foot=document.querySelector('.post-footer');
  const fcs=foot?getComputedStyle(foot):null;
  const links=document.querySelector('.post-links');
  const lics=links?getComputedStyle(links):null;
  const lib=links?links.getBoundingClientRect():null;
  return {love:lcs?{display:lcs.display,visibility:lcs.visibility,w:lb.width,h:lb.height,x:Math.round(lb.x)}:'none',
    footer:fcs?{display:fcs.display,justify:fcs.justifyContent,pad:fcs.padding,bg:fcs.backgroundColor}:'none',
    links:lics?{x:Math.round(lib.x),w:Math.round(lib.width),color:lics.color,fs:lics.fontSize}:'none'};
});
console.log(JSON.stringify(r,null,1));
await b.close();
