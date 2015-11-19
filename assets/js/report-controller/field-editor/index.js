'use strict';

var eventFactory = require('../event-factory');
var EditableField = require('./editable-field');

/*eslint no-undef: 0 */
/*eslint no-unused-vars: 0 */
/*eslint func-names: 0 */
var csrfToken = '';

var FieldEditor = function(token) {
  /* controller */

  csrfToken = token;
  var editableField = null;

  this.Init = function(el) {

    if (csrfToken && el) {
      editableField = new EditableField(el);
      editableField.Init(csrfToken);
    }

    return editableField;
  };

};

module.exports = FieldEditor;
