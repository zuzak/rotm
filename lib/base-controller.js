'use strict';

var Controller = require('hmpo-form-wizard').Controller;
var util = require('util');
var _ = require('underscore');

var BaseController = function BaseController() {
  Controller.apply(this, arguments);
};

util.inherits(BaseController, Controller);

function getErrorLength() {
  var errors = this.getErrors.apply(this, arguments);
  var errorLength = Object.keys(errors).length;

  if (errorLength === 1) {
    return {
      single: true
    };
  }
  if (errorLength > 1) {
    return {
      multiple: true
    };
  }
}

BaseController.prototype.locals = function controllerLocals(req, res) {
  return {
    baseUrl: req.baseUrl,
    nextPage: this.getNextStep(req, res),
    errorLength: getErrorLength.apply(this, arguments)
  };
};

BaseController.prototype.getValues = function getValues(req, res, callback) {
  // clear the session if there's no next step or we request to clear the session
  if (this.options.clearSession === true || _.isUndefined(this.options.next)) {
    req.sessionModel.reset();
  }
  Controller.prototype.getValues.call(this, req, res, callback);
};

module.exports = BaseController;