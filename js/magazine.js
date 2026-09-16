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
    // Kunci panel diambil dari item; bila tidak ada di <div class="menu-item">,
    // jatuh ke <a class="menu-link"> yang memang memuat data-mega-panel.
    // Tanpa fallback ini, hover pada item mana pun hanya menampilkan tab yang
    // sedang aktif, sehingga panel item itu sendiri tidak pernah terbuka.
    var lk0 = item ? item.querySelector("a.menu-link") : null;
    var key = item ? (item.getAttribute("data-mega-panel") ||
      (lk0 && lk0.getAttribute("data-mega-panel"))) : null;
    showPanel(key);
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

/* =====================================================================
   RWP v24 — FILTER GLOSARIUM (glosarium.html)
   Menyaring entri langsung saat mengetik. Progresif: tanpa JavaScript,
   tidak ada satu pun entri yang disembunyikan di HTML — seluruh 94
   istilah tetap tampil lengkap dan dapat dibaca.
   Berjalan sendiri (guard: berhenti bila #glosInput tidak ada).
   ===================================================================== */
(function () {
  "use strict";

  var doc = document;
  var input = doc.getElementById("glosInput");
  if (!input) return;

  var items = Array.prototype.slice.call(doc.querySelectorAll("[data-glos-item]"));
  if (!items.length) return;

  var secs = Array.prototype.slice.call(doc.querySelectorAll("[data-glos-sec]"));
  var chips = Array.prototype.slice.call(doc.querySelectorAll(".glos-chip"));
  var out = doc.getElementById("glosCount");
  var reset = doc.getElementById("glosReset");
  var box = doc.getElementById("glosFilter");
  var total = items.length;
  var cat = "all";

  /* indeks teks sekali saja (data-glos dari server; cadangan: textContent) */
  items.forEach(function (el) {
    var d = el.getAttribute("data-glos");
    if (!d) d = el.textContent || "";
    el.__q = d.toLowerCase();
  });

  function render() {
    var q = (input.value || "").trim().toLowerCase();
    var shown = 0;
    items.forEach(function (el) {
      var ok = (cat === "all" || el.getAttribute("data-cat") === cat) &&
               (!q || el.__q.indexOf(q) !== -1);
      if (ok) { el.removeAttribute("hidden"); shown++; }
      else { el.setAttribute("hidden", ""); }
    });
    secs.forEach(function (sec) {
      var any = sec.querySelector("[data-glos-item]:not([hidden])");
      if (any) sec.removeAttribute("hidden");
      else sec.setAttribute("hidden", "");
    });
    if (out) {
      out.innerHTML = shown
        ? "Menampilkan <b>" + shown + "</b> dari " + total + " istilah" +
          (cat === "all" ? "" : " &middot; kategori " + cat)
        : "Tidak ada istilah yang cocok dengan <b>\u201c" + (input.value || "").replace(/[<>&]/g, "") + "\u201d</b> — coba kata kunci lain (mis. <i>sentralisme</i>, <i>front</i>, <i>nilai lebih</i>) atau tekan <b>Tampilkan semua</b>.";
    }
    if (box) box.setAttribute("data-glos-shown", String(shown));
    chips.forEach(function (c) {
      var on = c.getAttribute("data-glos-cat") === cat;
      c.classList.toggle("active", on);
      c.setAttribute("aria-pressed", on ? "true" : "false");
    });
  }

  chips.forEach(function (c) {
    c.setAttribute("aria-pressed", "false");
    c.addEventListener("click", function () {
      cat = c.getAttribute("data-glos-cat") || "all";
      render();
    });
  });

  input.addEventListener("input", render);
  input.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { input.value = ""; cat = "all"; render(); }
  });
  if (reset) reset.addEventListener("click", function () {
    input.value = ""; cat = "all"; render(); input.focus();
  });

  render();

  /* ekspos kecil untuk pengujian */
  window.RWPGlos = {
    count: function () { return doc.querySelectorAll("[data-glos-item]:not([hidden])").length; },
    total: total,
    render: render
  };
})();

/* =====================================================================
   v25 — SIDEBAR TAB AREA (zona tata letak, ref2)
   Menyorot tab yang sesuai dengan posisi gulir, dan mengizinkan navigasi
   papan tuts (panah / Home / End). Tanpa JavaScript seluruh tab tetap
   tampil dan tetap berfungsi sebagai tautan biasa (tanpa sorotan).
   ===================================================================== */
(function () {
  "use strict";

  var doc = document;
  var box = doc.querySelector("[data-stab]");
  if (!box) return;

  var tabs = Array.prototype.slice.call(box.querySelectorAll("a[data-stab-link]"));
  if (!tabs.length) return;

  var targets = tabs.map(function (a) {
    var id = (a.getAttribute("href") || "").replace(/^#/, "");
    return { a: a, el: id ? doc.getElementById(id) : null };
  }).filter(function (t) { return !!t.el; });

  function setActive(t) {
    tabs.forEach(function (a) {
      var on = a === t.a;
      a.classList.toggle("active", on);
      if (on) { a.setAttribute("aria-current", "true"); } else { a.removeAttribute("aria-current"); }
    });
  }

  var ticking = false;
  function update() {
    ticking = false;
    var y = window.pageYOffset + 150;
    var cur = null;
    targets.forEach(function (t) { if (t.el.offsetTop <= y) cur = t; });
    if (!cur) cur = targets[0];
    setActive(cur);
  }
  function onScroll() {
    if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  update();

  /* papan tuts: panah kiri/kanan, Home, End di antara tab */
  box.addEventListener("keydown", function (e) {
    var i = tabs.indexOf(doc.activeElement);
    if (i === -1) return;
    var to = null;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") { to = tabs[(i + 1) % tabs.length]; }
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") { to = tabs[(i - 1 + tabs.length) % tabs.length]; }
    else if (e.key === "Home") { to = tabs[0]; }
    else if (e.key === "End") { to = tabs[tabs.length - 1]; }
    if (to) { e.preventDefault(); to.focus(); }
  });

  box.setAttribute("data-stab-ready", "true");

  window.RWPStab = {
    count: tabs.length,
    active: function () {
      var a = box.querySelector("a.active");
      return a ? a.getAttribute("href") : null;
    }
  };
})();


/* =====================================================================
   v26 · PANEL TATA LETAK — penanda zona + offset anchor
   Tautan panel "Tata Letak" (#zona-*) digulir dengan offset header sticky,
   lalu zona yang dituju diberi penanda singkat. Tanpa JavaScript, tautan
   tetap berfungsi sebagai anchor biasa (plus scroll-margin-top di CSS).
   ===================================================================== */
(function () {
  "use strict";
  var doc = document;
  var reduce = function () {
    try { return window.matchMedia("(prefers-reduced-motion: reduce)").matches; } catch (e) { return false; }
  };
  var ZONE_SEL = "#zona-mega-links,#zona-top-featured,#zona-magazine-widgets,#zona-sidebar," +
    "#zona-sidebar-tab,#zona-sidebar-widgets,#zona-footer,#zona-author";

  function scrollToZone(el) {
    // Zona di dalam wadah bergulir (sidebar berbatas tinggi) digulir dulu.
    // scrollTop WAJIB 0 — wadah yang di-scroll membuat zona muncul di bawah
    // puncaknya, sedangkan header sticky menutupi bagian atasnya:
    // setTimeout(() => $(zona).scrollIntoView()) gagal justru karena ini.
    var sc = el.parentElement;
    while (sc && sc !== doc.documentElement && sc !== doc.body) {
      var st = window.getComputedStyle(sc);
      if (/(auto|scroll|overlay)/.test(st.overflowY) && sc.scrollHeight > sc.clientHeight + 4) {
        sc.scrollTop = 0; break;
      }
      sc = sc.parentElement;
    }
    // Offset di bawah ambang sorotan blok v27 (120px) supaya zona yang
    // dituju langsung tersorot begitu halaman berhenti menggulir.
    var off = window.innerWidth <= 680 ? 80 : 96;
    var target = function () {
      var r = el.getBoundingClientRect().top + window.pageYOffset - off;
      return r < 0 ? 0 : r;
    };
    // Lompatan zona memakai gulir INSTAN (behavior:"auto"), bukan halus.
    // Pada halaman yang sangat panjang (≈29.000px) gulir halus lebih lambat
    // daripada pengisian iklan/gambar yang menggeser tata letak di tengah
    // jalan, sehingga posisi akhirnya meleset dan tidak dapat diprediksi.
    // Gulir instan + koreksi di bawah selalu mendarat tepat pada zona.
    window.scrollTo({ top: target(), behavior: "auto" });
    // Koreksi setelah tata letak tenang (gambar / unit iklan dapat menggeser
    // posisi setelah lompatan).
    var idle = 0, last = -1, rounds = 0;
    (function check() {
      var y = Math.round(window.pageYOffset);
      if (y === last) { idle++; } else { idle = 0; last = y; }
      if (idle >= 1) {
        if (Math.abs(Math.round(el.getBoundingClientRect().top - off)) <= 2 || rounds++ >= 4) return;
        window.scrollTo({ top: target(), behavior: "auto" });
        idle = 0; last = -1;
      }
      window.setTimeout(check, 160);
    })();
  }

  function ping(el) {
    if (reduce()) return;
    el.classList.remove("rwp-zone-ping");
    // paksa reflow agar animasi dapat dipicu ulang pada klik berturut-turut
    void el.offsetWidth;
    el.classList.add("rwp-zone-ping");
    window.setTimeout(function () { el.classList.remove("rwp-zone-ping"); }, 1400);
  }

  doc.addEventListener("click", function (e) {
    var a = e.target.closest ? e.target.closest('a[href*="#zona-"]') : null;
    if (!a) return;
    var href = a.getAttribute("href") || "";
    var hash = href.slice(href.indexOf("#"));
    var el = hash.length > 1 ? doc.getElementById(hash.slice(1)) : null;
    // Hanya tangani bila anchor zona BENAR-BENAR ada di halaman ini.
    // Ini juga mencakup bentuk lintas-halaman ("analisa-papua.html#zona-...")
    // ketika pengunjung sudah berada di halaman tersebut — tanpa ini, klik
    // akan memicu muat ulang penuh dan kehilangan offset header sticky.
    if (!el) return;
    e.preventDefault();
    scrollToZone(el);
    ping(el);
  }, false);

  // Bila halaman dibuka langsung dengan hash #zona-*, beri offset yang sama.
  function onLoadHash() {
    var h = window.location.hash;
    if (!h || h.indexOf("#zona-") !== 0) return;
    var el = doc.querySelector(h);
    if (el) window.setTimeout(function () { scrollToZone(el); }, 60);
  }
  if (doc.readyState === "complete" || doc.readyState === "interactive") onLoadHash();
  else doc.addEventListener("DOMContentLoaded", onLoadHash);

  window.RWPZones = {
    selector: ZONE_SEL,
    count: function () { return doc.querySelectorAll(ZONE_SEL).length; },
    scrollTo: function (id) {
      var el = doc.getElementById(id);
      if (!el) return false;
      scrollToZone(el); ping(el); return true;
    }
  };
})();


/* =====================================================================
   v27 · RAIL ZONA 4a — SOROTAN + GULIR OTOMATIS
   Tautan zona yang sedang aktif (#zona-*) di dalam rail kiri digulir
   otomatis ke area terlihat rail. Tiga rambu penting:
     1. Yang digulir adalah WADAH RAIL (scrollTop), bukan halaman — posisi
        gulir halaman tidak pernah tersentuh.
     2. Gulir hanya dipicu saat zona aktif BENAR-BENAR BERPINDAH, sehingga
        tidak ada gulir berulang saat pengunjung menggulir manual.
     3. Bila pengunjung sedang menggulir rail sendiri (gestur <300 ms),
        rail tidak direbut.
   Bila "kurangi gerakan" aktif, gulir rail instan (tanpa animasi) dan
   sorotan tetap bekerja. Tanpa JavaScript: kartu tetap tampil dan semua
   tautan tetap dapat diklik sebagai anchor biasa.
   ===================================================================== */
(function () {
  "use strict";

  var doc = document;
  var card = doc.querySelector("[data-srail]");
  if (!card) return;

  var links = Array.prototype.slice.call(card.querySelectorAll("[data-srail-link]"));
  if (!links.length) return;

  var thumb = card.querySelector("[data-srail-thumb]");
  var track = card.querySelector("[data-srail-track]");
  var out = card.querySelector("[data-srail-pos]");

  function reduce() {
    try { return window.matchMedia("(prefers-reduced-motion: reduce)").matches; }
    catch (e) { return false; }
  }
  function scrollY() { return window.pageYOffset || doc.documentElement.scrollTop || 0; }

  /* Jarak aman dari puncak viewport: header sticky (±64-72px) plus ruang
     napas. Dipakai angka yang SAMA di semua viewport — ambang lama yang
     berbeda-beda (150/160) menyebabkan "keterlambatan" sorotan di layar
     sempit: zona yang puncaknya sudah lewat viewport belum ikut tersorot. */
  function chromeOff() { return 120; }

  /* Wadah gulir TERDEKAT yang memuat elemen zona (bukan sebaliknya). */
  function zoneScroller(el) {
    var node = el.parentElement;
    while (node && node !== doc.body && node !== doc.documentElement) {
      var st = window.getComputedStyle(node);
      if (/(auto|scroll|overlay)/.test(st.overflowY) && node.scrollHeight > node.clientHeight + 4) return node;
      node = node.parentElement;
    }
    return null;
  }

  /* Zona yang benar-benar ada di halaman ini saja (tautan lintas-halaman
     atau anchor yang hilang otomatis diabaikan). */
  var items = links.map(function (a) {
    var id = (a.getAttribute("href") || "").replace(/^#/, "");
    var el = id ? doc.getElementById(id) : null;
    return el ? { a: a, el: el, id: id, top: 0 } : null;
  }).filter(Boolean);
  if (!items.length) return;

  /* Elemen yang posisinya berubah sendiri saat menempel (sticky) dan karena
     itu menyesatkan pengukuran posisi zona. Diambil dari lompatan tetua
     tiap zona supaya mencakup rail maupun kolom kanan. */
  var stickyNodes = (function () {
    var seen = [], out = [];
    items.forEach(function (t) {
      var n = t.el.parentElement;
      while (n && n !== doc.body && n !== doc.documentElement) {
        if (window.getComputedStyle(n).position === "sticky" && seen.indexOf(n) === -1) {
          seen.push(n); out.push(n);
        }
        n = n.parentElement;
      }
    });
    return out;
  })();

  function measure() {
    var y = scrollY(), i;
    /* Elemen position:sticky (rail & kolom kanan) tergeser dari posisi tata
       letaknya saat menempel, dan pergeseran itu IKUT terbaca oleh
       getBoundingClientRect() maupun offsetTop — sehingga posisi terukur
       berubah mengikuti posisi gulir dan ambang sorotan jadi tertinggal
       (terbukti: zona 5 baru tersorot setelah pembaca melewati zona 6).
       Pengukuran karena itu dilakukan dengan sticky dinetralkan sesaat;
       pemulihannya terjadi SEBELUM bingkai dilukis, jadi tak ada kedipan.
       Dengan sticky netral, rect sudah sama dengan posisi alir dokumen —
       termasuk untuk zona yang berada DI DALAM wadah bergulir (Sidebar Tab
       Area di dalam sidebar berbatas tinggi), sebab wadahnya juga ikut
       dikembalikan ke posisi alir. */
    for (i = 0; i < stickyNodes.length; i++) { stickyNodes[i].style.position = "static"; }
    items.forEach(function (t) {
      t.rect = t.el.getBoundingClientRect().top + y;
      t.top = t.rect;
    });
    for (i = 0; i < stickyNodes.length; i++) { stickyNodes[i].style.position = ""; }
  }

  /* Wadah gulir rail (desktop) — null bila rail tidak menggulir (mobile). */
  function railScroller() {
    var node = card.parentElement;
    while (node && node !== doc.body && node !== doc.documentElement) {
      var st = window.getComputedStyle(node);
      if (/(auto|scroll|overlay)/.test(st.overflowY) && node.scrollHeight > node.clientHeight + 4) return node;
      node = node.parentElement;
    }
    return null;
  }

  var curIdx = -1;
  var railTouchedAt = 0;
  var railEl = railScroller();
  if (railEl) {
    railEl.addEventListener("scroll", function () { railTouchedAt = Date.now(); }, { passive: true });
  }

  function mark(i) {
    items.forEach(function (t, k) {
      var on = k === i;
      t.a.classList.toggle("active", on);
      if (on) t.a.setAttribute("aria-current", "true");
      else t.a.removeAttribute("aria-current");
    });
    if (out) out.textContent = "Zona " + (i + 1) + " dari " + items.length;
    if (thumb && track && items.length > 1) {
      var free = track.clientHeight - thumb.offsetHeight;
      if (free < 0) free = 0;
      var p = i / (items.length - 1);
      thumb.style.transform = "translateY(" + Math.round(free * p) + "px)";
    }
    card.setAttribute("data-srail-cur", items[i].id);
  }

  /* Bawa tautan aktif ke area terlihat SETIAP wadah gulir di atasnya
     (rail desktop). Tidak pernah menyentuh posisi gulir halaman. */
  function ensureVisible(a) {
    if (Date.now() - railTouchedAt < 300) return false;
    var moved = false;
    var node = a.parentElement;
    while (node && node !== doc.body && node !== doc.documentElement) {
      var st = window.getComputedStyle(node);
      if (/(auto|scroll|overlay)/.test(st.overflowY) && node.scrollHeight > node.clientHeight + 4) {
        var lr = a.getBoundingClientRect(), nr = node.getBoundingClientRect(), pad = 10, delta = 0;
        if (lr.top < nr.top + pad) delta = lr.top - nr.top - pad;
        else if (lr.bottom > nr.bottom - pad) delta = lr.bottom - nr.bottom + pad;
        if (delta) {
          var to = Math.max(0, node.scrollTop + delta);
          if (node.scrollTo) node.scrollTo({ top: to, behavior: reduce() ? "auto" : "smooth" });
          else node.scrollTop = to;
          moved = true;
        }
      }
      node = node.parentElement;
    }
    return moved;
  }

  /* Zona aktif = zona terdalam yang puncaknya sudah terlewati garis acuan.
     Zona dengan puncak sama persis dimenangkan yang lebih luar (indeks
     lebih kecil), agar tidak ada zona yang tak pernah tersorot. */
  function pick() {
    var y = scrollY() + chromeOff();
    var idx = 0, last = -Infinity;
    items.forEach(function (t, i) {
      if (t.top <= y && t.top > last) { last = t.top; idx = i; }
    });
    return idx;
  }

  var ticking = false;
  function update() {
    ticking = false;
    measure();
    var i = pick();
    if (i === curIdx) return;   // hanya bergulir saat zona benar-benar berpindah
    curIdx = i;
    mark(i);
    ensureVisible(items[i].a);
  }
  function schedule() {
    if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
  }

  /* IntersectionObserver: pemicu kasar saat zona masuk/keluar viewport;
     gulir tetap ditangani rAF-throttle di bawah agar hemat. */
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function () { schedule(); }, { threshold: [0, 0.25, 0.5, 1] });
    items.forEach(function (t) { io.observe(t.el); });
  }
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule);
  window.addEventListener("load", schedule);
  /* pengaturan sistem berubah tanpa reload → segarkan sorotan & mode gulir */
  try {
    var mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq && mq.addEventListener) mq.addEventListener("change", schedule);
    else if (mq && mq.addListener) mq.addListener(schedule);
  } catch (e) { /* diamkan */ }

  measure();
  /* Gambar & iklan dapat menggeser posisi zona setelah muat */
  [300, 900, 1800].forEach(function (ms) { window.setTimeout(schedule, ms); });
  update();

  window.RWPRail = {
    count: items.length,
    ids: items.map(function (t) { return t.id; }),
    active: function () { return curIdx >= 0 ? items[curIdx].id : null; },
    card: card,
    railScrollTop: function () { var sc = railScroller(); return sc ? Math.round(sc.scrollTop) : null; },
    railScrollable: function () { return !!railScroller(); },
    railVisible: function (id) {
      var t = items.filter(function (x) { return x.id === id; })[0];
      var sc = railScroller();
      if (!t || !sc) return null;
      var lr = t.a.getBoundingClientRect(), sr = sc.getBoundingClientRect();
      return lr.top >= sr.top - 2 && lr.bottom <= sr.bottom + 2;
    },
    /* posisi tiap zona: top = dalam aliran dokumen (dipakai pemilihan zona),
       rect = posisi layar (dipakai pemeriksaan keterlihatan) */
    tops: function () {
      measure();
      return items.map(function (t) { return { id: t.id, top: Math.round(t.top), rect: Math.round(t.rect) }; });
    },
    refresh: function () { measure(); schedule(); }
  };
})();
