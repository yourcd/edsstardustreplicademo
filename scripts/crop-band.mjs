import {PNG} from 'pngjs'; import fs from 'fs';
const [a,b,y0,y1,out]=[process.argv[2],process.argv[3],+process.argv[4],+process.argv[5],process.argv[6]];
function crop(f){const p=PNG.sync.read(fs.readFileSync(f));const h=y1-y0;const o=new PNG({width:p.width,height:h});for(let y=0;y<h;y++)for(let x=0;x<p.width;x++){const si=((y0+y)*p.width+x)*4,di=(y*p.width+x)*4;for(let k=0;k<4;k++)o.data[di+k]=p.data[si+k];}return o;}
const ca=crop(a),cb=crop(b);const w=ca.width,h=ca.height;const comb=new PNG({width:w*2+10,height:h});
comb.data.fill(255);
for(let y=0;y<h;y++){for(let x=0;x<w;x++){const s=(y*w+x)*4;let d=(y*(w*2+10)+x)*4;for(let k=0;k<4;k++)comb.data[d+k]=ca.data[s+k];d=(y*(w*2+10)+(x+w+10))*4;for(let k=0;k<4;k++)comb.data[d+k]=cb.data[s+k];}}
fs.writeFileSync(out,PNG.sync.write(comb));console.log('wrote',out);
