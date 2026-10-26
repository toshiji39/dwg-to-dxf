// DWG → DXF の変換係 (Web Worker)
//  ・変換はこのパソコンの中だけで行う。図面はどこにも送らない
//  ・変換の中身は LibreDWG (GPL-3.0) を WebAssembly にした @mlightcad/libredwg-web 0.8.2
import createModule from './vendor/libredwg-web.js';

const ready = createModule();
const CRITICAL = 128; // LibreDWG のエラー番号: 128 以上は「読めなかった」、それ未満は注意だけ

self.onmessage = async e => {
  const { id, buf } = e.data;
  try {
    const m = await ready;
    if (!buf) { self.postMessage({ id, ok: true }); return; } // 準備ができたかの確かめ
    m.FS.writeFile('in.dwg', new Uint8Array(buf));
    const err = m.dwg_write_dxf('in.dwg', 'out.dxf');
    const has = m.FS.analyzePath('out.dxf', false).exists;
    const out = has ? m.FS.readFile('out.dxf') : null;
    try { m.FS.unlink('in.dwg'); } catch { }
    try { m.FS.unlink('out.dxf'); } catch { }
    if (!out || !out.length || err >= CRITICAL) self.postMessage({ id, ok: false, err });
    else self.postMessage({ id, ok: true, err, dxf: out }, [out.buffer]);
  } catch (ex) {
    self.postMessage({ id, ok: false, err: -1, msg: String(ex && ex.message || ex) });
  }
};
