import { chromium } from 'playwright';
const UA='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:1440,height:900},deviceScaleFactor:1,userAgent:UA});
const p=await ctx.newPage();await p.goto('https://indiauncharted.com/yoga-holiday-in-goa/',{waitUntil:'domcontentloaded',timeout:60000});await p.waitForTimeout(2500);
await p.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=800){scrollTo(0,y);await new Promise(r=>setTimeout(r,40));}scrollTo(0,0);});
const res=await p.evaluate(()=>{
 const out={};const grab=(n,sel,props)=>{const el=document.querySelector(sel);if(!el){out[n]={M:sel};return;}const cs=getComputedStyle(el);const r=el.getBoundingClientRect();out[n]={x:Math.round(r.x),w:Math.round(r.width),bg:cs.background.slice(0,60),bgc:cs.backgroundColor,bs:cs.boxShadow,pad:cs.padding,mt:cs.marginTop,mb:cs.marginBottom,br:cs.borderRadius};for(const pr of props||[])out[n][pr]=cs[pr];};
 grab('aboutSec','.section-post-about');
 grab('aboutWrap','.section-post-about .section_wrapper');
 grab('authCol','.column.one.author-box');
 grab('authWrap','.author-box-wrapper');
 grab('descWrap','.desc-wrapper');
 grab('singlePhoto','.single-photo-wrapper.image');
 grab('imgFrame','.single-photo-wrapper.image .image_frame');
 grab('shareWrap','.share_wrapper',['position','left','top']);
 return out;
});
console.log(JSON.stringify(res,null,1));await b.close();
