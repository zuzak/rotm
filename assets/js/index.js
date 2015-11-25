'use strict';

var toolkit = require('hof').toolkit;
var helpers = toolkit.helpers;
var progressiveReveal = toolkit.progressiveReveal;
var formFocus = toolkit.formFocus;

var ReportController = require('./report-controller');

helpers.documentReady(progressiveReveal);
helpers.documentReady(formFocus);


/*eslint no-undef: 0*/
/*eslint no-unused-vars: 0*/
var reportEls = document.getElementsByClassName('data-report');
var csrfToken = document.querySelector('input[name="x-csrf-token"]').value;
if (reportEls.length) {
  var reportControllers = [].map.call(reportEls, function(reportEl){
    var reportController = new ReportController(csrfToken);
    reportController.Init(reportEl);
    return reportController;
  });
}
