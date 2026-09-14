/* =====================================================================
   RWP v17 — PERILAKU TATA LETAK MAJALAH
   Main menu (dropdown + mega links konten), akordeon nav mobile, bilah
   berbagi media sosial, tombol cetak, dan scrollspy daftar isi sidebar.
   Berkas terpisah, dimuat SETELAH js/main.js. Setiap blok dijaga agar
   aman bila elemennya tidak ada di halaman tertentu.
   ===================================================================== */
(function () {
  "use strict";

  var doc = document;
  var root = doc.documentElement;

  /* ---------- util ---------- */
  function qsa(sel, ctx) { return Array.prototype.slice.call((ctx || doc).querySelectorAll(sel)); }
  function on(el, ev, fn, opt) { if (el) el.addEventListener(ev, fn, opt || false); }
  var isTouch = function () {
    try { return window.matchMedia("(hover: none)").matches; } catch (e) { return false; }
  };

  /* =====================================================================
     1. MAIN MENU — dropdown & mega links konten
     ===================================================================== */
  var menuItems = qsa(".nav-mag .menu-item");
  var megaWrap = doc.querySelector("[data-mega]");
  var megaCloseTimer = null;

  function panelKeys() {
    if (!megaWrap) return [];
    return qsa(".mega-panel", megaWrap).map(function (p) { return p.getAttribute("data-mega-panel"); });
  }

  function showPanel(key) {
    if (!megaWrap) return;
    var keys = panelKeys();
    if (!keys.length) return;
    if (key !== null && key !== undefined && keys.indexOf(key) === -1) key = keys[0];
    if (key === null || key === undefined) {
      var active = megaWrap.querySelector(".mega-tab.active");
      key = active ? active.getAttribute("data-mega-target") : keys[0];
      if (keys.indexOf(key) === -1) key = keys[0];
    }
    qsa(".mega-panel", megaWrap).forEach(function (p) {
      p.classList.toggle("open", p.getAttribute("data-mega-panel") === key);
    });
    qsa(".mega-tab", megaWrap).forEach(function (t) {
      var isCur = t.getAttribute("data-mega-target") === key;
      t.classList.toggle("active", isCur);
      t.setAttribute("aria-selected", isCur ? "true" : "false");
    });
  }

  function openMega(item) {
    if (!megaWrap) return;
    if (megaCloseTimer) { window.clearTimeout(megaCloseTimer); megaCloseTimer = null; }
    menuItems.forEach(function (it) {
      var on_ = it === item;
      it.classList.toggle("open", on_);
      var lk = it.querySelector("a.menu-link");
      if (lk && it.classList.contains("has-mega")) lk.setAttribute("aria-expanded", on_ ? "true" : "false");
    });
    showPanel(item ? item.getAttribute("data-mega-panel") : null);
    megaWrap.classList.add("open");
  }

  function openDrop(item) {
    menuItems.forEach(function (it) { it.classList.toggle("open", it === item); });
    var lk = item.querySelector("a.menu-link");
    if (lk) lk.setAttribute("aria-expanded", "true");
  }

  function closeAllMenus() {
    if (megaCloseTimer) { window.clearTimeout(megaCloseTimer); megaCloseTimer = null; }
    menuItems.forEach(function (it) {
      it.classList.remove("open");
      var lk = it.querySelector("a.menu-link");
      if (lk && it.classList.contains("has-mega")) lk.setAttribute("aria-expanded", "false");
    });
    if (megaWrap) megaWrap.classList.remove("open");
  }

  function scheduleClose(delay) {
    if (megaCloseTimer) window.clearTimeout(megaCloseTimer);
    megaCloseTimer = window.setTimeout(function () {
      megaCloseTimer = null;
      if (!isTouch()) closeAllMenus();
    }, delay || 220);
  }

  menuItems.forEach(function (item) {
    var link = item.querySelector("a.menu-link");
    var isMega = item.classList.contains("has-mega");
    var hasDrop = item.classList.contains("has-drop");

    on(link, "click", function (e) {
      if (isMega) {
        e.preventDefault();
        if (item.classList.contains("open")) { closeAllMenus(); } else { openMega(item); }
        return;
      }
      if (hasDrop) {
        if (isTouch()) {
          // perangkat sentuh: klik pertama membuka daftar, klik kedua menutup
          if (!item.classList.contains("open")) { e.preventDefault(); openDrop(item); return; }
          e.preventDefault();
          closeAllMenus();
          return;
        }
        // desktop: menu dibuka lewat hover, jadi klik pada tautan induk
        // dibiarkan berjalan sebagai navigasi biasa (tanpa preventDefault)
        return;
      }
      closeAllMenus();
    });

    on(link, "keydown", function (e) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        if (isMega) openMega(item); else { openDrop(item); }
      }
      if (e.key === "Escape") closeAllMenus();
    });

    if (!isTouch()) {
      on(item, "mouseenter", function () {
        if (isMega) openMega(item); else { if (hasDrop) openDrop(item); }
      });
      on(item, "mouseleave", function () { scheduleClose(200); });
    }
  });

  if (megaWrap) {
    on(megaWrap, "mouseenter", function () {
      if (megaCloseTimer) { window.clearTimeout(megaCloseTimer); megaCloseTimer = null; }
    });
    on(megaWrap, "mouseleave", function () { scheduleClose(200); });
  }

  /* Tab di dalam mega panel */
  qsa("[data-mega] .mega-tab").forEach(function (tab) {
    on(tab, "click", function () { showPanel(tab.getAttribute("data-mega-target")); });
    on(tab, "keydown", function (e) {
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        e.preventDefault();
        var all = qsa("[data-mega] .mega-tab");
        var i = all.indexOf(tab);
        var next = all[(i + (e.key === "ArrowRight" ? 1 : all.length - 1)) % all.length];
        if (next) { next.focus(); showPanel(next.getAttribute("data-mega-target")); }
      }
    });
  });

  on(doc, "click", function (e) {
    // Klik di dalam header (termasuk panel mega) TIDAK menutup menu — kalau tidak,
    // handler global ini ikut menutup panel tepat setelah perubahan tampilan.
    if (e.target.closest && e.target.closest(".site-header")) return;
    closeAllMenus();
  });
  on(doc, "keydown", function (e) { if (e.key === "Escape") closeAllMenus(); });

  var navRoot = doc.querySelector(".nav-mag");
  on(navRoot, "focusout", function (e) {
    // panel mega kini berada di dalam .site-header (saudara navRoot), jadi
    // periksa keduanya agar klik di panel tidak menutup menu.
    if (!navRoot.contains(e.relatedTarget) && !(megaWrap && megaWrap.contains(e.relatedTarget))) closeAllMenus();
  });

  /* =====================================================================
     2. MOBILE NAV — akordeon grup
     ===================================================================== */
  qsa(".mobile-nav .mn-group").forEach(function (grp) {
    var btn = grp.querySelector("button");
    on(btn, "click", function () {
      var open = !grp.classList.contains("open");
      grp.classList.toggle("open", open);
      if (btn) btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  });

  /* =====================================================================
     3. BILAH BERBAGI MEDIA SOSIAL + CETAK
     ===================================================================== */
  function pageUrl() { return window.location.href.split("#")[0]; }
  function pageTitle() {
    var t = doc.title || "";
    t = t.split(/\s[|\u2014-]\s/)[0].trim();
    return t || doc.title || "Ruang West Papua (RWP)";
  }

  var shareMap = {
    wa: function () { return "https://wa.me/?text=" + encodeURIComponent(pageTitle() + " \u2014 " + pageUrl()); },
    fb: function () { return "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(pageUrl()); },
    tw: function () { return "https://twitter.com/intent/tweet?text=" + encodeURIComponent(pageTitle()) + "&url=" + encodeURIComponent(pageUrl()); },
    tg: function () { return "https://t.me/share/url?url=" + encodeURIComponent(pageUrl()) + "&text=" + encodeURIComponent(pageTitle()); },
    li: function () { return "https://www.linkedin.com/sharing/share-offsite/?url=" + encodeURIComponent(pageUrl()); }
  };

  qsa("[data-share]").forEach(function (btn) {
    on(btn, "click", function (e) {
      var kind = btn.getAttribute("data-share");
      if (kind === "print") { e.preventDefault(); window.print(); return; }
      if (kind === "print-section" || kind === "print-related") {
        e.preventDefault();
        root.setAttribute("data-printmode", kind === "print-section" ? "main" : "related");
        var donePrint = function () { clearPrintMode(); window.removeEventListener("afterprint", donePrint); };
        window.addEventListener("afterprint", donePrint);
        window.print();
        window.setTimeout(clearPrintMode, 2500);
        return;
      }
      if (kind === "copy") {
        e.preventDefault();
        var url = pageUrl();
        var label = btn.querySelector(".sb-txt");
        var done = function () {
          btn.classList.add("copied");
          if (label) label.textContent = "Tautan tersalin!";
          window.setTimeout(function () {
            btn.classList.remove("copied");
            if (label) label.textContent = "Salin tautan";
          }, 1800);
        };
        var fallback = function () {
          try {
            var ta = doc.createElement("textarea");
            ta.value = url; ta.setAttribute("readonly", ""); ta.style.position = "absolute"; ta.style.left = "-9999px";
            doc.body.appendChild(ta); ta.select();
            var ok = doc.execCommand("copy");
            doc.body.removeChild(ta);
            if (ok !== false) done();
          } catch (err) { /* diamkan */ }
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(url).then(done, fallback);
        } else fallback();
        return;
      }
      var maker = shareMap[kind];
      if (!maker) return;
      e.preventDefault();
      window.open(maker(), "_blank", "noopener,noreferrer,width=680,height=720");
    });
  });

  qsa("[data-print]").forEach(function (btn) {
    on(btn, "click", function (e) { e.preventDefault(); window.print(); });
  });

  /* =====================================================================
     4. SCROLLSPY DAFTAR ISI SIDEBAR
     ===================================================================== */
  var tocSide = doc.querySelector("[data-side-toc]");
  if (tocSide) {
    var tocLinks = qsa("a[href^='#']", tocSide);
    var tocTargets = tocLinks.map(function (a) {
      var el = doc.getElementById(a.getAttribute("href").slice(1));
      return el ? { link: a, el: el } : null;
    }).filter(Boolean);

    if (tocTargets.length) {
      var ticking = false;
      var syncToc = function () {
        ticking = false;
        // posisi relatif terhadap dokumen: offsetTop saja tidak cukup karena
        // bagian bersarang di dalam .mag-main (bukan anak langsung body).
        var y = (window.scrollY || root.scrollTop) + 160;
        var current = null;
        tocTargets.forEach(function (t) { if (t.el.getBoundingClientRect().top + (window.scrollY || root.scrollTop) <= y) current = t; });
        tocLinks.forEach(function (a) { a.classList.remove("cur"); });
        if (current) {
          current.link.classList.add("cur");
          // tandai bagian aktif pada sidebar (dipakai juga oleh pengujian)
          var curId = (current.link.getAttribute("href") || "").replace("#", "");
          tocSide.setAttribute("data-cur", curId);
          var sideBox = tocSide.closest(".mag-side");
          if (sideBox) sideBox.setAttribute("data-cur", curId);
          var box = tocSide.querySelector("ol");
          if (box && box.scrollHeight > box.clientHeight + 4) {
            var lt = current.link.offsetTop, lh = current.link.offsetHeight;
            var top = box.scrollTop, h = box.clientHeight;
            if (lt < top) box.scrollTop = lt - 8;
            else if (lt + lh > top + h) box.scrollTop = lt + lh - h + 8;
          }
        }
      };
      on(window, "scroll", function () {
        if (!ticking) { ticking = true; window.requestAnimationFrame(syncToc); }
      }, { passive: true });
      syncToc();
    }
  }

  /* =====================================================================
     5. WIDGET MAJALAH — tab "Teratas / Terkini" bila dipakai
     ===================================================================== */
  qsa("[data-mw-tab]").forEach(function (tab) {
    on(tab, "click", function () {
      var wrap = tab.closest("[data-mw-tabs]");
      if (!wrap) return;
      var target = tab.getAttribute("data-mw-tab");
      qsa("[data-mw-tab]", wrap).forEach(function (t) {
        t.classList.remove("active");
        t.setAttribute("aria-selected", "false");
      });
      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");
      qsa("[data-mw-panel]", wrap).forEach(function (p) {
        p.hidden = p.getAttribute("data-mw-panel") !== target;
      });
    });
  });

  /* =====================================================================
     6. ARTIKEL TERKAIT (v18)
     Kartu dibangun dari penanda [data-rel-item] sehingga blok HTML di
     dalam halaman tetap menjadi cadangan statis yang bisa dipakai bila
     JavaScript dimatikan. Menambah satu <a data-rel-item> = satu kartu.
     ===================================================================== */
  qsa("[data-rel]").forEach(function (sec) {
    var grid = sec.querySelector("[data-rel-grid]");
    var items = qsa("[data-rel-item]", sec);
    if (!grid || !items.length) return;

    function txt(el, sel) {
      var n = el.querySelector(sel);
      return n ? (n.textContent || "").replace(/\s+/g, " ").trim() : "";
    }

    var cards = items.map(function (el) {
      var href = el.getAttribute("data-href") || "";
      var cat = txt(el, ".rel-badge");
      var title = txt(el, "h3");
      var desc = txt(el, "p");
      var meta = txt(el, ".rel-meta-txt");
      if (!href || !title) return null;

      var card = doc.createElement("a");
      card.className = "rel-card";
      card.href = href;

      if (cat) {
        var badge = doc.createElement("span");
        badge.className = "rel-badge";
        badge.textContent = cat;
        card.appendChild(badge);
      }
      var h3 = doc.createElement("h3");
      h3.textContent = title;
      card.appendChild(h3);
      if (desc) {
        var p = doc.createElement("p");
        p.textContent = desc;
        card.appendChild(p);
      }
      var m = doc.createElement("span");
      m.className = "rel-meta";
      var ms = doc.createElement("span");
      ms.className = "rel-meta-txt";
      ms.textContent = meta;
      var ar = doc.createElement("span");
      ar.className = "rel-arrow";
      ar.setAttribute("aria-hidden", "true");
      ar.textContent = "\u2192";
      m.appendChild(ms);
      m.appendChild(ar);
      card.appendChild(m);
      return card;
    }).filter(Boolean);

    if (!cards.length) return;
    while (grid.firstChild) grid.removeChild(grid.firstChild);
    cards.forEach(function (c) { grid.appendChild(c); });
    sec.setAttribute("data-rel-count", String(cards.length));
  });

  /* ---------- cetak selektif: seluruh artikel / artikel ini / terkait ---------- */
  function clearPrintMode() { root.removeAttribute("data-printmode"); }

  /* ---------- bersihkan menu saat mencetak ---------- */
  on(window, "beforeprint", function () { closeAllMenus(); });
  on(window, "afterprint", clearPrintMode);

  /* ---------- ekspos kecil untuk pengujian ---------- */
  window.RWPMag = {
    pageUrl: pageUrl,
    pageTitle: pageTitle,
    closeMenus: closeAllMenus,
    showPanel: showPanel
  };
})();
