'use strict';

var Element = function(element){
    if (document) {
        if (typeof element === "string"){
            return document.createElement(element);
        } else  {
            return element;
        }
    }

    var ElementStub = require('./stub');
    return new ElementStub(element);
}

module.exports = Element;
