'use strict';

/*eslint no-undef: 0 */
/*eslint no-unused-vars: 0 */
/*eslint func-names: 0 */
var eventFactory = require('../event-factory');
var FieldModel = require('./field-model');
var Element = require('../element');

var EditableField = function(ele) {
  /* view */

  var csrfToken;
  var fieldEl;
  var fieldType;
  var formField;

  var mode = 'view';

  var el = new Element(ele);
  var fieldWrapper = el.querySelector('.data-wrap');
  var fieldPara = el.querySelector('.data-wrap p');
  var editBtn = el.querySelector('.edit-btn');
  var cancelBtn = el.querySelector('.cancel-btn');
  var submitBtn = el.querySelector('input.button');

  var fieldProperties = fieldPara.dataset;
  
  if (fieldProperties.element) {
    // valid data properties on the element, so proceed
    fieldEl = fieldProperties.element.split(':')[0];
    fieldType = fieldProperties.element.split(':')[1] || null;

    var formModel = new FieldModel(fieldProperties);
    formField = new Element(fieldEl);
    formModel.SetValue(fieldPara.textContent);
  }

  var setMode = function(newmode) {
    el.className = el.className.replace(/\sedit|\sview/g, '') + ' ' + newmode;
    if (newmode === 'edit') {
      fieldWrapper.removeChild(fieldPara);
      fieldWrapper.appendChild(formField);
      formField.value = formModel.GetValue();
    } else if (mode === 'edit') {
      fieldWrapper.removeChild(formField);
      fieldWrapper.appendChild(fieldPara);
    } else {
      // 'view' === newmode === mode
    }
    mode = newmode;
  };

  var toggleMode = function(e) {
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    var toggledMode = (mode === 'view') ? 'edit' : 'view';
    setMode(toggledMode);

    el.dispatchEvent(eventFactory('toggled', {'mode': mode}));
  };

  var submit = function(e) {
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    el.dispatchEvent(eventFactory('submit', {'field': formField}));
  };

  var success = function(e) {
    fieldPara.textContent = formModel.GetValue();
    setMode('view');
  };

  var failure = function(e) {
    setMode('view');
  };

  this.Init = function(token){
    csrfToken = token;
    if (!csrfToken) {
      return;
    }
    if (formField){
      this.InitListeners();
    }
  };
  
  this.InitListeners = function() {
    try {
      editBtn.addEventListener('click', toggleMode.bind(this));
      cancelBtn.addEventListener('click', toggleMode.bind(this));
      submitBtn.addEventListener('click', submit.bind(this));

      el.addEventListener('submit', formModel.handleSubmit.bind(formModel, csrfToken));
      formField.addEventListener('success', success.bind(this));
      formField.addEventListener('failure', failure.bind(this));
    } catch (e) {
      throw new Error("Unexpected template");
    }
  };

  this.Element = function() {
    return el;
  };

  this.CancelEdit = function() {
    setMode('view');
  };

};

module.exports = EditableField;
