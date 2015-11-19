'use strict';

/*eslint no-undef: 0 */
/*eslint no-unused-vars: 0 */
/*eslint func-names: 0 */

var elements = {};

var el = {
    addEventListener: sinon.stub().returns(function(evnt, handler){
        sinon.spy.apply(this, arguments);
        console.log(e, h);
    }),
    dataset: {},
    appendChild: function() {},
    removeChild: function() {},
    dispatchEvent: sinon.spy()
}

var Element = function(dataset){
    if (dataset){
        this.dataset = dataset;
    }
};

Element.prototype = el;

Element.prototype.querySelector = function(selector){
    var el = new Element();
    elements[selector] = el;
    return el;
};

Element.prototype.createElement = function(){
    return new Element();
};
    
module.exports = Element;
