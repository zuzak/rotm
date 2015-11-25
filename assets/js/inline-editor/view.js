'use strict';

var EventEmitter = require('events').EventEmitter;
var Element = require('../element');

var View = function(){
  EventEmitter.apply(this);
}
View.prototype  = new EventEmitter();

View.prototype.Init = function(el, controller){
  this.controller = controller;
  this.mode = "view";
  this.el = new Element(el);
  this.events = [
    {evt: 'click', slr: '.trigger', fun: this.Trigger.bind(this)},
    {evt: 'click', slr: '.cancel', fun: this.Cancel.bind(this)},
    {evt: 'click', slr: '.confirm', fun: this.Confirm.bind(this)}
  ];
  this.SetupEvents();
};

View.prototype.GetValue = function(){
  if (this.formElement){
    return this.formElement.value || null; 
  }
};

View.prototype.SetValue = function(value){
  if (this.formElement){
    this.formElement.value = value;
  }
};

View.prototype.SetupFormField = function(){
  var props = this.Properties();
  this.formElement = this.el.querySelector('*[name="'+props.name+'"]');
  this.formElement.value = props.value;
};

View.prototype.Properties = function(){
  return this.el.dataset;
};

View.prototype.SetupEvents = function() {

  this.events.forEach(function(e){
    this.bindEvents(e.evt, e.slr, e.fun);
  }, this);
  
};

View.prototype.RemoveEvents = function() {

  this.events.forEach(function(e){
    this.unbindEvents(e.evt, e.slr, e.fun);
  }, this);

};

View.prototype.ToggleMode = function(){
  var mode = (this.mode === "view") ? "control" : "view";
  this.controller.ToggleMode(mode);
  this.setMode(mode);
};

View.prototype.Trigger = function(e){
  this.genericEventHandler(e);
  this.ToggleMode();
};

View.prototype.Cancel = function(e){
  this.genericEventHandler(e);
  this.ToggleMode();
};

View.prototype.Confirm = function(e){
  this.genericEventHandler(e);
};

View.prototype.bindEvents = function(eventName, selector, method){
  var el = this.el.querySelector(selector);
  if (el) {
    el.addEventListener(eventName, method);
  }
  return el; 
};

View.prototype.unbindEvents = function(eventName, selector, method){
  var el = this.el.querySelector(selector);
  if (el) {
    el.removeEventListener(eventName, method);
  }
  return el; 
};

View.prototype.preventDefault = function(e){
  if (e && e.preventDefault()){
    e.preventDefault();
  }
};

View.prototype.resetEvents = function(){
  this.RemoveEvents();
  this.SetupEvents();
};

View.prototype.genericEventHandler = function(e){
  this.preventDefault(e);
  this.resetEvents();
};

View.prototype.setMode = function(mode){
  this.el.setAttribute('class', this.el.getAttribute('class').replace(/\sview|\scontrol/g, '') + ' ' + mode);
  this.mode = mode;
};

View.prototype.emit = function(){
  EventEmitter.prototype.emit.apply(this, arguments);
};

View.prototype.CancelEdit = function(){
  this.setMode('view');
};

module.exports = View;
