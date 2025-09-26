// static/wz-embed-height.js
(function () {
  // iframe 内でのみ動作（親と同一オリジン時）
  if (window.parent === window) return;

  function send() {
    try {
      var h =
        document.documentElement?.scrollHeight ||
        document.body?.scrollHeight ||
        0;
      // 念のため最小値防止
      if (!h || h < 300) h = 300;

      // 同一オリジンのみ postMessage
      var origin = window.location.origin;
      window.parent.postMessage({ type: 'WZ_DOCS_HEIGHT', value: h }, origin);
    } catch (e) {
      // 失敗してもアプリは止めない
      console.debug('[wz-embed-height] skip:', e?.message || e);
    }
  }

  // 初回 + リサイズ + Docusaurus の routeUpdate
  window.addEventListener('load', send, { passive: true });
  window.addEventListener('resize', send, { passive: true });

  // Docusaurus のクライアントナビゲーション
  document.addEventListener('docusaurus.routeUpdate', function () {
    // レイアウト確定を待ってから送信
    setTimeout(send, 50);
  });
})();