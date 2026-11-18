/* Saharasoft site behaviour: mobile menu, sector tabs, workflow demo. No dependencies. */
(function () {
  'use strict';
  var root = document.documentElement;
  root.classList.remove('no-js');
  root.classList.add('js');

  // ── Mobile menu ──
  var toggle = document.querySelector('.mobile-menu-toggle');
  var nav = document.getElementById('main-nav');
  if (toggle && nav) {
    var setOpen = function (open) {
      nav.classList.toggle('is-open', open);
      document.body.classList.toggle('menu-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    };
    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
        toggle.focus();
      }
    });
    window.matchMedia('(min-width: 901px)').addEventListener('change', function (mq) {
      if (mq.matches) setOpen(false);
    });
  }

  // ── Tabs (WAI-ARIA tabs pattern, manual activation by click, arrows move + select) ──
  document.querySelectorAll('[data-tabs]').forEach(function (group) {
    var tabs = Array.prototype.slice.call(group.querySelectorAll('[role="tab"]'));
    var select = function (tab, focus) {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute('aria-selected', String(on));
        t.tabIndex = on ? 0 : -1;
        var panel = document.getElementById(t.getAttribute('aria-controls'));
        if (panel) panel.hidden = !on;
      });
      if (focus) tab.focus();
    };
    tabs.forEach(function (tab, i) {
      tab.addEventListener('click', function () { select(tab, false); });
      tab.addEventListener('keydown', function (e) {
        var next = null;
        if (e.key === 'ArrowRight') next = tabs[(i + 1) % tabs.length];
        else if (e.key === 'ArrowLeft') next = tabs[(i - 1 + tabs.length) % tabs.length];
        else if (e.key === 'Home') next = tabs[0];
        else if (e.key === 'End') next = tabs[tabs.length - 1];
        if (next) { e.preventDefault(); select(next, true); }
      });
    });
    var current = tabs.filter(function (t) { return t.getAttribute('aria-selected') === 'true'; })[0] || tabs[0];
    if (current) select(current, false);
  });

  // ── Workflow demo: pick a workflow, show the matching products (scripted, no backend) ──
  var demo = document.querySelector('[data-demo]');
  if (demo) {
    var picker = demo.querySelector('select');
    var status = demo.querySelector('.demo-status');
    var items = Array.prototype.slice.call(demo.querySelectorAll('.demo-results li'));
    var update = function () {
      var key = picker.value;
      var shown = 0;
      items.forEach(function (li) {
        var match = (' ' + li.getAttribute('data-for') + ' ').indexOf(' ' + key + ' ') > -1;
        li.hidden = !match;
        if (match) shown += 1;
      });
      status.textContent = 'Found ' + shown + (shown === 1 ? ' match' : ' matches') + ' from work we have shipped';
    };
    picker.addEventListener('change', update);
    update();
  }
})();
