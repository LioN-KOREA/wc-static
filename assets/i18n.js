// I18N: loads assets/texts_<locale>.json and applies it to [data-i18n] (inner HTML) and
// [data-i18n-attr="attr:key;attr:key"]; adds the language switch to the header and mobile menu.
// Locale order: ?lang= in the URL -> the visitor's last choice -> ko-KR (default).
// Other scripts use I18N.t('scope.key', fallback) and I18N.ready.then(...).
(function () {
  const LOCALES = { 'ko-KR': '한국어', 'en-US': 'English', 'zh-CN': '中文', 'ja-JP': '日本語' };
  const DEFAULT = 'ko-KR', STORE = 'wc-locale';
  const fromUrl = new URLSearchParams(location.search).get('lang');
  let saved = null;
  try { saved = localStorage.getItem(STORE); } catch (e) {}
  const locale = LOCALES[fromUrl] ? fromUrl : LOCALES[saved] ? saved : DEFAULT;
  if (LOCALES[fromUrl]) { try { localStorage.setItem(STORE, fromUrl); } catch (e) {} }

  const root = document.documentElement;
  root.lang = locale;
  // the HTML already contains the Korean texts; for other languages hide the page until they are applied
  const pending = locale !== DEFAULT;
  if (pending) root.classList.add('i18n-pending');
  const reveal = () => root.classList.remove('i18n-pending');
  if (pending) setTimeout(reveal, 3000); // never leave the page hidden if loading fails

  let dict = {};
  const t = (key, fallback) => {
    const i = key.indexOf('.');
    const v = dict[key.slice(0, i)] && dict[key.slice(0, i)][key.slice(i + 1)];
    return v !== undefined ? v : fallback;
  };
  const missing = [];
  const apply = scope => {
    scope.querySelectorAll('[data-i18n]').forEach(el => {
      const v = t(el.dataset.i18n);
      if (v === undefined) { missing.push(el.dataset.i18n); return; }
      if (el.tagName === 'TITLE') document.title = v; else el.innerHTML = v;
    });
    scope.querySelectorAll('[data-i18n-attr]').forEach(el => {
      el.dataset.i18nAttr.split(';').forEach(pair => {
        const i = pair.indexOf(':'), v = t(pair.slice(i + 1));
        if (v === undefined) missing.push(pair.slice(i + 1)); else el.setAttribute(pair.slice(0, i), v);
      });
    });
  };
  const switcher = () => {
    const nav = document.createElement('nav');
    nav.className = 'lang-switch';
    nav.setAttribute('aria-label', t('js.lang_label', 'Language'));
    nav.innerHTML = Object.entries(LOCALES).map(([code, name]) => {
      const url = new URL(location.href); url.searchParams.set('lang', code);
      return `<a href="${url.search}${url.hash}" lang="${code}" hreflang="${code}"${code === locale ? ' aria-current="true"' : ''}>${name}</a>`;
    }).join('');
    return nav;
  };

  const load = fetch(`assets/texts_${locale}.json`).then(r => r.ok ? r.json() : {}).catch(() => ({}));
  const domReady = new Promise(r => document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', r) : r());
  const ready = Promise.all([load, domReady]).then(([d]) => {
    dict = d || {};
    apply(document);
    const right = document.querySelector('.header-right'), mobile = document.querySelector('.mobile-menu');
    if (right) right.prepend(switcher());
    if (mobile) mobile.prepend(switcher()); // top of the mobile menu: visible without scrolling
    if (missing.length) console.warn('[i18n] missing keys for ' + locale + ':', missing);
    reveal();
    return dict;
  });
  window.I18N = { locale, locales: LOCALES, t, ready, apply };
})();
