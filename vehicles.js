import * as THREE from 'three';

function makeMaterial(color,roughness=.8,metalness=.05){return new THREE.MeshStandardMaterial({color,roughness,metalness});}
function box(parent,w,h,d,mat,x,y,z,rx=0,ry=0,rz=0){const mesh=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat);mesh.position.set(x,y,z);mesh.rotation.set(rx,ry,rz);mesh.castShadow=true;mesh.receiveShadow=true;parent.add(mesh);return mesh;}
function cylinder(parent,r1,r2,depth,mat,x,y,z,rotX=0,rotY=0,rotZ=0,segments=18){const mesh=new THREE.Mesh(new THREE.CylinderGeometry(r1,r2,depth,segments),mat);mesh.position.set(x,y,z);mesh.rotation.set(rotX,rotY,rotZ);mesh.castShadow=true;mesh.receiveShadow=true;parent.add(mesh);return mesh;}
export function buildCar(carData){
  const root=new THREE.Group();root.userData={carId:carData.id,carData};
  const paint=makeMaterial(carData.color,.72,.12), dark=makeMaterial(0x202522,.86), glass= new THREE.MeshStandardMaterial({color:0x52615b,roughness:.28,metalness:.25,transparent:true,opacity:.78}),rubber=makeMaterial(0x171a18,1),metal=makeMaterial(0x8a918a,.35,.72),lamp=makeMaterial(0xd8d6b0,.28,.25);
  // Low-poly salvage-yard compact car, built from individually selectable assemblies.
  const body=new THREE.Group();body.userData.partId='body';root.add(body);
  box(body,2.1,.55,4.25,paint,0,.72,0);
  box(body,1.82,.68,2.05,paint,0,1.25,-.18);
  box(body,1.68,.53,1.8,glass,0,1.3,-.19);
  box(body,.08,.58,1.95,dark,-.91,1.24,-.18);box(body,.08,.58,1.95,dark,.91,1.24,-.18);
  box(body,1.65,.08,.12,metal,0,1.56,-1.15);box(body,1.65,.08,.12,metal,0,1.56,.78);
  const hood=box(body,1.8,.12,1.02,paint,0,1.02,-1.42);hood.userData.partId='hood';
  const bumperFront=box(body,2.08,.17,.15,metal,0,.49,-2.13);bumperFront.userData.partId='bumper';
  box(body,.38,.19,.07,lamp,-.73,.84,-2.14);box(body,.38,.19,.07,lamp,.73,.84,-2.14);
  box(body,.45,.16,.07,makeMaterial(0xa34c3e),-.7,.75,2.13);box(body,.45,.16,.07,makeMaterial(0xa34c3e),.7,.75,2.13);
  const wheelPositions=[[-1.02,.47,-1.38],[1.02,.47,-1.38],[-1.02,.47,1.38],[1.02,.47,1.38]];
  const wheelGroup=new THREE.Group();wheelGroup.userData.partId='wheels';root.add(wheelGroup);
  wheelPositions.forEach(([x,y,z])=>{cylinder(wheelGroup,.43,.43,.22,rubber,x,y,z,Math.PI/2,0,0,20);cylinder(wheelGroup,.23,.23,.235,metal,x,y,z,Math.PI/2,0,0,16);cylinder(wheelGroup,.08,.08,.24,dark,x,y,z,Math.PI/2,0,0,12);});
  const doorGroup=new THREE.Group();doorGroup.userData.partId='doors';root.add(doorGroup);
  [-1,1].forEach(side=>{const door=box(doorGroup,.08,.48,.9,paint,side*1.055,.78,-.1);door.userData.partId='doors';box(doorGroup,.025,.04,.11,metal,side*1.105,.89,-.28);});
  const engineGroup=new THREE.Group();engineGroup.userData.partId='engine';root.add(engineGroup);
  box(engineGroup,.88,.35,.68,makeMaterial(0x454d46,.55,.6),0,.88,-1.5);box(engineGroup,.48,.1,.32,metal,0,1.1,-1.5);cylinder(engineGroup,.13,.13,.22,dark,-.34,.83,-1.5,0,0,Math.PI/2);cylinder(engineGroup,.13,.13,.22,dark,.34,.83,-1.5,0,0,Math.PI/2);
  const batteryGroup=new THREE.Group();batteryGroup.userData.partId='battery';root.add(batteryGroup);box(batteryGroup,.35,.23,.25,makeMaterial(0x3b4940),.62,.84,-1.32);box(batteryGroup,.1,.04,.06,metal,.55,.98,-1.32);box(batteryGroup,.1,.04,.06,makeMaterial(0xb34b3f),.69,.98,-1.32);
  const radiatorGroup=new THREE.Group();radiatorGroup.userData.partId='radiator';root.add(radiatorGroup);box(radiatorGroup,1.05,.38,.1,makeMaterial(0x4c5751,.55,.6),0,.69,-1.98);for(let i=0;i<9;i++)box(radiatorGroup,.015,.31,.012,metal,-.45+i*.112,.69,-2.04);
  const lightsGroup=new THREE.Group();lightsGroup.userData.partId='lights';root.add(lightsGroup);box(lightsGroup,.35,.17,.08,lamp,-.72,.86,-2.16);box(lightsGroup,.35,.17,.08,lamp,.72,.86,-2.16);
  const cargoGroup=new THREE.Group();cargoGroup.userData.partId='cargo';root.add(cargoGroup);box(cargoGroup,1.4,.05,1.4,metal,0,1.1,.7);for(let i=0;i<4;i++)box(cargoGroup,.05,.48,1.4,metal,-.65+i*.43,1.35,.7);
  const shadow=new THREE.Mesh(new THREE.CircleGeometry(1.8,32),new THREE.MeshBasicMaterial({color:0x101310,transparent:true,opacity:.28,depthWrite:false}));shadow.rotation.x=-Math.PI/2;shadow.position.y=.015;shadow.scale.set(1.05,1.55,1);root.add(shadow);
  root.traverse(o=>{if(o.isMesh){o.userData.rootCar=root;}});
  return root;
}
export function setPartRemoved(root,partId,removed){
  const candidates=[];root.traverse(o=>{if(o.userData.partId===partId)candidates.push(o);});
  candidates.forEach(o=>{o.visible=!removed;});
}
