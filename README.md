# DWG→DXF 変換（dwg.toshiji.com）

AutoCAD の DWG ファイルを、ブラウザの中だけで DXF に変換するページです。図面はどこにも送信しません。

- 公開先: https://dwg.toshiji.com/
- 変換: [LibreDWG](https://www.gnu.org/software/libredwg/) を WebAssembly にした [@mlightcad/libredwg-web](https://github.com/mlightcad/libredwg-web) 0.8.2（GPL-3.0）。`public/vendor/` にそのまま置いています
- 出力: AutoCAD 2007 形式（AC1021）の DXF

## ファイル
- `public/index.html` 画面（ドラッグ・一覧・保存）
- `public/convert-worker.js` 変換係（Web Worker）
- `public/vendor/` libredwg-web の wasm と読み込み用 JS（npm パッケージ `@mlightcad/libredwg-web@0.8.2` の `wasm/` から）

## 公開
```
npx wrangler deploy
```

## ライセンス
GPL-3.0（`LICENSE`）。作者: JIG WORKS（としじ）。AutoCAD・DWG は Autodesk 社の商標で、このページは Autodesk 社とは関係ありません。
