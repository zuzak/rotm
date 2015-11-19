'use strict';

/*eslint no-undef: 0 */
/*eslint no-unused-vars: 0 */
/*eslint func-names: 0 */
var proxyquire = require('proxyquire');

describe('assets/js/field-editor', function () {

  var el;
  var initEditableField;
  var editableField;
  var toggleCounter;
  var FieldEditor;
  var fieldsInstantiated = [];
  
  before(function () {

    /*eslint no-unused-vars: 0*/
    el = {
      addEventListener: function() {},
      querySelector: function() {}
    }

    initEditableField = {Init: sinon.stub()};
    editableField = function() {
      fieldsInstantiated.push(this);
      return initEditableField;
    };
    
    FieldEditor = proxyquire('../../assets/js/field-editor', {
      './editable-field': editableField
    });

  });

  describe('Instantiation', function() {

    it('should instantiate without error', function() {
      var fe = new FieldEditor();
      should.equal(typeof fe, "object");
    });
    
    it('should not instantiate editable fields when x-csrf-token is missing', function () {
      var fieldEditor = new FieldEditor();
      var dummyEl = el;
      var fields = fieldEditor.Init([el]);
      should.equal(fields.length, 0);
      should.equal(fieldsInstantiated.length, 0);
    });
    
  });

  describe('form sanity detection', function () {

    it('recognises a valid instantiation request by capturing the x-csrf-token', function () {
      fieldsInstantiated = [];
      var fieldEditor = new FieldEditor('a-csrf-token');
      var dummyEl = el;
      var fields = fieldEditor.Init([el]);
      should.equal(fields.length, 1);
      initEditableField.Init.should.have.been.calledWith('a-csrf-token');
      should.equal(fieldsInstantiated.length, 1);
    });

  });

  describe('view / edit toggle detection', function () {
    
    it('should handle toggle events on elements', function () {
      fieldsInstantiated = [];
      var fieldEditor = new FieldEditor('a-csrf-token');
      var dummyEls = [el,el,el];
      var fields = fieldEditor.Init(dummyEls);
      should.equal(fieldsInstantiated.length, 3);
    });
    
  });

});
