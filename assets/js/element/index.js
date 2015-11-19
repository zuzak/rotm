'use strict';
/*eslint no-undef: 0 */
/*eslint no-unused-vars: 0 */
/*eslint func-names: 0 */
/*eslint no-else-return: 0 */
var Element = function(element) {
  if (typeof element === 'object') {
    return element;
  } else {
    return document.createElement(element);
  }
};

module.exports = Element;
