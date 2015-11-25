'use strict';

var EventEmitter = require('events').EventEmitter;

var Controller = function(el, controller){
  this.el = el;
  this.controller = controller;
  
  EventEmitter.call(this);
};
Controller.prototype  = new EventEmitter();

Controller.prototype.ToggleMode = function(e){
  if (this.controller && this.controller.ToggleMode){
    this.controller.ToggleMode(e);
  }
};

module.exports = Controller;
