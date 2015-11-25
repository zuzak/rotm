'use strict';

var Element = require('../element');
var InlineEditor = require('../inline-editor');
var DeleteController = require('./delete-controller');
var EditController = require('./edit-controller');

var ReportController = function(token){

  InlineEditor.Controller.apply(this, arguments);
  var csrfToken = token;
  
  this.GetCSRFToken = function() {
    return csrfToken;
  };
  
}
ReportController.prototype = new InlineEditor.Controller();

ReportController.prototype.Init = function(ele){

    this.el  = new Element(ele);

    var deleteControlEls = this.el.getElementsByClassName('deleteable-field');
    if (deleteControlEls.length === 1){
        var deleteController = new DeleteController(deleteControlEls[0]);
    }
    
    var editControlEls = this.el.getElementsByClassName('editable-field');
    if (editControlEls.length){
        this.editControllers = [].map.call(editControlEls, function(editControlEl){
          return new EditController(editControlEl, this);
        }, this);
    }
    
};

ReportController.prototype.ToggleMode = function(e){
  if (this.editControllers.length) {
    this.editControllers.forEach(function(c){
      c.CancelEdit();
    });
  }
};

module.exports = ReportController;
