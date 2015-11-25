'use strict';

var InlineEditor = require('../inline-editor');

var DeleteView = function(ele, controller){
  InlineEditor.View.apply(this, arguments);
  this.Init(ele, controller);
}
DeleteView.prototype = new InlineEditor.View();

var DeleteModel = function(options){
  InlineEditor.Model.apply(this, arguments);
  this.Init(options);
}
DeleteModel.prototype = new InlineEditor.Model();

var DeleteController = function(ele){
  InlineEditor.Controller.apply(this, arguments);
  
  this.view  = new DeleteView(ele, this);
  var data = this.view.Properties();
  if (data){
    this.model = new DeleteModel(data);
  }
};
DeleteController.prototype = new InlineEditor.Controller();

module.exports = DeleteController;
