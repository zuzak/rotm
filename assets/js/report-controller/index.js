'use strict';
/*eslint no-undef: 0 */
/*eslint no-unused-vars: 0 */
/*eslint func-names: 0 */

var Element = require('./element');
var DeleteControl = require('./delete-control');

var ReportController = function(token) {
  this.csrfToken = token;
};

ReportController.prototype.Init = function(element) {

  if (this.csrfToken) {
    
    var el = new Element(element);
    var options = el.Dataset.options;
    
    if (typeof options === "undefined") {
      throw new Error('Report API options are missing');
    }
    
    var deleteCtl = el.QuerySelector('.remove-url-anchor a');
    var deleteControl;
    if (deleteCtl) {
      deleteControl = new DeleteControl(deleteCtl);
    }
    return;
    
  }
  
  throw new Error('The CSRF token is missing');
  
};

module.exports = ReportController;
