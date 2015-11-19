'use strict';
/*eslint no-undef: 0 */
/*eslint no-unused-vars: 0 */
/*eslint func-names: 0 */
/*eslint no-else-return: 0 */
var EventEmitter = require('events').EventEmitter;

var Element = function(element) {
  EventEmitter.apply(this, arguments);

  if (typeof element === 'object') {
    this.element = element;
  } else {
    this.element = document.createElement(element);
  }
  
  this.QuerySelector = this.element.querySelector;
  this.AddEventListener = this.element.addEventListener;
  this.AppendChild = this.element.appendChild;
  this.RemoveChild = this.element.removeChild;
  this.Dataset = this.element.dataset;
};
Element.prototype = EventEmitter;

module.exports = Element;
