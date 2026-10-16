import * as THREE from 'three';
import { OrbitControls } from './assets/OrbitControls.js';

const V = (x=0,y=0,z=0) => new THREE.Vector3(x,y,z);
const mat=(color,metalness=.45,roughness=.5)=>new THREE.MeshStandardMaterial({color,metalness,roughness});
const M={frame:mat('#424c52',.75,.36),dark:mat('#181f23',.55,.48),black:mat('#0c1215',.3,.62),metal:mat('#9aa6ad',.85,.32),pcb:mat('#24443c',.25,.62),chip:mat('#1c2528',.4,.5),gold:mat('#c7ab6e',.72,.4),lime:mat('#b2d87c',.4,.32),white:mat('#cbd4d3',.5,.4),wire:mat('#1a2127',.15,.8)};
const makeMesh=(geo,m,parent,pos)=>{const o=new THREE.Mesh(geo,m);o.position.copy(pos||V());o.castShadow=true;o.receiveShadow=true;parent.add(o);return o;};
const box=(p,size,pos,m=M.dark)=>makeMesh(new THREE.BoxGeometry(...size),m,p,V(...pos));
const cyl=(p,r,h,pos,m=M.metal,axis='z',segments=24)=>{const o=makeMesh(new THREE.CylinderGeometry(r,r,h,segments),m,p,V(...pos));if(axis==='z')o.rotation.x=Math.PI/2;if(axis==='x')o.rotation.z=Math.PI/2;return o;};
const ring=(p,r,t,pos,m=M.lime,axis='z')=>{const o=makeMesh(new THREE.TorusGeometry(r,t,8,48),m,p,V(...pos));if(axis==='x')o.rotation.y=Math.PI/2;if(axis==='y')o.rotation.x=Math.PI/2;return o;};
function screw(p,x,y,z){cyl(p,.035,.025,[x,y,z],M.metal);box(p,[.041,.007,.005],[x,y,z+.015],M.black);}
function label(p,text,pos,w,h,color='#bfc8c6',bg=null){const c=document.createElement('canvas');c.width=512;c.height=128;const ctx=c.getContext('2d');if(bg){ctx.fillStyle=bg;ctx.fillRect(0,0,512,128);}ctx.fillStyle=color;ctx.font='600 47px Arial';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(text,256,66);const texture=new THREE.CanvasTexture(c);texture.colorSpace=THREE.SRGBColorSpace;const m=new THREE.MeshBasicMaterial({map:texture,transparent:true,depthWrite:false,side:THREE.DoubleSide});const o=new THREE.Mesh(new THREE.PlaneGeometry(w,h),m);o.position.set(...pos);p.add(o);return o;}
function fan(p,pos,r=.48,axis='z',accent=false){const g=new THREE.Group();g.position.set(...pos);if(axis==='x')g.rotation.y=Math.PI/2;if(axis==='y')g.rotation.x=-Math.PI/2;p.add(g);box(g,[r*2.17,r*2.17,.10],[0,0,0],M.black);ring(g,r,.027,[0,0,.08],accent?M.lime:M.frame);ring(g,r*.88,.018,[0,0,.085],M.frame);cyl(g,r*.25,.13,[0,0,.09],M.metal);for(let i=0;i<9;i++){const blade=new THREE.Group();blade.rotation.z=i*Math.PI*2/9;g.add(blade);const b=box(blade,[r*.29,r*.62,.037],[r*.2,r*.46,.055],M.frame);b.rotation.z=-.42;}for(const x of [-1,1])for(const y of [-1,1])screw(g,x*r*.94,y*r*.94,.08);return g;}
function cable(p,pts,color=M.wire,r=.037){const c=new THREE.CatmullRomCurve3(pts.map(q=>V(...q)));return makeMesh(new THREE.TubeGeometry(c,28,r,6,false),color,p);}

export function createLab({container,onPartClick,onReady,onError}){
 const reduceMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
 let renderer;
 try{renderer=new THREE.WebGLRenderer({antialias:true,alpha:true,powerPreference:'high-performance'});}catch(e){onError(e);return null;}
 renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.55;container.appendChild(renderer.domElement);renderer.domElement.setAttribute('aria-label','컴퓨터 3D 모델. 마우스로 회전하거나 터치로 확대하세요.');renderer.domElement.setAttribute('role','img');
 const scene=new THREE.Scene();scene.fog=new THREE.Fog('#20272b',19,37);
 const camera=new THREE.PerspectiveCamera(35,1,.1,70);camera.position.set(7.2,4.5,9.4);
 const controls=new OrbitControls(camera,renderer.domElement);controls.target.set(0,0,0);controls.enableDamping=true;controls.dampingFactor=.09;controls.minDistance=5.6;controls.maxDistance=24;controls.maxPolarAngle=Math.PI*.87;controls.enablePan=true;controls.panSpeed=.65;controls.rotateSpeed=.65;
 scene.add(new THREE.HemisphereLight('#d1e1e6','#485143',3));
 const key=new THREE.DirectionalLight('#e3eced',4.3);key.position.set(3,7,7);key.castShadow=true;key.shadow.mapSize.set(2048,2048);key.shadow.camera.left=-8;key.shadow.camera.right=8;key.shadow.camera.top=8;key.shadow.camera.bottom=-8;key.shadow.normalBias=.035;key.shadow.bias=-.0004;scene.add(key);
 const fill=new THREE.DirectionalLight('#b5d4e7',2);fill.position.set(-6,2,3);scene.add(fill);const rim=new THREE.DirectionalLight('#c6de9c',2.4);rim.position.set(2,4,-6);scene.add(rim);
 const floor=new THREE.Mesh(new THREE.PlaneGeometry(60,60),new THREE.ShadowMaterial({opacity:.23}));floor.rotation.x=-Math.PI/2;floor.position.y=-2.52;floor.receiveShadow=true;scene.add(floor);
 const grid=new THREE.GridHelper(36,45,'#405258','#364349');grid.position.y=-2.525;grid.material.transparent=true;grid.material.opacity=.32;scene.add(grid);
 const root=new THREE.Group();scene.add(root);const chassis=new THREE.Group();root.add(chassis);
 // A transparent side looks into the real arrangement: board at the back, front intake at the right.
 box(chassis,[3.1,.12,2.05],[0,-2.1,0],M.frame);box(chassis,[3.1,.13,2.05],[0,2.1,0],M.frame);
 box(chassis,[3.1,4.2,.08],[0,0,-1],M.dark);
 for(const x of [-1.5,1.5])for(const z of [-.97,.97])box(chassis,[.10,4.2,.10],[x,0,z],M.frame);
 for(const y of [-2.05,2.05])box(chassis,[3.05,.10,.10],[0,y,.97],M.frame);
 for(const z of [-.68,.68])for(const x of [-1.17,1.17])box(chassis,[.35,.18,.35],[x,-2.24,z],M.black);
 // Front bezel and three intake fans.
 box(chassis,[.12,4.08,1.88],[1.5,0,0],M.black);
 for(const y of [-1.28,0,1.28])fan(chassis,[1.58,y,0],.5,'x',true);
 for(const z of [-.88,.88])box(chassis,[.14,4.18,.08],[1.66,0,z],M.frame);
 for(let z=-.77;z<.8;z+=.1)box(chassis,[.025,.32,.035],[1.74,1.89,z],M.frame);
 for(let i=0;i<13;i++)box(chassis,[2.0,.011,.031],[-.18,2.17,-.68+i*.105],M.black);
 const power=cyl(chassis,.065,.018,[1.1,2.18,.48],M.metal,'y');ring(chassis,.041,.007,[1.1,2.195,.48],M.lime,'y');
 for(let i=0;i<2;i++)box(chassis,[.15,.017,.065],[.65+i*.24,2.18,.48],M.black);
 // Rear supports, expansion slot ribs, and rear fan.
 for(let y=-1.1;y<.5;y+=.16)box(chassis,[.09,.055,1.4],[-1.48,y,-.03],M.frame);
 fan(chassis,[-1.43,1.28,0],.46,'x',false);
 label(chassis,'PC / LAB',[-.8,-1.78,1.035],.72,.18,'#8b9d9f');
 const groups={},homes={},targets={},rotTargets={},labelAnchors={};
 function part(id,home,away){const g=new THREE.Group();g.userData.part=id;g.position.set(...home);root.add(g);groups[id]=g;homes[id]={home:V(...home),away:V(...away)};targets[id]=g.position.clone();rotTargets[id]=new THREE.Euler();return g;}
 const mb=part('motherboard',[-.17,.36,-.77],[.4,.5,-3.1]);
 box(mb,[2.40,2.96,.065],[0,0,0],M.pcb);
 // Board traces form legible copper routes; sockets and connectors are raised geometry.
 for(let i=0;i<26;i++){let x=-1.1+(i%13)*.17,y=-1.34+Math.floor(i/13)*.47;box(mb,[.009,.42,.005],[x,y+.2,.037],M.gold);box(mb,[.12,.008,.005],[x+.056,y,.038],M.gold);}
 for(let i=0;i<16;i++){const x=-1.08+(i%4)*.21,y=.95-Math.floor(i/4)*.35;box(mb,[.105,.16,.06],[x,y,.08],M.chip);}
 box(mb,[.92,.93,.1],[-.18,.44,.08],M.metal);box(mb,[.77,.77,.11],[-.18,.44,.1],M.black);
 for(const x of [.67,.9]){box(mb,[.10,1.70,.11],[x,.45,.09],M.black);for(const y of [-.45,1.35])box(mb,[.15,.12,.15],[x,y,.12],M.white);}
 box(mb,[1.65,.12,.14],[-.17,-.56,.11],M.metal);box(mb,[1.5,.055,.16],[-.19,-.56,.13],M.black);
 for(let i=0;i<2;i++)box(mb,[.75,.09,.11],[-.65,-1.03+i*.24,.09],M.black);
 box(mb,[.55,.57,.14],[.75,-1.03,.1],M.frame);for(let i=0;i<7;i++)box(mb,[.46,.023,.04],[.75,-1.27+i*.075,.19],M.metal);
 box(mb,[.15,.63,.2],[1.1,.1,.15],M.black);for(let i=0;i<12;i++)box(mb,[.06,.026,.05],[1.1,-.16+i*.047,.27],M.metal);
 box(mb,[.34,.92,.35],[-1.09,.84,.2],M.metal);for(let i=0;i<4;i++)box(mb,[.36,.10,.25],[-1.1,.51+i*.20,.27],M.black);
 for(const x of [-1.12,1.1])for(const y of [-1.38,1.38])screw(mb,x,y,.06);
 cyl(mb,.13,.04,[-.13,-1.14,.08],M.metal);
 label(mb,'ATX  //  SERIES 01',[.12,-1.36,.041],.7,.10,'#afc2ae');
 const cpu=part('cpu',[-.35,.80,-.56],[-.7,3.1,1.4]);box(cpu,[.68,.68,.055],[0,0,0],M.pcb);box(cpu,[.56,.56,.065],[0,0,.045],M.metal);label(cpu,'CORE',[0,.08,.082],.31,.08,'#414c50');label(cpu,'PROCESSOR',[0,-.08,.082],.42,.055,'#5c6667');const corner=box(cpu,[.045,.045,.008],[-.29,-.29,.036],M.gold);corner.rotation.z=Math.PI/4;
 const ram=part('ram',[.61,.78,-.40],[2.6,1.8,1.3]);
 for(const x of [-.12,.12]){box(ram,[.10,1.60,.38],[x,0,0],M.pcb);box(ram,[.14,1.46,.34],[x,.02,.08],M.dark);box(ram,[.15,1.47,.055],[x,.03,.28],M.lime);for(let y=-.6;y<.7;y+=.24)box(ram,[.16,.15,.22],[x,y,.08],M.chip);for(let y=-.71;y<.75;y+=.055)box(ram,[.12,.029,.03],[x,y,-.20],M.gold);}
 const cooler=part('cooler',[-.35,.80,-.03],[-2.7,1.9,1.65]);box(cooler,[.83,.85,.55],[0,0,0],M.metal);for(let y=-.40;y<=.41;y+=.047)box(cooler,[.90,.018,.62],[0,y,.015],M.frame);for(const x of [-.25,0,.25])cable(cooler,[[x,-.3,-.3],[x,-.5,-.25],[x,-.5,.15],[x,-.25,.18]],M.gold,.025);fan(cooler,[0,0,.37],.47,'z',true);label(cooler,'AIR',[0,0,.525],.18,.07,'#25361c');
 const gpu=part('gpu',[-.1,-.40,.02],[-3.2,-.5,1.7]);box(gpu,[2.45,.46,1.05],[0,0,0],M.dark);box(gpu,[2.45,.05,1.08],[0,.255,0],M.frame);for(let i=0;i<17;i++)box(gpu,[.018,.28,.9],[-1.1+i*.135,-.01,.03],M.metal);box(gpu,[2.43,.32,.07],[0,.015,.56],M.black);label(gpu,'GEFORCE RTX',[.10,.035,.602],1.18,.15,'#baccb5');box(gpu,[.55,.04,.015],[.71,-.12,.60],M.lime);for(const x of [-.66,.55])fan(gpu,[x,-.26,0],.43,'y');box(gpu,[.11,.59,1.17],[-1.28,.04,0],M.metal);for(let i=0;i<3;i++)box(gpu,[.025,.10,.22],[-1.345,.04,-.30+i*.3],M.black);for(let i=0;i<22;i++)box(gpu,[.043,.11,.035],[-.95+i*.067,.3,-.49],M.gold);
 const ssd=part('ssd',[.33,-.53,-.55],[2.7,.05,1.5]);box(ssd,[1.05,.31,.035],[0,0,0],M.pcb);for(const x of [-.30,.05,.37])box(ssd,[.24,.23,.035],[x,0,.03],M.chip);label(ssd,'NVMe  1 TB',[-.05,0,.052],.7,.12,'#b9c6bc','#26302c');for(let i=0;i<9;i++)box(ssd,[.05,.018,.004],[-.52,-.12+i*.03,.022],M.gold);screw(ssd,.49,0,.025);
 const psu=part('psu',[-.64,-1.58,-.03],[2.6,-1.45,1.2]);box(psu,[1.55,.83,1.72],[0,0,0],M.dark);box(psu,[1.57,.85,.035],[0,0,.87],M.frame);label(psu,'750 W',[0,.06,.895],.75,.23,'#d0d8cb');label(psu,'POWER SUPPLY',[0,-.17,.895],.71,.09,'#9ba994');box(psu,[.04,.67,.02],[-.62,0,.9],M.lime);fan(psu,[0,.435,0],.56,'y');for(let i=0;i<7;i++)box(psu,[.02,.045,1.36],[-.79,-.27+i*.09,0],M.black);
 const cables=part('cables',[0,0,0],[-2.65,-1.88,1.4]);
 for(let i=0;i<6;i++)cable(cables,[[.94,.33,-.40],[1.17,.34,-.06],[1.12,-1.04,.25],[.43,-1.2,.1],[.04,-1.4,.03+i*.055]],i===1||i===4?M.frame:M.wire,.026);
 for(let i=0;i<4;i++)cable(cables,[[.8,-.37,.42],[1.12,-.50,.65],[1.01,-1.11,.62],[.14,-1.4,.28+i*.05]],M.wire,.026);
 cable(cables,[[-.99,1.65,-.6],[-1.15,1.79,-.25],[-1.24,-1.15,-.12],[-.53,-1.3,-.1]],M.wire,.045);box(cables,[.18,.49,.15],[.94,.31,-.40],M.black);box(cables,[.22,.13,.12],[.80,-.37,.42],M.black);
 const panel=part('panel',[0,0,1.03],[-3.9,.1,.6]);const glass=new THREE.MeshPhysicalMaterial({color:'#9eb6b6',metalness:.0,roughness:.12,transparent:true,opacity:.085,side:THREE.DoubleSide,depthWrite:false});box(panel,[3.02,4.12,.035],[0,0,0],glass);for(const x of [-1.48,1.48])box(panel,[.045,4.1,.045],[x,0,0],M.frame);for(const y of [-2.04,2.04])box(panel,[3.00,.045,.045],[0,y,0],M.frame);for(const x of [-1.39,1.39])for(const y of [-1.95,1.95])screw(panel,x,y,.035);
 for(const [id,g]of Object.entries(groups)){g.traverse(o=>{if(o.isMesh)o.userData.part=id;});labelAnchors[id]=new THREE.Vector3();}
 const selection=new THREE.Box3Helper(new THREE.Box3(),new THREE.Color('#c5f277'));selection.material.transparent=true;selection.material.opacity=.48;selection.visible=false;scene.add(selection);
 let selected=null,labelsVisible=false,exploded=false,cameraTween=null,removedSet=new Set(),disposed=false;
 const labelLayer=document.getElementById('labels');const labelEls={};
 const names={panel:'사이드 패널',motherboard:'메인보드',cpu:'CPU',ram:'메모리',cooler:'CPU 쿨러',gpu:'그래픽카드',ssd:'SSD',psu:'전원 공급 장치',cables:'연결 케이블'};
 for(const [id,name]of Object.entries(names)){const el=document.createElement('button');el.className='part-label';el.textContent=name;el.hidden=true;el.addEventListener('click',()=>onPartClick(id));labelLayer.appendChild(el);labelEls[id]=el;}
 function cameraTo(view='perspective',wide=false){const scale=wide?1.48:1;const positions={perspective:V(7.2,4.5,9.4),front:V(0,1,12.7),side:V(12.7,1,.1),top:V(.1,13,.1)};const to=(positions[view]||positions.perspective).multiplyScalar(scale);if(reduceMotion){camera.position.copy(to);controls.target.set(0,0,0);cameraTween=null;return;}cameraTween={from:camera.position.clone(),to,targetFrom:controls.target.clone(),start:performance.now()};}
 controls.addEventListener('start',()=>{cameraTween=null;});
 function updateParts(removed,all=false){removedSet=new Set(removed);exploded=all;Object.entries(groups).forEach(([id])=>{const out=all||removedSet.has(id);targets[id].copy(out?homes[id].away:homes[id].home);rotTargets[id].set(0,id==='panel'&&out?-.28:0,id==='ram'&&out?-.12:0);});cameraTo('perspective',all||removedSet.size>0);}
 const raycaster=new THREE.Raycaster(),pointer=new THREE.Vector2();let down=null;
 renderer.domElement.addEventListener('pointerdown',e=>{down=[e.clientX,e.clientY];});
 renderer.domElement.addEventListener('pointerup',e=>{if(!down||Math.hypot(e.clientX-down[0],e.clientY-down[1])>5)return;const r=renderer.domElement.getBoundingClientRect();pointer.set((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);raycaster.setFromCamera(pointer,camera);const hits=raycaster.intersectObjects(Object.values(groups),true).filter(h=>h.object.isMesh&&!(h.object.userData.part==='panel'&&h.object.material===glass));if(hits.length)onPartClick(hits[0].object.userData.part);down=null;});
 function resize(){const w=container.clientWidth,h=container.clientHeight;if(!w||!h)return;renderer.setSize(w,h);camera.aspect=w/h;camera.updateProjectionMatrix();}
 const ro=new ResizeObserver(resize);ro.observe(container);resize();
 let last=performance.now();const vec=V();
 function animate(now){if(disposed)return;const dt=Math.min((now-last)/1000,.05);last=now;const lerp=reduceMotion?1:1-Math.exp(-dt*5);Object.entries(groups).forEach(([id,g])=>{g.position.lerp(targets[id],lerp);g.rotation.y=THREE.MathUtils.lerp(g.rotation.y,rotTargets[id].y,lerp);g.rotation.z=THREE.MathUtils.lerp(g.rotation.z,rotTargets[id].z,lerp);});
 if(cameraTween){const t=Math.min((now-cameraTween.start)/950,1),ease=1-Math.pow(1-t,3);camera.position.lerpVectors(cameraTween.from,cameraTween.to,ease);controls.target.lerpVectors(cameraTween.targetFrom,V(),ease);if(t===1)cameraTween=null;}
 controls.update();if(selected){selection.box.setFromObject(groups[selected]);selection.visible=true;}else selection.visible=false;
 for(const [id,g]of Object.entries(groups)){const el=labelEls[id],show=labelsVisible&&(id!=='panel'||removedSet.has('panel')||exploded);el.hidden=!show;if(show){g.getWorldPosition(vec);if(id==='cables')vec.add(V(1,-.6,.6));vec.project(camera);el.style.left=`${(vec.x*.5+.5)*container.clientWidth}px`;el.style.top=`${(-vec.y*.5+.5)*container.clientHeight}px`;el.style.opacity=vec.z>1?'0':'1';}}
 if(container.clientWidth&&container.clientHeight&&!document.hidden)renderer.render(scene,camera);requestAnimationFrame(animate);}
 requestAnimationFrame(animate);onReady();
 return {updateParts,select(id){selected=id;},labels(show){labelsVisible=show;},view(name){cameraTo(name,exploded||removedSet.size>0);},resetCamera(){cameraTo('perspective',exploded||removedSet.size>0);},
 thumbnails(ids){const output={};const tr=new THREE.WebGLRenderer({antialias:true,alpha:true,preserveDrawingBuffer:true});tr.setSize(420,240);tr.setPixelRatio(1);tr.outputColorSpace=THREE.SRGBColorSpace;tr.toneMapping=THREE.ACESFilmicToneMapping;tr.toneMappingExposure=1.5;const ts=new THREE.Scene();ts.add(new THREE.HemisphereLight('#ebf5e8','#30454b',3));const tl=new THREE.DirectionalLight('#ffffff',4);tl.position.set(-3,5,6);ts.add(tl);const tc=new THREE.PerspectiveCamera(32,420/240,.1,30);for(const id of ids){const g=groups[id].clone(true);g.position.set(0,0,0);g.rotation.set(0,0,0);ts.add(g);const bounds=new THREE.Box3().setFromObject(g),center=bounds.getCenter(V()),size=bounds.getSize(V());g.position.sub(center);const d=Math.max(size.x*.65,size.y,size.z*.7)*2.3;tc.position.set(d*.6,d*.35,d);tc.lookAt(0,0,0);tr.render(ts,tc);output[id]=tr.domElement.toDataURL('image/png');ts.remove(g);}tr.dispose();return output;},
 dispose(){disposed=true;ro.disconnect();controls.dispose();renderer.dispose();}
 };
}
