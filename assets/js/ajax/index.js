'use strict';

/*eslint no-undef: 0 */
/*eslint no-unused-vars: 0 */
/*eslint func-names: 0 */

var Ajax = function Ajax(options) {
  options = options || {};
  options.responseType = options.responseType || 'json';

  /*eslint no-undef: 0*/
  var xhr = new XMLHttpRequest();
  xhr.onload = function onload() {
    options.complete(xhr);
  };

  try {
    xhr.open(options.method, options.uri, true);

    if (options.method === 'POST') {
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      xhr.setRequestHeader('X-Requested-By', 'blha');
    }

    xhr.responseType = options.responseType;

    switch (xhr.responseType) {
      case 'json':
        xhr.setRequestHeader('Accept', 'application/json');
        break;
      default:
        break;
    }

    xhr.send(options.params);
  } catch (err) {
    // Probably IE's security settings (e.g. calling https from http page)
    throw new Error('Not supported');
  }
};

module.exports = Ajax;
