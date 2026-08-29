(function (root, factory) {
  var api = factory(root);
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root && root.document) api.init();
})(typeof window !== 'undefined' ? window : null, function (window) {
  'use strict';

  var GA_ID = 'G-84X42E5J4V';
  var CONSENT_KEY = 'saharasoft.analytics_consent';
  var CONSENT_VERSION = 1;
  var UTM_KEYS = [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_content',
    'utm_term'
  ];
  var DEFAULTS = {
    utm_source: 'saharasoft',
    utm_medium: 'referral',
    utm_campaign: 'tallydue_referral'
  };

  function referralUrl(href, incomingSearch, placement) {
    var target = new URL(href, 'https://saharasoft.org/');
    var incoming = new URLSearchParams(incomingSearch || '');

    UTM_KEYS.forEach(function (key) {
      if (target.searchParams.has(key)) return;
      if (key === 'utm_content' && placement) {
        target.searchParams.set(key, placement);
        return;
      }
      var value = incoming.get(key) || DEFAULTS[key];
      if (value) target.searchParams.set(key, value);
    });
    return target.toString();
  }

  function isTallyDueLink(link) {
    try {
      var url = new URL(link.href, window.location.href);
      return url.hostname === 'tallydue.com' || url.hostname.endsWith('.tallydue.com');
    } catch (_) {
      return false;
    }
  }

  function pagePlacement(index) {
    var page = window.location.pathname
      .replace(/^\/+|\/+$/g, '')
      .replace(/\.html$/, '')
      .replace(/[^a-z0-9]+/gi, '-') || 'home';
    return page + '-link-' + (index + 1);
  }

  function decorateTallyDueLinks() {
    var links = Array.prototype.filter.call(
      window.document.querySelectorAll('a[href]'),
      isTallyDueLink
    );
    links.forEach(function (link, index) {
      var placement = link.getAttribute('data-referral-placement') || pagePlacement(index);
      link.href = referralUrl(link.href, window.location.search, placement);
      link.addEventListener('click', function () {
        if (typeof window.gtag !== 'function') return;
        window.gtag('event', 'tallydue_referral_clicked', {
          link_url: link.href,
          link_domain: 'tallydue.com',
          referral_placement: placement,
          transport_type: 'beacon'
        });
      });
    });
  }

  function loadGa4() {
    if (window.document.querySelector('script[data-saharasoft-ga4]')) return;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', GA_ID, { anonymize_ip: true });

    var script = window.document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(GA_ID);
    script.setAttribute('data-saharasoft-ga4', 'true');
    window.document.head.appendChild(script);
  }

  function clearGaCookies() {
    window.document.cookie.split(';').forEach(function (entry) {
      var name = entry.split('=')[0].trim();
      if (name === '_ga' || name.indexOf('_ga_') === 0) {
        window.document.cookie = name + '=; Max-Age=0; Path=/; SameSite=Lax';
        window.document.cookie = name + '=; Max-Age=0; Path=/; Domain=.saharasoft.org; SameSite=Lax';
      }
    });
  }

  function storedConsent() {
    try {
      var stored = JSON.parse(window.localStorage.getItem(CONSENT_KEY));
      if (stored && stored.version === CONSENT_VERSION) return stored.value;
    } catch (_) {
      // Missing, legacy, or malformed consent is treated as no decision.
    }
    return null;
  }

  function storeConsent(value) {
    try {
      window.localStorage.setItem(CONSENT_KEY, JSON.stringify({
        version: CONSENT_VERSION,
        value: value
      }));
      return true;
    } catch (_) {
      return false;
    }
  }

  function styles() {
    var style = window.document.createElement('style');
    style.textContent =
      '.analytics-consent{position:fixed;z-index:10000;left:16px;right:16px;bottom:16px;max-width:720px;margin:auto;padding:20px;border:1px solid #d8dee8;border-radius:16px;background:#fff;color:#172033;box-shadow:0 16px 40px rgba(15,23,42,.2);font:16px/1.5 Lato,Arial,sans-serif}' +
      '.analytics-consent[hidden]{display:none}.analytics-consent__title{margin:0 0 6px;font:600 20px/1.3 "Space Grotesk",Arial,sans-serif}.analytics-consent__text{margin:0 0 16px}.analytics-consent__actions{display:flex;gap:10px;flex-wrap:wrap}.analytics-consent button{min-height:44px;padding:9px 16px;border:1px solid #1769aa;border-radius:8px;background:#fff;color:#1769aa;font:600 15px/1.2 Lato,Arial,sans-serif;cursor:pointer}.analytics-consent button[data-consent="accept"]{background:#1769aa;color:#fff}.analytics-settings{position:fixed;z-index:9999;right:12px;bottom:12px;padding:7px 10px;border:1px solid #d8dee8;border-radius:999px;background:#fff;color:#465269;font:600 12px/1.2 Lato,Arial,sans-serif;box-shadow:0 4px 16px rgba(15,23,42,.14);cursor:pointer}@media(max-width:520px){.analytics-consent{left:8px;right:8px;bottom:8px;padding:16px}.analytics-consent__actions button{flex:1}}';
    window.document.head.appendChild(style);
  }

  function consentUi() {
    var panel = window.document.createElement('section');
    panel.id = 'analytics-consent-panel';
    panel.className = 'analytics-consent';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-modal', 'true');
    panel.setAttribute('aria-labelledby', 'analytics-consent-title');
    panel.innerHTML =
      '<h2 class="analytics-consent__title" id="analytics-consent-title">Your privacy choices</h2>' +
      '<p class="analytics-consent__text">With your permission, we use Google Analytics to understand visits and referrals to TallyDue. Rejecting analytics does not affect the site.</p>' +
      '<div class="analytics-consent__actions"><button type="button" data-consent="reject">Reject analytics</button><button type="button" data-consent="accept">Accept analytics</button></div>';
    window.document.body.appendChild(panel);

    var settings = window.document.createElement('button');
    settings.type = 'button';
    settings.className = 'analytics-settings';
    settings.textContent = 'Privacy choices';
    settings.setAttribute('aria-controls', 'analytics-consent-panel');
    window.document.body.appendChild(settings);

    function choose(value) {
      storeConsent(value);
      panel.hidden = true;
      if (value === 'accepted') {
        loadGa4();
        decorateTallyDueLinks();
      } else {
        clearGaCookies();
        window.location.reload();
      }
    }

    panel.querySelector('[data-consent="accept"]').addEventListener('click', function () {
      choose('accepted');
    });
    panel.querySelector('[data-consent="reject"]').addEventListener('click', function () {
      choose('rejected');
    });
    settings.addEventListener('click', function () {
      panel.hidden = false;
      panel.querySelector('[data-consent="reject"]').focus();
    });
    return panel;
  }

  function init() {
    function start() {
      styles();
      var panel = consentUi();
      var consent = storedConsent();
      if (consent === 'accepted') {
        panel.hidden = true;
        loadGa4();
        decorateTallyDueLinks();
      } else if (consent === 'rejected') {
        panel.hidden = true;
      }
    }
    if (window.document.readyState === 'loading') {
      window.document.addEventListener('DOMContentLoaded', start, { once: true });
    } else {
      start();
    }
  }

  return { init: init, referralUrl: referralUrl };
});
