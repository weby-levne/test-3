# WRECKYARD — Salvage Yard Simulator

První hratelný prototyp 3D simulátoru vrakoviště pro PC i mobil. Projekt používá HTML, CSS, JavaScript a Three.js.

## Soubory

- `index.html` — vstupní stránka hry
- `style.css` — vzhled rozhraní a responzivní rozložení
- `js/main.js` — spuštění hry, ovládání a herní logika
- `js/world.js` — 3D prostředí vrakoviště
- `js/vehicles.js` — procedurálně sestavená 3D auta a jejich díly
- `js/economy.js` — katalog vozidel, součástek a vylepšení
- `js/save.js` — lokální ukládání postupu

## Spuštění na počítači

1. Rozbal ZIP do složky.
2. Otevři složku ve VS Code.
3. Spusť `index.html` pomocí rozšíření **Live Server** (pravé tlačítko na soubor → Open with Live Server).
4. Prohlížeč musí mít přístup k internetu, protože Three.js a fonty se načítají z CDN.

Nedoporučuje se spouštět modulový projekt pouhým otevřením `file://` adresy. Použij lokální webový server.

## Ovládání

- **W / S** — přiblížení a oddálení kamery
- **A / D** — otáčení kamery
- **Tažení myší** — otáčení pohledu
- **Dotyk a tažení** — ovládání pohledu na mobilu
- **Kliknutí / klepnutí na auto** — výběr vozidla
- Tlačítka v panelu — nákup vraku, demontáž dílů, prodej, sklad a vylepšení

## Co už prototyp obsahuje

- 3D prostředí s plotem, dílnou, pracovním prostorem a vraky
- nákup vozidel za herní kredity
- výběr vozidla v 3D scéně
- demontáž dostupných součástek a jejich přesun do skladu
- prodej jednotlivých dílů a celého vraku
- vylepšení areálu s herními účinky
- ukládání a obnovení postupu přes LocalStorage
- přizpůsobivé rozhraní pro PC i mobil

## Publikování zdarma na GitHub Pages

1. Vytvoř nový GitHub repository, například `wreckyard`.
2. Nahraj obsah složky projektu tak, aby `index.html` byl v kořeni repozitáře.
3. Otevři **Settings → Pages**.
4. V části **Build and deployment** vyber **Deploy from a branch**.
5. Vyber větev `main` a složku `/ (root)`, poté ulož.
6. Po dokončení nasazení otevři URL, kterou GitHub Pages zobrazí.

## Poznámky

- Uložení je v tomto prototypu pouze v aktuálním prohlížeči a zařízení. Nejde o cloudovou synchronizaci.
- Pokud vymažeš data webu, můžeš přijít o uložený postup.
- Herní auta jsou v této verzi sestavená z jednoduchých 3D tvarů přímo v Three.js; nejsou to fotorealistické modely.
- Projekt vyžaduje internet kvůli CDN. Později lze knihovnu stáhnout a hostovat společně s projektem.
- Prohlížeč musí podporovat WebGL.
