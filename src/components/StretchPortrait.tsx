import React, { useEffect, useRef } from 'react';

export function StretchPortrait({ ar }: { ar: boolean }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const reduced = useRef(false);
  const state = useRef({ down:false, id:-1, ax:0, ay:0, tx:0, ty:0, x:0, y:0, vx:0, vy:0 });
  useEffect(() => {
    const el=canvas.current!; const ctx=el.getContext('2d'); if(!ctx) return;
    const image=new Image(); let raf=0, ready=false;
    const media=window.matchMedia('(prefers-reduced-motion: reduce)');
    const update=()=>{reduced.current=media.matches;};update();media.addEventListener('change',update);
    const cols=26, rows=30, w=650, h=735; el.width=w;el.height=h;
    const draw=()=>{
      const s=state.current;
      s.vx=(s.vx+(s.tx-s.x)*.14)*.73;s.vy=(s.vy+(s.ty-s.y)*.14)*.73;s.x+=s.vx;s.y+=s.vy;
      ctx.clearRect(0,0,w,h);
      const scale=Math.max(w/image.width,h/image.height), sw=w/scale,sh=h/scale;
      const sx=(image.width-sw)/2,sy=(image.height-sh)*.3;
      const deform=(u:number,v:number)=>{
        const distance=((u-s.ax)/.24)**2+((v-s.ay)/.27)**2;
        const edge=Math.sin(Math.PI*u)*Math.sin(Math.PI*v);
        const weight=Math.exp(-distance*1.7)*Math.max(0,edge);
        return [u*w+s.x*w*weight,v*h+s.y*h*weight];
      };
      const triangle=(uv:number[][], points:number[][])=>{
        const [a,b,c]=uv.map(([u,v])=>[sx+u*sw,sy+v*sh]);const [p,q,r]=points;
        const det=(b[0]-a[0])*(c[1]-a[1])-(c[0]-a[0])*(b[1]-a[1]);
        if(!det)return;
        const A=((q[0]-p[0])*(c[1]-a[1])-(r[0]-p[0])*(b[1]-a[1]))/det;
        const C=((r[0]-p[0])*(b[0]-a[0])-(q[0]-p[0])*(c[0]-a[0]))/det;
        const B=((q[1]-p[1])*(c[1]-a[1])-(r[1]-p[1])*(b[1]-a[1]))/det;
        const D=((r[1]-p[1])*(b[0]-a[0])-(q[1]-p[1])*(c[0]-a[0]))/det;
        ctx.save();ctx.beginPath();
        const cx=(p[0]+q[0]+r[0])/3,cy=(p[1]+q[1]+r[1])/3;
        [p,q,r].forEach(([x,y],i)=>{const dx=x-cx,dy=y-cy,len=Math.hypot(dx,dy)||1;const px=x+dx/len*.65,py=y+dy/len*.65;i?ctx.lineTo(px,py):ctx.moveTo(px,py);});ctx.closePath();ctx.clip();
        ctx.setTransform(A,B,C,D,p[0]-A*a[0]-C*a[1],p[1]-B*a[0]-D*a[1]);ctx.drawImage(image,0,0);ctx.restore();
      };
      if(Math.abs(s.x)+Math.abs(s.y)<.0001&&!s.down){ctx.drawImage(image,sx,sy,sw,sh,0,0,w,h);return;}
      for(let j=0;j<rows;j++)for(let i=0;i<cols;i++){
        const a=[i/cols,j/rows],b=[(i+1)/cols,j/rows],c=[(i+1)/cols,(j+1)/rows],d=[i/cols,(j+1)/rows];
        triangle([a,b,c],[deform(a[0],a[1]),deform(b[0],b[1]),deform(c[0],c[1])]);
        triangle([a,c,d],[deform(a[0],a[1]),deform(c[0],c[1]),deform(d[0],d[1])]);
      }
      
      if(s.down||Math.abs(s.x)+Math.abs(s.y)+Math.abs(s.vx)+Math.abs(s.vy)>.0001)raf=requestAnimationFrame(draw);
    };
    const wake=()=>{cancelAnimationFrame(raf);if(ready)raf=requestAnimationFrame(draw);};
    const point=(e:PointerEvent)=>{const r=el.getBoundingClientRect();return [(e.clientX-r.left)/r.width,(e.clientY-r.top)/r.height];};
    const down=(e:PointerEvent)=>{if(reduced.current||!ready||e.button!==0)return;const s=state.current;const [x,y]=point(e);if(y>.78)return;s.down=true;s.id=e.pointerId;s.ax=x;s.ay=y;s.tx=0;s.ty=0;el.setPointerCapture(e.pointerId);el.classList.add('is-grabbed');wake();};
    const move=(e:PointerEvent)=>{const s=state.current;if(!s.down||s.id!==e.pointerId)return;const [x,y]=point(e);s.tx=Math.max(-.2,Math.min(.2,x-s.ax));s.ty=Math.max(-.2,Math.min(.2,y-s.ay));};
    const up=(e:PointerEvent)=>{const s=state.current;if(s.id!==e.pointerId)return;s.down=false;s.tx=0;s.ty=0;el.classList.remove('is-grabbed');if(el.hasPointerCapture(e.pointerId))el.releasePointerCapture(e.pointerId);wake();};
    image.onload=()=>{ready=true;el.classList.add('is-ready');draw();};image.src='/brand/mugahed-portrait-v2.svg';
    el.addEventListener('pointerdown',down);el.addEventListener('pointermove',move);el.addEventListener('pointerup',up);el.addEventListener('pointercancel',up);el.addEventListener('lostpointercapture',up);
    return()=>{cancelAnimationFrame(raf);image.onload=null;media.removeEventListener('change',update);el.removeEventListener('pointerdown',down);el.removeEventListener('pointermove',move);el.removeEventListener('pointerup',up);el.removeEventListener('pointercancel',up);el.removeEventListener('lostpointercapture',up);};
  },[]);
  return <div className="portrait-frame portrait-stretch"><img src="/brand/mugahed-portrait-v2.svg" alt={ar?'مجاهد المعاري':'Portrait of Mugahed Al-Maari'} fetchPriority="high"/><canvas ref={canvas} role="img" aria-label={ar?'اسحب الوجه ثم اتركه ليرتد':'Drag the face and release to watch it spring back'} /></div>;
}


