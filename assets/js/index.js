'use strict';

/*eslint func-names: 0 */
var toolkit = require('hof').toolkit;
var helpers = toolkit.helpers;
var progressiveReveal = toolkit.progressiveReveal;
var formFocus = toolkit.formFocus;

var ReportController = require('./report-controller');

helpers.documentReady(progressiveReveal);
helpers.documentReady(formFocus);


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
