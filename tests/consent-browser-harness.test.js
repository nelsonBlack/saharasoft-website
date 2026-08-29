'use strict';

var assert = require('node:assert/strict');
var fs = require('node:fs');
var path = require('node:path');
var vm = require('node:vm');

var source = fs.readFileSync(
  path.resolve(__dirname, '../js/consent-analytics.js'),
  'utf8'
);

function Element(tagName) {
  this.tagName = tagName.toUpperCase();
  this.attributes = {};
  this.children = [];
  this.listeners = {};
  this.hidden = false;
  this.href = '';
}
Element.prototype.setAttribute = function (name, value) {
  this.attributes[name] = String(value);
};
Element.prototype.getAttribute = function (name) {
  return this.attributes[name] || null;
};
Element.prototype.appendChild = function (child) {
  this.children.push(child);
  return child;
};
Element.prototype.addEventListener = function (name, listener) {
  this.listeners[name] = listener;
};
Element.prototype.click = function () {
  if (this.listeners.click) this.listeners.click({ currentTarget: this });
};
Element.prototype.focus = function () {};
Element.prototype.querySelector = function (selector) {
  if (selector === '[data-consent="accept"]') return this.acceptButton;
  if (selector === '[data-consent="reject"]') return this.rejectButton;
  return null;
};
Object.defineProperty(Element.prototype, 'innerHTML', {
  set: function () {
    this.acceptButton = new Element('button');
    this.acceptButton.setAttribute('data-consent', 'accept');
    this.rejectButton = new Element('button');
    this.rejectButton.setAttribute('data-consent', 'reject');
  }
});

function browserHarness(initialConsent) {
  var storage = {};
  if (initialConsent) storage['saharasoft.analytics_consent'] = initialConsent;
  var storageWrites = [];
  var cookieWrites = [];
  var link = new Element('a');
  link.href = 'https://tallydue.com/pricing?existing=yes';
  var body = new Element('body');
  var head = new Element('head');
  var document = {
    readyState: 'complete',
    body: body,
    head: head,
    createElement: function (tag) { return new Element(tag); },
    querySelector: function (selector) {
      if (selector !== 'script[data-saharasoft-ga4]') return null;
      return head.children.find(function (child) {
        return child.getAttribute('data-saharasoft-ga4') === 'true';
      }) || null;
    },
    querySelectorAll: function (selector) {
      return selector === 'a[href]' ? [link] : [];
    },
    addEventListener: function () {}
  };
  Object.defineProperty(document, 'cookie', {
    get: function () { return '_ga=abc; _ga_TEST=def; necessary=yes'; },
    set: function (value) { cookieWrites.push(value); }
  });
  var window = {
    document: document,
    location: {
      href: 'https://saharasoft.org/products/?utm_source=campaign',
      pathname: '/products/index.html',
      search: '?utm_source=campaign',
      reloads: 0,
      reload: function () { this.reloads += 1; }
    },
    localStorage: {
      getItem: function (key) { return storage[key] || null; },
      setItem: function (key, value) {
        storage[key] = value;
        storageWrites.push([key, value]);
      }
    }
  };
  vm.runInNewContext(source, {
    window: window,
    URL: URL,
    URLSearchParams: URLSearchParams,
    Date: Date,
    JSON: JSON,
    encodeURIComponent: encodeURIComponent
  });
  return {
    window: window,
    head: head,
    body: body,
    link: link,
    storage: storage,
    storageWrites: storageWrites,
    cookieWrites: cookieWrites,
    panel: body.children[0],
    settings: body.children[1]
  };
}

function gaScripts(harness) {
  return harness.head.children.filter(function (child) {
    return child.getAttribute('data-saharasoft-ga4') === 'true';
  });
}

var undecided = browserHarness();
assert.equal(gaScripts(undecided).length, 0, 'GA must not load before consent');
assert.equal(undecided.storageWrites.length, 0, 'analytics must not write storage before consent');
assert.equal(undecided.link.href, 'https://tallydue.com/pricing?existing=yes');
assert.equal(undecided.panel.hidden, false);
assert.equal(undecided.panel.id, 'analytics-consent-panel');
assert.equal(undecided.settings.getAttribute('aria-controls'), 'analytics-consent-panel');

undecided.panel.acceptButton.click();
assert.equal(gaScripts(undecided).length, 1, 'accepting must load GA');
assert.equal(undecided.storageWrites.length, 1, 'accepting must store one decision');
assert.deepEqual(JSON.parse(undecided.storageWrites[0][1]), {
  version: 1,
  value: 'accepted'
});
assert.match(undecided.link.href, /utm_source=campaign/);
assert.match(undecided.link.href, /utm_medium=referral/);
assert.match(undecided.link.href, /utm_content=products-index-link-1/);

undecided.settings.click();
undecided.panel.rejectButton.click();
assert.deepEqual(JSON.parse(undecided.storageWrites.at(-1)[1]), {
  version: 1,
  value: 'rejected'
});
assert.equal(undecided.window.location.reloads, 1, 'withdrawal must reload into a tracking-free page');
assert.ok(undecided.cookieWrites.some(function (value) { return value.startsWith('_ga=;'); }));

var afterWithdrawal = browserHarness(undecided.storage['saharasoft.analytics_consent']);
assert.equal(gaScripts(afterWithdrawal).length, 0, 'withdrawal must keep GA unloaded after reload');
assert.equal(afterWithdrawal.panel.hidden, true);

var rejected = browserHarness();
rejected.panel.rejectButton.click();
assert.equal(gaScripts(rejected).length, 0, 'rejecting must keep GA unloaded');
assert.deepEqual(JSON.parse(rejected.storageWrites[0][1]), {
  version: 1,
  value: 'rejected'
});
assert.equal(rejected.link.href, 'https://tallydue.com/pricing?existing=yes');
assert.ok(rejected.cookieWrites.some(function (value) { return value.startsWith('_ga=;'); }));
assert.ok(rejected.cookieWrites.some(function (value) { return value.startsWith('_ga_TEST=;'); }));

var legacy = browserHarness('accepted');
assert.equal(gaScripts(legacy).length, 0, 'unversioned consent must be re-requested');
assert.equal(legacy.panel.hidden, false);

console.log('Consent browser harness checks passed.');
