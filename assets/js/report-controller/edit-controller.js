'use strict';

var InlineEditor = require('../inline-editor');

var EditView = function(ele, controller){
  InlineEditor.View.apply(this, arguments);
  this.Init(ele, controller);
}
EditView.prototype = new InlineEditor.View();

var EditModel = function(ele, controller){
  InlineEditor.Model.apply(this, arguments);
  this.Init(ele);
}
EditModel.prototype = new InlineEditor.Model();

var EditController = function(ele, controller){
  InlineEditor.Controller.apply(this, arguments);

  this.view  = new EditView(ele, this);
  this.view.SetupFormField();

  var data = this.view.Properties();
  if (data){
    this.model = new EditModel(data);
    this.model.SetValue(this.view.GetValue());
  }
};
EditController.prototype = new InlineEditor.Controller();

EditController.prototype.CancelEdit = function(){
  this.view.CancelEdit();
};

module.exports = EditController;
