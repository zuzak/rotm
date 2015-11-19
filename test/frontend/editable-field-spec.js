'use strict';

/*eslint no-undef: 0 */
/*eslint no-unused-vars: 0 */
/*eslint func-names: 0 */
var proxyquire = require('proxyquire');

describe('assets/js/editable-field', function () {

  describe('instantiation', function () {

    /* EditableField dependencies */
    var eventFactory = sinon.stub().returns({
      'foo': 'bar'
    });

    var FieldModel = sinon.stub().returns({
      SetValue: function(){},
      handleSubmit: function(){}
    });
    
    var Element = require('./mocks/element');
    var el = new Element();

    /* isolated EditableField  */
    var EditableField;
    
    before(function () {
      EditableField = proxyquire('../../assets/js/field-editor/editable-field', {
        './event-factory': eventFactory,
        './field-model': FieldModel,
        './element': Element 
      });
    });

    it('instantiates', function () {
      var editableField = new EditableField(el);
      should.equal(typeof editableField, 'object');
    });

    it('should not initiate event listeners when x-csrf-token is missing', function () {
      var el = new Element();
      var editableField = new EditableField(el);
      editableField.Init();
      el.addEventListener.should.not.have.been.called;
    });

    it('should initialise when x-csrf-token is present', function () {
      var el = new Element();
      var editableField = new EditableField(el);
      editableField.Init('a-csrf-token');
      el.addEventListener.should.have.been.called;
    });

    it('should toggle the mode between edit and view', function () {
      var el = new Element();
      var editableField = new EditableField(el);
      editableField.Init('a-csrf-token');
      el.dispatchEvent.should.have.been.called;
    });

  });

});
