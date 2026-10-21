const SAVE_KEY='wreckyard-save-v1';
export function saveGame(state){
  try{localStorage.setItem(SAVE_KEY,JSON.stringify({...state,version:1,savedAt:new Date().toISOString()}));return true;}
  catch(error){console.error('Uložení se nepodařilo:',error);return false;}
}
export function loadGame(){
  try{const raw=localStorage.getItem(SAVE_KEY);if(!raw)return null;const data=JSON.parse(raw);if(data.version!==1||typeof data.money!=='number'||!Array.isArray(data.cars)||!Array.isArray(data.inventory))return null;return data;}
  catch(error){console.error('Načtení uložené hry se nepodařilo:',error);return null;}
}
export function clearSave(){localStorage.removeItem(SAVE_KEY);}
