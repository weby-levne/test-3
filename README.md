# WRECKYARD — Salvage Yard Simulator

První prototyp 3D simulátoru vrakoviště pro PC i mobil. Projekt používá HTML, CSS, JavaScript a Three.js.

## Soubory (všechny jsou v kořenu repozitáře)

- `index.html` — hlavní stránka hry
- `style.css` — vzhled a mobilní rozložení
- `main.js` — hlavní herní logika a ovládání
- `world.js` — 3D prostředí
- `vehicles.js` — vozidla a demontovatelné díly
- `economy.js` — ceny, obchod a herní ekonomika
- `save.js` — ukládání postupu do LocalStorage

## Nahrání přes mobil na GitHub

Nahraj všechny výše uvedené soubory jednotlivě do hlavní složky (root) repozitáře. Nevytvářej složku `js`. Po nahrání musí být `index.html` hned na hlavní stránce repozitáře vedle `style.css` a všech souborů `.js`.

Pak v GitHubu otevři **Settings → Pages**, nastav **Deploy from a branch**, větev `main` a složku `/(root)`, poté ulož.

Three.js se načítá z CDN, takže hra potřebuje internet. Postup se ukládá lokálně v prohlížeči daného zařízení.
