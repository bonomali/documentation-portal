(function () {
  'use strict';

  class CustomException extends Error { // eslint-disable-line
    constructor (config) {
      super();

      Object.defineProperty(this, 'frameFilter', NGN.privateconst((frame) => {
        return NGN.nodelike
          ? frame.getFileName() !== __filename && frame.getFileName()
          : frame.getFileName()
      }));

      config = config || {};
      config = typeof config === 'string' ? { message: config } : config;
      config.custom = config.custom || {};

      let me = this;

      this.name = config.name || 'NgnError';
      this.type = config.type || 'TypeError';
      this.severity = config.severity || 'minor';
      this.message = config.message || 'Unknown Error';
      this.category = config.category || 'operational'; // Alternative is "programmer"

      // Cleanup name
      this.name = this.name.replace(/[^a-zA-Z0-9_]/gi, '');

      // Add any custom properties
      for (let attr in config.custom) {
        if (config.custom.hasOwnProperty(attr)) {
          this[attr] = config.custom[attr];
        }
      }

      this.hasOwnProperty('custom') && delete this.custom;

      if (NGN.nodelike || Error.prepareStackTrace) {
        // Capture the stack trace on a new error so the detail can be saved as a structured trace.
        Error.prepareStackTrace = function (_, stack) { return stack };

        let _err = new Error();

        Error.captureStackTrace(_err, this);

        this.rawstack = _err.stack;

        Error.prepareStackTrace = function (err, stack) { // eslint-disable-line handle-callback-err
          me.cause && console.warn(me.cause);
          me.help && console.info(me.help);

          return `${me.name}: ${me.message}\n` + stack.filter(me.frameFilter).map((el) => {
            return `    at ${el}`
          }).join('\n')
        };

        // Enable stack trace
        Error.captureStackTrace(this);
      }
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
    get trace () {
      return this.rawstack.filter(this.frameFilter).map((frame) => {
        return {
          filename: frame.getFileName(),
          line: frame.getLineNumber(),
          column: frame.getColumnNumber(),
          functionname: frame.getFunctionName(),
          native: frame.isNative(),
          eval: frame.isEval(),
          type: frame.getTypeName()
        }
      })
    }
  }

  /**
   * @namespace NGN
   */
  let NGN$1 = Object.defineProperties({
    // Establish a globally recognized namespace for browser or node-like environment.
    get global () {
      try { return window } catch (e) { return global }
    }
  }, {
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
    define: {
      enumerable: false,
      writable: false,
      configurable: false,
      value: function (enumerable, writable, configurable, value) {
        return {
          enumerable,
          writable,
          configurable,
          value
        }
      }
    }
  });

  Object.defineProperties(NGN$1, {
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
    public: NGN$1.define(false, false, false, function (value) {
      return NGN$1.define(true, typeof value !== 'function', false, value)
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
    private: NGN$1.define(false, false, false, function (value) {
      return NGN$1.define(false, typeof value !== 'function', false, value)
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
    const: NGN$1.define(false, false, false, function (value) {
      return NGN$1.define(true, false, false, value)
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
    privateconst: NGN$1.define(false, false, false, function (value) {
      return NGN$1.define(false, false, false, value)
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
    get: NGN$1.define(false, false, false, function (fn) {
      return {
        enumerable: false,
        get: fn
      }
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
    set: NGN$1.define(false, false, false, function (fn) {
      return {
        enumerable: false,
        set: fn
      }
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
    getset: NGN$1.define(false, false, false, (getterFn, setterFn) => {
      return {
        enumerable: false,
        get: getterFn,
        set: setterFn
      }
    }),

    LEDGER_EVENT: NGN$1.define(false, false, false, (EVENT) => {
      return function () {
        NGN$1.BUS.emit(EVENT, ...arguments);
      }
    })
  });

  Object.defineProperties(NGN$1, {
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
    extend: NGN$1.privateconst(function (attribute, descriptor) {
      // If no descriptor is provided, multiple properties are being defined.
      if (typeof attribute === 'object') {
        Object.defineProperties(this, attribute);
      } else {
        Object.defineProperty(this, attribute, descriptor);
      }
    }),

    /**
     * @method inherit
     * Inherit the properties of another object/class.
     * @param  {object|function} source
     * The source object (i.e. what gets copied)
     * @param  {object|function} destination
     * The object properties get copied to.
     */
    inherit: NGN$1.const(function (source = null, dest = null) {
      if (source && dest) {
        source = typeof source === 'function' ? source.prototype : source;
        dest = typeof dest === 'function' ? dest.prototype : dest;

        Object.getOwnPropertyNames(source).forEach(function (attr) {
          const definition = Object.getOwnPropertyDescriptor(source, attr);
          Object.defineProperty(dest, attr, definition);
        });

        const prototype = Object.getOwnPropertyNames(Object.getPrototypeOf(source)).filter((attr) => {
          return attr.trim().toLowerCase() !== 'constructor' && !dest.hasOwnProperty(attr)
        });

        prototype.forEach((attr) => {
          const cfg = Object.getOwnPropertyDescriptor(source, attr);

          if (cfg === undefined && typeof source[attr] === 'function') {
            Object.defineProperty(dest, attr, NGN$1.public(function () {
              return source[attr].apply(this, arguments)
            }));
          }
        });
      }
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
     * ```
     * @param  {Object} obj
     * The object to slice into an array.
     * @return {array}
     * @private
     */
    slice: NGN$1.private(function (obj) {
      return Array.prototype.slice.call(obj)
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
     * ```
     * @param  {Object} obj
     * The object to splice into an array.
     * @return {array}
     * @private
     */
    splice: NGN$1.private(function (obj) {
      return Array.prototype.splice.call(obj)
    }),

    /**
     * @method nullIf
     * Returns a null value if the two specified expressions are equal.
     * ```js
     * if (NGN.nullIf(myvar, 'value') === null) {
     *   console.log('Variable had a value of "value", which is considered null')
     * }
     *
     * // or
     *
     * if (NGN.nullIf(myvar) === null) {
     *   console.log('Empty variable whose trimmed length is 0')
     * }
     * ```
     * @param {any} sourceExpression
     * The variable or value to check.
     * @param {any} [comparisonExpression = '']
     * The variable or value to compare the source expression against.
     * @return {any}
     * If the source expression matches the comparison expression, `null` will
     * be returned. If they do not match, the source expression will be returned.
     */
    nullIf: NGN$1.public(function (sourceExpression, comparisonExpression = '') {
      try {
        // If the values aren't equal, make sure it's not due to blank values
        // or hidden characters.
        if (sourceExpression !== comparisonExpression) {
          // Different data types indicate different values.
          if (typeof sourceExpression !== typeof comparisonExpression) {
            return sourceExpression
          }

          if (typeof sourceExpression === 'string') {
            if (sourceExpression.trim() !== comparisonExpression.trim()) {
              return sourceExpression
            }
          }
        }

        return null
      } catch (e) {
        return null
      }
    }),

    // Private alias for nullIf
    nullif: NGN$1.public(function () {
      return this.nullIf(...arguments)
    }),

    /**
     * @method converge
     * Provides a basic coalesce. Expects the first parameter to be a boolean
     * value. `true` will wrap arguments in a nullIf operator. `false` will not.
     * @private
     */
    converge: NGN$1.private(function () {
      if (arguments.length < 2) {
        return null
      } else if (arguments.length === 2) {
        if (arguments[1] === undefined) {
          return null
        } else if (arguments[0]) {
          return NGN$1.nullIf(arguments[1])
        } else {
          return arguments[1]
        }
      }

      for (let arg = 1; arg < arguments.length; arg++) {
        // try {
        if (arguments[arg] !== undefined &&
          (
            arguments[0] ? NGN$1.nullIf(arguments[arg]) : arguments[arg]
          ) !== null
        ) {
          if (arguments[arg] !== undefined) {
            return arguments[arg]
          }
        }
        // } catch (e) {}
      }

      return null
    }),

    /**
     * @method coalesce
     * Finds the first non-null/defined value in a list of arguments.
     * This can be used with {@link Boolean Boolean} values, since `true`/`false` is a
     * non-null/defined value.
     * @param {Mixed} args
     * Any number of arguments can be passed to this method.
     * @return {Any}
     * Returns the first non-null/defined value. If non exist, `null` is retutned.
     */
    coalesce: NGN$1.public(function () {
      return NGN$1.converge(false, ...arguments)
    }),

    /**
     * @method coalesceb
     * Provides the same functionality as #coalesce, except **b**lank/empty arguments
     * are treated as `null` values.
     * @param {Mixed} args
     * Any number of arguments can be passed to this method.
     */
    coalesceb: NGN$1.public(function () {
      return NGN$1.converge(true, ...arguments)
    }),

    /**
     * @property {boolean} nodelike
     * Indicates NGN is running in a node-like environment supporting
     * the `require` statement. This will detect node, io.js, Electron,
     * NW.js, and other environments presumably supporting Node.js.
     * @private
     */
    nodelike: NGN$1.const(NGN$1.global.process !== undefined),

    /**
     * @method dedupe
     * Deduplicate a simple array.
     * @param {array} array
     * The array to deduplicate.
     * @return {array}
     * The array with unique records.
     * @private
     */
    dedupe: NGN$1.const((array) => {
      let matches = [];

      // This is more performant than array.filter in most cases.
      for (let i = 0; i < array.length; i++) {
        if (array.indexOf(array[i]) === i) {
          matches.push(array[i]);
        }
      }

      array = null;

      return matches
    }),

    /**
     * @method typeof
     * A more specific typeof method.
     * @param  {any} element
     * The element to determine the type of.
     * @return {string}
     * Returns the type (all lower case).
     */
    typeof: NGN$1.const((el) => {
      if (el === undefined) {
        return 'undefined'
      } else if (el === null) {
        return 'null'
      }

      let value = Object.prototype.toString.call(el).split(' ')[1].replace(/[^A-Za-z]/gi, '').toLowerCase();

      if (value === 'function') {
        if (!el.name) {
          return NGN$1.coalesceb(el.toString().replace(/\n/gi, '').replace(/^function\s|\(.*$/mgi, '').toLowerCase(), 'function')
        } else {
          value = NGN$1.coalesceb(el.name, 'function');
        }
      }

      return value.toLowerCase()
    }),

    /**
     * @method forceArray
     * Forces a value to become an array if it is not already one. For example:
     *
     * ```js
     * let x = 'value'
     *
     * x = NGN.forceArray(x)
     *
     * console.log(x) // Outputs ['value']
     * ```
     * @param {any} expression
     * The value being forced to be an array.
     * @private
     */
    forceArray: NGN$1.const((value) => {
      if (value === null) {
        return []
      }

      return NGN$1.typeof(value) === 'array' ? value : [value]
    }),

    /**
     * @method forceBoolean
     * Forces a value to become a boolean if it is not already one. For example:
     *
     * ```js
     * let x = NGN.forceBoolean('false') // String ==> Boolean
     * console.log(x) // Outputs false
     *
     * let y = NGN.forceBoolean('text') // String ==> Boolean
     * console.log(y) // Outputs true (any non-blank text results in true, except the word "false")
     *
     * let z = NGN.forceBoolean(0) // Number ==> Boolean (0 = false, 1 = true)
     * console.log(z) // Outputs false
     * ```
     *
     * All other types will yield a `true` value, except for `null`. A `null`
     * value is treated as `false`.
     * @param {any} expression
     * The value being forced to be a boolean.
     * @private
     */
    forceBoolean: NGN$1.const((value) => {
      switch (NGN$1.typeof(value)) {
        case 'boolean':
          return value

        case 'number':
          return value === 0 ? false : true // eslint-disable-line no-unneeded-ternary

        case 'string':
          value = value.trim().toLowerCase();

          if (value === 'false') {
            return false
          }

          return true

        default:
          return NGN$1.coalesceb(value) !== null
      }
    }),

    /**
     * @method forceNumber
     * Forces a value to become a number if it is not already one. For example:
     *
     * ```js
     * let x = NGN.forceNumber('10') // String ==> Number
     * console.log(x === 10) // Outputs true
     *
     * let y = NGN.forceNumber(true) // Boolean ==> Number
     * console.log(y) // Output 1
     *
     * let z = NGN.forceNumber(false) // Boolean ==> Number
     * console.log(y) // Output 0
     * ```
     *
     * All other types will yield a `NaN` value. This has no effect on
     * @param {any} expression
     * The value being forced to be a number. If the expression is a date,
     * the result will be the number of milliseconds passed since the epoch.
     * See [Date.getTime()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTime)
     * for details.
     * @param {number} [radix]
     * An integer between 2 and 36 that represents the radix (the base in
     * mathematical numeral systems) of the expression.
     * Specify 10 for the decimal numeral system commonly used by humans.
     * Always specify this parameter to eliminate reader confusion and to
     * guarantee predictable behavior. Different implementations produce
     * different results when a radix is not specified, usually defaulting the
     * value to 10.
     *
     * **If no radix is supplied**, the `parseFloat` will be used to identify
     * the numeric value. When a radix is supplied, `parseInt` is used.
     * @private
     */
    forceNumber: NGN$1.const((value, radix = null) => {
      try {
        switch (NGN$1.typeof(value)) {
          case 'boolean':
            return value ? 1 : 0

          case 'number':
            return value

          case 'date':
            return value.getTime()

          case 'string':
            return radix !== null ? parseInt(value, radix) : parseFloat(value)

          default:
            return NaN
        }
      } catch (e) {
        NGN$1.ERROR(e);
        return NaN
      }
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
     *   path: 'path/to/file.js:127:14'
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
    processStackItem: NGN$1.privateconst(function (item, uri) {
      return item.replace(/at.*\(|\)/gi, '')
        .replace(uri, './')
        .replace(/\/{2,100}/gi, '/')
        .trim().split(':')
    }),

    stack: NGN$1.get(function () {
      const originalStack = (new Error).stack.split('\n'); // eslint-disable-line
      let stack = (new Error()).stack.split('\n') || [];
      let fnRegex = /at.*\(/gi;

      stack = stack.filter((item) => {
        return item.split(':').length > 1
      }).map((item) => {
        let operation = fnRegex.exec(item);

        if (operation) {
          operation = operation[0].replace(/^at\s{1,100}|\s{1,100}\($/gi, '').replace('<anonymous>', 'console');
        }

        if (this.nodelike) {
          item = this.processStackItem(item.toString(), process.cwd());

          return {
            path: item.join(':').replace('./', process.cwd() + '/'),
            // path: item[0].substr(0, item[0].length) + ':' + item[1] + ':' + item[2],
            file: item[0].substr(0, item[0].length),
            line: parseInt(item[1], 10),
            column: parseInt(item[2], 10),
            operation: operation
          }
        } else {
          item = this.processStackItem(item.toString(), window.location.origin);

          return {
            path: item[0].substr(1, item[0].length - 1) + ':' + item[1] + ':' + item[2],
            file: item[0].substr(1, item[0].length - 1),
            line: parseInt(item[1], 10),
            column: parseInt(item[2], 10),
            operation: operation
          }
        }
      });

      return stack.length !== 0
        ? (this.nodelike ? stack.reverse() : stack)
        : [{
          path: 'unknown',
          file: 'unknown',
          line: 0,
          column: 0
        }]
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
    isFn: NGN$1.privateconst((v) => {
      return typeof v === 'function'
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
     * @return {function}
     * @private
     */
    wrap: NGN$1.privateconst(function (preFn, fn) {
      return function () {
        preFn(...arguments);
        fn(...arguments);
      }
    }),

    /**
     * @method wrapClass
     * Executes a **synchronous** method before returning an instantiated class.
     * It runs a function first, then returns the equivalent of
     * `new MyClass(...)`. This is primarily designed for displaying warnings,
     * but can also be used for other operations like migration layers.
     * @param {function} preMethod
     * The **synchronous** method to invoke before the class is instantiated. This
     * method receives the same arguments passed to the class.
     * @param {function} class
     * The class to wrap.
     * @return {Class}
     * @private
     */
    wrapClass: NGN$1.privateconst(function (preFn, ClassFn) {
      return function () {
        preFn(...arguments);
        return new ClassFn(...arguments)
      }
    }),

    /**
     * @method deprecate
     * Fires an event (if NGN.BUS is available) or logs a warning indicating the
     * method is deprecated.
     * @param {function} method
     * The method to return/execute.
     * @param {string} [message='The method has been deprecated.']
     * The warning displayed to the user.
     * @return {function}
     * @fires DEPRECATED.METHOD
     * Fires `DEPRECATED.METHOD` on the NGN.BUS. The message is delivered to
     * the event handler.
     */
    deprecate: NGN$1.privateconst(function (fn, message = 'The method has been deprecated.') {
      return this.wrap(() => NGN$1.WARN('DEPRECATED.METHOD', message), fn)
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
     * @fires DEPRECATED.CLASS
     * Fires `DEPRECATED.CLASS` on the NGN.BUS. The message is delivered to
     * the event handler.
     * @return {Class}
     */
    deprecateClass: NGN$1.privateconst(function (classFn, message = 'The class has been deprecated.') {
      return this.wrapClass(() => NGN$1.WARN('DEPRECATED.CLASS', message), classFn)
    }),

    /**
     * @method needs
     * A method to check for the existance of required attributes in an object.
     * This is designed to check for namespace existance.
     *
     * ```js
     * NGN.needs('DOM','BUS', 'NET', 'JUNK') // Throws an error because "JUNK" doesn't exist.
     * ```
     * @param {Object} namespace
     * The object to check.
     * @param {String[]} attributes
     * A list of attributes to check for.
     * @throws {MissingNgnDependencyError}
     * Throws an error if the namespace is missing an attribute dependency.
     * @private
     */
    needs: NGN$1.private(function () {
      let missing = NGN$1.getObjectMissingPropertyNames(NGN$1, ...arguments);

      if (missing.length === 0) {
        return
      }

      // Throw an error if there are any missing attributes.
      if (missing.length > 0) {
        throw new MissingNgnDependencyError(`Missing NGN dependencies: ${missing.join(', ')}`.replace(/\s{2,100}/gi, ' '))
      }
    }),

    /**
     * @method getObjectMissingPropertyNames
     * Given a list, returns which list items are not present in an
     * object's enumerable properties.
     *
     * ```js
     * let obj = { a: 1, b: 2 }
     * let missing = NGN.getObjectMissingPropertyNames(obj, 'a', 'b', 'c')
     *
     * console.log(missing) // Outputs ['c']
     * ```
     * @param {Object} object
     * The object to check.
     * @return {String[]}
     * @private
     */
    getObjectMissingPropertyNames: NGN$1.private(function () {
      let missing = [];
      let properties = Object.keys(arguments[0]);

      for (let i = 1; i < arguments.length; i++) {
        if (properties.indexOf(arguments[i]) < 0) {
          missing.push(arguments[i]);
        }
      }

      return missing
    }),

    /**
     * @method getObjectExtraneousPropertyNames
     * Given a list, returns which enumerable object properties
     * are not in the list.
     *
     * ```js
     * let obj = { a: 1, b: 2, d: 4 }
     * let extra = NGN.getObjectExtraneousPropertyNames(obj, 'a', 'b', 'c')
     *
     * console.log(extra) // Outputs ['d']
     * ```
     * @param {Object} object
     * The object to check.
     * @return {String[]}
     * @private
     */
    getObjectExtraneousPropertyNames: NGN$1.private(function () {
      let properties = Object.keys(arguments[0]);

      for (let i = 1; i < arguments.length; i++) {
        let index = properties.indexOf(arguments[i]);

        if (index >= 0) {
          properties.splice(index, 1);
        }
      }

      return properties
    }),

    /**
     * @method objectHasAll
     * Determines whether the specified object has _all_ of the provided properties.
     * This only accounts for enumerable properties. It also decorates the Boolean
     * result with a property called `properties`, which contains any missing property
     * names.
     *
     * **Example**
     * ```js
     * let check = NGN.objectHasAll(NGN, 'BUS', 'NET')
     *
     * console.log(check) // Outputs: true
     * ```
     *
     * ```js
     * let check = NGN.objectHasAll(NGN, 'BUS', 'NET', 'JUNK')
     *
     * console.log(check) // Outputs: false
     * console.log(check.properties) // Outputs ['JUNK']
     * ```js
     * @param {Object} object
     * The object to check.
     * @return {Boolean}
     */
    objectHasAll: NGN$1.const(function () {
      let properties = Object.keys(arguments[0]);

      for (let i = 1; i < arguments.length; i++) {
        if (properties.indexOf(arguments[i]) < 0) {
          return false
        }
      }

      return true
    }),

    /**
     * @method objectHasAny
     * Determines whether the specified object has _any_ of the requested properties.
     * This only accounts for enumerable properties.
     *
     * **Example**
     * ```js
     * let check = NGN.objectHasAny(NGN, 'BUS', 'NET', 'MORE')
     *
     * console.log(check) // Outputs: true
     * ```
     *
     * ```js
     * let check = NGN.objectHasAny(NGN, 'JUNK1', 'JUNK2', 'JUNK3')
     *
     * console.log(check) // Outputs: false
     * ```js
     * @param {Object} object
     * The object to check.
     * @return {Boolean}
     */
    objectHasAny: NGN$1.const(function () {
      let properties = Object.keys(arguments[0]);

      for (let i = 1; i < arguments.length; i++) {
        if (properties.indexOf(arguments[i]) >= 0) {
          return true
        }
      }

      return false
    }),

    /**
     * @method objectHasExactly
     * Determines whether the specified object has _only_ the requested properties.
     * This only accounts for enumerable properties.
     *
     * **Example**
     * ```js
     * let obj = { a: 1, b: 2 }
     * let check = NGN.objectHasExactly(obj, 'a', 'b')
     *
     * console.log(check) // Outputs: true
     * ```
     *
     * ```js
     * let obj = { a: 1, b: 2, d: 4 }
     * let check = NGN.objectHasExactly(obj, 'a', 'b', 'c')
     *
     * console.log(check) // Outputs: false
     * ```js
     * @param {Object} object
     * The object to check.
     * @return {Boolean}
     */
    objectHasExactly: NGN$1.const(function () {
      // If there are missing properties, it's not an exact match.
      if (this.getObjectMissingPropertyNames(arguments[0]).length !== 0) {
        return false
      }

      let properties = Object.keys(arguments[0]);
      let args = NGN$1.slice(arguments);

      args.shift();

      // Check for extra properties on the object
      for (let i = 0; i < properties.length; i++) {
        if (args.indexOf(properties[i]) < 0) {
          return false
        }
      }

      // Make sure there are enough properties.
      for (let i = 0; i < args.length; i++) {
        if (properties.indexOf(args[i]) < 0) {
          return false
        }
      }

      return true
    }),

    /**
     * @method objectRequires
     * This is the same as #objectHasAll, but will throw an
     * error if the object is missing any properties.
     * @throws Error
     */
    objectRequires: NGN$1.const(function () {
      let check = this.objectHasAll(...arguments);

      if (!check) {
        throw new Error(`${arguments[0].constructor.name} is missing the following attributes: ${check.missing.join(', ')}`)
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
    createAlias: NGN$1.private(function (namespace, name, value) {
      Object.defineProperty(namespace, name, NGN$1.get(() => {
        return value
      }));
    }),

    /**
     * @method WARN
     * This method is used to emit special info events.
     * The NGN.BUS can listen for all events using the NGN.WARN global symbol.
     *
     * ```js
     * NGN.BUS.on(NGN.WARNING_EVENT, function () => {
     *   console.warn(...arguments)
     * })
     * ```
     *
     * See NGN.EventEmitter#emit for detailed parameter usage.
     * @private
     */
    WARNING_EVENT: NGN$1.privateconst(Symbol('NGN.WARN')),
    WARN: NGN$1.privateconst(msg => NGN$1.LEDGER_EVENT(NGN$1.WARNING_EVENT)(msg)),

    /**
     * @method INFO
     * This method is used to emit special warning events.
     * The NGN.BUS can listen for all events using the NGN.INFO global symbol.
     *
     * ```js
     * NGN.BUS.on(NGN.INFO_EVENT, function () => {
     *   console.info(...arguments)
     * })
     * ```
     *
     * See NGN.EventEmitter#emit for detailed parameter usage.
     * @private
     */
    INFO_EVENT: NGN$1.privateconst(Symbol.for('NGN.INFO')),
    INFO: NGN$1.privateconst(msg => NGN$1.LEDGER_EVENT(NGN$1.INFO_EVENT)(msg)),

    /**
     * @method ERROR
     * This method is used to emit special soft error events. A soft error
     * is one that does not throw, but does get logged (typically non-critical).
     * The NGN.BUS can listen for all events using the NGN.ERROR global symbol.
     *
     * ```js
     * NGN.BUS.on(NGN.ERROR_EVENT, function () => {
     *   console.info(...arguments)
     * })
     * ```
     *
     * See NGN.EventEmitter#emit for detailed parameter usage.
     * @private
     */
    ERROR_EVENT: NGN$1.privateconst(Symbol.for('NGN.ERROR')),
    ERROR: NGN$1.privateconst(msg => NGN$1.LEDGER_EVENT(NGN$1.ERROR_EVENT)(msg)),

    /**
     * @method createException
     * Create a custom global exception (custom error).
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
    createException: NGN$1.const(function (config) {
      config = config || {};
      config = typeof config === 'string' ? { message: config } : config;
      config.name = config.name || 'NgnError';

      // Create the error as a function
      NGN$1.global[config.name] = function () {
        if (arguments.length > 0) {
          config.message = arguments[0];
        }

        return new CustomException(config)
      };
    }),

    /**
     * @method getType
     * Returns the primitive object/function of the specified type.
     * For example:
     *
     * ```js
     * let type = NGN.getType('number') // Returns Number
     * let type = NGN.getType('string') // Returns String
     * ```
     */
    getType: NGN$1.const(function (type, defaultType) {
      switch (type.trim().toLowerCase()) {
        case 'number':
          return Number

        case 'regex':
          NGN$1.WARN('regex is not a valid JavaScript type. Using regexp instead.');

        case 'regexp': // eslint-disable-line no-fallthrough
          return RegExp

        case 'boolean':
          return Boolean

        case 'symbol':
          return Symbol

        case 'date':
          return Date

        case 'array':
          return Array

        case 'object':
          return Object

        case 'function':
          return Function

        case 'string':
          return String

        default:
          if (defaultType) {
            return defaultType
          }

          return undefined
      }
    })
  });

  // Standard NGN Exceptions
  NGN$1.createException({
    name: 'MissingNgnDependencyError',
    type: 'MissingNgnDependencyError',
    severity: 'critical',
    message: 'An NGN dependency is missing or could not be found.',
    category: 'programmer',
    custom: {
      help: 'Include the missing library.',
      cause: 'A required dependency was not included, or it was not included in the correct sequence.'
    }
  });

  NGN$1.createException({
    name: 'ReservedWordError',
    type: 'ReservedWordError',
    severity: 'critical',
    message: 'An attempt to use a reserved word failed.',
    category: 'programmer',
    custom: {
      help: 'Use an alternative word.',
      cause: 'A word was used to define an attribute, method, field, or other element that already exists.'
    }
  });

  NGN$1.createException({
    name: 'InvalidConfigurationError',
    type: 'InvalidConfigurationError',
    severity: 'critical',
    message: 'Invalid configuration.',
    category: 'programmer',
    custom: {
      help: 'See the documentation for the proper configuration.',
      cause: 'The configuration specified was marked as invalid or caused an error during instantiation.'
    }
  });

  // Self reference to make NGN global in any environment.
  NGN$1.global.NGN = NGN$1;

  /**
   * @class EventEmitterBase
   * This is an extendable generic class used to apply event management
   * to non-DOM objects, such as data models, logging, and other common
   * elements of JavaScript programming.
   * @protected
   */
  class BrowserEmitter { // eslint-disable-line no-unused-vars
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
    constructor (cfg) {
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
    get subscribers () {
      let subscriberList = {};

      for (let eventName in this.handlers) {
        subscriberList[eventName] = {
          handler: this.handlers[eventName].length,
          adhoc: 0
        };
      }

      for (let eventName in this.adhoc) {
        subscriberList[eventName] = subscriberList[eventName] || {
          handler: 0
        };

        subscriberList[eventName].adhoc = this.adhoc[eventName].length;
      }

      return subscriberList
    }

    /**
     * @property defaultMaxListeners
     * The maximum number of listeners for a single event.
     */
    get defaultMaxListeners () {
      return this.maxlisteners
    }

    set defaultMaxListeners (value) {
      this.maxlisteners = value;
    }

    /**
     * @method {number} listenerCount
     * The number of listeners for a specific event.
     * @param {string} eventName
     * The name of the event to count listeners for.
     */
    listenerCount (eventName) {
      return (this.handlers[eventName] || []).length +
        (this.adhoc[eventName] || []).length
    }

    /**
     * @method getMaxListeners
     * A node-like reference to the #defaultMaxListeners value.
     * @return {number}
     */
    getMaxListeners () {
      return this.defaultMaxListeners
    }

    /**
     * @method setMaxListeners
     * A node-like reference to the #defaultMaxListeners value (setter).
     */
    setMaxListeners (value) {
      this.defaultMaxListeners = value;
    }

    /**
     * @method eventNames
     * A node-like reference providing an array of recognized event names.
     * @return {array}
     */
    eventNames () {
      let handlers = Object.keys(this.handlers);
      let adhoc = Object.keys(this.adhoc);
      return NGN.dedupe(handlers.concat(adhoc))
    }

    /**
     * @method listeners
     * Returns the raw listener methods for the event.
     * @param {string} eventName
     * Name of the event to retrieve listeners for.
     * @return {array}
     */
    listeners (eventName) {
      let handlers = this.handlers[eventName] || [];
      let adhoc = this.adhoc[eventName] || [];
      return handlers.concat(adhoc)
    }

    /**
     * @method addListener
     * Create a new event handler for the specified event.
     * @param  {string|object} eventName
     * Name of the event to listen for.
     * If an object is passed, this method will automatically setup a #pool.
     * @param  {Function} handler
     * The method responsible for responding to the event.
     * This is ignored if eventName is an object.
     */
    addListener (eventName, callback) {
      if (typeof eventName === 'object') {
        return this.pool(eventName)
      }

      this.handlers[eventName] = this.handlers[eventName] || [];
      this.handlers[eventName].unshift(callback);
      this.emit('newListener', eventName, callback);

      if (this.listenerCount(eventName) > this.maxlisteners) {
        throw new Error('Maximum event listeners exceeded. Use setMaxListeners() to adjust the level.')
      }
    }

    /**
     * @method prependListener
     * This is the same as #addListener, except the event handler is added to the end of the queue.
     * @param  {string|object} eventName
     * Name of the event to listen for.
     * If an object is passed, this method will automatically setup a #pool.
     * @param  {Function} handler
     * The method responsible for responding to the event.
     * This is ignored if eventName is an object.
     */
    prependListener (eventName, callback) {
      if (typeof eventName === 'object') {
        return this.pool(eventName)
      }

      this.handlers[eventName] = this.handlers[eventName] || [];
      this.handlers[eventName].push(callback);
      this.emit('newListener', eventName, callback);

      if (this.listenerCount(eventName) > this.maxlisteners) {
        throw new Error('Maximum event listeners exceeded. Use setMaxListeners() to adjust the level.')
      }
    }

    /**
     * @method onceListener
     * Create a new event handler for the specified event. The
     * handler will be removed immediately after it is executed. This
     * effectively listens for an event to happen once and only once
     * before the handler is destroyed.
     * @param  {string} eventName
     * Name of the event to listen for.
     * @param  {Function} handler
     * The method responsible for responding to the event.
     */
    once (eventName, callback) {
      this.adhoc[eventName] = this.adhoc[eventName] || [];
      this.adhoc[eventName].push(callback);
      this.emit('newListener', eventName, callback);

      if (this.listenerCount(eventName) > this.maxlisteners) {
        throw new Error('Maximum event listeners exceeded. Use setMaxListeners() to adjust the level.')
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
    prependOnceListener (eventName, callback) {
      this.adhoc[eventName] = this.adhoc[eventName] || [];
      this.adhoc[eventName].unshift(callback);
      this.emit('newListener', eventName, callback);

      if (this.listenerCount(eventName) > this.maxlisteners) {
        throw new Error('Maximum event listeners exceeded. Use setMaxListeners() to adjust the level.')
      }
    }

    /**
     * @method removeListener
     * Remove an event handler. If no handler is specified, all handlers for
     * the specified event will be removed.
     * @param {string} eventName
     * Name of the event to remove.
     * @param {function} [handlerFn]
     * The handler function to remove from the event handlers.
     */
    removeListener (eventName, handlerFn) {
      this.deleteEventHandler('handlers', eventName, handlerFn);
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
    deleteEventHandler (type, eventName, handlerFn) {
      let scope = this[type];

      if (scope[eventName]) {
        if (!handlerFn) {
          delete scope[eventName];
          return
        }

        let result = [];
        scope[eventName].forEach((handler) => {
          if (handler.toString() !== handlerFn.toString()) {
            result.push(handler);
          }
        });

        if (result.length === 0) {
          delete scope[eventName];
          return
        }

        scope[eventName] = result;
      }
    }

    /**
     * @method removeAllListeners
     * Remove all event handlers from the EventEmitter (both regular and adhoc).
     */
    removeAllListeners (eventName = null) {
      if (eventName !== null) {
        delete this.handlers[eventName];
        delete this.adhoc[eventName];
      } else {
        this.handlers = {};
        this.adhoc = {};
      }
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
    emit () {
      let args = NGN.slice(arguments);
      const eventName = args.shift();
      const events = this.getAllEvents(eventName);

      if (typeof eventName === 'symbol') {
        events.push(eventName);
      }

      let scope = {
        event: eventName
      };

      for (let name = 0; name < events.length; name++) {
        let adhocEvent = this.adhoc[events[name]];

        // Adhoc event handling
        if (adhocEvent) {
          delete this.adhoc[events[name]];

          while (adhocEvent.length > 0) {
            let fn = adhocEvent.pop();

            scope.handler = fn;

            fn.apply(scope, args);
          }
        }

        // Regular event handling
        let handler = this.handlers[events[name]];

        if (handler) {
          for (let fn = 0; fn < handler.length; fn++) {
            scope.handler = handler[fn];
            handler[fn].apply(scope, args);
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
    getAllEvents (eventName) {
      const regularEvents = Object.keys(this.handlers);
      const adhocEvents = Object.keys(this.adhoc);
      let allEvents = NGN.dedupe(regularEvents.concat(adhocEvents));

      allEvents = allEvents.filter(function (event) {
        // If the event is an exact match, don't filter it out.
        if (event === eventName) {
          return true
        }

        // If the event is a regexp/wildcard, further processing is necessary.
        if (NGN.typeof(event) === 'regexp' || event.indexOf('*') >= 0) {
          // Convert wildcard events to a regular expression.
          if (NGN.typeof(event) !== 'regexp') {
            event = new RegExp(event.replace(/\./g, '\\.').replace(/\*/g, '.*'), 'g');
          }
          // If the event name matches the event, keep it.
          return event.test(eventName)
        }

        // None of the criteria were met. Ignore the event.
        return false
      });

      return allEvents
    }
  }

  // This chunk of awful is courtesy the StandardJS library!
  /* end-browser-only */
  let EEmitter;
  /* browser-only */
  EEmitter = BrowserEmitter;
  /* end-browser-only */

  /**
   * @class NGN.EventEmitter
   * The EventEmitter is an extandable event driver non-DOM objects, such as
   * data models, objects, and other common elements of JavaScript programming.
   *
   * The NGN.EventEmitter is based on and compatible with the [Node.js EventEmitter](https://nodejs.org/dist/latest/docs/api/events.html#events_class_eventemitter).
   * It contains additional event management capabilities, which are available
   * in browser _and_ Node.js environments.
   */
  class EventEmitter extends EEmitter {
    constructor () {
      super();

      // const INSTANCE = Symbol('instance')

      Object.defineProperties(this, {
        // META: NGN.get(() => this[INSTANCE]),

        META: NGN.private({
          queued: {},
          collectionQueue: {},
          thresholdQueue: {},
          defaultTTL: -1,
          wildcardEvents: new Set()
        }),

        /**
         * @method setTTL
         * Set a default time-to-live for event handlers (in milliseconds).
         * After the TTL period elapses, event handlers are removed.
         * By default, there is no TTL (`-1`).
         * @param {number} ttl
         * The number of milliseconds before an event handler is automatically
         * removed. This value may be `-1` (no TTL/never expires) or a value
         * greater than `0`.
         */
        setTTL: NGN.const((ttl = -1) => {
          if (ttl === 0) {
            NGN.WARN('NGN.EventEmitter#TTL cannot be 0.');
            return
          }

          this.META.defaultTTL = ttl;
        }),

        /**
         * @alias off
         * Remove an event handler. If no handler is specified, all handlers for
         * the specified event will be removed.
         * This is a shortcut for #removeListener.
         * @param {string} eventName
         * Name of the event to remove.
         * @param {function} [handlerFn]
         * The handler function to remove from the event handlers.
         */
        off: NGN.public((eventName, handlerFn) => {
          if (NGN.typeof(eventName) === 'array') {
            for (let i = 0; i < eventName.length; i++) {
              this.off(eventName[i], handlerFn);
            }

            return
          }

          let l = this.listeners(eventName);

          if (!NGN.isFn(handlerFn)) {
            return this.clear(eventName)
          }

          let wrappedHandlerFn = this.wrapEventHandlerWithScope(eventName, handlerFn);

          if (l.indexOf(wrappedHandlerFn) < 0) {
            for (let i = 0; i < l.length; i++) {
              if (l[i].toString() === wrappedHandlerFn.toString()) {
                this.META.wildcardEvents.delete(eventName);
                // this.removeListener(eventName, handlerFn)
                this.removeListener(eventName, l[i], false);
                break
              }
            }
          } else {
            this.META.wildcardEvents.delete(eventName);
            this.removeListener(eventName, handlerFn);
          }
        }),

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
        deprecate: NGN.const((deprecatedEventName, replacementEventName) => {
          const me = this;

          this.on(deprecatedEventName, function () {
            NGN.WARN(`${deprecatedEventName} is deprecated. ` + (!replacementEventName ? '' : `Use ${replacementEventName} instead.`));

            if (replacementEventName) {
              let args = NGN.slice(arguments);

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
         * NGN.BUS.pool('prefix.', {
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
         * @private
         */
        pool: NGN.privateconst(function (prefix, group) {
          if (typeof prefix !== 'string') {
            group = prefix;
            prefix = '';
          }

          let pool = {};

          for (let eventName in group) {
            let topic = `${NGN.coalesce(prefix, '')}${eventName}`;

            if (NGN.isFn(group[eventName])) {
              this.increaseMaxListeners();

              pool[eventName] = this.on(topic, group[eventName]);
            } else if (typeof group[eventName] === 'object') {
              this.pool(`${topic}.`, group[eventName]);
            } else {
              NGN.WARN(`${topic} could not be pooled in the event emitter because it's value is not a function.`);
            }
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
          preventDefaultAction = NGN.coalesce(preventDefaultAction, false);

          return (e) => {
            if (preventDefaultAction && !NGN.nodelike) {
              e.preventDefault();
            }

            this.emit(eventName, ...arguments);
          }
        }),

        /**
         * @method increaseMaxListeners
         * Increase the number of maximum listeners.
         * @param {Number} [value = 1]
         * The number of events the max listener account will be increased by.
         * @private
         */
        increaseMaxListeners: NGN.private((count = 1) => {
          this.setMaxListeners(this.getMaxListeners() + count);
        }),

        /**
         * @method decreaseMaxListeners
         * Decrease the number of maximum listeners.
         * @param {Number} [value = 1]
         * The number of events the max listener account will be decreased by.
         * @private
         */
        decreaseMaxListeners: NGN.private((count = 1) => {
          this.setMaxListeners(this.getMaxListeners() - count);
        }),

        /**
         * @method forward
         * A special subscriber that fires one or more event in response to
         * to an event. This is used to bubble events up/down an event chain.
         *
         * For example:
         *
         * ```js
         * NGN.BUS.forward('sourceEvent', ['someEvent','anotherEvent'], {payload:true})
         * ```
         * When `sourceEvent` is published, the bind method triggers `someEvent` and
         * `anotherEvent`, passing the payload object to `someEvent` and
         * `anotherEvent` subscribers simultaneously.
         *
         * To forward an event to another EventEmitter, see #relay.
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
          triggers = NGN.forceArray(triggers);

          let me = this;
          let listener = function () {
            let args = NGN.slice(arguments);

            if (payload) {
              args.push(payload);
            }

            me.emit(triggers, ...args);
          };

          this.increaseMaxListeners();
          this.on(eventName, listener);

          // Provide handle back for removal of topic
          return {
            remove: () => {
              this.decreaseMaxListeners();
              this.off(eventName, listener);
            }
          }
        }),

        /**
         * This relays an entire event to a different event emitter.
         * For example:
         *
         * ```js
         * let emitterA = new NGN.EventEmitter()
         * let emitterB = new NGN.EventEmitter()
         *
         * emitterA.relay('my.event', emitterB)
         *
         * emitterB.on('my.event', () => { console.log('Emitter B heard the event!') })
         *
         * emitterA.emit('my.event') // Outputs "Emitter B heard the event!"
         * ```
         * @param  {string} eventName
         * The name of the event to listen for.
         * @param  {NGN.EventEmitter} targetEmitter
         * The emitter to relay the event to.
         * @param {string} [prefix]
         * An optional prefix to prepend to the eventName.
         * @param {string} [postfix]
         * An optional postfix to append to the eventName.
         */
        relay: NGN.const(function (eventName, targetEmitter, prefix = null, postfix = null) {
          let eventNameList = NGN.forceArray(eventName);

          for (let i = 0; i < eventNameList.length; i++) {
            let eventName = eventNameList[i];

            this.on(eventName, function () {
              if (NGN.typeof(this.event) === 'symbol') {
                if (prefix !== null || postfix !== null) {
                  NGN.INFO('Cannot relay a symbol-based event with a prefix/postfix.');
                }

                targetEmitter.emit(...arguments);
              } else {
                targetEmitter.emit(`${NGN.coalesce(prefix, '')}${this.event}${NGN.coalesce(postfix, '')}`, ...arguments);
              }
            });
          }
        }),

        /**
         * This relays an entire event to a different event emitter. This is
         * the same as #relay, but the event handler is removed after the
         * first invocation of the event.
         *
         * For example:
         *
         * ```js
         * let emitterA = new NGN.EventEmitter()
         * let emitterB = new NGN.EventEmitter()
         *
         * emitterA.relayOnce('my.event', emitterB)
         *
         * emitterB.on('my.event', () => { console.log('Emitter B heard the event!') })
         *
         * emitterA.emit('my.event') // Outputs "Emitter B heard the event!"
         * emitterA.emit('my.event') // Does nothing
         * ```
         * @param  {string} eventName
         * The name of the event to listen for.
         * @param  {NGN.EventEmitter} targetEmitter
         * The emitter to relay the event to.
         * @param {string} [prefix]
         * An optional prefix to prepend to the eventName.
         * @param {string} [postfix]
         * An optional postfix to append to the eventName.
         */
        relayOnce: NGN.const(function (eventName, targetEmitter, prefix = null, postfix = null) {
          let eventNameList = NGN.forceArray(eventName);

          for (let i = 0; i < eventNameList.length; i++) {
            let eventName = eventNameList[i];

            this.once(eventName, function () {
              if (NGN.typeof(this.event) === 'symbol') {
                if (prefix !== null || postfix !== null) {
                  NGN.INFO('Cannot relay a symbol-based event with a prefix/postfix.');
                }

                targetEmitter.emit(...arguments);
              } else {
                targetEmitter.emit(`${NGN.coalesce(prefix, '')}${this.event}${NGN.coalesce(postfix, '')}`, ...arguments);
              }
            });
          }
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
         *   // Wait 300 milliseconds to trigger the save event
         *   NGN.BUS.delayEmit('user.save', 300)
         * })
         *
         * // Save the user using an API
         * NGN.BUS.on('user.save', function () {
         *   NGN.NET.put({
         *     url: 'https://my.api.com/user',
         *     json: user.data
         *   })
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
          if (!this.META.queued.hasOwnProperty(eventName)) {
            let args = NGN.slice(arguments);
            args.splice(1, 1);

            this.META.queued[eventName] = setTimeout(() => {
              delete this.META.queued[eventName];
              this.emit(...args);
            }, delay);
          }
        }),

        /**
         * @method getInternalCollectionId
         * Returns a unique ID for special collections.
         * @param {object} collection
         * The collection to generate an ID for.
         * @private
         */
        getInternalCollectionId: NGN.privateconst(function (collection) {
          return Symbol(collection)
          // let time = (new Date()).getTime().toString()
          // let rand = Math.random().toString()
          // let key = Object.keys(collection).length + 1
          //
          // while (collection.hasOwnProperty(`${key.toString()}${time}${rand}`)) {
          //   key++
          // }
          //
          // return `${key.toString()}${time}${rand}`
        }),

        /**
         * @method handleCollectionTrigger
         * A method to manage #chain event handlers.
         * @private
         */
        handleCollectionTrigger: NGN.privateconst(function (eventName, key) {
          let me = this;

          return function () {
            // Use setTimeout to simulate nextTick
            setTimeout(() => {
              let cq = me.META.collectionQueue;

              if (cq[key]) {
                cq[key].remainingqueue.delete(eventName);

                if (cq[key].remainingqueue.size === 0) {
                  cq[key].remainingqueue = cq[key].masterqueue;

                  if (NGN.isFn(cq[key].eventName)) {
                    cq[key].eventName(cq[key].payload);
                  } else {
                    me.emit(cq[key].eventName, cq[key].payload);
                  }
                }
              }
            }, 0);
          }
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
         * // The handler can be removed with the special method:
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
        funnel: NGN.const((eventCollection, triggerEventName, payload = null) => {
          if (NGN.typeof(eventCollection) !== 'array') {
            throw new Error(`NGN.BUS.funnel expected an array of events, but received a(n) ${NGN.typeof(eventCollection)}`)
          }

          let collection = new Set(eventCollection);
          let key = this.getInternalCollectionId(this.META.collectionQueue);

          this.META.collectionQueue[key] = {};

          Object.defineProperties(this.META.collectionQueue[key], {
            masterqueue: NGN.const(new Set(eventCollection)),
            remainingqueue: NGN.private(collection),
            eventName: NGN.const(triggerEventName),
            remove: NGN.const(() => {
              this.META.collectionQueue[key].masterqueue.forEach(event => {
                this.off(event, this.handleCollectionTrigger(event, key));
              });

              this.decreaseMaxListeners(this.META.collectionQueue[key].masterqueue.size);

              delete this.META.collectionQueue[key];
            }),
            payload: NGN.const(payload)
          });

          this.increaseMaxListeners(collection.size);

          collection.forEach(event => {
            this.on(event, this.handleCollectionTrigger(event, key));
          });

          return this.META.collectionQueue[key]
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
        funnelOnce: NGN.const((eventCollection, triggerEventName, payload = null) => {
          let funnelClosureEvent = `::NGNFUNNEL::${(new Date()).getTime()}::${triggerEventName}`;
          // let funnelClosureEvent = Symbol(triggerEventName)
          let collection = this.funnel(eventCollection, funnelClosureEvent, payload);

          this.increaseMaxListeners();
          this.once(funnelClosureEvent, () => {
            collection.remove();
            collection = null;
            this.emit(triggerEventName, payload);
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
        threshold: NGN.const(function (thresholdEventName, limit, finalEventName, payload = null) {
          if (typeof thresholdEventName !== 'string') {
            throw new Error('The threshold event name must be a string (received ' + (typeof thresholdEventName) + ')')
          }

          // let key = `${this.getInternalCollectionId(this.META.thresholdQueue)}${limit.toString()}`
          let key = this.getInternalCollectionId(this.META.thresholdQueue);

          this.META.thresholdQueue[key] = {};

          Object.defineProperties(this.META.thresholdQueue[key], {
            key: NGN.const(key),
            eventName: NGN.const(thresholdEventName),
            limit: NGN.const(limit),
            count: NGN.private(0),
            finalEventName: NGN.const(finalEventName),
            remove: NGN.const(() => {
              let event = this.META.thresholdQueue[key].eventName;

              delete this.META.thresholdQueue[key];

              this.decreaseMaxListeners();
              this.off(event, this.handleThresholdTrigger(key));
            }),
            payload: NGN.const(payload)
          });

          this.increaseMaxListeners();
          this.on(thresholdEventName, this.handleThresholdTrigger(key));

          return this.META.thresholdQueue[key]
        }),

        thresholdOnce: NGN.const(function (thresholdEventName, limit, finalEventName, payload = null) {
          let thresholdClosureEvent = `::NGNTHRESHOLD::${(new Date()).getTime()}::${finalEventName}`;
          let threshold = this.threshold(thresholdEventName, limit, thresholdClosureEvent, payload);

          this.once(thresholdClosureEvent, () => {
            threshold.remove();
            threshold = null;
            this.emit(finalEventName, payload);
          });
        }),

        /**
         * @method handleThresholdTrigger
         * A method to manage #threshold event handlers.
         * @private
         */
        handleThresholdTrigger: NGN.const(function (key) {
          let me = this;
          return function () {
            // Use setTimeout to simulate nextTick
            setTimeout(() => {
              if (me.META.thresholdQueue.hasOwnProperty(key)) {
                me.META.thresholdQueue[key].count++;
                if (me.META.thresholdQueue[key].count === me.META.thresholdQueue[key].limit) {
                  if (NGN.isFn(me.META.thresholdQueue[key].finalEventName)) {
                    me.META.thresholdQueue[key].finalEventName(me.META.thresholdQueue[key].payload);
                  } else {
                    me.emit(me.META.thresholdQueue[key].finalEventName, me.META.thresholdQueue[key].payload);
                  }

                  // This if statement is required in case the event is removed
                  // during the reset process.
                  if (me.META.thresholdQueue.hasOwnProperty(key)) {
                    me.META.thresholdQueue[key].count = 0;
                  }
                }
              }
            }, 0);
          }
        }),

        /**
         * An internal method to wrap node-based event handlers
         * with the proper scope.
         * @param {string} eventName
         * The name of the event being handled.
         * @param {function} handlerFn
         * The handler function.
         */
        wrapEventHandlerWithScope: NGN.privateconst((name, fn) => {
          if (!NGN.nodelike) {
            return fn
          }

          const handlerFn = fn;

          return function () {
            let args = arguments;

            if (typeof args[args.length - 1] === 'symbol') {
              name = args[args.length - 1].toString().replace(/Symbol\(|\)/gi, '');
              args = NGN.slice(args);
              args.pop();
            }

            handlerFn.apply({ event: name }, args);
          }
        }),

        /**
         * An internal method to apply scope based on whether the handler
         * is a Node-like "once" emitter or not.
         * @param {string} eventName
         * The name of the event being scoped.
         * @param {function} handlerFn
         * The handler function.
         */
        applyScope: NGN.privateconst((args) => {
          if (NGN.nodelike && args.length > 1) {
            if (args[args.length - 1].listener) {
              args[args.length - 1].listener = this.wrapEventHandlerWithScope(
                args[0],
                args[args.length - 1].listener
              );
            } else {
              args[args.length - 1] = this.wrapEventHandlerWithScope(
                args[0],
                args[args.length - 1]
              );
            }
          }
        })
      });
    }

    /**
     * Remove all event handlers from the EventEmitter (both regular and adhoc).
     * This is a shortcut for #removeAllListeners.
     */
    clear () {
      let events = NGN.slice(arguments);

      if (events.length === 0) {
        this.META.wildcardEvents.clear();

        let symbolEvents = [];

        if (NGN.nodelike) {
          symbolEvents = Object.getOwnPropertySymbols(this._events);
        } else {
          symbolEvents = Object.getOwnPropertySymbols(this.adhoc);
          symbolEvents = symbolEvents.concat(Object.getOwnPropertySymbols(this.handlers));
        }

        for (let i = 0; i < symbolEvents.length; i++) {
          this.removeAllListeners(symbolEvents[i]);
        }

        return this.removeAllListeners()
      }

      for (let i = 0; i < events.length; i++) {
        this.META.wildcardEvents.delete(events[i]);
        this.removeAllListeners(events[i]);
      }
    }

    /**
     * Internal method used to handle TTL and wildcard management.
     * @private
     */
    eventHandler (eventName, callback, ttl, prepend = false) {
      if (NGN.typeof(ttl) === 'boolean') {
        prepend = ttl;
        ttl = this.META.defaultTTL;
      }

      if (ttl === undefined) {
        ttl = this.META.defaultTTL;
      }

      if (ttl > 0) {
        setTimeout(() => this.off(eventName, callback), ttl);
      }

      if (typeof eventName === 'string' && eventName.indexOf('*') >= 0) {
        this.META.wildcardEvents.add(eventName);
      }

      return prepend
    }

    /**
     * @method on
     * Create a new event handler for the specified event.
     * @param {string|string[]|object} eventName
     * Name of the event to listen for.
     * If an object is passed, this method will automatically setup a #pool.
     * @param {function} handler
     * The method responsible for responding to the event.
     * This is ignored if eventName is an object.
     * @param {number} [TTL]
     * Time-To-Live is the number of milliseconds before the event handler
     * is automatically removed. This is useful for automatically cleaning
     * up limited-life event handlers.
     * @param {boolean} [prepend=false]
     * When set to `true`, the event is added to the beginning of
     * the processing list instead of the end.
     * This is ignored if eventName is an object.
     */
    on (eventName, callback, ttl, prepend = false) {
      if (NGN.typeof(eventName) === 'array') {
        for (let i = 0; i < eventName.length; i++) {
          this.on(eventName[i], callback, ttl, prepend);
        }

        return
      }

      if (this.eventHandler(...arguments)) {
        this.prependListener(eventName, callback);
      } else {
        this.addListener(eventName, callback);
      }
    }

    /**
     * @method once
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
    once (eventName, callback, ttl, prepend = false) {
      if (NGN.typeof(eventName) === 'array') {
        for (let i = 0; i < eventName.length; i++) {
          this.once(eventName[i], callback, ttl, prepend);
        }

        return
      }

      if (this.eventHandler(...arguments)) {
        this.prependOnceListener(eventName, callback);
      } else {
        super.once(eventName, this.wrapEventHandlerWithScope(eventName, callback));
      }
    }

    // The following methods override the Node event emitter only when necessary.
    prependListener () {
      this.applyScope(arguments);
      super.prependListener(...arguments);
    }

    prependOnceListener () {
      this.applyScope(arguments);
      super.prependOnceListener(...arguments);
    }

    addListener () {
      this.applyScope(arguments);
      super.addListener(...arguments);
    }

    removeListener () {
      if (arguments[arguments.length - 1] !== true) {
        this.applyScope(arguments);
      }

      super.removeListener(...arguments);
    }

    /**
     * @method emit
     * Emits an event.
     * @param {string[]} eventName
     * The event name can be a string or an array of strings. If an array
     * of strings is specified, an event will be fired for each event name
     * within the array.
     * @param {any} [payload]
     * An optional payload. This can be any number of additional arguments.
     */
    emit () {
      if (NGN.typeof(arguments[0]) === 'array') {
        let args = NGN.slice(arguments);
        let eventNames = args.shift();

        for (let i = 0; i < eventNames.length; i++) {
          this.emit(eventNames[i], ...args);
        }

        return
      }

      // This catches non-string event names. NGN internally uses Symbols
      // for the NGN.WARN/INFO/ERROR event names to prevent name collisions.
      // This check provides support for these special events. These types
      // of events will never have wildcards.
      if (!NGN.nodelike || !arguments[0] || this.META.wildcardEvents.size === 0) {
        super.emit(...arguments);
        return
      }

      if (NGN.nodelike && typeof arguments[0] === 'symbol') {
        super.emit(...arguments);
        return
      }

      /**
       * The NGN browser-based event emitter supports wildcards natively, but
       * Node.js does not. This adds simple wildcard support for Node. The
       * only wildcard character supported at this time is `*`. This feature
       * will check the event name for the existance of a wildcard. If a
       * wilcard character is present, the internally-maintained list of
       * wildcard events is checked to see if it's a known event. If none
       * of these checks pass, the standard event emitter is used, otherwise
       * special wildcard handling is used.
       */
      let iterator = this.META.wildcardEvents.values();
      let currentEvent = null;
      let args = NGN.slice(arguments);

      args.shift();

      while (currentEvent === null || !currentEvent.done) {
        if (currentEvent !== null && currentEvent.value !== arguments[0]) {
          let pattern = new RegExp(currentEvent.value.replace(/\./g, '\\.').replace(/\*/g, '.*'), 'g');

          if (pattern.test(arguments[0])) {
            super.emit(currentEvent.value, ...args, typeof arguments[0] !== 'symbol' ? Symbol(arguments[0]) : arguments[0]);
            break
          }
        }

        currentEvent = iterator.next();
      }
    }
  }

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
  class QueueItem extends EventEmitter {
    constructor (config) {
      config = config || {};

      super(config);

      Object.defineProperties(this, {
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

      this.on('timeout', () => {
        this._status = 'timedout';
      });

      this.on('skip', () => {
        this._status = 'skipped';
      });
    }

    /**
     * @property {string} status
     * May be `running`, `complete`, or `null` (not run yet)
     */
    get status () {
      return this._status
    }

    /**
     * @property {boolean} skipped
     * `true` to skip the step, `false` to execute it.
     */
    get skipped () {
      return this._skip
    }

    /**
     * @method run
     * Execute the callback function.
     * @param {string} mode
     * `dev` or `prod`. When in "dev" mode, verbose output is written
     * to the console.
     */
    run (mode) {
      if (this.skipped) {
        this.emit('skip', this);

        if (mode && mode === 'dev') {
          NGN.WARN('SKIPPED ' + this.name);
        }

        return
      }

      this.emit('start', this);

      if (mode && mode === 'dev') {
        NGN.INFO('Executing ' + this.name + ':');
      }

      this._status = 'running';

      const me = this;
      const scope = {
        name: this.name,
        number: this.number,
        timeout: function (milliseconds) {
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
    skip () {
      if (this._status === 'running') {
        NGN.WARN(`Cannot skip step: ${this.name} is currently running.`);
      } else if (this._status === 'timedout') {
        NGN.WARN(`Cannot skip step: ${this.name} timed out.`);
      } else if (this._status === 'complete') {
        NGN.WARN(`Cannot skip step: ${this.name} already completed.`);
      }

      this._skip = true;
    }
  }

  /**
   * @class NGN.Queue
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
  class Queue extends EventEmitter {
    /**
     * @constructor
     * @param {string} [mode=production]
     * Set this to `dev` for verbose console output.
     */
    constructor (mode = 'production') {
      super();

      Object.defineProperties(this, {
        steps: NGN.private([]),
        completed: NGN.private(0),
        timeout: NGN.private(null),
        _mode: NGN.private(mode),
        _cancel: NGN.private(false),
        processing: NGN.private(false),
        timer: NGN.private(null),
        sequential: NGN.private(false)
      });

      this.on('taskcomplete', (step) => {
        // Disallow duplicates
        if (this.sequential || step.status === 'completed') {
          return
        }

        step._status = 'complete';

        // When the step is done, tally it
        this.completed++;

        if (this.mode === 'dev') {
          NGN.INFO(step.name + ' completed.');
        }

        // If all of the queries have been tallied, we're done.
        if (this.completed === this.steps.length) {
          this.processing = false;

          Object.keys(this.steps).forEach((step) => {
            clearTimeout(this.steps[step].timer);
          });

          this.emit('complete');
        }
      });

      this.on('aborting', () => {
        this._cancel = true;
      });
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
    get list () {
      return this.steps.map(function (s) {
        return {
          id: s.number,
          name: s.name,
          status: s.status
        }
      })
    }

    /**
     * @property {string} mode
     * The type of processing (dev, production, etc). Setting this to
     * `dev` enables verbose logging.
     */
    get mode () {
      return this._mode
    }

    set mode (value) {
      if (value.toLowerCase().substr(0, 3) === 'dev') {
        this._mode = 'dev';
      } else {
        this._mode = 'production';
      }
    }

    get cancelled () {
      return this._cancel
    }

    onTimeout () {
      let log = [];

      if (this.steps.length > 0) {
        this.steps.forEach((s) => {
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
     * @returns {NGN.Task}
     * Returns the task object added to the queue.
     */
    add (name, fn) {
      if (this.processing) {
        return NGN.WARN('Cannot add a step while processing.')
      }

      if (typeof name === 'function') {
        fn = name;
        name = 'Step ' + (parseInt(this.steps.length) + 1);
      }

      if (typeof fn !== 'function') {
        throw new Error('No processing method defined for step ' + (parseInt(this.steps.length) + 1) + '.')
      }

      const queue = new NGN.Task({
        name: name,
        callback: fn,
        number: (this.steps.length > 0 ? this.steps[this.steps.length - 1].number : 0) + 1
      });

      queue.on('complete', (step) => this.emit('taskcomplete', step));

      queue.on('timeout', (step) => {
        if (step.status === 'running' || step.status === 'timedout') {
          this.emit('tasktimeout', step);
        }
      });

      this.steps.push(queue);
      this.emit('taskcreate', queue);

      return queue
    }

    /**
     * @method getAt
     * @param  {number} index
     * Retrieve a queue item by it's index/queue number.
     * @return {Queue}
     */
    getAt (index) {
      return this.steps[index]
    }

    /**
     * @method get
     * Retrieve a specific queue item.
     * @param  {string} requestedStepTitle
     * The descriptie name of the queue item to retrieve.
     * @return {Queue}
     */
    get (requestedStep) {
      // Get by Name
      let element = this.steps.filter((step) => {
        return step.name === requestedStep
      });

      if (element.length === 1) {
        return element[0]
      }

      // Get by index
      element = this.steps.filter((step) => {
        return step.number === requestedStep
      });

      if (element.length === 1) {
        return element[0]
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
    remove (requestedStep) {
      if (this.processing) {
        return NGN.WARN('Cannot add a step while processing.')
      }

      // Remove by name
      let element = this.steps.filter((step) => {
        return step.name === requestedStep
      });

      if (element.length === 1) {
        this.steps = this.steps.filter((step) => {
          return step.name !== requestedStep
        });

        this.emit('taskremove', element[0]);
        return element[0]
      }

      // Remove by ID
      element = this.steps.filter((step) => {
        return step.number === requestedStep
      });

      if (element.length === 1) {
        this.steps = this.steps.filter((step) => {
          return step.number !== requestedStep
        });

        this.emit('taskremove', element[0]);
        return element[0]
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
    removeAt (requestedStep) {
      if (this.processing) {
        return NGN.WARN('Cannot add a step while processing.')
      }

      // Remove by index
      if (typeof requestedStep !== 'number') {
        return console.error('Failed to remove step: ' + requestedStep)
      }

      if (requestedStep < 0 || requestedStep >= this.steps.length) {
        return console.error('Step index ' + requestedStep + ' could not be found or does not exist.')
      }

      return this.steps.splice(requestedStep, 1)[0]
    }

    /**
     * @method reset
     * Resets all cancelled/skipped steps, essentially resetting the queue
     * to it's pre-aborted state.
     */
    reset () {
      if (this.processing) {
        return NGN.WARN('Cannot reset a running queue. Abort or wait for the process to complete before resetting.')
      }

      // Refresh cancelled steps
      this.steps.forEach((step) => {
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
    process (sequential = false) {
      if (this.processing) {
        return NGN.WARN('Cannot start processing (already running). Please wait for this process to complete before calling process() again.')
      }

      if (this.steps.length === 0) {
        return this.emit('complete')
      }

      this.processing = true;
      this._cancel = false;

      if (this.timeout !== null) {
        this.timer = setTimeout(() => this.onTimeout(), this.timeout);
      }

      this.sequential = typeof sequential === 'boolean' ? sequential : false;
      if (!this.sequential) {
        for (let i = 0; i < this.steps.length; i++) {
          this.steps[i].run(this.mode);
        }
      } else {
        let queue = this.steps;
        let listener = new NGN.EventEmitter();

        listener.on('taskcomplete', () => {
          if (queue.length > 0) {
            const currentTask = queue.shift();

            if (currentTask.skipped) {
              return listener.emit('taskcomplete')
            }

            currentTask.on('complete', () => listener.emit('taskcomplete'));
            currentTask.on('start', () => this.emit('taskstart', currentTask));

            currentTask.run(this.mode);
          } else {
            this.emit('complete');
          }
        });

        let currentStep = queue.shift();

        currentStep.on('complete', () => listener.emit('taskcomplete'));
        currentStep.on('start', () => this.emit('taskstart', currentStep));

        currentStep.run(this.mode);
      }
    }

    // Alias for process
    run () {
      this.process(...arguments);
    }

    /**
     * @method abort
     * Abort/cancel processing. This prevents further steps from processing.
     */
    abort () {
      this.emit('aborting');

      // Make sure the steps are skipped.
      this.each((step) => {
        if (['completed', 'running', 'timedout'].indexOf(step.status) < 0 && !step.skipped) {
          step.skip();
        }
      });

      this.once('complete', () => this.emit('aborted'));
    }

    /**
     * @method each
     * Apply a method to each step.
     * @param {function} method
     * @private
     */
    each (fn) {
      for (let i = 0; i < this.steps.length; i++) {
        fn(this.steps[i]);
      }
    }

    // Alias for abort
    cancel () {
      this.abort(...arguments);
    }
  }

  /**
   * @class NGN.UTILITY.Lexer
   * This class performs scans static text for tokens, based on a grammar.
   * It is designed to work with NGN.UTILITY.Tokenizer to convert text into
   * a sequence of tokens (strings with an identified "meaning").
   *
   * This class was inspired by https://github.com/aaditmshah/lexer (MIT).
   *
   * ```js
   * let lexer = new NGN.UTILITY.Lexer('hello\nworld\nand moon')
   *
   * lexer.addRule(/hello/i, function (str) {
   *   return 'hi' // "hi" is the name of the token
   * })
   *
   * lexer.addRule(/world/i, function (str) {
   *   return 'planet'
   * })
   *
   * // Create an error if a rule passes. In this case, prevent the word "moon".
   * lexer.addRule(/moon/i, function (str) {
   *   this.error()
   * })
   *
   * console.log(lexer.next())
   *
   * // OUTPUT
   * // {
   * //   line: 1,
   * //   column: 1,
   * //   index: 0,
   * //   token: 'hi',
   * //   length: 5,
   * //   input: 'hello'
   * // }
   *
   * lexer.next() // Returns the next token
   * ```
   *
   * The lexer contains two built-in rules to determine the beginning of
   * file/content (token `BOF`) and the end of file content (token `EOF`).
   */
  class NGNLexer { // eslint-disable-line no-unused-vars
    /**
     * Create a new lexer instance.
     * @param  {String} [input='']
     * Initialize with text input.
     */
    constructor (statement = '') {
      Object.defineProperties(this, {
        tokens: NGN.private([]),
        rules: NGN.private([]),
        remove: NGN.private(0),
        state: NGN.private(0),
        index: NGN.private(0),
        statement: NGN.private(statement),
        reject: NGN.private(false),
        lastLineIndex: NGN.private(0),
        currentLength: NGN.private(0),
        currentMatch: NGN.private(null),
        row: NGN.private(1),
        unrecognizedCharacters: NGN.private(false)
      });

      // Identify beginning of file/statement
      this.addRule(/^/, function () {
        return 'BOF'
      });

      // Identify end of file/statement
      this.addRule(/$/, function () {
        return 'EOF'
      });

      if (statement && statement.length > 0) {
        this.input = statement;
      }
    }

    /**
     * @property {String} value
     * The input text to analyze. Changing this automatically resets the lexer.
     */
    set input (value) {
      this.remove = 0;
      this.state = 0;
      this.index = 0;
      this.currentMatch = null;
      this.tokens = [];
      this.row = 1;
      this.statement = value;
    }

    get input () {
      return this.statement
    }

    /**
     * @property {number} lines
     * The number of lines in the input text.
     */
    get lines () {
      return this.statement.split('\n').length
    }

    /**
     * @property {boolean} unrecognized
     * Set this to `true` within a rule if a value is unrecognized.
     * The more common approach is to use the #error method, which
     * sets this to `true` when a rule should produce an error.
     */
    get unrecognized () {
      return this.unrecognizedCharacters
    }

    set unrecognized (value) {
      // TODO: NGN.forceBoolean
      this.reject = true;
      this.unrecognizedCharacters = NGN.forceBoolean(value);
    }

    /**
     * @property {number} currentLine
     * Retrieves the current line wherever the lexer left off (i.e. last
     * recognized token).
     */
    get currentLine () {
      return this.row
    }

    /**
     * @property {number} currentColumn
     * Retrieves the current column wherever the lexer left off (i.e. last
     * recognized token).
     */
    get currentColumn () {
      let col = (this.index - this.lastLineIndex) - this.currentLength;

      return col === 0 ? 1 : col
    }

    /**
     * Called within a rule to force an error. This is most commonly used
     * when a block of text contains a value it shouldn't.
     * @param  {String} [message]
     * An optional message prefixed to the error message.
     */
    error (message) {
      if (message) {
        let col = (this.index - this.lastLineIndex) - 1;

        throw new Error(`${message} at line ${this.currentLine}, column ${col < 1 ? 1 : col}.`)
      }

      this.unrecognized = true;
    }

    /**
     * Add a rule for detecting a token.
     * @param {RegExp} pattern
     * The pattern is applied to the text to determine whether the action should
     * be triggered or not.
     * @param {Function|String} action
     * The action method is executed when a pattern match is detected. If the
     * action is a function, it must return the name of the token. Functions
     * receive a single argument, which is the text that matched the rule.
     *
     * If a string is provided as the action, that string will be returned as
     * the token value whenever a pattern match occurs. This is a convenient
     * way to avoid repetitively writing the following type of token handler:
     *
     * ```js
     * function () {
     *   return 'token'
     * }
     * ```
     * @param {Array} [start=[0]]
     * An optional array of unsigned integers acting as
     * [start conditions](http://flex.sourceforge.net/manual/Start-Conditions.html).
     * By default all rules are active in the initial state (i.e. `0`).
     */
    addRule (pattern, action, start = [0]) {
      if (!pattern.global) {
        let flags = 'g';

        if (pattern.multiline) {
          flags += 'm';
        }

        if (pattern.ignoreCase) {
          flags += 'i';
        }

        pattern = new RegExp(pattern.source, flags);
      }

      let actionFn;
      if (typeof action === 'string') {
        actionFn = function () {
          return action
        };
      } else {
        actionFn = action;
      }

      if (!NGN.isFn(actionFn)) {
        throw new Error(`INVALID LEXER ATTRIBUTES: ${pattern.toString()} rule is missing a valid handler function (action) or token name.`)
      }

      let actionString = actionFn.toString();

      if (actionString.indexOf('this.error(') >= 0 && /^\(.*\)\s{0,10}=>\s{0,10}\{/.test(actionString)) {
        throw new Error('Cannot use a non-lexical expression (arrow function) as a lexer rule.')
      }

      this.rules.push({
        pattern,
        global: pattern.global,
        action: actionFn,
        start
      });
    }

    /**
     * An iterator method.
     * @return {Object}
     * Returns the next recognized token as a detailed object:
     *
     * ```js
     * {
     *   line: 1,
     *   column: 1,
     *   index: 0,
     *   token: 'token name',
     *   length: 5,
     *   input: 'original input string'
     * }
     */
    next () {
      if (this.tokens.length) {
        return this.tokens.shift()
      }

      this.reject = true;

      while (this.index <= this.statement.length) {
        // Count any new line & reset column
        if (/\n/i.test(this.statement.charAt(this.index))) {
          this.row++;
          this.lastLineIndex = this.index;
        }

        let matches = this.scan().splice(this.remove);
        let index = this.index;

        while (matches.length) {
          if (this.reject) {
            let match = matches.shift();
            let result = match.result;
            let length = match.length;

            this.index += length;
            this.currentLength = length;
            this.reject = false;
            this.remove++;
            let token = match.action.apply(this, result);

            if (this.reject) {
              this.index = result.index;
            } else if (token !== undefined) {
              switch (NGN.typeof(token)) {
                case 'array':
                  this.tokens = token.slice(1);
                  token = token[0];

                default: // eslint-disable-line no-fallthrough
                  if (length) {
                    this.remove = 0;
                  }

                  return token
              }
            }
          } else {
            break
          }
        }

        let input = this.statement;

        if (index < input.length) {
          if (this.reject) {
            this.remove = 0;

            let token = this.unexpected(input.substr(this.index++, this.index + input.length));

            if (token !== undefined) {
              if (NGN.typeof(token) === 'array') {
                this.tokens = token.slice(1);
                return token[0]
              } else {
                return token
              }
            }
          } else {
            if (this.index !== index) {
              this.remove = 0;
            }

            this.reject = true;
          }
        } else if (matches.length) {
          this.reject = true;
        } else {
          break
        }
      }
    }

    /**
     * Scan the text and apply rules.
     * @private
     */
    scan () {
      let matches = [];
      let index = 0;
      let state = this.state;
      let lastIndex = this.index;
      let input = this.statement;

      for (let i = 0, length = this.rules.length; i < length; i++) {
        let rule = this.rules[i];
        let start = rule.start;
        let states = start.length;

        if (
          (!states || start.indexOf(state) >= 0) ||
            (state % 2 && states === 1 && !start[0])
        ) {
          let pattern = rule.pattern;
          pattern.lastIndex = lastIndex;
          let result = pattern.exec(input);

          if (result && result.index === lastIndex) {
            let j = matches.push({
              result,
              action: rule.action,
              length: result[0].length
            });

            if (rule.global) {
              index = j;
            }

            while (--j > index) {
              let k = j - 1;

              if (matches[j].length > matches[k].length) {
                let temple = matches[j];
                matches[j] = matches[k];
                matches[k] = temple;
              }
            }
          }
        }
      }

      return matches
    }

    /**
     * Handles unexpected character sequences.
     * This may throw an error if the characters are unrecognized.
     * @param  {String} characters
     * The characters which triggered the unexpected flag.
     * @private
     */
    unexpected (str) {
      if (this.unrecognizedCharacters) {
        let col = (this.index - this.lastLineIndex) - 1;

        throw new Error(`Unexpected syntax at line ${this.currentLine}, column ${col < 1 ? 1 : col}\nat ${str}\n   ^`)
      }
    }
  }

  /**
   * @class NGN.UTILITY.Tokenizer
   * Given a grammar, a tokenizer will perform lexical analysis of text.
   * In simple terms, it will extract tokens from text. This is accomplished
   * by applying rules with a NGN.UTILITY.Lexer and capturing responses.
   *
   * The NGN.DATA.JQL class is an implementation of a tokenizer. It extracts
   * tokens from JQL queries, splitting them into tokens that can be used in
   * programs.
   */
  class NGNTokenizer { // eslint-disable-line no-unused-vars
    /**
     * Create a new tokenizer. This will return an instance of itself,
     * allowing for methods to be chained like `(new Tokenizker([...])).parse('...')`.
     * @param  {Array}  [grammar=[]]
     * A grammar is a collection of rules that are passed to
     * NGN.UTILITY.Lexer#addRule.
     *
     * The following example provides a subset of the NGN.DATA.JQL grammar.
     *
     * ```js
     * new Tokenizer([
     *   // Disallow irrelevant keywords (SQL)
     *   [
     *     /FROM/i,
     *     function () {
     *       this.error('FROM is not a valid JQL query descriptor. Found')
     *     }
     *   ],
     *
     *   // Skip whitespace
     *   [/\s+/, function () {}],
     *
     *   // Common tokens
     *   [/SELECT\s{1,1000}/i, 'SELECT'],
     *   [/DISTINCT\s{1,1000}/i, 'DISTINCT'],
     *   [/WHERE\s{1,1000}/i, 'WHERE'],
     *   [/ORDER BY\s{1,1000}/i, 'ORDERBY']
     * ])
     * ```
     */
    constructor (grammar = []) {
      if (grammar.length === 0) {
        throw new Error('No grammaer rules specified.')
      }

      Object.defineProperties(this, {
        statement: NGN.private(null),
        rules: NGN.privateconst(grammar),

        PROTECTED: NGN.privateconst({
          lexer: new NGN.UTILITY.Lexer(),
          activeText: null,
          orderedList: new Set()
        })
      });

      // Add rules
      for (let i = 0; i < this.rules.length; i++) {
        this.PROTECTED.lexer.addRule(this.rules[i][0], this.rules[i][1]);
      }

      return this
    }

    /**
     * @property {string} text
     * The text being "tokenized".
     */
    get text () {
      return this.PROTECTED.activeText
    }

    /**
     * @property {Array} orderedTokenList
     * An ordered list of tokens as they appear within the text.
     *
     * **Example Result:**
     *
     * ```js
     * [{
     *   column: 1,
     *   index: 0,
     *   input: 'original string',
     *   length: 15,
     *   line: 4,
     *   token: 'mytoken'
     * }, {
     *   ...
     * }]
     * ```
     */
    get orderedTokenList () {
      return Array.from(this.PROTECTED.orderedList).map(item => item.detail)
    }

    /**
     * Parses text to generate a token list.
     * @param  {string} text
     * The text to parse.
     * @param  {Boolean} [suppressXOF=true]
     * By default, `BOF` (Beginning of File) and `EOF` (End of File) tokens are
     * suppressed. Set this to `false` to enable them.
     * @return {Array}
     * Returns an array of tokens.
     *
     * **Example Result:**
     *
     * ```js
     * [{
     *   column: 1,
     *   index: 0,
     *   input: 'original string',
     *   length: 15,
     *   line: 4,
     *   token: 'mytoken'
     * }, {
     *   ...
     * }]
     * ```
     */
    parse (text, ignoreXOF = true) {
      if (!NGN.coalesce(text) || typeof text !== 'string') {
        throw new Error('Cannot parse empty string or non-string.')
      }

      this.PROTECTED.activeText = text;

      let tokens = {};
      let token;

      this.PROTECTED.lexer.input = text;
      this.PROTECTED.orderedList.clear();

      while (token = this.PROTECTED.lexer.next()) { // eslint-disable-line no-cond-assign
        if (!ignoreXOF || (token !== 'BOF' && token !== 'EOF')) {
          tokens[token] = NGN.coalesce(tokens[token], []);

          tokens[token].push({
            line: this.PROTECTED.lexer.currentLine,
            column: this.PROTECTED.lexer.currentColumn,
            length: this.PROTECTED.lexer.currentLength,
            index: this.PROTECTED.lexer.index - this.PROTECTED.lexer.currentLength,
            input: this.PROTECTED.lexer.statement.substr(this.PROTECTED.lexer.index - this.PROTECTED.lexer.currentLength, this.PROTECTED.lexer.currentLength)
          });

          const index = tokens[token].length - 1;

          this.PROTECTED.orderedList.add({
            index: index,
            token: token,
            get detail () {
              return Object.assign(tokens[this.token][this.index], {token: this.token})
            }
          });
        }
      }

      return tokens
    }
  }

  /**
   * @class NGN.UTILITY.Set
   * Provides advanced features for [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)
   * objects.
   */
  class NGNSet { // eslint-disable-line
    /**
     * Indicates the subset is wholly contained within the main set.
     * @param  {Set}  mainset
     * @param  {Set}  subset
     * @return {Boolean}
     */
    static isSuperSet (mainset, subset) {
      if (subset.size > mainset.size || subset.size === 0) {
        return false
      }

      let elements = mainset.values();
      let element = elements.next();

      while (!element.done) {
        if (!mainset.has(element.value)) {
          return false
        }

        element = elements.next();
      }

      return true
    }

    /**
     * Join any number of sets together into a single aggregate set.
     * Only unique values will be added.
     * Accepts any number of Set arguments.
     * @return {Set}
     */
    static concat () {
      let aggregate = new Set(arguments[0]);

      for (let i = 1; i < arguments.length; i++) {
        let elements = arguments[i].values();
        let element = elements.next();

        while (!element.done) {
          aggregate.add(element.value);
          element = elements.next();
        }
      }

      return aggregate
    }

    /**
     * Identify the intersection/overlap between two sets.
     * @param  {Set} setA
     * @param  {Set} setB
     * @return {Set}
     * Returns a Set containing the common elements of setA and setB.
     */
    static intersection (setA, setB) {
      let intersection = new Set();
      let a = setA.size < setB.size ? setA : setB;
      let b = setA.size < setB.size ? setB : setA;
      let elements = a.values();
      let element = elements.next();

      while (!element.done) {
        if (b.has(element.value)) {
          intersection.add(element.value);
        }

        element = elements.next();
      }

      return intersection
    }

    /**
     * Identify the elements that are NOT part of both sets.
     * @param  {Set} setA
     * @param  {Set} setB
     * @return {Set}
     * Returns a set containing elements that are NOT common between setA and setB.
     */
    static difference (setA, setB) {
      let diff = new Set(setA);
      let elements = setB.values();
      let element = elements.next();

      while (!element.done) {
        diff.delete(element.value);
        element = elements.next();
      }

      return diff
    }

    /**
     * Determines whether two sets contain the same values.
     * @param  {Set} setA
     * @param  {Set} setB
     * @return {Boolean}
     */
    static equal (setA, setB) {
      return NGN.UTILITY.Set.difference(setA, setB).size === 0
    }

    static equals () {
      NGN.WARN('NGN.UTILITY.Set.equals() should be equal() (no s at the end).');
      NGN.UTILITY.Set.equal(...arguments);
    }

    /**
     * A convenience method for appending the Set prototype with all
     * of the methods in this utility, where the first argument of
     * each method automatically refers to the Set.
     * @private
     */
    static applyAll () {
      Set.prototype.isSuperSet = function (subset) { // eslint-disable-line no-extend-native
        return NGN.UTILITY.Set.isSuperSet(this, subset)
      };

      Set.prototype.concat = function () { // eslint-disable-line no-extend-native
        return NGN.UTILITY.Set.concat(this, ...arguments)
      };

      Set.prototype.intersection = function () { // eslint-disable-line no-extend-native
        return NGN.UTILITY.Set.intersection(this, ...arguments)
      };

      Set.prototype.difference = function () { // eslint-disable-line no-extend-native
        return NGN.UTILITY.Set.difference(this, ...arguments)
      };

      Set.prototype.equals = function () { // eslint-disable-line no-extend-native
        return NGN.UTILITY.Set.equal(this, ...arguments)
      };
    }
  }



  var Utility = /*#__PURE__*/Object.freeze({
    Lexer: NGNLexer,
    Tokenizer: NGNTokenizer,
    Set: NGNSet
  });

  let hostname;
  /* browser-only */
  hostname = window.location.host; // eslint-disable-line comma-style
  /* end-browser-only */

  // CONSTANTS USED INTERNALLY
  // Normalize URL syntax
  const normalizeUrl = function (url) { // eslint-disable-line no-unused-vars
    let uri = [];

    url = url.split('/');

    for (let i = 0; i < url.length; i++) {
      if (url[i] === '..') {
        uri.pop();
      } else if (url[i] !== '.') {
        uri.push(url[i]);
      }
    }

    uri = uri.join('/').replace(/:\/{3,50}/gi, '://');

    // Handle query parameter normalization
    let match = /(.*:\/\/.*)[?](.*)/.exec(uri);
    let path = match === null ? uri : match[1];
    let queryString = match !== null ? match[2] : '';

    uri = path;

    if (queryString.trim().length > 0) {
      let params = {};

      queryString.split('&').forEach(attr => {
        let keypair = attr.split('=');
        params[keypair[0]] = keypair.length > 1 ? keypair[1] : null;
      });

      queryString = [];
      Object.keys(params).forEach((param, i) => {
        queryString.push(`${param}${params[param] !== null ? '=' + encodeURIComponent(params[param]) : ''}`);
      });

      uri = `${uri}?${queryString.join('&')}`;
    }

    return uri
  };

  let networkInterfaces = [
    '127.0.0.1'
    , 'localhost' // eslint-disable-line comma-style
    /* browser-only */
    , window.location.host // eslint-disable-line comma-style
    /* end-browser-only */
  ];


  networkInterfaces = NGN.dedupe(networkInterfaces);

  const HttpMethods = [ // eslint-disable-line no-unused-vars
    'OPTIONS',
    'HEAD',
    'GET',
    'POST',
    'PUT',
    'DELETE',
    'TRACE',
    'CONNECT'
  ];

  /**
   * @class NGN.NET.Request
   * Represents a network request. This class can be used
   * to create and manipulate HTTP requests, but it does not
   * actually transmit them. To send the request, use NGN.NET#request
   * or one of the many common helper methods.
   * @private
   */
  class Request { // eslint-disable-line no-unused-vars
    constructor (cfg) {
      cfg = cfg || {};

      // Require URL and HTTP method
      NGN.objectRequires(cfg, 'url');

      if (NGN.objectHasAny(cfg, 'form', 'json')) {
        NGN.WARN('NET.Request', '"form" and "json" configuration properties are not valid. Use "body" instead.');
      }

      Object.defineProperties(this, {
        UrlPattern: NGN.privateconst(new RegExp('^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?')),

        /**
         * @cfgproperty {string} url (required)
         * The complete URL for the request, including query parameters.
         */
        uri: NGN.private(null),

        /**
         * @cfg {string} [method=GET]
         * The HTTP method to invoke when the request is sent. The standard
         * RFC 2616 HTTP methods include:
         *
         * - OPTIONS
         * - HEAD
         * - GET
         * - POST
         * - PUT
         * - DELETE
         * - TRACE
         * - CONNECT
         *
         * There are many additional non-standard methods some remote hosts
         * will accept, including `PATCH`, `COPY`, `LINK`, `UNLINK`, `PURGE`,
         * `LOCK`, `UNLOCK`, `VIEW`, and many others. If the remote host
         * supports these methods, they may be used in an NGN.NET.Request.
         * Non-standard methods will not be prevented, but NGN will trigger
         * a warning event if a non-standard request is created.
         */
        httpmethod: NGN.private(null),

        /**
         * @cfg {boolean} [enforceMethodSafety=true]
         * According to [RFC 2616](https://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html),
         * some HTTP methods are considered idempotent (safe). These methods
         * should have no significance to data (i.e. read-only). For example,
         * `OPTIONS`, `HEAD`, and `GET` are all idempotent. By default, NGN.NET
         * loosely enforces idempotence by ignoring the #body when making a
         * request. While it is not advised, nor officially supported, NGN.NET can
         * technically ignore method safety, allowing a request body to be
         * sent to a remote server. Set this configuration to `false` to
         * prevent NGN.NET from enforcing idempotence/safety.
         */
        enforceMethodSafety: NGN.private(NGN.coalesce(cfg.enforceMethodSafety, cfg.enforcemethodsafety, true)),

        /**
         * @cfg {object} [headers]
         * Optionally supply custom headers for the request. Most standard
         * headers will be applied automatically (when appropriate), such
         * as `Content-Type`, `Content-Length`, and `Authorization`.
         * In Node-like environments, a `User-Agent` will be applied containing
         * the `hostname` of the system making the request. Any custom headers
         * supplied will override headers managed by NGN.NET.
         */
        headers: NGN.public(NGN.coalesceb(cfg.headers)),

        /**
         * @cfg {object|string|binary} [body]
         * The body configuration supports text, an object, or a data URL or
         * binary content. **For multi-part form data (file uploads), use
         * the #files configuration _instead_ of this attribute.**
         *
         * It is also possible to construct a simple form submission
         * (x-www-form-urlencoded) from a specially formatted key/value object
         * conforming to the following syntax:
         *
         * ```json
         * {
         *   form: {
         *     form_field_1: "value",
         *     form_field_2: "value",
         *     form_field_3: "value",
         *   }
         * }
         * ```
         * The object above will be automatically converted & url-encoded as:
         *
         * ```js
         * form_field_1=value&form_field_2=value&form_field_3=value
         * ```
         *
         * The appropriate request headers are automatically applied.
         */
        requestbody: NGN.public(NGN.coalesce(cfg.body)),

        /**
         * @cfgproperty {string} username
         * A username to authenticate the request with (basic auth).
         */
        user: NGN.private(NGN.coalesceb(cfg.username)),

        /**
         * @cfgproperty {string} password
         * A password to authenticate the request with (basic auth).
         * @readonly
         */
        secret: NGN.private(NGN.coalesceb(cfg.password)),

        /**
         * @cfgproperty {string} accessToken
         * An access token to authenticate the request with (Bearer auth).
         * If this is configured, it will override any basic auth settings.
         */
        bearerAccessToken: NGN.private(NGN.coalesceb(cfg.accessToken)),

        /**
         * @cfgproperty {boolean} [withCredentials=false]
         * Indicates whether or not cross-site `Access-Control` requests should
         * be made using credentials such as cookies, authorization headers or
         * TLS client certificates. Setting `withCredentials` has no effect on
         * same-site requests.
         *
         * In addition, this flag is also used to indicate when cookies are to
         * be ignored in the response. The default is `false`. XMLHttpRequest
         * from a different domain cannot set cookie values for their own
         * domain unless `withCredentials` is set to true before making the
         * request. The third-party cookies obtained by setting `withCredentials`
         * to true will still honor same-origin policy and hence can not be
         * accessed by the requesting script through
         * [document.cookie](https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie)
         * or from response headers.
         */
        withCredentials: NGN.private(NGN.coalesce(cfg.withCredentials, false)),

        /**
         * @cfgproperty {Number} [timeout=30000]
         * The number of milliseconds to wait before considering the request to
         * have timed out. Defaults to `30000` (30 seconds).
         */
        timeout: NGN.public(NGN.coalesce(cfg.timeout, 30000)),

        /**
         * @method timer
         * A placeholder for a timeout monitor.
         * @private
         */
        timer: NGN.private(null),

        /**
         * @method isCrossOrigin
         * Determine if accessing a URL is considered a cross origin request.
         * @param {string} url
         * The URL to identify as a COR.
         * @returns {boolean}
         * @private
         */
        isCrossOrigin: NGN.privateconst(function (url) {

          return this.host !== hostname // eslint-disable-line no-undef
        }),

        /**
         * @method applyAuthorizationHeader
         * Generates and applies the authorization header for the request,
         * based on the presence of #username, #password, or #accessToken.
         * @private
         */
        applyAuthorizationHeader: NGN.privateconst(() => {
          if (NGN.coalesceb(this.bearerAccessToken) !== null) {
            this.setHeader('Authorization', `Bearer ${this.bearerAccessToken}`, true);
          } else if (NGN.coalesceb(this.user) && NGN.coalesceb(this.secret)) {
            this.setHeader('Authorization', this.basicAuthToken(this.user, this.secret), true);
          }
        }),

        /**
         * @method basicAuthToken
         * Generates a basic authentication token from a username and password.
         * @return {[type]} [description]
         * @private
         */
        basicAuthToken: NGN.privateconst((user, secret) => {
          // Binary to base64-ascii conversions
          /* browser-only */
          return 'Basic ' + NGN.global.btoa(`${user}:${secret}`) // eslint-disable-line no-unreachable
          /* end-browser-only */
        }),

        /**
         * @method parseUri
         * Parses the URI into composable parts.
         * @param {string} URL
         * The URI/URL to parse.
         * @return {Object}
         * Returns a key/value object:
         *
         * ```js
         * {
         *   protocol: 'http',
         *   hostname: 'domain.com',
         *   path: '/path/to/file.html',
         *   query: 'a=1&b=2',
         *   hash: null
         * }
         * ```
         * @private
         */
        parseUri: NGN.privateconst(uri => {
          let part = uri.match(this.UrlPattern);
          let protocol;
          /* browser-only */
          protocol = window.location.protocol.replace(':', '').toLowerCase();
          /* end-browser-only */
          let url = {
            protocol: NGN.coalesce(part[2], protocol),
            hostname: NGN.coalesce(part[4], hostname),
            path: NGN.coalesceb(part[5], '/'),
            query: NGN.coalesceb(part[7]),
            hash: NGN.coalesceb(part[9])
          };

          // URL contains a username/password.
          if (url.hostname.indexOf('@') > 0) {
            let credentials = uri.match(/^.*\/{1,2}(.*):(.*)@/i);

            url.hostname = url.hostname.split('@').pop();

            this.user = credentials[1];
            this.secret = credentials[2];
            this.applyAuthorizationHeader();
          }

          url.port = NGN.coalesce(url.hostname.match(/:([0-9]{1,6})/), url.protocol === 'https' ? 443 : 80);

          if (url.hostname.indexOf(':') > 0) {
            url.hostname = url.hostname.split(':')[0];
          }

          if (url.path.charAt(0) !== '/') {
            url.path = `/${url.path}`;
          }

          return url
        }),

        uriParts: NGN.private(null),

        /**
         * @cfgproperty {Number} [maxRedirects=10]
         * Set the maximum number of redirects. There is a hard-cap of 25
         * redirects to prevent cyclic requests (endless loop).
         */
        maximumRedirects: NGN.private(10),
        redirectAttempts: NGN.private(0),

        prepareBody: NGN.private(() => {
          // Request body management
          if (this.requestbody !== null) {
            if (this.headers === null) {
              this.headers = {};
            }

            let contentType = NGN.coalesceb(this.headers['Content-Type'], this.headers['content-type'], this.headers['Content-type']);

            if (typeof this.requestbody === 'object') {
              if (NGN.objectHasExactly(this.requestbody, 'form')) {
                let form = this.requestbody.form;
                let keys = Object.keys(form);
                let dataString = [];

                for (let i = 0; i < keys.length; i++) {
                  if (NGN.isFn(form[keys[i]])) {
                    throw new Error('Invalid form data. Form data cannot be a complex data format such as an object or function.')
                  } else if (typeof form[keys[i]] === 'object') {
                    dataString.push(`${keys[i]}=${encodeURIComponent(JSON.stringify(form[keys[i]]))}`);
                  } else {
                    dataString.push(`${keys[i]}:${encodeURIComponent(form[keys[i]])}`);
                  }
                }

                this.requestbody = dataString.join('&');
              } else {
                this.requestbody = JSON.stringify(this.requestbody).trim();
                this.setHeader('Content-Length', this.requestbody.length, false);
                this.setHeader('Content-Type', NGN.coalesceb(contentType, 'application/json'), false);
              }
            }

            if (typeof this.requestbody === 'string') {
              if (contentType !== null) {
                // Check for form data
                let match = /([^=]+)=([^&]+)/.exec(this.requestbody);

                if (match !== null && this.requestbody.trim().substr(0, 5).toLowerCase() !== 'data:' && this.requestbody.trim().substr(0, 1).toLowerCase() !== '<') {
                  this.setHeader('Content-Type', 'application/x-www-form-urlencoded', false);
                } else {
                  this.setHeader('Content-Type', 'text/plain');

                  if (this.requestbody.trim().substr(0, 5).toLowerCase() === 'data:') {
                    // Crude Data URL mimetype detection
                    match = /^data:(.*);/gi.exec(this.requestbody.trim());

                    if (match !== null) {
                      this.setHeader('Content-Type', match[1]);
                    }
                  } else if (/^<\?xml.*/gi.test(this.requestbody.trim())) {
                    // Crude XML Detection
                    this.setHeader('Content-Type', 'application/xml');
                  } else if (/^<html.*/gi.test(this.requestbody.trim())) {
                    // Crude HTML Detection
                    this.setHeader('Content-Type', 'text/html');
                  }
                }
              }

              this.setHeader('Content-Type', this.requestbody.length, false);
            } else {
              NGN.WARN('NET.Request.body', `The request body must cannot be ${typeof this.requestbody}. Please provide a string, object, or binary value for the body.`);
            }
          }
        })
      });

      if (cfg.maxRedirects) {
        this.maxRedirects = cfg.maxRedirects;
      }

      this.url = cfg.url;
      this.method = NGN.coalesceb(cfg.method, 'GET');

      this.prepareBody();

      // Apply authorization if applicable
      if (NGN.coalesce(this.user, this.secret, this.bearerAccessToken) !== null) {
        this.applyAuthorizationHeader();
      }
    }

    get maxRedirects () {
      return this.maximumRedirects
    }

    set maxRedirects (value) {
      if (value > 25) {
        value = 25;
      }

      if (value < 0) {
        value = 0;
      }

      this.maximumRedirects = value;
    }

    /**
     * @property {string} protocol
     * The protocol used to make the request.
     * @readonly
     */
    get protocol () {
      return NGN.coalesce(this.uriParts.protocol, 'http')
    }

    /**
     * @property {string} host
     * The hostname/domain of the request.
     */
    get host () {
      return NGN.coalesce(this.uriParts.hostname)
    }

    get hostname () {
      return this.host
    }

    /**
     * @property {number} port
     * The port of the remote host.
     */
    get port () {
      return this.uriParts.port
    }

    /**
     * @property {string} path
     * The pathname of the URL.
     */
    get path () {
      return NGN.coalesce(this.uriParts.path, '/')
    }

    /**
     * @property {string} query
     * The raw query string of the URI. To retrieve a key/value list,
     * use #queryParameters instead.
     */
    get query () {
      return NGN.coalesce(this.uriParts.query, '')
    }

    /**
     * @property {object} queryParameters
     * Returns a key/value object containing the URL query parameters of the
     * request, as defined in the #url. The paramter values (represented as keys
     * in this object) may be modified, but not removed (use removeQueryParameter
     * to delete a query parameter). No new query parameters can be added (use
     * setQueryParameter instead).
     * @readonly
     */
    get queryParameters () {
      let params = this.query.split('&');
      let resultSet = {};

      for (let i = 0; i < params.length; i++) {
        let keypair = params[i].split('=');
        let attr = `__qp__${keypair[0]}__qp__`;

        Object.defineProperty(resultSet, attr, {
          enumerable: false,
          configurable: false,
          writable: true,
          value: NGN.coalesceb(keypair[1])
        });

        Object.defineProperty(resultSet, keypair[0], {
          enumerable: true,
          configurable: false,
          get: () => { return resultSet[attr] },
          set: (value) => {
            resultSet[attr] = value;
            this.setQueryParameter(keypair[0], value, true);
          }
        });
      }

      return resultSet
    }

    /**
     * @property hash
     * The hash part of the URL (i.e. everything after the trailing `#`).
     */
    get hash () {
      return NGN.coalesce(this.uriParts.hash, '')
    }

    /**
     * @property {string} url
     * The URL where the request will be sent.
     */
    get url () {
      return this.uri
    }

    set url (value) {
      if (NGN.coalesceb(value) === null) {
        NGN.WARN('NET.Request.url', 'A blank URL was identified for a request.');
      }

      this.uri = normalizeUrl(value.trim());
      this.uriParts = this.parseUri(this.uri);
    }

    get method () {
      return this.httpmethod
    }

    set method (value) {
      if (this.httpmethod === value) {
        return
      }

      if (NGN.coalesceb(value) === null) {
        NGN.WARN('NET.Request.method', 'No HTTP method specified.');
      }

      value = value.trim().toUpperCase();

      if (HttpMethods.indexOf(value) < 0) {
        NGN.WARN('NET.Request.method', `A non-standard HTTP method was recognized in a request: ${value}.`);
      }

      this.httpmethod = value;
    }

    get body () {
      return this.requestbody
    }

    set body (value) {
      this.requestbody = value;
      this.prepareBody();
    }

    /**
     * @property {boolean} crossOriginRequest
     * Indicates the request will be made to a domain outside of the
     * one hosting the request.
     */
    get crossOriginRequest () {
      return this.isCrossOrigin(this.uri)
    }

    /**
     * @property {string} username
     * The username that will be used in any basic authentication operations.
     */
    get username () {
      return NGN.coalesce(this.user)
    }

    set username (user) {
      user = NGN.coalesceb(user);

      if (this.user !== user) {
        this.user = user;

        if (NGN.coalesceb(this.secret) !== null) {
          this.applyAuthorizationHeader();
        }
      }
    }

    /**
     * @property {string} password
     * It is possible to set a password for any basic authentication operations,
     * but it is not possible to read a password.
     * @writeonly
     */
    set password (secret) {
      secret = NGN.coalesceb(secret);

      if (this.secret !== secret) {
        this.secret = secret;

        if (NGN.coalesceb(this.user) !== null) {
          this.applyAuthorizationHeader();
        }
      }
    }

    /**
     * @property {string} accessToken
     * Supply a bearer access token for basic authenticaiton operations.
     * @writeonly
     */
    set accessToken (token) {
      token = NGN.coalesceb(token);

      if (this.bearerAccessToken !== token) {
        this.bearerAccessToken = token;
        this.applyAuthorizationHeader();
      }
    }

    /**
     * @method setHeader
     * Add a header to the request.
     * @param {string} header
     * The name of the header.
     * @param {string} value
     * Value of the header.
     * @param {Boolean} [overwriteExisting=true]
     * If the header already exists, setting this to `false` will prevent
     * the original header from being overwritten.
     */
    setHeader (key, value, overwriteExisting = true) {
      key = key.replace(/'|"/gi, '').toLowerCase();

      if (this.headers === null || this.headers[key] === undefined || overwriteExisting) {
        if (this.headers === null) {
          this.headers = {};
        }

        this.headers[key] = value;
      }
    }

    /**
     * @method getHeader
     * @param  {string} header
     * The name of the header to retrieve.
     * @return {string}
     * Returns the current value of the specified header.
     */
    getHeader (key) {
      if (this.headers === null) {
        return undefined
      }

      if (!this.headers.hasOwnProperty(key.toLowerCase())) {
        return undefined
      }

      return this.headers[key.toLowerCase()]
    }

    /**
     * @method removeHeader
     * Removes a header from the request. Nothing happens if the header does
     * not exist.
     * @param  {string} header
     * The header to remove.
     */
    removeHeader (key) {
      if (this.headers !== null) {
        delete this.headers[key.toLowerCase()];
        delete this.headers[key];
      }
    }

    /**
     * @method setQueryParameter
     * Add a query parameter to the request.
     * @param {string} parameter
     * The name of the parameter.
     * @param {string} value
     * Value of the parameter. The value is automatically URL encoded. If the
     * value is null, only the key will be added to the URL (ex: `http://domain.com/page.html?key`)
     * @param {Boolean} [overwriteExisting=true]
     * If the parameter already exists, setting this to `false` will prevent
     * the original parameter from being overwritten.
     */
    setQueryParameter (key, value, overwriteExisting = true) {
      let re = new RegExp("^.*(\\?|&)(" + key + ".*)(&.*)$|^.*(\\?|&)(" + key + ".*)$", 'i'); // eslint-disable-line quotes
      let exists = (re.exec(this.uri) !== null);
      let match;

      if (exists) {
        if (!overwriteExisting) {
          return
        }

        match = re.exec(this.uri);

        if (match !== null) {
          this.url = this.uri.replace(`${NGN.coalesceb(match[5], match[2])}`, `${key}${value !== null ? '=' + encodeURIComponent(value) : ''}`);
        }
      } else {
        this.url = `${this.uri}${this.query.length === 0 ? '?' : '&'}${key}${value !== null ? '=' + encodeURIComponent(value) : ''}`;
      }
    }

    /**
     * @method removeQueryParameter
     * Remove a query parameter from the request URI.
     * @param {string} key
     */
    removeQueryParameter (key) {
      this.url = this.uri.replace(new RegExp(`${key}=(.[^&]+)|\\?${key}|&${key}`, 'gi'), '');
    }

    startMonitor () {
      if (this.timer === null) {
        this.timer = setTimeout(() => {
          throw new Error('Timed out retrieving ' + this.url)
        }, this.timeout);
      }
    }

    stopMonitor () {
      clearTimeout(this.timer);
      this.timer = null;
    }

    /**
     * @method send
     * Send the request.
     * @param {Function} callback
     * The callback is executed when the request is complete.
     * @param {Object} callback.response
     * The response object returned by the server.
     */
    send (callback) {
      let body = this.body;

      // Disable body when safe methods are enforced.
      if (NGN.coalesce(body)) {
        if (this.enforceMethodSafety && 'OPTIONS|HEAD|GET'.indexOf(this.method) >= 0) {
          body = null;
        }
      }

      /* browser-only */
      let xhr = new XMLHttpRequest();
      let responded = false;
      let me = this;

      // Apply readystate change handler
      xhr.onreadystatechange = function () {
        if (responded) {
          return
        }

        if (xhr.readyState === XMLHttpRequest.DONE) {
          responded = true;

          if (xhr.status === 0) {
            NGN.WARN(`Request Error: ${me.method} ${me.url} (likely a CORS issue).`);
          }

          if (NGN.isFn(callback)) {
            callback(xhr);
          }
        }
      };

      // Apply error handler
      xhr.onerror = function (e) {
        NGN.WARN('NET.error', e);

        if (!responded && NGN.isFn(callback)) {
          callback(xhr);
        }

        responded = true;
      };

      xhr.ontimeout = function (e) {
        responded = true;
        callback(xhr);
      };

      xhr.timeout = this.timeout;

      // Open the request
      xhr.open(this.method, this.url, true);

      // Apply withCredentials
      xhr.withCredentials = this.withCredentials;

      // Apply Request Headers
      if (this.headers !== null) {
        let headers = Object.keys(this.headers);
        for (let i = 0; i < headers.length; i++) {
          xhr.setRequestHeader(headers[i], this.headers[headers[i]]);
        }
      }

      // Write the body (which may be null) & send the request
      xhr.send(body);
      /* end-browser-only */
    }
  }

  class Network { // eslint-disable-line
    constructor () {
      Object.defineProperties(this, {
        /**
         * @method parseRequestConfiguration
         * Prepare common configuration attributes for a request.
         * @return {NGN.NET.Request}
         * @private
         */
        parseRequestConfiguration: NGN.private((cfg, method = 'GET') => {
          if (typeof cfg === 'string') {
            cfg = {
              url: cfg
            };
          }

          cfg = cfg || {};
          cfg.method = method;
          cfg.url = NGN.coalesceb(cfg.url, hostname); // eslint-disable-line no-undef

          return new NGN.NET.Request(cfg)
        }),

        // Returns a scoped method for sending the request, after preparing it.
        makeRequest: NGN.private((method) => {
          const me = this;

          return function () {
            let args = NGN.slice(arguments);
            let callback;

            if (NGN.isFn(args[args.length - 1])) {
              callback = args.pop();
            }

            args.push(method);

            let request = me.parseRequestConfiguration(...args);

            // Send the request
            me.send(request, callback);
          }
        }),

        // Helper aliases (undocumented)
        OPTIONS: NGN.privateconst(this.options.bind(this)),
        HEAD: NGN.privateconst(this.head.bind(this)),
        GET: NGN.privateconst(this.get.bind(this)),
        POST: NGN.privateconst(this.post.bind(this)),
        PUT: NGN.privateconst(this.put.bind(this)),
        DELETE: NGN.privateconst(this.delete.bind(this)),
        TRACE: NGN.privateconst(this.trace.bind(this)),
        JSON: NGN.privateconst(this.json.bind(this)),
        JSONP: NGN.privateconst(this.jsonp.bind(this))
      });
    }

    get Request () {
      return Request
    }

    /**
     * @method request
     * Send a request. In most cases, it is easier to use one of the built-in
     * request functions (#get, #post, #put, #delete, #json, etc). This method
     * is available for creating custom requests.
     * @param  {Object} configuration
     * Provide a #NGN.NET.Request configuration.
     * @param  {Function} callback
     * The callback to execute when the request is complete.
     */
    request (cfg, callback) {
      cfg = cfg || {};
      cfg.method = NGN.coalesceb(cfg.method, 'GET');

      if (NGN.isFn(this[cfg.method])) {
        this.makeRequest(cfg.method)(...arguments);
      } else {
        this.send(new NGN.NET.Request(cfg), callback);
      }
    }

    /**
     * @method options
     * Issue a `OPTIONS` request.
     * @param {string|object} url
     * The URL to issue the request to, or a configuration object.
     * The configuration object accepts all of the #NGN.NET.Request
     * configuration options (except method, which is defined automatically).
     * @param {Function} callback
     * A callback method to run when the request is complete.
     * This receives the response object as the only argument.
     */
    options () {
      this.makeRequest('OPTIONS').apply(this, arguments);
    }

    /**
     * @method head
     * Issue a `HEAD` request.
     * @param {string|object} url
     * The URL to issue the request to, or a configuration object.
     * The configuration object accepts all of the #NGN.NET.Request
     * configuration options (except method, which is defined automatically).
     * @param {Function} callback
     * A callback method to run when the request is complete.
     * This receives the response object as the only argument.
     */
    head () {
      this.makeRequest('HEAD').apply(this, arguments);
    }

    /**
     * @method get
     * Issue a `GET` request.
     * @param {string|object} url
     * The URL to issue the request to.
     * The configuration object accepts all of the #NGN.NET.Request
     * configuration options (except method, which is defined automatically).
     * @param {Function} callback
     * A callback method to run when the request is complete.
     * This receives the response object as the only argument.
     */
    get () {
      this.makeRequest('GET').apply(this, arguments);
    }

    /**
     * @method post
     * Issue a `POST` request.
     * @param {string|object} url
     * The URL to issue the request to.
     * The configuration object accepts all of the #NGN.NET.Request
     * configuration options (except method, which is defined automatically).
     * @param {Function} callback
     * A callback method to run when the request is complete.
     * This receives the response object as the only argument.
     */
    post () {
      this.makeRequest('POST').apply(this, arguments);
    }

    /**
     * @method put
     * Issue a `PUT` request.
     * @param {string|object} url
     * The URL to issue the request to.
     * The configuration object accepts all of the #NGN.NET.Request
     * configuration options (except method, which is defined automatically).
     * @param {Function} callback
     * A callback method to run when the request is complete.
     * This receives the response object as the only argument.
     */
    put () {
      this.makeRequest('PUT').apply(this, arguments);
    }

    /**
     * @method delete
     * Issue a `DELETE` request.
     * @param {string|object} url
     * The URL to issue the request to.
     * The configuration object accepts all of the #NGN.NET.Request
     * configuration options (except method, which is defined automatically).
     * @param {Function} callback
     * A callback method to run when the request is complete.
     * This receives the response object as the only argument.
     */
    delete () {
      this.makeRequest('DELETE').apply(this, arguments);
    }

    /**
     * @method trace
     * Issue a `TRACE` request. This is a debugging method, which
     * echoes input back to the user. It is a standard HTTP method,
     * but considered a security risk by many practioners and may
     * not be supported by remote hosts.
     * @param {string|object} url
     * The URL to issue the request to.
     * The configuration object accepts all of the #NGN.NET.Request
     * configuration options (except method, which is defined automatically).
     * @param {Function} callback
     * A callback method to run when the request is complete.
     * This receives the response object as the only argument.
     */
    trace () {
      NGN.WARN('NGN.NET.Request.method', 'An HTTP TRACE request was made.');
      this.makeRequest('TRACE').apply(this, arguments);
    }

    /**
     * @method json
     * This is a shortcut method for creating a `GET` request and
     * auto-processing the response body into a JSON object.
     * @param  {string} url
     * The URL to issue the request to.
     * @param  {Function} callback
     * This receives a JSON response object from the server.
     * @param {Error} callback.error
     * If the request cannot be completed for any reason, this argument will be
     * populated with the error. If the request is successful, this will be `null`.
     * @param {Object} callback.data
     * The JSON response from the remote URL.
     */
    json (url, callback) {
      if (!NGN.isFn(callback)) {
        throw new Error('NGN.NET.json requires a callback method.')
      }

      // Request method is "GET"
      let request = this.parseRequestConfiguration({url});

      this.preflight(request);

      request.send((response) => {
        try {
          let responseData = JSON.parse(response.responseText);
          callback(null, responseData);
        } catch (e) {
          e.response = NGN.coalesce(response.responseText);
          callback(e, null);
        }
      });
    }

    /**
     * @method jsonp
     * Execute a request via JSONP. JSONP is only available in browser
     * environments, since it's operation is dependent on the existance of
     * the DOM. However; this may work with some headless browsers.
     * @param {string} url
     * The URL of the JSONP endpoint.
     * @param {function} callback
     * Handles the response.
     * @param {Error} callback.error
     * If an error occurred, this will be populated. If no error occurred, this will
     * be null.
     * @param {object|array} callback.response
     * The response.
     * @environment browser
     */
    jsonp (url, callback) {
      /* browser-only */
      const fn = 'jsonp_callback_' + Math.round(100000 * Math.random());

      window[fn] = (data) => {
        delete window[fn];

        document.body.removeChild(script);

        return callback(null, data)
      };

      let script = document.createElement('script');

      script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + fn;

      script.addEventListener('error', (e) => {
        delete window[fn];

        return callback(new Error('The JSONP request was blocked. This may be the result of an invalid URL, cross origin restrictions, or the remote server may not be online.'))
      });

      document.body.appendChild(script);
      /* end-browser-only */
    }

    // Apply a preflight request option to the network request.
    send (request, callback) {
      this.preflight(request);
      request.send(callback);
    }

    /**
     * @method preflight
     * This is a no-op method that runs before a request is sent.
     * This exists specicially to be overridden by class extensions.
     */
    preflight (request) {}
  }

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
   * server.get('./templates/home.html', (response) => { ... })
   * API.json('/user', (data) => { ... })
   * ```
   *
   * Both `server` and `API` in the example above are instances of
   * NGN.NET. They each use different credentials to access the
   * remote endpoint, using different global headers and
   * a different base URL.
   *
   * This can be incredibly useful anytime a migration is required,
   * such as running code in dev ==> staging ==> production or
   * switching servers. It is also useful for creating connections
   * to different remote services, creating custom API clients,
   * and generally organizing/standardizing how an application connects
   * to remote resources.
   * @extends NGN.NET
   */
  class NetworkResource extends Network {
    constructor (cfg) {
      super();

      cfg = cfg || {};

      Object.defineProperties(this, {
        /**
         * @cfg {object} headers
         * Contains headers (key/value) that are applied to all requests.
         */
        globalHeaders: NGN.private(NGN.coalesceb(cfg.headers, {})),

        /**
         * @cfg {object} credentials
         * Contains credentials that are applied to all requests.
         * @private
         */
        globalCredentials: NGN.private(NGN.coalesceb(cfg.credentials, {})),

        /**
         * @cfg {string} username
         * Use this to set a username (instead of using #credentials).
         */
        user: NGN.private(NGN.coalesceb(cfg.username)),

        /**
         * @cfg {string} password
         * Use this to set a password (instead of using #credentials).
         */
        secret: NGN.private(NGN.coalesceb(cfg.password)),

        /**
         * @cfg {string} accessToken
         * Use this to set an access token (instead of using #credentials).
         */
        accesstoken: NGN.private(NGN.coalesceb(cfg.token, cfg.accessToken)),

        /**
         * @cfg {object} query
         * Contains query parameters to be applied to all requests. All values
         * are automatically url-encoded.
         */
        globalQuery: NGN.private(NGN.coalesceb(cfg.query, {})),

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
        baseUrl: NGN.private(NGN.coalesce(cfg.baseUrl, cfg.baseurl, `http://${hostname}/`)),

        /**
         * @cfg {boolean} [nocache=false]
         * Set this to `true` to add a unique cache-busting URL parameter to all requests.
         */
        nocache: NGN.private(NGN.coalesce(cfg.nocache, false)),

        /**
         * @cfg {boolean} [sslonly=false]
         * Set this to true to rewrite all URL's to use HTTPS.
         */
        sslonly: NGN.public(NGN.coalesce(cfg.sslonly, false))
      });

      if (this.baseUrl.indexOf('://') < 0 || this.baseUrl.indexOf('://') > 10) {
        this.baseUrl = `http${this.sslonly ? 's' : ''}://${this.baseUrl}`;
      } else if (this.sslonly) {
        this.baseUrl = this.baseUrl.replace('http://', 'https://');
      }

      if (this.accesstoken !== null) {
        this.credentials = {
          accessToken: this.accesstoken
        };
      } else if (this.user !== null && this.ssecret !== null) {
        this.credentials = {
          username: this.user,
          password: this.secret
        };
      }
    }

    get username () {
      return this.user
    }

    set username (value) {
      if (this.user !== value) {
        this.user = value;

        if (this.secret !== null) {
          this.credentials = {
            username: this.user,
            password: this.secret
          };
        }
      }
    }

    set password (value) {
      if (this.secret !== value) {
        this.secret = value;

        if (this.user !== null) {
          this.credentials = {
            username: this.user,
            password: this.secret
          };
        }
      }
    }

    /**
     * @property {object} headers
     * Represents the current global headers.
     *
     * This is commonly used when a remote resource requires a specific
     * header on every call.
     *
     * **Example**
     *
     * ```js
     * let resource = new NGN.NET.Resource(...)
     *
     * resource.headers = {
     *   'user-agent': 'my custom agent name'
     * }
     * ```
     */
    get headers () {
      return this.globalHeaders
    }

    set headers (value) {
      this.globalHeaders = value;
    }

    /**
     * @property credentials
     * Configure credentials that are applied to every request.
     * This is commonly used when communicating with a RESTful API.
     * This can accept a username and password or an access token.
     *
     * **Examples**
     *
     * ```js
     *  let resource = new NGN.NET.Resource(...)
     *
     *  resource.credentials = {
     *    username: 'user',
     *    password: 'pass'
     *  }
     * ```
     *
     * ```js
     * resource.credentials = {
     *   accessToken: 'token'
     * }
     * ```
     */
    set credentials (credentials) {
      if (credentials.hasOwnProperty('accesstoken') || credentials.hasOwnProperty('accessToken') || credentials.hasOwnProperty('token')) {
        credentials.accessToken = NGN.coalesce(credentials.accessToken, credentials.accesstoken, credentials.token);

        if (credentials.hasOwnProperty('username')) {
          delete credentials.username;
        }

        if (credentials.hasOwnProperty('password')) {
          delete credentials.password;
        }
      } else if (!(credentials.hasOwnProperty('username') && credentials.hasOwnProperty('password')) && !credentials.hasOwnProperty('accessToken')) {
        throw new Error('Invalid credentials. Must contain an access token OR the combination of a username AND password.')
      }

      this.globalCredentials = credentials;

      if (credentials.username) {
        this.username = credentials.username;
      }

      if (credentials.password) {
        this.password = credentials.password;
      }
    }

    // Explicitly deny credential reading.
    get credentials () {
      NGN.WARN('Credentials are write-only. An attempt to read credentials was denied.');
      return {
        username: null,
        secret: null,
        password: null,
        accessToken: null
      }
    }

    /**
     * @property {object} query
     * Represents the current global query paramaters.
     *
     * This is commonly used when a remote resource requires a specific
     * query paramater on every call.
     *
     * **Example**
     *
     * ```js
     * let resource = new NGN.NET.Resource(...)
     *
     * resource.query = {
     *   'user_id': '12345'
     * }
     * ```
     *
     * All parameter values are automatically URL-encoded.
     */
    get query () {
      return this.globalQuery
    }

    set query (value) {
      this.globalQuery = value;
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
    prepareUrl (uri) {
      if (uri.indexOf('://') < 0) {
        uri = normalizeUrl(`${this.baseUrl}/${uri}`);
      }

      return uri.replace(/\/{2,5}/gi, '/').replace(/:\/{1}/i, '://')
    }

    /**
     * @method preflight
     * Prepares a request before it is sent.
     * @param {NGN.NET.Request} request
     * The request object.
     * @private
     */
    preflight (request) {
      // Apply the base URL
      request.url = this.prepareUrl(request.url);

      // If global query parameters have been defined, apply them.
      let qp = Object.keys(this.globalQuery);
      if (qp.length > 0) {
        let queryString = [];
        for (let i = 0; i < qp.length; i++) {
          queryString.push(`${qp[i]}=${encodeURIComponent(this.globalQuery[qp[i]])}`);
        }

        if (request.query === '') {
          request.url = `${request.url}?${queryString.join('&')}`;
        } else {
          request.url = `${request.url}&${queryString.join('&')}`;
        }
      }

      // If global credentials are available, apply them.
      let gHeaders = Object.keys(this.globalHeaders);
      for (let i = 0; i < gHeaders.length; i++) {
        request.setHeader(gHeaders[i], this.globalHeaders[gHeaders[i]]);
      }

      // If global headers/credentials are available, apply them.
      if (this.globalCredentials.accessToken) {
        request.accessToken = this.globalCredentials.accessToken;
      } else if (this.globalCredentials.username) {
        request.username = this.globalCredentials.username;
        request.password = this.globalCredentials.password;
      }

      // Add a cache buster
      if (this.nocache) {
        request.setQueryParameter('nocache' + (new Date()).getTime().toString() + Math.random().toString().replace('.', ''), null);
      }
    }
  }

  /**
   * @namespace NGN.NET
   * A library to issue HTTP/S requests.
   * This acts as an AJAX library.
   * @author Corey Butler
   * @singleton
   */

  // [INCLUDE: ./Request.js]
  // [INCLUDE: ./Network.js]
  // [INCLUDE: ./Resource.js]

  // NGN.extend('NET', NGN.const(new Network()))
  // NGN.NET.normalizeUrl = normalizeUrl

  Network.prototype.Resource = NetworkResource;
  const Library = new Network();

  // Network = null // eslint-disable-line
  // NetworkResource = null // eslint-disable-line

  /**
   * @ignore
   * Addition: ['+', path, value]
   * Deletion: ['-', path, oldValue]
   * Modified: ['m', path, oldValue, newValue]
   */
  class ObjectDiff {
    static compare (lhs, rhs, path = []) {
      let differences = [];
      let ltype = NGN.typeof(lhs);
      let rtype = NGN.typeof(rhs);

      // If the comparators aren't the same type, then
      // it is a replacement. This is identified as
      // removal of one object and creation of the other.
      if (ltype !== rtype) {
        return [
          ['m', path, lhs, rhs]
        ]
      }
  console.log('Diffing:', ltype, lhs, rhs, 'PATH', path.join('.'));
      switch (ltype) {
        // case 'function':
        //   if (lhs.toString() !== rhs.toString()) {
        //     return ['m', path, lhs, rhs]
        //   }
        //
        //   return []

        case 'object':
          let keys = Object.keys(lhs);
          // let relativePath

          // Compare left to right for modifications and removals
          for (let i = 0; i < keys.length; i++) {
            // Reset the relative path
            let relativePath = Object.assign([], path);

            relativePath.push(keys[i]);

            if (!rhs.hasOwnProperty(keys[i])) {
              // If no right hand argument exists, it was removed.
              differences.push(['-', relativePath, lhs[keys[i]]]);
            } else if (NGN.typeof(lhs[keys[i]]) === 'object') {
              // Recursively compare objects
              differences = differences.concat(this.compare(lhs[keys[i]], rhs[keys[i]], relativePath));
            } else if (lhs[keys[i]] !== rhs[keys[i]]) {
              if (NGN.typeof(lhs[keys[i]]) === 'array' && NGN.typeof(rhs[keys[i]]) === 'array') {
                // If the keys contain arrays, re-run the comparison.
                differences = differences.concat(this.compare(lhs[keys[i]], rhs[keys[i]], relativePath));
              } else {
                // If the comparators exist but are different, a
                // modification ocurred.
                differences.push(['m', relativePath, lhs[keys[i]], rhs[keys[i]]]);
              }
            }
          }

          // Compare right to left for additions
          keys = Object.keys(lhs);
          keys.unshift(rhs);
          keys = NGN.getObjectExtraneousPropertyNames.apply(this, keys);

          for (let i = 0; i < keys.length; i++) {
            // Reset the relative path
            let relativePath = Object.assign([], path);
            relativePath.push(keys[i]);

            differences.push(['+', relativePath, rhs[keys[i]]]);
          }

          break

        case 'array':
          differences = this.compareArray(lhs, rhs);

          break

        case 'string':
          console.log('TO DO: Add String Diff'); // eslint-disable-line no-fallthrough

        default:
          if (lhs !== rhs) {
            if (NGN.typeof(lhs) !== 'undefined' && NGN.typeof(rhs) === 'undefined') {
              differences.push(['-', path, lhs]);
            } else if (NGN.typeof(lhs) === 'undefined' && NGN.typeof(rhs) !== 'undefined') {
              differences.push(['+', path, rhs]);
            } else {
              differences.push(['m', path, lhs, rhs]);
            }
          }
      }

      return differences
    }

    compareArray (lhs, rhs) {
      // if (lhs === rhs) {
        return []
      // }
      //
      // for (let i = 0; i < lhs.length; i++) {
      //   if (false) {}
      // }
    }

    static arraysHaveMatchByRef (array1, array2, len1, len2) {
      for (let index1 = 0; index1 < len1; index1++) {
        let val1 = array1[index1];

        for (let index2 = 0; index2 < len2; index2++) {
          let val2 = array2[index2];

          if (index1 !== index2 && val1 === val2) {
            return true
          }
        }
      }
    }

    static matchItems (array1, array2, index1, index2, context) {
      let value1 = array1[index1];
      let value2 = array2[index2];

      if (value1 === value2) {
        return true
      }

      if (typeof value1 !== 'object' || typeof value2 !== 'object') {
        return false
      }

      let objectHash = context.objectHash;

      if (!objectHash) {
        // no way to match objects was provided, try match by position
        return context.matchByPosition && index1 === index2
      }

      let hash1;
      let hash2;

      if (typeof index1 === 'number') {
        context.hashCache1 = NGN.forceArray(context.hashCache1);
        hash1 = context.hashCache1[index1];

        if (typeof hash1 === 'undefined') {
          context.hashCache1[index1] = hash1 = objectHash(value1, index1);
        }
      } else {
        hash1 = objectHash(value1);
      }

      if (typeof hash1 === 'undefined') {
        return false
      }

      if (typeof index2 === 'number') {
        context.hashCache2 = NGN.forceArray(context.hashCache2);
        hash2 = context.hashCache2[index2];

        if (typeof hash2 === 'undefined') {
          context.hashCache2[index2] = hash2 = objectHash(value2, index2);
        }
      } else {
        hash2 = objectHash(value2);
      }

      if (typeof hash2 === 'undefined') {
        return false
      }

      return hash1 === hash2
    }

    /*
     * LCS implementation that supports arrays or strings
     * reference: http://en.wikipedia.org/wiki/Longest_common_subsequence_problem
     * This code abstracted from Benjamín Eidelman's JSONDiffPatch (MIT).
     */
    static lcsDefaultMatch (array1, array2, index1, index2) {
      return array1[index1] === array2[index2]
    }

    static lcsLengthMatrix (array1, array2, match, context) {
      let len1 = array1.length;
      let len2 = array2.length;
      let x;
      let y;

      // initialize empty matrix of len1+1 x len2+1
      let matrix = [len1 + 1];

      for (x = 0; x < len1 + 1; x++) {
        matrix[x] = [len2 + 1];

        for (y = 0; y < len2 + 1; y++) {
          matrix[x][y] = 0;
        }
      }

      matrix.match = match;

      // save sequence lengths for each coordinate
      for (x = 1; x < len1 + 1; x++) {
        for (y = 1; y < len2 + 1; y++) {
          if (match(array1, array2, x - 1, y - 1, context)) {
            matrix[x][y] = matrix[x - 1][y - 1] + 1;
          } else {
            matrix[x][y] = Math.max(matrix[x - 1][y], matrix[x][y - 1]);
          }
        }
      }

      return matrix
    };

    static lcsBacktrack (matrix, array1, array2, index1, index2, context) {
      if (index1 === 0 || index2 === 0) {
        return {
          sequence: [],
          indices1: [],
          indices2: []
        }
      }

      if (matrix.match(array1, array2, index1 - 1, index2 - 1, context)) {
        let subsequence = backtrack(matrix, array1, array2, index1 - 1, index2 - 1, context);

        subsequence.sequence.push(array1[index1 - 1]);
        subsequence.indices1.push(index1 - 1);
        subsequence.indices2.push(index2 - 1);

        return subsequence
      }

      if (matrix[index1][index2 - 1] > matrix[index1 - 1][index2]) {
        return backtrack(matrix, array1, array2, index1, index2 - 1, context)
      } else {
        return backtrack(matrix, array1, array2, index1 - 1, index2, context)
      }
    };

    static lcsGet (array1, array2, match, context) {
      context = context || {};

      let matrix = lengthMatrix(array1, array2, match || defaultMatch, context);
      let result = backtrack(matrix, array1, array2, array1.length, array2.length, context);

      if (typeof array1 === 'string' && typeof array2 === 'string') {
        result.sequence = result.sequence.join('');
      }

      return result
    }
  }


  // class LCS {
  //
  // }

  // Difference Utilities

  // CRC table for checksum (cached)
  let crcTable = null;

  /**
   * Generate the CRC table for checksums. This is a fairly complex
   * operation that should only be executed once and cached for
   * repeat use.
   */
  const makeCRCTable = function () {
    let c;
    let crcTable = [];

    for (let n = 0; n < 256; n++) {
      c = n;

      for (let k = 0; k < 8; k++) {
        c = ((c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
      }

      crcTable[n] = c;
    }

    return crcTable
  };

  /**
   * @class NGN.DATA.UTILITY
   * A utility library of functions relevant to data management.
   */
  class Utility$1 { // eslint-disable-line
    static diff () {
      return ObjectDiff.compare(...arguments) // eslint-disable-line no-undef
    }

    /**
     * @method checksum
     * Create the checksum of the specified string.
     * @param  {string} content
     * The content to generate a checksum for.
     * @return {string}
     * Generates a checksum value.
     */
    static checksum (str) {
      if (typeof str === 'object') {
        str = JSON.stringify(this.serialize(str));
      }

      if (!crcTable) {
        crcTable = makeCRCTable();
      }

      let crc = 0 ^ (-1);

      for (let i = 0; i < str.length; i++) {
        crc = (crc >>> 8) ^ crcTable[(crc ^ str.charCodeAt(i)) & 0xFF];
      }

      return (crc ^ (-1)) >>> 0
    }

    /**
     * @method UUID
     * Generate a universally unique identifier (v4).
     *
     * This is a "fast" UUID generator, designed to work in the browser.
     * This will generate a UUID in less than 20ms on Chrome, as of Nov 6, 2017.
     * Code courtesy of @broofa on StackOverflow.
     *
     * While this method cannot absolutely guarantee there will be no collisions
     * (duplicates), the chances are 1:5.3x10^^36 (1 in over 100 quadrillion).
     * You are over 30 _octillion_ times more likely to win the Powerball than to
     * generate two identical "random" UUIDs using the version 4 scheme.
     * @return {string}
     * Returns a [V4 GUID](https://en.wikipedia.org/wiki/Universally_unique_identifier#Version_4_.28random.29).
     */
    static UUID () {
      /* browser-only */
      return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c => // eslint-disable-line
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16) // eslint-disable-line
      )
      /* end-browser-only */
    }

    /**
     * @method GUID
     * Generate a globally unique identifier. A GUID is the Microsoft
     * implementation of a UUIDv4.
     *
     * The likelihood of an ID collision, according to the original author (Jeff
     * Ward) is 1:3.26x10^15 (1 in 3.26 quadrillion). Results are generated between
     * approximately 105ms (Desktop) and 726ms (Android) as of May 2016.
     * @return {string} [description]
     */
    static GUID () {
      let lut = [];

      for (let i = 0; i < 256; i++) {
        lut[i] = (i < 16 ? '0' : '') + (i).toString(16);
      }

      const d0 = Math.random() * 0xffffffff | 0;
      const d1 = Math.random() * 0xffffffff | 0;
      const d2 = Math.random() * 0xffffffff | 0;
      const d3 = Math.random() * 0xffffffff | 0;

      return lut[d0 & 0xff] + lut[d0 >> 8 & 0xff] + lut[d0 >> 16 & 0xff] + lut[d0 >> 24 & 0xff] +
        '-' + lut[d1 & 0xff] + lut[d1 >> 8 & 0xff] + '-' + lut[d1 >> 16 & 0x0f | 0x40] +
        lut[d1 >> 24 & 0xff] + '-' + lut[d2 & 0x3f | 0x80] + lut[d2 >> 8 & 0xff] + '-' +
        lut[d2 >> 16 & 0xff] + lut[d2 >> 24 & 0xff] + lut[d3 & 0xff] + lut[d3 >> 8 & 0xff] +
        lut[d3 >> 16 & 0xff] + lut[d3 >> 24 & 0xff]
    }

    /**
     * @method serialize
     * Creates a JSON data object with no functions. Only uses enumerable
     * attributes of the object.
     *
     * Functions & Setters are always ignored. Getters are evaluated recursively
     * until a simple object type is found or there are no further nested
     * attributes.
     * @param {object|array} object
     * Supports an object or array.
     */
    static serialize (data) {
      if (typeof data !== 'object') {
        throw new Error(`Cannot serialize ${NGN.typeof(data)} value. Must be an object.`)
      }

      // Force an object for parsing
      let SERIALIZED_ARRAY_DATA = Symbol('array.data');

      if (NGN.typeof(data) === 'array') {
        data = {
          [SERIALIZED_ARRAY_DATA]: data
        };
      }

      let result = {};
      let attribute = Object.keys(data);

      for (let i = 0; i < attribute.length; i++) {
        if (data[attribute[i]] !== undefined) {
          switch (NGN.typeof(data[attribute[i]])) {
            case 'object':
              Object.defineProperty(
                result,
                attribute[i],
                NGN.public(NGN.DATA.UTIL.serialize(data[attribute[i]]))
              );

              break

            case 'array':
              result[attribute[i]] = [];

              for (let a = 0; a < data[attribute[i]].length; a++) {
                result[attribute[i]].push(NGN.DATA.UTIL.serialize(data[attribute[i]]));
              }

              break

            case 'date':
              Object.defineProperty(result, attribute[i], NGN.public(data[attribute[i]].toISOString()));

              break

            case 'symbol':
              if (SERIALIZED_ARRAY_DATA !== attribute[i]) {
                result[attribute[i]] = data[attribute[i]].toString();
              }

              break

            case 'regexp':
              Object.defineProperty(result, attribute[i], NGN.public(data[attribute[i]].toString()));

              break

            case 'weakmap':
            case 'map':
              let mapResult = {};

              data[attribute[i]].forEach((value, key) => {
                mapResult[key.toString()] = this.serialize(value);
              });

              result[attribute[i]] = mapResult;

              break

            case 'weakset':
            case 'set':
              if (data[attribute[i]].size === 0) {
                result[attribute[i]] = [];
                break
              }

              result[attribute[i]] = this.serialize(Array.from(data[attribute[i]].values()));

              break

            case 'function':
              break

            default:
              result[attribute[i]] = data[attribute[i]];
          }
        }
      }

      return result[SERIALIZED_ARRAY_DATA] !== undefined ? result[SERIALIZED_ARRAY_DATA] : result
    }

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
    //  * Consider this method to provide a **best guess based on the available data**.
    //  *
    //  * @param {Object} object
    //  * The primitive key/value object upon which the bytesize estimation will be made.
    //  * @param {Boolean} [ignoreFunctionEstimate=false]
    //  * By default, NGN will calculate the `String` representation of any functions
    //  * it encounters in the key/value object. Setting this to `true` will prevent
    //  * this behavior, effectively using a `0` to calculate function size.
    //  */
    // static objectByteSize (obj, ignore=false) {
    //   switch (typeof obj) {
    //     case null:
    //       return 4
    //
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
    //       bytes += NGN.DATA.UTILITY.objectByteSize(value)
    //     }
    //   }
    //
    //   return bytes
    // }
  }

  /**
   * Inspired by btree.js (c) 2013 Daniel Wirtz <dcode@dcode.io>
   * Released under the Apache License, Version 2.0
   * see: http://github.com/dcodeIO/btree.js for details.
   *
   * Converted to ECMASCript 2016 class syntax & modified to use
   * NGN conventions. Separated code into multiple classes.
   * Copyright (c) 2018, Ecor Ventures LLC.
   * @hidden
   */
  class TreeNode {
    constructor (parent = null, leafs = [], nodes = [null]) {
      Object.defineProperties(this, {
        parent: NGN.private(parent),
        leafs: NGN.private(leafs),
        nodes: NGN.private(nodes),

        METADATA: NGN.private({
          order: null,
          minOrder: null,

          /**
          * Compare two numbers
          * @param  {number} firstNumber
          * @param  {number} secondNumber
          * @return {number}
          * - Returns `-1` if first number is less than second.
          * - Returns `0` if numbers are equal.
          * - Returns `1` if first number is greater than second.
          */
          compare: (firstNumber, secondNumber) => {
            return firstNumber < secondNumber ? -1 : (firstNumber > secondNumber ? 1 : 0)
          }
        })
      });

      // Associate leafs with parent
      for (let i = 0; i < this.leafs.length; i++) {
        this.leafs[i].parent = this;
        // Object.defineProperty(this.leafs[i], 'parent', NGN.get(() => this))
      }

      // Associate nodes with parent
      for (let i = 0; i < this.nodes.length; i++) {
        if (this.nodes[i] !== null) {
          this.nodes[i].parent = this;
          // Object.defineProperty(this.nodes[i], 'parent', NGN.get(() => this))
        }
      }
    }

    /**
    * Search for the node that contains the specified key
    * @param  {any} key
    * @return {TreeLeaf|TreeNode}
    */
    search (key) {
      if (this.leafs.length > 0) {
        let a = this.leafs[0];

        if (this.METADATA.compare(a.key, key) === 0) {
          return {
            leaf: a,
            index: 0
          }
        }

        if (this.METADATA.compare(key, a.key) < 0) {
          if (this.nodes[0] !== null) {
            return this.nodes[0].search(key) // Left
          }

          return { node: this, index: 0 }
        }

        let i;
        for (i = 1; i < this.leafs.length; i++) {
          let b = this.leafs[i];

          if (this.METADATA.compare(b.key, key) === 0) {
            return {
              leaf: b,
              index: i
            }
          }

          if (this.METADATA.compare(key, b.key) < 0) {
            if (this.nodes[i] !== null) {
              return this.nodes[i].search(key) // Inner
            }

            return { node: this, index: i }
          }

          a = b;
        }

        if (this.nodes[i] !== null) {
          return this.nodes[i].search(key) // Right
        }

        return { node: this, index: i }
      }

      return { node: this, index: 0 }
    }

    /**
    * Retrieve the value of a key.
    * @param {number} key
    * @returns {NGNTreeLeaf}
    * Returns `undefined` if no leaf is found.
    */
    get (key) {
      let result = this.search(key);
      return result.leaf ? result.leaf.value : undefined
    }

    /**
    * Insert a key/value pair into the node.
    * @param {number} key
    * @param {any} value
    * @param {boolean} [overwrite=true]
    * Overwrite existing values.
    */
    put (key, value, overwrite = true) {
      let result = this.search(key);

      // Key already exists
      if (result.leaf) {
        if (!overwrite) {
          return
        }

        result.leaf.value = value;
        return
      }

      let node = result.node;
      let index = result.index;

      node.leafs.splice(index, 0, new TreeLeaf(node, key, value));
      node.nodes.splice(index + 1, 0, null);

      if (node.leafs.length > this.METADATA.order) {
        node.split();
      }
    }

    /**
    * Delete key.
    * @param {number} key
    */
    delete (key) {
      var result = this.search(key);

      if (!result.leaf) {
        return
      }

      let leaf = result.leaf;
      let node = leaf.parent;
      let index = result.index;
      let left = node.nodes[index];

      if (left === null) {
        node.leafs.splice(index, 1);
        node.nodes.splice(index, 1);
        node.balance();
      } else {
        let max = left.leafs[left.leafs.length - 1];

        left.delete(max.key);

        max.parent = node;

        node.leafs.splice(index, 1, max);
      }

      return true
    }

    /**
    * Balance the tree.
    * @private
    */
    balance () {
      if (this.parent instanceof Tree) {
        // Root has a single child and no leafs
        if (this.leafs.length === 0 && this.nodes[0] !== null) {
          this.parent.root = this.nodes[0];
          this.parent.root.parent = this.parent;
        }

        return
      }

      if (this.leafs.length >= this.METADATA.minOrder) {
        return
      }

      let index = this.parent.nodes.indexOf(this);
      let left = index > 0 ? this.parent.nodes[index - 1] : null;
      let right = this.parent.nodes.length > index + 1 ? this.parent.nodes[index + 1] : null;
      let sep;
      let leaf;
      let rest;

      if (right !== null && right.leafs.length > this.METADATA.minOrder) {
        // Append the parent separator
        sep = this.parent.leafs[index];
        sep.parent = this;

        this.leafs.push(sep);

        // Replace blank with the first right leaf
        leaf = right.leafs.shift();
        leaf.parent = this.parent;

        this.parent.leafs[index] = leaf;

        // Append the right rest
        rest = right.nodes.shift();

        if (rest !== null) {
          rest.parent = this;
        }

        this.nodes.push(rest);
      } else if (left !== null && left.leafs.length > this.METADATA.minOrder) {
        // Prepend the parent seperator
        sep = this.parent.leafs[index - 1];
        sep.parent = this;

        this.leafs.unshift(sep);

        // Replace the blank with the last left leaf
        leaf = left.leafs.pop();
        leaf.parent = this.parent;

        this.parent.leafs[index - 1] = leaf;

        // Prepend the left rest to this
        rest = left.nodes.pop();

        if (rest !== null) {
          rest.parent = this;
        }

        this.nodes.unshift(rest);
      } else {
        let subst;

        if (right !== null) {
          // Combine this + seperator from the parent + right
          sep = this.parent.leafs[index];
          subst = new TreeNode(this.parent, this.leafs.concat([sep], right.leafs), this.nodes.concat(right.nodes));
          subst.METADATA.order = this.METADATA.order;
          subst.METADATA.minOrder = this.METADATA.minOrder;

          // Remove the seperator from the parent
          this.parent.leafs.splice(index, 1);

          // And replace the nodes it seperated with subst
          this.parent.nodes.splice(index, 2, subst);
        } else if (left !== null) {
          // Combine left + seperator from parent + this
          sep = this.parent.leafs[index - 1];
          subst = new TreeNode(
            this.parent,
            left.leafs.concat([sep], this.leafs),
            left.nodes.concat(this.nodes)
          );

          subst.METADATA.minOrder = this.METADATA.minOrder;
          subst.METADATA.order = this.METADATA.order;

          // Remove the seperator from the parent
          this.parent.leafs.splice(index - 1, 1);

          // Replace seperated nodes with subst
          this.parent.nodes.splice(index - 1, 2, subst);
        } else {
          throw new Error(`Internal error: ${this.toString(true)} has neither a left nor a right sibling`)
        }

        this.parent.balance();
      }
    }

    /**
    * Split the node.
    */
    split () {
      let index = Math.floor(this.leafs.length / 2);

      if (this.parent instanceof Tree) {
        this.nodes = [
          new TreeNode(this, this.leafs.slice(0, index), this.nodes.slice(0, index + 1)),
          new TreeNode(this, this.leafs.slice(index + 1), this.nodes.slice(index + 1))
        ];

        this.leafs = [this.leafs[index]];
      } else {
        let leaf = this.leafs[index];
        let rest = new TreeNode(
          this.parent,
          this.leafs.slice(index + 1),
          this.nodes.slice(index + 1)
        );

        this.leafs = this.leafs.slice(0, index);
        this.nodes = this.nodes.slice(0, index + 1);

        this.parent.unsplit(leaf, rest);
      }
    }

    /**
    * Unsplits a child.
    * @param {NGNTreeLeaf} leaf
    * @param {NGNTreeNode} rest
    * @param {number} [order=52]
    * @private
    */
    unsplit (leaf, rest) {
      leaf.parent = this;
      rest.parent = this;

      let a = this.leafs[0];

      if (this.METADATA.compare(leaf.key, a.key) < 0) {
        this.leafs.unshift(leaf);
        this.nodes.splice(1, 0, rest);
      } else {
        let i;
        for (i = 1; i < this.leafs.length; i++) {
          let b = this.leafs[i];

          if (this.METADATA.compare(leaf.key, b.key) < 0) {
            this.leafs.splice(i, 0, leaf);
            this.nodes.splice(i + 1, 0, rest);
            break
          }
        }

        if (i === this.leafs.length) {
          this.leafs.push(leaf);
          this.nodes.push(rest);
        }
      }

      if (this.leafs.length > this.METADATA.order) {
        this.split();
      }
    }

    /**
    * A string representation of the node.
    * @param {boolean} [includeNodes=false]
    * Include sub-nodes
    * @returns {string}
    * @private
    */
    toString (includeNodes = false) {
      let value = [];
      let i;

      for (i = 0; i < this.leafs.length; i++) {
        value.push(this.leafs[i].key);
      }

      let s = `[${value.toString()}]${(this.parent instanceof Tree ? ':*' : ':')}${this.parent}`;

      if (includeNodes) {
        for (i = 0; i < this.nodes.length; i++) {
          s += ` -> ${this.nodes[i]}`;
        }
      }

      return s
    }
  }

  /**
   * @hidden
   */
  class TreeLeaf {
    /**
     * Constructs a new Leaf containing a value.
     * @param {NGNTreeNode} parent
     * @param {number} key
     * @param {any} value
     */
    constructor (parent, key, value) {
      Object.defineProperties(this, {
        parent: NGN.private(parent),
        key: NGN.private(key),
        value: NGN.private(value)
      });
    }

    toString () {
      return this.key.toString()
    }
  }

  /**
   * @class NGN.DATA.BTree
   * A O(n) B-tree data type.
   * @private
   */
  class Tree extends EventEmitter {
    constructor (order = 52) {
      super();

      // Sanitize input
      order = order < 1 ? 1 : order;

      Object.defineProperties(this, {
        root: NGN.private(new TreeNode(this)),

        BTREE: NGN.private({}),

        METADATA: NGN.private({
          order: order,

          minOrder: order > 1 ? Math.floor(order / 2) : 1,

          compare: (firstNumber, secondNumber) => {
            return firstNumber < secondNumber ? -1 : (firstNumber > secondNumber ? 1 : 0)
          }
        })
      });

      this.root.METADATA.minOrder = this.METADATA.minOrder;
      this.root.METADATA.order = this.METADATA.order;
    }

    /**
     * Validates a node and prints debugging info if something went wrong.
     * @param {!TreeNode|!Tree} node
     * @private
     */
    validate (node) {
      if (node instanceof Tree) {
        return
      }

      if (node.leafs.length + 1 !== node.nodes.length) {
        NGN.ERROR(`Illegal leaf/node count in ${node}: ${node.leafs.length}/${node.nodes.length}`);
      }

      let i;

      for (i = 0; i < node.leafs.length; i++) {
        if (!node.leafs[i]) {
          NGN.ERROR(`Illegal leaf in ${node} at ${i}: ${node.leafs[i]}`);
        }
      }

      for (i = 0; i < node.nodes.length; i++) {
        if (NGN.typeof(node.nodes[i]) === 'undefined') {
          NGN.ERROR(`Illegal node in ${node} at ${i}: undefined`);
        }
      }
    }

    /**
     * Insert a key/value pair into the tree.
     * @param {number} key
     * @param {any} value
     * @param {boolean} [overwrite=true]
     * Overwrite existing values
     */
    put (key, value, overwrite = true) {
      if (NGN.typeof(key) !== 'number') {
        throw new Error(`Illegal key: ${key}`)
      }

      if (value === undefined) {
        throw new Error(`Illegal value: ${value}`)
      }

      return this.root.put(key, value, overwrite)
    }

    /**
     * Retrieve the value for the specified key.
     * @param {number} key
     * @returns {any}
     * If there is no such key, `undefined` is returned.
     */
    get (key) {
      if (NGN.typeof(key) !== 'number') {
        throw new Error(`Illegal key: ${key}`)
      }

      return this.root.get(key)
    }

    /**
     * Delete a key from the tree.
     * @param {number} key
     */
    delete (key) {
      if (NGN.typeof(key) !== 'number') {
        throw new Error(`Illegal key: ${key}`)
      }

      return this.root.delete(key)
    }

    /**
     * Walk through all keys in ascending order.
     * @param {number} minKey
     * If omitted or NULL, starts at the beginning
     * @param {number} maxKey
     * If omitted or NULL, walks till the end
     * @param {function} callback
     * @param {number} callback.key
     * The key
     * @param {any} callback.value
     * The value.
     */
    walk (minKey, maxKey, callback) {
      if (this.root.leafs.length === 0) {
        return
      }

      if (NGN.isFn(minKey)) {
        callback = minKey;
        minKey = maxKey = null;
      } else if (NGN.isFn(maxKey)) {
        callback = maxKey;
        maxKey = null;
      }

      minKey = NGN.coalesce(minKey);
      maxKey = NGN.coalesce(maxKey);

      let ptr;
      let index;

      if (minKey === null) {
        // No minimum limit
        ptr = this.root;

        while (ptr.nodes[0] !== null) {
          ptr = ptr.nodes[0];
        }

        index = 0;
      } else {
        // lookup
        let result = this.root.search(minKey);

        if (result.leaf) {
          // Minimum key itself exists
          ptr = result.leaf.parent;
          index = ptr.leafs.indexOf(result.leaf);
        } else {
          // Key does not exist
          ptr = result.node;
          index = result.index;

          if (index >= ptr.leafs.length) {
            // begin at parent separator in overrun
            if (ptr.parent instanceof Tree || ptr.parent.nodes.indexOf(ptr) >= ptr.parent.leafs.length) {
              return
            }

            ptr = ptr.parent;
          }
        }
      }

      // ptr/index points to first result
      while (true) {
        if (maxKey !== null && this.METADATA.compare(ptr.leafs[index].key, maxKey) > 0) {
          break
        }
        if (ptr.leafs.length === 0) {
          break
        }

        if (callback(ptr.leafs[index].key, ptr.leafs[index].value)) {
          break
        }

        if (ptr.nodes[index + 1] !== null) {
          // Descend Tree
          ptr = ptr.nodes[index + 1];
          index = 0;

          while (ptr.nodes[0] !== null) {
            ptr = ptr.nodes[0];
          }
        } else if (ptr.leafs.length > index + 1) {
          // Next
          index++;
        } else {
          // Ascend Tree
          do {
            if ((ptr.parent instanceof Tree)) {
              return
            }

            index = ptr.parent.nodes.indexOf(ptr);
            ptr = ptr.parent;
          } while (index >= ptr.leafs.length)
        }
      }
    }

    /**
     * Walks through all keys in descending order.
     * @param {number} minKey
     * If omitted or NULL, starts at the beginning
     * @param {number} maxKey
     * If omitted or NULL, walks till the end
     * @param {function} callback
     * @param {number} callback.key
     * The key
     * @param {any} callback.value
     * The value.
     */
    walkDesc (minKey, maxKey, callback) {
      if (NGN.isFn(minKey)) {
        callback = minKey;
        minKey = maxKey = null;
      } else if (NGN.isFn(maxKey)) {
        callback = maxKey;
        maxKey = null;
      }

      minKey = NGN.coalesce(minKey);
      maxKey = NGN.coalesce(maxKey);

      let ptr;
      let index;
      if (maxKey === null) {
        // No maximum
        ptr = this.root;

        while (ptr.nodes[ptr.nodes.length - 1] !== null) {
          ptr = ptr.nodes[ptr.nodes.length - 1];
        }

        index = ptr.leafs.length - 1;
      } else {
        // Lookup
        let result = this.root.search(maxKey);

        if (result.leaf) {
          // Maximum key exists
          ptr = result.leaf.parent;
          index = ptr.leafs.indexOf(result.leaf);
        } else {
          // Key does not exist
          ptr = result.node;
          index = result.index - 1;

          while (index < 0) {
            // Begin at parent separator on underrun
            if (ptr.parent instanceof Tree) {
              return
            }

            index = ptr.parent.nodes.indexOf(ptr) - 1;

            if (index < 0) {
              return
            }

            ptr = ptr.parent;
          }
        }
      }

      // ptr/index points to first result
      while (true) {
        if (minKey !== null && this.METADATA.compare(ptr.leafs[index].key, minKey) < 0) {
          break
        }

        if (callback(ptr.leafs[index].key, ptr.leafs[index].value)) {
          break
        }

        if (ptr.nodes[index] !== null) {
          // Descend Tree
          ptr = ptr.nodes[index];

          while (ptr.nodes[ptr.nodes.length - 1] !== null) {
            ptr = ptr.nodes[ptr.nodes.length - 1];
          }

          index = ptr.leafs.length - 1;
        } else if (index > 0) {
          // Next
          index--;
        } else {
          // Ascend Tree
          do {
            if ((ptr.parent instanceof Tree)) {
              return
            }

            index = ptr.parent.nodes.indexOf(ptr) - 1;

            ptr = ptr.parent;
          } while (index < 0)
        }
      }
    }

    /**
     * The number of keys between minKey and maxKey (both inclusive).
     * @param {number} minKey
     * If omitted, counts from the start
     * @param {number} maxKey
     * If omitted, counts till the end
     * @returns {number}
     */
    count (minKey, maxKey) {
      let n = 0;

      this.walk(
        minKey !== undefined ? minKey : null,
        maxKey !== undefined ? maxKey : null,
        (key, value) => { n++; }
      );

      return n
    };

    /**
     * A string representation of the tree.
     * @returns {string}
     */
    toString () {
      return `Tree(${this.METADATA.order}) ${this.root.toString()}`
    }

    get length () {
      return this.count()
    }
  }

  /**
   * @class NGN.DATA.JSONSchema
   * Represents a JSON Schema.
   * @fires parsed
   * Triggered when the schema is parsed.
   */
  class NGNJSONSchema extends EventEmitter { // eslint-disable-line no-unused-vars
    /**
     * Create a new JSON schema reference.
     * @param  {Object|String} [schema={}]
     * The schema to parse. This can be the JSON schema object itself or the URL
     * of a remote JSON schema.
     * @param  {NGN.NET.Resource} [NetworkResource]
     * Specify a custom network resource to make the request for a remote schema.
     */
    constructor (schema = {}, NetworkResource = null) {
      super();

      Object.defineProperties(this, {
        METADATA: NGN.private({
          schema,
          ID: null,
          name: null
        }),

        PRIVATE: NGN.privateconst({
          MODELS: null,
          NET: NGN.coalesce(NetworkResource, NGN.NET),

          parsed: false,

          /**
           * @method PRIVATE.extractCommonPropertyAttributes
           * @param  {object} property
           * Schema metadata object.
           * @param {array} [models=[]]
           * The list of known models. This is passed in because nested objects
           * may exist within a property. NGN identifies these as nested models,
           * even though the JSON schema does not force these to be separate
           * schemas.
           * @return {Object}
           * Returns a clean "NGN-ready" field object of common properties.
           */
          extractCommonPropertyAttributes: (property, models = []) => {
            let field = {};

            // Add pattern
            if (property.pattern) {
              field.pattern = property.pattern;
            }

            // Add description
            if (property.description) {
              field.description = property.description;
            }

            // Add default
            if (property.default) {
              field.default = property.default;
            }

            if (!property.$ref) {
              if (!property.type) {
                field.type = String;
              } else {
                let type = NGN.typeof(property.type) === 'array' ? 'array' : property.type.trim().toLowerCase();

                switch (type) {
                  case 'string':
                    let format = NGN.coalesce(property.format, 'unknown').trim().toLowerCase();

                    field.type = String;

                    switch (format) {
                      case 'date':
                      case 'date-time':
                      case 'datetime':
                      case 'format-time':
                        field.type = Date;
                        break

                      case 'ipv4':
                        field.pattern = NGN.coalesce(
                          property.pattern,
                          /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$|^(([a-zA-Z]|[a-zA-Z][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z]|[A-Za-z][A-Za-z0-9\-]*[A-Za-z0-9])$|^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/ // eslint-disable-line no-useless-escape
                        );

                        break

                      case 'ipv6':
                        field.pattern = NGN.coalesce(
                          property.pattern,
                          /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$|^(([a-zA-Z]|[a-zA-Z][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z]|[A-Za-z][A-Za-z0-9\-]*[A-Za-z0-9])$|^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/ // eslint-disable-line no-useless-escape
                        );

                        break

                      case 'email':
                        field.pattern = NGN.coalesce(
                          property.pattern,
                          /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)\b$/
                        );

                        break

                      case 'hostname':
                        field.pattern = NGN.coalesce(
                          property.pattern,
                          /^([a-zA-Z0-9]+(-[a-zA-Z0-9]+)*)+(\.([a-zA-Z0-9]+(-[a-zA-Z0-9‌​]+)*))*$/ // eslint-disable-line no-irregular-whitespace
                        );

                        break

                      case 'uri':
                        field.pattern = NGN.coalesce(
                          property.pattern,
                          /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})/
                        );

                        break
                    }

                    break

                  case 'integer':
                    field.type = Number;
                    field.pattern = /^\d+$/;
                    break

                  case 'number':
                    field.type = Number;
                    break

                  case 'object':
                    if (property.properties) {
                      let subschema = new NGN.DATA.JSONSchema(property);

                      subschema.name = `${NGN.coalesce(this.name, 'untitled')}_${NGN.coalesce(subschema.name, 'submodel')}${models.length + 1}`;

                      subschema.getModelDefinitions(definitions => {
                        definitions[definitions.length - 1].name = subschema.name;
                        models = definitions.concat(models);
                      });

                      field = {
                        $model: subschema.name
                      };
                    } else {
                      field.type = Object;
                    }

                    break

                  default:
                    field.type = String;
                    break
                }
              }
            }

            // String validation options
            if (field.type === String || field.type === Number) {
              if (NGN.coalesce(property.minLength, property.minimum)) {
                field.min = NGN.coalesce(property.minLength, property.minimum);
              }

              if (NGN.coalesce(property.maxLength, property.maximum)) {
                field.max = NGN.coalesce(property.maxLength, property.maximum);
              }

              // Numeric-specific validations
              if (property.type === Number) {
                if (property.multipleOf) {
                  field.multipleOf = property.multipleOf;
                }

                if (property.exclusiveMinimum) {
                  field.min = (property.exclusiveMinimum + 0.00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001);
                }

                if (property.exclusiveMaximum) {
                  field.max = (property.exclusiveMaximum - 0.00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001);
                }
              }
            }

            // Array validation options
            if (field.type === Array) {
              // Support minimum array length
              if (property.hasOwnProperty('minItems')) {
                field.min = property.minItems;
              }

              // Support maximum array length
              if (property.hasOwnProperty('maxItems')) {
                field.max = property.maxItems;
              }

              if (property.hasOwnProperty('items')) {
                if (NGN.typeof(property.items) === 'array') {
                  // Apply tuple validation
                  field.tuples = property.items;
                } else {
                  // Apply list validation
                  if (property.items.hasOwnProperty('type')) {
                    field.listType = NGN.getType(property.items.type);
                  }

                  if (property.items.hasOwnProperty('enum')) {
                    field.enum = property.items.enum;
                  }
                }
              }
            }

            return field
          },

          /**
           * @method PRIVATE.extractModelDefinitions
           * Retrieve all of the NGN.DATA.Model defitions that can be interpreted
           * from this schema.
           * @protected
           * @private
           * @param  {Object} data
           * The schema object.
           * @param  {Array} [models=[]]
           * An array of known models. This method is used recursively, so this
           * argument exists primarily for internal use.
           * @param  {Function} callback
           * Executed when all models have been detected.
           */
          extractModelDefinitions: (data, models = [], callback) => {
            if (NGN.isFn(models)) {
              callback = models;
              models = [];
            }

            if (data.type === 'object') {
              let name = NGN.coalesce(data.name, this.name, 'Untitled');

              if (data.hasOwnProperty('$schema') && name === null && this.METADATA.URL) {
                name = this.METADATA.URL.split(/\/|\\/).pop().replace('.json', '');
              }

              // Configure the basic model
              let model = {
                name,
                description: NGN.coalesce(data.description, 'No description.'),
                fields: {}
              };

              // Flag the ID for the schema
              if (data.hasOwnProperty('$schema')) {
                this.METADATA.ID = NGN.coalesce(data.$id, data.$schema);
              }

              // Queue the tasks since several are async but sequential
              let tasks = new NGN.Tasks();

              // If the allOf attribute exists, the schema is extending another.
              // Extract the subschema before continuing.
              if (data.hasOwnProperty('allOf')) {
                for (let i = 0; i < data.allOf.length; i++) {
                  tasks.add(`Identify base schema: ${data.allOf}`, cont => {
                    let URI = NGN.coalesce(data.allOf[i].$ref, data.allOf[i].$schema);

                    if (URI !== null) {
                      // When a URI is specified, retrieve the remote schema
                      let baseSchema = new NGN.DATA.JSONSchema(URI);

                      baseSchema.getModelDefinitions(definitions => {
                        let coreModel = definitions.pop();

                        Object.assign(model.fields, coreModel.fields);

                        // If the nested schema has additional models, apply them.
                        if (definitions.length > 0) {
                          models = definitions.concat(models);
                        }

                        this.METADATA.name = NGN.coalesce(this.METADATA.name, coreModel.name);

                        cont();
                      });
                    } else if (data.allOf[i].hasOwnProperty('properties')) {
                      // Handle additional properties
                      let additionalProperties = Object.keys(data.allOf[i].properties);

                      for (let prop = 0; prop < additionalProperties.length; prop++) {
                        model.fields[additionalProperties[prop]] = this.extractCommonPropertyAttributes(data.allOf[i].properties[additionalProperties[prop]]);
                      }

                      cont();
                    }
                  });
                }
              }

              tasks.add('Identify attributes', cont => {
                // If the schema specifies dependencies, it is specifying a set of
                // rules requiring the existance and non-empty value of additional
                // fields. Create NGN.DATA.Rule sets to support this.
                if (data.hasOwnProperty('dependencies')) {
                  Object.keys(data.dependencies).forEach(dependency => {
                    let requiredFields = null;
                    let dep = data.dependencies[dependency];

                    if (NGN.typeof(dep) === 'array') {
                      // Simple property dependencies
                      requiredFields = dep;
                    } else if (dep.hasOwnProperty('required')) {
                      // Schema dependencies
                      requiredFields = dep.required;
                    }

                    // Add all valid dependencies as rules
                    if (requiredFields !== null) {
                      model.rules[`${dependency} dependency on "${requiredFields.join(', ')}"`] = function () {
                        if (NGN.coalesce(this[dependency]) !== null) {
                          for (let i = 0; i < requiredFields.length; i++) {
                            if (NGN.coalesce(this[requiredFields[i]]) === null) {
                              return false
                            }
                          }
                        }

                        return true
                      };
                    }
                  });
                }

                // Identify the fields
                let properties = Object.keys(data.properties);
                let subtasks = new NGN.Tasks();

                if (properties.length > 0) {
                  for (let i = 0; i < properties.length; i++) {
                    let propertyName = properties[i];
                    let property = data.properties[propertyName];

                    model.fields[propertyName] = this.PRIVATE.extractCommonPropertyAttributes(property, models);

                    // If this is a subschema, retrieve it.
                    if (property.$ref) {
                      subtasks.add(next => {
                        let nestedModel = new NGN.DATA.JSONSchema(property.$ref);

                        nestedModel.getModelDefinitions(definitions => {
                          models = definitions.concat(models);

                          model.fields[propertyName] = {
                            $model: definitions[definitions.length - 1].name
                          };

                          next();
                        });
                      });
                    }

                    model.fields[propertyName].required = NGN.coalesce(data.required, '').indexOf(propertyName) >= 0;
                  }
                }

                subtasks.on('complete', () => {
                  models.push(model);
                  cont();
                });

                subtasks.run(true);
              });

              tasks.on('complete', () => callback(models));
              tasks.run(true);
            } else {
              callback(models);
            }
          }
        })
      });

      this.once('parsed', () => {
        this.PRIVATE.parsed = true;
        this.METADATA.ID = NGN.coalesce(this.METADATA.schema.id, this.METADATA.schema.$schema);
      });

      // Initialize
      switch (NGN.typeof(schema)) {
        case 'string':
          // If schema is actually a URL, retrieve it.
          this.METADATA.URL = schema;
          this.PRIVATE.NET.json(schema, (err, schema) => {
            if (err) {
              throw err
            }

            this.METADATA.schema = schema;
            this.METADATA.name = NGN.coalesce(schema.name, this.METADATA.URL.split(/\/|\\/).pop().replace('.json', ''));

            this.emit('parsed');
          });

          break

        case 'object':
          this.METADATA.name = NGN.coalesce(schema.name, 'Untitled');
          this.emit('parsed');
          break

        default:
          throw new Error('Invalid schema definition.')
      }
    }

    get id () {
      if (this.METADATA.ID) {
        return this.METADATA.ID
      }

      let id = NGN.coalesce(this.METADATA.URL);

      if (id !== null) {
        return id
      }

      let root;
      /* browser-only */
      root = NGN.coalesce(this.PRIVATE.NET.baseUrl, window.location.origin);
      /* end-browser-only */

      this.METADATA.ID = this.PRIVATE.NET.normalizeUrl(`${root}/${NGN.coalesce(this.name, 'untitled').toLowerCase()}.json`);

      return this.METADATA.ID
    }

    get name () {
      return this.METADATA.name
    }

    set name (value) {
      this.METADATA.name = NGN.coalesce(value, 'Untitled');
    }

    getModelDefinitions (callback) {
      if (!this.PRIVATE.parsed) {
        this.once('parsed', () => {
          this.getModelDefinitions(callback);
        });
      } else if (!this.PRIVATE.MODELS) {
        this.PRIVATE.extractModelDefinitions(this.METADATA.schema, [], definitions => {
          this.PRIVATE.MODELS = definitions;
          callback(definitions);
        });
      } else {
        callback(this.PRIVATE.MODELS);
      }
    }
  }

  /**
   * @class NGN.DATA.TransactionLog
   * The transaction log is a history/changelog. It can be used to revert values
   * to a prior state or (in limited cases) restore values.
   *
   * The transaction log is based on a commit log and cursor. The commit log
   * is an ordered list of values. The cursor is a position within the log.
   *
   * **How it Works:**
   *
   * The most common purpose of a transaction log is to revert changes (undo).
   * This is accomplished with the #rollback method.
   *
   * The #rollback method does not remove records, nor does the #advance.
   * The methods repositions the log cursor. Only #commit activities actually
   * modify the log.
   *
   * For example, a log containing 5 committed records will have the cursor set to
   * the latest entry by default:
   *
   * ```
   * [1, 2, 3, 4, 5]
   *              ^
   * ```
   *
   * Executing rollback(2) moves the cursor "back" two positions, from `5` to
   * `3`.
   *
   * ```
   * [1, 2, 3, 4, 5]
   *        ^
   * ```
   *
   * At this point, no records have been removed. It would still be
   * possible to #advance the cursor forward to `4` or `5`. However; once a
   * #commit is executed, all logs _after_ the cursor are removed before the new
   * transaction is committed to the log.
   *
   * ```
   * [1, 2, 3] // Commit removes [4, 5]
   *        ^
   *
   * [1, 2, 3, 6] // Commit commits new entry and advances cursor.
   *           ^
   * ```
   *
   * It is also possible to immediately #flush the log without requiring a new
   * #commit. This will immediately remove all log entries after the
   * current cursor position.
   */
  class NGNTransactionLog extends EventEmitter { // eslint-disable-line
    /**
     * Create a new transaction log.
     * @param  {number} [maxEntryCount=10]
     * The maximum number of entries to keep in the log. Set this to `-1` to keep
     * an unlimited number of logs.
     */
    constructor (maxEntryCount) {
      super();

      Object.defineProperties(this, {
        METADATA: NGN.private({
          transaction: {},
          changeOrder: [],
          cursor: null,
          max: NGN.coalesce(maxEntryCount, 10)
        })
      });
    }

    get length () {
      return this.METADATA.changeOrder.length
    }

    /**
     * @property {Symbol} cursor
     * The active cursor of the log.
     */
    get cursor () {
      return this.METADATA.cursor
    }

    set cursor (value) {
      if (value !== null && !this.METADATA.transaction.hasOwnProperty(value)) {
        throw new Error('Cannot set cursor for transaction log (does not exist).')
      }

      this.METADATA.cursor = value;
    }

    /**
     * @property {any} currentValue
     * Returns the value at the current cursor position.
     */
    get currentValue () {
      if (this.METADATA.cursor === null) {
        return undefined
      }

      return this.getCommit(this.METADATA.cursor).value
    }

    /**
     * @property {Number}
     * The index of the log entry at the current cursor position.
     */
    get cursorIndex () {
      if (this.METADATA.cursor === null) {
        return undefined
      }

      return this.METADATA.changeOrder.indexOf(this.METADATA.cursor)
    }

    /**
     * Add a new value to the transaction log.
     * @param {Any} value
     * The value to assign to the log (record).
     * @return {Number}
     * Returns the transaction number
     * @fires log {Symbol}
     * Fires a log event with the transaction ID (symbol) for reference.
     */
    commit (value) {
      let id = typeof value === 'symbol' ? Symbol(String(value)) : Symbol(NGN.coalesce(value, NGN.typeof(value)).toString());

      this.METADATA.transaction[id] = [
        new Date(),
        value
      ];

      this.flush();

      this.METADATA.changeOrder.push(id);
      this.METADATA.cursor = id;

      if (this.METADATA.max > 0 && this.METADATA.changeOrder.length > this.METADATA.max) {
        let removedId = this.METADATA.changeOrder.shift();
        delete this.METADATA.transaction[removedId];
      }

      this.emit('commit', id, null);

      return id
    }

    /**
     * Return the entry for the specified commit ID.
     * @param  {Symbol} id
     * The transaction ID.
     * @return {Object}
     * Returns an object with `timestamp` and `value` keys.
     */
    getCommit (id = null) {
      if (!this.METADATA.transaction.hasOwnProperty(id)) {
        return undefined
      }

      return {
        timestamp: this.METADATA.transaction[id][0],
        value: this.METADATA.transaction[id][1]
      }
    }

    /**
     * Remove all transaction log entries from the current cursor onward.
     */
    flush () {
      if (this.METADATA.cursor === null) {
        return
      }

      let position = this.METADATA.changeOrder.indexOf(this.METADATA.cursor);

      // If the whole log is cleared, reset it silently.
      if (position === 0) {
        return
      }

      let removedEntries = this.METADATA.changeOrder.splice(position + 1);

      for (let i = 0; i < removedEntries.length; i++) {
        delete this.METADATA.transaction[removedEntries[i]];
      }

      this.METADATA.cursor = this.METADATA.changeOrder[this.METADATA.changeOrder.length - 1];
    }

    /**
     * Rollback the log to the specified index/cursor.
     * @param  {Number|Symbol} [index=1]
     * The index may be a number or a commit ID (symbol).
     *
     * **Specifying a number** will rollback the log by the specified number of
     * commits. By default, the index is `1`, which is the equivalent of a simple
     * "undo" operation. Specifying `2` would "undo" two operations. Values less
     * than or equal to zero are ignored. Values greater than the total number of
     * committed transactions trigger a reset.
     *
     * **Specifying a symbol** will rollback the log to the specified commit log
     * (the symbol is the commit log ID).
     * @fires rollback {Object}
     * This fires a `rollback` event containing the active cursor.
     * @return {Symbol}
     * Returns the active cursor upon completion of rollback.
     */
    rollback (index = 1) {
      // If the log is empty, ignore the rollback
      if (this.METADATA.changeOrder.length === 0) {
        return null
      }

      if (typeof index === 'symbol') {
        this.cursor = index;
        return index
      }

      if (index >= this.METADATA.changeOrder.length) {
        this.METADATA.cursor = this.METADATA.changeOrder[0];
      } else {
        // Make sure the index is a symbol
        if (typeof index === 'number') {
          if (index <= 0) {
            return this.METADATA.cursor
          }

          let currentPosition = this.METADATA.changeOrder.indexOf(this.METADATA.cursor);
          currentPosition -= index;

          if (currentPosition <= 0) {
            currentPosition = 0;
          }

          index = this.METADATA.changeOrder[currentPosition];
        }

        this.METADATA.cursor = index;
      }

      this.emit('rollback', this.METADATA.cursor, null);

      return this.METADATA.cursor
    }

    /**
     * Advance the log to the specified index/cursor.
     * @param  {Number|Symbol} [index=1]
     * The index may be a number or a commit ID (symbol).
     *
     * **Specifying a number** will advance the log by the specified number of
     * commits. By default, the index is `1`, which is the equivalent of a simple
     * "redo" operation. Specifying `2` would "redo" two operations. Values less
     * than or equal to zero are ignored. Values greater than the total number of
     * committed transactions will advance the cursor to the last entry.
     *
     * **Specifying a symbol** will advance the log to the specified commit log
     * record (the symbol is the commit log ID).
     * @fires advance {Object}
     * This fires a `advance` event containing the active cursor.
     * @return {Symbol}
     * Returns the active cursor upon completion of rollback.
     */
    advance (index = 1) {
      // If the log is empty, ignore the rollback
      if (this.METADATA.changeOrder.length === 0) {
        return null
      }

      // Make sure the index is a symbol
      if (typeof index === 'number') {
        if (index <= 0) {
          return this.METADATA.cursor
        }

        let currentPosition = this.METADATA.changeOrder.indexOf(this.METADATA.cursor);
        currentPosition += index;

        if (currentPosition >= this.METADATA.changeOrder.length) {
          currentPosition = this.METADATA.changeOrder.length - 1;
        }

        index = this.METADATA.changeOrder[currentPosition];
      }

      this.METADATA.cursor = index;

      this.emit('advance', this.METADATA.cursor, null);

      return this.METADATA.cursor
    }

    /**
     * Clear the transaction log.
     */
    reset (suppressEvents = false) {
      this.METADATA.transaction = {};
      this.METADATA.changeOrder = [];
      this.METADATA.cursor = null;

      if (!suppressEvents) {
        this.emit('reset');
      }
    }

    /**
     * @property {Array} log
     * Returns the entire log, in ascending historical order (oldest first).
     * This may be a time-consuming operation if the log is large.
     *
     * **Example:**
     *
     * ```js
     * [{
     *   timestamp: Date,
     *   value: 'some value'
     * },{
     *   timestamp: Date,
     *   value: 'some other value'
     * }]
     */
    get log () {
      return this.METADATA.changeOrder.map(entry => {
        return {
          timestamp: this.METADATA.transaction[entry][0],
          value: this.METADATA.transaction[entry][1],
          activeCursor: this.METADATA.cursor === entry
        }
      })
    }
  }

  /**
    * @class NGN.DATA.Rule
    * A data validation rule.
    * @fires validator.add
    */
  class NGNDataValidationRule { // eslint-disable-line
    /**
     * Create a new data rule.
     * @param {Function/String[]/Number[]/Date[]/RegExp/Array} rule
     * * When rule is a _function_, the value is passed to it as an argument.
     * * When rule is a _String_, the value is compared for an exact match (case sensitive)
     * * When rule is a _Number_, the value is compared for equality.
     * * When rule is a _Date_, the value is compared for exact equality.
     * * When rule is a _RegExp_, the value is tested and the results of the RegExp#test are used to validate.
     * * When rule is an _Array_, the value is checked to exist in the array, regardless of data type. This is treated as an `enum`.
     * * When rule is _an array of dates_, the value is compared to each date for equality.
     * @param {string} [name]
     * An optional name for the rule. This can be useful when debugging data issues.
     * @param {object} [scope]
     * Apply a custom scope to the validation functions (applicable to custom methods only).
     */
    constructor (validation, name = null, scope = null) {
      const type = NGN.typeof(validation);

      Object.defineProperties(this, {
        RULE: NGN.private({
          type: type,
          validator: validation,
          name: NGN.coalesce(name, `Untitled ${type.toUpperCase()} Validation`),
          scope: NGN.coalesce(scope, this)
        })
      });
    }

    get name () {
      return this.RULE.name
    }

    get type () {
      return this.RULE.type
    }

    /**
     * @method test
     * Test a value against the validation rule.
     * @param {any} value
     * The value to test.
     * @returns {boolean}
     * Returns `true` when the value meets the rule expectations and `false` when it does not.
     */
    test (value) {
      if (NGN.isFn(this.RULE.validator)) {
        // Custom enforcement function
        return this.RULE.validator.apply(this.RULE.scope, [value])
      } else {
        switch (this.type) {
          // Enumeration
          case 'array':
            return this.RULE.validator.indexOf(value) !== -1

          // Pattern Matching
          case 'regexp':
            return this.RULE.validator.test(value)

          default:
            return this.RULE.validator === value
        }
      }
    }
  }

  /**
   * @class NGN.DATA.RangeRule
   * A special rule to validate values within one or more ranges.
   * Supports numeric ranges, date ranges, and simple string-based
   * ranges (string length).
   */
  class NGNDataRangeValidationRule extends NGNDataValidationRule { // eslint-disable-line
    /**
     * Create a new range rule.
     * @param {string} [name]
     * An optional name for the rule. This can be useful when debugging data issues.
     * @param {object} [scope=null]
     * Apply a custom scope to the validation functions (applicable to custom methods only).
     * @param {Array} [range]
     * An enumeration of acceptable numeric ranges. For example, if
     * the value must be between 5-10 or from 25-50, the configuration
     * would look like:
     *
     * ```js
     * range: [
     *   [5, 10],
     *   ['25-50']
     * ]
     * ```
     *
     * To accept anything below a certain number or anything over a certain
     * number while also specifying one or more ranges, use a `null` value.
     *
     * For example:
     *
     * ```js
     * range: [
     *   [null, 0],
     *   [5, 10],
     *   ['25-50'],
     *   [100, null]
     * ]
     * ```
     *
     * The aforementioned example would accept a value less than `zero`,
     * between `5` and `10`, between `25` and `50`, or over `100`. Therefore,
     * acceptable values could be `-7`, `7`, `25`, `42`,  `10000`, or anything
     * else within the ranges. However, the values `3`, `19`, and `62` would
     * all fail because they're outside the ranges.
     */
    constructor (name, scope, range = []) {
      if (NGN.typeof(scope) === 'array') {
        range = scope;
        scope = null;
      }

      super(null, name, scope);

      this.RULE.prepareRange = function (value) {
        // If a simple range is specified (single array), format it for the rule processor.
        value = NGN.forceArray(value);

        if (NGN.typeof(value[0]) !== 'array') {
          value = [value];
        }

        for (let i = 0; i < value.length; i++) {
          if (value[i].length !== 2) {
            if (NGN.typeof(value[i][0]) !== 'string') {
              throw new Error(`Invalid range: "${value[i].toString()}"`)
            }

            value[i] = value[i][0].replace(/[^0-9->]/gi, '').split(/->{1,100}/);
          }

          if (NGN.typeof(value[i][0]) !== 'number') {
            value[i][0] = NGN.coalesce(value[i][0], '').replace(/null|none|any/gi, '');
          }

          if (NGN.typeof(value[i][1]) !== 'number') {
            value[i][1] = NGN.coalesce(value[i][1], '').replace(/null|none|any/gi, '');
          }
        }

        return value
      };

      // Initialize the range
      this.RULE.range = new Set();
      this.range = range;

      // Create the validation function.
      this.RULE.validator = (value) => {
        let isString = NGN.typeof(value) === 'string';
        let range = this.range;

        for (let i = 0; i < range.length; i++) {
          let min = NGN.coalesceb(range[i][0], isString ? value.length : value);
          let max = NGN.coalesceb(range[i][1], isString ? value.length : value);

          if (
            (isString && value.length >= min && value.length <= max) ||
            (!isString && value >= min && value <= max)
          ) {
            return true
          }
        }

        return false
      };
    }

    get range () {
      return Array.from(this.RULE.range.values())
    }

    set range (value) {
      this.RULE.range = new Set();
      this.addRange(value);
    }

    /**
     * Add a range to the rule.
     * @param {array} value
     * A range can be a single array, such as `[min, max]`. An array of arrays is
     * also acceptable, such as `[[min1, max1], [min2, max2]]`.
     */
    addRange (value) {
      value = this.RULE.prepareRange(value);

      for (let i = 0; i < value.length; i++) {
        if (NGN.coalesceb(value[i][0]) !== null && NGN.coalesceb(value[i][1]) !== null && value[i][1] < value[i][0]) {
          throw new Error(`Invalid value "${value[i][0].toString()} -> ${value[i][1].toString()}". Minimum value cannot exceed maximum.`)
        }

        this.RULE.range.add(value[i]);
      }
    }

    /**
     * Remove an existing range from the rule.
     * @param {array} value
     * A range can be a single array, such as `[min, max]`. An array of arrays is
     * also acceptable, such as `[[min1, max1], [min2, max2]]`.
     */
    removeRange (value) {
      let range = this.range;
      value = this.RULE.prepareRange(value);

      for (let i = 0; i < value.length; i++) {
        for (let x = 0; x < range.length; x++) {
          if (value[i].toString() === range[x].toString()) {
            this.RULE.range.delete(range[x]);
          }
        }
      }
    }
  }

  /**
   * @class NGN.DATA.Field
   * Represents a data field to be used in a model/record.
   * @fires hidden
   * Triggered when the field changes from unhidden to hidden.
   * @fires unhidden
   * Triggered when the field changes from hidden to unhidden.
   * @fires update {object}
   * Triggered when the field value is updated. The payload contains
   * an object with old and new values:
   *
   * ```js
   * {
   *   old: 'old value',
   *   new: 'new value'
   * }
   * ```
   * @fires invalid
   * Triggered when a previously valid value becomes invalid.
   * @fires valid
   * Triggered when a previously invalid value becomes valid.
   * @fires rule.add {NGN.DATA.Rule}
   * Triggered when a new validation rule is added. The rule is emitted
   * to event handlers.
   * @fires rule.remove {NGN.DATA.Rule}
   * Triggered when a validation rule is removed. The rule is emitted
   * to event handlers.
   * @fires keystatus.changed {boolean}
   * Triggered when the key (identifier) status changes. The boolean
   * payload indicates whether the field is considered an identifier.
   */
  class NGNDataField extends EventEmitter { // eslint-disable-line
    /**
     * @param {string|object} configuration
     * Accepts an object with all configuration objects, or a string representing
     * the name of the field.
     */
    constructor (cfg) {
      cfg = cfg || {};

      if (typeof cfg === 'string') {
        cfg = {
          name: cfg
        };
      }

      // Validate field configuration values
      if (cfg.hasOwnProperty('pattern') && NGN.typeof(cfg.pattern) !== 'regexp') {
        throw new Error('Invalid data field configuration. Pattern must be a valid JavaScript regular expression (RegExp).')
      }

      if (cfg.type === undefined) {
        if (cfg.default) {
          cfg.type = NGN.getType(NGN.typeof(cfg.default), String);
        }
      }

      super(cfg);

      const EMPTYDATA = Symbol('empty');

      Object.defineProperties(this, {
        METADATA: NGN.privateconst({
          /**
           * @cfg {boolean} [required=false]
           * Indicates the value is required.
           */
          required: NGN.coalesce(cfg.required, false),

          /**
           * @cfgproperty {boolean} [hidden=false]
           * Indicates the field is hidden (metadata).
           */
          hidden: NGN.coalesce(cfg.hidden, false),

          // Identifies the property as a standard data attribute.
          // Alternative options include `data`, `key`, `join`, `virtual`.
          fieldType: NGN.coalesce(cfg.identifier, false) ? 'key' : 'data',

          isIdentifier: NGN.coalesce(cfg.identifier, false),

          /**
           * @cfg {boolean} [autocorrectInput=true]
           * Attempt to automatically correct data type values. For example,
           * a numeric field receiving a value of `'10'` will automatically
           * convert the input to `10`. Only arrays, numbers, and booleans are
           * supported. See NGN#forceArray, NGN#forceBoolean, and NGN#forceNumber
           * for details.
           */
          autocorrectInput: NGN.coalesce(cfg.autocorrectInput, false),

          /**
           * @cfg {RegExp} [pattern]
           * A pattern, as defined by a standard RegExp, that the data must match.
           */
          pattern: NGN.coalesceb(cfg.pattern),

          /**
           * @cfgproperty {string} name
           * The field name.
           */
          name: NGN.coalesce(cfg.name),

          /**
           * @cfgproperty {string} description
           * This is a metadata field, primarily used for documentation
           * or schema generation purposes.
           */
          description: NGN.coalesce(cfg.description, `${NGN.typeof(cfg.type)} field`),

          /**
           * @cfgproperty {string} [sourceName]
           * A source name represents the physical name of an attribute as it
           * would be recognized in a system of record. For example, a field
           * named `firstname` may need to be written to disk/memory as `gn`
           * (commonly used as shorthand for givenName in LDAP environments
           * and relational databases).
           *
           * By specifying `firstname` as the field name and `gn` as the source
           * name, the field will automatically map values from the source
           * to model name and vice versa.
           *
           * For instance, a JSON input may look like:
           *
           * ```js
           * {
           *   "gn": "John",
           *   "sn": "Doe"
           * }
           * ```
           *
           * When this data is applied to the field (or loaded in a
           * NGN.DATA.Model), the field #value for `firstname` would be `John`.
           * If the field #value is changed to `Jill` (i.e.
           * `firstname.value = 'Jill'`), the resulting data set would look like:
           *
           * ```js
           * {
           *   "gn": "Jill",
           *   "sn": "Doe"
           * }
           * ```
           */
          sourceName: NGN.coalesce(cfg.sourceName),

          /**
           * @cfg {any} default
           * The default value of the field when no value is specified.
           */
          default: NGN.coalesce(cfg.default),

          lastValue: Symbol('no.value'),

          /**
           * @cfg {Primitive} [type=String]
           * The JS primitive representing the type of data represented
           * by the field.
           */
          dataType: NGN.coalesce(cfg.type, String),

          /**
           * @cfg {function} [rule[]]
           * A function, or an array of functions, which determine whether the
           * field value is valid or not. These functions receive a single argument
           * (the data value) and must return a Boolean value.
           */
          rules: NGN.coalesce(cfg.rule, cfg.rules, cfg.validators, []),
          violatedRule: null,

          /**
           * @cfg {boolean} [allowInvalid=true]
           * If this is set to `false`, invalid values will throw an error.
           */
          allowInvalid: NGN.coalesce(cfg.allowInvalid, true),

          /**
           * @cfg {function} transformer
           * A synchronous transformation function will be applied each time
           * the field value is set. This can be used to modify data _before_ it
           * is stored as a field value. The returned value from the function
           * will be the new value of the field.
           *
           * The transformation function will receive the input as it's only
           * aregument. For example:
           *
           * ```js
           * let field = new NGN.DATA.Field({
           *   name: 'testfield',
           *   transformer: function (input) {
           *     return input + '_test'
           *   }
           * })
           *
           * field.value = 'a'
           *
           * console.log(field.value) // Outputs "a_test"
           * ```
           *
           * **Transformations can affect performance.** In small data sets,
           * transformations are typically negligible, only adding a few
           * milliseconds to processing time. This may affect large data sets,
           * particularly data stores using defauly bulk recod loading.
           */
          TRANSFORM: NGN.coalesce(cfg.transformer),

          RAWDATAPLACEHOLDER: EMPTYDATA,
          RAW: EMPTYDATA,
          ENUMERABLE_VALUES: null,
          REVERSE_ENUMERABLE_VALUES: null,
          IS_NEW: true,

          EVENTS: new Set([
            'hidden',
            'unhidden',
            'update',
            'invalid',
            'valid',
            'rule.add',
            'rule.remove'
          ]),

          /**
           * @cfg {boolean} [audit=false]
           * Enable auditing to support #undo/#redo operations. This creates and
           * manages a NGN.DATA.TransactionLog.
           */
          AUDITABLE: NGN.coalesce(cfg.audit, false),

          /**
           * @cfg {Number} [auditMaxEntries=20]
           * The maximum number of historical records to maintain for the field.
           * See NGN.DATA.TransactionLog#constructor for details.
           */
          AUDITLOG: NGN.coalesce(cfg.audit, false)
            ? new NGN.DATA.TransactionLog(NGN.coalesce(cfg.auditMaxEntries, 10))
            : null,

          /**
           * @cfg {NGN.DATA.Model} [model]
           * Optionally specify the parent model.
           */
          model: null,

          // Set the value using a configuration.
          setValue: (value, suppressEvents = false, ignoreAudit = false) => {
            // Preprocessing (transform input)
            if (this.METADATA.TRANSFORM !== null && NGN.isFn(this.METADATA.TRANSFORM)) {
              value = this.METADATA.TRANSFORM.call(this, value);
            }

            // Attempt to auto-correct input when possible.
            if (this.METADATA.autocorrectInput && this.type !== NGN.typeof(value)) {
              value = this.autoCorrectValue(value);
            }

            // Ignore changes when the value hasn't been modified.
            if (value === this.value) {
              return
            }

            let change = {
              field: this,
              old: typeof this.METADATA.RAW === 'symbol' ? undefined : this.METADATA.RAW,
              new: value
            };

            let priorValueIsValid = this.valid;

            this.METADATA.RAW = value;

            // Notify when an invalid value is detected.
            if (!this.valid) {
              // If invalid values are explicitly prohibited, throw an error.
              // The value is rolled back before throwing the error so developers may
              // catch the error and continue processing.
              if (!this.METADATA.allowInvalid) {
                this.METADATA.RAW = change.old;
                throw new Error(`"${value}" did not pass the ${this.METADATA.violatedRule} rule.`)
              } else {
                change.reason = `"${value}" did not pass the ${this.METADATA.violatedRule} rule.`;
                NGN.WARN(change.reason);
              }

              this.emit('invalid', change);
            } else if (!suppressEvents && priorValueIsValid !== null && priorValueIsValid) {
              // If the field BECAME valid (compared to prior value),
              // emit an event.
              this.emit('valid', change);
            }

            if (typeof this.METADATA.lastValue === 'symbol') {
              this.METADATA.lastValue = value;
            }

            // If auditing is enabled and not explicitly ignored by an internal
            // operation, commit the change.
            if (!ignoreAudit && !this.virtual && this.METADATA.AUDITABLE) {
              change.cursor = this.METADATA.AUDITLOG.commit(this.METADATA.RAW);
            }

            // Notify when the update is complete.
            if (!suppressEvents) {
              this.emit('update', change);
            }

            // Mark unnecessary code for garbage collection.
            priorValueIsValid = null;
            change = null;
          },

          // Submit the payload to the parent model (if applicable).
          commitPayload: (payload) => {
            if (this.METADATA.model) {
              payload.action = 'update';
              payload.join = true;

              this.increaseMaxListeners(3);
              this.METADATA.model.emit(
                [
                  'update',
                  `${payload.field}.update`,
                  `update.${payload.field}`
                ],
                payload
              );

              payload = null; // Mark for garbage collection
            }
          }
        })
      });

      // Apply common rules
      if (NGN.typeof(this.METADATA.rules) !== 'array') {
        this.METADATA.rules = NGN.forceArray(this.METADATA.rules);
      }

      if (this.METADATA.rules.length > 0) {
        for (let i = 0; i < this.METADATA.rules.length; i++) {
          if (NGN.isFn(this.METADATA.rules[i]) && !(this.METADATA.rules[i] instanceof NGN.DATA.Rule)) {
            this.METADATA.rules[i] = new NGN.DATA.Rule(this.METADATA.rules[i], `Custom Rule #${i + 1}`);
          }
        }
      }

      // Apply pattern validation if specified.
      if (this.METADATA.dataType === String) {
        if (this.METADATA.pattern !== null) {
          this.METADATA.rules.unshift(new NGN.DATA.Rule(cfg.pattern, `Pattern Match (${cfg.pattern.toString()})`));
        }

        /**
         * @cfg {Boolean} [nonempty]
         * @info This validation attribute applies to #String fields only.
         * Validates a value is not blank, `null`, or `undefined`.
         */
        if (cfg.nonempty) {
          this.METADATA.rules.unshift(new NGN.DATA.Rule(value => {
            return value.trim().length > 0
          }, `No Blanks (${cfg.pattern.toString()})`));
        }
      }

      /**
       * @cfg {Number} [min]
       * @info This validation attribute applies to #Array, #String, and #Number fields only.
       * Specify a minimum value:
       *
       * - For string values, this is a minimum number of characters.
       * - For numeric values, this is a minimum inclusive value (i.e. value must be greater than
       * or equal to the minimum).
       * - For arrays, this is a minimum number of items that must exist in the array.
       */
      /**
       * @cfg {Number} [max]
       * @info This validation attribute applies to #Array, #String, and #Number fields only.
       * Specify a maximum value:
       *
       * - For string values, this is a maximum number of characters.
       * - For numeric values, this is a maximum inclusive value (i.e. value must be less than
       * or equal to the maximum).
       * - For arrays, this is a maximum number of items that may exist in the array.
       */

      // Apply number-specific validations.
      if (this.METADATA.dataType === Number || this.METADATA.dataType === Date || this.METADATA.dataType === String) {
        // Support minimum/maximum range
        if (NGN.objectHasAny(cfg, 'min', 'minimum', 'max', 'maximum')) {
          cfg.range = NGN.forceArray(NGN.coalesce(cfg.range));
          cfg.range.push([NGN.coalesce(cfg.min, cfg.minimum), NGN.coalesce(cfg.max, cfg.maximum)]);
        }

        /**
         * @cfg {Number} [range]
         * @info This validation attribute applies to #String and #Number fields only.
         * Specify a range of acceptable values:
         *
         * - For numbers, this implies inclusive ranges. For example, `1-10` means "between 1 and 10, where both 1 and 10 are valid."
         * - For strings, this implies inclusive ranges just like numbers, where the number is the character count.
         */
        if (cfg.hasOwnProperty('range')) {
          this.METADATA.rules.unshift(new NGN.DATA.RangeRule('Numeric Range', cfg.range));
        }

        if (this.METADATA.dataType === Number) {
          // Support numeric patterns (i.e. support for integers)
          if (NGN.coalesce(cfg.pattern)) {
            this.METADATA.rules.unshift(new NGN.DATA.Rule(value => {
              return cfg.pattern.test(value.toString())
            }, `Numeric Pattern (${cfg.pattern.toString().substr(0, 15) + (cfg.pattern.toString().length > 15 ? '...' : '')})`));
          }

          /**
           * @cfg {Number} [multipleOf]
           * @info This validation attribute applies to #Number fields only.
           * Insures the field value is a multiple of this number. For example,
           * if the multiple is `10` and the value is `100`, it is valid.
           * If the multiple is `10` and the value is `101`, it is invalid.
           */
          if (NGN.typeof(cfg.multipleOf) === 'number') {
            this.METADATA.rules.unshift(new NGN.DATA.Rule(value => {
              return Math.abs(value % cfg.multipleOf) === 0
            }, `Numeric Multiple of ${cfg.multipleOf}`));
          }
        }
      }

      // Apply array-specific native validations
      if (this.METADATA.dataType === Array) {
        // Enforce minimum number of array items
        if (NGN.objectHasAny(cfg, 'min', 'minimum')) {
          this.METADATA.rules.push(new NGN.DATA.Rule(value => value.length >= NGN.coalesce(cfg.min, cfg.minimum), `${NGN.coalesce(cfg.min, cfg.minimum)} count minimum`));
        }

        // Enforce maximum number of array items
        if (NGN.objectHasAny(cfg, 'max', 'maximum')) {
          this.METADATA.rules.push(new NGN.DATA.Rule(value => value.length <= NGN.coalesce(cfg.max, cfg.maximum), `${NGN.coalesce(cfg.max, cfg.maximum)} count maximum`));
        }

        /**
         * @cfg {Array} [unique]
         * @info This validation attribute applies to #Array fields only.
         * @warning This is a computationally expensive validation when used in NGN Data Stores.
         * Validates that all items are unique.
         */
        if (NGN.coalesce(cfg.unique, false)) {
          this.METADATA.rules.push(new NGN.DATA.Rule(value => NGN.dedupe(value).length === value.length, 'Unique value constraint'));
        }

        /**
         * @cfg {any} [listType]
         * @info This validation attribute applies to #Array fields only.
         * Require each element of the array to conform to the specified data
         * type. For example, setting `listType: Number` will validate that
         * each element of the array is a number.
         *
         * ```js
         * [1, 2, 3, 4, 5] // Valid
         * [1, 2, 'three', 4, 5] // Invalid
         * ```
         */
        if (cfg.hasOwnProperty('listType')) {
          this.METADATA.rules.push(new NGN.DATA.Rule(value => {
            for (let i = 0; i < value.length; i++) {
              if (NGN.typeof(value[i]) !== NGN.typeof(cfg.listType)) {
                return false
              }
            }

            return true
          }, `${NGN.typeof(cfg.listType).toUpperCase()} list type constraint`));
        }

        // Support enumerations in array values
        if (cfg.hasOwnProperty('enum')) {
          this.METADATA.rules.push(new NGN.DATA.Rule(value => {
            return cfg.enum.indexOf(value) >= 0
          }));
        }

        /**
         * @cfg {Array} [tuples]
         * @info This validation attribute applies to #Array fields only.
         * @warning This is a computationally expensive validation when used in NGN Data Stores.
         * Validate each item of an array according to a unique schema.
         * Each item is a key value object, which supports only the `type` and
         * `enum` validations.
         *
         * For example:
         *
         * ```js
         * {
         *   tuples: [{
         *     type: Number
         *   }, {
         *     type: String,
         *     enum: ['a', 'b', 'c']
         *   }, {
         *     enum: ['d', 1]
         *   }]
         * }
         * ```
         * The configuration above will make sure the first array item is a number,
         * while the second is either `a`, `b`, or `c`, and the third is either
         * the letter `d` or the number `1`. Only the first three items of the
         * array will be checked, but there must be at least 3 items.
         */
        if (cfg.hasOwnProperty('tuples')) {
          this.METADATA.rules.push(new NGN.DATA.Rule(value => {
            if (value.length < cfg.tuples.length) {
              return false
            }

            for (let i = 0; i < cfg.tuples.length; i++) {
              if (cfg.tuples[i].hasOwnProperty('type')) {
                if (NGN.typeof(value[i]) !== NGN.typeof(cfg.tuples[i].type)) {
                  return false
                }
              }

              if (cfg.tuples[i].hasOwnProperty('enum')) {
                if (cfg.tuples[i].enum.indexOf(value[i]) < 0) {
                  return false
                }
              }
            }

            return true
          }, 'Tuple constraint'));
        }
      }

      /**
       * @cfg {Array} [enum]
       * An enumeration of available values this field is allowed to have.
       */
      if (NGN.objectHasAny(cfg, 'enum', 'enumeration')) {
        this.METADATA.ENUMERABLE_VALUES = new Set(NGN.forceArray(NGN.coalesce(cfg.enum, cfg.enumeration)));
        this.METADATA.rules.push(new NGN.DATA.Rule((value) => this.METADATA.ENUMERABLE_VALUES.has(value), 'Enumerable Values'));
      }

      /**
       * @cfg {Array} [not]
       * A "reverse" enumeration, i.e. a list of values this field is **not** allowed to be.
       */
      if (NGN.objectHasAny(cfg, 'not', 'notin')) {
        this.METADATA.REVERSE_ENUMERABLE_VALUES = new Set(NGN.forceArray(NGN.coalesce(cfg.not, cfg.notin)));
        this.METADATA.rules.push(new NGN.DATA.Rule((value) => !this.METADATA.REVERSE_ENUMERABLE_VALUES.has(value), 'Rejected Values'));
      }

      // Check if the field type is an array, which indicates multiple
      // data types are considered valid.
      if (cfg.type instanceof Array) {
        // If the array has no values, assume the user meant to create an "Array" data type.
        // Warn them, in case this was not the intention.
        if (cfg.type.length === 0) {
          NGN.WARN(`No data type specified for ${this.name} field. Autoconverted to an array.`);
          cfg.type = Array;
        } else if (cfg.type.length === 1) {
          // If there is only one data type, the array is extraneous and standard
          // datatype validation can be used.
          cfg.type = cfg.type[0];
        }
      }

      /**
       * @cfg {Primitive|Array} [type=String]
       * The type should be a JavaScript primitive, class, or constructor.
       * For example, `String`, `Number`, `Boolean`, `RegExp`, `Array`, or `Date`.
       * This can also be an array of primitive values. For example, `[String, Number]`
       * indicates the field could be a string or a numeric value.
       */
      if (cfg.type instanceof Array) {
        let typeList = cfg.type.map(type => NGN.typeof(type));

        this.METADATA.rules.unshift(
          new NGN.DATA.Rule(
            (value) => typeList.indexOf(NGN.typeof(value)) >= 0,
            `${this.type.toUpperCase()} Multitype Check`
          )
        );
      } else {
        this.METADATA.rules.unshift(
          new NGN.DATA.Rule(
            (value) => NGN.typeof(value) === NGN.typeof(this.METADATA.dataType),
            `${this.type.toUpperCase()} Type Check`
          )
        );
      }

      // Associate a model if one is defined.
      if (NGN.coalesce(cfg.model) !== null) {
        this.model = cfg.model;
      }
    }

    get sourceName () {
      return this.METADATA.sourceName
    }

    get auditable () {
      return this.METADATA.AUDITABLE
    }

    set auditable (value) {
      value = NGN.forceBoolean(value);

      if (value !== this.METADATA.AUDITABLE) {
        this.METADATA.AUDITABLE = value;
        this.METADATA.AUDITLOG = value ? new NGN.DATA.TransactionLog() : null;
        this.METADATA.AUDITLOG.relay('*', this, 'transaction.');
      }
    }

    /**
     * @property {NGN.DATA.Model} model
     * Represents the model/record the field is associated to.
     * The model may be configured once, after which this property
     * becomes read-only. This will also be read-only if #model is set
     * to a valid value.
     */
    get model () {
      return this.METADATA.model
    }

    set model (value) {
      if (this.METADATA.model === null) {
        if (value instanceof NGN.DATA.Entity) {
          this.METADATA.model = value;

          // let events = Array.from(this.METADATA.EVENTS.values())
          // events.splice(events.indexOf('update'), 1)
          //
          this.on('update', (payload) => this.METADATA.commitPayload(payload));
          //
          // for (let i = 0; i < events.length; i++) {
          //   this.on(events[i], () => this.METADATA.model.emit(`field.${events[i]}`, ...arguments))
          // }
        } else {
          NGN.WARN('Invalid model.');
        }
      } else {
        NGN.WARN('Cannot set model multiple times.');
      }
    }

    /**
     * @property {string} fieldType
     * The type of field.
     */
    get fieldType () {
      return this.METADATA.fieldType
    }

    /**
     * @property {boolean} required
     * Indicates the field must have a non-null value.
     */
    get required () {
      return this.METADATA.required
    }

    set required (value) {
      this.METADATA.required = NGN.forceBoolean(value);
    }

    /**
     * @property {string} type
     * The type of data in string format.
     */
    get type () {
      return NGN.typeof(this.METADATA.dataType)
    }

    /**
     * @property {boolean} hidden
     * Indicates the field should be considered hidden.
     */
    get hidden () {
      return this.METADATA.hidden
    }

    set hidden (value) {
      let originallyHidden = this.hidden;
      let currentlyHidden = NGN.forceBoolean(value);

      if (originallyHidden !== currentlyHidden) {
        this.METADATA.hidden = currentlyHidden;
        this.emit(originallyHidden ? 'unhidden' : 'hidden');
      }
    }

    /**
     * @property {boolean} virtual
     * Indicates the field should be considered virtual.
     */
    get virtual () {
      return this.METADATA.fieldType === 'virtual'
    }

    /**
     * @property {boolean} identifier
     * Indicates the field is considered an identifier.
     */
    get identifier () {
      return this.METADATA.isIdentifier
    }

    set identifier (value) {
      value = NGN.forceBoolean(value);

      if (value !== this.METADATA.isIdentifier) {
        this.METADATA.isIdentifier = value;
        this.emit('keystatus.changed', this);
      }
    }

    get name () {
      return this.METADATA.name
    }

    /**
     * @property {Boolean}
     * Indicates the model is new or does not exist according to the persistence store.
     * @private
     * @readonly
     */
    get isNew () {
      return this.METADATA.IS_NEW
    }

    /**
     * @property {Any} default
     * The default field value.
     */
    get default () {
      if (this.isIdentifier) {
        return NGN.coalesce(this.METADATA.autoid, this.METADATA.default)
      }

      if (NGN.isFn(this.METADATA.default) && this.type !== 'function') {
        return this.METADATA.default.apply(this)
      }

      return this.METADATA.default
    }

    /**
     * @property {Any} value
     * The value of the field.
     */
    get value () {
      if (typeof this.METADATA.RAW !== 'symbol') {
        return this.METADATA.RAW
      }

      return this.METADATA.default
    }

    set value (value) {
      this.METADATA.setValue(value);
    }

    /**
     * @property silentValue
     * A write-only attribute to set the value without triggering an update event.
     * This is designed primarily for use with live update proxies to prevent
     * endless event loops.
     * @param {any} value
     * The new value of the field.
     * @private
     * @writeonly
     */
    set silentValue (value) {
      this.METADATA.setValue(value, true);
    }

    get modified () {
      if (typeof this.META.lastValue === 'symbol') {
        return false
      }

      return this.METADATA.lastValue !== this.value
    }

    /**
     * @property {boolean} valid
     * Indicates the field value is valid.
     */
    get valid () {
      if (this.required && NGN.coalesce(this.METADATA.RAW) === null) {
        this.METADATA.violatedRule = 'Data Required';
        NGN.WARN(`${this.METADATA.name} is a required field.`);
        return false
      }

      if (this.METADATA.rules.length > 0) {
        for (let rule = 0; rule < this.METADATA.rules.length; rule++) {
          if (!this.METADATA.rules[rule].test(this.METADATA.RAW)) {
            this.METADATA.violatedRule = this.METADATA.rules[rule].name;
            return false
          }
        }
      }

      this.METADATA.violatedRule = null;

      return true
    }

    /**
     * @property {String}
     * Name of the rule which was violated.
     */
    get violatedRule () {
      return NGN.coalesce(this.METADATA.violatedRule, 'None')
    }

    /**
     * @property {Array} changelog
     * The changelog returns the underlying NGN.DATA.TransactionLog#log if
     * auditing is available. The array will be empty if auditing is disabled.
     */
    get changelog () {
      if (!this.METADATA.AUDITABLE) {
        NGN.WARN(`The changelog for the ${this.name} field is empty because auditing is disabled.`);
        return []
      }

      return this.METADATA.AUDITLOG.log
    }

    /**
     * @method undo
     * A rollback function to undo changes. This operation affects
     * the changelog (transaction log). To "undo" an "undo", use #redo.
     * @param {number} [OperationCount=1]
     * The number of operations to "undo". Defaults to a single operation.
     * @param {boolean} [suppressEvents=false]
     * Set to `true` to quietly update the value (prevents `update` event from
     * firing).
     */
    undo (count = 1, suppressEvents = false) {
      if (!this.METADATA.AUDITABLE) {
        NGN.WARN(`The undo operation failed on the ${this.name} field because auditing is disabled.`);
        return
      }

      let id = this.METADATA.AUDITLOG.rollback(count);

      // Silently set the value to an older value.
      this.METADATA.setValue(this.METADATA.AUDITLOG.getCommit(id).value, suppressEvents, true);
    }

    /**
     * @method redo
     * A function to reapply known changes. This operation affects
     * the changelog (transaction log).
     *
     * The redo operation only works after an undo operation, but before a new
     * value is committed to the transaction log. In other words, `undo -> redo`
     * will work, but `undo -> update -> redo` will not. For details, see how
     * the NGN.DATA.TransactionLog cursor system works.
     * @param {number} [OperationCount=1]
     * The number of operations to "undo". Defaults to a single operation.
     * @param {boolean} [suppressEvents=false]
     * Set to `true` to quietly update the value (prevents `update` event from
     * firing).
     */
    redo (count = 1, suppressEvents = false) {
      if (!this.METADATA.AUDITABLE) {
        NGN.WARN(`The redo operation failed on the ${this.name} field because auditing is disabled.`);
        return
      }

      let id = this.METADATA.AUDITLOG.advance(count);

      // Silently set the value to a newer value.
      this.METADATA.setValue(this.METADATA.AUDITLOG.getCommit(id).value, suppressEvents, true);
    }

    /**
     * Hide the field.
     */
    hide () {
      this.hidden = true;
    }

    /**
     * Unhide the field.
     */
    unhide () {
      this.hidden = false;
    }

    /**
     * Do not throw errors whan a value is marked as invalid.
     */
    allowInvalid () {
      this.METADATA.allowInvalid = true;
    }

    /**
     * Throw errors whan a value is marked as invalid.
     */
    disallowInvalid () {
      this.METADATA.allowInvalid = false;
    }

    /**
     * Attempt to automatically correct a value according to the
     * field's data type.
     * @param  {Any} value
     * The value to attempt to autocorrect.
     * @return {Any}
     * Returns the value after attempting to autocorrect the value.
     */
    autoCorrectValue (value) {
      try {
        switch (this.type) {
          case 'number':
            value = NGN.forceNumber(value);
            break

          case 'boolean':
            value = NGN.forceBoolean(value);
            break

          case 'array':
            value = NGN.forceArray(value);
            break

          case 'string':
            value = value.toString();
            break

          case 'date':
            let valueType = NGN.typeof(value);

            if (valueType !== 'date') {
              if (valueType === 'number') {
                let dt = new Date();
                dt.setTime(value);

                value = dt;
              } else {
                value = new Date(Date.parse(value));
              }
            }

            break
        }
      } finally {
        return value // eslint-disable-line no-unsafe-finally
      }
    }
  }

  /**
   * @class NGN.DATA.VirtualField
   * A virtual field is a read-only ephemeral representation of data,
   * generated dynamically.
   * In other words, it's a made up data field that isn't part of what gets stored.
   * The value can be changed at any time, without warning or events. This is most
   * commonly used as an _internal class_ to support virtual fields within data
   * models. Consider the following:
   *
   * **Example:**
   *
   * ```js
   * let Person = new NGN.DATA.Model({
   *   fields: {
   *     dateOfBirth: Date
   *     age: function () {
   *       return YearsApart(new Date(), this.dateOfBirth)
   *     }
   *   }
   * })
   * ```
   *
   * The `age` example above (shorthand syntax) compares the `dateOfBirth` field
   * to the current date, expecting a numeric response. This particular virtual
   * field is useful for calculating a common value on the fly, and it is reusable
   * for any number of instances of the model.
   *
   * This functionality is available by implementing the NGN.DATA.VirtualField.
   * For example, the `age` virtual field would be created as:
   *
   * ```js
   * let age = new NGN.DATA.VirtualField(model, function () {
   *   return YearsApart(new Date(), this.dateOfBirth)
   * })
   * ```
   * @fires cache.clear {NGN.DATA.VirtualField}
   * Fired whenever the cache is cleared. The field is passed as the only argument
   * to event handler functions.
   */
  class NGNVirtualDataField extends NGNDataField { // eslint-disable-line
    constructor (cfg) {
      cfg = cfg || {};

      if (!(cfg.model instanceof NGN.DATA.Entity)) {
        NGN.WARN('No model specified for the virtual field to reference.');
      }

      // Remove unnecessary config values
      delete cfg.required;
      delete cfg.default;
      delete cfg.min;
      delete cfg.minimum;
      delete cfg.max;
      delete cfg.maximum;
      delete cfg.range;
      delete cfg.rule;
      delete cfg.rules;
      delete cfg.validators;
      delete cfg.pattern;

      super(cfg);

      this.METADATA.AUDITABLE = false;
      this.METADATA.fieldType = 'virtual';

      /**
       * @cfg {boolean} [cache=true]
       * By default, virtual fields _associated with a model_ will cache results
       * to prevent unnecessary function calls. The cache is cleared whenever a
       * local data field is modified.
       *
       * Caching can substantially reduce processing time in large data sets
       * by calling methods less often. In most use cases, it will provide a
       * substantial performance gain. However; since virtual fields can also
       * leverage variables and methods that are not a part of the data model,
       * caching may prevent the value from updating as expected. While this case
       * may occur less often, it can occur. If you suspect caching is interfering
       * with a virtual field value, it can be disabled by setting this to `false`.
       */
      this.METADATA.caching = NGN.coalesce(cfg.cache, true);

      /**
       * @cfg {NGN.DATA.Model|NGN.DATA.Store|Object} scope
       * The model, store, or object that will be referenceable within the
       * virtual field #method. The model will be available in the `this` scope.
       */
      this.METADATA.scope = NGN.coalesce(cfg.scope, cfg.model, this);

      /**
       * @cfg {Function} method
       * The method used to generate a value.
       * This is an asynchronous method the returns a value (of any type).
       */
      const me = this;
      const handlerFn = cfg.method;

      this.METADATA.virtualMethod = function () {
        return handlerFn.apply(me.METADATA.scope, ...arguments)
      };

      // Add smart-cache support
      this.METADATA.CACHEKEY = Symbol('no.cache');
      this.METADATA.cachedValue = this.METADATA.CACHEKEY;

      // Only add caching support if a model is associated
      if (this.METADATA.caching && this.model) {
        // Create a method for identifying which local data fields
        // need to be monitored (for caching)
        const localFieldPattern = /this(\.(.[^\W]+)|\[['"]{1}(.*)+['"]{1}\])/g;

        // Returns a Set of fieldnames used in the virtual function.
        let monitoredFields = new Set();
        let content = handlerFn.toString();
        let iterator = localFieldPattern.exec(content);

        while (iterator !== null) {
          let field = NGN.coalesce(iterator[2], iterator[3]);

          if (this.model.METADATA.knownFieldNames.has(field)) {
            monitoredFields.add(field);
          }

          content = content.replace(localFieldPattern, '');
          iterator = localFieldPattern.exec(content);
        }

        this.METADATA.model.pool('field.', {
          update: (change) => {
            if (change.field && monitoredFields.has(change.field.name)) {
              this.METADATA.cachedValue = this.METADATA.CACHEKEY;
              this.emit('cache.clear', this);
            }
          },

          remove: (field) => {
            if (monitoredFields.has(field.name)) {
              this.METADATA.cachedValue = this.METADATA.CACHEKEY;
              this.emit('cache.clear', this);
              NGN.ERROR(`The ${this.name} virtual field uses the ${field.name} field, which was removed. This virtual field may no longer work.`);
            }
          },

          create: (field) => {
            if (monitoredFields.has(field.name)) {
              this.METADATA.cachedValue = this.METADATA.CACHEKEY;
              this.emit('cache.clear', this);
              NGN.INFO(`The ${this.name} virtual field uses the ${field.name} field, which was added.`);
            }
          }
        });
      }
    }

    get auditable () {
      NGN.WARN('Virtual fields do not support the auditable property.');
      return false
    }

    set auditable (value) {
      NGN.WARN('Virtual fields do not support the auditable property.');
    }

    /**
     * @property {any} value
     * This will always return the value of the virtual field, but it may only
     * be _set_ to a synchronous function that returns a value.
     */
    get value () {
      if (this.METADATA.caching) {
        if (this.METADATA.cachedValue !== this.METADATA.CACHEKEY) {
          return this.METADATA.cachedValue
        } else {
          this.METADATA.cachedValue = this.METADATA.virtualMethod();
          return this.METADATA.cachedValue
        }
      }

      return this.METADATA.virtualMethod()
    }

    set value (value) {
      NGN.WARN('Cannot set the value of a virtual field (read only).');
    }

    get required () {
      NGN.WARN('Virtual fields do not support the required property.');
      return false
    }

    set required (value) {
      NGN.WARN('Virtual fields do not support the required property.');
    }

    get isNew () {
      NGN.WARN('Virtual fields do not support the isNew property.');
      return false
    }

    get default () {
      NGN.WARN('Virtual fields do not have default values.');
      return undefined
    }

    set default (value) {
      NGN.WARN('Virtual fields do not have default values.');
      return undefined
    }

    get violatedRule () {
      return 'None'
    }

    get valid () {
      NGN.WARN('Virtual fields are always valid.');
      return true
    }

    get modified () {
      NGN.WARN('modified attribute does nothing on virtual fields.');
      return false
    }

    allowInvalid () {
      NGN.WARN('allowInvalid() unavailable for virtual fields.');
    }

    disallowInvalid () {
      NGN.WARN('disallowInvalid() unavailable for virtual fields.');
    }

    autocorrectInput () {
      NGN.WARN('autocorrectInput() unavailable for virtual fields.');
    }
  }

  /**
   * @class NGN.DATA.Relationship
   * Represents a data field linked to another NGN.DATA.Model or
   * NGN.DATA.Store. This is used for nesting models/stores within a field,
   * supporting creation of complex data structures that are still easy
   * to work with.
   *
   * While there is no limit to how deeply nested fields can be, it is considered
   * a best practice to avoid circular relationships, which can lead to infinite
   * loops when serializing data.
   *
   * Nested models (i.e. records) each have their own data
   * NGN.DATA.Model#validators, so relationship fields defer all validation to
   * the individual record/model.
   *
   * Relationships using NGN.DATA.Stores behave a little differently, since they
   * represent a collection of data instead of a single record/model. NGN manages
   * [referential integrity](https://en.wikipedia.org/wiki/Referential_integrity)
   * using simplistic
   * [cardinality](https://en.wikipedia.org/wiki/Cardinality_(data_modeling)).
   *
   * Referential integrity & cardinality rules are data modeling principles
   * designed to enforce data quality standards. The nature of JavaScript objects
   * naturally enforces rudimentary data linking/nesting. NGN data relationships
   * build upon this, using proven data modeling principles.
   *
   * This is done, very simply, by using the @cfg#min and @cfg#max configuration
   * options. However; these options don't always need to be enforced, depending
   * on what type of cardniality needs to be achieved.
   *
   * For more information, see the Data Modeling Guide.
   *
   * **Note to self, use this next part in the guide:**
   *
   * There are five (5) common types of cardinality.
   *
   * - **1 => 1**: One-to-One
   * - **0 => 1**: Zero-or-One
   * - **0 => N**: Zero-to-Many
   * - **1 => N**: One-to-Many
   * - **N => N**: Many-to-Many
   *
   * There are also more granular types of cardinality, which are less common in
   * web applications, but often used in data and ETL operations.
   *
   * - **0,1 => 0,N**: Zero-or-One to Zero-or-More
   * - **0,1 => 1,N**: Zero-or-One to One-or-More
   * - ... write the rest in the guide...
   */
  class NGNRelationshipField extends NGNDataField { // eslint-disable-line
    constructor (cfg = {}) {
      let type = NGN.typeof(cfg.join);

      // Assure valid configuration
      if (!cfg.join) {
        throw new InvalidConfigurationError('Missing "join" configuration property.')
      } else if (
        ['model', 'store'].indexOf(type) < 0 &&
        (
          type !== 'array' ||
          NGN.typeof(cfg.join[0]) !== 'model'
        )
      ) {
        throw new InvalidConfigurationError(`The join specified is not a valid NGN.DATA.Model, NGN.DATA.Store, or collection. It is a ${NGN.typeof(cfg.join)}"`)
      }

      // Create optional cardinality validations

      // Initialize
      cfg.identifier = false;
      super(cfg);

      this.METADATA.fieldType = 'join';
      this.METADATA.join = Symbol('relationship');

      // Apply event monitoring to the #record.
      this.METADATA.applyMonitor = () => {
        if (this.METADATA.manner === 'model') {
          // Model Event Relay
          this.METADATA.join.pool('field.', {
            create: this.METADATA.commonModelEventHandler('field.create'),
            update: this.METADATA.commonModelEventHandler('field.update'),
            remove: this.METADATA.commonModelEventHandler('field.remove'),
            invalid: (data) => {
              this.emit(['invalid', `invalid.${this.METADATA.name}.${data.field}`]);
            },
            valid: (data) => {
              this.emit(['valid', `valid.${this.METADATA.name}.${data.field}`]);
            }
          });
        //   this.METADATA.join.pool('field.', {
        //     create: this.METADATA.commonModelEventHandler('field.create'),
        //     update: this.METADATA.commonModelEventHandler('field.update'),
        //     remove: this.METADATA.commonModelEventHandler('field.remove'),
        //     invalid: (data) => {
        //       this.emit(['invalid', `invalid.${this.name}.${data.field}`])
        //     },
        //     valid: (data) => {
        //       this.emit(['valid', `valid.${this.name}.${data.field}`])
        //     }
        //   })
        // } else {
        //   // Store Event Relay
        //   this.METADATA.join.pool('record.', {
        //     create: this.METADATA.commonStoreEventHandler('record.create'),
        //     update: this.METADATA.commonStoreEventHandler('record.update'),
        //     remove: this.METADATA.commonStoreEventHandler('record.remove'),
        //     invalid: (data) => {
        //       this.emit('invalid', `invalid.${this.name}.${data.field}`)
        //     },
        //     valid: (data) => {
        //       this.emit('valid', `valid.${this.name}.${data.field}`)
        //     }
        //   })
        }
      };

      // Event handling for nested models.
      this.METADATA.commonModelEventHandler = (type) => {
        const me = this;

        return function (change) {
          me.METADATA.commitPayload({
            field: `${me.name}.${change.field}`,
            old: NGN.coalesce(change.old),
            new: NGN.coalesce(change.new),
            join: true,
            originalEvent: {
              event: this.event,
              record: me.METADATA.record
            }
          });
        }
      };

      // Event handling for nested stores.
      this.METADATA.commonStoreEventHandler = (type) => {
        const me = this;

        return function (record, change) {
          let old = change ? NGN.coalesce(change.old) : me.data;

          if (this.event === 'record.create') {
            old.pop();
          } else if (this.event === 'record.delete') {
            old.push(record.data);
          }

          me.METADATA.commitPayload({
            field: me.name + (change ? `.${change.field}` : ''),
            old: change ? NGN.coalesce(change.old) : old,
            new: change ? NGN.coalesce(change.new) : me.data,
            join: true,
            originalEvent: {
              event: this.event,
              record: record
            }
          });
        }
      };

      // const commitPayload = this.METADATA.commitPayload
      //
      // this.METADATA.commitPayload = (payload) => {
      //   console.log('HERE')
      //   commitPayload(...arguments)
      // }

      /**
       * @cfg join {NGN.DATA.Store|NGN.DATA.Model[]}
       * A relationship to another model/store is defined by a join.
       * The join may be a data store or data model. It is also possible
       * to specify a collection.
       *
       * For example, a join may be defined as:
       *
       * ```js
       * // Use of a model
       * let RelationshipField = new NGN.DATA.Relationship({
       *   record: new NGN.DATA.Model(...)
       * })
       *
       * // Use of a model collection
       * let RelationshipField = new NGN.DATA.Relationship({
       *   record: [new NGN.DATA.Model(...)]
       * })
       *
       * // Use of a store
       * let RelationshipField = new NGN.DATA.Relationship({
       *   record: new NGN.DATA.Store(...)
       * })
       * ```
       *
       * A store and a model collection are both a group of models,
       * Internally, model collections are converted to data stores.
       *
       * By supporting all three formats, it is possible to create complex
       * data models, such as:
       *
       * ```js
       * let Pet = new NGN.DATA.Model(...)
       * let Kid = new NGN.DATA.Model(...)
       * let Kids = new NGN.DATA.Store({
       *   model: Kid
       * })
       *
       * let Person = new NGN.DATA.Model({
       *   fields: {
       *     dateOfBirth: Date,
       *     spouse: Person,  // <== Join a Model
       *     kids: Kids,      // <== Join a Store
       *     pets: [Pet]      // <== Join a Collection
       *   }
       * })
       * ```
       *
       * The `pets` field contains a "collection". This shorthand notation is used
       * to help understand real data relationships. In this case, it is easy to
       * infer that a person may have zero or more pets.
       */
      this.value = NGN.coalesce(cfg.join);
      this.METADATA.AUDITABLE = false;
      this.auditable = NGN.coalesce(cfg.audit, false);
    }

    /**
     * @property {string} manner
     * The manner of relationship. This can be one of 3 values: `store`
     * (NGN.DATA.Store), `model` (NGN.DATA.Model), or `collection`. A collection
     * is a special configuration shortcut used to represent a new store of models.
     *
     * For example, a model may be defined as:
     *
     * ```js
     * let Pet = new NGN.DATA.Model({
     *   fields: {
     *     name: String,
     *     animalType: String
     *   }
     * })
     *
     * let Person = new NGN.DATA.Model({
     *   fields: {
     *     dateOfBirth: Date
     *   },
     *   relationships: {
     *     pets: [Pet]        // <== Collection
     *   }
     * })
     * ```
     */
    get manner () {
      return NGN.coalesce(this.METADATA.manner, 'unknown')
    }

    get value () {
      return this.METADATA.join
    }

    // Override the default value setter
    set value (value) {
      // Short-circuit if the value hasn't changed.
      let currentValue = this.METADATA.join;

      if (currentValue === value) {
        return
      }

      let type = NGN.typeof(value);

      if (type === 'array') {
        if (value.length !== 1) {
          throw new Error(`${this.METADATA.name} cannot refer to an empty data store/model collection. A record must be provided.`)
        }

        this.METADATA.manner = 'store';
        value = new NGN.DATA.Store({
          model: value[0]
        });
      } else if (['model', 'store'].indexOf(type) >= 0) {
        this.METADATA.manner = type;
      } else {
        NGN.ERROR(`The "${this.METADATA.name}" relationship has an invalid record type. Only instances of NGN.DATA.Store, NGN.DATA.Model, or [NGN.DATA.Model] are supported." .`);
        throw new InvalidConfigurationError(`Invalid record configuration for "${this.METADATA.name}" field.`)
      }

      if (this.manner === 'unknown') {
        throw new Error('Cannot set a relationship field to anything other than an NGN.DATA.Store, NGN.DATA.Model, or an array of NGN.DATA.Model collections. (Unknown manner of relationship)')
      }

      this.METADATA.join = type === 'model' ? new value() : value; // eslint-disable-line new-cap
      this.auditable = this.METADATA.AUDITABLE;
      this.METADATA.applyMonitor();

      // Notify listeners of change
      if (typeof currentValue !== 'symbol') {
        this.emit('update', {
          old: currentValue,
          new: value
        });
      }
    }

    set auditable (value) {
      value = NGN.forceBoolean(value);

      if (value !== this.METADATA.AUDITABLE) {
        this.METADATA.AUDITABLE = value;
        this.METADATA.join.auditable = value;
      }
    }

    // Override the default undo
    undo () {
      if (this.METADATA.manner === 'model') {
        this.METADATA.join.undo(...arguments);
      }
    }

    redo () {
      if (this.METADATA.manner === 'model') {
        this.METADATA.join.redo(...arguments);
      }
    }
  }

  /**
   * @class NGN.DATA.FieldMap
   * A field map is a special data transformer that maps field names (keys)
   * to a different format. Consider the following field map:
   *
   * ```js
   * let fieldMap = new NGN.DATA.FieldMap({
   *   father: 'pa',
   *   mother: 'ma',
   *   brother: 'bro',
   *   sister: 'sis'
   * })
   * ```
   *
   * The map above reads as "the `father` field is also known as `pa`",
   * "the `mother` field is also known as `ma`", etc.
   *
   * The following transformation is possible:
   *
   * ```js
   * let result = fieldMap.apply({
   *   pa: 'John',
   *   ma: 'Jill',
   *   bro: 'Joe',
   *   sis: 'Jane'
   * })
   *
   * console.log(result)
   * ```
   *
   * _yields:_
   *
   * ```sh
   * {
   *   father: 'John'
   *   mother: 'Jill',
   *   brother: 'Joe',
   *   sister: 'Jane'
   * }
   * ```
   *
   * It is also possible to reverse field names:
   *
   * ```js
   * let result = fieldMap.applyReverse({
   *   father: 'John'
   *   mother: 'Jill',
   *   brother: 'Joe',
   *   sister: 'Jane'
   * })
   *
   * console.log(result)
   * ```
   *
   * _yields:_
   *
   * ```sh
   * {
   *   pa: 'John',
   *   ma: 'Jill',
   *   bro: 'Joe',
   *   sis: 'Jane'
   * }
   * ```
   *
   * This class is designed to assist with reading and writing data
   * to NGN.DATA.Model and NGN.DATA.Store instances.
   * @private
   */
  class NGNDataFieldMap { // eslint-disable-line
    constructor (cfg = {}) {
      Object.defineProperties(this, {
        originalSource: NGN.privateconst(cfg),
        sourceMap: NGN.private(null),
        reverseMap: NGN.private(null),
        applyData: NGN.privateconst((map = 'map', data) => {
          if (NGN.typeof(data) !== 'object') {
            return data
          }

          let keys = Object.keys(data);
          map = map === 'map' ? this.inverse : this.map;

          for (let i = 0; i < keys.length; i++) {
            if (map.hasOwnProperty(keys[i])) {
              data[map[keys[i]]] = data[keys[i]];
              delete data[keys[i]];
            }
          }

          return data
        })
      });
    }

    /**
     * @property {object} map
     * A reference to the data mapping object.
     */
    get map () {
      if (this.sourceMap === null) {
        let keys = Object.keys(this.originalSource);

        this.sourceMap = {};

        for (let i = 0; i < keys.length; i++) {
          if (NGN.typeof(keys[i]) === 'string' && NGN.typeof(this.originalSource[keys[i]]) === 'string') {
            this.sourceMap[keys[i]] = this.originalSource[keys[i]];
          }
        }
      }

      return this.sourceMap
    }

    /**
     * @property {object} inverse
     * A reference to the inversed data map.
     */
    get inverse () {
      if (this.reverseMap === null) {
        let keys = Object.keys(this.originalSource);

        this.reverseMap = {};

        for (let i = 0; i < keys.length; i++) {
          if (NGN.typeof(keys[i]) === 'string' && NGN.typeof(this.originalSource[keys[i]]) === 'string') {
            this.reverseMap[this.originalSource[keys[i]]] = keys[i];
          }
        }
      }

      return this.reverseMap
    }

    /**
     * Apply the map to an object.
     * @param  {object} data
     * @return {object}
     */
    applyMap (data) {
      return this.applyData('map', data)
    }

    /**
     * Apply the inversed map to an object.
     * @param  {object} data
     * @return {object}
     */
    applyInverseMap (data) {
      return this.applyData('reverse', data)
    }
  }

  /**
   * @class NGN.DATA.Model
   * Represents a data model/record.
   * @extends NGN.EventEmitter
   * @fires field.update
   * Fired when a datafield value is changed.
   * @fires field.create {NGN.DATA.Field}
   * Fired when a datafield is created.
   * @fires field.remove
   * Fired when a datafield is deleted.
   * @fires field.invalid
   * Fired when an invalid value is detected in an data field.
   */
  class NGNDataEntity extends EventEmitter { // eslint-disable-line
    constructor (cfg) {
      cfg = NGN.coalesce(cfg, {});

      super();

      if (cfg.dataMap) {
        cfg.fieldmap = cfg.dataMap;
        NGN.WARN('"dataMap" is deprecated. Use "map" instead.');
      }

      if (cfg.idAttribute) {
        cfg.IdentificationField = cfg.idAttribute;
        NGN.WARN('"idAttribute" is deprecated. Use "IdentificationField" instead.');
      }

      const me = this;

      // Create private attributes & data placeholders
      Object.defineProperties(this, {
        /**
         * @property {Symbol} OID
         * A unique object ID assigned to the model. This is an
         * internal readon-only reference.
         * @private
         */
        OID: NGN.private(Symbol('model.id')),

        METADATA: NGN.privateconst({
          /**
           * @cfg {string} [name]
           * A descriptive name for the model. This is typically used for
           * debugging, logging, schema defintions, and (sometimes) data proxies.
           */
          name: NGN.coalesce(cfg.name, 'Untitled Model'),

          /**
           * @cfg {string} [description]
           * A description of the model. This is typically used for
           * debugging, logging, schema definitions, and (sometimes) data proxies.
           */
          description: NGN.coalesce(cfg.description, cfg.name, 'Generic Data Model'),

          /**
           * @cfg {object} fields
           * A private object containing the data fields of the model.
           * Each key contains the field name, while each value can be one of
           * the following:
           *
           * - Primitive (String, Number, RegExp, Boolean)
           * - Standard Type (Array, Object, Date)
           * - Custom Class
           * - NGN.DATA.Field
           * - An NGN.DATA.Field configuration
           * - `null` (Defaults to String primitive)
           *
           * ```js
           * fields: {
           *   a: String,
           *   b: Date,
           *   c: MyCustomClass,
           *   d: new NGN.DATA.Field({
           *     required: true,
           *     type: String,
           *     default: 'some default value'
           *   }),
           *   e: {
           *     required: true,
           *     type: String,
           *     default: 'some default value'
           *   },
           *   f: null // Uses default field config (String)
           * }
           * ```
           *
           * Extensions of the NGN.DATA.Field are also supported,
           * such as NGN.DATA.VirtualField and NGN.DATA.Relationship.
           */
          fields: Object.assign({}, NGN.coalesce(cfg.fields, {})),
          knownFieldNames: new Set(),
          invalidFieldNames: new Set(),
          auditFieldNames: NGN.coalesce(cfg.audit, false) ? new Set() : null,

          /**
           * @property {[NGN.DATA.Rule]|Object}
           * Custom validation rules used to verify the integrity of the entire
           * model. This only applies to the full model. Individual data fields
           * may have their own validators.
           *
           * If an object is specified, it should contain simple key/value pairs,
           * where the key is the descriptive name of the rule and the value is
           * a synchronous callback function that returns a `true`/`false` value.
           * For instance, assume the fields called `price`, `items`, and `tax` exist
           * in the example model below. :
           *
           * ```js
           * {
           *   'Positive Sale': function () {
           *      return (this.price * this.items) > 0
           *   },
           *   'Taxes Applied': function () {
           *      return this.tax > 0
           *   }
           * }
           * ```
           *
           * Alternatively, an array of NGN.DATA.Rule instances may be provided.
           */
          validators: NGN.coalesce(cfg.rules, cfg.rule, cfg.validators),

          /**
           * @cfgproperty {boolean} [validation=true]
           * Toggle data validation using this.
           */
          validation: NGN.coalesce(cfg.validation, true),

          /**
           * @cfg {boolean} [autoid=false]
           * If the NGN.DATA.Model#IdentificationField/id is not provided for a record,
           * a unique ID will be automatically generated for it.
           *
           * An NGN.DATA.Store using a model with this set to `true` will never
           * have a duplicate record, since the #id or #IdentificationField will always
           * be unique.
           */
          autoid: NGN.coalesce(cfg.autoid, false),

          /**
           * @cfg {String} [IdentificationField='id']
           * Setting this allows an attribute of the object to be used as the ID.
           * For example, if an email is the ID of a user, this would be set to
           * `email`.
           */
          IdentificationField: NGN.coalesce(cfg.IdentificationField, cfg.idField, 'id'),

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
          expiration: null,

          // Holds a setTimeout method for expiration events.
          expirationTimeout: null,

          created: Date.now(),
          store: null,

          /**
           * @cfg {boolean} [audit=false]
           * Enable auditing to support #undo/#redo operations. This creates and
           * manages a NGN.DATA.TransactionLog.
           */
          AUDITABLE: false,
          AUDITLOG: NGN.coalesce(cfg.audit, false) ? new NGN.DATA.TransactionLog() : null,
          AUDIT_HANDLER: function (change) {
            if (change.hasOwnProperty('cursor')) {
              me.METADATA.AUDITLOG.commit(me.METADATA.getAuditMap());
            }
          },

          EVENTS: new Set([
            'field.update',
            'field.create',
            'field.remove',
            'field.invalid',
            'field.valid',
            'field.hidden',
            'field.unhidden',
            'field.rule.add',
            'field.rule.remove',
            'rule.add',
            'rule.remove',
            'relationship.create',
            'relationship.remove',
            'expired',
            'deleted',
            'reset',
            'load'
          ]),

          /**
           * An internal method used to apply field definitions to the model.
           * @param  {string} fieldname
           * Name of the field (as applied to the model).
           * @param  {NGN.DATA.Field|Object|Primitive} [fieldConfiguration=null]
           * The configuration to apply. See #addField for details.
           * @param  {Boolean} [suppressEvents=false]
           * Optionally suppress the `field.create` event.
           * @private
           */
          applyField: (field, fieldcfg = null, suppressEvents = false) => {
            // Prevent duplicate fields
            if (this.METADATA.knownFieldNames.has(field)) {
              return NGN.WARN(`Duplicate field "${field}" detected.`)
            }

            // Prevent reserved words
            if (this.hasOwnProperty(field) && field.toLowerCase() !== 'id') {
              throw new ReservedWordError(`"${field}" cannot be used as a field name (reserved word).`)
            }

            // If the field config isn't already an NGN.DATA.Field, create it.
            if (!(fieldcfg instanceof NGN.DATA.Field)) {
              if (fieldcfg instanceof NGN.DATA.Store || fieldcfg instanceof NGN.DATA.Model) {
                if (this.METADATA.IdentificationField === field) {
                  throw new InvalidConfigurationError(`"${field}" cannot be an ID. Relationship fields cannot be an identification field/attribute.`)
                }

                this.METADATA.fields[field] = new NGN.DATA.Relationship({
                  name: field,
                  record: fieldcfg,
                  model: this
                });
              } else {
                switch (NGN.typeof(fieldcfg)) {
                  // Custom config
                  case 'object':
                    fieldcfg.model = this;
                    fieldcfg.identifier = NGN.coalesce(fieldcfg.identifier, this.METADATA.IdentificationField === field);
                    fieldcfg.name = field;

                    this.METADATA.fields[field] = new NGN.DATA.Field(fieldcfg);

                    break

                  // Collection of models
                  case 'array':
                    return this.applyField(field, fieldcfg[0], suppressEvents)

                  // Type-based cfg.
                  default:
                    if (NGN.isFn(fieldcfg) || fieldcfg === null) {
                      if (NGN.isFn(fieldcfg) && ['string', 'number', 'boolean', 'number', 'symbol', 'regexp', 'date', 'array', 'object'].indexOf(NGN.typeof(fieldcfg)) < 0) {
                        this.METADATA.fields[field] = new NGN.DATA.VirtualField({
                          name: field,
                          identifier: this.METADATA.IdentificationField === field,
                          model: this,
                          method: fieldcfg
                        });

                        break
                      }

                      this.METADATA.fields[field] = new NGN.DATA.Field({
                        name: field,
                        type: fieldcfg,
                        identifier: this.METADATA.IdentificationField === field,
                        model: this
                      });

                      break
                    }

                    this.METADATA.fields[field] = new NGN.DATA.Field({
                      name: field,
                      type: NGN.isFn(fieldcfg) ? fieldcfg : String,
                      identifier: NGN.isFn(fieldcfg)
                        ? false
                        : NGN.coalesce(fieldcfg.identifier, this.METADATA.IdentificationField === field),
                      model: this
                    });

                    break
                }
              }
            } else if (fieldcfg.model === null) {
              fieldcfg.name = field;
              fieldcfg.identifier = fieldcfg.identifier = NGN.coalesce(fieldcfg.identifier, this.METADATA.IdentificationField === field);

              this.METADATA.fields[field] = fieldcfg;
              this.METADATA.fields[field].model = this;
            } else if (fieldcfg.model === this) {
              fieldcfg.identifier = NGN.coalesce(fieldcfg.identifier, this.METADATA.IdentificationField === field);

              this.METADATA.fields[field] = fieldcfg;
            } else if (!(fieldcfg instanceof NGN.DATA.Field)) {
              return NGN.WARN(`The "${fieldcfg.name}" field cannot be applied because model is already specified.`)
            }

            // Add a direct reference to the model.
            Object.defineProperty(this, field, {
              enumerable: true,
              configurable: true,
              get: () => this.get(field),
              set: (value) => this.set(field, value)
            });

            // Enable auditing if necessary.
            if (this.METADATA.AUDITABLE) {
              if (this.METADATA.fields[field].fieldType !== 'virtual') {
                this.METADATA.fields[field].auditable = true;
                this.METADATA.auditFieldNames.add(field);
              }
            }

            // Add the field to the list
            this.METADATA.knownFieldNames.add(field);

            this.METADATA.fields[field].relay('*', this, 'field.');

            if (!suppressEvents) {
              this.emit('field.create', this.METADATA.fields[field]);
            }

            return this.METADATA.fields[field]
          },

          /**
           * An internal helper method for applying changes to the model.
           * @param  {String} [type='undo']
           * This can be `undo` or `redo`.
           * @param  {Number} [count=1]
           * The number of cursor indexes to shift
           * @param  {Boolean} [suppressEvents=false]
           * Indicates events should be suppressed.
           * @private
           */
          applyChange: (type = 'undo', count = 1, suppressEvents = false) => {
            if (!this.METADATA.AUDITABLE) {
              NGN.WARN(`The ${type} operation failed on the ${this.name} model because auditing is disabled.`);
              return
            }

            this.METADATA.AUDITLOG[type === 'undo' ? 'rollback' : 'advance'](count);

            let data = this.METADATA.AUDITLOG.currentValue;

            if (data) {
              this.METADATA.auditFieldNames.forEach(fieldname => {
                let field = this.METADATA.fields[fieldname];
                let log = field.METADATA.AUDITLOG;

                if (log.cursor !== data[fieldname]) {
                  if (typeof data[fieldname] === 'symbol') {
                    log.cursor = data[fieldname];
                  } else {
                    log.cursor = null;
                  }

                  field.METADATA.setValue(NGN.coalesce(log.currentValue, field.default), suppressEvents, true);
                }
              });
            }
          },

          /**
           * Generates a key/value representation of the model where
           * each key represents an auditable field and each value is the
           * transaction cursor ID.
           * @return {Object}
           * @private
           */
          getAuditMap: () => {
            let map = {};

            this.METADATA.auditFieldNames.forEach(field => {
              map[field] = this.METADATA.fields[field].METADATA.AUDITLOG.cursor;
            });

            return map
          },

          /**
           * Restore the model to a specific audit map (i.e. historical state
           * of multiple fields).
           * @param {Object} map
           * The audit map to restore.
           */
          // restore: (map) => {
          //   let keys = Object.keys(map)
          //
          //   for (let i = 0; i < keys.length; i++) {
          //     if (this.METADATA.knownFieldNames.has(keys[i]) && typeof map[keys[i]] === 'symbol') {
          //       console.log('Has', keys[i])
          //
          //     }
          //   }
          // },

          // Deprecations
          setSilent: NGN.deprecate(this.setSilentFieldValue, 'setSilent has been deprecated. Use setSilentFieldValue instead.'),

          /**
           * @cfgproperty {object} fieldmap
           * An object mapping model attribute names to data storage field names.
           *
           * _Example_
           * ```
           * {
           *   ModelFieldName: 'inputName',
           *   father: 'dad',
           *   email: 'eml',
           *   image: 'img',
           *   displayName: 'dn',
           *   firstName: 'gn',
           *   lastName: 'sn',
           *   middleName: 'mn',
           *   gender: 'sex',
           *   dob: 'bd'
           * }
           * ```
           */
          DATAMAP: null
        }),

        MAP: NGN.get(() => {
          return NGN.coalesce(
            this.METADATA.DATAMAP,
            this.METADATA.store instanceof NGN.DATA.Store
              ? this.METADATA.store.map
              : null
          )
        })
      });

      if (cfg.fieldmap instanceof NGN.DATA.FieldMap) {
        this.METADATA.DATAMAP = cfg.fieldmap;
      } else if (NGN.typeof(cfg.fieldmap) === 'object') {
        this.METADATA.DATAMAP = new NGN.DATA.FieldMap(cfg.fieldmap);
      }

      // Bubble events to the BUS
      // this.relay('*', NGN.BUS, 'record.')

      // Add data fields.
      let fields = Object.keys(this.METADATA.fields);
      for (let i = 0; i < fields.length; i++) {
        let name = fields[i];

        if (this.METADATA.knownFieldNames.has(name)) {
          NGN.WARN(`Duplicate field "${name}" detected.`);
        } else {
          // Configure a data field for each configuration.
          this.METADATA.applyField(name, this.METADATA.fields[name], true);
        }
      }

      // Apply automatic ID's when applicable
      if (this.METADATA.autoid) {
        let autoIdValue = null;

        Object.defineProperty(this.METADATA, 'IdentificationValue', NGN.get(() => {
          if (autoIdValue === null) {
            autoIdValue = NGN.DATA.UTILITY.UUID();
          }

          return autoIdValue
        }));
      }

      // Apply auditing if configured
      this.auditable = NGN.coalesce(cfg.audit, false);

      // Clear any cached checksums when the model changes.
      this.on(['field.update', 'field.create', 'field.delete', 'field.hidden', 'field.unhidden'], () => {
        if (this.METADATA.checksum) {
          this.METADATA.checksum = null;
        }
      });

      // Configure TTL/Expiration
      if (cfg.expires) {
        this.expires = cfg.expires;
      }

      // Configure model-level validation rules
      if (this.METADATA.validators !== null) {
        switch (NGN.typeof(this.METADATA.validators)) {
          // Support key/value objects where the key is the name and value is a function.
          case 'object':
            let keys = Object.keys(this.METADATA.validators);
            let rules = [];

            for (let i = 0; i < keys.length; i++) {
              rules.push(new NGN.DATA.Rule(this.METADATA.validators[keys[i]], keys[i], this));
            }

            break

          // Support an array of existing data rules.
          case 'array':
            for (let i = 0; i < this.METADATA.validators.length; i++) {
              if (this.METADATA.validators[i].hasOwnProperty('RULE')) {
                this.METADATA.validators[i].RULE.scope = this;
              } else {
                throw new Error(`Invalid data rule configuration for ${this.name} model. Rule #${i} is not a valid NGN.DATA.Rule instance.`)
              }
            }

            break

          // Diasllow any other kinds of rules.
          default:
            throw new Error(`Invalid data rule configuration for ${this.name} model. Expected an object or array of NGN.DATA.Rule instances. Received "${NGN.typeof(this.METADATA.validators)}"`)
        }
      }
    }

    get name () {
      return this.METADATA.name
    }

    set auditable (value) {
      value = NGN.forceBoolean(value);

      if (value !== this.METADATA.AUDITABLE) {
        this.METADATA.AUDITABLE = value;
        this.METADATA.AUDITLOG = value ? new NGN.DATA.TransactionLog() : null;
        this.METADATA.auditFieldNames = value ? new Set() : null;

        // Set each field to an auditable state (or not).
        this.METADATA.knownFieldNames.forEach(fieldname => {
          if (!this.METADATA.fields[fieldname].virtual) {
            this.METADATA.fields[fieldname].auditable = value;

            if (value) {
              this.METADATA.auditFieldNames.add(fieldname);
            }
          }
        });

        if (value) {
          // Track Changes (if auditing enabled)
          this.on('field.transaction.*', (id) => {
            this.METADATA.AUDIT_HANDLER({ cursor: id });
          });
        } else {
          this.METADATA.auditFieldNames.clear();

          this.off('field.transaction.*');
        }
      }
    }

    /**
     * The unique ID assigned to the model.
     * @return {string}
     */
    get id () {
      return this.get(this.METADATA.IdentificationField)
    }

    set id (value) {
      this.set('id', value);
    }

    /**
     * @property ID
     * An alias for #id.
     */
    get ID () {
      return this.id
    }

    set ID (value) {
      this.set('id', value);
    }

    /**
     * @property {Array} changelog
     * The changelog returns the underlying NGN.DATA.TransactionLog#log if
     * auditing is available. The array will be empty if auditing is disabled.
     */
    get changelog () {
      return this.METADATA.AUDITLOG.log.map(entry => {
        let result = {
          timestamp: entry.timestamp,
          activeCursor: entry.activeCursor,
          value: {}
        };

        let data = entry.value;
        let field = Object.keys(data);

        for (let i = 0; i < field.length; i++) {
          if (typeof data[field[i]] === 'symbol') {
            result.value[field[i]] = NGN.coalesce(
              this.METADATA.fields[field[i]].METADATA.AUDITLOG.getCommit(data[field[i]]).value,
              this.METADATA.fields[field[i]].default
            );
          } else {
            result.value[field[i]] = NGN.coalesce(this.METADATA.fields[field[i]].default);
          }
        }

        return result
      })
    }

    /**
     * @property {Number} createDate
     * The date/time when the model is created.
     */
    get createDate () {
      return this.METADATA.created
    }

    /**
     * @property {object} data
     * A serialized version of the data represented by the model. This
     * only includes non-virtual fields. See #representation to use
     * a representation of data containing virtual fields.
     */
    get data () {
      if (this.MAP) {
        return this.MAP.applyInverseMap(this.serializeFields())
      }

      return this.serializeFields()
    }

    /**
     * @property {object} unmappedData
     * Returns #data _without applying_ the data #map.
     */
    get unmappedData () {
      return this.serializeFields()
    }

    /**
     * @property {object} representation
     * A serialized version of the data represented by the model. This
     * includes virtual fields. See #data to use just the raw values.
     */
    get representation () {
      if (this.MAP) {
        return this.MAP.applyInverseMap(this.serializeFields(false, false))
      }

      return this.serializeFields(false, false)
    }

    /**
     * @property {object} unmappedRepresentation
     * Returns #representation _without applying_ the data #map.
     */
    get unmappedRepresentation () {
      return this.serializeFields(false, false)
    }

    /**
     * @property {string} checksum
     * The checksum is a unique "fingerprint" of the data stored in the model.
     * Please note that generating a checksum for an individual record is
     * usually a quick operation, but generating large quantities of checksums
     * simultaneously/sequentially can be computationally expensive. On average,
     * a checksum takes 3-125ms to generate.
     */
    get checksum () {
      this.METADATA.checksum = NGN.coalesce(this.METADATA.checksum, NGN.DATA.UTILITY.checksum(JSON.stringify(this.data)));

      return this.METADATA.checksum
    }

    /**
     * @property {Date} expires
     * The date/time when the record expires. This may be set to
     * a future date, or a numeric value. Numeric values
     * represent the number of milliseconds from the current time
     * before the record expires. For example, set this to `3000`
     * to force the record to expire 3 seconds from now.
     *
     * Set this to `0` to immediately expire the record. Set this to
     * `-1` or `null` to prevent the record from expiring.
     */
    get expires () {
      return this.METADATA.expiration
    }

    set expires (value) {
      if (value === null) {
        clearTimeout(this.METADATA.expirationTimeout);
        this.METADATA.expiration = null;
        return
      }

      let now = new Date();

      if (!isNaN(value) && !(value instanceof Date)) {
        // Handle numeric (millisecond) expiration
        if (value < 0) {
          this.METADATA.expiration = null;

          return
        }

        if (value === 0) {
          this.METADATA.expiration = now;
          this.emit('expire');

          return
        }

        this.METADATA.expiration = new Date();
        this.METADATA.expiration.setTime(now.getTime() + value);
      } else if (!(value instanceof Date) || value <= now) {
        throw new Error(`${this.name} expiration (TTL) value must be a positive number (milliseconds) or future date.`)
      } else {
        // Handle date-based expiration
        this.METADATA.expiration = value;
      }

      clearTimeout(this.METADATA.expirationTimeout);

      this.METADATA.expirationTimeout = setTimeout(() => this.emit('expire'), this.METADATA.expiration.getTime() - now.getTime());
    }

    get expired () {
      if (this.METADATA.expiration === null) {
        return false
      }

      return this.METADATA.expiration <= (new Date())
    }

    get fieldDefinitions () {
      return this.METADATA.fields
      // if (this.METADATA.knownFieldNames.size === 0) {
      //   return {}
      // }
      //
      // let fields = this.METADATA.knownFieldNames.keys()
      // let result = {}
      // let fieldname = fields.next()
      //
      // while (!fieldname.done) {
      //   let field = this.METADATA.fields[fieldname.value]
      //
      //   if ((
      //     field.value === undefined ||
      //     (ignoreID && fieldname.value === this.IdentificationField) ||
      //     (!field.virtual || (!ignoreVirtualFields && field.virtual))
      //   )) {
      //     // Do not serialize hidden values or virtuals
      //     if (!field.hidden) {
      //       switch (NGN.typeof(field.value)) {
      //         case 'array':
      //         case 'object':
      //           result[fieldname.value] = NGN.DATA.UTILITY.serialize(field.value)
      //           break
      //
      //         default:
      //           result[fieldname.value] = field.value
      //       }
      //     }
      //   }
      // }
    }

    serializeFields (ignoreID = false, ignoreVirtualFields = true) {
      if (this.METADATA.knownFieldNames.size === 0) {
        return {}
      }

      let fields = this.METADATA.knownFieldNames.keys();
      let result = {};
      let fieldname = fields.next();

      while (!fieldname.done) {
        let field = this.METADATA.fields[fieldname.value];

        // Ignore unserializable fields
        if ((
          field.value === undefined ||
          (ignoreID && fieldname.value === this.IdentificationField) ||
          (!field.virtual || (!ignoreVirtualFields && field.virtual))
        )) {
          // Do not serialize hidden values or virtuals
          if (!field.hidden) {
            switch (NGN.typeof(field.value)) {
              case 'array':
              case 'object':
                result[fieldname.value] = NGN.DATA.UTILITY.serialize(field.value);
                break

              default:
                result[fieldname.value] = field.value;
            }
          }
        }

        fieldname = fields.next();
      }

      return result
    }

    serialize () {
      return NGN.deprecate(this.serializeFields, 'serialize is now serializeFields. Use NGN.DATA.UTILITY.serialize for generic object serialization.')
    }

    /**
     * Determines whether a field exists in the model or not.
     * @param  {string} field
     * Name of the field to check for.
     * @return {boolean}
     */
    fieldExists (field) {
      return this.METADATA.knownFieldNames.has(field)
    }

    /**
     * Retrieve the value of the specified field.
     * @param  {string} field
     * Name of the field whose value should be returned.
     * @return {any}
     * Returns the value of the field.
     */
    get (field) {
      if (field === 'id' || field === 'ID' || field === this.METADATA.IdentificationField) {
        field = this.METADATA.IdentificationField;

        if (this.METADATA.autoid) {
          if (!this.METADATA.knownFieldNames.has(field)) {
            return this.METADATA.IdentificationValue
          } else {
            return NGN.coalesce(this.METADATA.fields[field].value, this.METADATA.IdentificationValue)
          }
        }
      }

      if (this.METADATA.knownFieldNames.has(field)) {
        return this.METADATA.fields[field].value
      } else {
        NGN.WARN(`Cannot get "${field}". The field is not part of the model.`);
        return undefined
      }
    }

    /**
     * Set a new value for the specified field.
     * @param {string} field
     * Name of the field whose value will be changed.
     * @param {any} value
     * The new value of the field.
     */
    set (field, value) {
      if (field === 'id' || field === 'ID') {
        field = this.METADATA.IdentificationField;
      }

      if (this.METADATA.knownFieldNames.has(field)) {
        this.METADATA.fields[field].value = value;
      } else {
        NGN.WARN(`Cannot set "${field}". Unrecognized field name.`);
      }
    }

    /**
     * Add a data field after the initial model definition.
     * @param {string} fieldname
     * The name of the field.
     * @param {NGN.DATA.Field|Object|Primitive} [fieldConfiguration=null]
     * The field configuration (see cfg#fields for syntax).
     * @param {boolean} [suppressEvents=false]
     * Set to `true` to prevent events from firing when the field is added.
     */
    addField (name, fieldConfiguration = null, suppressEvents = false) {
      if (name instanceof NGN.DATA.Field) {
        fieldConfiguration = name;
        name = fieldConfiguration.name;
      } else if (typeof name !== 'string') {
        throw new Error('Cannot add a non-string based field.')
      }

      this.METADATA.applyField(name, fieldConfiguration, suppressEvents);
    }

    /**
     * @method removeField
     * Remove a field from the data model.
     * @param {string} name
     * Name of the field to remove.
     * @param {boolean} [suppressEvents=false]
     * Set to `true` to prevent events from firing when the field is removed.
     */
    removeField (name, suppressEvents = false) {
      if (this.METADATA.knownFieldNames.has(name)) {
        this.METADATA.knownFieldNames.delete(name);
        this.METADATA.invalidFieldNames.delete(name);

        const field = this.METADATA.fields[name];

        delete this[name];
        delete this.METADATA.fields[name]; // eslint-disable-line no-undef

        // let change = {
        //   action: 'delete',
        //   field: field.name,
        //   value: field,
        //   join: field instanceof NGN.DATA.Relationship
        // }

        if (!suppressEvents) {
          this.emit('field.remove', field);
        }

        if (this.METADATA.store !== null) {
          this.METADATA.store.emit(this.METADATA.store.PRIVATE.EVENT.DELETE_RECORD_FIELD, {
            record: this,
            field
          });
        }
      }
    }

    /**
     * Returns the NGN.DATA.Field object for the specified field.
     * @param  {string} fieldName
     * Name of the field to retrieve.
     * @return {NGN.DATA.Field}
     * The raw field.
     */
    getField (name) {
      if (name.toLowerCase() === 'id' && !this.METADATA.fields.hasOwnProperty(name) && this.METADATA.fields.hasOwnProperty(this.METADATA.IdentificationField)) {
        return this.METADATA.fields[this.METADATA.IdentificationField]
      }

      return this.METADATA.fields[name]
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
    setSilentFieldValue (field, value) {
      this.METADATA.fields[field].silentValue = value;
    }

    /**
     * @method undo
     * A rollback function to undo changes. This operation affects
     * the changelog (transaction log). To "undo" an "undo", use #redo.
     * @param {number} [OperationCount=1]
     * The number of operations to "undo". Defaults to a single operation.
     * @param {boolean} [suppressEvents=false]
     * Set to `true` to quietly update the value (prevents `update` event from
     * firing).
     */
    undo (count = 1, suppressEvents = false) {
      this.METADATA.applyChange('undo', ...arguments);
    }

    /**
     * @method redo
     * A function to reapply known changes. This operation affects
     * the changelog (transaction log).
     *
     * The redo operation only works after an undo operation, but before a new
     * value is committed to the transaction log. In other words, `undo -> redo`
     * will work, but `undo -> update -> redo` will not. For details, see how
     * the NGN.DATA.TransactionLog cursor system works.
     * @param {number} [OperationCount=1]
     * The number of operations to "undo". Defaults to a single operation.
     * @param {boolean} [suppressEvents=false]
     * Set to `true` to quietly update the value (prevents `update` event from
     * firing).
     */
    redo (count = 1, suppressEvents = false) {
      this.METADATA.applyChange('redo', ...arguments);
    }

    /**
     * @method load
     * Load a data record.
     * @param {object} data
     * The data to apply to the model.
     * @param {boolean} [suppressEvents=false]
     * Do not emit a change event when the data is loaded.
     */
    load (data, suppressEvents = false) {
      if (this.MAP) {
        data = this.MAP.applyMap(data);
      }

      let keys = Object.keys(data);

      for (let i = 0; i < keys.length; i++) {
        if (this.METADATA.knownFieldNames.has(keys[i])) {
          this.METADATA.fields[keys[i]].METADATA.setValue(data[keys[i]], suppressEvents);
        } else {
          NGN.WARN(`Failed to load ${keys[i]} field of ${this.name} model. "${keys[i]}" is not a recognized field.`);
        }
      }

      if (!suppressEvents) {
        this.emit('load');
      }

      return this
    }

    /**
     * @info This method only works on records within a store. If this method is
     * called on a model that is not part of a store, the model itself will be
     * returned.
     *
     * Retrieve the next record (after this one) from the store.
     * This can be used to iterate through a store by calling `model.next()`.
     * This is operation acts as a linked list iterator.
     * @param  {Number}  [count=1]
     * The number of records to retrieve. For example, `1` retrieves the next record.
     * `2` retrieves the second record after this one. A negative number will
     * automatically use the #previous method to retrieve prior records. Setting this
     * to `0` will return the current record (i.e. no change).
     * @param  {Boolean}  [cycle=false] [description]
     * If this `next` is called on the last record, it will fail. Setting `cycle` to
     * `true` will automatically restart the iteration, returning the first record in
     * the store.
     * @return {NGN.DATA.Model}
     * Returns the next model in the store (after this one.)
     */
    next (count = 1, cycle = false) {
      if (count === 0) {
        return this
      }

      if (this.METADATA.store) {
        if (typeof count === 'boolean') {
          cycle = count;
          count = 1;
        }

        return this.METADATA.store.getRecordSibling(this, count, cycle)
      } else {
        NGN.WARN('Attempted to call next() on a model that does not belong to a store.');
        return this
      }
    }

    /**
     * Retrieve the previous record (before this one) from the store.
     * This can be used to iterate through a store in reverse by calling
     * `model.previous()`. This is operation acts as a doubly linked list iterator.
     *
     * @info This method only works on records within a store. If this method is
     * called on a model that is not part of a store, the model itself will be
     * returned.
     * @param  {Number}  [count=1]
     * The number of records to retrieve. For example, `1` retrieves the prior record.
     * `2` retrieves the second record before this one. A negative number will
     * automatically use the #next method to retrieve forward records. Setting this
     * to `0` will return the current record (i.e. no change).
     * @param  {Boolean}  [cycle=false]
     * If this `next` is called on the first record, it will fail. Setting `cycle` to
     * `true` will automatically restart the iteration, returning the last record in
     * the store.
     * @return {NGN.DATA.Model}
     * Returns the previous model in the store (before this one.)
     */
    previous (count = 1, cycle = false) {
      if (count === 0) {
        return this
      }

      if (this.METADATA.store) {
        if (typeof count === 'boolean') {
          cycle = count;
          count = 1;
        }

        return this.METADATA.store.getRecordSibling(this, 0 - count, cycle)
      } else {
        NGN.WARN('Attempted to call previous() on a model that does not belong to a store.');
        return this
      }
    }

    /**
     * Remove this model from the NGN.DATA.Store it is a part of.
     *
     * @info This method only works on records within a store. If this method is
     * called on a model that is not part of a store, nothing will happen.
     */
    destroy () {
      if (this.METADATA.store) {
        this.METADATA.store.remove(this.OID);
      } else {
        NGN.WARN('Attempted to call remove() on a model that does not belong to a store.');
      }
    }
  }

  /**
   * @class NGN.DATA.Index
   * Data indexes are a data structure that improves the speed
   * of data retrieval from an NGN.DATA.Store, at the cost of
   * additional memory usage. Even though memory usage is increased
   * for each index applied to a store, it tends to be a very small
   * fraction of the memory required for storing data.
   *
   * Indexes help locate data within a store without having to read
   * every record. They will, in the overwhelming majority of cases,
   * speed up queries. However; if overused or misused, they may
   * marginally _increase_ query processing time.
   *
   * NGN data indexes were designed to be used the same way relational
   * data indexes and graph data vertices are used.
   * @fires create {Symbol}
   * Triggered when a new record is indexed. The payload (Symbol)
   * represents the NGN.DATA.Model#oid.
   * @fires delete {Symbol}
   * Triggered when a record is de-indexed. The payload (Symbol)
   * represents the NGN.DATA.Model#oid.
   * @fires update {Symbol}
   * Triggered when a record is re-indexed (updated). The payload (Symbol)
   * represents the NGN.DATA.Model#oid.
   * @fires reset
   * Triggered when the index is completely cleared/reset to it's original state.
   * @private
   */
  class NGNDataIndex extends EventEmitter { // eslint-disable-line
    /**
     * Create a new data index.
     * @param {Boolean} [BTree=false]
     * Use a B-Tree index. This is only available for numeric values and dates.
     * @param {String} [name='Untitled Index']
     * Optional name for index. This is useful for debugging when multiple
     * indexes exist.
     */
    constructor (btree = false, name = 'Untitled Index') {
      super();

      Object.defineProperties(this, {
        // Private constants
        CREATE_EVENT: NGN.privateconst(Symbol('create')),
        REMOVE_EVENT: NGN.privateconst(Symbol('delete')),
        UPDATE_EVENT: NGN.privateconst(Symbol('update')),

        // Private data attributes
        uniqueValues: NGN.privateconst(new Set()),
        knownRecords: NGN.privateconst([]), // Linked list of Sets
        name: NGN.const(name),
        isBTree: NGN.privateconst(btree)
      });

      // Bubble up private events when applicable
      const me = this;
      this.on([
        this.CREATE_EVENT,
        this.REMOVE_EVENT,
        this.UPDATE_EVENT
      ], function (oid, value, suppressEvent = false) {
        if (!suppressEvent) {
          me.emit(this.event.toString().replace(/^Symbol\(|\)$/g, ''), oid);
        }
      });

      // When all known records for a given value are removed,
      // clear the unique value index.
      this.on(this.REMOVE_EVENT, (oid, value) => {
        if (this.recordsFor(value).length === 0) {
          let index = this.indexOf(value);

          if (index >= 0) {
            this.knownRecords.splice(index, 1);
            this.uniqueValues.delete(value);
          }
        }
      });

      // Support BTree Indexing
      if (this.isBTree) {
        Object.defineProperty(this, 'BTREE', NGN.privateconst(new NGN.DATA.BTree(2, name)));
      }
    }

    get keys () {
      if (this.uniqueValues.size === 0) {
        return []
      }

      return Array.from(this.uniqueValues.values())
    }

    /**
     * Add a field/value to the index.
     * @param {any} value
     * The value of the model/record indexed field.
     * @param {Symbol} oid
     * The record's object ID (NGN.DATA.Model#OID)
     */
    add (value, oid, suppressEvent = false) {
      let valueIndex = -1;

      // Create or identify the index of the unique value
      if (!this.uniqueValues.has(value)) {
        this.uniqueValues.add(value);
        this.knownRecords.push(new Set());
        valueIndex += this.uniqueValues.size;
      } else {
        valueIndex = this.indexOf(value);
      }

      this.knownRecords[valueIndex].add(oid);

      // Add BTree indexing
      if (this.isBTree) {
        let btreeValue = value instanceof Date ? value.getTime() : value;

        if (this.BTREE.get(btreeValue) === undefined) {
          this.BTREE.put(btreeValue, valueIndex);
        }
      }

      this.emit(this.CREATE_EVENT, oid, value, suppressEvent);
    }

    /**
     * Remove a record from the index.
     * @param  {Symbol} oid
     * The record's object ID (NGN.DATA.Model#OID)
     * @param  {any} [value=undefined]
     * When specified, the field value will be used to identify
     * the index value. Specifying this value will make the remove
     * operation faster (uses introspection).
     */
    remove (oid, value, suppressEvent = false) {
      // If a value is specified, attempt to lookup the OID by value.
      if (value !== undefined) {
        let index = this.recordsOf(value);

        // If a value index is found, remove the OID
        if (index) {
          if (index.delete(oid)) { // Returns false if nothing is actually deleted.
            if (this.isBTree && (!index || index.size === 0)) {
              this.BTREE.delete(value instanceof Date ? value.getTime() : value);
            }

            this.emit(this.REMOVE_EVENT, oid, value, suppressEvent);

            return
          }
        }

        NGN.WARN(`Index value "${value}" not found in index.`);
      }

      // Iterate through all index values to remove the OID (slow)
      let removed = false;
      for (let i = 0; i < this.knownRecords.length; i++) {
        if (this.knownRecords[i].delete(oid) && !removed) {
          removed = true;
          value = Array.from(this.uniqueValues.values())[i];

          if (this.isBTree) {
            this.BTREE.delete(value instanceof Date ? value.getTime() : value);
          }

          break
        }
      }

      if (removed) {
        this.emit(this.REMOVE_EVENT, oid, value, suppressEvent);
      }
    }

    /**
     * Update an index to reflect an updated value.
     * @param  {[type]} oid      [description]
     * @param  {[type]} oldvalue [description]
     * @param  {[type]} newvalue [description]
     * @return {[type]}          [description]
     */
    update (oid, oldValue, newValue, suppressEvent = false) {
      if (oldValue !== newValue) {
        this.remove(oid, oldValue, true);
        this.add(newValue, oid, true);
        this.emit(this.UPDATE_EVENT, oid, null, suppressEvent);
      }
    }

    /**
     * Forcibly reset the index (clears everything).
     */
    reset () {
      this.uniqueValues.clear();
      this.knownRecords.splice(0);

      if (this.isBTree) {
        this.BTREE.reset();
      }

      this.emit('reset');
    }

    /**
     * Retrieve the index number of known records for the
     * specified value.
     * @private
     * @param  {any} value
     * The unique value for which records are known.
     * @return {[numeric]}
     * The 0-based index of known records. Returns `-1` if no
     * index exists.
     */
    indexOf (value) {
      return Array.from(this.uniqueValues.keys()).indexOf(value)
    }

    /**
     * The records of a particular value.
     * @private
     * @param  {any} value
     * The index field value to use as a lookup.
     * @return {Set}
     * An set of object ID's or `null` if none exist.
     */
    recordsOf (value) {
      let valueIndex = this.indexOf(value);

      return valueIndex < 0 ? null : this.knownRecords[valueIndex]
    }

    /**
     * Get the list of records for the given value.
     * @param  {any} value
     * The value of the index to lookup.
     * @return {array}
     * The array contains OID reference values (records).
     */
    recordsFor (value) {
      let index = this.recordsOf(value);

      if (index === null || index.size === 0) {
        return []
      }

      return Array.from(index.values())
    }
  }

  NGN.createException({
    name: 'NGNDuplicateRecordError',
    message: 'A duplicate record exists within the unique data set.'
  });

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
   * @fires record.update
   * Fired when a record(s) is modified. A change object
   * is provided as an argument to event handlers. The object
   * contains a reference to the store, the old record, and
   * the new record.
   *
   * ```
   * {
   *   store: <current data store>,
   *   new: <NGN.DATA.Model>,
   *   old: <NGN.DATA.Model>
   * }
   * ```
   */
  class NGNDataStore extends EventEmitter { // eslint-disable-line
    constructor (cfg = {}) {
      if (NGN.typeof(cfg) === 'model') {
        cfg = { model: cfg };
      } else if (!cfg.model || NGN.typeof(cfg.model) !== 'model') {
        throw new InvalidConfigurationError('Missing or invalid "model" configuration property.')
      }

      super();

      const me = this;

      Object.defineProperties(this, {
        /**
         * @cfgproperty {string} [name]
         * A descriptive name for the store. This is typically used for
         * debugging, logging, and (somtimes) data proxies.
         */
        name: NGN.const(NGN.coalesce(cfg.name, 'Untitled Data Store')),

        METADATA: NGN.private({
          // Holds the models/records
          records: [],

          /**
           * @cfgproperty {NGN.DATA.Model} model
           * An NGN Data Model to which data records conform.
           */
          Model: NGN.coalesce(cfg.model),

          /**
           * @cfg {boolean} [allowDuplicates=true]
           * Set to `false` to prevent duplicate records from being added.
           * If a duplicate record is added, it will be ignored and an
           * error will be thrown.
           *
           * **Identifying duplicates _may_ be slow** on data sets with 200+ records.
           * Uniqueness is determined by a checksum of the current NGN.DATA.Model#data
           * of a record. The amount of time required to generate a checksum can range
           * from 3ms to 150ms per record depending on data complexity.
           *
           * In most scenarios, the performance impact will be negligible/indistinguishable
           * to the naked eye. However; if an application experiences slow data
           * load or processing times, setting this to `false` may help.
           */
          allowDuplicates: NGN.coalesce(cfg.allowDuplicates, true),

          /**
           * @cfg {boolean} [errorOnDuplicate=false]
           * Set to `true` to throw an error when a duplicate record is detected.
           * If this is not set, it will default to the value of #allowDuplicates.
           * If #allowDuplicates is not defined either, this will be `true`
           */
          errorOnDuplicate: NGN.coalesce(cfg.errorOnDuplicate, cfg.allowDuplicates, false),

          /**
           * @cfg {boolean} [allowInvalid=true]
           * Allow invalid records to be added to the store.
           */
          allowInvalid: NGN.coalesce(cfg.allowInvalid, true),

          /**
           * @cfg {boolean} [errorOnInvalid=false]
           * Set to `true` to throw an error when an attempt is made to add an
           * invalid record.
           */
          errorOnInvalid: NGN.coalesce(cfg.errorOnInvalid, cfg.allowInvalid, false),

          /**
           * @cfgproperty {boolean} [autoRemoveExpiredRecords=true]
           * When set to `true`, the store will automatically delete expired records.
           */
          autoRemoveExpiredRecords: NGN.coalesce(cfg.autoRemoveExpiredRecords, true),

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
          softDelete: NGN.coalesce(cfg.softDelete, false),

          /**
           * @cfg {number} [softDeleteTtl=-1]
           * This is the number of milliseconds the store waits before purging a
           * soft-deleted record from memory. `-1` = Infinite (no TTL).
           */
          softDeleteTtl: NGN.coalesce(cfg.softDeleteTtl, -1),

          // ARCHIVE contains soft deleted records

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
          fifo: NGN.coalesce(cfg.FIFO, -1),

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
          lifo: NGN.coalesce(cfg.LIFO, -1),

          /**
           * @cfg {Number} [maxRecords=-1]
           * Setting this will prevent new records from being added past this limit.
           * Attempting to add a record to the store beyond it's maximum will throw
           * an error.
           */
          maxRecords: NGN.coalesce(cfg.maxRecords, -1),

          /**
           * @cfg {Number} [minRecords=0]
           * Setting this will prevent removal of records if the removal would
           * decrease the count below this limit.
           * Attempting to remove a record below the store's minimum will throw
           * an error.
           */
          minRecords: NGN.coalesce(cfg.minRecords, 0),

          /**
           * @cfg {Number} [autocompact=50000]
           * Identify the number of deletions that should occur before
           * the store is compacted. See #compact. Set this to any value
           * below `100` (the minimum) to disable autocompact.
           */
          autocompact: NGN.coalesce(cfg.autocompact, 50000),

          /**
           * @cfgproperty {object} fieldmap
           * An object mapping model attribute names to data storage field names.
           *
           * _Example_
           * ```
           * {
           *   ModelFieldName: 'inputName',
           *   father: 'dad',
           *   email: 'eml',
           *   image: 'img',
           *   displayName: 'dn',
           *   firstName: 'gn',
           *   lastName: 'sn',
           *   middleName: 'mn',
           *   gender: 'sex',
           *   dob: 'bd'
           * }
           * ```
           */
          MAP: NGN.coalesce(cfg.fieldmap),

          EVENTS: new Set([
            'record.duplicate',
            'record.create',
            'record.update',
            'record.delete',
            'record.restored',
            'record.purged',
            'record.move',
            'record.invalid',
            'record.valid',
            'clear',
            'filter.create',
            'filter.delete',
            'index.create',
            'index.delete',
            'compact.start',
            'compact.complete'
          ]),

          /**
           * @cfg {boolean} [audit=false]
           * Enable auditing to support #undo/#redo operations. This creates and
           * manages a NGN.DATA.TransactionLog.
           */
          AUDITABLE: NGN.coalesce(cfg.audit, false),
          AUDITLOG: NGN.coalesce(cfg.audit, false) ? new NGN.DATA.TransactionLog() : null,
          AUDIT_HANDLER: (change) => {
            if (change.hasOwnProperty('cursor')) {
              this.METADATA.AUDITLOG.commit(this.METADATA.getAuditMap());
            }
          },

          // The first and last indexes are maintained to determine which active
          // record is considered first/last. Sometimes data is filtered out,
          // so the first/last active record is not guaranteed to represent the
          // first/last actual record. These indexes are maintained to prevent
          // unnecessary iteration in large data sets.
          FIRSTRECORDINDEX: 0,
          LASTRECORDINDEX: 0,

          /**
           * @cfg {array} [index]
           * An array of #model fields that will be indexed.
           * See NGN.DATA.Index for details.
           */
          INDEX: null
        }),

        // Internal attributes that should not be extended.
        PRIVATE: NGN.privateconst({
          STUB: Symbol('record.stub'),

          // A private indexing method
          INDEX: function (record, delta) {
            if (typeof this.event === 'symbol') {
              switch (this.event) {
                case me.PRIVATE.EVENT.CREATE_RECORD:
                  me.METADATA.INDEXFIELDS.forEach(field => me.METADATA.INDEX[field].add(record[field], record.OID));
                  break

                case me.PRIVATE.EVENT.DELETE_RECORD:
                  me.METADATA.INDEXFIELDS.forEach(field => me.METADATA.INDEX[field].remove(record.OID, record[field]));
                  break

                case me.PRIVATE.EVENT.LOAD_RECORDS:
                  for (let i = 0; i < me.METADATA.records.length; i++) {
                    me.METADATA.INDEXFIELDS.forEach(field => me.METADATA.INDEX[field].add(me.METADATA.records[i][field], me.METADATA.records[i].OID));
                  }

                  break

                case me.PRIVATE.EVENT.DELETE_RECORD_FIELD:
                  if (me.METADATA.INDEXFIELDS.has(record.field.name)) {
                    me.METADATA.INDEX[record.field.name].remove(record.record.OID, record.field.value);
                  }

                  break
              }
            } else {
              switch (this.event) {
                case 'record.update':
                  if (me.METADATA.INDEXFIELDS.has(delta.field.name)) {
                    me.METADATA.INDEX[delta.field.name].update(record.OID, delta.old, delta.new);
                  }
                  break

                case 'clear':
                  me.METADATA.INDEXFIELDS.forEach(field => me.METADATA.INDEX[field].reset());
                  break
              }
            }
          },

          // Contains a map of all records
          RECORDMAP: new Map(),

          // A reference to active records
          ACTIVERECORDMAP: null,

          // A reference to filtered records (non-active/non-deleted)
          FILTEREDRECORDMAP: null,

          // Internal events
          EVENT: {
            CREATE_RECORD: Symbol('record.create'),
            DELETE_RECORD: Symbol('record.delete'),
            DELETE_RECORD_FIELD: Symbol('records.field.delete'),
            LOAD_RECORDS: Symbol('records.load')
          },

          // Makes sure the model configuration specifies a valid and indexable field.
          checkModelIndexField: (field) => {
            let metaconfig = this.METADATA.Model.prototype.CONFIGURATION;

            if (metaconfig.fields && metaconfig.fields.hasOwnProperty(field)) {
              if (metaconfig.fields[field] !== null) {
                if (['model', 'store', 'entity', 'function'].indexOf(NGN.typeof(metaconfig.fields[field])) >= 0) {
                  throw new Error(`Cannot create index for "${field}" field. Only basic NGN.DATA.Field types can be indexed. Relationship and virtual fields cannot be indexed.`)
                } else if (NGN.typeof(metaconfig.fields[field]) === 'object') {
                  if (['model', 'store', 'entity', 'function'].indexOf(NGN.typeof(NGN.coalesce(metaconfig.fields[field].type))) >= 0) {
                    throw new Error(`Cannot create index for "${field}" field. Only basic NGN.DATA.Field types can be indexed. Relationship and virtual fields cannot be indexed.`)
                  }
                }
              }
            } else {
              throw new Error(`Cannot create index for unrecognized field "${field}".`)
            }
          },

          // Get the type of field from the model definition
          getModelFieldType: (field) => {
            let metaconfig = this.METADATA.Model.prototype.CONFIGURATION;

            if (metaconfig.fields[field] === null) {
              return NGN.typeof(metaconfig.fields[field])
            }

            if (metaconfig.fields[field].type) {
              return NGN.typeof(metaconfig.fields[field].type)
            }

            if (metaconfig.fields[field].default) {
              return NGN.typeof(metaconfig.fields[field].default)
            }

            return NGN.typeof(NGN.coalesce(metaconfig.fields[field]))
          },

          // Add a record
          addRecord: (data, suppressEvents = false) => {
            const record = new me.METADATA.Model(data);

            if (!(record instanceof NGN.DATA.Entity)) {
              throw new Error(`Only a NGN.DATA.Model or JSON object may be used in NGN.DATA.Store#add. Received a "${NGN.typeof(data)}" value.`)
            }

            // Prevent invalid record addition (if configured)
            if (!me.METADATA.allowInvalid && !record.valid) {
              NGN.WARN(`An attempt to add invalid data to the "${this.name}" store was prevented. The following fields are invalid: ${Array.from(record.METADATA.invalidFieldNames.keys()).join(', ')}`);

              if (!suppressEvents) {
                this.emit('record.invalid', record);
              }

              if (this.METADATA.errorOnInvalid) {
                throw new Error(`Invalid data cannot be added to the "${this.name}" store.`)
              }
            }

            // If duplicates are prevented, check the new data.
            if (!me.METADATA.allowDuplicates) {
              for (let i = 0; i < this.METADATA.records.length; i++) {
                if (this.METADATA.records[i].checksum === record.checksum) {
                  NGN.WARN(`An attempt to add a duplicate record to the "${this.name}" store was prevented.`);

                  if (!suppressEvents) {
                    this.emit('record.duplicate', record);
                  }

                  if (this.METADATA.errorOnDuplicate) {
                    throw new Error(`Duplicate records are not allowed in the "${this.name}" data store.`)
                  }

                  break
                }
              }
            }

            // Handle special record count processing (LIFO/FIFO support)
            if (me.METADATA.lifo > 0 && me.METADATA.records.length + 1 > me.METADATA.lifo) {
              me.remove(me.METADATA.records.length - 1, suppressEvents);
            } else if (this.METADATA.fifo > 0 && me.METADATA.records.length + 1 > me.METADATA.fifo) {
              me.remove(0, suppressEvents);
            }

            // Relay model events to this store.
            // record.relay('*', this, 'record.')
            record.on('*', function () {
              switch (this.event) {
                // case 'field.update':
                // case 'field.delete':
                //   // TODO: Update indices
                //   return

                case 'field.invalid':
                case 'field.valid':
                  return me.emit(this.event.replace('field.', 'record.'), record)

                case 'expired':
                  // TODO: Handle expiration
              }
            });

            delete record.METADATA.store;
            Object.defineProperty(record.METADATA, 'store', NGN.get(() => me));

            // Indexing is handled in an internal event handler
            me.METADATA.records.push(record);

            // Add the record to the map for efficient retrievel by OID
            me.PRIVATE.RECORDMAP.set(record.OID, me.METADATA.records.length - 1);

            return record
          },

          convertStubToRecord: (index, record) => {
            if (record.hasOwnProperty(this.PRIVATE.STUB)) {
              let newRecord = this.PRIVATE.addRecord(record.metadata, false);
              newRecord.OID = record.OID;

              this.METADATA.records[index] = newRecord;

              return newRecord
            } else {
              return record
            }
          }
        }),

        // Create a convenience alias for the remove method.
        delete: NGN.const(NGN.deprecate(this.remove, 'Store.delete is deprecated. Use Store.remove instead.'))
      });

      // Create a smart reference to record lists
      Object.defineProperties(this.PRIVATE, {
        ACTIVERECORDS: NGN.get(() => {
          if (this.PRIVATE.ACTIVERECORDMAP === null) {
            return this.PRIVATE.RECORDMAP
          }

          return this.PRIVATE.ACTIVERECORDMAP
        }),

        FILTEREDRECORDS: NGN.get(() => {
          if (this.PRIVATE.FILTEREDRECORDMAP === null) {
            return this.PRIVATE.RECORDMAP
          }

          return this.PRIVATE.FILTEREDRECORDMAP
        })
      });

      // Disallow modification of internal events
      Object.freeze(this.PRIVATE.EVENT);

      // Support LIFO (Last In First Out) & FIFO(First In First Out)
      if (this.METADATA.lifo > 0 && this.METADATA.fifo > 0) {
        throw new InvalidConfigurationError('NGN.DATA.Store can be configured to use FIFO or LIFO, but not both simultaneously.')
      }

      // If LIFO/FIFO is used, disable alternative record count limitations.
      if (this.METADATA.lifo > 0 || this.METADATA.fifo > 0) {
        this.METADATA.minRecords = 0;
        this.METADATA.maxRecords = -1;
      } else {
        this.METADATA.minRecords = this.METADATA.minRecords < 0 ? 0 : this.METADATA.minRecords;
      }

      // Bubble events to the BUS
      // this.relay('*', NGN.BUS, 'store.')

      // Configure Indices
      if (NGN.coalesce(cfg.index) && NGN.typeof(this.METADATA.Model.prototype.CONFIGURATION.fields) === 'object') {
        this.createIndex(cfg.index);
      }

      // Setup auto-compact
      if (this.METADATA.autocompact < 100) {
        this.METADATA.DELETECOUNT = 0;
        this.on(this.PRIVATE.EVENTS.DELETE_RECORD, () => {
          this.METADATA.DELETECOUNT++;

          if (this.METADATA >= this.METADATA.autocompact) {
            this.METADATA.DELETECOUNT = 0;
            this.compact();
          }
        });
      }
    }

    /**
     * @property {array} snapshots
     * Contains the data snapshot of the entire store.
     * @readonly
     * @private
     */
    get snapshots () {
      return NGN.coalesce(this.snapshotarchive, [])
    }

    // Deprecation notice
    get history () {
      NGN.WARN('history is deprecated. Use NGN.DATA.Store#changelog instead.');
      return this.changelog
    }

    // Deprecation notice
    get recordCount () {
      NGN.WARN('recordCount is deprecated. Use NGN.DATA.Store#size instead.');
      return this.size
    }

    /**
     * @property {number} count
     * The total number of **active** records contained in the store.
     * Active records are any records that aren't filtered out.
     */
    get size () {
      return this.PRIVATE.ACTIVERECORDS.size
    }

    /**
     * @property {number} length
     * The total number of records contained in the store.
     * This value does not include any soft-deleted/volatile records.
     */
    get length () {
      return this.METADATA.records.length
    }

    /**
     * @property {NGN.DATA.Model} first
     * Return the first active record in the store. Returns `null`
     * if the store is empty.
     */
    get first () {
      let record = NGN.coalesce(this.METADATA.records[this.METADATA.FIRSTRECORDINDEX]);

      return this.PRIVATE.convertStubToRecord(this.METADATA.FIRSTRECORDINDEX, record)
      // return NGN.coalesce(this.METADATA.records[this.METADATA.FIRSTRECORDINDEX])
    }

    /**
     * @property {NGN.DATA.Model} last
     * Return the last active record in the store. Returns `null`
     * if the store is empty.
     */
    get last () {
      let record = NGN.coalesce(this.METADATA.records[this.METADATA.LASTRECORDINDEX]);

      return this.PRIVATE.convertStubToRecord(this.METADATA.LASTRECORDINDEX, record)
    }

    /**
     * @property {object} data
     * A serialized version of the data represented by the store. This
     * only includes non-virtual fields. See #representation to use
     * a representation of data containing virtual fields.
     */
    get data () {
      const recordList = this.PRIVATE.ACTIVERECORDS;

      // If no records exist, skip
      if (recordList.size === 0) {
        return []
      }

      let rec = this.PRIVATE.convertStubToRecord(this.METADATA.FIRSTRECORDINDEX, this.METADATA.records[this.METADATA.FIRSTRECORDINDEX]);

      if (this.METADATA.MAP === null) {
        this.METADATA.MAP = NGN.coalesce(rec.MAP);
      }

      let defaults = null;

      if (rec instanceof NGN.DATA.Entity) {
        let fieldDefinitions = rec.fieldDefinitions;
        let fields = Object.keys(fieldDefinitions);

        defaults = {};

        fields.forEach(field => {
          if (!fieldDefinitions[field].hidden && !fieldDefinitions[field].virtual) {
            defaults[field] = fieldDefinitions[field].default;
          }
        });
      }

      const result = [];
      // const fields = defaults !== null ? Object.keys(defaults) : []

      // Iterate through set
      recordList.forEach(index => {
        if (this.METADATA.records[index] !== null) {
          // If the value is a stub, map it.
          if (this.METADATA.records[index].hasOwnProperty(this.PRIVATE.STUB)) {
            let applicableData = Object.assign({}, defaults);
            let data = Object.assign(applicableData, this.METADATA.records[index].metadata);

            if (this.METADATA.MAP !== null) {
              result.push(this.METADATA.MAP.applyInverseMap(data));
            } else {
              result.push(data);
            }
          } else {
            result.push(this.METADATA.records[index].data);
          }
        }
      });

      return result
    }

    /**
     * @property {array} representation
     * The complete and unfiltered underlying representation dataset
     * (data + virtuals of each model).
     */
    get representation () {
      const result = [];
      const recordList = this.PRIVATE.ACTIVERECORDS;

      recordList.forEach(index => {
        if (this.METADATA.records[index] !== null) {
          result.push(this.METADATA.records[index].representation);
        }
      });

      return result
    }

    get auditable () {
      return this.METADATA.AUDITABLE
    }

    set auditable (value) {
      value = NGN.forceBoolean(value);

      if (value !== this.METADATA.AUDITABLE) {
        this.METADATA.AUDITABLE = value;
        this.METADATA.AUDITLOG = value ? new NGN.DATA.TransactionLog() : null;
      }
    }

    get model () {
      return this.METADATA.Model
    }

    // set model (value) {
    //   if (value !== this.METADATA.Model) {
    //     if (NGN.typeof(value) !== 'model') {
    //       throw new InvalidConfigurationError(`"${this.name}" model could not be set because the value is a ${NGN.typeof(value)} type (requires NGN.DATA.Model).`)
    //     }
    //
    //     this.METADATA.Model = value
    //   }
    // }

    get map () {
      return this.METADATA.MAP
    }

    /**
     * @property {array} indexedFieldNames
     * An array of the field names for which the store maintains indexes.
     */
    get indexedFieldNames () {
      if (this.METADATA.INDEXFIELDS) {
        return Array.from(this.METADATA.INDEXFIELDS)
      } else {
        return []
      }
    }

    /**
     * @method add
     * Append a data record to the store. This adds the record to the end of the list.
     * @param {NGN.DATA.Model|object} data
     * Accepts an existing NGN Data Model or a JSON object.
     * If a JSON object is supplied, it will be applied to
     * the data model specified in #model.
     * @param {boolean} [suppressEvents=false]
     * Set this to `true` to prevent the `record.create` event
     * from firing.
     * @return {NGN.DATA.Model}
     * Returns the new record.
     */
    add (data, suppressEvents = false) {
      // Support array input
      if (NGN.typeof(data) === 'array') {
        let result = new Array(data.length);

        for (let i = 0; i < data.length; i++) {
          result[i] = this.add(data[i], suppressEvents);
        }

        return result
      }

      // Prevent creation if it will exceed maximum record count.
      if (this.METADATA.maxRecords > 0 && this.METADATA.records.length + 1 > this.METADATA.maxRecords) {
        throw new Error('Maximum record count exceeded.')
      }

      if (!(data instanceof this.METADATA.Model)) {
        // Force a data model
        if (NGN.typeof(data) === 'string') {
          data = JSON.parse(data);
        }

        if (typeof data !== 'object') {
          throw new Error(`${NGN.typeof(data)} is an invalid data type (must be an object conforming to the ${this.METADATA.Model.name} field configuration).`)
        }
      } else {
        data = data.data;
      }

      const record = this.PRIVATE.addRecord(data);

      // TODO: Apply filters to new record before identifying the last record.
      this.METADATA.LASTRECORDINDEX = this.METADATA.records.length - 1;

      this.emit(this.PRIVATE.EVENT.CREATE_RECORD, record);

      if (!suppressEvents) {
        this.emit('record.create', record);
      }

      return record
    }

    /**
     * @method remove
     * Remove a record.
     * @param {NGN.DATA.Model|number|Symbol} record
     * Accepts an existing NGN Data Model or index number.
     * Using a model is slower than using an index number.
     * This may also be the NGN.DATA.Model#OID value (for
     * advanced use cases).
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
    remove (record, suppressEvents = false) {
      // Short-circuit processing if there are no records.
      if (this.METADATA.records.length === 0) {
        NGN.INFO(`"${this.name}" store called remove(), but the store contains no records.`);
        return
      }

      // Support removal of simultaneously removing multiple records
      if (NGN.typeof(record) === 'array') {
        let result = new Array(record.length);

        for (let i = 0; i < record.length; i++) {
          result[i] = this.remove(record[i]);
        }

        return result
      }

      // Prevent removal if it will exceed minimum record count.
      if (this.minRecords > 0 && this.METADATA.records.length - 1 < this.minRecords) {
        throw new Error('Removing this record would violate the minimum record count.')
      }

      // Identify which record will be removed.
      let index;

      switch (NGN.typeof(record)) {
        case 'number':
          if (record < 0 || !this.METADATA.records[record]) {
            NGN.ERROR(`Record removal failed (record not found at index ${(record || 'undefined').toString()}).`);
            return null
          }

          index = record;

          break

        // The default case comes before the symbol case specifically
        // so the record can be converted to an OID value (for use with
        // the RECORDMAP lookup).
        default:
          if (!(record instanceof NGN.DATA.Entity)) {
            NGN.ERROR('Invalid record value passed to Store.remove() method.');
            return null
          }

          record = record.OID;

        case 'symbol': // eslint-disable-line no-fallthrough
          index = this.PRIVATE.ACTIVERECORDS.get(record);

          if (index < 0) {
            NGN.ERROR(`Record removal failed. Record OID not found ("${record.toString()}").`);
            return null
          }

          break
      }

      // If nothing has been deleted yet, create an active record map.
      // The active record map contains Model OID values with a reference
      // to the actual record index.
      if (this.PRIVATE.ACTIVERECORDMAP === null) {
        // Copy the record map to initialize the active records
        this.PRIVATE.ACTIVERECORDMAP = new Map(this.PRIVATE.RECORDMAP);
      }

      // Identify the record to be removed.
      const removedRecord = this.METADATA.records[index];

      // If the record isn't among the active records, do not remove it.
      if (removedRecord === null) {
        NGN.WARN('Specified record does not exist.');
        return null
      }

      let activeIndex = this.PRIVATE.ACTIVERECORDS.get(removedRecord.OID);

      if (isNaN(activeIndex)) {
        NGN.WARN(`Record not found for "${removedRecord.OID.toString()}".`);
        return null
      }

      this.PRIVATE.ACTIVERECORDS.delete(removedRecord.OID);

      // If the store is configured to soft-delete,
      // don't actually remove it until it expires.
      if (this.METADATA.softDelete) {
        if (this.METADATA.softDeleteTtl >= 0) {
          removedRecord.once('expired', () => {
            this.METADATA.records[this.PRIVATE.RECORDMAP.get(removedRecord.OID)] = null;
            this.PRIVATE.RECORDMAP.delete(removedRecord.OID);

            if (!suppressEvents) {
              this.emit('record.purge', removedRecord);
            }
          });

          removedRecord.expires = this.METADATA.softDeleteTtl;
        }
      } else {
        this.METADATA.records[this.PRIVATE.RECORDMAP.get(removedRecord.OID)] = null;
        this.PRIVATE.RECORDMAP.delete(removedRecord.OID);
      }

      // Update cursor indexes (to quickly reference first and last active records)
      if (this.METADATA.LASTRECORDINDEX === activeIndex) {
        if (this.PRIVATE.ACTIVERECORDS.size <= 1) {
          this.METADATA.LASTRECORDINDEX = this.PRIVATE.ACTIVERECORDS.values().next().value;
          this.METADATA.FIRSTRECORDINDEX = this.METADATA.LASTRECORDINDEX;
        } else if (activeIndex !== 0) {
          for (let i = (activeIndex - 1); i >= 0; i--) {
            if (i === 0) {
              this.METADATA.LASTRECORDINDEX = 0;
              break
            }

            const examinedRecord = this.METADATA.records[i];

            if (examinedRecord !== null) {
              if (this.PRIVATE.ACTIVERECORDS.has(examinedRecord.OID)) {
                this.METADATA.LASTRECORDINDEX = this.PRIVATE.ACTIVERECORDS.get(examinedRecord.OID);
                break
              }
            }
          }
        }
      } else if (this.METADATA.FIRSTRECORDINDEX === activeIndex) {
        let totalSize = this.PRIVATE.ACTIVERECORDS.size;

        for (let i = (activeIndex + 1); i < totalSize; i++) {
          const examinedRecord = this.METADATA.records[i];

          if (examinedRecord !== null) {
            if (this.PRIVATE.ACTIVERECORDS.has(examinedRecord.OID)) {
              this.METADATA.FIRSTRECORDINDEX = this.PRIVATE.ACTIVERECORDS.get(examinedRecord.OID);
              break
            }
          }
        }
      }

      this.emit(this.PRIVATE.EVENT.DELETE_RECORD, removedRecord);

      if (!suppressEvents) {
        this.emit('record.delete', removedRecord);
      }

      return removedRecord
    }

    /**
     * Create a new index on the store.
     * @param  {string} field
     * The name of the field to index.
     * @fires index.create
     * Triggered when an index is created. The name of field is passed
     * as the only argument.
     */
    createIndex (field) {
      // Support multiple indexes
      if (NGN.typeof(field) === 'array') {
        for (let i = 0; i < field.length; i++) {
          this.createIndex(field[i]);
        }

        return
      }

      // Make sure index fields are known to the store
      if (!this.METADATA.INDEXFIELDS) {
        this.METADATA.INDEXFIELDS = new Set();

        // this.on('record.*', this.PRIVATE.INDEX)
        this.on([
          this.PRIVATE.EVENT.CREATE_RECORD,
          this.PRIVATE.EVENT.DELETE_RECORD,
          this.PRIVATE.EVENT.LOAD_RECORDS,
          this.PRIVATE.EVENT.DELETE_RECORD_FIELD,
          'clear'
        ], this.PRIVATE.INDEX);
      }

      // In an index already exists, ignore it.
      if (this.METADATA.INDEXFIELDS.has(field)) {
        return
      }

      // Guarantee the existance of the index list
      this.METADATA.INDEX = NGN.coalesce(this.METADATA.INDEX, {});

      this.PRIVATE.checkModelIndexField(field);

      this.METADATA.INDEXFIELDS.add(field);

      // Identify BTree
      let btree = ['number', 'date'].indexOf(this.PRIVATE.getModelFieldType(field)) >= 0;

      this.METADATA.INDEX[field] = new NGN.DATA.Index(btree, `${field.toUpperCase()} ${btree ? 'BTREE ' : ''}INDEX`);

      // Apply to any existing records
      if (this.METADATA.records.length > 0) {
        this.PRIVATE.INDEX.apply({ event: this.PRIVATE.EVENT.LOAD_RECORDS });
      }

      this.emit('index.created', field);
    }

    /**
     * Remove an existing index from the store.
     * @param  {string} [field=null]
     * The name of the indexed field. Set this to `null` (or leave blank) to
     * remove all existing indexes.
     * @fires index.delete
     * Triggered when an index is removed. The name of field is passed
     * as the only argument.
     */
    removeIndex (field = null) {
      if (!this.METADATA.INDEXFIELDS) {
        return
      }

      if (NGN.coalesce(field) === null) {
        field = this.indexedFieldNames;
      }

      // Support multiple indexes
      if (NGN.typeof(field) === 'array') {
        for (let i = 0; i < field.length; i++) {
          this.removeIndex(field[i]);
        }

        return
      }

      // Remove the specific index.
      this.METADATA.INDEXFIELDS.delete(field);
      delete this.METADATA.INDEX[field];
      this.emit('index.delete', field);

      // When there are no more indexes, clear out event
      // listeners and fields.
      if (this.METADATA.INDEXFIELDS.size === 0) {
        this.METADATA.INDEX = null;
        delete this.METADATA.INDEXFIELDS;

        this.off([
          this.PRIVATE.EVENT.CREATE_RECORD,
          this.PRIVATE.EVENT.DELETE_RECORD,
          this.PRIVATE.EVENT.LOAD_RECORDS,
          this.PRIVATE.EVENT.DELETE_RECORD_FIELD
        ], this.PRIVATE.INDEX);
      }
    }

    /**
     * Retrieve a record based on it's relative position to another
     * record. This method is used by NGN.DATA.Model#next and NGN.DATA.Model#previous
     * to support "doubly linked list" approach to record iteration.
     * @param  {[type]}  currentRecord [description]
     * @param  {Number}  [count=1]     [description]
     * @param  {Boolean} [cycle=false] [description]
     * @return {[type]}                [description]
     */
    getRecordSibling (currentRecord, count = 1, cycle = false) {
      let size = this.size;

      if (size === 0) {
        NGN.WARN('Attempted to execute getRecordSibling with no active records.');
        return null
      }

      // Make sure the iterator fits within the range
      if (Math.abs(count) > size) {
        count = count % size;
      }

      if (size === 1 || count === 0) {
        return currentRecord
      }

      let ActiveRecords = Array.from(this.PRIVATE.ACTIVERECORDS);
      let currentIndex = ActiveRecords.findIndex(item => currentRecord.OID === item[0]);

      if (currentIndex < 0) {
        throw new Error('Record not found.')
      }

      currentIndex += count;

      // Support cycling through records.
      if ((currentIndex >= ActiveRecords.length || currentIndex < 0) && cycle) {
        // Cycle forwards
        if (count > 0) {
          currentIndex = currentIndex % ActiveRecords.length;
        } else {
          // Cycle Backwards
          currentIndex = ActiveRecords.length - Math.abs(currentIndex);
        }
      }

      if (currentIndex < 0 || currentIndex >= ActiveRecords.length) {
        return null
      }

      return this.METADATA.records[ActiveRecords[currentIndex][1]]
    }

    /**
     * Returns the index number of the model. If the same
     * model exists more than once (duplicate records), only
     * the first index is returned.
     * @param  {NGN.DATA.Model} model
     * The model/record to retrieve an index number for.
     * @return {number}
     * The zero-based index number of the model.
     */
    indexOf (record) {
      return this.PRIVATE.RECORDMAP.get(record.OID)
    }

    /**
     * Determine whether the store contains a record.
     * This only checks the active record set (ignores filtered records).
     * @param  {NGN.DATA.Model} record
     * The record to test for inclusion.
     * @return {boolean}
     */
    contains (record) {
      return this.PRIVATE.ACTIVERECORDS.has(record.OID)
    }

    /**
     * Get the list of records for the given value.
     * @param {string} fieldName
     * The name of the indexed field.
     * @param  {any} fieldValue
     * The value of the index field. This is used to lookup
     * the list of records/models whose field is equal to
     * the specified value.
     * @return {NGN.DATA.Model[]}
     * Returns an array of models/records within the index for
     * the given value.
     */
    getIndexRecords (field, value) {
      if (this.METADATA.INDEX && this.METADATA.INDEX.hasOwnProperty(field)) {
        let oid = this.METADATA.INDEX[field].recordsFor(value);
        let result = new Array(oid.length);

        for (let i = 0; i < oid.length; i++) {
          result[i] = this.METADATA.records[this.PRIVATE.RECORDMAP.get(oid[i])];
        }

        return result
      }

      return []
    }

    /**
     * Retrieve an active record by index number (0-based, similar to an array).
     * @param  {number} [index=0]
     * The index of the record to retrieve.
     */
    getRecord (index = 0) {
      if (typeof index === 'symbol') {
        index = this.PRIVATE.ACTIVERECORDS.get(index);
      }

      if (index < 0) {
        NGN.WARN('Cannot retrieve a record for a negative index.');
        return null
      }

      if (index >= this.PRIVATE.ACTIVERECORDS.size) {
        NGN.WARN('Cannot retrieve a record for an out-of-scope index (index greater than total record count.)');
        return null
      }

      return this.METADATA.records[Array.from(this.PRIVATE.ACTIVERECORDS)[index][1]]
    }

    /**
     * @method clear
     * Removes all data. If auditing is enabled, the transaction log is reset.
     * @param {boolean} [purgeSoftDelete=true]
     * Purge soft deleted records from memory.
     * @param {boolean} [suppressEvents=false]
     * Set to `true` to prevent events from triggering when this method is run.
     * @fires clear
     * Fired when all data is removed
     */
    clear (purge = true, suppressEvents = false) {
      if (this.METADATA.ARCHIVE) {
        if (!purge) {
          this.METADATA.ARCHIVE = this.records;
        } else {
          delete this.METADATA.ARCHIVE;
        }
      }

      this.METADATA.records = [];
      this.PRIVATE.RECORDMAP = new Map();
      this.PRIVATE.ACTIVERECORDMAP = null;
      this.PRIVATE.FILTEREDRECORDMAP = null;
      this.METADATA.LASTRECORDINDEX = 0;
      this.METADATA.FIRSTRECORDINDEX = 0;

      if (this.METADATA.AUDITABLE) {
        this.METADATA.AUDITLOG.reset();
      }

      // Indexes updated automatically (listening for 'clear' event)

      if (!suppressEvents) {
        this.emit('clear');
      }
    }

    /**
     * A special method to clear events from the underlying event emitter.
     * This exists because #clear has a special meaning in a data store (removing
     * all data records vs removing all events).
     * @private
     */
    clearEvents () {
      super.clear(...arguments);
    }

    /**
     * Replace a model.
     * @deprecated 2.0.0
     * @param  {NGN.DATA.Model} newModel
     * The new model.
     */
    replaceModel (newModel) {
      NGN.deprecate(
        () => { this.model = newModel; },
        'replaceModel has been deprected. Set the model directly instead.'
      );
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
     * @fires snapshot
     * Triggered when a new snapshot is created. The snapshot dataset is
     * passed as the only argument to event handlers.
     * @returns {object}
     * Returns an object containing the following fields:
     *
     * ```js
     * {
     *   timestamp: 'ex: 2018-01-19T16:43:03.279Z',
     *   checksum: 'snapshotchecksum',
     *   modelChecksums: [
     *     'record1_checksum',
     *     'record2_checksum'
     *   ],
     *   data: { ... } // Actual data at the time of the snapshot
     * }
     * ```
     */
    snapshot () {
      this.METADATA.snapshotarchive = NGN.coalesce(this.METADATA.snapshotarchive, []);

      let data = this.data;
      let dataset = {
        id: NGN.DATA.UTILITY.GUID(),
        timestamp: (new Date()).toISOString(),
        checksum: NGN.DATA.UTILITY.checksum(JSON.stringify(data)).toString(),
        modelChecksums: this.data.map((item) => {
          return NGN.DATA.UTILITY.checksum(JSON.stringify(item)).toString()
        }),
        data: data
      };

      this.METADATA.snapshotarchive.unshift(dataset);
      this.emit('snapshot', dataset);

      return dataset
    }

    /**
     * @method clearSnapshots
     * Remove all archived snapshots.
     */
    clearSnapshots () {
      this.snapshotarchive = null;
    }

    load (data) {
      console.time('load');
      let insertableData;

      // Guarantee unique records amongst only the new records
      if (!this.METADATA.allowDuplicates) {
        let uniqueValues = new Set();

        insertableData = [];

        for (let i = 0; i < data.length; i++) {
          if (!uniqueValues.has(JSON.stringify(data[i]))) {
            uniqueValues.add(JSON.stringify(data[i]));
            insertableData.push(data[i]);
          } else if (this.METADATA.errorOnDuplicate) {
            throw new NGNDuplicateRecordError()
          }
        }
      } else {
        insertableData = data;
      }

      let newRecordCount = insertableData.length + this.METADATA.records.length;

      // Don't exceed the maximum record count if it exists.
      if (this.METADATA.maxRecords > 0 && newRecordCount > this.METADATA.maxRecords) {
        throw new Error('Maximum record count exceeded.')
      }

      if (newRecordCount > 4000000) {
        throw new Error('Maximum load size exceeded. A store may contain a maximum of 4M records.')
      }

      for (let i = 0; i < insertableData.length; i++) {
        let oid = Symbol('model.id');
        this.METADATA.records.push({
          [this.PRIVATE.STUB]: true,
          OID: oid,
          metadata: insertableData[i]
        });

        // Add the record to the map for efficient retrievel by OID
        this.PRIVATE.RECORDMAP.set(oid, this.METADATA.records.length - 1);
      }

      // TODO: Apply filters to new record before identifying the last record.
      this.METADATA.LASTRECORDINDEX = this.METADATA.records.length - 1;

      // this.emit(this.PRIVATE.EVENT.LOAD_RECORDS)
    }

    /**
     * This rebuilds the local index of records, removing any dead records.
     * While deleted records are destroyed (in accordance to #softDeleteTtl),
     * the active record table contains a `null` or `undefined` value for each
     * deleted/dead record. This method removes such records, akin in nature to
     * the common JavaScript garbage collection process.
     *
     * This method almost never needs to be run, since stores
     * attempt to manage this process for themselves automatically. However; if
     * large volume deletions occur rapidly (50K+), it's possible (though not assured)
     * performance could be negatively impacted. Compacting the store can
     * improve performance in these cases. However; running this too often or
     * excessively may degrade performance since it is essentially rewriting
     * the store data each time.
     *
     * When in doubt, *don't* use this method.
     * @info This method will not run when fewer than 100 cumulative records have
     * existed in the store, due to the inefficient nature at such low volume.
     * @fires compact.start
     * Triggered when the compact process begins.
     * @fires compact.complete
     * Triggered when the compact process completes.
     */
    compact () {
      this.emit('compact.start');

      if (this.METADATA.records.length < 100) {
        this.emit('compact.complete');

        if (this.METADATA.records.length !== 0) {
          NGN.WARN(`compact() called on ${this.name} with fewer than 100 elements.`);
        }

        return
      }

      let ranges = [];
      let currentRange = [];
      let empty = 0;

      // Identify null ranges (dead records)
      for (let i = 0; i < this.METADATA.records.length; i++) {
        if (this.METADATA.records[i] === null) {
          empty++;

          if (currentRange.length === 0) {
            currentRange.push(i);
          }
        } else {
          // Identify new index values for remaining records
          if (empty > 0) {
            this.PRIVATE.RECORDMAP.set(this.METADATA.records[i].OID, i - empty);

            if (this.METADATA.FIRSTRECORDINDEX === i) {
              this.METADATA.FIRSTRECORDINDEX = i - empty;
            }

            if (this.METADATA.LASTRECORDINDEX === i) {
              this.METADATA.LASTRECORDINDEX = i - empty;
            }
          }

          if (currentRange.length === 1) {
            currentRange.push(i - 1);
            ranges.push(currentRange);
            currentRange = [];
          }
        }
      }

      // Clear null ranges
      empty = 0;
      while (ranges.length > 0) {
        this.METADATA.records.splice(ranges[0][0] - empty, ranges[0][1] - ranges[0][0] + 1);
        empty += ranges[0][1] - ranges[0][0] + 1;
        ranges.shift();
      }

      // Reset the active record map
      this.PRIVATE.ACTIVERECORDMAP = null;

      this.emit('compact.complete');
    }

    /**
     * Performs executes the callback method on each active record
     * within the store. For example:
     *
     * ```js
     * Store.forEach(function (record) {
     *   // Do Something
     * })
     * ```
     * @param  {Function} callback
     * The callback method is applied to each record.
     */
    forEach (fn) {
      if (!NGN.isFn(fn)) {
        throw new Error(`A ${NGN.typeof(fn)} was applied to ${this.name}'s each() method when a function was expected.`)
      }

      this.PRIVATE.ACTIVERECORDS.forEach((value, key, map) => {
        fn(this.METADATA.records[value]);
      });
    }
  }

  const Model = function (cfg) {
    if (NGN.typeof(cfg) !== 'object') {
      throw new Error('Model must be configured.')
    }

    let Model = function (data, suppressEvents = false) {
      let Entity = new NGN.DATA.Entity(cfg);

      if (data) {
        Entity.load(data, suppressEvents);
      }

      return Entity
    };

    Object.defineProperty(Model.prototype, 'CONFIGURATION', NGN.const(cfg));

    return Model
  };

  const util = NGN.deprecate(Utility$1, 'NGN.DATA.util is now NGN.DATA.UTILITY');

  var Data = /*#__PURE__*/Object.freeze({
    UTILITY: Utility$1,
    util: util,
    TransactionLog: NGNTransactionLog,
    Rule: NGNDataValidationRule,
    RangeRule: NGNDataRangeValidationRule,
    Field: NGNDataField,
    VirtualField: NGNVirtualDataField,
    Relationship: NGNRelationshipField,
    FieldMap: NGNDataFieldMap,
    Model: Model,
    Entity: NGNDataEntity,
    Index: NGNDataIndex,
    Store: NGNDataStore,
    BTree: Tree,
    JSONSchema: NGNJSONSchema
  });

  // Add Event Emitter Class & Global Event Bus
  NGN$1.extend('EventEmitter', NGN$1.public(EventEmitter));
  NGN$1.extend('BUS', NGN$1.const(new NGN$1.EventEmitter()));

  // Add Queuing System
  NGN$1.extend('Task', NGN$1.const(QueueItem));
  NGN$1.extend('Queue', NGN$1.const(Queue));
  NGN$1.extend('Tasks', NGN$1.deprecate(NGN$1.Queue, 'NGN.Tasks is now NGN.Queue'));

  // Add Networking
  NGN$1.extend('NET', NGN$1.const(Library));

  // Add Utilities
  NGN$1.extend('UTILITY', NGN$1.const(Utility));

  // Add Data Library
  NGN$1.extend('DATA', NGN$1.const(Data));

}());
//# sourceMappingURL=ngn.js.map
