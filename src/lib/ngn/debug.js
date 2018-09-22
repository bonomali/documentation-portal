/**
  * v1.3.15 generated on: Thu Jun 22 2017 02:53:09 GMT+0000 (UTC)
  * Copyright (c) 2014-2017, Ecor Ventures LLC. All Rights Reserved.
  * See LICENSE (BSD-3-Clause) at 
  * https://github.com/ngnjs/chassis-lib/blob/master/LICENSE.
  */
'use strict';

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

window.NGN = {};

'use strict';

/**
 * @class NGN
 * @singleton
 */
/**
  * @method define
  * Create an object definition for a property.
  * For example:
  *
  * ```
  * Object.defineProperty('attr', NGN.define(true, false, true, 'value'))
  *
  * // The snippet above is the same as:
  * Object.defineProperty(this, 'attr', {
  *  enumberable: true,
  *  writable: false,
  *  configurable: true,
  *  value: 'value'
  * })
  * ```
  * @param  {boolean} enumerable
  * Determines if the attribute is considered an accessible part of the object.
  * Making an attribute enumerable will make it show up as a key in an object,
  * which can be iterated over (ex: `Object.keys()`). A non-enumerable asset is
  * treated as a private attribute.
  * @param  {boolean} writable
  * Determines whether the value can be changed.
  * @param  {boolean} configurable
  * Determines whether the attribute can be removed from the object.
  * @param  {any} value
  * The actual value of the attribute.
  * @private
  */
Object.defineProperty(NGN, 'define', {
  enumerable: false,
  writable: false,
  configurable: false,
  value: function value(e, w, c, v) {
    return {
      enumerable: e,
      writable: w,
      configurable: c,
      value: v
    };
  }
});

Object.defineProperties(NGN, {
  /**
   * @method public
   * Create a `public` property definition for an object.
   * Example:
   *
   * ```
   * Object.defineProperty(this, 'attr', NGN.public('somevalue'))
   *
   * // Longhand equivalent
   * Object.defineProperty(this, 'attr', {
   *  enumerable: true,
   *  writable: true,
   *  configurable: false,
   *  value: 'somevalue'
   * })
   * ```
   * @param  {any} value
   * Any valid JavaScript value (function, boolean, number, string, etc)
   * used as the value for the object attribute.
   * @private
   */
  public: NGN.define(false, false, false, function (value) {
    return NGN.define(true, typeof value !== 'function', false, value);
  }),

  /**
   * @method private
   * Create a `private` property definition for an object.
   * Example:
   *
   * ```
   * Object.defineProperty(this, 'attr', NGN.private('somevalue'))
   *
   * // Longhand equivalent
   * Object.defineProperty(this, 'attr', {
   *  enumerable: false,
   *  writable: true,
   *  configurable: false,
   *  value: 'somevalue'
   * })
   * ```
   * @param  {any} value
   * Any valid JavaScript value (function, boolean, number, string, etc)
   * used as the value for the object attribute.
   * @private
   */
  private: NGN.define(false, false, false, function (value) {
    return NGN.define(false, typeof value !== 'function', false, value);
  }),

  /**
   * @method const
   * Create a `public` constant property definition for an object.
   * Example:
   *
   * ```
   * Object.defineProperty(this, 'attr', NGN.const('somevalue'))
   *
   * // Longhand equivalent
   * Object.defineProperty(this, 'attr', {
   *  enumerable: true,
   *  writable: false,
   *  configurable: false,
   *  value: 'somevalue'
   * })
   * ```
   * @param  {any} value
   * Any valid JavaScript value (function, boolean, number, string, etc)
   * used as the value for the object attribute.
   * @private
   */
  const: NGN.define(false, false, false, function (value) {
    return NGN.define(true, false, false, value);
  }),

  /**
   * @method privateconst
   * Create a `private` constant property definition for an object.
   * Example:
   *
   * ```
   * Object.defineProperty(this, 'attr', NGN.privateconst('somevalue'))
   *
   * // Longhand equivalent
   * Object.defineProperty(this, 'attr', {
   *  enumerable: false,
   *  writable: false,
   *  configurable: false,
   *  value: 'somevalue'
   * })
   * ```
   * @param  {any} value
   * Any valid JavaScript value (function, boolean, number, string, etc)
   * used as the value for the object attribute.
   * @private
   */
  privateconst: NGN.define(false, false, false, function (value) {
    return NGN.define(false, false, false, value);
  }),

  /**
   * @method get
   * Create a private `getter` property definition for an object.
   * Public getters are part of the ES2015 class spec.
   *
   * Example:
   *
   * ```
   * let myFunction = function () {
   *  return 'somevalue'
   * }
   *
   * // Longhand equivalent
   * Object.defineProperty(this, 'attr', {
   *  enumerable: false,
   *  get: function () {
   *    return 'somevalue'
   *  }
   * })
   * ```
   * @param  {function} fn
   * Any valid async JavaScript function with a `return` value.
   * @private
   */
  get: NGN.define(false, false, false, function (fn) {
    return {
      enumerable: false,
      get: fn
    };
  }),

  /**
   * @method set
   * Create a private `setter` property definition for an object.
   * Public setters are part of the ES2015 class spec.
   *
   * Example:
   *
   * ```
   * let myFunction = function () {
   *  return 'somevalue'
   * }
   *
   * // Longhand equivalent
   * Object.defineProperty(this, 'attr', {
   *  enumerable: false,
   *  set: function (value) {
   *    somethingElse = value
   *  }
   * })
   * ```
   * @param  {function} fn
   * Any valid JavaScript function that accepts a single argument (value).
   * @private
   */
  set: NGN.define(false, false, false, function (fn) {
    return {
      enumerable: false,
      set: fn
    };
  }),

  /**
   * @method getset
   * Create a private property defintion containing both a `getter` and `setter`
   * for the specified attribute.
   * @param  {function} getFn
   * Any valid async JavaScript function with a `return` value.
   * @param  {function} setFn
   * Any valid JavaScript function that accepts a single argument (value).
   * @private
   */
  getset: NGN.define(false, false, false, function (getter, setter) {
    return {
      enumerable: false,
      get: getter,
      set: setter
    };
  })
});

Object.defineProperties(NGN, {
  /**
   * @method extend
   * Extend the NGN core object. Extending NGN is the equivalent of:
   *
   * Example:
   * ```
   * NGN.extend('greet', NGN.public(function (recipient) {
   *  return 'Hello, ' + recipient + '!'
   * }))
   *
   * // Equivalent of:
   *
   * Object.defineProperty(NGN, 'greet', {
   *  enumerable: true,
   *  writable: false,
   *  configurable: false,
   *  value: function (recipient) {
   *    return 'Hello, ' + recipient + '!'
   *  }
   * })
   * ```
   * The example above produces a public function available from NGN:
   *
   * ```
   * console.log(NGN.greet('world')) // outputs Hello, world!
   * @param  {string} attribute
   * Name of the attribute to add to the object.
   * @param  {Object} descriptor
   * The object descriptor, i.e.
   * ```
   * {
   *  enumerable: true/false,
   *  writable: true/false,
   *  configurable: true/false,
   *  value: {any}
   * }
   *
   * // OR
   *
   * {
   *  enumerable: true/false,
   *  get: function () { return ... },
   *  set: function (value) { some = value ... }
   * }
   * ```
   * @private
   */
  extend: NGN.privateconst(function (attribute, descriptor) {
    Object.defineProperty(this, attribute, descriptor);
  }),

  /**
   * @method inherit
   * Inherit the properties of another object/class.
   * @param  {object|function} source
   * The source object (i.e. what gets copied)
   * @param  {object|function} destination
   * The object properties get copied to.
   */
  inherit: NGN.const(function (source, dest) {
    if (!source || !dest) {
      return;
    }

    source = typeof source === 'function' ? source.prototype : source;
    dest = typeof dest === 'function' ? dest.prototype : dest;

    Object.getOwnPropertyNames(source).forEach(function (attr) {
      var definition = Object.getOwnPropertyDescriptor(source, attr);
      Object.defineProperty(dest, attr, definition);
    });

    var prototype = Object.getOwnPropertyNames(Object.getPrototypeOf(source)).filter(function (attr) {
      return attr.trim().toLowerCase() !== 'constructor' && !dest.hasOwnProperty(attr);
    });

    prototype.forEach(function (attr) {
      var cfg = Object.getOwnPropertyDescriptor(source, attr);

      if (cfg === undefined && typeof source[attr] === 'function') {
        Object.defineProperty(dest, attr, NGN.const(function () {
          return source[attr].apply(this, arguments);
        }));
      }
    });
  }),

  /**
   * @method slice
   * Converts an array-like object to an array.
   *
   * Example:
   * ```
   * function () {
   *  return NGN.slice(arguments)
   * }
   * @param  {Object} obj
   * The object to slice into an array.
   * @return {array}
   * @private
   */
  slice: NGN.private(function (obj) {
    return Array.prototype.slice.call(obj);
  }),

  /**
   * @method splice
   * Converts an array-like object to a spliced array.
   *
   * Example:
   * ```
   * function () {
   *  return NGN.splice(arguments)
   * }
   * @param  {Object} obj
   * The object to splice into an array.
   * @return {array}
   * @private
   */
  splice: NGN.private(function (obj) {
    return Array.prototype.splice.call(obj);
  }),

  /**
   * @method coalesce
   * Finds the first non-null/defined value in a list of arguments.
   * This can be used with {@link Boolean Boolean} values, since `true`/`false` is a
   * non-null/defined value.
   * @param {Mixed} args
   * Any number of arguments can be passed to this method.
   */
  coalesce: NGN.public(function () {
    for (var arg = 0; arg < arguments.length; arg++) {
      try {
        if (arguments[arg] !== undefined && arguments[arg] !== null) {
          return arguments[arg];
        }
      } catch (e) {}
    }

    return null;
  }),

  /**
   * @property {boolean} nodelike
   * Indicates NGN is running in a node-like environment supporting
   * the `require` statement. This will detect node, io.js, Electron,
   * NW.js, and other environments presumably supporting Node.js.
   * @private
   */
  nodelike: NGN.get(function () {
    try {
      return process !== undefined;
    } catch (e) {
      return false;
    }
  }),

  /**
   * @method dedupe
   * Deduplicate a simple array.
   * @param {array} array
   * The array to deduplicate.
   * @return {array}
   * The array with unique records.
   * @private
   */
  dedupe: NGN.private(function (array) {
    return array.filter(function (element, index) {
      return array.indexOf(element) === index;
    });
  }),

  /**
   * @method typeof
   * A more specific typeof method.
   * @param  {any} element
   * The element to determine the type of.
   * @return {string}
   * Returns the type (all lower case).
   */
  typeof: NGN.privateconst(function (el) {
    var value = Object.prototype.toString.call(el).split(' ')[1].replace(/\]|\[/gi, '').toLowerCase();

    if (value === 'function') {
      if (!el.name) {
        return el.toString().replace(/\n/gi, '').replace(/^function\s|\(.*$/mgi, '').toLowerCase();
      } else {
        value = el.name || 'function';
      }
    }

    return value.toLowerCase();
  }),

  /**
   * @method stack
   * Retrieve the stack trace from a specific code location without throwing
   * an exception. Files are always listed from the root. This is the default
   * order in browsers, but the reverse of the normal stack order in node-like
   * environments.
   *
   * For example, the following stack on node shows `_test.js` as the last item
   * in the array. In node-like environments, the `_test.js` would normally be
   * the first item in the stacktrace.
   *
   * ```js
   * [
   *   { path: 'node.js:348:7', file: 'node.js', line: 348, column: 7 },
   *   { path: 'module.js:575:10',
   *     file: 'module.js',
   *     line: 575,
   *     column: 10 },
   *   { path: 'module.js:550:10',
   *     file: 'module.js',
   *     line: 550,
   *     column: 10 },
   *   { path: 'module.js:541:32',
   *     file: 'module.js',
   *     line: 541,
   *     column: 32 },
   *   { path: '/_test.js:8:14', file: '/_test.js', line: 8, column: 14 }
   * ]
   * ```
   *
   * By standardizing the order of the stack trace, it is easier to programmatically
   * identify sources of problems. This method does not prevent developers from
   * accessing a normal stacktrace.
   * @private
   * @returns {array}
   * Returns an array of objects. Each object contains the file, line, column,
   * and path within the stack. For example:
   *
   * ```
   * {
   * 	 path: 'path/to/file.js:127:14'
   *   file: 'path/to/file.js',
   *   line: 127,
   *   column: 14
   * }
   * ```
   *
   * If a stacktrace is unavailable for any reason, the array will contain a
   * single element like:
   *
   * ```js
   * {
   *   path: 'unknown',
   *   file: 'unknown',
   *   line: 0,
   *   column: 0
   * }
   * ```
   */
  processStackItem: NGN.privateconst(function (item, uri) {
    return item.replace(/at.*\(|\)/gi, '').replace(uri, './').replace(/\/{2,100}/gi, '/').trim().split(':');
  }),

  stack: NGN.get(function () {
    var _this = this;

    // const originalStack = (new Error).stack.split('\n')
    var stack = new Error().stack.split('\n') || [];
    var fnRegex = /at.*\(/gi;

    stack = stack.filter(function (item) {
      return item.split(':').length > 1;
    }).map(function (item) {
      var operation = fnRegex.exec(item);

      if (operation) {
        operation = operation[0].replace(/^at\s{1,100}|\s{1,100}\($/gi, '').replace('<anonymous>', 'console');
      }

      if (_this.nodelike) {
        item = _this.processStackItem(item.toString(), process.cwd());

        return {
          path: item.join(':').replace('./', process.cwd() + '/'),
          // path: item[0].substr(0, item[0].length) + ':' + item[1] + ':' + item[2],
          file: item[0].substr(0, item[0].length),
          line: parseInt(item[1], 10),
          column: parseInt(item[2], 10),
          operation: operation
        };
      } else {
        item = _this.processStackItem(item.toString(), window.location.origin);

        return {
          path: item[0].substr(1, item[0].length - 1) + ':' + item[1] + ':' + item[2],
          file: item[0].substr(1, item[0].length - 1),
          line: parseInt(item[1], 10),
          column: parseInt(item[2], 10),
          operation: operation
        };
      }
    });

    if (stack.length === 0) {
      return [{
        path: 'unknown',
        file: 'unknown',
        line: 0,
        column: 0
      }];
    } else if (this.nodelike) {
      stack.reverse();
    }

    return stack;
  }),

  /**
   * @property css
   * A CSS string used for highlighting console output in Chrome and Firefox.
   *
   * **Example:**
   *
   * ```js
   * console.log('%cHighlight %c some text and leave the rest normal.', NGN.css, '')
   * ```
   * @private
   */
  css: NGN.get(function () {
    return NGN.nodelike ? '' : 'font-weight: bold;';
  }),

  /**
   * @method isFn
   * A shortcut method for determining if a variable is a function.
   * This is useful for identifying the existance of callback methods.
   * @param {any} variable
   * The variable to identify as a function.
   * @returns {boolean}
   * @private
   */
  isFn: NGN.privateconst(function (v) {
    return typeof v === 'function';
  }),

  /**
   * @method wrap
   * Executes a **synchronous** method before invoking a standard function.
   * This is primarily designed for displaying warnings, but can also be
   * used for other operations like migration layers.
   * @param {function} preMethod
   * The **synchronous** function to invoke before the class is instantiated. This
   * method receives the same arguments passed to the class.
   * @param {function} method
   * The function to wrap.
   * @private
   */
  wrap: NGN.privateconst(function (preFn, fn) {
    return function () {
      preFn.apply(undefined, arguments);
      fn.apply(undefined, arguments);
    };
  }),

  /**
   * @method wrapClass
   * Executes a **synchronous** method before returning an instantiated class.
   * In other words, it runs a function first, then returns the equivalent of
   * `new MyClass(...)`. This is primarily designed for displaying warnings,
   * but can also be used for other operations like migration layers.
   * @param {function} preMethod
   * The **synchronous** method to invoke before the class is instantiated. This
   * method receives the same arguments passed to the class.
   * @param {function} class
   * The class to wrap.
   * @private
   */
  wrapClass: NGN.privateconst(function (preFn, classFn) {
    return function () {
      preFn.apply(undefined, arguments);
      return new (Function.prototype.bind.apply(classFn, [null].concat(Array.prototype.slice.call(arguments))))();
    };
  }),

  /**
   * @method deprecate
   * Logs a warning indicating the method is deprecated.
   * @param {function} method
   * The method to return/execute.
   * @param {string} [message='The method has been deprecated.']
   * The warning displayed to the user.
   */
  deprecate: NGN.privateconst(function (fn) {
    var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'The method has been deprecated.';

    return this.wrap(function () {
      if (NGN.nodelike) {
        console.warn('DEPRECATION NOTICE: ' + message);
      } else {
        console.warn('%cDEPRECATION NOTICE: %c' + message, NGN.css, 'font-weight: normal;');
      }
    }, fn);
  }),

  /**
   * @method deprecateClass
   * Logs a warning indicating the class is deprecated. This differs from
   * #deprecate by extending & preserving the original class (the resulting
   * class can be used with the `new` operator).
   * @param {function} class
   * The class to return/execute.
   * @param {string} [message='The class has been deprecated.']
   * The warning displayed to the user.
   */
  deprecateClass: NGN.privateconst(function (classFn) {
    var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'The class has been deprecated.';

    return this.wrapClass(function () {
      if (NGN.nodelike) {
        console.warn('DEPRECATION NOTICE: ' + message);
      } else {
        console.warn('%cDEPRECATION NOTICE: %c' + message, NGN.css, 'font-weight: normal;');
      }
    }, classFn);
  }),

  /**
   * @method needs
   * A method to check for the existance of required attributes in an object.
   * This is designed to check for namespace existance.
   *
   * ```js
   * NGN.uses(NGN, 'DOM','BUS', 'NET', 'JUNK') // Throws an error because "JUNK" doesn't exist.
   * ```
   * @param {Object} namespace
   * The object to check.
   * @param {String[]} attributes
   * A list of attributes to check for.
   * @private
   */
  needs: NGN.private(function (namespace) {
    if ((typeof namespace === 'undefined' ? 'undefined' : _typeof(namespace)) !== 'object') {
      throw new Error('NGN.uses() requires an object.');
    }

    var missing = [];

    for (var _len = arguments.length, attributes = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      attributes[_key - 1] = arguments[_key];
    }

    for (var value in attributes) {
      if (!namespace.hasOwnProperty(attributes[value])) {
        missing.push(attributes[value]);
      }
    }

    // Throw an error if there are any missing attributes.
    if (missing.length > 0) {
      throw new MissingDependencyError(('Missing ' + namespace.constructor.name + ' dependencies: ' + missing.join(', ')).replace(/\s{2,100}/gi, ' '));
    }
  }),

  /**
   * @method createAlias
   * A helper method to alias a value on an object. This is the equivalent of:
   * ```js
   * Object.defineProperty(namespace, name, NGN.get(() => {
   *   return value
   * }))
   * ```
   * @param  {Object} namespace
   * The object to apply the alias property to.
   * @param  {String} name
   * The alias name.
   * @param  {Any} value
   * The value to return.
   * @private
   */
  createAlias: NGN.private(function (namespace, name, value) {
    Object.defineProperty(namespace, name, NGN.get(function () {
      return value;
    }));
  })
});

'use strict';

Object.defineProperty(NGN, 'global', NGN.privateconst(NGN.nodelike ? global : window));

// Force scope
document.addEventListener('DOMContentLoaded', function () {
  document.body.classList.add('ngn');
});

'use strict';

if (!window.NGN) {
  throw new Error('The EventEmitter class is dependent on the presence of NGN.');
}

/**
 * @class EventEmitter
 * This is an extendable generic class used to apply event management
 * to non-DOM objects, such as data models, logging, and other common
 * elements of JavaScript programming.
 * @protected
 */

var EventEmitter = function () {
  /**
   * @constructor
   * ```
   * let EE = new EventEmitter()
   * ```
   * This is a protected class. It is most commonly instantiated through
   * the NGN namespace (i.e. `new NGN.EventEmitter()`). However; it is
   * designed for use within the NGN library, not directly as an event emitter.
   * Use with caution.
   */
  function EventEmitter(cfg) {
    _classCallCheck(this, EventEmitter);

    cfg = cfg || {};
    Object.defineProperties(this, {
      handlers: NGN.private({}),
      adhoc: NGN.private({}),
      maxlisteners: NGN.private(cfg.defaultMaxListeners || 25)
    });
  }

  /**
   * @property {object} subscribers
   * An array of all subscribers which currently have a registered event handler.
   * @warning This is a UI-only method.
   */


  _createClass(EventEmitter, [{
    key: 'listenerCount',


    /**
     * @method {number} listenerCount
     * The number of listeners for a specific event.
     * @param {string} eventName
     * The name of the event to count listeners for.
     */
    value: function listenerCount(eventName) {
      return (this.handlers[eventName] || []).length + (this.adhoc[eventName] || []).length;
    }

    /**
     * @method getMaxListeners
     * A node-like reference to the #defaultMaxListeners value.
     * @return {number}
     */

  }, {
    key: 'getMaxListeners',
    value: function getMaxListeners() {
      return this.defaultMaxListeners;
    }

    /**
     * @method setMaxListeners
     * A node-like reference to the #defaultMaxListeners value (setter).
     */

  }, {
    key: 'setMaxListeners',
    value: function setMaxListeners(value) {
      this.defaultMaxListeners = value;
    }

    /**
     * @method eventNames
     * A node-like reference providing an array of recognized event names.
     * @return {array}
     */

  }, {
    key: 'eventNames',
    value: function eventNames() {
      var handlers = Object.keys(this.handlers);
      var adhoc = Object.keys(this.adhoc);
      return NGN.dedupe(handlers.concat(adhoc));
    }

    /**
     * @method listeners
     * Returns the raw listener methods for the event.
     * @param {string} eventName
     * Name of the event to retrieve listeners for.
     * @return {array}
     */

  }, {
    key: 'listeners',
    value: function listeners(eventName) {
      var handlers = this.handlers[eventName] || [];
      var adhoc = this.adhoc[eventName] || [];
      return handlers.concat(adhoc);
    }

    /**
     * @method on
     * Create a new event handler for the specified event.
     * @param  {string|object} eventName
     * Name of the event to listen for.
     * If an object is passed, this method will automatically setup a #pool.
     * @param  {Function} handler
     * The method responsible for responding to the event.
     * This is ignored if eventName is an object.
     * @param {boolean} [prepend=false]
     * When set to `true`, the event is added to the beginning of
     * the processing list instead of the end.
     * This is ignored if eventName is an object.
     */

  }, {
    key: 'on',
    value: function on(eventName, callback, prepend) {
      if ((typeof eventName === 'undefined' ? 'undefined' : _typeof(eventName)) === 'object') {
        return this.pool(eventName);
      }

      this.handlers[eventName] = this.handlers[eventName] || [];
      this.handlers[eventName][NGN.coalesce(prepend, false) ? 'unshift' : 'push'](callback);
      this.emit('newListener', eventName, callback);

      if (this.listenerCount(eventName) > this.maxlisteners) {
        throw new Error('Maximum event listeners exceeded. Use setMaxListeners() to adjust the level.');
      }
    }

    /**
     * @method addListener
     * A node-like reference to the #on method.
     */

  }, {
    key: 'addListener',
    value: function addListener() {
      this.on.apply(this, arguments);
    }

    /**
     * @method prependListener
     * A node-like reference to the #on method, adding events to the
     * beginning of the event list (processed before others) instead of the end.
     * @param  {string} eventName
     * Name of the event to listen for.
     * @param  {Function} handler
     * The method responsible for responding to the event.
     */

  }, {
    key: 'prependListener',
    value: function prependListener() {
      var args = NGN.slice(arguments).push(true);
      this.on.apply(this, args);
    }

    /**
     * @method on
     * Create a new event handler for the specified event. The
     * handler will be removed immediately after it is executed. This
     * effectively listens for an event to happen once and only once
     * before the handler is destroyed.
     * @param  {string} eventName
     * Name of the event to listen for.
     * @param  {Function} handler
     * The method responsible for responding to the event.
     * @param {boolean} [prepend=false]
     * When set to `true`, the event is added to the beginning of
     * the processing list instead of the end.
     */

  }, {
    key: 'once',
    value: function once(eventName, callback, prepend) {
      this.adhoc[eventName] = this.adhoc[eventName] || [];
      this.adhoc[eventName][NGN.coalesce(prepend, false) ? 'unshift' : 'push'](callback);
      this.emit('newListener', eventName, callback);
      if (this.listenerCount(eventName) > this.maxlisteners) {
        throw new Error('Maximum event listeners exceeded. Use setMaxListeners() to adjust the level.');
      }
    }

    /**
     * @method prependOnceListener
     * A node-like reference to the #once method, adding events to the
     * beginning of the event list (processed before others) instead of the end.
     * @param  {string} eventName
     * Name of the event to listen for.
     * @param  {Function} handler
     * The method responsible for responding to the event.
     */

  }, {
    key: 'prependOnceListener',
    value: function prependOnceListener() {
      var args = NGN.slice(arguments).push(true);
      this.once.apply(this, args);
    }

    /**
     * @method off
     * Remove an event handler. If no handler is specified, all handlers for
     * the specified event will be removed.
     * @param {string} eventName
     * Name of the event to remove.
     * @param {function} [handlerFn]
     * The handler function to remove from the event handlers.
     */

  }, {
    key: 'off',
    value: function off(eventName, handlerFn) {
      this.deleteEventHandler('handlers', eventName, handlerFn);
    }

    /**
     * @method onceoff
     * Remove an event handler that was originally created using #once. If no
     * handler is specified, all handlers for the spcified event will be removed.
     * @param {string} eventName
     * Name of the event to remove.
     * @param {function} handlerFn
     * The handler function to remove from the event handlers.
     */

  }, {
    key: 'onceoff',
    value: function onceoff(eventName, handlerFn) {
      this.deleteEventHandler('adhoc', eventName, handlerFn);
    }

    /**
     * @method deleteEventHandler
     * Remove a specific event handler.
     * @param {string} type
     * Either `handler` (multi-use events) or `adhoc` (one-time events)
     * @param {string} eventName
     * Name of the event to remove.
     * @param {function} handlerFn
     * The handler function to remove from the event handlers.
     * @private
     */

  }, {
    key: 'deleteEventHandler',
    value: function deleteEventHandler(type, eventName, handlerFn) {
      var scope = this[type];

      if (scope[eventName]) {
        if (!handlerFn) {
          delete scope[eventName];
          return;
        }

        var result = [];
        scope[eventName].forEach(function (handler) {
          if (handler.toString() !== handlerFn.toString()) {
            result.push(handler);
          }
        });

        if (result.length === 0) {
          delete scope[eventName];
          return;
        }

        scope[eventName] = result;
      }
    }

    /**
     * @alias removeListener
     * A node-like alias of the #off and #onceoff method (combined).
     */

  }, {
    key: 'removeListener',
    value: function removeListener() {
      this.off.apply(this, arguments);
      this.onceoff.apply(this, arguments);
    }

    /**
     * @method clear
     * Remove all event handlers from the EventEmitter (both regular and adhoc).
     */

  }, {
    key: 'clear',
    value: function clear() {
      var _this2 = this;

      if (arguments.length > 0) {
        NGN.slice(arguments).forEach(function (eventName) {
          delete _this2.handlers[eventName];
          delete _this2.adhoc[eventName];
        });
      } else {
        this.handlers = {};
        this.adhoc = {};
      }
    }

    /**
     * @alias removeAllListeners
     * A node-like alias of the #clear method.
     */

  }, {
    key: 'removeAllListeners',
    value: function removeAllListeners() {
      this.clear.apply(this, arguments);
    }

    /**
     * @method emit
     * Fires an event. This method accepts one or more arguments. The
     * first argument is always the event name, followed by any number
     * of payload arguments.
     *
     * Example:
     * ```
     * const EE = new NGN.EventEmitter()
     *
     * EE.emit('someevent', {payload: 1}, {payload: 2})
     * ```
     * The example above triggers an event called `someevent` and applies
     * the remaining two arguments to any event handlers.
     * @param {string} eventName
     * The name of the event to trigger.
     */

  }, {
    key: 'emit',
    value: function emit() {
      var args = NGN.slice(arguments);
      var eventName = args.shift();
      var events = this.getAllEvents(eventName);

      var scope = {
        event: eventName
      };

      for (var name in events) {
        var adhocEvent = this.adhoc[events[name]];
        // Adhoc event handling
        if (adhocEvent) {
          delete this.adhoc[events[name]];

          while (adhocEvent.length > 0) {
            var fn = adhocEvent.pop();
            scope.handler = fn;
            fn.apply(scope, args);
          }
        }

        // Regular event handling
        var handler = this.handlers[events[name]];
        if (handler) {
          for (var _fn in handler) {
            scope.handler = handler[_fn];
            handler[_fn].apply(scope, args);
          }
        }
      }
    }

    /**
     * @method getAllEvents
     * Returns all of the events that match an event name. The event name
     * may contain wildcards (i.e. `*`) or it can be a regular expression.
     * @param  {string|regexp} eventName
     * A string or regular expression defining which event names to identify.
     * A string value containing an asterisk (*) will be converted to a regular
     * expression for simplistic wildcard event handling purposes.
     * @return {array}
     * An array of unique event names with handlers or adhoc handlers.
     * @private
     */

  }, {
    key: 'getAllEvents',
    value: function getAllEvents(eventName) {
      var regularEvents = Object.keys(this.handlers);
      var adhocEvents = Object.keys(this.adhoc);
      var allEvents = NGN.dedupe(regularEvents.concat(adhocEvents));

      allEvents = allEvents.filter(function (event) {
        // If the event is an exact match, don't filter it out.
        if (event === eventName) {
          return true;
        }

        // If the event is a regexp/wildcard, further processing is necessary.
        if (NGN.typeof(event) === 'regexp' || event.indexOf('*') >= 0) {
          // Convert wildcard events to a regular expression.
          if (NGN.typeof(event) !== 'regexp') {
            event = new RegExp(event.replace('*', '.*', 'gi'));
          }
          // If the event name matches the event, keep it.
          return event.test(eventName);
        }

        // None of the criteria were met. Ignore the event.
        return false;
      });

      return allEvents;
    }
  }, {
    key: 'subscribers',
    get: function get() {
      var subscriberList = {};

      for (var eventName in this.handlers) {
        subscriberList[eventName] = {
          handler: this.handlers[eventName].length,
          adhoc: 0
        };
      }

      for (var _eventName in this.adhoc) {
        subscriberList[_eventName] = subscriberList[_eventName] || {
          handler: 0
        };

        subscriberList[_eventName].adhoc = this.adhoc[_eventName].length;
      }

      return subscriberList;
    }

    /**
     * @property defaultMaxListeners
     * The maximum number of listeners for a single event.
     */

  }, {
    key: 'defaultMaxListeners',
    get: function get() {
      return this.maxlisteners;
    },
    set: function set(value) {
      this.maxlisteners = value;
    }
  }]);

  return EventEmitter;
}();

NGN.extend('EventEmitter', NGN.private(EventEmitter));

'use strict';

/**
 * @class NGN.EventEmitter
 * @inheritdoc
 */
NGN.inherit(Object.defineProperties({}, {
  queued: NGN.private({}),
  collectionQueue: NGN.private({}),
  thresholdQueue: NGN.private({}),

  /**
   * @method deprecate
   * Provides a deprecation notice for the specified event.
   * Automatically emits the appropriate "replacement" event
   * if a replacement event is configured. If no replacement
   * event is configured, the deprecation notice will be written
   * to the console but no replacement event will be triggered.
   * @param {string} deprecatedEventName
   * The name of the deprecated event.
   * @param {string} [replacementEventName]
   * The name of the new event.
   */
  deprecate: NGN.const(function (deprecatedEventName, replacementEventName) {
    var me = undefined;

    undefined.on(deprecatedEventName, function () {
      console.warn(deprecatedEventName + ' is deprecated.' + (!replacementEventName ? '' : 'Use ' + replacementEventName + ' instead.'));

      if (replacementEventName) {
        var args = NGN.slice(arguments);
        args.shift();
        args.unshift(replacementEventName);

        me.emit.apply(me, args);
      }
    });
  }),

  /**
   * @method pool
   * A helper command to create multiple related subscribers
   * all at once. This is a convenience function.
   * @property {string} [prefix]
   * Supply a prefix to be added to every event. For example,
   * `myScope.` would turn `someEvent` into `myScope.someEvent`.
   * @property {Object} subscriberObject
   * A key:value object where the key is the name of the
   * unprefixed event and the key is the handler function.
   * A value can be an object, allowing for nesting events. For example:
   *
   * ```js
   * NGN.BUS.on('prefix.', {
   *   deep: {
   *     nested: {
   *       eventName: function () {
   *         console.log('event triggered')
   *       }
   *     }
   *   }
   * })
   *
   * NGN.BUS.emit('prefix.deep.nested.eventName') // <-- Outputs "event triggered"
   * ```
   * @property {Function} [callback]
   * A callback to run after the entire pool is registered. Receives
   * a single {Object} argument containing all of the subscribers for
   * each event registered within the pool.
   */
  pool: NGN.const(function (prefix, group, callback) {
    if (typeof prefix !== 'string') {
      group = prefix;
      prefix = '';
    }

    var pool = {};

    for (var eventName in group) {
      var topic = (prefix.trim() || '') + eventName;

      if (typeof group[eventName] === 'function') {
        this.setMaxListeners(this.getMaxListeners() + 1);
        pool[eventName] = this.on(topic, group[eventName]);
      } else if (_typeof(group[eventName]) === 'object') {
        this.pool(topic + '.', group[eventName]);
      } else {
        console.warn('%c' + topic + '%c could not be pooled in the event emitter because it\'s value is not a function.', NGN.css, '');
      }
    }

    if (NGN.isFn(callback)) {
      callback(pool);
    }
  }),

  /**
   * @method attach
   * Attach a function to a topic. This can be used
   * to forward events in response to asynchronous functions.
   *
   * For example:
   *
   * ```js
   * myAsyncDataFetch(NGN.BUS.attach('topicName'))
   * ```
   *
   * This is the same as:
   *
   * ```js
   * myAsyncCall(function(data){
   *  NGN.BUS.emit('topicName', data)
   * })
   * ```
   * @param {string} eventName
   * The name of the event to attach a handler method to.
   * @param {boolean} [preventDefaultAction=false]
   * Setting this to `true` will execute a `event.preventDefault()` before
   * attaching the handler.
   * @returns {function}
   * Returns a function that will automatically be associated with an event.
   */
  attach: NGN.const(function (eventName, preventDefaultAction) {
    var _arguments = arguments,
        _this3 = this;

    preventDefaultAction = NGN.coalesce(preventDefaultAction, false);

    return function (e) {
      if (preventDefaultAction && typeof e.preventDefault === 'function') {
        e.preventDefault();
      }

      var args = NGN.slice(_arguments); //NGN.slice(arguments)
      args.unshift(eventName);

      _this3.emit.apply(_this3, args);
    };
  }),

  /**
   * @method forward
   * A special subscriber that fires one or more event in response to
   * to an event. This is used to bubble events up/down an event chain.
   *
   * For example:
   *
   * ```js
   * BUS.bind('sourceEvent', ['someEvent','anotherEvent'], {payload:true})
   * ```
   * When `sourceEvent` is published, the bind method triggers `someEvent` and
   * `anotherEvent`, passing the payload object to `someEvent` and
   * `anotherEvent` subscribers simultaneously.
   *
   * @param {String} sourceEvent
   * The event to subscribe to.
   * @param {String|Array} triggeredEvent
   * An event or array of events to fire in response to the sourceEvent.
   * @param {any} data
   * Optional data to pass to each bound event handler.
   * @returns {Object}
   * Returns an object with a single `remove()` method.
   */
  forward: NGN.const(function (eventName, triggers, payload) {
    var _this4 = this;

    triggers = typeof triggers === 'string' ? [triggers] : triggers;

    var me = this;
    var listener = function listener() {
      var args = NGN.slice(arguments);

      if (payload) {
        args.push(payload);
      }

      for (var trigger in triggers) {
        var argList = args.slice();
        argList.unshift(triggers[trigger]);
        me.emit.apply(me, argList);
      }
    };

    this.setMaxListeners(this.getMaxListeners() + 1);
    this.on(eventName, listener);

    // Provide handle back for removal of topic
    return {
      remove: function remove() {
        _this4.setMaxListeners(_this4.getMaxListeners() - 1);
        _this4.off(eventName, listener);
      }
    };
  }),

  /**
   * @method bind
   * Replaced by #forward.
   * @deprecated
   */
  bind: NGN.privateconst(function () {
    return NGN.deprecate(this.forward, 'NGN.BUS.bind is now NGN.BUS.forward').apply(undefined, arguments);
  }),

  /**
   * @method delayEmit
   * This method waits for the specified duration, then publishes an
   * event once. This will publish the event only once at the end of the
   * wait period, even if the event is triggered multiple times. This can
   * be useful when working with many events triggered in rapid succession.
   *
   * For example, an NGN.DATA.Model representing a person may be used to
   * track a user profile. The NGN.DATA.Model fires an event called `field.update`
   * every time a data field is modified. In many cases, a user may update
   * multiple fields of their profile using a form with a "Save" button.
   * Instead of generating a new "save" (to disk, to memory, to an API, etc)
   * operation for each field, the publishOnce event can wait until all
   * changes are made before running the save operation.
   *
   * ```js
   * // Create a data model representing a person.
   * var Person = new NGN.DATA.Model({....})
   *
   * // Create a new person record for a user.
   * var user = new Person()
   *
   * // When the user is modified, save the data.
   * user.on('field.update', function () {
   * 	 // Wait 300 milliseconds to trigger the save event
   *   NGN.BUS.delayEmit('user.save', 300)
   * })
   *
   * // Save the user using an API
   * NGN.BUS.on('user.save', function () {
   * 	 NGN.NET.put({
   * 	   url: 'https://my.api.com/user',
   * 	   json: user.data
   * 	 })
   * })
   *
   * // Modify the record attributes (which are blank by default)
   * user.firstname = 'John'
   * user.lastname = 'Doe'
   * user.age = 42
   *
   * // Make another update 1 second later
   * setTimeout(function () {
   *   user.age = 32
   * }, 1000)
   * ```
   *
   * The code above sets up a model and record. Then it listens to the record
   * for field updates. Each time it recognizes an update, it queues the "save"
   * event. When the queue matures, it fires the `user.save` event.
   *
   * The first `field.update` is triggered when `user.firstname = 'John'` runs.
   * This initiates a queue for `user.save`, set to mature in 300 millisenconds.
   * Next, a `field.update` is triggered when `user.lastname = 'Doe'` runs.
   * This time, since the queue for `user.save` is already initiated, notthing
   * new happens. Finally, a `field.update` is triggered when `user.age = 42`
   * runs. Just like the last one, nothing happens since the `user.save` queue
   * is already active.
   *
   * The `user.save` queue "matures" after 300 milliseconds. This means after
   * 300 milliseconds have elapsed, the `user.save` event is triggered. In this
   * example, it means the `NGN.NET.put()` code will be executed. As a result,
   * all 3 change (firstname, lastname, and age) will be complete before the
   * API request is executed. The queue is cleared immediately.
   *
   * The final update occurs 1 second later (700 milliseconds after the queue
   * matures). This triggers a `field.update`, but since the queue is no
   * longer active, it is re-initiated. 300 milliseconds later, the `user.save`
   * event is fired again, thus executing the API request again (1.3 seconds
   * in total).
   * @param {string} eventName
   * The event/topic to publish/emit.
   * @param {Number} [delay=300]
   * The number of milliseconds to wait before firing the event.
   * @param {Any} [payload]
   * An optional payload, such as data to be passed to an event handler.
   */
  delayEmit: NGN.const(function (eventName, delay) {
    var _this5 = this;

    if (!this.queued.hasOwnProperty(eventName)) {
      var args = NGN.slice(arguments);
      args.splice(1, 1);

      this.queued[eventName] = setTimeout(function () {
        delete _this5.queued[eventName];
        _this5.emit.apply(_this5, args);
      }, delay);
    }
  }),

  /**
   * @method queue
   * Replaced by #delayEmit.
   * @deprecated
   */
  queue: NGN.privateconst(function () {
    return NGN.deprecate(this.delayEmit, 'NGN.BUS.queue is now NGN.BUS.delayEmit').apply(undefined, arguments);
  }),

  /**
   * @method funnel
   * Emit an event after a collection of unique events have all fired.
   * This can be useful in situations where multiple asynchronous actions
   * must complete before another begins. For example, blending 3
   * remote data sources from different API's into a single resultset
   * can be achieved with this.
   *
   * **Example**
   * ```js
   * let collection = NGN.BUS.funnel(['download1done', 'download2done', 'download3done'], 'make.results')
   *
   * let allData = []
   *
   * // When all of the downloads are done, log them.
   * NGN.BUS.on('make.results', () => {
   *   console.log(allData)
   * })
   *
   * // Download the first set of data asynchronously
   * NGN.NET.json('http:/download1.com/data.json', (data) => {
   *   allData.push(data)
   *   NGN.BUS.emit('download1done')
   * })
   *
   * // Download the second set of data asynchronously
   * NGN.NET.json('http:/download2.com/data.json', (data) => {
   *   allData.push(data)
   *   NGN.BUS.emit('download2done')
   * })
   *
   * // Download the third set of data asynchronously
   * NGN.NET.json('http:/download3.com/data.json', (data) => {
   *   allData.push(data)
   *   NGN.BUS.emit('download3done')
   * })
   *
   * // The handler can be removed with the special method
   * // returned by the emitAfter method:
   * collection.remove()
   * ```
   * @param {array} eventCollection
   * An array of events. Once _all_ of these events have fired,
   * the triggerEventName will be fired.
   * @param {string|function} triggerEventName
   * The name of the event triggered after the collection has completed.
   * This can also be a callback function. If a callback function is provided,
   * it will receive the payload as the only argument when it is triggered.
   * @param {any} [payload]
   * An optional payload delivered to the #triggerEventName.
   * @returns {object} collection
   * Provides the key/value configuration of the collection.
   * ```js
   * {
   *   masterqueue: ['event1', 'event2', 'etc'], // The original event array (non-editable)
   *   remainingqueue: [...], // The events the BUS is still waiting for before firing the trigger event.
   *   eventName: 'triggeredEventName', // Name of the event triggered after the remaining elements are flushed.
   *   payload: 'anything', // OPTIONAL
   *   remove: [Function]
   * }
   * ```
   */
  funnel: NGN.const(function (eventCollection, triggerEventName) {
    var _this6 = this;

    var payload = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    if (!Array.isArray(eventCollection)) {
      throw new Error('NGN.BUS.bindEvents expected an array of events, but received a(n) ' + (typeof eventCollection === 'undefined' ? 'undefined' : _typeof(eventCollection)));
    }

    eventCollection = NGN.dedupe(eventCollection);

    var me = this;
    var key = this.getInternalCollectionId(this.collectionQueue);

    this.collectionQueue[key] = {};

    Object.defineProperties(this.collectionQueue[key], {
      masterqueue: NGN.const(eventCollection),
      remainingqueue: NGN.private(eventCollection),
      eventName: NGN.const(triggerEventName),
      remove: NGN.const(function () {
        var evts = me.collectionQueue[key].masterqueue.slice();

        delete me.collectionQueue[key];

        evts.forEach(function (evtName) {
          me.setMaxListeners(me.getMaxListeners() - 1);
          me.off(evtName, me.handleCollectionTrigger(evtName, key));
        });
      }),
      payload: NGN.const(payload)
    });

    eventCollection.forEach(function (evt) {
      me.setMaxListeners(me.getMaxListeners() + 1);
      _this6.on(evt, _this6.handleCollectionTrigger(evt, key));
    });

    return this.collectionQueue[key];
  }),

  /**
   * @method getInternalCollectionId
   * Returns a unique ID for special collections.
   * @param {object} collection
   * The collection to generate an ID for.
   * @private
   */
  getInternalCollectionId: NGN.privateconst(function (collection) {
    var time = new Date().getTime().toString();
    var rand = Math.random().toString();
    var key = Object.keys(collection).length + 1;

    while (collection.hasOwnProperty(key.toString() + time + rand)) {
      key++;
    }

    return key.toString() + time + rand;
  }),

  /**
   * @method handleCollectionTrigger
   * A method to manage #chain event handlers.
   * @private
   */
  handleCollectionTrigger: NGN.privateconst(function (eventName, key) {
    var me = this;
    return function () {
      // Use setTimeout to simulate nextTick
      setTimeout(function () {
        if (me.collectionQueue.hasOwnProperty(key)) {
          if (me.collectionQueue[key].remainingqueue.indexOf(eventName) >= 0) {
            me.collectionQueue[key].remainingqueue = me.collectionQueue[key].remainingqueue.filter(function (remainingEventName) {
              return remainingEventName !== eventName;
            });
          }

          if (me.collectionQueue[key].remainingqueue.length === 0) {
            me.collectionQueue[key].remainingqueue = me.collectionQueue[key].masterqueue;

            if (NGN.isFn(me.collectionQueue[key].eventName)) {
              me.collectionQueue[key].eventName(me.collectionQueue[key].payload);
            } else {
              me.emit(me.collectionQueue[key].eventName, me.collectionQueue[key].payload);
            }
          }
        }
      }, 0);
    };
  }),

  /**
   * @method funnelOnce
   * This provides the same functionality as #funnel, but
   * removes the listener after the resultant event has fired.
   * See #funnel for detailed usage.
   * @param {array} eventCollection
   * An array of events. Once _all_ of these events have fired,
   * the triggerEventName will be fired.
   * @param {string} triggerEventName
   * The name of the event triggered after the collection has completed.
   * @param {any} [payload]
   * An optional payload delivered to the #triggerEventName.
   * @returns {object} collection
   * Provides the key/value configuration of the collection.
   */
  funnelOnce: NGN.const(function (eventCollection, triggerEventName) {
    var payload = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    var collection = this.funnel(eventCollection, triggerEventName, payload);

    this.setMaxListeners(this.getMaxListeners() + 1);
    this.once(triggerEventName, function () {
      collection.remove();
      collection = null;
    });
  }),

  /**
   * @method threshold
   * After an event is fired a predetermined number of times (the threshold),
   * trigger another event or function.
   *
   * For example:
   *
   * ```js
   * NGN.BUS.threshold('push.my.button', 3, 'annoyed')
   *
   * NGN.BUS.on('annoyed', function () {
   *   console.log('We apologize for the slow response, but excessive clicking will not speed up the process.')
   * })
   *
   * document.getElementById('#myButton').addEventListener('click', NGN.BUS.attach('push.my.button'))
   * ```
   *
   * Once the threshold is exceeded, the final event will be triggered and
   * the threshold will be reset. Using the example above, this means
   * clicking 3 times on `#myButton` would trigger the `annoyed` event ONCE,
   * 6 times triggers `annoyed` TWICE, 9 times triggers `annoyed` THREE times, etc.
   * @param {string} thresholdEventName
   * The name of the event to count.
   * @param {number} limit
   * The number of occurrances allowed until the final event is triggered.
   * The event will be triggered at the threshold. For example, if the limit
   * is `3`, the finalEvent will be triggered the 3rd time thresholdEventName is
   * fired.
   * @param {string|function} finalEventName
   * This can be an event or callback function triggered when the threshold is crossed.
   * If a callback function is specified, the payload is passed as the only argument.
   * @param {any} [payload]
   * An optional payload to send to the finalEvent handler(s).
   * @returns {object}
   * Returns an object that can be used to remove the threshold.
   *
   */
  threshold: NGN.const(function (thresholdEventName, limit, finalEventName) {
    var payload = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

    if (typeof thresholdEventName !== 'string') {
      throw new Error('The threshold event name must be a string (received ' + (typeof thresholdEventName === 'undefined' ? 'undefined' : _typeof(thresholdEventName)) + ')');
    }

    var me = this;
    var key = this.getInternalCollectionId(this.thresholdQueue) + limit.toString();

    this.thresholdQueue[key] = {};

    Object.defineProperties(this.thresholdQueue[key], {
      key: NGN.const(key),
      eventName: NGN.const(thresholdEventName),
      limit: NGN.const(limit),
      count: NGN.private(0),
      finalEventName: NGN.const(finalEventName),
      remove: NGN.const(function () {
        var evt = me.thresholdQueue[key].eventName;

        delete me.thresholdQueue[key];

        me.setMaxListeners(me.getMaxListeners() - 1);
        me.off(evt, me.handleThresholdTrigger(key));
      }),
      payload: NGN.const(payload)
    });

    this.setMaxListeners(this.getMaxListeners() + 1);
    this.on(thresholdEventName, this.handleThresholdTrigger(key));

    return this.thresholdQueue[key];
  }),

  thresholdOnce: NGN.const(function (thresholdEventName, limit, finalEventName) {
    var payload = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

    var threshold = this.threshold(thresholdEventName, limit, finalEventName, payload);

    this.once(finalEventName, function () {
      threshold.remove();
      threshold = null;
    });
  }),

  /**
   * @method handleThresholdTrigger
   * A method to manage #threshold event handlers.
   * @private
   */
  handleThresholdTrigger: NGN.const(function (key) {
    var me = this;
    return function () {
      // Use setTimeout to simulate nextTick
      setTimeout(function () {
        if (me.thresholdQueue.hasOwnProperty(key)) {
          me.thresholdQueue[key].count++;
          if (me.thresholdQueue[key].count === me.thresholdQueue[key].limit) {
            if (NGN.isFn(me.thresholdQueue[key].finalEventName)) {
              me.thresholdQueue[key].finalEventName(me.thresholdQueue[key].payload);
            } else {
              me.emit(me.thresholdQueue[key].finalEventName, me.thresholdQueue[key].payload);
            }

            // This if statement is required in case the event is removed
            // during the reset process.
            if (me.thresholdQueue.hasOwnProperty(key)) {
              me.thresholdQueue[key].count = 0;
            }
          }
        }
      }, 0);
    };
  })
}), NGN.EventEmitter);

'use strict';

var CustomException = function (_Error) {
  _inherits(CustomException, _Error);

  // eslint-disable-line
  function CustomException(config) {
    _classCallCheck(this, CustomException);

    var _this7 = _possibleConstructorReturn(this, (CustomException.__proto__ || Object.getPrototypeOf(CustomException)).call(this));

    config = config || {};
    config = typeof config === 'string' ? { message: config } : config;
    config.custom = config.custom || {};

    var me = _this7;

    _this7.name = config.name || 'NgnError';
    _this7.type = config.type || 'TypeError';
    _this7.severity = config.severity || 'minor';
    _this7.message = config.message || 'Unknown Error';
    _this7.category = config.category || 'operational'; // Alternative is "programmer"

    // Cleanup name
    _this7.name = _this7.name.replace(/[^a-zA-Z0-9_]/gi, '');

    // Add any custom properties
    for (var attr in config.custom) {
      if (config.custom.hasOwnProperty(attr)) {
        _this7[attr] = config.custom[attr];
      }
    }
    _this7.hasOwnProperty('custom') && delete _this7.custom;

    if (NGN.nodelike || Error.prepareStackTrace) {
      // Capture the stack trace on a new error so the detail can be saved as a structured trace.
      Error.prepareStackTrace = function (_, stack) {
        return stack;
      };

      var _err = new Error();
      Error.captureStackTrace(_err, _this7);

      _this7.rawstack = _err.stack;

      Error.prepareStackTrace = function (err, stack) {
        // eslint-disable-line handle-callback-err
        me.cause && console.warn(me.cause);
        me.help && console.info(me.help);

        return me.name + ': ' + me.message + '\n' + stack.filter(function (frame) {
          return frame.getFileName() !== __filename && frame.getFileName();
        }).map(function (el) {
          return '    at ' + el;
        }).join('\n');
      };

      // Enable stack trace
      Error.captureStackTrace(_this7);
    }
    return _this7;
  }

  /*
   * @property {Array} trace
   * The structured data of the stacktrace. Each array element is a JSON object corresponding to
   * the full stack trace:
   *
   * ```js
   * {
   *   filename: String,
   *   line: Number,
   *   column: Number,
   *   functionname: String,
   *   native: Boolean,
   *   eval: Boolean,
   *   type: String
   * }
   * ```
   * @readonly
   */


  _createClass(CustomException, [{
    key: 'trace',
    get: function get() {
      return this.rawstack.filter(function (frame) {
        return frame.getFileName() !== __filename && frame.getFileName();
      }).map(function (frame) {
        return {
          filename: frame.getFileName(),
          line: frame.getLineNumber(),
          column: frame.getColumnNumber(),
          functionname: frame.getFunctionName(),
          native: frame.isNative(),
          eval: frame.isEval(),
          type: frame.getTypeName()
        };
      });
    }
  }]);

  return CustomException;
}(Error);

if (NGN.nodelike) {
  module.exports = CustomException;
}

'use strict';

/**
 * @class NGN
 * @inheritdoc
 */
/**
 * @method createException
 * Create a custom global exception.
 * For more information, see the [Custom Exceptions Guide](#!/guide/customerrors).
 * @param {Object} config
 * The configuration of the new error.
 * @param {String} [config.name=NgnError]
 * The pretty name of the exception. Alphanumeric characters only (underscore is acceptable).
 * @param {String} [config.type=TypeError]
 * The type of error. This is commonly `TypeError` or `ReferenceError`, but
 * it can be any custom value.
 * @param {String} [config.severity=minor]
 * A descriptive "level" indicating how critical the error is.
 * @param {String} [config.message=Unknown Error]
 * The default message to output when none is specified.
 * @param {Object} [config.custom]
 * Provide a key/value object of custom attributes for the error.
 * There are two "special" custom attributes: `help` and `cause`.
 * When provided, these will be written to stdout whenever the error's
 * stack is viewed.
 *
 * For example:
 *
 * ```js
 * require('ngn')
 *
 * NGN.createException({
 *   name: 'Test Problem',
 *   message: 'An example error.',
 *   custom: {
 *     help: 'Remove the throw statement.',
 *     cause: 'Testing the error output.'
 *   }
 * });
 *
 * throw TestProblem()
 * ```
 * The code above generates the following console output:
 *
 * ```sh
 * Testing the error output.
 * Remove the throw statement.
 * /path/to/test.js:12
 *    throw TestProblem();
 *    ^
 *
 * TestProblem: An example error.
 *    at null._onTimeout (/path/to/test.js:12:11)
 *    at Timer.listOnTimeout (timers.js:92:15)
 * ```
 */
NGN.extend('createException', NGN.public(function (config) {
  config = config || {};
  config = typeof config === 'string' ? { message: config } : config;
  config.name = config.name || 'NgnError';
  config.name = config.name.replace(/[^a-zA-Z0-9_]/gi, '');

  // Create the error as a function
  NGN.global[config.name] = function () {
    if (arguments.length > 0) {
      config.message = arguments[0];
    }
    return new CustomException(config);
  };
}));

// Standard NGN Exceptions
NGN.createException({
  name: 'MissingDependencyError',
  type: 'MissingDependencyError',
  severity: 'critical',
  message: 'An NGN dependency is missing or could not be found.',
  category: 'programmer',
  custom: {
    help: 'Include the missing library.',
    cause: 'A required dependency was not included, or it was not included in the correct sequence.'
  }
});

/**
 * @class DOM
 * A utility class to simplify some DOM management tasks.
 * @singleton
 */
NGN.DOM = {};

Object.defineProperties(NGN.DOM, {
  /**
   * @method ready
   * Executes code after the DOM is loaded.
   * @param {function} callback
   * The function to call when the DOM is fully loaded.
   */
  ready: NGN.const(function (callback) {
    document.addEventListener('DOMContentLoaded', callback);
  }),

  /**
   * @method destroy
   * Remove a DOM element.
   * @param {HTMLElement|NodeList|String|Array} node
   * Accepts a single `HTMLElement`, a `NodeList`, a CSS selector, or
   * an array of `HTMLElements`/`NodeList`/CSS Selectors.
   */
  destroy: NGN.const(function (element) {
    // Process a CSS selector
    if (typeof element === 'string') {
      var src = element;
      element = document.querySelectorAll(element);

      if (element.length === 0) {
        console.warn('The "' + src + '" selector did not return any elements.');
        return;
      }
      // Iterate through results and remove each element.
      NGN.slice(element).forEach(this.destroy);
    } else {
      switch (NGN.typeof(element)) {
        case 'array':
          element.forEach(this.destroy);
          return;
        case 'nodelist':
          NGN.slice(element).forEach(this.destroy);
          return;
        case 'htmlelement':
          element.parentNode.removeChild(element);
          return;
        default:
          if (/^html.*element$/.test(NGN.typeof(element))) {
            element.parentNode.removeChild(element);
            return;
          }
          console.warn('An unknown error occurred while trying to remove DOM elements.');
          console.log('Unknown Element', element);
      }
    }
  }),

  /**
   * @method guarantee
   * This method executes a callback function when it recognizes
   * the insertion of a DOM element within the parent. It is a good way to
   * guarantee a new DOM element exists before doing anything (such as
   * adding an event listener). This method is not always necessary, but it is
   * extremely handy when importing remote HTML templates over less than
   * reliable connections, or when the remote code differs from expectations.
   *
   * **Notice** that #guaranteeDirectChild is a more efficient way to assure
   * a _direct child_ exists within a parent (as opposed to being nested within
   * another child element), because it will not check the subtree.
   *
   * Functionally, this differs from Promises and script loaders. An optimized
   * mutation observer monitors the parent element for insertion of a child element.
   * The mutation observer will not trigger a response until an element actually
   * exists in the DOM. When the mutation observer recognizes a new element,
   * the element is compared to the selector element. If the selector does
   * **not** match the new element, nothing happens. If the selector **matches**
   * the new element, the callback is triggered and the mutation observer
   * is removed.
   *
   * **Example**
   *
   * ```js
   * NGN.DOM.guarantee(document, '#myButton', function (err, element) {
   *   if (err) {
   *     throw err
   *   }
   *
   *   element.addEventListener('click', function (e) {
   *     console.log('Button Clicked')
   *   })
   * })
   *
   * setTimeout (function () {
   *   document.insertAdjacentHTML('beforeend', '<button id="myButton">Click Me</button>')
   * }, 2000)
   * ```
   *
   * In this example, a new button is added to the DOM two seconds after the page
   * renders. The guarantee monitors the `document` for an HTMLElement that matches
   * `document.querySelector('#myButton')`. Once the element is recognized,
   * an event listener is applied to the element.
   *
   * The net result of this is a button will appear on the page. When a user clicks
   * the button, it will say `Button Clicked` in the console.
   *
   * **This method is not capable of detecting** `#TEXT` **nodes**. In other words,
   * it must be a valid HTML tag (including custom elements or instances of `HTMLElement`).
   * @param {HTMLElement|String} parent
   * This DOM element will be monitored for changes. **Only direct child nodes
   * within this element will trigger the callback**. This parameter may be a
   * real DOM element or a CSS selector.
   * @param {String} selector
   * This selector is used to match the new element. This may also be the
   * string-representation of the HTML, such as `<div>my content</div>`.
   * @param {Number} [timeout]
   * Optionally set a timeout (milliseconds). If the new method is not recognized
   * within this time, the callback will be triggered with an error.
   * @param {Function} callback
   * The method executed when the DOM element is guaranteed to exist.
   * This method receives two arguments. The first is an error, which will be
   * `null` if everything works. The second argument is a reference to the
   * new element (an HTMLElement).
   */
  guarantee: NGN.public(function (parent, selector, timeout, callback) {
    NGN.DOM.guaranteeElement(true, parent, selector, timeout, callback);
  }),

  /**
   * @method guaranteeDirectChild
   * This is functionally the same as #guarantee, but restricts monitoring
   * to the direct children of the parent element.
   * @param {HTMLElement|String} parent
   * This DOM element will be monitored for changes. **Only direct child nodes
   * within this element will trigger the callback**. This parameter may be a
   * real DOM element or a CSS selector.
   * @param {String} selector
   * This selector is used to match the new element. This may also be the
   * string-representation of the HTML, such as `<div>my content</div>`.
   * @param {Number} [timeout]
   * Optionally set a timeout (milliseconds). If the new method is not recognized
   * within this time, the callback will be triggered with an error.
   * @param {Function} callback
   * The method executed when the DOM element is guaranteed to exist.
   * This method receives two arguments. The first is an error, which will be
   * `null` if everything works. The second argument is a reference to the
   * new element (an HTMLElement).
  */
  guaranteeDirectChild: NGN.public(function (parent, selector, timeout, callback) {
    NGN.DOM.guaranteeElement(false, parent, selector, timeout, callback);
  }),

  // The private implementation of the guarantee methods.
  guaranteeElement: NGN.private(function (tree, parent, selector, timeout, callback) {
    if (NGN.isFn(timeout)) {
      callback = timeout;
      timeout = null;
    }

    if (typeof parent === 'string') {
      parent = document.querySelector(NGN.DOM.normalizeSelector(parent));
    }

    if (selector.indexOf('<') >= 0) {
      selector = NGN.DOM.expandVoidHTMLTags(selector).toString().trim().toUpperCase();
    } else {
      selector = NGN.DOM.normalizeSelector(selector);
    }

    // If the element already exists, immediately respond.
    if (typeof selector === 'string') {
      if (selector.indexOf('<') >= 0) {
        // Identify the type of matching node
        var nodeType = /<(\w+).*>/i.exec(selector);

        // If the node type cannot be determine, throw an error.
        if (!nodeType) {
          return callback(new Error('Invalid selector.'));
        }

        nodeType = nodeType[1].toUpperCase();

        // Create a DOM Node filter
        var filter = function filter(node) {
          if (node.nodeName === nodeType) {
            return NodeFilter.FILTER_ACCEPT;
          } else if (node.hasChildNodes()) {
            return NodeFilter.FILTER_SKIP;
          }

          return NodeFilter.FILTER_REJECT;
        };

        selector = selector.toUpperCase();

        // This horrible monstrosity of try/catch is here to support IE11, which
        // is the only browser that requires a function instead of an object
        // for a TreeWalker filter.
        var walker = void 0;
        try {
          // Filter the Node tree walker results to the node type of the matched element.
          walker = document.createTreeWalker(parent, NodeFilter.SHOW_ELEMENT, { acceptNode: filter }, false);

          // Walk the filtered DOM tree, searching for a match.
          while (walker.nextNode()) {
            var reviewNode = NGN.DOM.expandVoidHTMLTags(walker.currentNode.outerHTML.toString().trim()).toUpperCase();

            if (reviewNode === selector) {
              // If the element exists, short-circuit the process & run the callback.
              return callback(null, walker.currentNode);
            }
          }
        } catch (e) {
          // Filter the Node tree walker results to the node type of the matched element.
          walker = document.createTreeWalker(parent, NodeFilter.SHOW_ELEMENT, filter, false);

          // Walk the filtered DOM tree, searching for a match.
          while (walker.nextNode()) {
            var _reviewNode = NGN.DOM.expandVoidHTMLTags(walker.currentNode.outerHTML.toString().trim()).toUpperCase();

            if (_reviewNode === selector) {
              // If the element exists, short-circuit the process & run the callback.
              return callback(null, walker.currentNode);
            }
          }
        }
      } else {
        // If the selector is a string, try to compare a query selector to the new child.
        // The try catch block prevents browser false-positives with escaped CSS
        // selector sequences.
        try {
          var currentNode = document.querySelector(NGN.DOM.getElementSelector(parent) + ' ' + selector);

          if (currentNode && currentNode instanceof HTMLElement) {
            return callback(null, currentNode);
          }
        } catch (e) {}
      }
    }

    var match = function match(node) {
      clearTimeout(timeout);
      observer.disconnect();
      callback(null, node);
    };

    // Create Mutation Observer
    var observer = new MutationObserver(function (mutations) {
      // Iterate through mutations
      for (var mutation in mutations) {
        // Only check child node modifications
        if (mutations[mutation].type === 'childList') {
          // Only check nodes inserted directly into the parent
          for (var node = 0; node < mutations[mutation].addedNodes.length; node++) {
            var _currentNode = mutations[mutation].addedNodes[node];
            if (_currentNode.nodeName.toUpperCase() !== '#TEXT') {
              if (typeof selector === 'string') {
                try {
                  // If the selector is a string, try to compare a query selector to the new child.
                  if (document.querySelector(NGN.DOM.getElementSelector(parent) + ' ' + selector) === _currentNode) {
                    return match(_currentNode);
                  }
                } catch (e) {
                  // If the selector is a string but throws an invalid query selector error,
                  // it is most likely a document fragment or text representation of an HTMLElement.
                  // In this case, compare the new child node's outerHTML to the selector for a match.
                  var addedItem = NGN.DOM.expandVoidHTMLTags(_currentNode.outerHTML.toString().trim()).toUpperCase();

                  if (selector === addedItem) {
                    return match(_currentNode);
                  }
                }
              }
            }
          }
        }
      }
    });

    // Apply the observer to the parent element.
    observer.observe(parent, {
      childList: true,
      subtree: tree
    });

    // If a timeout is specified, begin timing.
    if (timeout !== null && typeof timeout === 'number') {
      timeout = setTimeout(function () {
        observer.disconnect();
        callback(new Error('Guarantee timed out while waiting for ' + selector));
      }, timeout);
    }
  }),

  expandVoidHTMLTags: NGN.private(function (content) {
    content = NGN.coalesce(content, '');

    // Regex Parsers
    var voidTags = /<[^>]*\/>/gi;
    var tagName = /<([^\s\/\\]+)/i; // eslint-disable-line no-useless-escape
    var code = voidTags.exec(content);

    while (code !== null) {
      var tag = tagName.exec(code[0])[1];

      while (content.indexOf(code[0]) !== -1) {
        content = content.replace(code[0], code[0].substr(0, code[0].length - 2) + '></' + tag + '>');
      }

      code = voidTags.exec(content);
    }

    // Strip any XMLNS applied by IE
    return content.replace(/\sXMLNS=".+?"/gi, '').replace(/\s{2,100}/gi, ' ').replace(/\s{1,1000}>/gi, '>').replace(/>\s{1,1000}</gi, '><');
  }),

  /**
   * @method findParent
   * Find a distant parent of a DOM element. This can be thought
   * of as a reverse CSS selector that traverses UP the DOM chain
   * to find the parent element.
   *
   * For example:
   *
   * Assume the following HTML structure & JS code:
   *
   * ```html
   * <section>
   *   <header class="MyGroup">
   *     <div>
   *       <div>
   *         <button>Delete Entire Group</button>
   *       </div>
   *     </div>
   *   </header>
   * </section>
   * ```
   *
   * ```js
   * ref.find('button.remove').addEventListener('click', function (event) {
   *   event.preventDefault()
   *   let removeButton = event.currentTarget
   *   let group = ref.findParent(removeButton,'header')
   *   ref.destroy(group)
   * })
   * ```
   *
   * The code above listens for a click on the button. When the button
   * is clicked, the `findPerent` method recognizes the "Delete Entire Group"
   * button and traverses UP the DOM chain until it finds a `header` DOM
   * element. The `header` DOM element is returned (as `group` letiable). The
   * group is then removed using the `ref.destroy` method.
   *
   * Alternatively, the same effect could have been achieved if line 4
   * of the JS code was:
   * ```js
   * let group = ref.findParent(removeButton, '.MyGroup')
   * ```
   * @param {HTMLElement|String} element
   * The DOM element or a CSS selector string identifying the
   * element whose parent should be found.
   * @param {String} selector
   * A minimal CSS selector used to identify the parent.
   * @param {Number} maxDepth
   * The maximum number of elements to traverse. This can be used to
   * cap a selector and force it to fail before reaching a known limit.
   * By default, there is no limit (i.e. maxDepth=null).
   * @returns {HTMLElement}
   * Responds with the DOM Element, or `null` if none was found.
   */
  findParent: NGN.const(function (node, selector, maxDepth) {
    if (typeof node === 'string') {
      node = document.querySelectorAll(node);
      if (node.length === 0) {
        console.warn('"' + node + '" is an invalid CSS selector (Does not identify any DOM elements).');
        return null;
      }
      node = node[0];
    }

    var currentNode = node.parentNode;
    var i = 0;
    maxDepth = typeof maxDepth === 'number' ? maxDepth : -1;

    while (currentNode.parentNode.querySelector(selector) === null && currentNode.nodeName !== 'BODY') {
      i++;
      if (maxDepth > 0 && i > maxDepth) {
        return null;
      }
      currentNode = currentNode.parentNode;
    }

    return currentNode;
  }),

  /**
   * @method indexOfParent
   * Returns the zero-based index of the DOM element related
   * to its parent element.
   * For example:
   *
   * `html
   * <div>
   *   <p>...</p>
   *   <p>...</p>
   *   <button id="btn"></button>
   *   <p>...</p>
   * </div>
   * ```
   *
   * ```js
   * let i = NGN.DOM.indexOfParent(document.getElementById('btn'))
   * console.log(i) // 2
   * ```
   * @param {HTMLElement} el
   * The reference element.
   * @returns {number}
   */
  indexOfParent: NGN.const(function (element) {
    return NGN.slice(element.parentNode.children).indexOf(element);
  }),

  /**
   * @method getElementSelector
   * Retrieves a unique CSS selector that uniquely identifies the element
   * within the specified element. This can be thought of as a reverse selector.
   * @param {HTMLElement} element
   * The element whose selctor should be retrieved.
   * @param {HTMLElement} [parent=document.body]
   * The optional parent to look within. If unspecified, the
   * document body will be used.
   * @returns {string}
   * The CSS selector string.
   */
  getElementSelector: NGN.public(function (element, parent) {
    if (!(element instanceof HTMLElement)) {
      throw new Error('Element is not a valid HTML element');
    }

    parent = NGN.coalesce(parent, document.body);

    if (!(parent instanceof HTMLElement)) {
      if (typeof parent === 'string') {
        parent = document.querySelector(parent);
        return this.getElementSelector(element, parent);
      }

      console.warn('Parent element of selector is not a valid DOM element. Using %cdocument.body%c instead.', NGN.css, 'font-weight: normal;', NGN.css);
      parent = document.body;
    }

    // If an ID exists, use it (normalized)
    if (element.hasAttribute('id')) {
      return this.normalizeSelector('#' + element.getAttribute('id'));
    }

    var selector = [];

    while (element !== parent) {
      if (element.hasAttribute('id')) {
        selector.unshift('#' + element.getAttribute('id'));
        return selector.join(' > ');
      } else {
        selector.unshift(element.nodeName.toLowerCase() + ':nth-child(' + (this.indexOfParent(element) + 1) + ')');
        element = element.parentNode;
      }
    }

    return this.normalizeSelector(selector.join(' > '));
  }),

  /**
   * @method normalizeSelector
   * Normalize the selector path by finding the last ID and returning the
   * selector chain from that ID. This will also escape the selector if necessary.
   * @param {string} selector
   * The selector to normalize.
   * @returns {string}
   * @private
   */
  normalizeSelector: NGN.private(function () {
    var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    if (selector.indexOf('#') >= 0) {
      selector = ('#' + selector.split('#').pop()).toString();
    }

    return NGN.DOM.escapeCssSelector(selector);
  }),

  /**
   * @method escapeCssSelector
   * CSS selectors must adhere to specific
   * [rules](https://www.w3.org/International/questions/qa-escapes#cssescapes).
   * This helper method escapes CSS selectors for programmatic application.
   *
   * At present moment, this will only escape ID's that start with a number.
   * For example, one practice is to generate UUID values to represent unique
   * elements, such as `07804fc1-40ac-4428-aad5-6701ff7d16da`. Common sense says
   * this CSS selector would look like `#07804fc1-40ac-4428-aad5-6701ff7d16da`,
   * but this is invalid. CSS selectors cannot contain a hash (#) followed by
   * a digit. This must be escaped to `#\\30 7804fc1-40ac-4428-aad5-6701ff7d16da`.
   * The `NGN.DOM.escapeCssSelector` method will automatically escape these.
   *
   * **Need something else?** If you need to support a different kind of escape
   * pattern and cannot use [CSS.escape](https://developer.mozilla.org/en-US/docs/Web/API/CSS/escape),
   * please ask or submit a pull request with the added functionality.
   */
  escapeCssSelector: NGN.public(function (selector) {
    var re = /\#[0-9]/g; // eslint-disable-line no-useless-escape
    var match = re.exec(selector);

    // Loop through tokens to replace invalid selectors
    while (match) {
      var token = match[0].replace('#', '');
      selector = selector.replace(match[0], '#\\\\3' + token + ' ');
      match = re.exec(selector);
    }

    return selector;
  }),

  /**
   * @method getCommonAncestorDetail
   * Retrieve the least common ancestor of a collection of DOM elements, including
   * gap analysis. A gap analysis identifies distances between the ancestor and
   * nodes (measured in how many nodes exist between them).
   * @param {NodeList|Array} nodes
   * The DOM nodes to find a common ancestor for.
   * @returns {Object}
   * Returns an object with statistics and the common ancestor:
   *
   * ```js
   * {
   *   element: <HTMLElement>,
   *   gap: {
   *     min: 0,
   *     max: 10,
   *     average: 3,
   *     median: 5
   *   }
   * }
   * ```
   *
   * The element is the common ancestor. The gap `min` represents the shortest
   * distance between the ancestor and one of the nodes. In this example, `0`
   * means at least one node is a direct child of the ancestor. The gap `max`
   * represents the largest distance between the ancestor element and one of the
   * child nodes. The `average` represents a basic statistical average and
   * median represents a midpoint.
   */
  getCommonAncestor: NGN.const(function (nodes) {
    return this.getCommonAncestorDetail(nodes).element;
  }),

  getCommonAncestorDetail: NGN.const(function (nodes) {
    nodes = NGN.slice(nodes);

    if (nodes.length === 1) {
      return nodes[0];
    }

    // For more advanced DOM structures (deeply nested, multiple trees),
    // retrieve the selectors for each element and attempt to find the
    // least common ancestor. Retrieve a sorted tree of selectors ranging
    // from the least specific to the most specific.
    var selectors = nodes.map(function (node) {
      var selectorList = NGN.DOM.getElementSelector(node).split(' > ');
      selectorList.pop();
      return selectorList;
    }).sort(function (a, b) {
      if (a.length < b.length) {
        return -1;
      } else if (a.length > b.length) {
        return 1;
      }

      return 0;
    });

    var ancestors = [];
    var gaps = [];

    while (selectors.length > 0) {
      var currentScope = [];

      // Find the next nearest root for each element and add the partial
      // selector text that is unique to the selector.
      for (var i = 0; i < selectors.length; i++) {
        var scope = selectors[i].shift();

        if (selectors[i].length === 0) {
          gaps.push(0);
        }

        currentScope.push(scope);
      }

      currentScope = NGN.dedupe(currentScope);

      // If there is only one scope, it is shared by all elements
      // and processing should continue.
      if (currentScope.length === 1 && selectors.length === nodes.length) {
        ancestors.push(currentScope.shift());
        selectors = selectors.filter(function (selector) {
          return selector.length > 0;
        });
      } else {
        gaps = gaps.concat(selectors.filter(function (selector) {
          return selector.length > 0;
        }).map(function (selector) {
          return selector.length;
        }));

        // If there are multiple scopes (or none left),
        // the common ancestor has been found.
        selectors = [];
      }
    }

    ancestors = ancestors.join(' > ');

    var total = 0;
    gaps.forEach(function (gap) {
      total += gap;
    });

    return {
      element: document.querySelector(ancestors),
      gap: {
        min: Math.min.apply(this, gaps),
        max: Math.max.apply(this, gaps),
        average: Math.ceil(total / gaps.length),
        median: gaps[Math.ceil(gaps.length / 2) - 1]
      }
    };
  })
});

/**
 * @class BUS
 * The bus acts as a pub/sub messaging system (as opposed to a queue). It is primarily
 * designed for asynchronous communication between javascript objects, but can also be
 * bound to DOM events.
 *
 * The most common use looks like:
 * ```js
 *   var subscriber = NGN.BUS.subscribe('test', function () {
 *     console.log('test handled')
 *   })
 *
 *   NGN.BUS.subscribeOnce('test', function () {
 *     console.log('RESPOND ONCE!')
 *   })
 *
 *   NGN.BUS.publish('test') // Outputs "test handled" and "RESPOND ONCE".
 *
 *   NGN.BUS.publish('test') // Outputs "test handled" only.
 *
 *   subscriber.unsubscribe() // Removes the listener
 *
 *   NGN.BUS.publish('test') // Outputs nothing since the subscription was removed.
 * ```
 * There are a few aliases for ease of use, including `on() --> subscribe()`,
 * `once() --> subscribeOnce()`, and `emit() --> publish()`.
 *
 * It is also possible to use a wildcard in a subscription.
 *
 * ```js
 *   var subscriber = NGN.BUS.subscribe('test.*', function () {
 *     console.log('test handled')
 *   })
 *   var subscriber = NGN.BUS.subscribe('test.create', function () {
 *     console.log('test create handled')
 *   })
 *
 *   NGN.BUS.publish('test.create') // Outputs "test handled" and "test create handled"
 *
 *   NGN.BUS.publish('test.delete') // Outputs "test handled"
 * ```
 * @singleton
 */
NGN.extend('BUS', NGN.const(new NGN.EventEmitter()));

/**
 * @class NGN.NET
 * A library to issue network requests, typically viaHTTP/S requests.
 * This acts as an AJAX library among other things.
 * @fires NETWORKERROR
 * Triggered if a network error occurs. Fired on the NGN.BUS.
 * @author Corey Butler
 * @singleton
 */
var parser = new DOMParser();
var fs = NGN.nodelike ? require('fs') : null;

var Network = function (_NGN$EventEmitter) {
  _inherits(Network, _NGN$EventEmitter);

  function Network() {
    _classCallCheck(this, Network);

    var _this8 = _possibleConstructorReturn(this, (Network.__proto__ || Object.getPrototypeOf(Network)).call(this));

    Object.defineProperties(_this8, {
      /**
       * @method xhr
       * Issue an XHR request.
       * @private
       * @param  {Function} callback
       * The callback to execute when the request finishes (or times out.)
       */
      xhr: NGN.privateconst(function (callback) {
        var res = new XMLHttpRequest();
        var responded = false;

        res.onreadystatechange = function () {
          if (responded) {
            return;
          }

          if (res.readyState === 4) {
            responded = true;

            if (NGN.isFn(callback)) {
              callback(res);
            } else {
              return res;
            }
          }
        };

        res.onerror = function (e) {
          NGN.BUS && NGN.BUS.emit('NETWORKERROR', e);

          if (!responded && NGN.isFn(callback)) {
            callback(res);
          }

          responded = true;
        };

        return res;
      }),

      /**
       * @method prepend
       * A helper method to prepend arguments.
       * @private
       * @param  {[type]} args [description]
       * @param  {[type]} el   [description]
       * @return {[type]}      [description]
       */
      prepend: NGN.privateconst(function (args, el) {
        args = NGN.slice(args);
        args.unshift(el);
        return args;
      }),

      /**
       * @method getFile
       * A "get" method specifically for node-like environments.
       * @param {string} url
       * The URL to issue the request to.
       * @param {Function} callback
       * A callback method to run when the request is complete.
       * This receives the response object as the only argument.
       * @private
       */
      getFile: NGN.privateconst(function (url) {
        if (fs !== null) {
          var rsp = {
            status: fs.existsSync(url.replace('file://', '')) ? 200 : 400
          };
          rsp.responseText = rsp.status === 200 ? fs.readFileSync(url.replace('file://', '')).toString() : 'File could not be found.';
          return rsp;
        } else {
          throw new Error(url + ' does not exist or could not be found.');
        }
      }),

      /**
       * @method normalizeUrl
       * Cleanup a URL.
       * @private
       */
      normalizeUrl: NGN.privateconst(function (url) {
        var uri = [];

        url.split('/').forEach(function (el) {
          if (el === '..') {
            uri.pop();
          } else if (el !== '.') {
            uri.push(el);
          }
        });

        return uri.join('/').replace(/\:\/{3,50}/gi, '://'); // eslint-disable-line no-useless-escape
      }),

      /**
       * @method domainRoot
       * Returns the root (no http/s) of the URL.
       * @param {string} url
       * The URL to get the root of.
       * @private
       */
      domainRoot: NGN.privateconst(function (url) {
        var r = url.search(/^https?\:\/\//) !== -1 ? url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i, '') : url.match(/^([^\/?#]+)(?:[\/?#]|$)/i, ''); // eslint-disable-line no-useless-escape
        return r === null || r[1].length < 3 ? window.location.host : r[1];
      }),

      /**
       * @method isCrossOrigin
       * Determine if accessing a URL is considered a cross origin request.
       * @param {string} url
       * The URL to identify as a COR.
       * @returns {boolean}
       * @private
       */
      isCrossOrigin: NGN.privateconst(function (url) {
        return this.domainRoot(url) !== window.location.host;
      }),

      /**
       * @method prelink
       * A helper method to construct pre-fetch style DOM elements.
       * This also fires an event when the element is added to the DOM.
       * @param {string} url
       * The URL of the operation.
       * @param {string} rel
       * The type of operation. For example: `preconnect`.
       * @param {boolean} [crossorigin]
       * Set to `true` to identify the request as a cross origin request.
       * By default, NGN will compare the URL to the current URL in an
       * attempt to determine if the request is across origins.
       * @private
       */
      prelink: NGN.privateconst(function (url, rel, cor) {
        if (!document.head) {
          console.warn('Cannot use a preconnect, predns, etc because there is no HEAD in the HTML document.');
          return;
        }

        var p = document.createElement('link');
        p.rel = rel;
        p.href = url.trim().toLowerCase().substr(0, 4) !== 'http' ? this.normalizeUrl(window.location.origin + window.location.pathname + url) : url;

        NGN.coalesce(cor, this.isCrossOrigin(url)) && p.setAttribute('crossorigin', 'true');
        document.head.appendChild(p);
        NGN.BUS.emit('network.' + rel);
      }),

      importCache: NGN.private({}),

      createElement: NGN.privateconst(function (str) {
        return parser.parseFromString(str, 'text/html').querySelector('body').children;
      }),

      applyData: NGN.privateconst(function (tpl, data, callback) {
        if (tpl === undefined) {
          console.warn('Empty template.');

          if (NGN.isFn(callback)) {
            callback();
          }

          return;
        }

        // Apply data to the template.
        Object.keys(data).forEach(function (key) {
          var re = new RegExp('\{\{' + key + '\}\}', 'gm'); // eslint-disable-line no-useless-escape
          tpl = tpl.replace(re, data[key]);
        });

        // Clear any unused template code
        tpl = tpl.replace(/(\{\{.*\}\})/gm, '');

        // let el = this.createElement(tpl)
        if (NGN.isFn(callback)) {
          callback(tpl);
        }
      }),

      _ttl: NGN.private(10000)
    });
    return _this8;
  }

  /**
   * @property {Number} defaultCacheExpiration
   * The cache TTL (time-to-live) is used for removing imported templates from memory.
   * In most use cases, templates are rendered no more than a few times within a few
   * seconds. In these cases, there is no need to maintain a copy of the template in
   * memory. The defaultCacheExpiration defaults to `10000` (10,000ms / 10 seconds)
   * before removing template content from memory. Any import operations after this
   * will create a new network request to retrieve a fresh copy of the template.
   *
   * Setting this to `0` will ignore caching completely. Setting this to `-1` will
   * never remove anything from the cache. It is also possible to override this
   * setting for individual imports. See #import for details.
   */


  _createClass(Network, [{
    key: 'run',


    /**
     * @method run
     * A wrapper to execute a request.
     * @private
     * @param  {string} method required
     * The method to issue, such as GET, POST, PUT, DELETE, OPTIONS, etc.
     * @param  {string} url
     * The URL where the request is issued to.
     * @param  {Function} callback
     * A function to call upon completion.
     * @private
     */
    value: function run(method, url, callback) {
      var res = NGN.NET.xhr(callback);
      res.open(method, url, true);
      res.send();
    }

    /**
     * @method runSync
     * A wrapper to execute a request synchronously.
     * @private
     * @param  {string} method required
     * The method to issue, such as GET, POST, PUT, DELETE, OPTIONS, etc.
     * @param  {string} url
     * The URL where the request is issued to.
     * @param  {Function} callback
     * A function to call upon completion.
     * @private
     */

  }, {
    key: 'runSync',
    value: function runSync(method, url) {
      var res = NGN.NET.xhr();
      res.open(method, url, false);
      res.send();
      return res;
    }

    /**
     * @method applyRequestSettings
     * Apply any configuration details to issue with the request,
     * such as `username`, `password`, `headers`, etc.
     * @private
     * @param {object} xhr
     * The XHR request object.
     * @param {object} cfg
     * The key/value configuration object to apply to the request.
     * @param {object} cfg.params
     * A key/value object containing URL paramaters to be passed with the request.
     * These will automatically be URI-encoded.
     * @param {object} cfg.headers
     * A key/value object containing additional headers and associated values to
     * be passed with the request.
     * @param {object} cfg.body
     * An arbitrary body to pass with the request. If no `Content-Type` header is
     * provided, a `Content-Type: application/textcharset=UTF-8` header is automatically supplied.
     * This cannot be used with @cfg.json.
     * @param {object} cfg.json
     * A JSON object to be sent with the request. It will automatically be
     * parsed for submission. By default, a `Content-Type: application/json`
     * header will be applied (this can be overwritten using @cfg.headers).
     * @param {object} cfg.form
     * This accepts a key/value object of form elements, or a reference to a <FORM>
     * HTML element. This automatically adds the appropriate headers.
     * @param {string} username
     * A basicauth username to add to the request. This is sent in plain
     * text, so using SSL to encrypt/protect it is recommended.
     * @param {string} password
     * A basicauth password to add to the request. This is sent in plain
     * text, so using SSL to encrypt/protect it is recommended.
     * @param {boolean} [withCredentials=false]
     * indicates whether or not cross-site `Access-Control` requests should be
     * made using credentials such as cookies or authorization headers.
     * The default is `false`.
     * @private
     */

  }, {
    key: 'applyRequestSettings',
    value: function applyRequestSettings(xhr, cfg) {
      if (!xhr || !cfg) {
        throw new Error('No XHR or configuration object defined.');
      }

      // Add URL Parameters
      if (cfg.params) {
        var parms = Object.keys(cfg.params).map(function (parm) {
          return parm + '=' + encodeURIComponent(cfg.params[parm]);
        });
        cfg.url += '?' + parms.join('&');
      }

      xhr.open(cfg.method || 'POST', cfg.url, true);

      // Set headers
      cfg.header = cfg.header || cfg.headers || {};
      Object.keys(cfg.header).forEach(function (header) {
        xhr.setRequestHeader(header, cfg.header[header]);
      });

      // Handle body (Blank, plain text, or JSON)
      var body = null;
      if (cfg.json) {
        if (!cfg.header || cfg.header && !cfg.header['Content-Type']) {
          xhr.setRequestHeader('Content-Type', 'application/json');
        }
        body = JSON.stringify(cfg.json).trim();
      } else if (cfg.body) {
        if (!cfg.header || cfg.header && !cfg.header['Content-Type']) {
          xhr.setRequestHeader('Content-Type', 'application/text');
        }
        body = cfg.body;
      } else if (cfg.form) {
        body = new FormData();
        Object.keys(cfg.form).forEach(function (el) {
          body.append(el, cfg.form[el]);
        });
      }

      // Handle withCredentials
      if (cfg.withCredentials) {
        xhr.withCredentials = cfg.withCredentials;
      }

      // Handle credentials sent with request
      if (!cfg.header.hasOwnProperty('Authorization')) {
        if (cfg.username && cfg.password) {
          // Basic Auth
          xhr.setRequestHeader('Authorization', 'Basic ' + btoa(cfg.username + ':' + cfg.password));
        } else if (cfg.accessToken) {
          // Bearer Auth
          xhr.setRequestHeader('Authorization', 'Bearer ' + cfg.accessToken);
        }
      }

      return body;
    }

    /**
     * @method send
     * Send the request via HTTP/S.
     * @param  {object} cfg
     * The configuration to use when sending the request. See @applyRequestSettings#cfg
     * for configuration details.
     * @param  {Function} callback
     * A callback to excute upon completion. This receives a standard response
     * object.
     */

  }, {
    key: 'send',
    value: function send(cfg, callback) {
      cfg = cfg || {};
      var res = this.xhr(NGN.coalesce(callback));
      var body = this.applyRequestSettings(res, cfg);

      res.send(body);
      return res;
    }

    /**
     * @method prepareSubmissionConfiguration
     * Prepare common configuration attributes for a request.
     * @private
     */

  }, {
    key: 'prepareSubmissionConfiguration',
    value: function prepareSubmissionConfiguration(cfg, method) {
      if (typeof cfg === 'string') {
        cfg = {
          url: cfg
        };
      }

      cfg = cfg || {};
      cfg.method = method.toUpperCase();
      cfg.url = cfg.url || window.location;
      return cfg;
    }

    /**
     * @method retrieve
     * Executes HTTP requests that pull data (GET, HEAD)
     * with the option to run synchronously.
     * @param {string} method
     * The method (GET/HEAD) to use.
     * @param {boolean} [sync=false]
     * Set to `true` to run the request synchronously.
     * @private
     */

  }, {
    key: 'retrieve',
    value: function retrieve(method) {
      var sync = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      return function () {
        if (typeof arguments[0] === 'string') {
          arguments[0] = {
            url: arguments[0]
          };
        }

        var cfg = arguments[0];

        cfg.method = method;
        cfg.url = typeof arguments[1] === 'string' ? arguments[1] : cfg.url;

        // Support Node file reading.
        if (NGN.nodelike && cfg.url.substr(0, 7).toLowerCase() === 'file://') {
          return arguments[arguments.length - 1](this.getFile(cfg.url));
        }

        return this.send(cfg, arguments[arguments.length - 1]);
      };
    }

    /**
     * @method get
     * Issue a `GET` request.
     * @param {string} url
     * The URL to issue the request to.
     * @param {Function} callback
     * A callback method to run when the request is complete.
     * This receives the response object as the only argument.
     */

  }, {
    key: 'get',
    value: function get() {
      this.retrieve('GET').apply(this, arguments);
    }

    /**
     * @method getSync
     * Same as #get, but executed synchronously.
     * @param {string} url
     * The URL to issue the request to.
     * @returns {object} response
     * Returns a standard Response object.
     */

  }, {
    key: 'getSync',
    value: function getSync() {
      return this.retrieve('GET', true).apply(this, arguments);
    }

    /**
     * @method head
     * Issue a `HEAD` request.
     * @param {string} url
     * The URL to issue the request to.
     * @param {Function} callback
     * A callback method to run when the request is complete.
     * This receives the response object as the only argument.
     */

  }, {
    key: 'head',
    value: function head(uri, callback) {
      this.retrieve('HEAD').apply(this, arguments);
    }

    /**
     * @method headSync
     * Same as #head, but executed synchronously.
     * @param {string} url
     * The URL to issue the request to.
     * @returns {object} response
     * Returns a standard Response object.
     */

  }, {
    key: 'headSync',
    value: function headSync(uri) {
      return this.retrieve('HEAD', true).apply(this, arguments);
    }

    /**
     * @method put
     * Issue a `PUT` request.
     * @param  {object|string} cfg
     * See the options for @send#cfg. If this is a string, it
     * must be a URL.
     * @param  {Function} callback
     * A callback method to run when the request is complete.
     * This receives the response object as the only argument.
     */

  }, {
    key: 'put',
    value: function put(cfg, callback) {
      this.send(this.prepareSubmissionConfiguration(cfg, 'PUT'), callback);
    }

    /**
     * @method putSync
     * Same as #put, but executed synchronously.
     * @param  {object|string} cfg
     * See the options for @send#cfg. If this is a string, it
     * must be a URL.
     * @returns {object} response
     * Returns a standard Response object.
     */

  }, {
    key: 'putSync',
    value: function putSync(cfg) {
      return this.send(this.prepareSubmissionConfiguration(cfg, 'PUT'));
    }

    /**
     * @method post
     * Issue a `POST` request.
     * @param  {object|string} cfg
     * See the options for @send#cfg. If this is a string, it
     * must be a URL.
     * @param  {Function} callback
     * A callback method to run when the request is complete.
     * This receives the response object as the only argument.
     */

  }, {
    key: 'post',
    value: function post(cfg, callback) {
      this.send(this.prepareSubmissionConfiguration(cfg, 'POST'), callback);
    }

    /**
     * @method postSync
     * Same as #post, but executed synchronously.
     * @param  {object|string} cfg
     * See the options for @send#cfg. If this is a string, it
     * must be a URL.
     * @returns {object} response
     * Returns a standard HTTP Response object.
     */

  }, {
    key: 'postSync',
    value: function postSync(cfg) {
      return this.send(this.prepareSubmissionConfiguration(cfg, 'POST'));
    }

    /**
     * @method delete
     * Issue a `DELETE` request.
     * @param  {object|string} cfg
     * See the options for @send#cfg. If this is a string, it
     * must be a URL.
     * @param {Function} callback
     * A callback method to run when the request is complete.
     * This receives the response object as the only argument.
     */

  }, {
    key: 'delete',
    value: function _delete(cfg, callback) {
      this.send(this.prepareSubmissionConfiguration(cfg, 'DELETE'), callback);
    }

    /**
     * @method deleteSync
     * Same as #delete, but executed synchronously.
     * @param  {object|string} cfg
     * See the options for @send#cfg. If this is a string, it
     * must be a URL.
     * @returns {object} response
     * Returns a standard HTTP Response object.
     */

  }, {
    key: 'deleteSync',
    value: function deleteSync(cfg) {
      return this.send(this.prepareSubmissionConfiguration(cfg, 'DELETE'));
      // return this.runSync.apply(this.runSync, this.prepend(arguments, 'DELETE'))
    }

    /**
     * @method runJsonRequest
     * A method for running a GET request and parsing the response as JSON.
     * If no callback is specified, the request is assumed to be synchronous.
     * @param  {string} url
     * The URL to issue the request to.
     * @param  {Function} callback
     * This receives a JSON response object from the server as its only argument.
     * @private
     */

  }, {
    key: 'runJsonRequest',
    value: function runJsonRequest(cfg, url, callback) {
      if (typeof cfg === 'string') {
        callback = url;
        url = cfg;
        cfg = null;
      }

      cfg = cfg || {
        url: url
      };

      // If no callback is specified, assume it's a synchronous request.
      if (!NGN.isFn(callback)) {
        try {
          var res = this.getSync(cfg);

          try {
            return JSON.parse(res.responseText);
          } catch (e) {
            e.response = NGN.coalesce(res);
            throw e;
          }
        } catch (error) {
          error.response = null;
          throw error;
        }
      } else {
        // Assume asynchronous request
        this.get(cfg, function (res) {
          try {
            var responseData = JSON.parse(res.responseText);
            callback(null, responseData);
          } catch (e) {
            e.response = NGN.coalesce(res);
            callback(e, null);
          }
        });
      }
    }

    /**
     * @method json
     * This is a shortcut method for creating a `GET` request and
     * auto-processing the response body into a JSON object.
     * @param  {string} url
     * The URL to issue the request to.
     * @param  {Function} callback
     * This receives a JSON response object from the server.
     * @param {Error} [callback.error=null]
     * If the request cannot be completed for any reason, this argument will be
     * populated with the error. If the request is successful, this will be `null`.
     * @param {Object} callback.data
     * The JSON response from the remote URL.
     */

  }, {
    key: 'json',
    value: function json(cfg, url, callback) {
      this.runJsonRequest(cfg, url, callback);
    }

    /**
     * @method jsonSync
     * Same as #json, but executed synchronously.
     * @param  {string} url
     * The URL to issue the request to.
     * @returns {object} response
     * Returns a standard Response object.
     */

  }, {
    key: 'jsonSync',
    value: function jsonSync(cfg, url) {
      return this.runJsonRequest(cfg, url);
    }

    /**
     * @method jsonp
     * Execute a request via JSONP.
     * @param {string} url
     * The URL of the JSONP endpoint.
     * @param {function} callback
     * Handles the response.
     * @param {Error} [callback.error=null]
     * If an error occurred, this will be populated. If no error occurred, this will
     * be null.
     * @param {object|array} callback.response
     * The response.
     */

  }, {
    key: 'jsonp',
    value: function jsonp(url, callback) {
      var fn = 'jsonp_callback_' + Math.round(100000 * Math.random());

      window[fn] = function (data) {
        delete window[fn];
        document.body.removeChild(script);
        return callback(null, data);
      };

      var script = document.createElement('script');
      script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + fn;

      script.addEventListener('error', function (e) {
        delete window[fn];
        return callback(new Error('The JSONP request was blocked. This may be the result of an invalid URL, cross origin restrictions, or the remote server may not be online.'));
      });

      document.body.appendChild(script);
    }

    /**
     * @method import
     * Import a remote HTML fragment.
     * @param {string|array} url
     * The URL of remote HTML snippet. If the URL has a `.js` or `.css`
     * extension, it will automatically be added to the `<head>`.
     * It is also possible to provide an array of string values. Take
     * note that the callback may return a different value based on
     * this input.
     * @param {string|array} callback
     * If a **string** is provided as the URL, this returns the HTMLElement,
     * which can be directly inserted into the DOM. If an **array** is
     * provided as the URL, the callback will return an array of HTMLElements.
     * For example:
     *
     * ```js
     * NGN.NET.import([
     *   '/path/a.html',
     *   '/path/b.html',
     *   '/path/a.js'
     *   ], function (elements){
     *     console.dir(elements)
     *   }
     * })
     *```
     * The result `elements` array would look like:
     *
     * ```js
     * [
     *   HTMLElement, // DOM element created for a.html
     *   HTMLElement, // DOM element created for b.html
     *   HTMLElement  // DOM element created for a.js (this will be in the <head>)
     * ]
     * ```
     * The last array element is `null`
     * @param {boolean} [bypassCache=false]
     * When set to `true`, bypass the cache.
     * @param {number} [cacheTTL]
     * Remove the imported content from memory after the cacheTTL (time to live)
     * expires. Set the value to `-1` to never expire, `0` to expire immediately,
     * or any integer greater than `0` to expire at a later point (measured in
     * milliseconds). If this is not specified, the #defaultCacheExpiration value
     * will be used (default `10000`: 10 seconds).
     *
     * This property does not affect JavaScript, CSS, or anything applied to the
     * DOM. This only removes cached content to free up memory. If the cache is
     * cleared and another import is executed, it will make a new HTTP/S request
     * to retrieve a fresh copy of the content from the remote server.
     * @fires html.import
     * Returns the HTMLElement/NodeList as an argument to the event handler.
     */

  }, {
    key: 'import',
    value: function _import(url, callback, bypassCache, cacheTTL) {
      var _this9 = this;

      // Support multiple simultaneous imports
      if (Array.isArray(url)) {
        var out = new Array(url.length);
        var i = 0;

        url.forEach(function (uri, num) {
          _this9['import'](uri, function (el) {
            out[num] = el;
            i++;
          }, bypassCache);
        });

        if (callback) {
          var int = setInterval(function () {
            if (i === url.length) {
              clearInterval(int);
              callback(out);
            }
          }, 5);
        }

        return;
      }

      // Support JS/CSS
      var ext = this.getFileExtension(url);
      try {
        var s = void 0;
        if (ext === 'js') {
          s = document.createElement('script');
          s.setAttribute('type', 'text/javascript');
          s.setAttribute('src', url);
        } else if (ext === 'css') {
          s = document.createElement('link');
          s.setAttribute('rel', 'stylesheet');
          s.setAttribute('type', 'text/css');
          s.setAttribute('href', url);
        }

        s.onload = typeof callback === 'function' ? function () {
          callback(s);
        } : function () {};

        document.getElementsByTagName('head')[0].appendChild(s);
      } catch (e) {}

      if (['js', 'css'].indexOf((ext || '').trim().toLowerCase()) >= 0) {
        return;
      }

      bypassCache = typeof bypassCache === 'boolean' ? bypassCache : false;

      // If a local reference is provided, complete the path.
      if (url.substr(0, 4) !== 'http') {
        var path = window.location.href.split('/');
        path.pop();
        url = path.join('/') + '/' + url;
      }

      // Use the cache if defined & not bypassed
      if (!bypassCache && this.importCache.hasOwnProperty(url)) {
        if (callback) {
          callback(this.importCache[url]);
        }

        if (NGN.BUS) {
          NGN.BUS.emit('html.import', this.importCache[url]);
        }

        // console.warn('Used cached version of '+url)
        return;
      }

      // Retrieve the file content
      // If the fetch method is available, use it. Fallback
      // to a standard GET operation.
      if (Request !== undefined && Response !== undefined && Headers !== undefined && window.hasOwnProperty('fetch') && typeof fetch === 'function') {
        var remoteFile = new Request(url);
        var headers = new Headers();
        var creds = /^.*\:\/\/(.*)\:(.*)\@(.*)$/gi.exec(url); // eslint-disable-line no-useless-escape
        var cfg = {
          redirect: 'follow'
        };

        if (creds !== null) {
          headers.append('Authorization', 'Basic ' + btoa(creds[2] + ':' + creds[3]));
          url = creds[1] + '://' + creds[4];
          cfg.credentials = 'include';
        }

        cfg.headers = headers;

        fetch(remoteFile, cfg).then(function (res) {
          var doc = res.text();

          _this9.cacheContent(url, doc, cacheTTL);

          return doc;
        }).then(function (content) {
          if (typeof callback === 'function') {
            callback(content);
          }

          if (NGN.BUS) {
            NGN.BUS.emit('html.import', content);
          }
        }).catch(function (err) {
          throw err;
        });
      } else {
        this.get(url, function (res) {
          if (res.status !== 200) {
            return console.warn('Check the file path of the snippet that needs to be imported. ' + url + ' could not be found (' + res.status + ')');
          }

          var doc = res.responseText;
          _this9.cacheContent(url, doc, cacheTTL);

          if (doc.length === 0) {
            console.warn(_this9.normalizeUrl(url) + ' import has no content!');
          }

          if (NGN.isFn(callback)) {
            callback(doc);
          }

          if (NGN.BUS) {
            NGN.BUS.emit('html.import', doc);
          }
        });
      }
    }

    /**
     * @method cacheContent
     * Cache (in-memory) content by URL.
     * @param {string} url
     * The URL/URI of the remote content.
     * @param {string} content
     * The content retrieved from the URL.
     * @param {number} [cacheTTL]
     * The time-to-live, or the amount of time (milliseconds) before
     * this content is purged from the cache. If this is unspecified,
     * the #defaultCacheExpiration value will be used.
     */

  }, {
    key: 'cacheContent',
    value: function cacheContent(url, content, cacheTTL) {
      var _this10 = this;

      this.importCache[url] = content;

      if (cacheTTL >= 0) {
        setTimeout(function () {
          delete _this10.importCache[url];
        }, cacheTTL);
      }
    }

    /**
     * @method fetchImport
     * A generic method to fetch code, insert to the DOM,
     * and execute a callback once the operation is complete.
     * @param {string} url
     * The URL of remote HTML snippet.
     * @param {HTMLElement} target
     * The DOM element where the resulting code should be appended.
     * @param {function} callback
     * Returns the HTMLElement, which can be directly inserted into the DOM.
     * @param {HTMLElement} callback.element
     * The new DOM element/NodeList.
     * @private
     */

  }, {
    key: 'fetchRemoteFile',
    value: function fetchRemoteFile(url, target, position, callback) {
      this.import(url, function (content) {
        var observer = new MutationObserver(function (mutations) {
          mutations.forEach(function (mutation) {
            if (mutation.type === 'childList') {
              clearTimeout(timeout);
              observer.disconnect();

              if (NGN.isFn(callback)) {
                callback(mutation.addedNodes[0]);
              }
            }
          });
        });

        observer.observe(target, {
          attributes: false,
          childList: true,
          characterData: false,
          subtree: false
        });

        var timeout = setTimeout(function () {
          if (NGN.isFn(callback)) {
            callback(content);
          }
        }, 750);

        target.insertAdjacentHTML(position, content);
      });
    }

    /**
     * @method importTo
     * This helper method uses the #import method to retrieve an HTML
     * fragment and insert it into the specified DOM element. This is
     * the equivalent of using results of the #import to retrieve a
     * snippet, then doing a `target.appendChild(importedElement)`.
     * @param {string} url
     * The URL of remote HTML snippet.
     * @param {HTMLElement} target
     * The DOM element where the resulting code should be appended.
     * @param {function} callback
     * Returns the HTMLElement, which can be directly inserted into the DOM.
     * @param {HTMLElement} callback.element
     * The new DOM element/NodeList.
     */

  }, {
    key: 'importTo',
    value: function importTo(url, target, callback) {
      this.fetchRemoteFile(url, target, 'beforeend', callback);
    }

    /**
     * @method importAfter
     * This helper method uses the #import method to retrieve an HTML
     * fragment and insert it into the DOM after the target element. This is
     * the equivalent of using results of the #import to retrieve a snippet,
     * then doing a `target.insertAdjacentHTML('afterend', importedElement)`.
     * @param {string} url
     * The URL of remote HTML snippet.
     * @param {HTMLElement} target
     * The DOM element where the resulting code should be appended.
     * @param {string} callback
     * Returns the HTMLElement/NodeList, which can be directly inserted into the DOM.
     * @param {HTMLElement} callback.element
     * The new DOM element/NodeList.
     */

  }, {
    key: 'importAfter',
    value: function importAfter(url, target, callback) {
      this.fetchRemoteFile(url, target, 'afterend', callback);
    }

    /**
     * @method importBefore
     * This helper method uses the #import method to retrieve an HTML
     * fragment and insert it into the DOM before the target element. This is
     * the equivalent of using results of the #import to retrieve a snippet,
     * then doing a `target.parentNode.insertBefore(importedElement, target)`.
     * @param {string} url
     * The URL of remote HTML snippet.
     * @param {HTMLElement} target
     * The DOM element where the resulting code should be appended.
     * @param {string} callback
     * Returns the HTMLElement/NodeList, which can be directly inserted into the DOM.
     * @param {HTMLElement} callback.element
     * The new DOM element/NodeList.
     */

  }, {
    key: 'importBefore',
    value: function importBefore(url, target, callback) {
      this.fetchRemoteFile(url, target, 'beforebegin', callback);
    }

    /**
     * @method template
     * Include a simple letiable replacement template and apply
     * values to it. This is always cached client side.
     * @param {string} url
     * URL of the template to retrieve.
     * @param {object} [letiables]
     * A key/value objct containing letiables to replace in
     * the template.
     * @param {function} callback
     * The callback receives a single argument with the HTMLElement/
     * NodeList generated by the template.
     */

  }, {
    key: 'template',
    value: function template(url, data, callback) {
      var _this11 = this;

      url = this.normalizeUrl(url);

      if (typeof data === 'function') {
        callback = data;
        data = {};
      }

      data = data || {};

      var tpl = void 0;

      // Check the cache
      if (this.importCache.hasOwnProperty(url)) {
        tpl = this.importCache[url];
        return this.applyData(tpl, data, callback);
      }

      this.get(url, function (res) {
        var ext = _this11.getFileExtension(url);

        if (['js', 'css'].indexOf((ext || '').trim().toLowerCase()) >= 0) {
          console.warn('Cannot use a .' + ext + ' file as a template. Only HTML templates are supported.');
          return;
        }

        _this11.importCache[url] = res.responseText;
        _this11.applyData(res.responseText, data, callback);
      });
    }

    /**
     * @method predns
     * This notifies the browser domains which will be accessed at a later
     * time. This helps the browser resolve DNS inquiries quickly.
     * @param {string} domain
     * The domain to resolve.
     * @param {boolean} [crossorigin]
     * Set to `true` to identify the request as a cross origin request.
     * By default, NGN will compare the URL to the current URL in an
     * attempt to determine if the request is across origins.
     * @fires network-dns-prefetch
     * Fired when a pre-fetched DNS request is issued to the browser.
     */

  }, {
    key: 'predns',
    value: function predns(domain, cor) {
      this.prelink(window.location.protocol + '//' + domain, 'dns-prefetch', cor);
    }

    /**
     * @method preconnect
     * Tell the browser which remote resources will or may be used in the
     * future by issuing a `Preconnect`. This will resolve DNS (#predns), make the TCP
     * handshake, and negotiate TLS (if necessary). This can be done directly
     * in HTML without JS, but this method allows you to easily preconnect
     * a resource in response to a user interaction or NGN.BUS activity.
     * @param {string} url
     * The URL to preconnect to.
     * @param {boolean} [crossorigin]
     * Set to `true` to identify the request as a cross origin request.
     * By default, NGN will compare the URL to the current URL in an
     * attempt to determine if the request is across origins.
     * @fires network.preconnect
     * Fired when a preconnect is issued to the browser.
     */

  }, {
    key: 'preconnect',
    value: function preconnect(url, cor) {
      this.prelink(url, 'preconnect', cor);
    }

    /**
     * @method prefetch
     * Fetch a specific resource and cache it.
     * @param {string} url
     * URL of the resource to download and cache.
     * @param {boolean} [crossorigin]
     * Set to `true` to identify the request as a cross origin request.
     * By default, NGN will compare the URL to the current URL in an
     * attempt to determine if the request is across origins.
     * @fires network.prefetch
     * Fired when a prefetch is issued to the browser.
     */

  }, {
    key: 'prefetch',
    value: function prefetch(url, cor) {
      this.prelink(url, 'prefetch', cor);
    }

    /**
     * @method subresource
     * A prioritized version of #prefetch. This should be used
     * if the asset is required for the current page. Think of this
     * as "needed ASAP". Otherwise, use #prefetch.
     * @param {string} url
     * URL of the resource to download and cache.
     * @param {boolean} [crossorigin]
     * Set to `true` to identify the request as a cross origin request.
     * By default, NGN will compare the URL to the current URL in an
     * attempt to determine if the request is across origins.
     * @fires network.prefetch
     * Fired when a prefetch is issued to the browser.
     */

  }, {
    key: 'subresource',
    value: function subresource(url, cor) {
      this.prelink(url, 'subresource', cor);
    }

    /**
     * @method prerender
     * Prerender an entire page. This behaves as though a page is
     * opened in a hidden tab, then displayed when called. This is
     * powerful, but should only be used when there is absolute
     * certainty that the prerendered page will be needed. Otherwise
     * all of the assets are loaded for no reason (i.e. uselessly
     * consuming bandwidth).
     * @param {string} url
     * URL of the page to download and cache.
     * @param {boolean} [crossorigin]
     * Set to `true` to identify the request as a cross origin request.
     * By default, NGN will compare the URL to the current URL in an
     * attempt to determine if the request is across origins.
     * @fires network.prerender
     * Fired when a prerender is issued to the browser.
     */

  }, {
    key: 'prerender',
    value: function prerender(url, cor) {
      this.prelink(url, 'prerender', cor);
    }

    /**
     * @method getFileExtension
     * Returns the extension of the file specified within a URI.
     * @param {string} uri
     * The URI of the resource.
     * @returns {string}
     * The extension.
     * @private
     */

  }, {
    key: 'getFileExtension',
    value: function getFileExtension(uri) {
      var ext = null;

      try {
        ext = uri.split('/').pop().split('?')[0].split('.').pop().toLowerCase();
      } catch (e) {}

      return ext;
    }
  }, {
    key: 'defaultCacheExpiration',
    get: function get() {
      return this._ttl;
    },
    set: function set(duration) {
      if (isNaN(duration)) {
        throw new Error('Values for defaultCacheExpiration must be a valid integer.');
      }

      var old = this._ttl;
      if (duration < 0) {
        this._ttl = -1;
      } else {
        this._ttl = duration;
      }

      this.emit('cache.ttl.change', {
        old: old,
        new: this._ttl
      });
    }
  }]);

  return Network;
}(NGN.EventEmitter);

/**
 * @class NGN.NET.Resource
 * Represents a remote web resource, such as a backend web server or
 * an API server. This class inherits everything from NGN.NET, extending
 * it with customizable options for working with specific remote resources.
 *
 * This class was designed for use in applications where multiple requests
 * are made to multiple backends. For example, a common single page application
 * may make multiple requests for resources (media, templates, CSS, etc)
 * as well as multiple requests to an API server.
 *
 * For example:
 *
 * ```js
 * let server = new NGN.NET.Resource({
 *   credentials: {
 *     username: 'username',
 *     password: 'password'
 *   },
 *   headers: {
 *     'x-source': 'mydomain.com'
 *   }
 * })
 *
 * let API = new NGN.NET.Resource({
 *   credentials: {
 *     token: 'secret_token'
 *   },
 *   headers: {
 *     'user-agent': 'mobile'
 *   },
 *   baseUrl: 'https://api.mydomain.com'
 * })
 *
 * server.import('./templates/home.html', () => { ... })
 * API.json('/user', (data) => { ... })
 * ```
 *
 * Both `server` and `API` in the example above are instances of
 * NGN.NET. The primary differences are using different credentials
 * to access the server, supplying different global headers, and
 * using a different base URL.
 *
 * This can be incredibly useful anytime a migration is required,
 * such as running code in dev ==> staging ==> production or
 * switching servers. It is also useful for creating connections
 * for different remote services, creating custom API clients,
 * and generally organizing/standardizing how an application connects
 * to remote resources.
 * @extends NGN.NET
 */


var NetworkResource = function (_Network) {
  _inherits(NetworkResource, _Network);

  function NetworkResource(cfg) {
    _classCallCheck(this, NetworkResource);

    var _this12 = _possibleConstructorReturn(this, (NetworkResource.__proto__ || Object.getPrototypeOf(NetworkResource)).call(this));

    cfg = cfg || {};

    Object.defineProperties(_this12, {
      /**
       * @cfg {object} headers
       * Contains headers that are applied to all requests.
       * @private
       */
      globalHeaders: NGN.private(NGN.coalesce(cfg.headers, {})),

      /**
       * @cfgy {object} credentials
       * Contains credentials that are applied to all requests.
       * @private
       */
      globalCredentials: NGN.private(NGN.coalesce(cfg.credentials, {})),

      /**
       * @cfg {string} [baseUrl=window.loction.origin]
       * The root domain/base URL to apply to all requests to relative URL's.
       * This was designed for uses where a backend API may be served on
       * another domain (such as api.mydomain.com instead of www.mydomain.com).
       * The root will only be applied to relative paths that do not begin
       * with a protocol. For example, `./path/to/endpoint` **will** have
       * the root applied (`{root}/path/to/endpoint`) whereas `https://domain.com/endpoint`
       * will **not** have the root applied.
       */
      baseUrl: NGN.private(NGN.coalesce(cfg.baseUrl, cfg.baseurl, window.location.origin))
    });
    return _this12;
  }

  /**
   * @property {object} headers
   * Retrieves the current global headers that were created with
   * the #setHeaders method.
   * @readonly
   */


  _createClass(NetworkResource, [{
    key: 'setHeaders',


    /**
     * @method setHeaders
     * Configure a set of headers that are applied to every request.
     * This is commonly used when a remote resource requires a specific
     * header on every call.
     *
     * **Example**
     *
     * ```js
     * NGN.NET.setHeaders({
     *   'user-agent': 'my custom agent name'
     * })
     * ```
     */
    value: function setHeaders(headers) {
      this.globalHeaders = headers;
    }

    /**
     * @method setCredentials
     * Configure credentials that are applied to every request.
     * This is commonly used when communicating with a RESTful API.
     * This can accept a username and password or an access token.
     *
     * **Examples**
     *
     * ```js
     * NGN.NET.setCredentials({
     *  username: 'user',
     *  password: 'pass'
     * })
     * ```
     *
     * ```js
     * NGN.NET.setCredentials({
     *  accessToken: 'token'
     * })
     * ```
     */

  }, {
    key: 'setCredentials',
    value: function setCredentials(credentials) {
      if (credentials.hasOwnProperty('accesstoken') || credentials.hasOwnProperty('token')) {
        credentials.accessToken = NGN.coalesce(credentials.accesstoken, credentials.token);
      } else if (!(credentials.hasOwnProperty('username') && credentials.hasOwnProperty('password')) && !credentials.hasOwnProperty('accessToken')) {
        throw new Error('Invalid credentials. Must contain an access token OR the combination of a username AND password.');
      }

      this.globalCredentials = credentials;
    }
  }, {
    key: 'applyRequestSettings',
    value: function applyRequestSettings(xhr, cfg) {
      var _this13 = this;

      cfg.url = this.prepareUrl(cfg.url);

      // Use Global Credentials (if applicable)
      if (this.globalCredentials.hasOwnProperty('accessToken') || this.globalCredentials.hasOwnProperty('username') && this.globalCredentials.hasOwnProperty('password')) {
        cfg.withCredentials = NGN.coalesce(cfg.withCredentials, true);

        if (this.globalCredentials.accessToken) {
          cfg.accessToken = NGN.coalesce(cfg.accessToken, this.globalCredentials.accessToken);
        } else {
          cfg.username = NGN.coalesce(cfg.username, this.globalCredentials.username);
          cfg.password = NGN.coalesce(cfg.password, this.globalCredentials.password);
        }
      }

      // Add credential headers as necessary
      cfg.header = NGN.coalesce(cfg.header, {});
      if (!cfg.header.hasOwnProperty('Authorization') && (this.globalCredentials.hasOwnProperty('accessToken') || this.globalCredentials.hasOwnProperty('username') && this.globalCredentials.hasOwnProperty('password'))) {
        if (this.globalCredentials.accessToken) {
          cfg.header['Authorization'] = 'Bearer ' + this.globalCredentials.accessToken;
        } else {
          cfg.header['Authorization'] = 'Basic ' + btoa(this.globalCredentials.username + ':' + this.globalCredentials.password);
        }

        cfg.credentials = 'include';
      }

      // Apply Global Headers
      Object.keys(this.globalHeaders).forEach(function (header) {
        if (!(header === 'Authorization' && cfg.header.hasOwnProperty('Authorization'))) {
          cfg.header[header] = _this13.globalHeaders[header];
        }
      });

      return _get(NetworkResource.prototype.__proto__ || Object.getPrototypeOf(NetworkResource.prototype), 'applyRequestSettings', this).call(this, xhr, cfg);
    }
  }, {
    key: 'run',
    value: function run(method, url, callback) {
      _get(NetworkResource.prototype.__proto__ || Object.getPrototypeOf(NetworkResource.prototype), 'run', this).call(this, method, this.prepareUrl(url), callback);
    }
  }, {
    key: 'runSync',
    value: function runSync(method, url) {
      return _get(NetworkResource.prototype.__proto__ || Object.getPrototypeOf(NetworkResource.prototype), 'runSync', this).call(this, method, this.prepareUrl(url));
    }

    /**
     * @method prepareUrl
     * Prepare a URL by applying the base URL (only when appropriate).
     * @param  {string} uri
     * The universal resource indicator (URI/URL) to prepare.
     * @return {string}
     * Returns a fully qualified URL.
     * @private
     */

  }, {
    key: 'prepareUrl',
    value: function prepareUrl(uri) {
      if (uri.indexOf('://') < 0) {
        uri = this.normalizeUrl(this.baseUrl + '/' + uri);
      }

      return uri.replace(/\/{2,5}/gi, '/').replace(/\:\/{1}/i, '://'); // eslint-disable-line
    }
  }, {
    key: 'headers',
    get: function get() {
      return this.globalHeaders;
    }
  }]);

  return NetworkResource;
}(Network);

Network.prototype.Resource = NetworkResource;
NGN.extend('NET', NGN.const(new Network()));

Network = null; // eslint-disable-line no-class-assign
NetworkResource = null; // eslint-disable-line no-class-assign

/**
 * @class NGN.DOM.svg
 * Provides a way to easily manage SVG images within a document while
 * retaining the ability to style them with external CSS.
 * @singleton
 */
/* This file should be loaded in the <head>, not at the end of the <body>.
* By loading this script before the rest of the DOM, it will insert the
* FOUC (Flash of Unstyled Content) CSS into the page BEFORE unstyled SVG images
* are loaded. If this script is included in the <body>, the CSS will be loaded
* AFTER the SVG images are loaded, meaning they may display briefly before
* proper styling can be applied to the DOM.
*/

// Prevent FOUC
// (function () {
//   let ss = document.createElement('style')
//   let str = document.createTextNode('svg[src]{display:none}svg.loading{height:0px !important;width:0px !important}')
//   ss.appendChild(str)
//   document.head.appendChild(ss)
// })()
var fuoc = function fuoc() {
  var ss = document.createElement('style');
  var str = document.createTextNode('svg[src]{display:none}svg.loading{height:0px !important;width:0px !important}');
  ss.appendChild(str);
  document.head.appendChild(ss);
};
fuoc();

// SVG Controller
NGN.DOM = NGN.DOM || {};
NGN.DOM.svg = {};

Object.defineProperties(NGN.DOM.svg, {
  /**
   * @property {Object} _cache
   * A cache of SVG images.
   */
  _cache: NGN.private({}),

  /**
   * @method swap
   * Replace image tags with the SVG equivalent.
   * @param {HTMLElement|NodeList} imgs
   * The HTML element or node list containing the images that should be swapped out for SVG files.
   * @param {function} [callback]
   * Executed when the image swap is complete. There are no arguments passed to the callback.
   * @private
   */
  swap: NGN.privateconst(function (element, callback) {
    var _this14 = this;

    var me = this;
    var svgs = element.querySelectorAll('svg[src]');

    var _loop = function _loop(i) {
      var attr = svgs[i].attributes;
      var source = me._cache[svgs[i].getAttribute('src')];
      var firstLine = source.split(/>\s{0,100}</i)[0] + '>';
      var sourceattrs = _this14.getAttributes(firstLine);

      var newattrs = [];
      for (var a = 0; a < attr.length; a++) {
        if (attr[a].name.toLowerCase() !== 'src') {
          newattrs.push(attr[a].name.toLowerCase() + '="' + attr[a].value + '"');
        }
      }

      sourceattrs.filter(function (a) {
        var match = newattrs.filter(function (na) {
          return na.toLowerCase().indexOf(a.split('=')[0].toLowerCase()) === 0;
        });

        return match.length === 0;
      });

      var attrs = newattrs.concat(sourceattrs);

      svgs[i].outerHTML = source.replace(firstLine, '<svg ' + attrs.join(' ') + '>');
    };

    for (var i = 0; i < svgs.length; i++) {
      _loop(i);
    }

    callback && callback();
  }),

  getAttributes: NGN.privateconst(function (output) {
    var attrs = void 0;

    try {
      attrs = /<svg(\s.*=[\"\'].*?[\"\'])?>/i.exec(output)[1].trim(); // eslint-disable-line no-useless-escape
      var sep = /[\"\']\s/i.exec(attrs); // eslint-disable-line no-useless-escape
      sep = sep !== null ? sep[0] : '" ';
      attrs = attrs.replace(new RegExp(sep, 'gi'), sep.replace(/\s/ig, ',')).split(',');
    } catch (e) {
      console.error(e);
    }

    attrs = Array.isArray(attrs) ? attrs : [attrs];

    var map = attrs.map(function (els) {
      var value = els.split('=');
      return value[0].toLowerCase() + '=' + value[1];
    }).filter(function (value) {
      return value.substr(0, 4) !== 'src=';
    });

    return map;
  }),

  /**
   * @method applySvg
   * Using text, such as innerHTML, find and replace <svg src=".."> tags
   * with the appropriate SVG file content. This is a pre-render method.
   * @param {string} source
   * The source text.
   * @param {function} callback
   * Executed when the SVG content has been completely applied to the source
   * string.
   * @param {string} callback.content
   * The final output.
   * @returns {string}
   * The updated content.
   * @private
   */
  applySvg: NGN.privateconst(function (src, callback) {
    var _this15 = this;

    var tags = this.getSvgReferences(src);
    tags.forEach(function (url) {
      var re = new RegExp('<svg.*src=(\'|\")' + url + '(\'|\").*(svg|\/|\"|\')>', 'gi'); // eslint-disable-line no-useless-escape
      // let re = new RegExp('<svg.*src=(\'|\")' + url + '(\'|\").*>', 'gi')
      var code = re.exec(src);
      var ct = 0;

      if (!_this15._cache.hasOwnProperty(url)) {
        console.warn('Invalid SVG content for ' + url);
      } else {
        var _loop2 = function _loop2() {
          var source = _this15._cache[url];
          var firstLine = source.split(/>\s{0,100}</i)[0] + '>';
          var sourceattrs = _this15.getAttributes(firstLine);
          var newattrs = _this15.getAttributes(code[0]);

          sourceattrs = sourceattrs.filter(function (a) {
            var match = newattrs.filter(function (na) {
              return na.toLowerCase().indexOf(a.split('=')[0].toLowerCase()) === 0;
            });

            return match.length === 0;
          });

          var attr = newattrs.concat(sourceattrs);

          source = source.replace(firstLine, '<svg ' + attr.join(' ') + '>');
          src = src.replace(code[0], source);
          code = re.exec(src);
          ct++;
        };

        while (code !== null && ct < 200) {
          _loop2();
        }
      }
    });

    callback(src);
  }),

  /**
   * @method id
   * @param  {string} url
   * Create an ID that can be used to reference an SVG symbol.
   * @return {string}
   * @private
   */
  id: NGN.privateconst(function (url) {
    return url.replace(/.*\:\/\/|[^A-Za-z0-9]|www/gi, ''); // eslint-disable-line no-useless-escape
  }),

  /**
   * @method cleanCode
   * Captures all of the content between the <svg></svg> tag.
   * @param  {string} code
   * The code to clean up.
   * @return {string}
   * @private
   */
  cleanCode: NGN.privateconst(function (code) {
    try {
      return code.toString().trim().replace(/(\r\n|\n|\r)/gm, '').replace(/\s+/g, ' ').match(/\<svg.*\<\/svg\>/igm, '')[0]; // eslint-disable-line no-useless-escape
    } catch (e) {
      return '';
    }
  }),

  /**
   * @method viewbox
   * Retrieves the viewbox attribute from the source code.
   * @param  {string} code
   * The code to extract the viewbox attribute from.
   * @return {string}
   * @private
   */
  viewbox: NGN.privateconst(function (code) {
    return (/(viewbox=["'])(.*?)(["'])/igm.exec(code.toString().trim())[2] || '0 0 100 100'
    );
  }),

  cache: NGN.private(function (url, svg) {
    this._cache[url] = svg;
  }),

  fetchFile: NGN.private(function (url, callback) {
    if (!callback) {
      return;
    }

    if (!NGN.nodelike || url.indexOf('http') === 0 || window !== undefined) {
      var me = this;
      NGN.NET.get(url, function (res) {
        if (NGN.isFn(callback)) {
          if (res.status === 200) {
            if (res.responseText.indexOf('<svg') < 0) {
              callback(new Error(url + ' does not contain valid SVG content.'));
            } else {
              callback(me.cleanCode(res.responseText));
            }
          } else {
            callback(new Error(res.responseText));
          }
        }
      });
    } else {
      var content = '';

      try {
        content = require('fs').readFileSync(require('path').resolve(url).replace('file://', '')).toString();
      } catch (e) {
        try {
          content = require('fs').readFileSync(require('path').resolve(__dirname, url).replace('file://', '')).toString();
        } catch (ee) {}
      }

      callback(content);
    }
  }),

  getSvgReferences: NGN.privateconst(function (html) {
    var re = /<svg.*\/(svg>|>)/mig;
    var urls = [];
    var code = re.exec(html);

    while (code !== null) {
      html = html.replace(new RegExp(code[0], 'gim'), '');

      // let url = /src=(\'|\")(.*)(\'|\")/i.exec(code[0])[2]
      var url = /src=(\'|\")(.*)(\'|\")/i.exec(code[0])[2].split(' ')[0].replace(/\"|\'/gi, ''); // eslint-disable-line no-useless-escape

      if (urls.indexOf(url) < 0) {
        urls.push(url);
      }

      re.exec(html);
      code = re.exec(html);
    }

    return urls;
  }),

  precache: NGN.privateconst(function (urlList, callback) {
    var _this16 = this;

    var remaining = urlList.length;

    urlList.forEach(function (url) {
      _this16.fetchFile(url, function (content) {
        if (!(content instanceof Error)) {
          _this16.cache(url, content);
        }

        remaining--;
      });
    });

    if (remaining === 0) {
      return callback();
    }

    var monitor = setInterval(function () {
      if (remaining === 0) {
        clearInterval(monitor);
        callback();
      }
    }, 5);
  }),

  /**
   * @method update
   * Replace any <img src="*.svg"> with the SVG equivalent.
   * @param {HTMLElement|NodeList} section
   * The HTML DOM element to update. All children of this element will also be updated.
   * @param {function} callback
   * Execute this function after the update is complete.
   */
  update: NGN.const(function (section, callback) {
    var _this17 = this;

    if (typeof section === 'function') {
      callback = section;
      section = document.body;
    } else {
      section = section || document.body;
    }

    // If the section is text (i.e. not yet rendered to DOM),
    // replace via regex.
    if (typeof section === 'string') {
      var newtags = this.getSvgReferences(section).filter(function (url) {
        return !_this17._cache[url];
      });

      this.precache(newtags, function () {
        _this17.applySvg(section, callback);
      });

      return;
    }

    // If the node is text, there are no SVG tags.
    if (section.nodeName === '#text') {
      return;
    }

    section = section.hasOwnProperty('length') === true ? NGN.splice(section) : [section];

    section.forEach(function (sec) {
      var imgs = sec.querySelectorAll('svg[src]');
      var newtags = [];

      // Loop through images, prime the cache.
      for (var i = 0; i < imgs.length; i++) {
        var urls = _this17.getSvgReferences(imgs[i].outerHTML);
        urls.forEach(function (url) {
          if (!_this17._cache[url] && newtags.indexOf(url) < 0) {
            newtags.push(url);
          }
        });
      }

      _this17.precache(newtags, function () {
        _this17.swap(sec, callback);
      });
    });
  })
});

'use strict';

NGN.Task = function () {
  /**
   * @class NGN.Task
   * Represents a unit of work as a function. A task "executes"
   * when it's callback method is executed.
   * @fires start
   * Triggered when task execution begins. The task itself is provided
   * as an argument to the event handler.
   * @fires complete
   * Triggered when task execution finishes. The task itself is provided
   * as an argument to the event handler.
   * @fires skip
   * Triggered when task is skipped. The task itself is provided
   * as an argument to the event handler.
   * @fires timeout
   * Triggered when task execution time exceeds the specified timeout
   * limit. The task itself is provided as an argument to the event handler.
   */
  var QueueItem = function (_NGN$EventEmitter2) {
    _inherits(QueueItem, _NGN$EventEmitter2);

    function QueueItem(config) {
      _classCallCheck(this, QueueItem);

      config = config || {};

      var _this18 = _possibleConstructorReturn(this, (QueueItem.__proto__ || Object.getPrototypeOf(QueueItem)).call(this, config));

      Object.defineProperties(_this18, {
        /**
         * @cfg {string} name
         * Descriptive name of the worker.
         */
        name: NGN.const(NGN.coalesce(config.name, 'Unknown')),

        /**
         * @cfg {function} callback
         * The method to execute when the queue is ready.
         */
        callback: NGN.privateconst(config.callback),

        /**
         * @cfg {number} number
         * The queue item number. This is used primarily as an ID.
         */
        number: NGN.const(parseInt(config.number, 10)),

        timer: NGN.private(null),
        _status: NGN.private(null),
        bus: NGN.private(config.buz),
        _skip: NGN.private(false)
      });

      _this18.on('timeout', function () {
        _this18._status = 'timedout';
      });

      _this18.on('skip', function () {
        _this18._status = 'skipped';
      });
      return _this18;
    }

    /**
     * @property {string} status
     * May be `running`, `complete`, or `null` (not run yet)
     */


    _createClass(QueueItem, [{
      key: 'run',


      /**
       * @method run
       * Execute the callback function.
       * @param {string} mode
       * `dev` or `prod`. When in "dev" mode, verbose output is written
       * to the console.
       */
      value: function run(mode) {
        if (this.skipped) {
          this.emit('skip', this);

          if (mode && mode === 'dev') {
            console.warn('SKIPPED ' + this.name);
          }

          return;
        }

        this.emit('start', this);

        if (mode && mode === 'dev') {
          console.info('Executing ' + this.name + ':');
        }

        this._status = 'running';

        var me = this;
        var scope = {
          name: this.name,
          number: this.number,
          timeout: function timeout(milliseconds) {
            me.timer = setTimeout(function () {
              me.emit('timeout', me);
            }, milliseconds);
          }
        };

        this.callback.apply(scope, [function () {
          me._status = 'complete';
          me.emit('complete', me);
        }]);

        if (this.callback.length === 0) {
          me._status = 'complete';
          me.emit('complete', me);
        }
      }

      /**
       * @method skip
       * Skip this item
       */

    }, {
      key: 'skip',
      value: function skip() {
        if (this._status === 'running') {
          console.warn('Cannot skip step: ' + this.name + ' is currently running.');
        } else if (this._status === 'timedout') {
          console.warn('Cannot skip step: ' + this.name + ' timed out.');
        } else if (this._status === 'complete') {
          console.warn('Cannot skip step: ' + this.name + ' already completed.');
        }

        this._skip = true;
      }
    }, {
      key: 'status',
      get: function get() {
        return this._status;
      }

      /**
       * @property {boolean} skipped
       * `true` to skip the step, `false` to execute it.
       */

    }, {
      key: 'skipped',
      get: function get() {
        return this._skip;
      }
    }]);

    return QueueItem;
  }(NGN.EventEmitter);

  return QueueItem;
};

NGN.Task = NGN.Task();

if (NGN.nodelike) {
  module.exports = NGN.Task;
}

'use strict';

NGN.Tasks = function () {
  /**
   * @class NGN.Tasks
   * A job runner/collection capable of parallel and sequential task processing.
   * @fires complete
   * Triggered when the entire collection of tasks has completed
   * processing/running.
   * @fires aborted
   * Triggered when processing is aborted before completion.
   * @fires aborting
   * Triggered when the abort sequence begins.
   * @fires timeout
   * Triggered when processing times out.
   * @fires taskstart
   * Triggered whenever a new task is started. The NGN.Task is
   * the only argument delivered to event handlers.
   * @fires taskcomplete
   * Triggered whenever a task completes processing. The NGN.Task is
   * the only argument delivered to event handlers.
   * @fires taskcreate
   * Triggered when a new NGN.Task is added to the queue. The NGN.Task is
   * the only argument delivered to event handlers.
   * @fires taskremove
   * Triggered when a NGN.Task is removed from the queue. The NGN.Task is
   * the only argument delivered to event handlers.
   * @fires tasktimeout
   * Triggered when an NGN.Task times out during processing. The NGN.Task is
   * the only argument delivered to event handlers.
   */
  var TaskRunner = function (_NGN$EventEmitter3) {
    _inherits(TaskRunner, _NGN$EventEmitter3);

    /**
     * @constructor
     * @param {string} [mode=production]
     * Set this to `dev` for verbose console output.
     */
    function TaskRunner() {
      var mode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'production';

      _classCallCheck(this, TaskRunner);

      var _this19 = _possibleConstructorReturn(this, (TaskRunner.__proto__ || Object.getPrototypeOf(TaskRunner)).call(this));

      Object.defineProperties(_this19, {
        steps: NGN.private([]),
        completed: NGN.private(0),
        timeout: NGN.private(null),
        _mode: NGN.private(mode),
        _cancel: NGN.private(false),
        processing: NGN.private(false),
        timer: NGN.private(null),
        sequential: NGN.private(false)
      });

      _this19.on('taskcomplete', function (step) {
        // Disallow duplicates
        if (_this19.sequential || step.status === 'completed') {
          return;
        }

        step._status = 'complete';

        // When the step is done, tally it
        _this19.completed++;

        if (_this19.mode === 'dev') {
          console.info(step.name + ' completed.');
        }

        // If all of the queries have been tallied, we're done.
        if (_this19.completed === _this19.steps.length) {
          _this19.processing = false;

          Object.keys(_this19.steps).forEach(function (step) {
            clearTimeout(_this19.steps[step].timer);
          });

          _this19.emit('complete');
        }
      });

      _this19.on('aborting', function () {
        _this19._cancel = true;
      });
      return _this19;
    }

    /**
     * @property {Array} list
     * A list of tasks within the collection. This is an array of
     * objects, where each object contains the `id`, `name`, and
     * `status` of the task.
     *
     * ```js
     * {
     *   id: <Number>,
     *   name: <String>,
     *   status: <String>
     * }
     * ```
     */


    _createClass(TaskRunner, [{
      key: 'onTimeout',
      value: function onTimeout() {
        var log = [];

        if (this.steps.length > 0) {
          this.steps.forEach(function (s) {
            log.push(s.name, s.status === null ? 'NOT STARTED' : s.status);
          });
        }

        this.emit('timeout', {
          process: log
        });

        log = null;
      }

      /**
       * @method add
       * Add a task to the list.
       * @param {string} [name]
       * A descriptive name for the queued process/task.
       * @param {function} callback
       * The function to queue.
       * @param {function} callback.next
       * This argument allows users to explicitly use asynchronous
       * methods. Example:
       *
       * ```
       * let tasks = new NGN.Tasks()
       *
       * tasks.add('Descriptive Title', function (next) {
       *   myAsyncMethod(function () {
       *     console.log('Ran something async.')
       *     next()
       *   })
       * })
       */

    }, {
      key: 'add',
      value: function add(name, fn) {
        var _this20 = this;

        if (this.processing) {
          return console.warn('Cannot add a step while processing.');
        }

        if (typeof name === 'function') {
          fn = name;
          name = 'Step ' + (parseInt(this.steps.length) + 1);
        }

        if (typeof fn !== 'function') {
          throw new Error('No processing method defined for step ' + (parseInt(this.steps.length) + 1) + '.');
        }

        var me = this;
        var queue = new NGN.Task({
          name: name,
          callback: fn,
          number: (this.steps.length > 0 ? this.steps[this.steps.length - 1].number : 0) + 1
        });

        queue.on('complete', function (step) {
          return _this20.emit('taskcomplete', step);
        });

        queue.on('timeout', function (step) {
          if (step.status === 'running' || step.status === 'timedout') {
            _this20.emit('tasktimeout', step);
          }
        });

        this.steps.push(queue);
        this.emit('taskcreate', queue);
      }

      /**
       * @method getAt
       * @param  {number} index
       * Retrieve a queue item by it's index/queue number.
       * @return {Queue}
       */

    }, {
      key: 'getAt',
      value: function getAt(index) {
        return this.steps[index];
      }

      /**
       * @method get
       * Retrieve a specific queue item.
       * @param  {string} requestedStepTitle
       * The descriptie name of the queue item to retrieve.
       * @return {Queue}
       */

    }, {
      key: 'get',
      value: function get(requestedStep) {
        // Get by Name
        var element = this.steps.filter(function (step) {
          return step.name === requestedStep;
        });

        if (element.length === 1) {
          return element[0];
        }

        // Get by index
        element = this.steps.filter(function (step) {
          return step.number === requestedStep;
        });

        if (element.length === 1) {
          return element[0];
        }
      }

      /**
       * @method remove
       * Remove a queue item by name or number.
       * @param  {string} requestedStepTitle
       * The descriptive name of the queue item to retrieve.
       * @return {Queue}
       * Returns the item that was removed.
       */

    }, {
      key: 'remove',
      value: function remove(requestedStep) {
        if (this.processing) {
          return console.warn('Cannot add a step while processing.');
        }

        // Remove by name
        var element = this.steps.filter(function (step) {
          return step.name === requestedStep;
        });

        if (element.length === 1) {
          this.steps = this.steps.filter(function (step) {
            return step.name !== requestedStep;
          });

          this.emit('taskremove', element[0]);
          return element[0];
        }

        // Remove by ID
        element = this.steps.filter(function (step) {
          return step.number === requestedStep;
        });

        if (element.length === 1) {
          this.steps = this.steps.filter(function (step) {
            return step.number !== requestedStep;
          });

          this.emit('taskremove', element[0]);
          return element[0];
        }
      }

      /**
       * @method removeAt
       * Removes a queue item from the specific index.
       * @param  {number} requestedStepIndex
       * The queue index/number.
       * @return {Queue}
       * Returns the item that was removed.
       */

    }, {
      key: 'removeAt',
      value: function removeAt(requestedStep) {
        if (this.processing) {
          return console.warn('Cannot add a step while processing.');
        }

        // Remove by index
        if (typeof requestedStep !== 'number') {
          return console.error('Failed to remove step: ' + requestedStep);
        }

        if (requestedStep < 0 || requestedStep >= this.steps.length) {
          return console.error('Step index ' + requestedStep + ' could not be found or does not exist.');
        }

        return this.steps.splice(requestedStep, 1)[0];
      }

      /**
       * @method reset
       * Resets all cancelled/skipped steps, essentially resetting the queue
       * to it's pre-aborted state.
       */

    }, {
      key: 'reset',
      value: function reset() {
        if (this.processing) {
          return console.warn('Cannot reset a running queue. Abort or wait for the process to complete before resetting.');
        }

        // Refresh cancelled steps
        this.steps.forEach(function (step) {
          step._skip = false;
        });
      }

      /**
       * @method process
       * Run the queued processes in order.
       * @param {boolean} [sequential=false]
       * Set to `true` to run the queue items in a synchronous-like manner.
       * This will execute each method one after the other. Each method must
       * complete before the next is started.
       */

    }, {
      key: 'process',
      value: function process(sequential) {
        var _this21 = this;

        if (this.processing) {
          return console.warn('Cannot start processing (already running). Please wait for this process to complete before calling process() again.');
        }

        if (this.steps.length === 0) {
          return this.emit('complete');
        }

        this.processing = true;
        this._cancel = false;

        if (this.timeout !== null) {
          this.timer = setTimeout(function () {
            return _this21.onTimeout();
          }, this.timeout);
        }

        this.sequential = typeof sequential === 'boolean' ? sequential : false;
        if (!this.sequential) {
          for (var i = 0; i < this.steps.length; i++) {
            this.steps[i].run(this.mode);
          }
        } else {
          var queue = this.steps;
          var listener = new NGN.EventEmitter();

          listener.on('taskcomplete', function () {
            if (queue.length > 0) {
              var currentTask = queue.shift();

              if (currentTask.skipped) {
                return listener.emit('taskcomplete');
              }

              currentTask.on('complete', function () {
                return listener.emit('taskcomplete');
              });
              currentTask.on('start', function () {
                return _this21.emit('taskstart', currentTask);
              });

              currentTask.run(_this21.mode);
            } else {
              _this21.emit('complete');
            }
          });

          var currentStep = queue.shift();

          currentStep.on('complete', function () {
            return listener.emit('taskcomplete');
          });
          currentStep.on('start', function () {
            return _this21.emit('taskstart', currentStep);
          });

          currentStep.run(this.mode);
        }
      }

      // Alias for process

    }, {
      key: 'run',
      value: function run() {
        this.process.apply(this, arguments);
      }

      /**
       * @method abort
       * Abort/cancel processing. This prevents further steps from processing.
       */

    }, {
      key: 'abort',
      value: function abort() {
        var _this22 = this;

        this.emit('aborting');

        // Make sure the steps are skipped.
        this.each(function (step) {
          if (['completed', 'running', 'timedout'].indexOf(step.status) < 0 && !step.skipped) {
            step.skip();
          }
        });

        this.once('complete', function () {
          return _this22.emit('aborted');
        });
      }

      /**
       * @method each
       * Apply a method to each step.
       * @param {function} method
       * @private
       */

    }, {
      key: 'each',
      value: function each(fn) {
        for (var i = 0; i < this.steps.length; i++) {
          fn(this.steps[i]);
        }
      }

      // Alias for abort

    }, {
      key: 'cancel',
      value: function cancel() {
        this.abort.apply(this, arguments);
      }
    }, {
      key: 'list',
      get: function get() {
        return this.steps.map(function (s) {
          return {
            id: s.number,
            name: s.name,
            status: s.status
          };
        });
      }

      /**
       * @property {string} mode
       * The type of processing (dev, production, etc). Setting this to
       * `dev` enables verbose logging.
       */

    }, {
      key: 'mode',
      get: function get() {
        return this._mode;
      },
      set: function set(value) {
        if (value.toLowerCase().substr(0, 3) === 'dev') {
          this._mode = 'dev';
        } else {
          this._mode = 'production';
        }
      }
    }, {
      key: 'cancelled',
      get: function get() {
        return this._cancel;
      }
    }]);

    return TaskRunner;
  }(NGN.EventEmitter);

  return TaskRunner;
};

NGN.Tasks = NGN.Tasks();

if (NGN.nodelike) {
  module.exports = NGN.Tasks;
}

'use strict';

NGN.DATA = NGN.DATA || {};
NGN.DATA.util = {};

Object.defineProperties(NGN.DATA.util, {
  // CRC table for checksum (cached)
  crcTable: NGN.private(null),

  /**
   * @method makeCRCTable
   * Generate the CRC table for checksums. This is a fairly complex
   * operation that should only be executed once and cached for
   * repeat use.
   * @private
   */
  makeCRCTable: NGN.privateconst(function () {
    var c = void 0;
    var crcTable = [];
    for (var n = 0; n < 256; n++) {
      c = n;
      for (var k = 0; k < 8; k++) {
        c = c & 1 ? 0xEDB88320 ^ c >>> 1 : c >>> 1;
      }
      crcTable[n] = c;
    }
    return crcTable;
  }),

  /**
   * @method checksum
   * Create the checksum of the specified string.
   * @param  {string} content
   * The content to generate a checksum for.
   * @return {string}
   * Generates a checksum value.
   */
  checksum: NGN.const(function (str) {
    var crcTable = this.crcTable || (this.crcTable = this.makeCRCTable());
    var crc = 0 ^ -1;

    for (var i = 0; i < str.length; i++) {
      crc = crc >>> 8 ^ crcTable[(crc ^ str.charCodeAt(i)) & 0xFF];
    }

    return (crc ^ -1) >>> 0;
  }),

  /**
   * @method GUID
   * Generate  a globally unique identifier.
   *
   * This is a "fast" GUID generator, designed to work in the browser.
   * The likelihood of an ID collision is 1:3.26x10^15 (1 in 3.26 Quadrillion),
   * and it will generate the ID between approximately 105ms (Desktop) and 726ms
   * (Android) as of May 2016. This code came from StackOverflow, courtesy of
   * an answer from Jeff Ward.
   * @return {string}
   * Returns a V4 GUID.
   */
  GUID: NGN.const(function () {
    var lut = [];
    for (var i = 0; i < 256; i++) {
      lut[i] = (i < 16 ? '0' : '') + i.toString(16);
    }

    var d0 = Math.random() * 0xffffffff | 0;
    var d1 = Math.random() * 0xffffffff | 0;
    var d2 = Math.random() * 0xffffffff | 0;
    var d3 = Math.random() * 0xffffffff | 0;

    return lut[d0 & 0xff] + lut[d0 >> 8 & 0xff] + lut[d0 >> 16 & 0xff] + lut[d0 >> 24 & 0xff] + '-' + lut[d1 & 0xff] + lut[d1 >> 8 & 0xff] + '-' + lut[d1 >> 16 & 0x0f | 0x40] + lut[d1 >> 24 & 0xff] + '-' + lut[d2 & 0x3f | 0x80] + lut[d2 >> 8 & 0xff] + '-' + lut[d2 >> 16 & 0xff] + lut[d2 >> 24 & 0xff] + lut[d3 & 0xff] + lut[d3 >> 8 & 0xff] + lut[d3 >> 16 & 0xff] + lut[d3 >> 24 & 0xff];
  })

  // /**
  //  * @method objectByteSize
  //  * Calculates the _estimated_ size (in bytes) of primitive key/value objects,
  //  * meaning those that do not contain functions, accessors (getters/setters),
  //  * or other attributes other than `String`, `Number`, or `Boolean` values.
  //  * NGN treats dates as `String` values.
  //  *
  //  * JavaScript engines differ in how they manage memory, but most do not
  //  * calculate the size of functions. If a value of type `function` is found in
  //  * the object, NGN will calculate the size of it's `String` representation.
  //  * This is a weak measure of function size since most JavaScript engines
  //  * do not expose enough realtime heap data to know calculate with accuracy at
  //  * any given point in time.
  //  *
  //  * This method attempts to implement similar principles to C's `sizeOf` method.
  //  *
  //  * Consider this method to provide a **best guess based on the data we have
  //  * available**.
  //  *
  //  * @param {Object} object
  //  * The primitive key/value object upon which the bytesize estimation will be made.
  //  * @param {Boolean} [ignoreFunctionEstimate=false]
  //  * By default, NGN will calculate the `String` representation of any functions
  //  * it encounters in the key/value object. Setting this to `true` will prevent
  //  * this behavior, effectively using a `0` to calculate function size.
  //  */
  // objectByteSize: NGN.const(function (obj, ignore=false) {
  //   switch (typeof obj) {
  //     case 'string':
  //       return obj.length * 2
  //
  //     case 'boolean':
  //       return 4
  //
  //     case 'number':
  //       return 8
  //
  //     case 'function':
  //       if (!ignore) {
  //         return obj.toString().length * 2
  //       }
  //
  //       return 0
  //   }
  //
  //   let list = []
  //   let stack = [obj]
  //   let bytes = 0
  //
  //   while (stack.length) {
  //     let value = stack.pop()
  //
  //     if (typeof value === 'object') {
  //       if (list.indexOf(value) < 0) {
  //         list.push(value)
  //
  //         // If the object is not an array, add key sizes
  //         const isArray = !Array.isArray(value)
  //
  //         for (let key in value) {
  //           if (!isArray) {
  //             bytes += (2 * key.length) + NGN.DATA.util(value[key])
  //             stack.push(value[key])
  //           } else {
  //
  //           }
  //         }
  //       }
  //     } else {
  //       bytes += NGN.DATA.util.objectByteSize(value)
  //     }
  //   }
  //
  //   return bytes
  // })
});

'use strict';

/**
 * @class NGN.DATA.Model
 * Represents a data model/record.
 * @extends NGN.Class
 * @fires field.update
 * Fired when a datafield value is changed.
 * @fires field.create
 * Fired when a datafield is created.
 * @fires field.remove
 * Fired when a datafield is deleted.
 * @fires field.invalid
 * Fired when an invalid value is detected in an data field.
 */

var NgnDataModel = function (_NGN$EventEmitter4) {
  _inherits(NgnDataModel, _NGN$EventEmitter4);

  function NgnDataModel(config) {
    _classCallCheck(this, NgnDataModel);

    config = config || {};

    var _this23 = _possibleConstructorReturn(this, (NgnDataModel.__proto__ || Object.getPrototypeOf(NgnDataModel)).call(this));

    Object.defineProperties(_this23, {
      /**
       * @cfg {String} [idAttribute='id']
       * Setting this allows an attribute of the object to be used as the ID.
       * For example, if an email is the ID of a user, this would be set to
       * `email`.
       */
      idAttribute: NGN.privateconst(config.idAttribute || 'id'),

      /**
       * @cfg {object} fields
       * A private object containing the data fields of the model, including
       * validators & default values.
       * ```js
       * fields: {
       *   fieldname: {
       *     required: true,
       *     type: String,
       *     default: 'default field value'
       *   },
       *   fieldname2: null // Uses default field config (default value is null)
       * }
       * ```
       */
      /**
       * @datafield {string} [id=null]
       * The unique ID of the person.
       */
      fields: NGN.private(config.fields || {
        id: {
          required: true,
          type: String,
          'default': config.id || null
        }
      }),

      /**
       * @cfg {object} metaFields
       * Meta fields are configured exactly the same way as #fields,
       * except they're "hidden". They are explicity excluded from #data,
       * #representation, #relationships, and any other type of data.
       * However; these fields can be referenced by data proxies, #virtuals,
       * or extensions to the NGN.DATA.Model class.
       */
      hiddenFields: NGN.private(NGN.coalesce(config.metaFields)),

      /**
       * @cfg {object|NGN.DATA.Model|NGN.DATA.Store} relationships
       * An object containing fields that reference another data set. This can
       * contain a configuration, an NGN.DATA.Model, or an NGN.DATA.Store.
       * ```js
       * // Metadata
       * relationships: {
       *   fieldname: {
       *     required: true,
       *     ref: MyModel
       *   },
       *   fieldname2: {
       *     required: false,
       *     ref: MyDataStore,
       *     default: {}
       *   }
       * }
       * // or
       * relationships: {
       *   fieldname: MyModel
       * }
       * ```
       * Using the second syntax assumes the field **is required**.
       *
       * It is then possible to reference a join by the fieldname. For example:
       *
       * ```js
       * console.log(MyModel.fieldname.data) // Displays the MyModel data.
       * ```
       * @type {[type]}
       */
      joins: NGN.private(config.relationships || {}),

      /**
       * @cfg {Object} virtuals
       * A private object containing virtual data attributes and generated data.
       * Virtual datafields are derived values. They are not part of the
       * underlying data.
       *
       * **Example:**
       *
       * ```js
       * let Model = new NGN.DATA.Model({
       *   fields: {
       *     dateOfBirth: null
       *   },
       *   virtuals: {
       *     age: function () {
       *       return YearsApart(new Date(), this.dateOfBirth)
       *     }
       *   }
       * })
       * ```
       * The `age` example above compares the `dateOfBirth` field
       * to the current date, expecting a numeric response.
       * @private
       */
      virtuals: NGN.private(config.virtuals || {}),

      /**
       * @property {Object}
       * The validation rules used to verify data integrity when persisting to a datasource.
       * @private
       */
      validators: NGN.private({}),

      /**
       * @cfgproperty {boolean} [validation=true]
       * Toggle data validation using this.
       */
      validation: NGN.public(NGN.coalesce(config.validation, true)),

      /**
       * @property {Boolean}
       * Indicates the model is new or does not exist according to the persistence store.
       * @private
       * @readonly
       */
      isNew: NGN.private(true),

      /**
       * @property {Boolean}
       * Indicates the model has been destroyed/deleted and should no longer exist.
       * @private
       * @readonly
       */
      isRecordDestroyed: NGN.private(false),

      /**
       * @property {String} [oid=null]
       * The raw object ID, which is either the #id or #idAttribute depending
       * on how the object is configured.
       * @private
       */
      oid: NGN.private(config[_this23.idAttribute] || null),

      /**
       * @cfg {boolean} [autoid=false]
       * If the NGN.DATA.Model#idAttribute/id is not provided for a record,
       * unique ID will be automatically generated for it. This means there
       * will not be a `null` ID.
       *
       * An NGN.DATA.Store using a model with this set to `true` will never
       * have a duplicate record, since the #id or #idAttribute will always
       * be unique.
       */
      autoid: NGN.public(NGN.coalesce(config.autoid, false)),

      /**
       * @cfg {String} [autoidPrefix]
       * Prefix all automatically generated ID's with this prefix.
       */
      autoidPrefix: NGN.public(NGN.coalesce(config.autoidPrefix)),

      /**
       * @cfg {String} [autoidPostfix]
       * Apply this string to the end of every generated ID..
       */
      autoidPostfix: NGN.public(NGN.coalesce(config.autoidPostfix)),

      benchmark: NGN.private(null),

      /**
       * @cfgproperty {Date|Number} [expires]
       * When this is set to a date/time, the model record will be marked
       * as expired at the specified time/date. If a number is specified
       * (milliseconds), the record will be marked as expired after the
       * specified time period has elapsed. When a record/model is marked as
       * "expired", it triggers the `expired` event. By default, expired
       * records/models within an NGN.DATA.Store will be removed from the store.
       *
       * Setting this to any value less than `0` disables expiration.
       * @fires expired
       * Triggered when the model/record expires.
       */
      expiration: NGN.private(null),

      // Used to hold a setTimeout method for expiration events.
      expirationTimeout: NGN.private(null),

      // Placeholder expiration flag.
      hasExpired: NGN.private(false),

      // Used to prevent expiration of a record.
      ignoreTTL: NGN.private(false),

      /**
       * @property {Number} created
       * The date/time when the model is created. This is represented as
       * the number of milliseconds since the epoch (Jan 1, 1970, 00:00:00 UTC).
       * @private
       */
      createDate: NGN.privateconst(Date.now()),

      /**
       * @method setUnmodified
       * This method forces the model to be viewed as unmodified, as though
       * the record was just loaded from it's source. This method should only
       * be used when custom loading data. The #load method automatically
       * invokes this when record data is loaded. This also clears the history,
       * just as if the record is brand new.
       * @private
       */
      setUnmodified: NGN.privateconst(function () {
        this.benchmark = this.checksum;
        this.changelog = [];
      }),

      /**
       * @cfg {Boolean} [allowInvalidSave=false]
       * Set this to true to allow a save even though not all of the data properties
       * pass validation tests.
       */
      allowInvalidSave: NGN.private(NGN.coalesce(config.allowInvalidSave, false)),

      /**
       * @cfg {Boolean} [disableDataValidation=false]
       * Only used when #save is called. Setting this to `true` will bypass data validation.
       */
      disableDataValidation: NGN.private(NGN.coalesce(config.disableDataValidation, false)),

      invalidDataAttributes: NGN.private([]),

      initialDataAttributes: NGN.private([]),

      /**
       * @property {array} changelog
       * An ordered array of changes made to the object data properties.
       * This cannot be changed manually. Instead, use #history
       * and #undo to manage this list.
       * @private
       */
      changelog: NGN.private([]),

      _nativeValidators: NGN.privateconst({
        min: function min(minimum, value) {
          if (NGN.typeof(value) === 'array') {
            return value.length >= minimum;
          }

          if (NGN.typeof(value) === 'number') {
            return value >= minimum;
          }

          if (NGN.typeof(value) === 'string') {
            return value.trim().length >= minimum;
          }

          if (NGN.typeof(value) === 'date') {
            return value.parse() >= minimum.parse();
          }

          return false;
        },

        max: function max(maximum, value) {
          if (NGN.typeof(value) === 'array') {
            return value.length <= maximum;
          }

          if (NGN.typeof(value) === 'number') {
            return value <= maximum;
          }

          if (NGN.typeof(value) === 'string') {
            return value.trim().length <= maximum;
          }

          if (NGN.typeof(value) === 'date') {
            return value.parse() <= maximum.parse();
          }

          return false;
        },

        enum: function _enum(valid, value) {
          return valid.indexOf(value) >= 0;
        },

        required: function required(field, value) {
          return _this23.hasOwnProperty(field) && _this23[value] !== null;
        }
      }),

      /**
       * @cfgproperty {Object} dataMap
       * An object mapping model attribute names to data storage field names.
       *
       * _Example_
       * ```
       * {
       *   father: 'dad',
       *	 email: 'eml',
       *	 image: 'img',
       *	 displayName: 'dn',
       *	 firstName: 'gn',
       *	 lastName: 'sn',
       *	 middleName: 'mn',
       *	 gender: 'sex',
       *	 dob: 'bd',
       * }
       * ```
       */
      _dataMap: NGN.private(config.dataMap || null),
      _reverseDataMap: NGN.public(null),

      /**
       * @property {object} raw
       * The raw data.
       * @private
       */
      raw: NGN.private({}),

      /**
       * @property {object} rawjoins
       * The related data models/stores.
       * @private
       */
      rawjoins: NGN.private({}),

      _store: NGN.private(null),

      /**
       * @cfg {NGN.DATA.Proxy} proxy
       * The proxy used to transmit data over a network. This is more commonly
       * used with the NGN.DATA.Store instead of the Model, but this exists for
       * situations where a single model instance represents the entire data set,
       * such as simple user preferences or settings. **This overrides store proxies!**
       *
       * If this Model is added to a NGN.DATA.Store and the store has it's own proxy,
       * this proxy will override it. For example:
       *
       * ```js
       * let myRecord = new NGN.DATA.Model({
       *   fields: {...},
       *   proxy: new NGNX.DATA.SomeDatabaseProxy() // <-- NOTICE
       * })
       *
       * let myStore = new NGN.DATA.Store({
       *   model: myRecord,
       *   proxy: new NGNX.DATA.SomeOtherProxy() // <-- NOTICE
       * })
       *
       * myStore.add(new myRecord({
       *   field: value,
       *   field2: value
       * }))
       *
       * myStore.save() // This executes NGNX.DATA.SomeDatabaseProxy.save()
       * ```
       *
       * This is the **least** efficient way to deal with bulk records. If you are
       * dealing with multiple records, a proxy should be applied to the NGN.DATA.Store,
       * not the NGN.DATA.Model.
       *
       * A better case for this proxy are independent models representing
       * key/value stores. For example:
       *
       * ```js
       * let userPreferences = new NGN.DATA.Model({
       *   fields: {
       *     alwaysDoThis: Boolean,
       *     neverDoThat: Boolean
       *   },
       *   proxy: new NGNX.DATA.SomeDatabaseProxy()
       * })
       *
       * userPreferences.save()
       * ```
       *
       * Notice this example contains no store, just a model. In this scenario, the model
       * represents the entire data set, so no store is necessary.
       */
      _proxy: NGN.private(config.proxy || null),

      /**
       * @cfgproperty {boolean} [proxyignore=false]
       * A placeholder to determine whether data proxies should
       * ignore the record or not. By default, proxies will operate
       * on the record (set this to true to prevent proxy action on the model).
       */
      proxyignore: NGN.private(NGN.coalesce(config.proxyignore, false))
    });

    // Make sure the ID field exists.
    if (NGN.coalesce(_this23.idAttribute, '') !== 'id' && !_this23.fields.hasOwnProperty(_this23.idAttribute)) {
      console.warn(_this23.idAttribute + ' is specified as the ID, but it is not defined in the fields.');
    }

    // Add proxy support for independent models
    if (config.proxy) {
      if (_this23._proxy instanceof NGN.DATA.Proxy) {
        _this23._proxy.init(_this23);
      } else {
        throw new Error('Invalid proxy configuration.');
      }
    }

    // Make sure there aren't duplicate field names defined (includes joins)
    var allfields = _this23.datafields.concat(_this23.virtualdatafields).concat(_this23.relationships).filter(function (key, i, a) {
      return a.indexOf(key) !== i;
    });

    if (allfields.length > 0) {
      throw new Error('Duplicate field names exist: ' + allfields.join(', ') + '. Unique fieldnames are required for data fields, virtuals, and relationship fields.');
    }

    // Make sure an ID reference is available.
    if (!_this23.fields.hasOwnProperty('id')) {
      config.fields.id = {
        required: true,
        type: String,
        'default': config.id || null
      };
    }

    // Add fields
    Object.keys(_this23.fields).forEach(function (field) {
      if (_typeof(_this23.fields[field]) !== 'object' && _this23.fields[field] !== null) {
        _this23.fields[field] = {
          required: true,
          type: _this23.fields[field],
          default: null,
          name: field
        };
      }

      _this23.addField(field, true);
    });

    // Add meta/hidden fields
    if (_this23.hiddenFields) {
      Object.keys(_this23.hiddenFields).forEach(function (field) {
        _this23.addMetaField(field, NGN.coalesce(_this23.hiddenFields[field], null), true);
      });
    }

    // Add virtuals
    Object.keys(_this23.virtuals).forEach(function (v) {
      Object.defineProperty(_this23, v, NGN.get(function () {
        return _this23.virtuals[v].apply(_this23);
      }));
    });

    // Add relationships
    Object.keys(_this23.joins).forEach(function (field) {
      _this23.addRelationshipField(field, _this23.joins[field], true);
    });

    var events = ['field.update', 'field.create', 'field.remove', 'field.invalid', 'validator.add', 'validator.remove', 'relationship.create', 'relationship.remove', 'expired', 'deleted', 'reset', 'load'];

    if (NGN.BUS) {
      events.forEach(function (eventName) {
        _this23.on(eventName, function () {
          var args = NGN.slice(arguments);
          args.push(this);
          args.unshift(eventName);
          NGN.BUS.emit.apply(NGN.BUS, args);
        });
      });
    }

    // If an expiration is defined, set it.
    if (config.hasOwnProperty('expires')) {
      _this23.expires = config.expires;
    }

    // Handle changelog modifications & notify listeners (stores)
    _this23.on('changelog.append', function (delta) {
      delta.id = NGN.DATA.util.GUID();
      _this23.changelog.push(delta);
      _this23.emit('append.changelog', delta);
    });

    _this23.on('changelog.remove', function (idList) {
      idList = Array.isArray(idList) ? idList : [idList];
      _this23.emit('remove.changelog', idList);
    });
    return _this23;
  }

  _createClass(NgnDataModel, [{
    key: 'expire',


    /**
     * @method expire
     * Forcibly expire the model/record.
     * @param {Date|Number} [duration]
     * Optionally provide a new expiration time. This is an alternative
     * way of setting #expires. If no value is specified, the record
     * will immediately be marked as `expired`.
     */
    value: function expire(duration) {
      if (this.expired) {
        return;
      }

      if (duration) {
        this.expires = duration;
        return;
      }

      if (this.ignoreTTL) {
        return;
      }

      // Force expiration.
      this.hasExpired = true;

      clearTimeout(this.expirationTimeout);

      this.emit('expired', this);
    }

    /**
     * @method disableExpiration
     * Do not expire this model/record.
     */

  }, {
    key: 'disableExpiration',
    value: function disableExpiration() {
      this.expires = -1;
    }

    /**
      * @method addValidator
      * Add or update a validation rule for a specific model property.
      * @param {String} field
      * The data field to test.
      * @param {Function/String[]/Number[]/Date[]/RegExp/Array} validator
      * The validation used to test the property value. This should return
      * `true` when the data is valid and `false` when it is not.
      *
      * * When this is a _function_, the value is passed to it as an argument.
      * * When this is a _String_, the value is compared for an exact match (case sensitive)
      * * When this is a _Number_, the value is compared for equality.
      * * When this is a _Date_, the value is compared for exact equality.
      * * When this is a _RegExp_, the value is tested and the results of the RegExp#test are used to validate.
      * * When this is an _Array_, the value is checked to exist in the array, regardless of data type. This is treated as an `enum`.
      * * When this is _an array of dates_, the value is compared to each date for equality.
      * @fires validator.add
      */

  }, {
    key: 'addValidator',
    value: function addValidator(property, validator) {
      if (!this.hasOwnProperty(property)) {
        console.warn('No validator could be create for %c' + property + '%c. It is not an attribute of %c' + this.type + '%c.', NGN.css, '', NGN.css, '');
        return;
      }

      switch (typeof validator === 'undefined' ? 'undefined' : _typeof(validator)) {
        case 'function':
          this.validators[property] = this.validators[property] || [];
          this.validators[property].push(validator);
          this.emit('validator.add', property);
          break;
        case 'object':
          if (Array.isArray(validator)) {
            this.validators[property] = this.validators[property] || [];
            this.validators[property].push(function (value) {
              return validator.indexOf(value) >= 0;
            });
            this.emit('validator.add', property);
          } else if (validator.test) {
            // RegExp
            this.validators[property] = this.validators[property] || [];
            this.validators[property].push(function (value) {
              return validator.test(value);
            });
            this.emit('validator.add', property);
          } else {
            console.warn('No validator could be created for %c' + property + '%c. The validator appears to be invalid.', NGN.css, '');
          }
          break;
        case 'string':
        case 'number':
        case 'date':
          this.validators[property] = this.validators[property] || [];
          this.validators[property].push(function (value) {
            return value === validator;
          });
          this.emit('validator.add', property);
          break;
        default:
          console.warn('No validator could be create for %c' + property + '%c. The validator appears to be invalid.', NGN.css, '');
      }
    }

    /**
      * @method removeValidator
      * Remove a data validator from the object.
      * @param {String} attribute
      * The name of the attribute to remove from the validators.
      * @fires validator.remove
      */

  }, {
    key: 'removeValidator',
    value: function removeValidator(attribute) {
      if (this.validators.hasOwnProperty(attribute)) {
        delete this.validators[attribute];
        this.emit('validator.remove', attribute);
      }
    }

    /**
      * @method validate
      * Validate one or all attributes of the data.
      * @param {String} [attribute=null]
      * Validate a specific attribute. By default, all attributes are tested.
      * @private
      * @returns {Boolean}
      * Returns true or false based on the validity of data.
      */

  }, {
    key: 'validate',
    value: function validate(attribute) {
      // If validation is turned off, treat everything as valid.
      if (!this.validation) {
        return true;
      }
      var me = this;

      // Single Attribute Validation
      if (attribute) {
        if (this.validators.hasOwnProperty(attribute)) {
          for (var i = 0; i < this.validators[attribute].length; i++) {
            if (!me.validators[attribute][i].apply(me, [me[attribute]])) {
              me.invalidDataAttributes.indexOf(attribute) < 0 && me.invalidDataAttributes.push(attribute);
              return false;
            } else {
              me.invalidDataAttributes = me.invalidDataAttributes.filter(function (attr) {
                return attribute !== attr;
              });
            }
          }

          if (!this.validateDataType(attribute)) {
            this.invalidDataAttributes.push(attribute);
            return false;
          }
        }

        return true;
      }

      // Validate data type of each attribute
      this.datafields.forEach(function (field) {
        me.validate(field);
      });
    }

    /**
     * @method validateDataType
     * Indicates the data types match.
     * @param {string} fieldname
     * Name of the field whose data should be validated.
     * @private
     * @return {boolean}
     */

  }, {
    key: 'validateDataType',
    value: function validateDataType(field) {
      var fieldType = NGN.typeof(this[field]);
      var expectedType = NGN.typeof(this.fields[field].type);

      if (fieldType !== 'null') {
        return fieldType === expectedType;
      }

      if (this[field] === null && this.fields[field].required) {
        if (this.autoid && field === this.idAttribute) {
          return true;
        }

        return false;
      }

      return true;
    }

    /**
     * @method getRelationshipField
     * Provides specific detail/configuration about a join/relationship.
     * @param {String} fieldname
     * The name of the field.
     * @returns {Object}
     */

  }, {
    key: 'getRelationshipField',
    value: function getRelationshipField(fieldname) {
      return this.joins[fieldname];
    }

    /**
     * @method hasRelationship
     * Indicates a data join exists.
     * @param {String} fieldname
     * The name of the data field.
     * @returns {Boolean}
     */

  }, {
    key: 'hasRelationship',
    value: function hasRelationship(fieldname) {
      return this.joins.hasOwnProperty(fieldname);
    }

    /**
       * @method getDataField
       * Provides specific detail/configuration about a field.
       * @param {String} fieldname
       * The name of the data field.
       * @returns {Object}
       */

  }, {
    key: 'getDataField',
    value: function getDataField(fieldname) {
      return this.fields[fieldname];
    }

    /**
     * @method getMappedFieldName
     * Retrieve the raw fieldname of the data field.
     * This is useful, particularly for NGN.DATA.Proxy
     * extensions, when a #dataMap is used to modify the
     * #data output.
     *
     * For example, consider the following #dataMap:
     *
     * ```js
     * dataMap: {
     *   "firstname": "gn",
     *   "lastname": "sn"
     * }
     * ```
     *
     * This data map would produce #data using the mapped names:
     *
     * ```js
     * {
     *   gn: 'John',
     *   sn: 'Doe'
     * }
     * ```
     *
     * Running `MyModel.getMappedFieldName('firstname')` would
     * return `gn`. This is designed to help data proxies and
     * other methods that need to interact directly with the
     * modified output generated by the #data attribute.
     */

  }, {
    key: 'getMappedFieldName',
    value: function getMappedFieldName(fieldname) {
      if (!this.dataMap || !this.dataMap.hasOwnProperty(fieldname)) {
        return fieldname;
      }

      return this.dataMap[fieldname];
    }

    /**
     * @method getReverseMappedFieldName
     * The same as #getMappedFieldName, but using the #reverseMap.
     *
     */

  }, {
    key: 'getReverseMappedFieldName',
    value: function getReverseMappedFieldName(fieldname) {
      if (!this.reverseMap || !this.reverseMap.hasOwnProperty(fieldname)) {
        return fieldname;
      }

      return this.reverseMap[fieldname];
    }

    /**
     * @method hasDataField
     * Indicates a data field exists.
     * @param {String} fieldname
     * The name of the data field.
     * @returns {Boolean}
     */

  }, {
    key: 'hasDataField',
    value: function hasDataField(fieldname) {
      return this.fields.hasOwnProperty(fieldname);
    }

    /**
     * @method hasMetaField
     * Indicates a metadata (hidden) field exists.
     * @param {String} fieldname
     * The name of the data field.
     * @returns {Boolean}
     */

  }, {
    key: 'hasMetaField',
    value: function hasMetaField(fieldname) {
      if (!this.has(fieldname)) {
        return false;
      }

      return this.getDataField(fieldname).hidden;
    }

    /**
     * @method has
     * Indicates an attribute exists. This is a generic method
     * that checks the data fields, relationships, virtuals (optional),
     * and ID attribute.
     * @param {string} attribute
     * The name of the attribute.
     * @param {boolean} [includeVirtuals=true]
     * Specify `true` to check the virtuals as well.
     * @returns {boolean}
     */

  }, {
    key: 'has',
    value: function has(attribute) {
      var includeVirtuals = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      if (this.idAttribute === attribute || this.hasDataField(attribute) || this.hasRelationship(attribute)) {
        return true;
      }

      if (includeVirtuals && this.hasVirtualField(attribute)) {
        return true;
      }

      return false;
    }

    /**
      * @method serialize
      * Creates a JSON data object with no functions. Only uses enumerable attributes of the object by default.
      * Specific data values can be included/excluded using #enumerableProperties & #nonEnumerableProperties.
      *
      * Any object property that begins with a special character will be ignored by default. Functions & Setters are always
      * ignored. Getters are evaluated recursively until a simple object type is found or there are no further nested attributes.
      *
      * If a value is an instance of NGN.model.Model (i.e. a nested model or array of models), reference string is returned in the data.
      * The model itself can be returned using #getXRef.
      * @param {Object} [obj]
      * Defaults to this object.
      * @param {Boolean} [ignoreID=false]
      * Do not include the ID attribute in the serialized output.
      * @protected
      */

  }, {
    key: 'serialize',
    value: function serialize(obj) {
      var ignoreID = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      var _obj = obj || this.raw;
      var rtn = {};

      for (var key in _obj) {
        _obj.nonEnumerableProperties = _obj.nonEnumerableProperties || '';
        if (this.fields.hasOwnProperty(key) && !this.hasMetaField(key)) {
          key = key === 'id' ? this.idAttribute : key;

          if (_obj.hasOwnProperty(key) && _obj.nonEnumerableProperties.indexOf(key) < 0 && /^[a-z0-9 ]$/.test(key.substr(0, 1)) || _obj[key] !== undefined && _obj.enumerableProperties.indexOf(key) >= 0) {
            var dsc = Object.getOwnPropertyDescriptor(_obj, key);
            if (!dsc.set) {
              // Handle everything else
              switch (_typeof(dsc.value)) {
                case 'function':
                  // Support date & regex proxies
                  if (dsc.value.name === 'Date') {
                    rtn[key] = _obj[key].refs.toJSON();
                  } else if (dsc.value.name === 'RegExp') {
                    rtn[key] = dsc.value();
                  }
                  break;
                case 'object':
                  // Support array proxies
                  if (_obj[key] instanceof Array && !Array.isArray(_obj[key])) {
                    _obj[key] = _obj[key].slice(0);
                  }

                  rtn[key] = _obj[key];
                  break;
                default:
                  rtn[key] = NGN.coalesce(_obj[key], this.fields[key].default, null);
                  break;
              }
            }
          }
        }
      }

      var me = this;
      this.relationships.forEach(function (r) {
        rtn[r] = me.rawjoins[r].data;
      });

      // Remove invalid ID
      if (rtn.hasOwnProperty(this.idAttribute) && ignoreID || rtn.hasOwnProperty(this.idAttribute) && rtn[this.idAttribute] === undefined) {
        delete rtn[this.idAttribute];
      }

      return rtn;
    }

    /**
     * @method addField
     * Add a data field after the initial model definition.
     * @param {string} fieldname
     * The name of the field.
     * @param {object} [fieldConfiguration=null]
     * The field configuration (see cfg#fields for syntax).
     * @param {boolean} [suppressEvents=false]
     * Set to `true` to prevent events from firing when the field is added.
     */

  }, {
    key: 'addField',
    value: function addField(field) {
      var fieldcfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var suppressEvents = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      if (typeof fieldcfg === 'boolean') {
        suppressEvents = fieldcfg;
        fieldcfg = null;
      }

      var me = this;
      var cfg = null;

      if (field.toLowerCase() !== 'id') {
        if ((typeof field === 'undefined' ? 'undefined' : _typeof(field)) === 'object') {
          if (!field.name) {
            throw new Error('Cannot create data field. The supplied configuration does not contain a unique data field name.');
          }

          cfg = field;
          field = cfg.name;
          delete cfg.name;
        }

        if (me[field] !== undefined) {
          try {
            var source = NGN.stack.pop();
            console.warn('%c' + field + '%c data field defined multiple times (at %c' + source.path + '%c). Only the last defintion will be used.', NGN.css, '', NGN.css, '');
          } catch (e) {
            console.warn('%c' + field + '%c data field defined multiple times. Only the last definition will be used.', NGN.css, '', NGN.css, '');
          }

          delete me[field];
        }

        // Create the data field as an object attribute & getter/setter
        me.fields[field] = NGN.coalesce(cfg, fieldcfg, me.fields[field], {});
        me.fields[field].required = NGN.coalesce(me.fields[field].required, false);

        if (!me.fields[field].hasOwnProperty('type')) {
          if (me.fields[field].hasOwnProperty('default')) {
            var type = NGN.typeof(me.fields[field].default);
            type = type.charAt(0).toUpperCase() + type.slice(1);
            me.fields[field].type = eval(type);
          }
        }
        me.fields[field].type = NGN.coalesce(me.fields[field].type, String);
        if (field === me.idAttribute && me.autoid === true) {
          me.fields[field].type = String;
          me.fields[field]['default'] = NGN.coalesce(me.autoidPrefix, '') + NGN.DATA.util.GUID() + NGN.coalesce(me.autoidPostfix, '');
        } else {
          me.fields[field]['default'] = NGN.coalesce(me.fields[field]['default']);
        }
        me.fields[field].hidden = NGN.coalesce(me.fields[field].hidden, false);
        me.raw[field] = me.fields[field]['default'];
        me[field] = me.raw[field];

        Object.defineProperty(me, field, {
          get: function get() {
            return NGN.coalesce(me.raw[field], me.fields[field].default, null);
          },
          set: function set(value) {
            var old = me.raw[field];

            // If no change is made, do not update anything.
            if (old === value) {
              return;
            }

            var wasInvalid = !me.validate(field);

            // if (old === value) {
            //   console.log('HIT')
            //   return
            // } else if (me.fields[field].type === Object && typeof value === 'object') {
            //   if (JSON.stringify(old) === JSON.stringify(value)) {
            //     return
            //   }
            // }

            me.raw[field] = value;

            var c = {
              action: 'update',
              field: field,
              old: old,
              new: me.raw[field]
            };

            this.emit('changelog.append', c);
            this.emit('field.update', c);
            this.emit('field.update.' + field, c);

            // If the field is invalid, fire event.
            if (!me.validate(field)) {
              me.emit('field.invalid', {
                field: field
              });
            } else if (wasInvalid) {
              // If the field BECAME valid (compared to prior value),
              // emit an event.
              me.emit('field.valid', {
                field: field
              });
            }
          }
        });

        if (!suppressEvents) {
          var c = {
            action: 'create',
            field: field
          };
          this.emit('changelog.append', c);
          this.emit('field.create', c);
        }

        // Add field validators
        if (me.fields.hasOwnProperty(field)) {
          if (me.fields[field].hasOwnProperty('pattern')) {
            me.addValidator(field, me.fields[field].pattern);
          }
          ['min', 'max', 'enum'].forEach(function (v) {
            if (me.fields[field].hasOwnProperty(v)) {
              me.addValidator(field, function (val) {
                return me._nativeValidators[v](me.fields[field][v], val);
              });
            }
          });
          if (me.fields[field].hasOwnProperty('required')) {
            if (me.fields[field].required) {
              me.addValidator(field, function (val) {
                return me._nativeValidators.required(field, val);
              });
            }
          }
          if (me.fields[field].hasOwnProperty('validate')) {
            if (typeof me.fields[field].validate === 'function') {
              me.addValidator(field, function (val) {
                return me.fields[field].validate.apply(me, [val]);
              });
            } else {
              var _source = NGN.stack.pop();
              console.warn('Invalid custom validation function (in %c' + _source.path + '%c). The value passed to the validate attribute must be a function.', NGN.css, '');
            }
          }
        }
      } else if (me.id === null && me.autoid) {
        me.id = NGN.coalesce(me.autoidPrefix, '') + NGN.DATA.util.GUID() + NGN.coalesce(me.autoidPostfix, '');
      }
    }

    /**
     * @method addMetaField
     * Add a metadata/hidden field.
     * @param {string} fieldname
     * The name of the field.
     * @param {object} [fieldConfiguration=null]
     * The field configuration (see cfg#fields for syntax).
     * @param {boolean} [suppressEvents=false]
     * Set to `true` to prevent events from firing when the field is added.
     */

  }, {
    key: 'addMetaField',
    value: function addMetaField(fieldname) {
      var fieldcfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      if (!this.has(fieldname)) {
        this.hiddenFields = NGN.coalesce(this.hiddenFields, {});
        this.hiddenFields[fieldname] = fieldcfg;
        this.addField.apply(this, arguments);
        this.fields[fieldname].hidden = true;
      }
    }

    /**
     * @method addVirtual
     * Add a virtual field dynamically.
     * @param {string} name
     * The name of the attribute to add.
     * @param {function} handler
     * The synchronous method (or generator) that produces
     * the desired output.
     */

  }, {
    key: 'addVirtual',
    value: function addVirtual(name, fn) {
      var me = this;
      Object.defineProperty(this, name, {
        get: function get() {
          return fn.apply(me);
        }
      });
    }

    /**
     * @method addRelationshipField
     * Join another model dynamically.
     * @param {string} name
     * The name of the field to add.
     * @param {Object|NGN.DATA.Model} config
     * The configuration or data model type. This follows the same syntax
     * defined in the #joins attribute.
     * @param {boolean} [suppressEvents=false]
     * Set to `true` to prevent events from firing when the field is added.
     */

  }, {
    key: 'addRelationshipField',
    value: function addRelationshipField(name, cfg, suppressEvents) {
      suppressEvents = suppressEvents !== undefined ? suppressEvents : false;

      if (this.rawjoins.hasOwnProperty(name) || this.fields.hasOwnProperty(name) || this.hasOwnProperty(name)) {
        throw new Error(name + ' already exists. It cannot be added to the model again.');
      }

      if (typeof cfg === 'function' || (typeof cfg === 'undefined' ? 'undefined' : _typeof(cfg)) === 'object' && !cfg.hasOwnProperty('type')) {
        cfg = {
          type: cfg
        };
      }

      if (!cfg.type) {
        throw new Error('Configuration has no reference! The reference must be an NGN.DATA.Model or NGN.DATA.Store.');
      }

      cfg.required = NGN.coalesce(cfg.required, true);
      cfg.default = cfg.default || null;

      if (!this.joins.hasOwnProperty(name)) {
        this.joins[name] = cfg;
      }

      var me = this;
      var entityType = 'model';

      if (cfg.type instanceof NGN.DATA.Store) {
        entityType = 'store';
      } else if (NGN.typeof(cfg.type) === 'array') {
        if (cfg.type.length === 0) {
          throw new Error(name + ' cannot be an empty store. A model must be provided.');
        }

        entityType = 'collection';
      } else if (_typeof(cfg.type) === 'object') {
        if (cfg.type.model) {
          entityType = 'store';
        }
      }

      if (entityType === 'store') {
        var storeCfg = {};
        if (cfg.type instanceof NGN.DATA.Store) {
          this.rawjoins[name] = cfg.type;
          storeCfg = null;
        } else if (cfg.type.model) {
          storeCfg = cfg.type;
        } else {
          throw new Error('Nested store configuration is invalid or was not recognized.');
        }

        if (storeCfg !== null) {
          this.rawjoins[name] = new NGN.DATA.Store(storeCfg);
        }
        this.applyStoreMonitor(name);
      } else if (entityType === 'collection') {
        this.rawjoins[name] = new NGN.DATA.Store({
          model: cfg.type[0]
        });
        this.applyStoreMonitor(name);
      } else if (!cfg.type.data) {
        this.rawjoins[name] = cfg.default !== null ? new cfg.type(cfg.default) : new cfg.type(); // eslint-disable-line new-cap
        this.applyModelMonitor(name);
      } else if (cfg.type.data) {
        this.rawjoins[name] = cfg.type;
        this.applyStoreMonitor(name);
      } else {
        throw new Error('Nested store configuration is invalid or was not recognized.');
      }

      Object.defineProperty(this, name, {
        enumerable: true,
        get: function get() {
          return me.rawjoins[name];
        }
      });

      if (!suppressEvents) {
        var c = {
          action: 'create',
          field: name
        };

        this.emit('changelog.append', c);
        this.emit('relationship.create', c);
      }
    }

    /**
     * @method applyModelMonitor
     * Applies event handlers for bubbling model events.
     * @param {string} field
     * The relationship field name.
     * @private
     */

  }, {
    key: 'applyModelMonitor',
    value: function applyModelMonitor(name) {
      var model = this.rawjoins[name];
      var me = this;

      var oldData = model.data;
      model.on('load', function () {
        var payload = {
          action: 'update',
          field: name,
          old: NGN.coalesce(oldData),
          new: model.data,
          join: true,
          originalEvent: {
            event: 'load',
            record: model
          }
        };

        oldData = model.data;

        me.emit('field.update', payload);
        me.emit('field.update.' + name, payload);
      });

      model.on('field.update', function (delta) {
        var payload = {
          action: 'update',
          field: name + '.' + delta.field,
          old: delta.old,
          new: delta.new,
          join: true,
          originalEvent: {
            event: 'field.update',
            record: model
          }
        };

        me.emit('field.update', payload);
        me.emit('field.update.' + name + '.' + delta.field, payload);
      });

      model.on('field.create', function (delta) {
        var payload = {
          action: 'update',
          field: name + '.' + delta.field,
          old: null,
          new: null,
          join: true,
          originalEvent: {
            event: 'field.create',
            record: model
          }
        };

        me.emit('field.update', payload);
        me.emit('field.update.' + name + '.' + delta.field, payload);
      });

      model.on('field.remove', function (delta) {
        var payload = {
          action: 'update',
          field: name + '.' + delta.field,
          old: delta.value,
          new: null,
          join: true,
          originalEvent: {
            event: 'field.remove',
            record: model
          }
        };

        me.emit('field.update', payload);
        me.emit('field.update.' + name + '.' + delta.field, payload);
      });

      model.on('field.invalid', function (data) {
        me.emit('field.invalid');
        me.emit('field.invalid.' + name + '.' + data.field);
      });

      model.on('field.valid', function (data) {
        me.emit('field.valid');
        me.emit('field.valid.' + name + '.' + data.field);
      });
    }

    /**
     * @method applyStoreMonitor
     * Applies event handlers for store data.
     * @param {string} name
     * Name of the raw join.
     * @private
     */

  }, {
    key: 'applyStoreMonitor',
    value: function applyStoreMonitor(name) {
      if (!this.rawjoins.hasOwnProperty(name)) {
        return;
      }

      if (this.rawjoins[name] instanceof NGN.DATA.Store) {
        //this.rawjoins[name].hasOwnProperty('proxy')
        var me = this;

        this.rawjoins[name].on('record.create', function (record) {
          var old = me[name].data;
          old.pop();

          var c = {
            action: 'update',
            field: name,
            join: true,
            old: old,
            new: me[name].data,
            originalEvent: {
              event: 'record.create',
              record: record
            }
          };

          me.emit('field.update', c);
          me.emit('field.update.' + name, c);
        });

        this.rawjoins[name].on('record.update', function (record, delta) {
          if (!delta) {
            return;
          }

          var c = {
            action: 'update',
            field: name + '.' + delta.field,
            join: true,
            old: delta.old,
            new: delta.new,
            originalEvent: {
              event: 'record.update',
              record: record
            }
          };

          me.emit('field.update', c);
          me.emit('field.update.' + name + '.' + delta.field, c);
        });

        this.rawjoins[name].on('record.delete', function (record) {
          var old = me[name].data;
          old.push(record.data);

          var c = {
            action: 'update',
            field: name,
            join: true,
            old: old,
            new: me[name].data,
            originalEvent: {
              event: 'record.delete',
              record: record
            }
          };

          me.emit('field.update', c);
          me.emit('field.update.' + name, c);
        });

        this.rawjoins[name].on('record.invalid', function (data) {
          me.emit('field.invalid', data.field);
          me.emit('field.invalid.' + name, data.field);
        });

        this.rawjoins[name].on('record.valid', function (data) {
          me.emit('field.valid', data.field);
          me.emit('field.valid.' + name, data.field);
        });
      }
    }

    /**
     * @method removeField
     * Remove a field from the data model.
     * @param {string} name
     * Name of the field to remove.
     */

  }, {
    key: 'removeField',
    value: function removeField(name) {
      if (this.raw.hasOwnProperty(name)) {
        var val = this.raw[name];
        delete this[name];
        delete this.fields[name]; // eslint-disable-line no-undef
        delete this.raw[name]; // eslint-disable-line no-undef
        if (this.invalidDataAttributes.indexOf(name) >= 0) {
          this.invalidDataAttributes.splice(this.invalidDataAttributes.indexOf(name), 1);
        }
        var c = {
          action: 'delete',
          field: name,
          value: val
        };
        this.emit('field.remove', c);
        this.emit('changelog.append', c);
      }
    }

    /**
     * @method removeVirtual
     * Remove a virtual field.
     * @param {string} name
     * Name of the field.
     */

  }, {
    key: 'removeVirtual',
    value: function removeVirtual(name) {
      delete this[name];
    }

    /**
     * @method removeRelationshipField
     * Remove an existing join dynamically.
     * @param {string} name
     * The name of the relationship field to remove.
     * @param {boolean} [suppressEvents=false]
     * Set to `true` to prevent events from firing when the field is added.
     */

  }, {
    key: 'removeRelationshipField',
    value: function removeRelationshipField(name, suppressEvents) {
      suppressEvents = suppressEvents !== undefined ? suppressEvents : false;
      if (this.joins.hasOwnProperty(name)) {
        var val = this.rawjoins[name];
        delete this.rawjoins[name];
        delete this[name];
        delete this.joins[name];
        if (!suppressEvents) {
          var c = {
            action: 'delete',
            field: name,
            old: val,
            join: true
          };
          this.emit('changelog.append', c);
          this.emit('relationship.remove', c);
        }
      }
    }

    /**
     * @method hasVirtualField
     * Determines whether a virtual field is available.
     * @param {string} fieldname
     * The name of the virtual field to check for.
     * @returns {boolean}
     */

  }, {
    key: 'hasVirtualField',
    value: function hasVirtualField(fieldname) {
      return this.virtuals.hasOwnProperty(fieldname);
    }

    /**
     * @method setSilent
     * A method to set a field value without triggering an update event.
     * This is designed primarily for use with live update proxies to prevent
     * endless event loops.
     * @param {string} fieldname
     * The name of the #field to update.
     * @param {any} value
     * The new value of the field.
     * @private
     */

  }, {
    key: 'setSilent',
    value: function setSilent(fieldname, value) {
      if (fieldname === this.idAttribute) {
        this.id = value;
        return;
      }

      // Account for nested models
      if (this.hasRelationship(fieldname)) {
        if (this[fieldname] instanceof NGN.DATA.Store) {
          this[fieldname].clear();
          this[fieldname].bulk(null, value);
          return;
        }

        this[fieldname].load(value);

        return;
      }

      this.raw[fieldname] = value;
    }

    /**
     * @method undo
     * A rollback function to undo changes. This operation affects
     * the changelog. It is possible to undo an undo (i.e. redo).
     * This works with relationship creating/removing relationship fields,
     * but not updates to the related model. To undo changes to a relationship
     * field, the `undo()` method _of the related model_ must be called.
     * @param {number} [OperationCount=1]
     * The number of operations to "undo". Defaults to a single operation.
     */

  }, {
    key: 'undo',
    value: function undo() {
      var back = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

      var old = this.changelog.splice(this.changelog.length - back, back);
      var me = this;

      old.reverse().forEach(function (change) {
        if (!(typeof change.join === 'boolean' ? change.join : false)) {
          switch (change.action) {
            case 'update':
              me[change.field] = change.old;
              break;
            case 'create':
              me.removeField(change.field);
              break;
            case 'delete':
              me.addField(change.field);
              me[change.field] = me.old;
              break;
          }
        } else {
          switch (change.action) {
            case 'create':
              me.removeRelationshipField(change.field);
              break;
            case 'delete':
              me.addRelationshipField(change.field);
              me[change.field] = change.old;
              break;
          }
        }
      });

      this.emit('changelog.remove', old.map(function (item) {
        return item.id;
      }));
    }

    /**
     * @method load
     * Load a data record. This clears the #history. #modified
     * will be set to `false`, as though the record has been untouched.
     * @param {object} data
     * The data to apply to the model.
     */

  }, {
    key: 'load',
    value: function load(data) {
      var _this24 = this;

      data = data || {};

      // Handle data maps
      if (this._dataMap !== null) {
        Object.keys(this.reverseMap).forEach(function (key) {
          if (data.hasOwnProperty(key)) {
            data[_this24.reverseMap[key]] = data[key];
            delete data[key];
          }
        });
      }

      // Loop through the keys and add data fields
      Object.keys(data).forEach(function (key) {
        if (_this24.hasDataField(key)) {
          if (_this24.raw.hasOwnProperty(key)) {
            _this24.raw[key] = data[key];
          } else if (key === _this24.idAttribute) {
            _this24.id = data[key];
          }
        } else if (_this24.hasRelationship(key)) {
          _this24.rawjoins[key].load(data[key]);
        } else if (key !== _this24.idAttribute && !_this24.hasMetaField(key)) {
          try {
            var source = NGN.stack.pop();
            console.warn('%c' + key + '%c specified in %c' + source.path + '%c as a data field but is not defined in the model.', NGN.css, '', NGN.css, '');
          } catch (e) {
            console.warn('%c' + key + '%c specified as a data field but is not defined in the model.', NGN.css, '');
          }
        }
      });

      this.setUnmodified();
      this.emit('load');
    }
  }, {
    key: 'proxy',
    get: function get() {
      return this._proxy;
    },
    set: function set(value) {
      if (!this._proxy && value instanceof NGN.DATA.Proxy) {
        this._proxy = value;
        this._proxy.init(this);
      }
    }
  }, {
    key: 'deleted',
    get: function get() {
      return this.isRecordDestroyed;
    }
  }, {
    key: 'isDestroyed',
    set: function set(value) {
      if (typeof value !== 'boolean') {
        console.warn(NGN.stack);
        throw new Error('Invalid data type. isDestroyed must be a boolean. Received ' + (typeof value === 'undefined' ? 'undefined' : _typeof(value)));
      }

      this.isRecordDestroyed = value;

      if (value) {
        this.emit('deleted');
      }
    }
  }, {
    key: 'expires',
    get: function get() {
      return this.expiration;
    },
    set: function set(value) {
      var _this25 = this;

      // Validate data type
      if (NGN.typeof(value) !== 'date' && NGN.typeof(value) !== 'number') {
        try {
          var source = NGN.stack.pop();
          console.warn('Expiration could not be set at %c' + source.path + '%c (Invalid data type. Must be a Date or number).', NGN.css, '');
        } catch (e) {
          console.warn('Expiration could not be set (Invalid data type. Must be a Date or number).');
        }

        return;
      }

      // Clear existing expiration timer if it is already set.
      clearTimeout(this.expirationTimeout);

      // If the new value is a number, convert to a date.
      if (NGN.typeof(value) === 'number') {
        if (value < 0) {
          this.ignoreTTL = true;
          return;
        }

        var currentDate = new Date();

        value = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), currentDate.getHours(), currentDate.getMinutes(), currentDate.getSeconds(), currentDate.getMilliseconds() + value);
      }

      // If the process has reached this far, expiration
      // actions should be enabled.
      this.ignoreTTL = false;

      // Set the new expiration time period
      this.expiration = value;

      // If the record is already expired, immediately trigger the expiration.
      if (Date.now() >= this.expiration.getTime()) {
        this.expire();
        return;
      }

      this.hasExpired = false;

      // If the expiration is in the future, set a timer to expire.
      var waitPeriod = this.expiration.getTime() - Date.now();
      this.expirationTimeout = setTimeout(function () {
        _this25.expire();
      }, waitPeriod);
    }

    /**
     * @property {boolean} expired
     * Indicates the record/model is expired.
     */

  }, {
    key: 'expired',
    get: function get() {
      if (this.ignoreTTL) {
        return false;
      }

      return this.hasExpired;
    }

    /**
     * @property {Boolean}
     * Indicates one or more data properties has changed.
     * @readonly
     */

  }, {
    key: 'modified',
    get: function get() {
      return this.checksum !== this.benchmark;
    }

    /**
     * @cfgproperty {String/Number/Date} [id=null]
     * The unique ID of the model object. If #idAttribute is defined,
     * this will get/set the #idAttribute value.
     */

  }, {
    key: 'id',
    get: function get() {
      return this.oid;
    },
    set: function set(value) {
      this.oid = value;
    }

    /**
     * @property checksum
     * The unique checksum of the record (i.e. a record fingerprint).
     * This will change as the data changes.
     */

  }, {
    key: 'checksum',
    get: function get() {
      return NGN.DATA.util.checksum(JSON.stringify(this.data));
    }

    /**
     * @property {Object} dataMap
     * The current data map.
     * @private
     */

  }, {
    key: 'dataMap',
    get: function get() {
      return this._dataMap;
    },
    set: function set(value) {
      this._dataMap = value;
      this._reverseDataMap = null;
    }

    /**
     * @property {NGN.DATA.Store} store
     * If a store is associated with the model, this will
     * provide a reference to it. If there is no store, this
     * will return `null`.
     */

  }, {
    key: 'datastore',
    get: function get() {
      return this._store;
    }

    /**
     * @property {boolean} valid
     * Indicates the record is valid.
     */

  }, {
    key: 'valid',
    get: function get() {
      this.validate();
      return this.invalidDataAttributes.length === 0;
    }

    /**
     * @property datafields
     * Provides an array of data fields associated with the model.
     * @returns {String[]}
     */

  }, {
    key: 'datafields',
    get: function get() {
      if (!this.hiddenFields) {
        return Object.keys(this.fields);
      }

      var hidden = NGN.coalesce(this.hiddenFields, {});

      return Object.keys(this.fields).filter(function (fieldname) {
        return !hidden.hasOwnProperty(fieldname);
      });
    }

    /**
     * @property reslationships
     * Provides an array of join fields associated with the model.
     * @returns {String[]}
     */

  }, {
    key: 'relationships',
    get: function get() {
      return Object.keys(this.joins);
    }

    /**
     * @property virtualdatafields
     * Provides an array of virtual data fields associated with the model.
     * @returns {String[]}
     */

  }, {
    key: 'virtualdatafields',
    get: function get() {
      return Object.keys(this.virtuals);
    }

    /**
     * @property {object} reverseMap
     * Reverses the data map. For example, if the original #dataMap
     * looks like:
     *
     * ```js
     * {
     *    firstname: 'gn',
     *    lastname: 'sn
     * }
     * ```
     *
     * The reverse map will look like:
     *
     * ```js
     * {
     *    gn: 'firstname',
     *    sn: 'lastname
     * }
     * ```
     */

  }, {
    key: 'reverseMap',
    get: function get() {
      if (this.dataMap !== null) {
        if (this._reverseDataMap !== null) {
          return this._reverseDataMap;
        }
        var rmap = {};
        var me = this;
        Object.keys(this._dataMap).forEach(function (attr) {
          rmap[me._dataMap[attr]] = attr;
        });
        this._reverseDataMap = rmap;
        return rmap;
      }
      return null;
    }

    /**
      * @property data
      * Creates a JSON object from the data entity. This is
      * a record that can be persisted to a database or other data store.
      * @readonly.
      */

  }, {
    key: 'data',
    get: function get() {
      var d = this.serialize();

      if (!d.hasOwnProperty(this.idAttribute) && this.autoid) {
        d[this.idAttribute] = this[this.idAttribute];
      }

      if (this.dataMap) {
        var me = this;
        // Loop through the map keys
        Object.keys(this.dataMap).forEach(function (key) {
          // If the node contains key, make the mapping
          if (d.hasOwnProperty(key)) {
            if (d[key] instanceof NGN.DATA.Model) {
              d[me.dataMap[key]] = d[key].data;
            } else {
              d[me.dataMap[key]] = d[key];
            }
            delete d[key];
          }
        });
      }

      return d;
    }

    /**
     * @property representation
     * Creates a JSON representation of the record.
     * Think of this as #data + #virtuals.
     */

  }, {
    key: 'representation',
    get: function get() {
      var _this26 = this;

      var data = this.data;

      // Add relationships
      Object.keys(this.rawjoins).forEach(function (join) {
        data[join] = _this26.rawjoins[join].representation;
      });

      // Add virtual fields
      Object.keys(this.virtuals).forEach(function (attribute) {
        var val = _this26[attribute];
        if (val instanceof NGN.DATA.Entity || val instanceof NGN.DATA.Store) {
          data[attribute] = _this26[attribute].representation;
        } else if (typeof val !== 'function') {
          data[attribute] = _this26[attribute];
        }
      });

      return data;
    }

    /**
     * @property history
     * The history of the entity (i.e. changelog).The history
     * is shown from most recent to oldest change. Keep in mind that
     * some actions, such as adding new custom fields on the fly, may
     * be triggered before other updates.
     * @returns {array}
     */

  }, {
    key: 'history',
    get: function get() {
      return this.changelog.reverse();
    }
  }]);

  return NgnDataModel;
}(NGN.EventEmitter);

NGN.DATA = NGN.DATA || {};
// Object.defineProperty(NGN.DATA, 'Model', NGN.public(Entity))

Object.defineProperties(NGN.DATA, {
  Model: NGN.const(function (cfg) {
    var ModelLoader = function ModelLoader(data) {
      var model = new NgnDataModel(cfg);

      if (data) {
        model.load(data);
      }

      return model;
    };

    return ModelLoader;
  }),

  Entity: NGN.private(NgnDataModel)
});

if (NGN.nodelike) {
  module.exports = NGN.DATA;
}

'use strict';

/**
 * @class NGN.DATA.Store
 * Represents a collection of data.
 * @fires record.create
 * Fired when a new record is created. The new
 * record is provided as an argument to the event
 * handler.
 * @fires record.delete
 * Fired when a record(s) is removed. The old record
 * is provided as an argument to the event handler.
 */

var NgnDataStore = function (_NGN$EventEmitter5) {
  _inherits(NgnDataStore, _NGN$EventEmitter5);

  function NgnDataStore(cfg) {
    _classCallCheck(this, NgnDataStore);

    cfg = cfg || {};

    var _this27 = _possibleConstructorReturn(this, (NgnDataStore.__proto__ || Object.getPrototypeOf(NgnDataStore)).call(this, cfg));

    Object.defineProperties(_this27, {
      /**
       * @cfg {NGN.DATA.Model} model
       * An NGN Data Model to which data records conform.
       */
      _model: { //NGN.public(NGN.coalesce(cfg.model)),
        enumerable: false,
        writable: true,
        configurable: false,
        value: NGN.coalesce(cfg.model)
      },

      // The raw data collection
      _data: NGN.private([]),

      // The raw filters
      _filters: NGN.private([]),

      // The raw indexes
      _index: NGN.private(cfg.index || []),

      // Placeholders to track the data that's added/removed
      // during the lifespan of the store. Modified data is
      // tracked within each model record.
      _created: NGN.private([]),
      _deleted: NGN.private([]),
      _loading: NGN.private(false),
      _softarchive: NGN.private([]),

      /**
       * @cfg {NGN.DATA.Proxy} proxy
       * The proxy used to transmit data over a network.
       */
      _proxy: NGN.private(cfg.proxy || null),

      /**
       * @cfg {boolean} [allowDuplicates=true]
       * Set to `false` to prevent duplicate records from being added.
       * If a duplicate record is added, it will be ignored and an
       * error will be thrown.
       */
      allowDuplicates: NGN.public(NGN.coalesce(cfg.allowDuplicates, true)),

      /**
       * @cfg {boolean} [errorOnDuplicate=false]
       * Set to `true` to throw an error when a duplicate record is detected.
       * If this is not set, it will default to the value of #allowDuplicates.
       * If #allowDuplicates is not defined either, this will be `true`
       */
      errorOnDuplicate: NGN.const(NGN.coalesce(cfg.errorOnDuplicate, cfg.allowDuplicates, true)),

      /**
       * @cfgproperty {boolean} [autoRemoveExpiredRecords=true]
       * When set to `true`, the store will automatically delete expired records.
       */
      autoRemoveExpiredRecords: NGN.privateconst(NGN.coalesce(cfg.autoRemoveExpiredRecords, true)),

      /**
       * @cfg {boolean} [softDelete=false]
       * When set to `true`, the store makes a copy of a record before removing
       * it from the store. The store will still emit a `record.delete` event,
       * and it will still behanve as though the record has been completely
       * removed. However; the record copy can be retrieved using the #restore
       * method.
       *
       * Since it is not always desirable to store a copy of every deleted
       * record indefinitely, it is possible to expire and permanently remove
       * records by setting the #softDeleteTtl.
       *
       * ```js
       * var People = new NGN.DATA.Store({
       *   model: Person,
       *   softDelete: true,
       *   softDeleteTtl: 10000
       * })
       *
       * People.add(somePerson)
       *
       * var removedRecordId
       * People.once('record.delete', function (record) {
       *   removedRecordId = record.id
       * })
       *
       * People.remove(somePerson)
       *
       * setTimeout(function () {
       *   People.restore(removedRecordId)
       * }, 5000)
       *
       * ```
       *
       * The code above creates a new store and adds a person to it.
       * Then a placeholder variable (`removedRecordId`) is created.
       * Next, a one-time event listener is added to the store, specifically
       * for handling the removal of a record. Then the record is removed,
       * which triggers the `record.delete` event, which populates
       * `removedRecordId` with the ID of the record that was deleted.
       * Finally, the code waits for 5 seconds, then restores the record. If
       * the #restore method _wasn't_ called, the record would be purged
       * from memory after 10 seconds (because `softDeleteTtl` is set to 10000
       * milliseconds).
       */
      softDelete: NGN.privateconst(NGN.coalesce(cfg.softDelete, false)),

      /**
       * @cfg {number} [softDeleteTtl=-1]
       * This is the number of milliseconds the store waits before purging a
       * soft-deleted record from memory. `-1` = Infinite (no TTL).
       */
      softDeleteTtl: NGN.private(NGN.coalesce(cfg.softDeleteTtl, -1)),

      /**
       * @cfg {Number} [FIFO=-1]
       * Configures the store to use "**F**irst **I**n **F**irst **O**ut"
       * record processing when it reaches a maximum number of records.
       *
       * For example, assume `FIFO=10`. When the 11th record is added, it
       * will replace the oldest record (i.e. the 1st). This guarantees the
       * store will never have more than 10 records at any given time and it
       * will always maintain the latest records.
       *
       * FIFO and LIFO cannot be applied at the same time.
       *
       * **BE CAREFUL** when using this in combination with #insert,
       * #insertBefore, or #insertAfter. FIFO is applied _after_ the record
       * is added to the store but _before_ it is moved to the desired index.
       */
      fifo: NGN.private(NGN.coalesce(cfg.FIFO, -1)),

      /**
       * @cfg {Number} [LIFO=-1]
       * Configures the store to use "**L**ast **I**n **F**irst **O**ut"
       * record processing when it reaches a maximum number of records.
       *
       * This methos acts in the opposite manner as #FIFO. However; for
       * all intents and purposes, this merely replaces the last record in
       * the store when a new record is added.
       *
       * For example, assume `FIFO=10`. When the 11th record is added, it
       * will replace the latest record (i.e. the 10th). This guarantees the
       * store will never have more than 10 records at any given time. Every
       * time a new record is added (assuming the store already has the maximum
       * allowable records), it replaces the last record (10th) with the new
       * record.
       *
       * LIFO and FIFO cannot be applied at the same time.
       *
       * **BE CAREFUL** when using this in combination with #insert,
       * #insertBefore, or #insertAfter. LIFO is applied _after_ the record
       * is added to the store but _before_ it is moved to the desired index.
       */
      lifo: NGN.private(NGN.coalesce(cfg.LIFO, -1)),

      /**
       * @cfg {Number} [maxRecords=-1]
       * Setting this will prevent new records from being added past this limit.
       * Attempting to add a record to the store beyond it's maximum will throw
       * an error.
       */
      maxRecords: NGN.private(NGN.coalesce(cfg.maxRecords, -1)),

      /**
       * @cfg {Number} [minRecords=0]
       * Setting this will prevent removal of records if the removal would
       * decrease the count below this limit.
       * Attempting to remove a record below the store's minimum will throw
       * an error.
       */
      minRecords: NGN.private(NGN.coalesce(cfg.minRecords, 0)),

      /*
       * @property {array} changelog
       * An ordered array of changes made to the store.
       * This cannot be changed manually. Instead, use #history
       * and #undo to manage this list.
       * @private
       */
      // changelog: NGN.private([])

      /**
       * @property snapshotarchive
       * Contains snapshots.
       * @private
       */
      snapshotarchive: NGN.private(null)
    });

    if (_this27.lifo > 0 && _this27.fifo > 0) {
      throw new Error('NGN.DATA.Store can be configured as FIFO or LIFO, but not both simultaneously.');
    }

    // If LIFO/FIFO is used, disable alternative record count limitations.
    if (_this27.lifo > 0 || _this27.fifo > 0) {
      _this27.minRecords = 0;
      _this27.maxRecords = -1;
    } else {
      _this27.minRecords = _this27.minRecords < 0 ? 0 : _this27.minRecords;
    }

    var obj = {};
    _this27._index.forEach(function (i) {
      obj[i] = [];
    });

    _this27._index = obj;

    var events = ['record.duplicate', 'record.create', 'record.update', 'record.delete', 'record.restored', 'record.purged', 'record.move', 'record.invalid', 'record.valid', 'clear', 'filter.create', 'filter.delete', 'index.create', 'index.delete'];

    if (NGN.BUS) {
      events.forEach(function (eventName) {
        _this27.on(eventName, function () {
          var args = NGN.slice(arguments);
          args.shift();
          args.push(this);
          NGN.BUS.emit(eventName, args);
        });
      });
    }

    if (cfg.proxy) {
      if (_this27._proxy instanceof NGN.DATA.Proxy) {
        _this27._proxy.init(_this27);
      } else {
        throw new Error('Invalid proxy configuration.');
      }
    }
    return _this27;
  }

  _createClass(NgnDataStore, [{
    key: 'replaceModel',
    value: function replaceModel(modelFn) {
      this._model = modelFn;
    }
  }, {
    key: 'add',


    /**
     * @method add
     * Add a data record.
     * @param {NGN.DATA.Model|object} data
     * Accepts an existing NGN Data Model or a JSON object.
     * If a JSON object is supplied, it will be applied to
     * the data model specified in cfg#model. If no model
     * is specified, the raw JSON data will be stored.
     * @param {boolean} [suppressEvent=false]
     * Set this to `true` to prevent the `record.create` event
     * from firing.
     * @return {NGN.DATA.Model}
     * Returns the new record.
     */
    value: function add(data, suppressEvent) {
      var record = void 0;

      // Prevent creation if it will exceed maximum record count.
      if (this.maxRecords > 0 && this._data.length + 1 > this.maxRecords) {
        throw new Error('Maximum record count exceeded.');
      }

      if (!(data instanceof NGN.DATA.Entity)) {
        try {
          data = JSON.parse(data);
        } catch (e) {}
        if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) !== 'object') {
          throw new Error('Cannot add a non-object record.');
        }
        if (this.model) {
          record = new this.model(data); // eslint-disable-line new-cap
        } else {
          record = data;
        }
      } else {
        record = data;
      }

      if (record.hasOwnProperty('_store')) {
        record._store = this;
      }

      var dupe = this.isDuplicate(record);
      if (dupe) {
        this.emit('record.duplicate', record);
        if (!this.allowDuplicates) {
          if (this.errorOnDuplicate) {
            throw new Error('Cannot add duplicate record (allowDuplicates = false).');
          }
          return;
        }
      }

      // Handle special record count processing
      if (this.lifo > 0 && this._data.length + 1 > this.lifo) {
        this.remove(this._data.length - 1);
      } else if (this.fifo > 0 && this._data.length + 1 > this.fifo) {
        this.remove(0);
      }

      this.listen(record);
      this.applyIndices(record, this._data.length);
      this._data.push(record);
      !this._loading && this._created.indexOf(record) < 0 && this._created.push(record);

      if (!NGN.coalesce(suppressEvent, false)) {
        this.emit('record.create', record);
      }

      if (!record.valid) {
        this.emit('record.invalid', record);
      }

      return record;
    }

    /**
     * @method insertBefore
     * Add a record before the specified index.
     *
     * **BE CAREFUL** when using this in combination with #LIFO or #FIFO.
     * LIFO/FIFO is applied _after_ the record is added to the store but
     * _before_ it is moved to the desired index.
     * @param  {NGN.DATA.Model|number} target
     * The model or index where the new record will be added before.
     * @param {NGN.DATA.Model|object} data
     * Accepts an existing NGN Data Model or a JSON object.
     * If a JSON object is supplied, it will be applied to
     * the data model specified in cfg#model. If no model
     * is specified, the raw JSON data will be stored.
     * @param {boolean} [suppressEvent=false]
     * Set this to `true` to prevent the `record.create` event
     * from firing.
     * @return {NGN.DATA.Model}
     * Returns the new record.
     */

  }, {
    key: 'insertBefore',
    value: function insertBefore(index, data) {
      var suppressEvent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      return this.insert(index, data, suppressEvent, 'before');
    }

    /**
     * @method insertAfter
     * Add a record after the specified index.
     *
     * **BE CAREFUL** when using this in combination with #LIFO or #FIFO.
     * LIFO/FIFO is applied _after_ the record is added to the store but
     * _before_ it is moved to the desired index.
     * @param  {NGN.DATA.Model|number} target
     * The model or index where the new record will be added after.
     * @param {NGN.DATA.Model|object} data
     * Accepts an existing NGN Data Model or a JSON object.
     * If a JSON object is supplied, it will be applied to
     * the data model specified in cfg#model. If no model
     * is specified, the raw JSON data will be stored.
     * @param {boolean} [suppressEvent=false]
     * Set this to `true` to prevent the `record.create` event
     * from firing.
     * @return {NGN.DATA.Model}
     * Returns the new record.
     */

  }, {
    key: 'insertAfter',
    value: function insertAfter(index, data) {
      var suppressEvent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      return this.insert(index + 1, data, suppressEvent, 'after');
    }

    /**
     * @method insert
     * Add a record somewhere within the existing recordset (as opposed to simply appending).
     *
     * **BE CAREFUL** when using this in combination with #LIFO or #FIFO.
     * LIFO/FIFO is applied _after_ the record is added to the store but
     * _before_ it is moved to the desired index.
     * @param  {NGN.DATA.Model|number} target
     * The model or index where the new record will be added after.
     * @param {NGN.DATA.Model|object} data
     * Accepts an existing NGN Data Model or a JSON object.
     * If a JSON object is supplied, it will be applied to
     * the data model specified in cfg#model. If no model
     * is specified, the raw JSON data will be stored.
     * @param {boolean} [suppressEvent=false]
     * Set this to `true` to prevent the `record.create` event
     * from firing.
     * @param {string} [position=after]
     * The position (before or after) where the record should be added.
     * @return {NGN.DATA.Model}
     * Returns the new record.
     */

  }, {
    key: 'insert',
    value: function insert(index, data) {
      var suppressEvent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var position = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'after';

      var record = this.add(data, true);
      if (record) {
        this.move(this._data.length - 1, index, position, false);

        if (!suppressEvent) {
          this.emit('record.create', record);
        }
      }

      return record;
    }

    /**
     * @method isDuplicate
     * Indicates whether the specified record is a duplicate.
     * This compares checksum values. Any match is considered a
     * duplicate. It will also check for duplication of raw JSON
     * objects (i.e. non-NGN.DATA.Model records).
     * @param  {NGN.DATA.Model|Object} record
     * The record or JSON object.
     * @return {boolean}
     */

  }, {
    key: 'isDuplicate',
    value: function isDuplicate(record) {
      if (this._data.indexOf(record) >= 0) {
        return false;
      }
      return this._data.filter(function (rec) {
        return rec.checksum === record.checksum;
      }).length > 0;
    }

    /**
     * @method listen
     * Listen to a specific record's events and respond.
     * @param {NGN.DATA.Model} record
     * The record to listen to.
     * @fires record.update
     * Fired when a record is updated. The #record is passed as an argument to
     * the event handler.
     * @private
     */

  }, {
    key: 'listen',
    value: function listen(record) {
      var _this28 = this;

      record.on('field.update', function (delta) {
        _this28.updateIndice(delta.field, delta.old, delta.new, _this28._data.indexOf(record));
        _this28.emit('record.update', record, delta);
      });

      record.on('field.delete', function (delta) {
        _this28.updateIndice(delta.field, delta.old, undefined, _this28._data.indexOf(record));
        _this28.emit('record.update', record, delta);
      });

      record.on('field.invalid', function () {
        _this28.emit('record.invalid', record);
      });

      record.on('field.valid', function () {
        _this28.emit('record.valid', record);
      });

      record.on('expired', function () {
        if (!record.expired) {
          return;
        }

        _this28.emit('record.expired', record);

        if (_this28.autoRemoveExpiredRecords) {
          var index = _this28.indexOf(record);
          if (index >= 0) {
            _this28.remove(record);
          }
        }
      });

      // record.on('append.changelog', (delta) => {
      //   this.changelog.push(delta)
      // })
      //
      // record.on('remove.changelog', (idList) => {
      //   this.changelog = this.changelog.filter((item) => {
      //     return idList.indexOf(item.id) < 0
      //   })
      // })
    }

    /**
     * @method bulk
     * Bulk load data.
     * @param {string} eventName
     * @param {array} data
     * @private
     */

  }, {
    key: 'bulk',
    value: function bulk(event, data) {
      var _this29 = this;

      this._loading = true;

      var resultSet = [];

      data.forEach(function (record) {
        resultSet.push(_this29.add(record, true));
      });

      this._loading = false;
      this._deleted = [];
      this._created = [];

      // Slight delay to prevent faster systems from
      // responding before data is written to memory.
      if (event !== null) {
        setTimeout(function () {
          _this29.emit(event || 'load', resultSet);
          resultSet = null;
        }, 100);
      } else {
        resultSet = null;
      }
    }

    /**
     * @method load
     * Bulk load data. This acts the same as adding records,
     * but it suppresses individual record creation events.
     * This will add data to the existing collection. If you
     * want to load fresh data, use the #reload method.
     * @param {array} data
     * An array of data. Each array element should be an
     * NGN.DATA.Model or a JSON object that can be applied
     * to the store's #model.
     */

  }, {
    key: 'load',
    value: function load() {
      var array = Array.isArray(arguments[0]) ? arguments[0] : NGN.slice(arguments);
      this.bulk('load', array);
    }

    /**
     * @method reload
     * Reload data. This is the same as running #clear followed
     * by #load.
     */

  }, {
    key: 'reload',
    value: function reload(data) {
      this.clear();
      var array = Array.isArray(arguments[0]) ? arguments[0] : NGN.slice(arguments);
      this.bulk('reload', array);
    }

    /**
     * @method indexOf
     * Find the index number of a record within the collection.
     * @param  {NGN.DATA.Model} record
     * The record whose index should be identified.
     * @return {Number}
     * Returns a number from `0-collection length`. Returns `-1` if
     * the record is not found in the collection.
     */

  }, {
    key: 'indexOf',
    value: function indexOf(record) {
      if ((typeof record === 'undefined' ? 'undefined' : _typeof(record)) !== 'object' || !(record instanceof NGN.DATA.Entity) && !record.checksum) {
        return -1;
      }

      return this._data.findIndex(function (el) {
        return el.checksum === record.checksum;
      });
    }

    /**
     * @method contains
     * A convenience method that indicates whether a record is in
     * the store or not.
     * @param {NGN.DATA.Model} record
     * The record to check for inclusion in the data collection.
     * @return {Boolean}
     */

  }, {
    key: 'contains',
    value: function contains(record) {
      return this.indexOf(record) >= 0;
    }

    /**
     * @method remove
     * Remove a record.
     * @param {NGN.DATA.Model|object|number} data
     * Accepts an existing NGN Data Model, JSON object,
     * or index number. Using a JSON object is slower
     * than using a reference to a data model or an index
     * number (index is fastest).
     * @fires record.delete
     * The record delete event sends 2 arguments to handler methods:
     * `record` and `index`. The record refers to the model that was
     * removed. The `index` refers to the position of the record within
     * the store's data list. **NOTICE** the `index` refers to where
     * the record _used to be_.
     * @returns {NGN.DATA.Model}
     * Returns the data model that was just removed. If a model
     * is unavailable (i.e. remove didn't find the specified record),
     * this will return `null`.
     */

  }, {
    key: 'remove',
    value: function remove(data, suppressEvents) {
      var _this30 = this;

      var removedRecord = [];
      var dataIndex = void 0;

      // Prevent removal if it will exceed minimum record count.
      if (this.minRecords > 0 && this._data.length - 1 < this.minRecords) {
        throw new Error('Minimum record count not met.');
      }

      if (typeof data === 'number') {
        dataIndex = data;
      } else if (data && data.checksum && data.checksum !== null || data instanceof NGN.DATA.Model) {
        dataIndex = this.indexOf(data);
      } else {
        var m = new this.model(data, true); // eslint-disable-line new-cap
        dataIndex = this._data.findIndex(function (el) {
          return el.checksum === m.checksum;
        });
      }

      // If no record is found, the operation fails.
      if (dataIndex < 0) {
        throw new Error('Record removal failed (record not found at index ' + (dataIndex || '').toString() + ').');
      }

      this._data[dataIndex].isDestroyed = true;

      removedRecord = this._data.splice(dataIndex, 1);

      removedRecord.isDestroyed = true;

      if (removedRecord.length > 0) {
        removedRecord = removedRecord[0];
        this.unapplyIndices(dataIndex);

        if (this.softDelete) {
          if (this.softDeleteTtl >= 0) {
            var checksum = removedRecord.checksum;
            removedRecord.once('expired', function () {
              _this30.purgeDeletedRecord(checksum);
            });

            removedRecord.expires = this.softDeleteTtl;
          }

          this._softarchive.push(removedRecord);
        }

        if (!this._loading) {
          var i = this._created.indexOf(removedRecord);
          if (i >= 0) {
            i >= 0 && this._created.splice(i, 1);
          } else if (this._deleted.indexOf(removedRecord) < 0) {
            this._deleted.push(removedRecord);
          }
        }

        if (!NGN.coalesce(suppressEvents, false)) {
          this.emit('record.delete', removedRecord, dataIndex);
        }

        return removedRecord;
      }

      return null;
    }

    /**
     * @method findArchivedRecord
     * Retrieve an archived record.
     * @param  {string} checksum
     * Checksum of the record.
     * @return {object}
     * Returns the archived record and it's index within the deletion archive.
     * ```js
     * {
     *   index: <number>,
     *   record: <NGN.DATA.Model>
     * }
     * ```
     * @private
     */

  }, {
    key: 'findArchivedRecord',
    value: function findArchivedRecord(checksum) {
      var index = void 0;
      var record = this._softarchive.filter(function (record, i) {
        if (record.checksum === checksum) {
          index = i;
          return true;
        }
      });

      if (record.length !== 1) {
        var source = void 0;
        try {
          source = NGN.stack.pop().path;
        } catch (e) {
          source = 'Unknown';
        }

        console.warn('Cannot purge record. %c' + record.length + ' records found%c. Source: %c' + source, NGN.css, '', NGN.css);
        return null;
      }

      return {
        index: index,
        record: record[0]
      };
    }

    /**
     * @method purgeDeletedRecord
     * Remove a soft-deleted record from the store permanently.
     * This cannot be undone, and there are no events for this action.
     * @param  {string} checksum
     * Checksum of the record.
     * @return {NGN.DATA.Model}
     * Returns the purged record. This will be `null` if the record cannot be
     * found or does not exist.
     * @fires {NGN.DATA.Model} record.purged
     * This event is triggered when a record is removed from the soft-delete
     * archive.
     * @private
     */

  }, {
    key: 'purgeDeletedRecord',
    value: function purgeDeletedRecord(checksum) {
      var purgedRecord = this.findArchivedRecord(checksum);

      // If there is no record, abort (the findArchivedRecord emits a warning)
      if (purgedRecord === null) {
        return null;
      }

      this._softarchive.splice(purgedRecord.index, 1);

      this.emit('record.purged', purgedRecord.record);

      return purgedRecord.record;
    }

    /**
     * @method restore
     * Restore a soft-deleted record to the store. This does not preserve the
     * original index (a new index number is assigned).
     * @param  {string} checksum
     * Checksum of the record.
     * @return {NGN.DATA.Model}
     * Returns the purged record. This will be `null` if the record cannot be
     * found or does not exist.
     * @fires record.restored
     */

  }, {
    key: 'restore',
    value: function restore(checksum) {
      var purgedRecord = this.findArchivedRecord(checksum);

      // If there is no record, abort (the findArchivedRecord emits a warning)
      if (purgedRecord === null) {
        return null;
      }

      purgedRecord.record.removeAllListeners('expired');
      purgedRecord.record.expires = this.softDeleteTtl;

      this.add(purgedRecord.record, true);

      this._softarchive[purgedRecord.index].removeAllListeners('expired');
      this._softarchive.splice(purgedRecord.index, 1);

      purgedRecord.record.isDestroyed = false;

      this.emit('record.restored', purgedRecord.record);

      return purgedRecord.record;
    }

    /**
     * @method clear
     * Removes all data.
     * @param {boolean} [purgeSoftDelete=true]
     * Purge soft deleted records from memory.
     * @fires clear
     * Fired when all data is removed
     */

  }, {
    key: 'clear',
    value: function clear() {
      var _this31 = this;

      var purge = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      if (!purge) {
        this._softarchive = this._data;
      } else {
        this._softarchive = [];
      }

      this._data = [];

      Object.keys(this._index).forEach(function (index) {
        _this31._index[index] = [];
      });

      this.emit('clear');
    }

    /**
     * @method find
     * Retrieve a specific record or set of records.
     * @param {number|function|string|object} [query=null]
     * When this is set to a `number`, the corresponding zero-based
     * record will be returned. A `function` can also be used, which
     * acts like a filter. Each record is passed to this function.
     *
     * For example, if we want to find all administrators within a
     * set of users, the following could be used:
     *
     * ```js
     *   let record = MyStore.find(function (record) {
     *     return record.usertype = 'admin'
     *   })
     * ```
     *
     * It's also possible to supply a String. When this is supplied,
     * the store will look for a record whose ID (see NGN.DATA.Model#idAttribute)
     * matches the string. Numberic ID's are matched on their string
     * equivalent for search purposes (data is not modified).
     *
     * An object can be used to search for specific field values. For example:
     *
     * ```js
     * MyStore.find({
     *   firstname: 'Corey',
     *   lastname: /Butler|Doe/
     * })
     * ```
     *
     * The code above will find everyone named Corey Butler or Corey Doe. The
     * first attribute must match the value exactly whereas `lastname` will
     * match against the regular expression.
     *
     * If this parameter is `undefined` or `null`, all records will be
     * returned (i.e. no search criteria specified, so return everything).
     *
     * If you're using a large dataset, indexing can speed up queries. To take
     * full advantage of indexing, all of the query elements should be indexed.
     * For example, if you have `lastname`, 'firstname' in your query and
     * both of those are indexed, the response time will be substantially faster
     * than if they're not (in large data sets). However; if one of those
     * elements is _not_ indexed, performance may not increase.
     * @param {boolean} [ignoreFilters=false]
     * Set this to `true` to search the full unfiltered record set.
     * @return {NGN.DATA.Model|array|null}
     * An array is returned when a function is specified for the query.
     * Otherwise the specific record is return. This method assumes
     * records have unique ID's.
     */

  }, {
    key: 'find',
    value: function find(query, ignoreFilters) {
      var _this32 = this;

      if (this._data.length === 0) {
        return [];
      }

      var resultSet = [];

      switch (typeof query === 'undefined' ? 'undefined' : _typeof(query)) {
        case 'function':
          resultSet = this._data.filter(query);
          break;
        case 'number':
          resultSet = query < 0 || query >= this._data.length ? null : this._data[query];
          break;
        case 'string':
          var indice = this.getIndices(this._data[0].idAttribute, query.trim());
          if (indice !== null && indice.length > 0) {
            indice.forEach(function (index) {
              resultSet.push(_this32._data[index]);
            });
            return resultSet;
          }

          var recordSet = this._data.filter(function (record) {
            return (record[record.idAttribute] || '').toString().trim() === query.trim();
          });

          resultSet = recordSet.length === 0 ? null : recordSet[0];

          break;
        case 'object':
          if (query instanceof NGN.DATA.Model) {
            if (this.contains(query)) {
              return query;
            }

            return null;
          }

          var match = [];
          var noindex = [];
          var queryKeys = Object.keys(query);

          queryKeys.forEach(function (field) {
            var index = _this32.getIndices(field, query[field]);

            if (index) {
              match = match.concat(index || []);
            } else {
              field !== null && noindex.push(field);
            }
          });

          // Deduplicate
          match.filter(function (index, i) {
            return match.indexOf(index) === i;
          });

          // Get non-indexed matches
          if (noindex.length > 0) {
            resultSet = this._data.filter(function (record, i) {
              if (match.indexOf(i) >= 0) {
                return false;
              }

              for (var x = 0; x < noindex.length; x++) {
                if (record[noindex[x]] !== query[noindex[x]]) {
                  return false;
                }
              }

              return true;
            });
          }

          // If a combined indexable + nonindexable query
          resultSet = resultSet.concat(match.map(function (index) {
            return _this32._data[index];
          })).filter(function (record) {
            for (var y = 0; y < queryKeys.length; y++) {
              if (query[queryKeys[y]] !== record[queryKeys[y]]) {
                return false;
              }
            }

            return true;
          });
          break;
        default:
          resultSet = this._data;
      }

      if (resultSet === null) {
        return null;
      }

      if (!NGN.coalesce(ignoreFilters, false)) {
        this.applyFilters(resultSet instanceof Array ? resultSet : [resultSet]);
      }

      return resultSet;
    }

    /**
     * @method applyFilters
     * Apply filters to a data set.
     * @param {array} data
     * The array of data to apply filters to.
     * @private
     */

  }, {
    key: 'applyFilters',
    value: function applyFilters(data) {
      if (this._filters.length === 0) {
        return data;
      }

      this._filters.forEach(function (filter) {
        data = data.filter(filter);
      });

      return data;
    }

    /**
     * @method addFilter
     * Add a filter to the record set.
     * @param {function} fn
     * The filter function. This function should comply
     * with the [Array.filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) specification,
     * returning a boolean value.
     * The item passed to the filter will be the NGN.DATA.Model specified
     * in the cfg#model.
     * @fires filter.create
     * Fired when a filter is created.
     */

  }, {
    key: 'addFilter',
    value: function addFilter(fn) {
      this._filters.push(fn);
      this.emit('filter.create', fn);
    }

    /**
     * @method removeFilter
     * Remove a filter from the record set.
     * @param {function|index} filter
     * This can be the function which was originally passed to
     * the #addFilter method, or the zero-based #filters index
     * @param {boolean} [suppressEvents=false]
     * Prevent events from firing one the creation of the filter.
     * @fires filter.delete
     * Fired when a filter is removed.
     */

  }, {
    key: 'removeFilter',
    value: function removeFilter(fn, suppressEvents) {
      suppressEvents = NGN.coalesce(suppressEvents, false);

      var removed = [];

      if (typeof fn === 'number') {
        removed = this._filters.splice(fn, 1);
      } else {
        removed = this._filters.splice(this._filters.indexOf(fn), 1);
      }

      if (removed.length > 0 && !suppressEvents) {
        this.emit('filter.delete', removed[0]);
      }
    }

    /**
     * @method clearFilters
     * Remove all filters.
     * @param {boolean} [suppressEvents=false]
     * Prevent events from firing one the removal of each filter.
     */

  }, {
    key: 'clearFilters',
    value: function clearFilters(suppressEvents) {
      suppressEvents = NGN.coalesce(suppressEvents, false);

      if (suppressEvents) {
        this._filters = [];
        return;
      }

      while (this._filters.length > 0) {
        this.emit('filter.delete', this._filters.pop());
      }
    }

    /**
     * @method deduplicate
     * Deduplicates the recordset. This compares the checksum of
     * each of the records to each other and removes duplicates.
     * This suppresses the removal
     * @param {boolean} [suppressEvents=true]
     * Suppress the event that gets fired when a record is removed.
     */

  }, {
    key: 'deduplicate',
    value: function deduplicate(suppressEvents) {
      var _this33 = this;

      suppressEvents = NGN.coalesce(suppressEvents, true);

      var records = this.data.map(function (rec) {
        return JSON.stringify(rec);
      });

      var dupes = [];

      records.forEach(function (record, i) {
        if (records.indexOf(record) < i) {
          dupes.push(_this33.find(i));
        }
      });

      dupes.forEach(function (duplicate) {
        _this33.remove(duplicate);
      });
    }

    /**
     * @method sort
     * Sort the #records. This forces a #reindex, which may potentially be
     * an expensive operation on large data sets.
     * @param {function|object} sorter
     * Using a function is exactly the same as using the
     * [Array.sort()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort?redirectlocale=en-US&redirectslug=JavaScript%2FReference%2FGlobal_Objects%2FArray%2Fsort) method
     * (this is the compare function). The arguments passed to the
     * method are NGN.DATA.Model objects.
     * Alternatively, it is possible to sort by one or more model
     * attributes. Each attribute For example:
     *
     * ```js
     * let Person = new NGN.DATA.Model({
     *   fields: {
     *     fname: null,
     *     lname: null
     *   }
     * })
     *
     * let People = new NGN.DATA.Store({
     *   model: Person
     * })
     *
     * People.add({
     *   fname: 'John',
     *   lname: 'Doe',
     *   age: 37
     * }, {
     *   fname: 'Jane',
     *   lname: 'Doe',
     *   age: 36
     * }, {
     *   fname: 'Jane',
     *   lname: 'Vaughn',
     *   age: 42
     * })
     *
     * People.sort({
     *   lname: 'asc',  // Sort by last name in normal alphabetical order.
     *   age: 'desc'    // Sort by age, oldest to youngest.
     * })
     *
     * People.records.forEach(function (p) {
     *   console.log(fname, lname, age)
     * })
     *
     * // DISPLAYS
     * // John Doe 37
     * // Jane Doe 36
     * // Jane Vaughn 42
     *
     * People.sort({
     *   age: 'desc',  // Sort by age, oldest to youngest.
     *   lname: 'asc'  // Sort by name in normal alphabetical order.
     * })
     *
     * People.records.forEach(function (p) {
     *   console.log(fname, lname, age)
     * })
     *
     * // DISPLAYS
     * // Jane Vaughn 42
     * // John Doe 37
     * // Jane Doe 36
     * ```
     *
     * It is also posible to provide complex sorters. For example:
     *
     * ```js
     * People.sort({
     *   lname: 'asc',
     *   age: function (a, b) {
     *     if (a.age < 40) {
     *       return 1
     *     }
     *     return a.age < b.age
     *   }
     * })
     * ```
     *
     * The sorter above says "sort alphabetically by last name,
     * then by age where anyone under 40yrs old shows up before
     * everyone else, but sort the remainder ages in descending order.
     */

  }, {
    key: 'sort',
    value: function sort(fn) {
      if (typeof fn === 'function') {
        this.records.sort(fn);
      } else if ((typeof fn === 'undefined' ? 'undefined' : _typeof(fn)) === 'object') {
        var functionKeys = Object.keys(fn);

        this._data.sort(function (a, b) {
          for (var i = 0; i < functionKeys.length; i++) {
            // Make sure both objects have the same sorting key
            if (a.hasOwnProperty(functionKeys[i]) && !b.hasOwnProperty(functionKeys[i])) {
              return 1;
            }

            if (!a.hasOwnProperty(functionKeys[i]) && b.hasOwnProperty(functionKeys[i])) {
              return -1;
            }

            // For objects who have the key, sort in the order defined in object.
            if (a[functionKeys[i]] !== b[functionKeys[i]]) {
              switch (fn[functionKeys[i]].toString().trim().toLowerCase()) {
                case 'asc':
                  if (typeof a.fields[functionKeys[i]] === 'string') {
                    return a[functionKeys[i]].localeCompare(b[functionKeys[i]]);
                  }

                  return a[functionKeys[i]] > b[functionKeys[i]] ? 1 : -1;

                case 'desc':
                  return a[functionKeys[i]] < b[functionKeys[i]] ? 1 : -1;

                default:
                  if (typeof fn[functionKeys[i]] === 'function') {
                    return fn[functionKeys[i]](a, b);
                  }

                  return 0;
              }
            }
          }

          // Everything is equal
          return 0;
        });
      }
      this.reindex();
    }

    /**
     * @method createIndex
     * Add a simple index to the recordset.
     * @param {string} datafield
     * The #model data field to index.
     * @param {boolean} [suppressEvents=false]
     * Prevent events from firing on the creation of the index.
     * @fires index.create
     * Fired when an index is created. The datafield name and
     * store are supplied as an argument to event handlers.
     */

  }, {
    key: 'createIndex',
    value: function createIndex(field, suppressEvents) {
      if (!this.model.hasOwnProperty(field)) {
        console.warn('The store\'s model does not contain a data field called %c' + field + '%c.', NGN.css, '');
      }

      var exists = this._index.hasOwnProperty(field);

      this._index[field] = this._index[field] || [];
      if (!NGN.coalesce(suppressEvents, false) && !exists) {
        this.emit('index.created', {
          field: field,
          store: this
        });
      }
    }

    /**
     * @method deleteIndex
     * Remove an index.
     * @param {string} datafield
     * The #model data field to stop indexing.
     * @param {boolean} [suppressEvents=false]
     * Prevent events from firing on the removal of the index.
     * @fires index.delete
     * Fired when an index is deleted. The datafield name and
     * store are supplied as an argument to event handlers.
     */

  }, {
    key: 'deleteIndex',
    value: function deleteIndex(field, suppressEvents) {
      if (this._index.hasOwnProperty(field)) {
        delete this._index[field];

        if (!NGN.coalesce(suppressEvents, false)) {
          this.emit('index.created', {
            field: field,
            store: this
          });
        }
      }
    }

    /**
     * @method clearIndices
     * Clear all indices from the indexes.
     */

  }, {
    key: 'clearIndices',
    value: function clearIndices() {
      var _this34 = this;

      Object.keys(this._index).forEach(function (key) {
        _this34._index[key] = [];
      });
    }

    /**
     * @method deleteIndexes
     * Remove all indexes.
     * @param {boolean} [suppressEvents=true]
     * Prevent events from firing on the removal of each index.
     */

  }, {
    key: 'deleteIndexes',
    value: function deleteIndexes(suppressEvents) {
      var _this35 = this;

      suppressEvents = NGN.coalesce(suppressEvents, true);

      Object.keys(this._index).forEach(function (key) {
        _this35.deleteIndex(key, suppressEvents);
      });
    }

    /**
     * @method applyIndices
     * Apply the values to the index.
     * @param {NGN.DATA.Model} record
     * The record which should be applied to the index.
     * @param {number} number
     * The record index number.
     * @private
     */

  }, {
    key: 'applyIndices',
    value: function applyIndices(record, number) {
      var _this36 = this;

      var indexes = Object.keys(this._index);

      if (indexes.length === 0) {
        return;
      }

      indexes.forEach(function (field) {
        if (record.hasOwnProperty(field)) {
          var values = _this36._index[field];

          // Check existing records for similar values
          for (var i = 0; i < values.length; i++) {
            if (values[i][0] === record[field]) {
              _this36._index[field][i].push(number);
              return;
            }
          }

          // No matching words, create a new one.
          _this36._index[field].push([record[field], number]);
        }
      });
    }

    /**
     * @method unapplyIndices
     * This removes a record from all relevant indexes simultaneously.
     * Commonly used when removing a record from the store.
     * @param  {number} indexNumber
     * The record index.
     * @private
     */

  }, {
    key: 'unapplyIndices',
    value: function unapplyIndices(num) {
      var _this37 = this;

      Object.keys(this._index).forEach(function (field) {
        var i = _this37._index[field].indexOf(num);
        if (i >= 0) {
          _this37._index[field].splice(i, 1);
        }
      });
    }

    /**
     * @method updateIndice
     * Update the index with new values.
     * @param  {string} fieldname
     * The name of the indexed field.
     * @param  {any} oldValue
     * The original value. This is used to remove the old value from the index.
     * @param  {any} newValue
     * The new value.
     * @param  {number} indexNumber
     * The number of the record index.
     * @private
     */

  }, {
    key: 'updateIndice',
    value: function updateIndice(field, oldValue, newValue, num) {
      if (!this._index.hasOwnProperty(field) || oldValue === newValue) {
        return;
      }

      var ct = 0;

      for (var i = 0; i < this._index[field].length; i++) {
        var value = this._index[field][i][0];

        if (value === oldValue) {
          this._index[field][i].splice(this._index[field][i].indexOf(num), 1);
          ct++;
        } else if (newValue === undefined) {
          // If thr new value is undefined, the field was removed for the record.
          // This can be skipped.
          ct++;
        } else if (value === newValue) {
          this._index[field][i].push(num);
          this._index[field][i].shift();
          this._index[field][i].sort();
          this._index[field][i].unshift(value);
          ct++;
        }

        if (ct === 2) {
          return;
        }
      }
    }

    /**
     * @method getIndices
     * Retrieve a list of index numbers pertaining to a field value.
     * @param  {string} field
     * Name of the data field.
     * @param  {any} value
     * The value of the index to match against.
     * @return {array}
     * Returns an array of integers representing the index where the
     * values exist in the record set.
     */

  }, {
    key: 'getIndices',
    value: function getIndices(field, value) {
      if (!this._index.hasOwnProperty(field)) {
        return null;
      }

      var indexes = this._index[field].filter(function (dataArray) {
        return dataArray.length > 0 && dataArray[0] === value;
      });

      if (indexes.length === 1) {
        indexes[0].shift();
        return indexes[0];
      }

      return [];
    }

    /**
     * @method move
     * Move an existing record to a specific index. This can be used
     * to reorder a single record.
     * @param {NGN.DATA.Model|number|string} source
     * The record or the index of a record within the store to move.
     * This can also be the unique ID of a record.
     * @param {NGN.DATA.Model|number|string} target
     * The record or the index of a record within the store where the source
     * will be positioned against. This can also be the unique ID of a record.
     * @param {boolean} [suppressEvent=false]
     * Set this to `true` to prevent the `record.create` event
     * from firing.
     */

  }, {
    key: 'move',
    value: function move(source, target) {
      var suppressEvent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      if (source === undefined) {
        console.warn('Cannot move record. No source specified.');
        return;
      }

      if (target === undefined) {
        console.warn('Cannot move record. No target specified.');
        return;
      }

      source = this.getRecordIndex(source);
      target = this.getRecordIndex(target);

      // If the positins haven't actually changed, stop processing.
      if (source === target) {
        return;
      }

      this._data.splice(target, 0, this._data.splice(source, 1)[0]);

      if (!suppressEvent) {
        this.emit('record.move', {
          oldIndex: source,
          newIndex: target,
          record: this._data[target]
        });
      }

      this.reindex();
    }

    /**
     * @method getRecordIndex
     * Returns the index of a record using sanitize input.
     * @param  {NGN.DATA.Model|number|String} value
     * The record or the index of a record within the store.
     * This can also be the unique ID of a record.
     * @return {NGN.DATA.Model}
     * Returns the model or `null`
     */

  }, {
    key: 'getRecordIndex',
    value: function getRecordIndex(value) {
      if (value === undefined) {
        console.warn('No argument passed to getRecordIndex().');
        return null;
      }

      if (typeof value === 'number') {
        if (value < 0 || value >= this._data.length) {
          console.warn('%c' + value + '%c out of bounds.', NGN.css, '');
          return null;
        }

        return value;
      } else if (typeof value === 'string') {
        var id = value;

        value = this.find(id);

        if (!value) {
          console.warn('%c' + id + '%c does not exist or cannot be found in the store.', NGN.css, '');
          return null;
        }
      }

      return this.indexOf(value);
    }

    /**
     * @method reindex
     * Reindex the entire record set. This can be expensive operation.
     * Use with caution.
     * @private
     */

  }, {
    key: 'reindex',
    value: function reindex() {
      var _this38 = this;

      this.clearIndices();
      this._data.forEach(function (record, index) {
        _this38.applyIndices(record, index);
      });
    }

    /**
     * @method snapshot
     * Add a snapshot of the current store to the #snapshot archive.
     * This can potentially be a computationally/memory-expensive operation.
     * The method creates a copy of all data in the store along with checksums
     * of each element and holds the snapshot in RAM. Large stores may consume
     * large amounts of RAM until the snapshots are released/cleared.
     * Snapshots are most commonly used with data proxies to calculate
     * differences in a data set before persisting them to a database.
     * @returns {object}
     * Returns an object containing the following fields:
     *
     * ```js
     * {
     *   timestamp: 'ex: 2017-01-19T16:43:03.279Z',
     *   checksum: 'snapshotchecksum',
     *   modelChecksums: [
     *     'record1_checksum',
     *     'record2_checksum'
     *   ],
     *   data: { ... } // Actual data at the time of the snapshot
     * }
     * ```
     */

  }, {
    key: 'snapshot',
    value: function snapshot() {
      this.snapshotarchive = NGN.coalesce(this.snapshotarchive, []);

      var dataset = {
        timestamp: new Date().toJSON(),
        checksum: NGN.DATA.util.checksum(JSON.stringify(this.data)).toString(),
        modelChecksums: this.data.map(function (item) {
          return NGN.DATA.util.checksum(JSON.stringify(item)).toString();
        }),
        data: this.data
      };

      this.snapshotarchive.unshift(dataset);
      this.emit('snapshot', dataset);

      return dataset;
    }

    /**
     * @method clearSnapshots
     * Remove all archived snapshots.
     */

  }, {
    key: 'clearSnapshots',
    value: function clearSnapshots() {
      this.snapshotarchive = null;
    }
  }, {
    key: 'model',
    get: function get() {
      return this._model;
    }
  }, {
    key: 'proxy',
    get: function get() {
      return this._proxy;
    },
    set: function set(value) {
      if (!this._proxy && value instanceof NGN.DATA.Proxy) {
        this._proxy = value;
        this._proxy.init(this);
      }
    }

    /**
     * @property {array} snapshots
     * Contains the data snapshot of the entire store.
     * @readonly
     * @private
     */

  }, {
    key: 'snapshots',
    get: function get() {
      return NGN.coalesce(this.snapshotarchive, []);
    }

    /**
     * @property history
     * The history of the entity (i.e. changelog).The history
     * is shown from most recent to oldest change. Keep in mind that
     * some actions, such as adding new custom fields on the fly, may
     * be triggered before other updates.
     * @returns {array}
     */

  }, {
    key: 'history',
    get: function get() {
      return this.changelog.reverse();
    }

    /**
     * @property {array} data
     * The complete and unfiltered raw underlying dataset. This data
     * is usually persisted to a database.
     * @readonly
     */

  }, {
    key: 'data',
    get: function get() {
      return this._data.map(function (record) {
        return record.data;
      });
    }

    /**
     * @property {array} representation
     * The complete and unfiltered underlying representation dataset
     * (data + virtuals of each model).
     */

  }, {
    key: 'representation',
    get: function get() {
      return this._data.map(function (record) {
        return record.representation;
      });
    }

    /**
     * @property {array} records
     * An array of NGN.DATA.Model records. If the store has
     * filters applied, the records will reflect the filtration.
     * @readonly
     */

  }, {
    key: 'records',
    get: function get() {
      return this.applyFilters(this._data);
    }

    /**
     * @property recordCount
     * The total number of #records in the collection.
     * @readonly
     */

  }, {
    key: 'recordCount',
    get: function get() {
      return this.applyFilters(this._data).length;
    }

    /**
     * @property {array} filtered
     * An array of NGN.DATA.Model records that have been filtered out.
     * The results reflect the inverse of #records.
     */

  }, {
    key: 'filtered',
    get: function get() {
      var records = this.records;
      return this._data.filter(function (record) {
        return records.filter(function (rec) {
          return rec.checksum === record.checksum;
        }).length === 0;
      });
    }

    /**
     * @property {NGN.DATA.Model} first
     * Return the first record in the store. Returns `null`
     * if the store is empty.
     */

  }, {
    key: 'first',
    get: function get() {
      if (this.records.length === 0) {
        return null;
      }
      return this.records[0];
    }

    /**
     * @property {NGN.DATA.Model} last
     * Return the last record in the store. Returns `null`
     * if the store is empty.
     */

  }, {
    key: 'last',
    get: function get() {
      if (this.records.length === 0) {
        return null;
      }
      return this.records[this.records.length - 1];
    }
  }]);

  return NgnDataStore;
}(NGN.EventEmitter);

/**
 * indexes
 * An index consists of an object whose key is name of the
 * data field being indexed. The value is an array of record values
 * and their corresponding index numbers. For example:
 *
 * ```js
 * {
 *   "lastname": [["Butler", 0, 1, 3], ["Doe", 2, 4]]
 * }
 * ```
 * The above example indicates the store has two unique `lastname`
 * values, "Butler" and "Doe". Records containing a `lastname` of
 * "Butler" exist in the record store as the first, 2nd, and 4th
 * records. Records with the last name "Doe" are 3rd and 5th.
 * Remember indexes are zero based since records are stored as an
 * array.
 */

NGN.DATA.Store = NgnDataStore;

'use strict';

/**
 * @class NGN.DATA.Proxy
 * Provides a gateway to remote services such as HTTP and
 * websocket endpoints. This can be used directly to create
 * custom proxies.
 * @fires enabled
 * Triggered when the proxy state changes from a disabled
 * state to an enabled state.
 * @fires disabled
 * Triggered when the proxy state changes from an enabled
 * state to a disabled state.
 * @fires statechange
 * Triggered when the state changes. The new state (enabled/disabled)
 * is passed to the event handler.
 */

var NgnDataProxy = function (_NGN$EventEmitter6) {
  _inherits(NgnDataProxy, _NGN$EventEmitter6);

  function NgnDataProxy(config) {
    _classCallCheck(this, NgnDataProxy);

    config = config || {};

    var _this39 = _possibleConstructorReturn(this, (NgnDataProxy.__proto__ || Object.getPrototypeOf(NgnDataProxy)).call(this, config));

    Object.defineProperties(_this39, {
      /**
       * @cfgproperty {NGN.DATA.Store} store (required)
       * THe store for data being proxied.
       */
      store: NGN.private(null),

      initialized: NGN.private(false),

      /**
       * @property {boolean} liveSyncEnabled
       * Indicates live sync is active.
       * @readonly
       */
      liveSyncEnabled: NGN.private(false),

      _enabled: NGN.private(true),

      /**
       * @property {string} id
       * The proxy ID (autogenerated).
       * @readonly
       */
      id: NGN.privateconst(NGN.DATA.util.GUID())
    });
    return _this39;
  }

  /**
   * @property {string} state
   * Returns the current state (enabled/disabled) of the proxy.
   * @readonly
   */


  _createClass(NgnDataProxy, [{
    key: 'enable',


    /**
     * @method enable
     * Changes the state to `enabled`. If the proxy is already
     * enabled, this does nothing.
     */
    value: function enable() {
      if (!this._enabled) {
        this._enabled = true;
        this.emit('enabled');
        this.emit('statechange', this.state);
      }
    }

    /**
     * @method disable
     * Changes the state to `disabled`. If the proxy is already
     * enabled, this does nothing. This will also disable live
     * sync (runs #disableLiveSync automatically).
     */

  }, {
    key: 'disable',
    value: function disable() {
      if (this._enabled) {
        this._enabled = false;
        this.emit('disabled');
        this.emit('statechange', this.state);
        this.disableLiveSync();
      }
    }
  }, {
    key: 'init',
    value: function init(store) {
      var _this40 = this;

      if (this.initialized) {
        return;
      } else {
        this.initialized = true;
      }

      this.store = store;

      if (store instanceof NGN.DATA.Store) {
        Object.defineProperties(store, {
          changelog: NGN.get(function () {
            return _this40.changelog;
          })
        });
      }
    }

    /**
     * @property changelog
     * A list of the record changes that have occurred.
     * @returns {object}
     * An object is returned with 3 keys representative of the
     * action taken:
     *
     * ```js
     * {
     *   create: [NGN.DATA.Model, NGN.DATA.Model],
     *   update: [NGN.DATA.Model],
     *   delete: []
     * }
     * ```
     *
     * The object above indicates two records have been created
     * while one record was modified and no records were deleted.
     * **NOTICE:** If you add or load a JSON object to the store
     * (as opposed to adding an instance of NGN.DATA.Model), the
     * raw object will be returned. It is also impossible for the
     * data store/proxy to determine if these have changed since
     * the NGN.DATA.Model is responsible for tracking changes to
     * data objects.
     * @private
     */

  }, {
    key: 'save',
    value: function save() {}
  }, {
    key: 'fetch',
    value: function fetch() {
      console.warn('Fetch should be overridden by a proxy implementation class.');
    }

    /**
     * @method enableLiveSync
     * Live synchronization monitors the dataset for changes and immediately
     * commits them to the data storage system.
     * @fires live.create
     * Triggered when a new record is persisted to the data store.
     * @fires live.update
     * Triggered when a record modification is persisted to the data store.
     * @fires live.delete
     * Triggered when a record is removed from the data store.
     */

  }, {
    key: 'enableLiveSync',
    value: function enableLiveSync() {
      if (this.liveSyncEnabled) {
        return;
      }

      this.liveSyncEnabled = true;
      this.switchSync('on');
      this.emit('livesync.enabled');
    }

    /**
     * @method disableLiveSync
     * Live synchronization monitors the dataset for changes and immediately
     * commits them to the data storage system. This method disables this
     * functionality.
     */

  }, {
    key: 'disableLiveSync',
    value: function disableLiveSync() {
      if (!this.liveSyncEnabled) {
        return;
      }

      this.liveSyncEnabled = false;
      this.switchSync('off');
      this.emit('livesync.disabled');
    }

    // Helper method.

  }, {
    key: 'switchSync',
    value: function switchSync(fn) {
      if (this.type === 'model') {
        // Basic CRUD (-R)
        this.store[fn]('field.create', this.createModelRecord);
        this.store[fn]('field.update', this.updateModelRecord);
        this.store[fn]('field.remove', this.deleteModelRecord);

        // relationship.create is unncessary because no data is available
        // when a relationship is created. All related data will trigger a
        // `field.update` event.
        this.store[fn]('relationship.remove', this.deleteModelRecord);
      } else {
        // Persist new records
        this.store[fn]('record.create', this.createStoreRecord);
        this.store[fn]('record.restored', this.createStoreRecord);

        // Update existing records
        this.store[fn]('record.update', this.updateStoreRecord);

        // Remove old records
        this.store[fn]('record.delete', this.deleteStoreRecord);
        this.store[fn]('clear', this.clearStoreRecords);
      }
    }

    /**
     * @method createModelRecord
     * This method is used to create a record from a NGN.DATA.Model source.
     * This method is used as a part of the #enableLiveSync process.
     * Overriding this method will customize the functionality of the
     * live sync feature.
     * @private
     */

  }, {
    key: 'createModelRecord',
    value: function createModelRecord() {
      this.shouldOverride('createModelRecord');
    }

    /**
     * @method updateModelRecord
     * This method is used to update a record from a NGN.DATA.Model source.
     * This method is used as a part of the #enableLiveSync process.
     * Overriding this method will customize the functionality of the
     * live sync feature.
     * @private
     */

  }, {
    key: 'updateModelRecord',
    value: function updateModelRecord() {
      this.shouldOverride('updateModelRecord');
    }

    /**
     * @method deleteModelRecord
     * This method is used to delete a record from a NGN.DATA.Model source.
     * This method is used as a part of the #enableLiveSync process.
     * Overriding this method will customize the functionality of the
     * live sync feature.
     * @private
     */

  }, {
    key: 'deleteModelRecord',
    value: function deleteModelRecord() {
      this.shouldOverride('deleteModelRecord');
    }

    /**
     * @method createStoreRecord
     * This method is used to create a record from a NGN.DATA.Store source.
     * This method is used as a part of the #enableLiveSync process.
     * Overriding this method will customize the functionality of the
     * live sync feature.
     * @private
     */

  }, {
    key: 'createStoreRecord',
    value: function createStoreRecord() {
      this.shouldOverride('createStoreRecord');
    }

    /**
     * @method updateStoreRecord
     * This method is used to create a record from a NGN.DATA.Store source.
     * This method is used as a part of the #enableLiveSync process.
     * Overriding this method will customize the functionality of the
     * live sync feature.
     * @private
     */

  }, {
    key: 'updateStoreRecord',
    value: function updateStoreRecord() {
      this.shouldOverride('updateStoreRecord');
    }

    /**
     * @method deleteStoreRecord
     * This method is used to create a record from a NGN.DATA.Store source.
     * This method is used as a part of the #enableLiveSync process.
     * Overriding this method will customize the functionality of the
     * live sync feature.
     * @private
     */

  }, {
    key: 'deleteStoreRecord',
    value: function deleteStoreRecord() {
      this.shouldOverride('deleteStoreRecord');
    }

    /**
     * @method clearStoreRecords
     * This method is used to remove all records from a NGN.DATA.Store source.
     * This method is used as a part of the #enableLiveSync process.
     * Overriding this method will customize the functionality of the
     * live sync feature.
     * @private
     */

  }, {
    key: 'clearStoreRecords',
    value: function clearStoreRecords() {
      this.shouldOverride('clearStoreRecords');
    }

    /**
     * @method proxyRecordFilter
     * This is a filter method for the NGN.DATA.Store.
     * It will strip out records that shouldn't be saved/fetched/etc.
     * As a result, the NGN.DATA.Store#records will only return records that
     * the proxy should work on, i.e. anything not explicitly prohibited by
     * NGN.DATA.Model#proxyignore.
     */

  }, {
    key: 'proxyRecordFilter',
    value: function proxyRecordFilter(model) {
      if (model.hasOwnProperty('proxyignore')) {
        return !model.proxyignore;
      }

      return true;
    }
  }, {
    key: 'state',
    get: function get() {
      return this._enabled ? 'enabled' : 'disabled';
    }

    /**
     * @property {boolean} enabled
     * Indicates the proxy is enabled.
     * @readonly
     */

  }, {
    key: 'enabled',
    get: function get() {
      return this._enabled;
    }

    /**
     * @property {boolean} disabled
     * Indicates the proxy is disabled.
     * @readonly
     */

  }, {
    key: 'disabled',
    get: function get() {
      return !this._enabled;
    }

    /**
     * @property {string} proxytype
     * The type of underlying data (model or store).
     * @private
     */

  }, {
    key: 'type',
    get: function get() {
      return this.store instanceof NGN.DATA.Store ? 'store' : 'model';
    }

    /**
     * @property {NGN.DATA.ConnectionPool} connectionpool
     * A convenience reference to the global reference pool.
     */

  }, {
    key: 'connectionpool',
    get: function get() {
      return NGN.DATA.ConnectionPool;
    }
  }, {
    key: 'changelog',
    get: function get() {
      var me = this;

      if (this.store === null && !(this instanceof NGN.DATA.Store)) {
        return [];
      }

      return {
        create: this.store._created,
        update: this.store.records.filter(function (record) {
          if (me.store._created.indexOf(record) < 0 && me.store._deleted.indexOf(record) < 0) {
            return false;
          }
          return record.modified;
        }).map(function (record) {
          return record;
        }),
        delete: this.store._deleted
      };
    }
  }], [{
    key: 'shouldOverride',
    value: function shouldOverride(methodName) {
      console.warn(methodName + ' should be overridden by a proxy implementation class.');
    }
  }]);

  return NgnDataProxy;
}(NGN.EventEmitter);

NGN.DATA.Proxy = NgnDataProxy;
// Object.defineProperty(NGN.DATA, 'Proxy', NGN.const(NgnDataProxy))

'use strict';

/**
 * @class NGN.DATA.HttpProxy
 * Provides a gateway to remote services such as HTTP and
 * websocket endpoints. This can be used directly to create
 * custom proxies.
 */

var NgnHttpProxy = function (_NGN$DATA$Proxy) {
  _inherits(NgnHttpProxy, _NGN$DATA$Proxy);

  function NgnHttpProxy(config) {
    _classCallCheck(this, NgnHttpProxy);

    config = config || {};

    var _this41 = _possibleConstructorReturn(this, (NgnHttpProxy.__proto__ || Object.getPrototypeOf(NgnHttpProxy)).call(this, config));

    Object.defineProperties(_this41, {
      /**
       * @configproperty {string} [url=http://localhost
       * The root URL for making network requests (HTTP/WS/TLS).
       */
      url: NGN.public(config.url || 'http://localhost'),

      /**
       * @config {string} username
       * If using basic authentication, provide this as the username.
       */
      username: NGN.public(config.username || null),

      /**
       * @config {string} password
       * If using basic authentication, provide this as the password.
       */
      password: NGN.public(config.password || null),

      /**
       * @config {string} token
       * If using an access token, provide this as the value. This
       * will override basic authentication (#username and #password
       * are ignored). This sets an `Authorization: Bearer <token>`
       * HTTP header.
       */
      token: NGN.public(config.token || null)
    });
    return _this41;
  }

  _createClass(NgnHttpProxy, [{
    key: 'init',
    value: function init(store) {
      _get(NgnHttpProxy.prototype.__proto__ || Object.getPrototypeOf(NgnHttpProxy.prototype), 'init', this).call(this, store);
      NGN.inherit(this, store);
    }
  }]);

  return NgnHttpProxy;
}(NGN.DATA.Proxy);

NGN.DATA.HttpProxy = NgnHttpProxy;
// Object.defineProperty(NGN.DATA, 'HttpProxy', NGN.const(NgnHttpProxy))

/**
 * @layer SANITY
 * The sanity layer adds dummy checks around methods to make sure they are being called correctly throughout the application.
 * It is designed for development, and not meant to be included in production.
 */
NGN.SANITY = {};

Object.defineProperties(NGN.SANITY, {
  /**
   * @method isValid
   * Checks whether or not a method has been called correctly.
   * @private
   * @param {String} methodName The associated method name
   * @param {Array} args The arguments provided with the original method call
   * @returns {Boolean} Whether or not the method has been called correctly
   *
   */
  isValid: NGN.privateconst(function (methodName, args) {
    switch (methodName) {
      case 'EE.emit':
        if (!args.length) {
          return this.warn('emit() called without any arguments. Did you mean to specify an event and payload?');
        }
        break;
      case 'EE.listenerCount':
        if (!args.length) {
          return this.warn('listenerCount() called without any arguments. Did you mean to specify an event?');
        }
        break;
      case 'EE.on':
        if (!args.length) {
          return this.warn('on() called without any arguments. Did you mean to specify an eventName and callback?');
        }
        break;
      case 'EE.prependListener':
        if (!args.length) {
          return this.warn('prependListener() called without any arguments. Did you mean to specify an eventName and callback?');
        }
        break;
      case 'EE.once':
        if (!args.length) {
          return this.warn('once() called without any arguments. Did you mean to specify an eventName and callback?');
        }
        break;
      case 'EE.prependOnceListener':
        if (!args.length) {
          return this.warn('prependOnceListener() called without any arguments. Did you mean to specify an eventName and callback?');
        }
        break;
      case 'EE.off':
        if (!args.length) {
          return this.warn('off() called without any arguments. Did you mean to specify an eventName?');
        }
        break;
      case 'EE.onceoff':
        if (!args.length) {
          return this.warn('onceoff() called without any arguments. Did you mean to specify an eventName?');
        }
        break;
      case 'EE.getAllEvents':
        if (!args.length) {
          return this.warn('getAllEvents() called without any arguments. Did you mean to specify an eventName?');
        }
        break;
    }
    return true;
  }),

  warn: NGN.privateconst(function (msg) {
    console.warn(msg);
    return false;
  })
});

var original = {
  NGN: {
    EventEmitter: {
      emit: NGN.EventEmitter.prototype.emit,
      listenerCount: NGN.EventEmitter.prototype.listenerCount,
      on: NGN.EventEmitter.prototype.on,
      prependListener: NGN.EventEmitter.prototype.prependListener,
      once: NGN.EventEmitter.prototype.once,
      prependOnceListener: NGN.EventEmitter.prototype.prependOnceListener,
      off: NGN.EventEmitter.prototype.off,
      onceoff: NGN.EventEmitter.prototype.onceoff,
      getAllEvents: NGN.EventEmitter.prototype.getAllEvents
    }
  }
};

NGN.EventEmitter.prototype.emit = function () {
  NGN.SANITY.isValid('EE.emit', arguments) ? original.NGN.EventEmitter.emit.apply(this, arguments) : null; // eslint-disable-line no-unused-expressions
};

NGN.EventEmitter.prototype.listenerCount = function () {
  return NGN.SANITY.isValid('EE.listenerCount', arguments) ? original.NGN.EventEmitter.listenerCount.apply(this, arguments) : 0;
};

NGN.EventEmitter.prototype.on = function () {
  NGN.SANITY.isValid('EE.on', arguments) ? original.NGN.EventEmitter.on.apply(this, arguments) : null; // eslint-disable-line no-unused-expressions
};

NGN.EventEmitter.prototype.prependListener = function () {
  NGN.SANITY.isValid('EE.prependListener', arguments) ? original.NGN.EventEmitter.prependListener.apply(this, arguments) : null; // eslint-disable-line no-unused-expressions
};

NGN.EventEmitter.prototype.once = function () {
  NGN.SANITY.isValid('EE.once', arguments) ? original.NGN.EventEmitter.once.apply(this, arguments) : null; // eslint-disable-line no-unused-expressions
};

NGN.EventEmitter.prototype.prependOnceListener = function () {
  NGN.SANITY.isValid('EE.prependOnceListener', arguments) ? original.NGN.EventEmitter.prependOnceListener.apply(this, arguments) : null; // eslint-disable-line no-unused-expressions
};

NGN.EventEmitter.prototype.off = function () {
  NGN.SANITY.isValid('EE.off', arguments) ? original.NGN.EventEmitter.off.apply(this, arguments) : null; // eslint-disable-line no-unused-expressions
};

NGN.EventEmitter.prototype.onceoff = function () {
  NGN.SANITY.isValid('EE.onceoff', arguments) ? original.NGN.EventEmitter.onceoff.apply(this, arguments) : null; // eslint-disable-line no-unused-expressions
};

NGN.EventEmitter.prototype.getAllEvents = function () {
  return NGN.SANITY.isValid('EE.getAllEvents', arguments) ? original.NGN.EventEmitter.getAllEvents.apply(this, arguments) : [];
};Object.defineProperty(NGN, 'version', NGN.const('1.3.15'));

console.info('%cDebugging%c NGN v1.3.15', 'font-weight: bold;', 'font-weight: normal')