'use strict';

var Element = require('../element');

var DeleteController = function(element) {
    this.el = new Element(element);
    this.defaults = this.el.Dataset.defaults;

    this.el.on('click', this.handleClick.bind(this));
}

DeleteController.prototype.handleClick = function(e,d){
};

module.exports = DeleteController;
