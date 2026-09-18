import { chromium } from 'playwright';
const UA='Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1';
const b=await chromium.launch();const p=await(await b.newContext({viewport:{width:360,height:800},deviceScaleFactor:1,userAgent:UA,isMobile:true})).newPage();
await p.goto('https://indiauncharted.com/yoga-holiday-in-goa/',{waitUntil:'domcontentloaded'});await p.waitForTimeout(2000);
const r=await p.evaluate(()=>{const h=document.querySelector('.post-related .desc h4');const cs=getComputedStyle(h);const rc=h.getBoundingClientRect();const rm=document.querySelector('.post-related .button');const rmc=rm?getComputedStyle(rm):{};const rmr=rm?rm.getBoundingClientRect():{};return{h4:{fs:cs.fontSize,lh:cs.lineHeight,h:Math.round(rc.height)},readmore:{h:Math.round(rmr.height),pad:rmc.padding}};});
console.log(JSON.stringify(r));await b.close();
