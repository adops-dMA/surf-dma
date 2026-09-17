/*!
 * Surf format (ELL) - GAM sticky bottom-right unit, mobile + desktop
 * Requires GPT (googletag) loaded on the page.
 * Sin dependencia de flags VIads: se lanza siempre que GPT esté disponible.
 */
(function () {
  var isDesktop = window.innerWidth >= 1024;

  var PATH  = isDesktop ? '/21665835665/ELL-Surf-Desktop' : '/21665835665/ELL-Surf-Mobile';
  var SCALE = isDesktop ? 0.8 : 0.45;
  var REFRESH_MS = 35000; // 35 segundos
  var SIZES = [
    [250,250],[300,250],[300,300],[300,533],[320,480],
    [336,280],[336,373],[336,377],[336,504],[414,345],
    [468,60],[480,320],[580,400],[640,480]
  ];
  if (!document.getElementById('tt-surf-wrap')) {
    var style = document.createElement('style');
    style.textContent =
      '#tt-surf-wrap{position:fixed;bottom:190px;right:0px;z-index:9999;}' +
      '#tt-surf-close{position:absolute;top:-18px;right:0;width:18px;height:18px;' +
      'background:#000;color:#fff;font-size:12px;line-height:18px;text-align:center;' +
      'cursor:pointer;border-radius:3px 3px 0 0;font-family:Arial,sans-serif;z-index:2;}';
    document.head.appendChild(style);
    var wrap = document.createElement('div');
    wrap.id = 'tt-surf-wrap';
    wrap.innerHTML =
      '<span id="tt-surf-close">&times;</span>' +
      '<div id="div-Surf-Desktop"></div>';
    document.body.appendChild(wrap);
    document.getElementById('tt-surf-close').onclick = function () {
      wrap.style.display = 'none';
      wrap.setAttribute('data-closed', '1'); // marca para detener el refresh
    };
  }
  window.googletag = window.googletag || { cmd: [] };
  googletag.cmd.push(function () {
    var slot = googletag.defineSlot(PATH, SIZES, 'div-Surf-Desktop')
                        .addService(googletag.pubads());
    googletag.pubads().addEventListener('slotRenderEnded', function (event) {
      if (event.slot.getSlotElementId() !== 'div-Surf-Desktop') return;
      if (event.isEmpty || !event.size) return;
      var w = event.size[0], h = event.size[1];
      var el = document.getElementById('div-Surf-Desktop');
      el.style.width  = w + 'px';
      el.style.height = h + 'px';
      el.style.transform = 'scale(' + SCALE + ')';
      el.style.transformOrigin = 'bottom right';
      el.style.marginTop = (-(h * (1 - SCALE))) + 'px';
    });
    googletag.enableServices();
    googletag.display('div-Surf-Desktop');
    googletag.pubads().refresh([slot]);

    // --- Auto-refresh cada 35s ---
    setInterval(function () {
      var wrap = document.getElementById('tt-surf-wrap');
      if (!wrap || wrap.getAttribute('data-closed') === '1') return;
      if (document.hidden) return;
      googletag.pubads().refresh([slot]);
    }, REFRESH_MS);
  });
})();
