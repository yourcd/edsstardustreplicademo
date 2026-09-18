import {PNG} from 'pngjs'; import fs from 'fs';
const a=PNG.sync.read(fs.readFileSync(process.argv[2]));
const b=PNG.sync.read(fs.readFileSync(process.argv[3]));
const y0=+process.argv[4],y1=+process.argv[5];
const w=Math.min(a.width,b.width);let diff=0,tot=0;
for(let y=y0;y<y1;y++)for(let x=0;x<w;x++){const i=(y*a.width+x)*4,j=(y*b.width+x)*4;
  const d=Math.abs(a.data[i]-b.data[j])+Math.abs(a.data[i+1]-b.data[j+1])+Math.abs(a.data[i+2]-b.data[j+2]);
  tot++; if(d>60)diff++;}
console.log(`region y${y0}-${y1}: ${(100*diff/tot).toFixed(2)}%  (${diff}/${tot})`);
