'use strict';
/*eslint no-undef: 0 */
/*eslint no-unused-vars: 0 */
/*eslint func-names: 0 */

var Element = require('../element');
var eventFactory = require('../event-factory');
var FieldEditor = require('../field-editor');

var csrfToken;

var ReportController = function(token) {
  csrfToken = token;
};

ReportController.prototype.Init = function(el) {
  this.el = new Element(el);
  var fields = this.el.querySelectorAll('.editable-field');
  var fieldEditors;

  if (fields.length) {
    fieldEditors = [].map.call(fields, function(field) {
      var fieldEditor = new FieldEditor(csrfToken);
      fieldEditor.Init(field);
      return fieldEditor;
    });
  }

};

module.exports = ReportController;
