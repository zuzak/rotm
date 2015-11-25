'use strict';

var EventEmitter = require('events').EventEmitter;
var _ = require('underscore');

var Model = function(){
  EventEmitter.apply(this);
}
Model.prototype  = new EventEmitter();

Model.prototype.Init = function(data) {
  this.data = data;
  this.value = '';
  this.parameters = {};
};

Model.prototype.SetValue = function(value){
  this.value = value;
};

Model.prototype.GetValue = function(){
  return this.value;
};

Model.prototype.CallApi = function(){
  var options = JSON.parse(this.data.options);
  console.log('going to hit ' + options.uri);
};

Model.prototype.SetParameters = function(parameters){
  this.parameters = _.extend(this.parameters, parameters);
};

Model.prototype.GetParameters = function(){
  return this.parameters;
};

module.exports = Model;
