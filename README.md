# DWG→DXF 変換（dwg.jigcad.jp）

AutoCAD の DWG ファイルを、ブラウザの中だけで DXF に変換するページです。図面はどこにも送信しません。

- 公開先: https://dwg.jigcad.jp/
- 変換: [LibreDWG](https://www.gnu.org/software/libredwg/) を WebAssembly にした [@mlightcad/libredwg-web](https://github.com/mlightcad/libredwg-web) 0.8.3 に修正を 1 つ当てたもの（GPL-3.0）。`public/vendor/` にそのまま置いています
- 出力: AutoCAD 2007 形式（AC1021）の DXF

## ファイル
- `public/index.html` 画面（ドラッグ・一覧・保存）
- `public/convert-worker.js` 変換係（Web Worker）
- `public/vendor2/` libredwg-web の wasm と読み込み用 JS（下の「変換部品の作り方」で作ったもの）

## 変換部品の作り方
元のソースは [mlightcad/libredwg-web](https://github.com/mlightcad/libredwg-web) の `b5177613f2c735858a6d1cb1d1c7e238c397b88f`。そこに `patches/libredwg-web-keep-all-blocks.patch` を当てます（本家 LibreDWG の 11d9a9bd9 と同じ修正。一部のブロックが DXF に書き出されないバグを直す）。

```
git apply patches/libredwg-web-keep-all-blocks.patch   # libredwg-web の中で
sh ./autogen.sh
cd bindings/javascript
pnpm install --ignore-scripts
pnpm build:prepare && pnpm build:obj
EMCC_CFLAGS=-sDEFAULT_TO_CXX=1 pnpm build:wasm          # Emscripten 6.0.13。wasm-opt に PATH を通す
```
できた `build-wasm/libredwg-web.js` と `.wasm` を `public/vendor2/` に置きます。部品を入れ替える時はフォルダ名も変えてください（`_headers` で 30 日キャッシュしているため）。

## 公開
```
npx wrangler deploy
```

## ライセンス
GPL-3.0（`LICENSE`）。作者: JIG WORKS（としじ）。AutoCAD・DWG は Autodesk 社の商標で、このページは Autodesk 社とは関係ありません。
