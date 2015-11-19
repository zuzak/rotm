'use strict';

/*eslint func-names: 0 */
var toolkit = require('hof').toolkit;
var helpers = toolkit.helpers;
var progressiveReveal = toolkit.progressiveReveal;
var formFocus = toolkit.formFocus;

var ReportController = require('./report-controller');

helpers.documentReady(progressiveReveal);
helpers.documentReady(formFocus);

var $ = require('jquery');
var typeahead = require('typeahead.js-browserify');
var Bloodhound = require('typeahead.js-browserify').Bloodhound;

typeahead.loadjQueryPlugin();

var nonEuCountries = new Bloodhound({
  datumTokenizer: Bloodhound.tokenizers.whitespace,
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  local: require('./countries').nonEuCountries
});

var allCountries = new Bloodhound({
  datumTokenizer: Bloodhound.tokenizers.whitespace,
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  local: require('./countries').allCountries
});


$('#nationality, #nationality-error, #nominated-nationality')
.typeahead({
  minLength: 1,
  hint: false,
  limit: 5
}, {
  name: 'nonEuCountries',
  source: nonEuCountries
});

$('#country, #someone-else-nationality, #change-person-nationality').typeahead({
  minLength: 1,
  hint: false,
  limit: 5
}, {
  name: 'allCountries',
  source: allCountries
});

/*eslint no-undef: 0*/
/*eslint no-unused-vars: 0*/
var csrfToken = document.querySelector('input[name="x-csrf-token"]').value;
var reportEls = document.getElementsByClassName('report-data');
var reports = [];
if (reportEls.length) {
  reports = [].forEach.call(reportEls, function(reportEl) {
    var reportController = new ReportController(csrfToken);
    reportController.Init(reportEl);
    return reportController;
  });
}
