import * as THREE from 'three';
import {buildCar,setPartRemoved} from './vehicles.js';

export function createWorld(renderer){
  const scene=new THREE.Scene();scene.background=new THREE.Color(0x7d8984);scene.fog=new THREE.Fog(0x7d8984,28,85);
  const camera=new THREE.PerspectiveCamera(48,1,.1,180);camera.position.set(10,8,12);
  scene.add(new THREE.HemisphereLight(0xe4eee6,0x42483e,2.0));
  const sun=new THREE.DirectionalLight(0xfff0d9,3.0);sun.position.set(-12,18,9);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);sun.shadow.camera.left=-30;sun.shadow.camera.right=30;sun.shadow.camera.top=30;sun.shadow.camera.bottom=-30;sun.shadow.bias=-.0003;scene.add(sun);
  const groundMat=new THREE.MeshStandardMaterial({color:0x74796d,roughness:1});const ground=new THREE.Mesh(new THREE.PlaneGeometry(120,120),groundMat);ground.rotation.x=-Math.PI/2;ground.receiveShadow=true;scene.add(ground);
  // Gravel-like mottling via many tiny flattened stones.
  const gravelMat=[0x656b60,0x858778,0x5d655b,0x929181].map(c=>new THREE.MeshStandardMaterial({color:c,roughness:1}));
  let seed=473;const rand=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};
  const gravelGeo=new THREE.BoxGeometry(.08,.018,.055);for(let i=0;i<650;i++){const stone=new THREE.Mesh(gravelGeo,gravelMat[Math.floor(rand()*gravelMat.length)]);stone.position.set((rand()-.5)*45,.012,(rand()-.5)*42);stone.rotation.y=rand()*Math.PI;stone.scale.set(.5+rand()*2,1,.5+rand()*1.7);scene.add(stone);}
  // Concrete work pad and painted bay lines.
  const pad=new THREE.Mesh(new THREE.BoxGeometry(15,.08,11),new THREE.MeshStandardMaterial({color:0x686e67,roughness:.93}));pad.position.set(0,.02,-7);pad.receiveShadow=true;scene.add(pad);
  const lineMat=new THREE.MeshBasicMaterial({color:0xc8c8a7,transparent:true,opacity:.48});
  for(let i=0;i<4;i++){const line=new THREE.Mesh(new THREE.BoxGeometry(.055,.012,8.5),lineMat);line.position.set(-5.3+i*3.55,.07,-7);scene.add(line);}
  // Industrial fence around the yard.
  const fenceMat=new THREE.MeshStandardMaterial({color:0x454d47,metalness:.55,roughness:.7});
  for(let z=-20;z<=20;z+=2){const post=new THREE.Mesh(new THREE.BoxGeometry(.12,1.8,.12),fenceMat);post.position.set(-14,.9,z);post.castShadow=true;scene.add(post);const post2=post.clone();post2.position.x=14;scene.add(post2);}
  for(let x=-14;x<=14;x+=2){for(const z of [-20,20]){const post=new THREE.Mesh(new THREE.BoxGeometry(.12,1.8,.12),fenceMat);post.position.set(x,.9,z);post.castShadow=true;scene.add(post);}}
  const railMat=new THREE.MeshStandardMaterial({color:0x59625a,metalness:.45,roughness:.7});for(const y of [.45,1.25]){const a=new THREE.Mesh(new THREE.BoxGeometry(.07,.07,40),railMat);a.position.set(-14,y,0);scene.add(a);const b=a.clone();b.position.x=14;scene.add(b);const c=new THREE.Mesh(new THREE.BoxGeometry(28,.07,.07),railMat);c.position.set(0,y,-20);scene.add(c);const d=c.clone();d.position.z=20;scene.add(d);}
  // Workshop shed.
  const shed=new THREE.Group();const wallMat=new THREE.MeshStandardMaterial({color:0x555e56,roughness:.9});
  const wall=new THREE.Mesh(new THREE.BoxGeometry(8,3.1,4.5),wallMat);wall.position.set(-7,1.55,-16);wall.castShadow=true;wall.receiveShadow=true;shed.add(wall);
  const roof=new THREE.Mesh(new THREE.BoxGeometry(8.5,.22,5),new THREE.MeshStandardMaterial({color:0x303a33,metalness:.2,roughness:.75}));roof.position.set(-7,3.2,-16);roof.castShadow=true;shed.add(roof);
  const door=new THREE.Mesh(new THREE.BoxGeometry(3.4,2.5,.1),new THREE.MeshStandardMaterial({color:0x202722,metalness:.3,roughness:.8}));door.position.set(-7,1.28,-13.72);shed.add(door);
  for(let i=0;i<6;i++){const rib=new THREE.Mesh(new THREE.BoxGeometry(.07,3,.06),fenceMat);rib.position.set(-10.7+i*1.48,1.6,-13.68);shed.add(rib);}scene.add(shed);
  // Stacked tyres and industrial props.
  const tireMat=new THREE.MeshStandardMaterial({color:0x202320,roughness:1});for(let i=0;i<5;i++){const tire=new THREE.Mesh(new THREE.TorusGeometry(.38,.13,8,18),tireMat);tire.rotation.x=Math.PI/2;tire.position.set(10,.14+i*.25,-14);tire.castShadow=true;scene.add(tire);}
  // Overhead yard lamps.
  for(const [x,z] of [[-12,-5],[12,-5],[-12,12],[12,12]]){const pole=new THREE.Mesh(new THREE.CylinderGeometry(.07,.1,5,8),fenceMat);pole.position.set(x,2.5,z);pole.castShadow=true;scene.add(pole);const head=new THREE.Mesh(new THREE.BoxGeometry(.65,.15,.35),new THREE.MeshStandardMaterial({color:0xc4c7ac,emissive:0x25271d}));head.position.set(x,5,z);scene.add(head);}
  const cars=new Map();const pickables=[];
  function addCar(carData,position){const model=buildCar(carData);model.position.set(...position);model.rotation.y=carData.id==='utility'?.35:carData.id==='sedan'?-0.12:0;scene.add(model);cars.set(carData.id,model);model.traverse(o=>{if(o.isMesh)pickables.push(o);});return model;}
  function removeCar(id){const model=cars.get(id);if(!model)return;scene.remove(model);model.traverse(o=>{if(o.isMesh){const idx=pickables.indexOf(o);if(idx>=0)pickables.splice(idx,1);}});cars.delete(id);}
  function updateCarParts(carData){const model=cars.get(carData.id);if(!model)return;for(const part of carData.parts)setPartRemoved(model,part.id,part.removed);}
  const grid=new THREE.GridHelper(100,100,0x8a9184,0x8a9184);grid.position.y=.025;grid.material.transparent=true;grid.material.opacity=.08;scene.add(grid);
  renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
  return {scene,camera,cars,pickables,addCar,removeCar,updateCarParts};
}
