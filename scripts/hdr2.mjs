import { chromium } from 'playwright';
const UA='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
const b=await chromium.launch(); const ctx=await b.newContext({viewport:{width:1440,height:900},deviceScaleFactor:1,userAgent:UA});
const p=await ctx.newPage(); await p.goto('https://indiauncharted.com/',{waitUntil:'domcontentloaded',timeout:60000}); await p.waitForTimeout(3500);
const r=await p.evaluate(()=>{
  const navlinks=[...document.querySelectorAll('#Top_bar a, .menu a, nav a, header a')].filter(a=>a.offsetParent&&a.innerText.trim()).slice(0,10).map(a=>{const cs=getComputedStyle(a);const rr=a.getBoundingClientRect();return{t:a.innerText.trim().slice(0,20),color:cs.color,size:cs.fontSize,y:Math.round(rr.y)};});
  // logo
  const logo=document.querySelector('#logo img, .logo img, header img');
  const lr=logo?logo.getBoundingClientRect():null;
  // hero content start (h1 in slider)
  const heroTop=document.querySelector('.rev_slider, #rev_slider_1_1_wrapper, .mfn-main-slider, .rev_slider_wrapper');
  const ht=heroTop?heroTop.getBoundingClientRect():null;
  // first section after header
  return {navlinks, logo:lr?{h:Math.round(lr.height),y:Math.round(lr.y),src:logo.src}:null, heroSlider:ht?{y:Math.round(ht.y+scrollY),h:Math.round(ht.height)}:null};
});
console.log(JSON.stringify(r,null,1)); await b.close();
