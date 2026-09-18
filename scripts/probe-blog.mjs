import { chromium } from 'playwright';
const url = process.argv[2] || 'https://indiauncharted.com/blogs/';
const width = +(process.argv[3] || 1440);
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width, height: 900 }, deviceScaleFactor: 1, userAgent: UA });
const p = await ctx.newPage();
await p.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
await p.waitForTimeout(2500);
await p.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=800){scrollTo(0,y);await new Promise(r=>setTimeout(r,40));}scrollTo(0,0);});
const cs = (el,props)=>{ if(!el) return null; const c=getComputedStyle(el); const r=el.getBoundingClientRect(); const o={rect:{x:Math.round(r.x),y:Math.round(r.y),w:Math.round(r.width),h:Math.round(r.height)}}; props.forEach(pr=>o[pr]=c.getPropertyValue(pr)); return o; };
const data = await p.evaluate(()=>{
  const cs=(el,props)=>{ if(!el) return null; const c=getComputedStyle(el); const r=el.getBoundingClientRect(); const o={rect:{x:Math.round(r.x),y:Math.round(r.y),w:Math.round(r.width),h:Math.round(r.height)}}; props.forEach(pr=>o[pr]=c.getPropertyValue(pr)); return o; };
  const box=['padding','margin','background-color','border-radius','box-shadow','width','display','gap'];
  const type=['font-family','font-size','font-weight','line-height','color','text-transform','text-align','margin','padding'];
  const out={};
  out.contentPadTop = cs(document.querySelector('#Content'),['padding']);
  const grid=document.querySelector('.posts_group');
  out.grid = grid?{...cs(grid,box), colCount:grid.className}:null;
  // grid computed grid-template? it's isotope, so floats. get columns via gap between items
  const items=[...document.querySelectorAll('.post-item')];
  out.itemCount=items.length;
  out.items=items.slice(0,4).map(it=>{ const r=it.getBoundingClientRect(); return {x:Math.round(r.x),y:Math.round(r.y),w:Math.round(r.width),h:Math.round(r.height)}; });
  const it0=items[0];
  if(it0){
    out.item0 = cs(it0,box);
    out.dateLabel = cs(it0.querySelector('.date_label'),[...type,'display']);
    out.imgFrame = cs(it0.querySelector('.image_frame'),box);
    out.imgWrapper = cs(it0.querySelector('.image_wrapper'),box);
    out.img = cs(it0.querySelector('img'),['width','height','object-fit','display','aspect-ratio']);
    out.postDescWrapper = cs(it0.querySelector('.post-desc-wrapper'),box);
    out.postDesc = cs(it0.querySelector('.post-desc'),box);
    out.postTitle = cs(it0.querySelector('.post-title'),box);
    out.title = cs(it0.querySelector('.entry-title'),type);
    out.titleA = cs(it0.querySelector('.entry-title a'),['color']);
    out.excerpt = cs(it0.querySelector('.post-excerpt'),type);
    out.footer = cs(it0.querySelector('.post-footer'),[...box]);
    out.buttonLove = cs(it0.querySelector('.button-love'),['display']);
    out.postLinks = cs(it0.querySelector('.post-links'),[...type,'display']);
    out.postComments = cs(it0.querySelector('.post-comments'),type);
    out.postMore = cs(it0.querySelector('.post-more'),type);
  }
  // section wrapper padding
  out.sectionMcb = cs(document.querySelector('.section.mcb-section'),['padding']);
  out.sectionWrapper = cs(document.querySelector('.section_wrapper.mcb-section-inner'),['padding','max-width','width']);
  out.ourBlogsH2 = cs(document.querySelector('.column_attr h2'),type);
  out.ourBlogsCol = cs(document.querySelector('.column_attr'),['text-align','padding','margin']);
  return out;
});
console.log(JSON.stringify(data,null,2));
await b.close();
