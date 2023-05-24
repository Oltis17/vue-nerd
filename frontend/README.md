# Frontend

### Prvé spustenie
```
yarn install
```

### Kompilácia
```
yarn serve
```
Po úpešnej kompilácií beží frontend na adrese http://localhost/nerd2/. Je takisto k dispozícii network URL prístupná pre všetky zariadenia v danej sieti (App running at: Network ...).

### Produkčný výstup
```
yarn build
```
Výsledky buildu budú v priečinku `/dist`.

## Meniteľné súbory

Systémové dáta sú v JSON súboroch v pričinku `/src/assets`. Sú tu napríklad vymenované blacklisty, tagy a všeobecne zoznamy potrebné na generovanie možností do selectov vyhľadávacích formulárov.

## Odovzdané súbory

- `/public` - verené zdroje
- `/src` - obsahuje kód aplikácie

a pomocné súbory pre Vue.js framework a YARN
