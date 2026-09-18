import { chromium } from 'playwright';
const UA='Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 Safari/604.1';
const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:360,height:800},deviceScaleFactor:1,userAgent:UA,isMobile:true});
const p=await ctx.newPage();await p.goto('https://indiauncharted.com/contact-us/',{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
const d=await p.evaluate(()=>{const out={};
 const gi=document.querySelectorAll('#Content h2')[0];const r=gi.getBoundingClientRect();out.gi={y:Math.round(r.y+scrollY),h:Math.round(r.height),fs:getComputedStyle(gi).fontSize,lh:getComputedStyle(gi).lineHeight};
 out.cards=[...document.querySelectorAll('#Content .one-third .column_attr')].map(c=>{const rr=c.getBoundingClientRect();return{y:Math.round(rr.y+scrollY),h:Math.round(rr.height)};});
 const fw=document.querySelectorAll('#Content .one-second .column_attr')[0];const fr=fw.getBoundingClientRect();out.formwrap={y:Math.round(fr.y+scrollY),h:Math.round(fr.height),pad:getComputedStyle(fw).padding};
 const eh=document.querySelector('.wpcf7').closest('.column_attr').querySelector('h2');const er=eh.getBoundingClientRect();out.enqH2={y:Math.round(er.y+scrollY),h:Math.round(er.height),fs:getComputedStyle(eh).fontSize};
 const inp=document.querySelector('.wpcf7-form input');out.inputH=Math.round(inp.getBoundingClientRect().height);
 // section bgs
 out.sec2=[...document.querySelectorAll('#Content .section')].map(s=>{const sr=s.getBoundingClientRect();return{y:Math.round(sr.y+scrollY),h:Math.round(sr.height),pad:getComputedStyle(s).padding};}).slice(0,2);
 return out;});
console.log(JSON.stringify(d,null,1));await b.close();
