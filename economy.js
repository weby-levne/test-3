export const STARTING_MONEY = 5000;
export const MARKET_CARS = [
  { id:'compact', name:'Rusty Compact', subtitle:'Kompaktní vůz · 1998', year:1998, price:1250, health:42, scrap:380, color:0x777c68, parts:[
    {id:'engine',name:'Motor 1.4',icon:'⚙',condition:38,value:420,removed:false},
    {id:'wheels',name:'Sada kol',icon:'◉',condition:62,value:190,removed:false},
    {id:'doors',name:'Dveře (pár)',icon:'▤',condition:55,value:150,removed:false},
    {id:'battery',name:'Baterie',icon:'▣',condition:15,value:45,removed:false},
    {id:'radiator',name:'Chladič',icon:'▥',condition:70,value:110,removed:false}
  ]},
  { id:'sedan', name:'Oldline Sedan', subtitle:'Rodinný sedan · 2004', year:2004, price:1850, health:58, scrap:520, color:0x7d898d, parts:[
    {id:'engine',name:'Motor 1.8',icon:'⚙',condition:61,value:610,removed:false},
    {id:'wheels',name:'Sada kol',icon:'◉',condition:74,value:240,removed:false},
    {id:'doors',name:'Dveře (sada)',icon:'▤',condition:68,value:260,removed:false},
    {id:'battery',name:'Baterie',icon:'▣',condition:40,value:80,removed:false},
    {id:'lights',name:'Přední světla',icon:'◇',condition:82,value:130,removed:false}
  ]},
  { id:'utility', name:'Utility Van', subtitle:'Dodávka · 2001', year:2001, price:2200, health:35, scrap:650, color:0x8d7358, parts:[
    {id:'engine',name:'Diesel 2.0',icon:'⚙',condition:32,value:720,removed:false},
    {id:'wheels',name:'Sada kol',icon:'◉',condition:58,value:220,removed:false},
    {id:'doors',name:'Posuvné dveře',icon:'▤',condition:72,value:240,removed:false},
    {id:'battery',name:'Baterie',icon:'▣',condition:52,value:95,removed:false},
    {id:'cargo',name:'Nákladový regál',icon:'▦',condition:88,value:180,removed:false}
  ]}
];
export const UPGRADES = [
  {id:'toolbox',name:'Profesionální nářadí',description:'Získáš za demontované díly o 10 % více.',price:1200,icon:'⚒'},
  {id:'storage',name:'Rozšíření skladu',description:'Zvětší kapacitu inventáře o 10 míst.',price:900,icon:'▤'},
  {id:'lights',name:'Pracovní osvětlení',description:'Vylepší vzhled a osvětlení areálu.',price:1600,icon:'☼'}
];
export function formatCredits(value){return `${Math.floor(value).toLocaleString('cs-CZ')} cr`;}
export function createCar(source){return {...structuredClone(source),parts:source.parts.map(p=>({...p}))};}
