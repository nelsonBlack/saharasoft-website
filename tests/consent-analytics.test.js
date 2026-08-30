'use strict';

var assert = require('node:assert/strict');
var fs = require('node:fs');
var path = require('node:path');
var analytics = require('../js/consent-analytics.js');

var decorated = new URL(analytics.referralUrl(
  'https://tallydue.com/pricing?existing=yes',
  '?utm_source=campaign-source&utm_term=water',
  'products-card'
));
assert.equal(decorated.searchParams.get('existing'), 'yes');
assert.equal(decorated.searchParams.get('utm_source'), 'campaign-source');
assert.equal(decorated.searchParams.get('utm_medium'), 'referral');
assert.equal(decorated.searchParams.get('utm_campaign'), 'tallydue_referral');
assert.equal(decorated.searchParams.get('utm_content'), 'products-card');
assert.equal(decorated.searchParams.get('utm_term'), 'water');

var root = path.resolve(__dirname, '..');
var trackedPages = [
  '404.html', 'about.html', 'contact.html', 'index.html', 'pricing.html',
  'software-development-services.html', 'products/index.html',
  'case-studies/arbec-conference-platform.html',
  'case-studies/baylink-logistics-platform.html',
  'case-studies/inbuildr-construction-operations.html',
  'case-studies/index.html', 'case-studies/tallydue-water-utility.html',
  'blog/choosing-software-development-partner-africa.html',
  'blog/construction-project-management-software.html',
  'blog/custom-software-cost-kenya.html', 'blog/index.html',
  'blog/mobile-money-integration.html',
  'blog/water-utility-billing-software.html',
  'blog/why-invest-custom-software.html',
  'webdeveloper/terms_privacy_miradiapp.html',
  'webdeveloper/terms_privacy_watermeter.html'
];
trackedPages.forEach(function (file) {
  var html = fs.readFileSync(path.join(root, file), 'utf8');
  assert.doesNotMatch(html, /googletagmanager|gtag\s*\(/, file + ' eagerly loads GA4');
  assert.match(html, /consent-analytics\.js/, file + ' lacks shared consent module');
});

console.log('Consent analytics checks passed for ' + trackedPages.length + ' pages.');
