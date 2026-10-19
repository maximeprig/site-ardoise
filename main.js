/* ==========================================================================
   L’ARDOISE — animations & interactions (JS pur, aucune dépendance)
   ========================================================================== */
(() => {
  'use strict';

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const root = document.documentElement;
  root.classList.remove('no-js');

  /* ------------------------------------------------------------------
     Langue — FR par défaut, EN si la page est <html lang="en">
     (utilisé par index-en.html + menu-data.en.js ; voir aussi plus bas
     pour toutes les chaînes traduites : jours, horaires, menu burger)
     ------------------------------------------------------------------ */
  const LANG = document.documentElement.lang === 'en' ? 'en' : 'fr';
  const I18N = {
    fr: {
      days: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
      today: 'Aujourd’hui',
      menuOpen: 'Ouvrir le menu',
      menuClose: 'Fermer le menu',
      axisHour: (h) => h + 'h',
      time: (h, mm) => mm ? `${h}h${String(mm).padStart(2, '0')}` : `${h}h`,
      status: {
        open: (t) => `Ouvert maintenant · service jusqu’à ${t}`,
        opensAt: (t) => `Fermé · ouvre à ${t}`,
        reopensAt: (t) => `Fermé · rouvre à ${t}`,
        opensTomorrow: (t) => `Fermé · ouvre demain à ${t}`
      }
    },
    en: {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      today: 'Today',
      menuOpen: 'Open menu',
      menuClose: 'Close menu',
      axisHour: (h) => String(h),
      time: (h, mm) => `${h}:${String(mm).padStart(2, '0')}`,
      status: {
        open: (t) => `Open now · service until ${t}`,
        opensAt: (t) => `Closed · opens at ${t}`,
        reopensAt: (t) => `Closed · reopens at ${t}`,
        opensTomorrow: (t) => `Closed · opens tomorrow at ${t}`
      }
    }
  };
  const T = I18N[LANG];

  /* ------------------------------------------------------------------
     Horaires — modifiez ici si les services changent (minutes depuis 0h)
     ------------------------------------------------------------------ */
  const SERVICES = [
    { start: 12 * 60, end: 14 * 60, label: 'Déjeuner' },
    { start: 18 * 60, end: 20 * 60 + 30, label: 'Dîner' }
  ];
  const DAYS = T.days;
  const RANGE = [10 * 60, 23 * 60]; // fenêtre affichée dans la frise

  const fmt = (m) => T.time(Math.floor(m / 60), m % 60);

  function parisNow() {
    const parts = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Paris', weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(new Date());
    const get = (t) => parts.find((p) => p.type === t).value;
    return {
      day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].indexOf(get('weekday')),
      min: (+get('hour')) * 60 + (+get('minute'))
    };
  }

  /* ------------------------------------------------------------------
     Statut ouvert / fermé + frise des horaires
     ------------------------------------------------------------------ */
  function statusText(min) {
    const cur = SERVICES.find((s) => min >= s.start && min < s.end);
    if (cur) return { open: true, text: T.status.open(fmt(cur.end)) };
    const next = SERVICES.find((s) => min < s.start);
    if (next) return { open: false, text: next === SERVICES[0] ? T.status.opensAt(fmt(next.start)) : T.status.reopensAt(fmt(next.start)) };
    return { open: false, text: T.status.opensTomorrow(fmt(SERVICES[0].start)) };
  }

  function buildDays() {
    const host = $('#days');
    if (!host) return;
    const span = RANGE[1] - RANGE[0];
    const pct = (m) => ((m - RANGE[0]) / span) * 100;

    const axis = document.createElement('div');
    axis.className = 'axis';
    axis.innerHTML = '<span></span><div class="axis-track"></div><span></span>';
    [12, 14, 16, 18, 20, 22].forEach((h) => {
      const s = document.createElement('span');
      s.style.left = pct(h * 60) + '%';
      s.textContent = T.axisHour(h);
      $('.axis-track', axis).appendChild(s);
    });
    host.appendChild(axis);

    DAYS.forEach((name, i) => {
      const row = document.createElement('div');
      row.className = 'day';
      row.dataset.day = i;
      row.style.setProperty('--r', i);
      const segs = SERVICES.map((s, k) => `<i class="seg" style="left:${pct(s.start)}%;width:${pct(s.end) - pct(s.start)}%;--k:${k}"></i>`).join('');
      row.innerHTML = `
        <div class="day-name">${name}<small></small></div>
        <div class="track">${segs}<i class="now"></i></div>
        <div class="day-times">${SERVICES.map((s) => `${fmt(s.start)} – ${fmt(s.end)}`).join('<br>')}</div>`;
      host.appendChild(row);
    });
    io(host, () => host.classList.add('in'), 0.15);
  }

  function updateStatus() {
    const { day, min } = parisNow();
    const st = statusText(min);
    $$('[data-status]').forEach((el) => {
      el.classList.toggle('is-open', st.open);
      $('span', el).textContent = st.text;
    });
    $$('.day').forEach((row) => {
      const today = +row.dataset.day === day;
      row.classList.toggle('today', today);
      $('small', row).textContent = today ? T.today : '';
      const now = $('.now', row);
      const inRange = today && min >= RANGE[0] && min <= RANGE[1];
      now.style.display = inRange ? 'block' : 'none';
      if (inRange) now.style.left = ((min - RANGE[0]) / (RANGE[1] - RANGE[0])) * 100 + '%';
    });
  }

  /* ------------------------------------------------------------------
     Utilitaires : observer, découpe de texte, roll
     ------------------------------------------------------------------ */
  function io(el, cb, threshold = 0.2, once = true) {
    const o = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { cb(e.target); if (once) o.unobserve(e.target); } });
    }, { threshold, rootMargin: '0px 0px -6% 0px' });
    o.observe(el);
    return o;
  }

  function splitWords(el, cls = 'w') {
    const walk = (node) => {
      [...node.childNodes].forEach((n) => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach((tok) => {
            if (!tok) return;
            if (/^\s+$/.test(tok)) { frag.appendChild(document.createTextNode(' ')); return; }
            if (cls === 'w') {
              const w = document.createElement('span'); w.className = 'w';
              const wi = document.createElement('span'); wi.className = 'wi'; wi.textContent = tok;
              w.appendChild(wi); frag.appendChild(w);
            } else {
              const w = document.createElement('span'); w.className = cls; w.textContent = tok; frag.appendChild(w);
            }
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1 && n.tagName !== 'BR') walk(n);
      });
    };
    walk(el);
  }

  function splitChars(el, cls = 'ch') {
    const txt = el.textContent;
    el.textContent = '';
    [...txt].forEach((c, i) => {
      const s = document.createElement('span');
      s.className = cls + (c === ' ' ? ' sp' : '');
      s.style.setProperty('--i', i);
      s.textContent = c === ' ' ? ' ' : c;
      el.appendChild(s);
    });
  }

  function initText() {
    // titres : mot par mot, masqués
    $$('[data-split]').forEach((el) => {
      splitWords(el, 'w');
      $$('.wi', el).forEach((wi, i) => wi.style.setProperty('--i', i));
      io(el, () => el.classList.add('in'), 0.25);
    });
    // lettres (wordmark, footer, téléphone) : celles du hero partent après le préchargeur, les autres au scroll
    $$('[data-chars]').forEach((el) => {
      splitChars(el, 'ch');
      if (!el.closest('.hero')) io(el, () => el.classList.add('in'), 0.3);
    });
    const phone = $('[data-phone]');
    if (phone) { splitChars(phone, 'c'); io(phone, () => phone.classList.add('in'), 0.3); }
    // roll
    $$('[data-roll]').forEach((el) => {
      const t = el.textContent;
      el.classList.add('roll');
      el.dataset.t = t;
      el.innerHTML = `<span>${t}</span>`;
    });
    // révélations
    $$('[data-stagger]').forEach((p) => $$(':scope > [data-reveal]', p).forEach((c, i) => c.style.setProperty('--d', i * 130)));
    $$('[data-reveal]').forEach((el) => {
      if (el.closest('.hero')) return; // le hero est déclenché après le préchargeur
      io(el, () => el.classList.add('in'), 0.15);
    });
  }

  /* ------------------------------------------------------------------
     Préchargeur
     ------------------------------------------------------------------ */
  function start() {
    document.body.classList.remove('is-loading');
    document.body.classList.add('ready');
    $$('.hero [data-reveal]').forEach((el) => el.classList.add('in'));
  }

  function preloader() {
    const pl = $('.preloader');
    if (!pl) return start();
    if (reduce) { pl.remove(); return start(); }
    const num = $('.pl-num'), bar = $('.pl-bar');
    const t0 = performance.now(), dur = 1500;
    const fontsReady = document.fonts && document.fonts.ready ? Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 2500))]) : Promise.resolve();
    let fontsOk = false;
    fontsReady.then(() => { fontsOk = true; });
    (function step(now) {
      const p = clamp((now - t0) / dur);
      const e = 1 - Math.pow(1 - p, 3);
      num.textContent = String(Math.round(e * 100)).padStart(2, '0');
      bar.style.transform = `scaleX(${e})`;
      if (p < 1 || !fontsOk) return requestAnimationFrame(step);
      pl.classList.add('out');
      setTimeout(start, 500);
      setTimeout(() => pl.remove(), 1500);
    })(t0);
  }

  /* ------------------------------------------------------------------
     Curseur personnalisé + boutons magnétiques
     ------------------------------------------------------------------ */
  function initCursor() {
    if (!fine || reduce) return;
    const ring = $('.cursor-ring'), dot = $('.cursor-dot');
    let x = -100, y = -100, rx = x, ry = y;
    addEventListener('pointermove', (e) => {
      x = e.clientX; y = e.clientY;
      root.classList.add('has-cursor');
    }, { passive: true });
    document.addEventListener('mouseleave', () => root.classList.remove('has-cursor'));
    document.addEventListener('mouseover', (e) => {
      const hot = e.target.closest('a, button, [data-hover], .dish, .card, .tab, .day');
      document.body.classList.toggle('cur-hover', !!hot && !e.target.closest('input, textarea, select'));
    });
    (function loop() {
      rx += (x - rx) * 0.17; ry += (y - ry) * 0.17;
      dot.style.transform = `translate3d(${x}px,${y}px,0)`;
      ring.style.transform = `translate3d(${rx}px,${ry}px,0)`;
      requestAnimationFrame(loop);
    })();

    // magnétisme
    $$('[data-magnet]').forEach((el) => {
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
        el.style.transform = `translate(${dx * 0.22}px, ${dy * 0.32}px)`;
      });
      el.addEventListener('pointerleave', () => { el.style.transform = ''; });
    });

    // léger tilt 3D sur les cartes
    $$('[data-tilt]').forEach((el) => {
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = `perspective(900px) rotateX(${(-py * 4).toFixed(2)}deg) rotateY(${(px * 5).toFixed(2)}deg)`;
      });
      el.addEventListener('pointerleave', () => { el.style.transform = ''; });
    });
  }

  /* ------------------------------------------------------------------
     Navigation
     ------------------------------------------------------------------ */
  function initNav() {
    const nav = $('#nav'), burger = $('.burger'), menu = $('#menu');
    let lastY = scrollY;
    addEventListener('scroll', () => {
      const y = scrollY;
      nav.classList.toggle('solid', y > 80);
      if (!menu.classList.contains('open')) nav.classList.toggle('hide', y > lastY && y > 400);
      // les onglets de la carte se collent sous la barre, ou tout en haut quand la barre est masquée
      root.style.setProperty('--navoff', nav.classList.contains('hide') ? '0px' : '');
      lastY = y;
    }, { passive: true });

    const toggle = (open) => {
      menu.classList.toggle('open', open);
      menu.setAttribute('aria-hidden', String(!open));
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? T.menuClose : T.menuOpen);
      document.body.style.overflow = open ? 'hidden' : '';
      nav.classList.remove('hide');
    };
    burger.addEventListener('click', () => toggle(!menu.classList.contains('open')));
    $$('a', menu).forEach((a) => a.addEventListener('click', () => toggle(false)));
    addEventListener('keydown', (e) => { if (e.key === 'Escape') toggle(false); });
  }

  /* ------------------------------------------------------------------
     Carte (rendu depuis menu-data.js)
     ------------------------------------------------------------------ */
  function initCarte() {
    const count = (c) => c.groups.reduce((n, g) => n + g.items.length, 0);
    // une partie sans aucun plat (ex. "Suggestions" quand il n'y en a pas) n'affiche pas d'onglet
    const data = (window.CARTE || []).filter((c) => count(c) > 0);
    const tabs = $('#tabs'), panel = $('#panel');
    if (!tabs || !panel || !data.length) return;
    let current = -1, sub = 0, busy = false;
    // sous-menu : une partie marquée subnav: true affiche une entrée par group (nom court = label, sinon title)
    const subsOf = (cat) => { const s = cat.subnav ? cat.groups.filter((g) => g.items.length) : []; return s.length > 1 ? s : []; };
    const subName = (g) => g.label || g.title;

    // La carte a été défilée puis on change de partie : au moment où la liste change, on revient au début de la
    // nouvelle liste. Sinon une liste plus courte laisse l'écran plus bas dans la page (jusqu'à "Face au port").
    // Retour immédiat (pas animé) : il tombe pile quand l'ancienne liste est remplacée.
    const grid = $('.carte-grid');
    const toTop = () => {
      if (!grid || current === -1) return; // 1er affichage : la page ne bouge pas
      const rem = parseFloat(getComputedStyle(root).fontSize) || 16;
      const lim = rem * (matchMedia('(max-width: 1000px)').matches ? 4.5 : 6.25); // barre de navigation (+ marge sur ordinateur)
      const top = grid.getBoundingClientRect().top;
      if (top < lim - 1) scrollTo({ top: scrollY + top - lim, behavior: 'instant' });
    };

    // FR : "12,50 €" — EN : "€12.50" (le montant est écrit tel quel dans menu-data*.js)
    const money = (p) => (p === '' || p == null) ? '' : (/[€]/.test(String(p)) ? String(p) : (LANG === 'en' ? `€${p}` : `${p} €`));

    data.forEach((cat, i) => {
      const b = document.createElement('button');
      b.className = 'tab'; b.type = 'button';
      b.id = `tab-${cat.id}`; b.setAttribute('aria-controls', 'panel');
      b.innerHTML = `<span class="t-num">${String(i + 1).padStart(2, '0')}</span><span class="t-name"></span><span class="t-count">${String(count(cat)).padStart(2, '0')}</span>`;
      $('.t-name', b).textContent = cat.title;
      b.addEventListener('click', () => show(i));
      b.addEventListener('keydown', (e) => {
        const k = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
        if (!k) return;
        e.preventDefault();
        const n = (current + k + data.length) % data.length;
        show(n); $$('.tab', tabs)[n].focus();
      });
      tabs.appendChild(b);
      const subs = subsOf(cat);
      if (subs.length) {
        // sous-menu déroulant sous l'onglet (ordinateur) ; sur téléphone, ce sont les pastilles en haut du panneau
        b.setAttribute('aria-expanded', 'false'); b.setAttribute('aria-controls', `subs-${cat.id}`);
        const wrap = document.createElement('div'); wrap.className = 'subtabs'; wrap.id = `subs-${cat.id}`;
        const ul = document.createElement('ul');
        subs.forEach((g, k) => {
          const li = document.createElement('li'), sb = document.createElement('button');
          sb.className = 'subtab'; sb.type = 'button'; sb.textContent = subName(g);
          sb.addEventListener('click', () => show(i, k));
          sb.addEventListener('keydown', (e) => {
            const d = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
            if (!d) return;
            e.preventDefault();
            const n = (k + d + subs.length) % subs.length;
            show(i, n); $$('.subtab', ul)[n].focus();
          });
          li.appendChild(sb); ul.appendChild(li);
        });
        wrap.appendChild(ul); tabs.appendChild(wrap);
      }
    });

    function render(cat, i, s) {
      panel.innerHTML = '';
      let idx = 0;
      const subs = subsOf(cat);
      if (subs.length) {
        // pastilles (téléphone / tablette) : les mêmes sections que le sous-menu de l'ordinateur
        const bar = document.createElement('div'); bar.className = 'subchips';
        subs.forEach((g, k) => {
          const c = document.createElement('button');
          c.className = 'subchip'; c.type = 'button'; c.textContent = subName(g);
          if (k === s) c.setAttribute('aria-current', 'true');
          c.addEventListener('click', () => show(i, k));
          bar.appendChild(c);
        });
        panel.appendChild(bar);
      }
      if (cat.note) {
        const n = document.createElement('p');
        n.className = 'panel-note'; n.textContent = cat.note; n.style.setProperty('--i', idx++);
        panel.appendChild(n);
      }
      (subs.length ? [subs[s]] : cat.groups).forEach((g) => {
        if (g.title) {
          const h = document.createElement('h3');
          h.className = 'grp'; h.textContent = g.title; h.style.setProperty('--i', idx++);
          panel.appendChild(h);
        }
        const ul = document.createElement('ul');
        ul.className = 'dishes';
        g.items.forEach((it) => {
          const li = document.createElement('li');
          li.className = 'dish'; li.style.setProperty('--i', idx++);
          const top = document.createElement('div'); top.className = 'dish-top';
          const name = document.createElement('h4'); name.className = 'dish-name'; name.textContent = it.name;
          top.appendChild(name);
          if (it.tag) { const t = document.createElement('span'); t.className = 'dish-tag'; t.textContent = it.tag; top.appendChild(t); }
          const lead = document.createElement('span'); lead.className = 'dish-lead';
          const pr = document.createElement('span'); pr.className = 'dish-price';
          if (Array.isArray(it.prices)) {
            // plusieurs formats pour un même article : prices: [['25 cl', '3,80'], ['50 cl', '7,50']]
            it.prices.forEach(([size, p], k) => {
              if (k) pr.appendChild(document.createTextNode(' ')); // espace pour les lecteurs d'écran / le copier-coller ("75 cl 28 € 37,5 cl 18 €")
              const dp = document.createElement('span'); dp.className = 'dp';
              const sz = document.createElement('small'); sz.textContent = size;
              dp.append(sz, document.createTextNode(` ${money(p)}`));
              pr.appendChild(dp);
            });
          } else pr.textContent = money(it.price);
          top.append(lead, pr);
          li.appendChild(top);
          if (it.desc) { const d = document.createElement('p'); d.className = 'dish-desc'; d.textContent = it.desc; li.appendChild(d); }
          ul.appendChild(li);
        });
        panel.appendChild(ul);
      });
      panel.className = 'panel enter';
    }

    function show(i, s) {
      if (s === undefined) s = i === current ? sub : 0; // on revient toujours à la 1re section en changeant de partie
      if ((i === current && s === sub) || busy) return;
      $$('.tab', tabs).forEach((t, k) => {
        if (k === i) t.setAttribute('aria-current', 'true'); else t.removeAttribute('aria-current');
        if (t.hasAttribute('aria-expanded')) t.setAttribute('aria-expanded', String(k === i));
      });
      $$('.subtabs', tabs).forEach((w) => {
        const on = w.id === `subs-${data[i].id}`;
        w.classList.toggle('open', on);
        $$('.subtab', w).forEach((sb, k) => { if (on && k === s) sb.setAttribute('aria-current', 'true'); else sb.removeAttribute('aria-current'); });
      });
      panel.setAttribute('aria-labelledby', `tab-${data[i].id}`);
      const swap = () => { render(data[i], i, s); toTop(); current = i; sub = s; busy = false; };
      if (current === -1 || reduce) return swap();
      busy = true;
      panel.classList.remove('enter'); panel.classList.add('leave');
      setTimeout(swap, 360);
    }
    show(0);
  }

  /* ------------------------------------------------------------------
     Mer animée (canvas du hero)
     ------------------------------------------------------------------ */
  function initSea() {
    const c = $('#sea');
    if (!c) return;
    const ctx = c.getContext('2d');
    const hero = $('.hero');
    let w = 0, h = 0, dpr = 1, visible = true;
    let mx = 0.5, my = 0.5, tmx = 0.5, tmy = 0.5;
    let S = 1, ROWS = 17, STEP = 10; // S : échelle de l'interface (le site grandit sur les grands écrans) ; ROWS/STEP : qualité du dessin
    const dust = Array.from({ length: 70 }, () => ({ x: Math.random(), y: Math.random(), r: Math.random() * 1.5 + 0.4, s: Math.random() * 0.00004 + 0.00001, a: Math.random() * 0.5 + 0.15, p: Math.random() * 6.28 }));

    function resize() {
      dpr = Math.min(devicePixelRatio || 1, 2);
      w = c.clientWidth; h = c.clientHeight;
      c.width = w * dpr; c.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      S = (parseFloat(getComputedStyle(root).fontSize) / 16) || 1;
      const lite = w < 700 || (navigator.hardwareConcurrency || 8) <= 4; // téléphones / petits processeurs : dessin allégé
      ROWS = lite ? 11 : 17; STEP = lite ? 14 : 10;
      if (reduce) draw(0);
    }

    function draw(t) {
      ctx.clearRect(0, 0, w, h);
      const hor = h * 0.5;
      const cx = w * (w < 700 ? 0.5 : 0.7) - (mx - 0.5) * 40;
      const cy = h * 0.27 - (my - 0.5) * 24;
      const R = Math.min(w, h) * (w < 700 ? 0.15 : 0.12);

      // lune : halo + anneaux
      ctx.lineWidth = Math.max(1, S);
      ctx.strokeStyle = 'rgba(216,203,184,.38)';
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, 6.283); ctx.stroke();
      ctx.strokeStyle = 'rgba(216,203,184,.14)';
      ctx.beginPath(); ctx.arc(cx, cy, R * (1.32 + Math.sin(t * 0.0006) * 0.04), 0, 6.283); ctx.stroke();
      ctx.beginPath(); ctx.arc(cx, cy, R * (1.75 + Math.sin(t * 0.0005 + 1) * 0.05), 0, 6.283); ctx.stroke();

      // poussières / étoiles
      dust.forEach((d) => {
        const y = (d.y - t * d.s) % 1; const yy = (y < 0 ? y + 1 : y) * hor * 1.05;
        const tw = 0.5 + 0.5 * Math.sin(t * 0.0015 + d.p);
        ctx.fillStyle = `rgba(216,203,184,${(d.a * tw).toFixed(3)})`;
        ctx.beginPath(); ctx.arc(d.x * w + (mx - 0.5) * d.r * 10, yy, d.r * S, 0, 6.283); ctx.fill();
      });

      // horizon
      ctx.strokeStyle = 'rgba(216,203,184,.32)';
      ctx.beginPath(); ctx.moveTo(0, hor); ctx.lineTo(w, hor); ctx.stroke();

      // vagues
      for (let i = 0; i < ROWS; i++) {
        const k = i / (ROWS - 1);
        const y0 = hor + 6 + (h - hor) * Math.pow(k, 1.75);
        const amp = (1 + k * 15) * S;
        const freq = (0.006 - k * 0.0038) / S;
        const sp = 0.0004 + k * 0.0009;
        const alpha = 0.07 + k * 0.3;
        ctx.strokeStyle = `rgba(216,203,184,${alpha.toFixed(3)})`;
        ctx.beginPath();
        for (let x = 0; x <= w + STEP; x += STEP) {
          const y = y0
            + Math.sin(x * freq + t * sp + i * 1.7) * amp
            + Math.sin(x * freq * 2.4 - t * sp * 0.7 + i) * amp * 0.38
            + (mx - 0.5) * k * 16 * S * Math.sin(x * 0.004 / S + i);
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.stroke();

        // reflet de la lune sur l'eau
        const half = (26 + (1 - k) * 46) * S * (0.6 + 0.4 * Math.sin(t * 0.002 + i * 2.1));
        ctx.strokeStyle = `rgba(216,203,184,${(0.18 + (1 - k) * 0.4).toFixed(3)})`;
        ctx.beginPath();
        const rx = cx + Math.sin(t * 0.0008 + i) * 8;
        const ry = y0 + Math.sin(rx * freq + t * sp + i * 1.7) * amp;
        ctx.moveTo(rx - half, ry); ctx.lineTo(rx + half, ry);
        ctx.stroke();
      }
    }

    new IntersectionObserver((e) => { visible = e[0].isIntersecting; }, { threshold: 0 }).observe(hero);
    addEventListener('resize', resize);
    resize();
    if (reduce) return;

    hero.addEventListener('pointermove', (e) => {
      const r = hero.getBoundingClientRect();
      tmx = (e.clientX - r.left) / r.width; tmy = (e.clientY - r.top) / r.height;
      hero.style.setProperty('--mx', (tmx * 100).toFixed(1) + '%');
      hero.style.setProperty('--my', (tmy * 100).toFixed(1) + '%');
    });
    (function loop(t) {
      if (visible) {
        mx += (tmx - mx) * 0.05; my += (tmy - my) * 0.05;
        draw(t);
      }
      requestAnimationFrame(loop);
    })(0);
  }

  /* ------------------------------------------------------------------
     Boucle scroll : parallax, marquee, texte qui se remplit, port épinglé
     ------------------------------------------------------------------ */
  function initScroll() {
    const progress = $('.progress');
    const heroInner = $('.hero-inner');
    const badge = $('.badge');
    const fills = $$('[data-fill]').map((el) => {
      splitWords(el, 'fw');
      return { el, words: $$('.fw', el), lit: -1 };
    });
    const rows = $$('.mq-row').map((row) => {
      const set = $('.mq-set', row);
      for (let i = 0; i < 3; i++) row.appendChild(set.cloneNode(true));
      $$('.mq-set', row).slice(1).forEach((s) => s.setAttribute('aria-hidden', 'true'));
      return { row, dir: +row.dataset.mq, x: 0, cycle: 0 };
    });
    let uiScale = 1; // le bandeau garde la même vitesse relative quand le site grandit sur un grand écran
    const measure = () => {
      uiScale = (parseFloat(getComputedStyle(root).fontSize) / 16) || 1;
      rows.forEach((r) => { r.cycle = $('.mq-set', r.row).getBoundingClientRect().width; });
    };
    measure(); addEventListener('resize', measure);
    if (document.fonts) document.fonts.ready.then(measure);

    const harbor = $('.harbor');
    const draws = $$('.harbor .draw');
    const sun = $('#sun');
    const title = $('.harbor-title');
    const capA = $('.harbor-cap-a'), capB = $('.harbor-cap-b');

    let lastY = scrollY, vel = 0, last = performance.now();

    function frame(now) {
      const dt = Math.min(now - last, 60); last = now;
      const y = scrollY, vh = innerHeight;
      vel += ((y - lastY) - vel) * 0.12; lastY = y;

      // progression globale
      const max = document.documentElement.scrollHeight - vh;
      if (progress) progress.style.setProperty('--p', max > 0 ? (y / max).toFixed(4) : 0);

      // hero : parallax + fondu (pages sans hero, ex. mentions légales : rien à faire)
      if (heroInner && y < vh * 1.2 && !reduce) {
        heroInner.style.transform = `translate3d(0, ${y * 0.22}px, 0)`;
        heroInner.style.opacity = String(1 - clamp(y / (vh * 0.85)) * 0.9);
      }

      // marquee : vitesse de base + poussée du scroll
      if (!reduce) {
        rows.forEach((r) => {
          if (!r.cycle) return;
          r.x = (r.x + (46 * uiScale + Math.abs(vel) * 9) * dt / 1000) % r.cycle;
          // dir -1 : défile vers la gauche, dir 1 : vers la droite
          r.row.style.transform = `translate3d(${r.dir === -1 ? -r.x : r.x - r.cycle}px,0,0)`;
        });
      }

      // badge rotatif
      if (badge && !reduce) badge.style.transform = `rotate(${y * 0.12}deg)`;

      // texte qui se remplit
      fills.forEach((f) => {
        const r = f.el.getBoundingClientRect();
        if (r.bottom < -100 || r.top > vh) return;
        const p = clamp((vh * 0.88 - r.top) / (vh * 0.42 + r.height));
        const n = Math.round(p * f.words.length * 1.04);
        if (n === f.lit) return;
        f.words.forEach((w, i) => w.classList.toggle('on', i < n));
        f.lit = n;
      });

      // port épinglé
      if (harbor) {
        const r = harbor.getBoundingClientRect();
        if (r.bottom > 0 && r.top < vh) {
          // p : 0 → 1 pendant que la scène est épinglée (la durée se règle dans style.css, .harbor { height })
          // tout est terminé vers p = 0.6, le reste sert de temps de lecture avant de repartir
          const p = clamp(-r.top / (r.height - vh));
          const draw = clamp(p / 0.5);
          const n = draws.length;
          draws.forEach((d, i) => {
            const local = clamp(draw * (1 + n * 0.05) - i * 0.05 + (reduce ? 1 : 0));
            d.style.strokeDashoffset = (1 - local).toFixed(4);
          });
          const rise = 1 - (1 - clamp(p / 0.55)) ** 3;
          sun.setAttribute('transform', `translate(0 ${((1 - rise) * 170).toFixed(1)})`);
          // le titre arrive de la droite et se pose, en entier, à gauche de l'écran
          const slide = 1 - (1 - clamp(p / 0.6)) ** 3;
          title.style.setProperty('--tx', `${(44 - slide * 39).toFixed(2)}vw`);
          capA.classList.toggle('show', p > 0.42);
          capB.classList.toggle('show', p > 0.52);
        }
      }
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  /* ------------------------------------------------------------------
     Go
     ------------------------------------------------------------------ */
  buildDays();
  initText();
  initNav();
  initCarte();
  initSea();
  initScroll();
  initCursor();
  updateStatus();
  setInterval(updateStatus, 30000);
  const y = $('#year'); if (y) y.textContent = new Date().getFullYear();
  preloader();
})();
