// 変換ページの入口: 前のアドレス (dwg.toshiji.com) は新しいアドレスへ移す
const OLD_HOST = 'dwg.toshiji.com', NEW_ORIGIN = 'https://dwg.jigcad.jp';

export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    if (url.hostname === OLD_HOST) return Response.redirect(NEW_ORIGIN + url.pathname + url.search, 301);
    const res = await env.ASSETS.fetch(req);
    if (url.pathname !== '/') return res;
    // worker を通すと _headers が効くとは限らないので、ここでも付ける
    const out = new Response(res.body, res);
    out.headers.set('X-Frame-Options', 'DENY');
    return out;
  },
};
