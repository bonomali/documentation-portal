/**
  * v1.7.13 generated on: Thu Jul 13 2017 06:34:11 GMT+0000 (UTC)
  * Copyright (c) 2014-2017, Ecor Ventures LLC. All Rights Reserved.
  * See LICENSE (BSD-3-Clause) at 
  * https://github.com/ngnjs/chassis-libx/blob/master/LICENSE.
  */
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

if (!NGN) {
  console.error('NGN not found.');
} else {
  NGN.global.NGNX = NGN.global.NGNX || {};

  /**
   * @class NGNX.util
   * A utility library for NGNX.
   * @singleton
   */
  NGNX.util = Object.defineProperties({}, {
    /**
     * @method requeue
     * This forces the function to requeue. It is the equivalent of:
     *
     * ```js
     * setTimeout(myFunction, 0)
     * ```
     * @param {function} fn
     * The function/method to requeue.
     */
    requeue: NGN.const(function (fn) {
      setTimeout(fn, 0);
    }),

    /**
     * @method guaranteeVariable
     * This method checks for the existance of a variable and executes the
     * callback when it is recognized. This is designed to check for the
     * existance of a javascript variable and react when it is recognized.
     *
     * For example:
     *
     * ```js
     * NGNX.util.guaranteeVariable(myVar, function () {
     *   // ... do something ...
     *   console.log('Simon says:', myVar)
     * })
     *
     * setTimeout(function () {
     *   window.myVar = 'I exist!'
     * }, 5000)
     * ```
     *
     * In this example, 5 seconds will pass before `myVar` is created. When it
     * is created, the `guaranteeVariable` method is executed, outputting
     * `Simon says: I exist!`.
     *
     * This method may be used for many purposes, but it was designed to
     * monitor the JavaScript environment to detect dynamically loaded code.
     * This can be particularly useful when creating NGNX.VIEW.Registry or
     * NGNX.VIEW.Component objects on the fly.
     *
     * This polls the environment every 300 milliseconds (by default) for
     * the variable. A custom interval may be specified, but there is a minimum
     * of 10ms to prevent abuse & DOM thrashing.
     *
     * This method determines whether the variable exists by checking whether
     * it is `undefined`. If it is defined (even if its value is `null`),
     * it is considered to "exist" and the callback will be executed. If the
     * specified variable already exists, the callback will be executed immediately.
     * @param {String} variable
     * The string name of the variable to watch for.
     * @param {Number} [interval=300]
     * The number of milliseconds between checks.
     * @param {function|string} callback
     * The callback to execute when the variable exists. This may also be the
     * name of an event that will be fired on the NGN.BUS instead of executing
     * a callback. If an event is used instead of a callback, only the variable
     * name is provided as an argument to event handlers.
     * @param {Any} callback.value
     * Returns the value of the variable.
     */
    guaranteeVariable: NGN.const(function (monitorVariable, interval, callback) {
      if (NGN.isFn(interval) || isNaN(interval)) {
        callback = interval;
        interval = 300;
      }

      // Enforce minimum interval
      interval = interval < 10 ? 10 : interval;

      // Prevent code injection
      monitorVariable = monitorVariable.replace(/\;|\(|\)|\{|\}|\=/gi, ''); // eslint-disable-line no-useless-escape

      // Scope the function to sandbox the eval method
      var checkVariable = function checkVariable() {
        var result = void 0;

        try {
          result = eval(monitorVariable); // eslint-disable-line no-eval
        } catch (e) {
          return setTimeout(checkVariable, interval);
        }

        if (NGN.isFn(callback)) {
          callback(monitorVariable, result);
        } else {
          NGN.BUS && NGN.BUS.emit(callback, monitorVariable);
        }
      };

      checkVariable();
    })
  });
}

// Throw an error if the DOM library isn't included.
// NGN.needs(NGN, 'DOM')

/**
 * @class HTMLReferenceElement
 * A class representing a reference to a Node/NodeList.
 * @global
 */

var HTMLReferenceElement = function () {
  // eslint-disable-line no-unused-vars
  function HTMLReferenceElement() {
    var _this = this;

    var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    _classCallCheck(this, HTMLReferenceElement);

    if (typeof selector !== 'string' || selector.trim().length === 0) {
      throw new Error('Invalid reference selector. Reference selectors must be a string, received ' + (typeof selector === 'undefined' ? 'undefined' : _typeof(selector)));
    }

    var selection = NGN.DOM.normalizeSelector(selector);

    Object.defineProperties(this, {
      /**
       * @cfg {string} selector
       * The CSS selector representing the referenced element(s).
       */
      originalselector: NGN.privateconst(selection),
      activeselector: NGN.private(selector),
      deepcollapse: NGN.private(false),
      smartevents: NGN.private(true),

      filters: NGN.private(null),

      getValue: NGN.private(function (attribute) {
        if (_this.length === 1) {
          return _this.element[attribute];
        }

        return _this.elements.map(function (element) {
          return element[attribute];
        });
      }),

      setValue: NGN.private(function (attribute, value) {
        switch (_this.length) {
          case 0:
            return;

          case 1:
            _this.element[attribute] = value;
            return;

          default:
            if (NGN.isArray(value)) {
              _this.each(function (element) {
                if (value.length > 0) {
                  element[attribute] = value.shift();
                }
              });
            }
        }
      })
    });

    // Apply common getter/setter proxies
    // These are experimental
    var attributes = ['value', 'innerHTML', 'outerHTML', 'style', 'tabIndex', 'title', 'className', 'attributes', 'childElementCount', 'children',
    // 'className',
    'clientHeight', 'clientLeft', 'clientTop', 'clientWidth', 'firstElementChild', 'id',
    // 'innerHTML',
    'lastElementChild', 'localName', 'name', 'namespaceURI', 'nextElementSibling', 'ongotpointercapture', 'onlostpointercapture', 'onwheel',
    // 'outerHTML',
    'prefix', 'previousElementSibling', 'scrollHeight', 'scrollLeft', 'scrollTop', 'scrollWidth', 'shadowRoot', 'slot', 'tabStop', 'tagName'];

    attributes.forEach(function (attribute) {
      Object.defineProperty(_this, attribute, {
        enumerable: false,
        get: function get() {
          NGN.BUS && NGN.BUS.emit('NGN.ADVISORY.EXPERIMENTAL', '{attribute} is an experimental attribute of NGNX.REF.');
          return _this.getValue(attribute);
        },
        set: function set(value) {
          NGN.BUS && NGN.BUS.emit('NGN.ADVISORY.EXPERIMENTAL', 'Setting {attribute} is an experimental feature of NGNX.REF.');
          _this.setValue(attribute, value);
        }
      });
    });

    selection = null;
  }

  /**
   * @property {Boolean} [eventCompression=true]
   * Use smart event compression.
   */


  _createClass(HTMLReferenceElement, [{
    key: 'find',


    /**
     * @method find
     * @param  {String} selector
     * Search within the existing reference for an element matching this selector.
     * @return {HTMLReferenceElement}
     */
    value: function find() {
      var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      if (typeof selector !== 'string' || selector.trim().length === 0) {
        throw new Error('HTMLReferenceElement.find requires a string argument.');
      }

      var search = NGN.DOM.normalizeSelector(this.selector + ' ' + selector);

      return new HTMLReferenceElement(search);
    }

    // Alias find for convenience, but warn that it's not really supported

  }, {
    key: 'querySelector',
    value: function querySelector() {
      console.warn('querySelector is not a valid HTMLReferenceElement method. Using find() instead.');
      this.find.apply(this, arguments);
    }

    // Alias find for convenience, but warn that it's not really supported

  }, {
    key: 'querySelectorAll',
    value: function querySelectorAll() {
      console.warn('querySelectorAll is not a valid HTMLReferenceElement method. Using find() instead.');
      this.find.apply(this, arguments);
    }

    /**
     * @method each
     * Iterate through the referenced elements and apply a function to each.
     * @param  {Function} appliedFn
     * The function to apply to each element. This function receives a single
     * [Node](https://developer.mozilla.org/en-US/docs/Web/API/Node), the index
     * of the node within the reference collection, and the entire collection
     * as arguments (similar to Array.forEach).
     */

  }, {
    key: 'each',
    value: function each(fn) {
      if (this.empty) {
        return;
      }

      var elements = this.length === 1 ? [this.element] : this.elements;

      elements.forEach(function (element, index, elementList) {
        return fn(element, index, elementList);
      });
    }
  }, {
    key: 'forEach',
    value: function forEach() {
      this.each.apply(this, arguments);
    }

    /**
     * @method setEachAttribute
     * This method iterates through each of the elements of the reference,
     * applying the
     * [setAttribute](https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute)
     * method to each.
     * @param {String} name
     * The name of the attribute to set.
     * @param {String} value
     * The value to assign the attribute.
     */

  }, {
    key: 'setEachAttribute',
    value: function setEachAttribute(key, value) {
      this.each(function (element) {
        return element.setAttribute(key, value);
      });
    }

    /**
     * @method removeEachAttribute
     * This method iterates through each of the elements of the reference,
     * applying the
     * [removeAttribute](https://developer.mozilla.org/en-US/docs/Web/API/Element/removeAttribute)
     * method to each.
     * @param {String} name
     * The name of the attribute to set.
     */

  }, {
    key: 'removeEachAttribute',
    value: function removeEachAttribute(key) {
      this.each(function (element) {
        return element.removeAttribute(key);
      });
    }

    /**
     * @method applyFilter
     * Add a new element filter.
     * @param {Function} filterFn
     * The filter function receives a single
     * [Node](https://developer.mozilla.org/en-US/docs/Web/API/Node) argument. The
     * function must return `true` if the filter should "keep" the element or
     * `false` if the element should not be included in the results.
     */

  }, {
    key: 'applyFilter',
    value: function applyFilter(filterFn) {
      if (!NGN.isFn(filterFn)) {
        throw new Error('Invalid function passed to HTMLReferenceElement.applyFilter().');
      }

      this.filters = NGN.coalesce(this.filters, []);
      this.filters.push(filterFn);
    }

    /**
     * @method clearFilters
     * Removes all filters from the reference.
     */

  }, {
    key: 'clearFilters',
    value: function clearFilters() {
      this.filters = null;
    }

    /**
     * @method destroy
     * Destroys all referenced elements using NGN.DOM.destroy.
     */

  }, {
    key: 'destroy',
    value: function destroy() {
      this.each(function (element) {
        return NGN.DOM.destroy(element);
      });
    }

    /**
     * @method wrapHandlerMethod
     * Applies a `referenceElement` to an event before it is passed to a handler.
     * @param  {function} handlerFn
     * The event handler function to wrap.
     * @return {function}
     * @private
     */

  }, {
    key: 'wrapHandlerMethod',
    value: function wrapHandlerMethod(handlerFn) {
      var me = this;

      return function (event) {
        if (me.empty) {
          return;
        }

        var referenceElement = null;

        if (me.length === 1) {
          referenceElement = me.element;
        } else {
          referenceElement = NGN.DOM.findParent(event.target, me.originalselector);

          if (event.target !== referenceElement) {
            var elements = document.querySelectorAll(me.originalselector);
            var found = false;

            for (var i = 0; i < elements.length; i++) {
              if (elements[i] === referenceElement) {
                found = true;
                break;
              }

              if (elements[i] === event.target) {
                referenceElement = event.target;
                found = true;
                break;
              }
            }

            if (!found) {
              return;
            }
          }
        }

        if (referenceElement === null) {
          return;
        }

        event.referenceElement = referenceElement;

        var args = NGN.slice(arguments);
        args.shift();

        handlerFn.apply(undefined, [event].concat(_toConsumableArray(args)));
      };
    }

    /**
     * @method on
     * Apply event handlers for one or more events. This is similar to the native
     * `addEventListener` method with a multiple distinct differences.
     *
     * First, the event handler will be applied to all referenced elements.
     * Each element will receive the same event handler function. If this is not
     * desired behavior, the #each method can be used to iterate through elements
     * to use the standard `addEventListener` method, or the #applyFilter method
     * can be used to restrict which elements this method will be applied to.
     *
     * Second, it is possible to pass a simple key/value object containing multiple
     * event name/handler combinations. For example:
     *
     * ```js
     * let ref = new HTMLReferenceElement('.my .input')
     *
     * ref.on({
     *   keydown: function (event) {...},
     *   keyup: function (event) {...},
     *   focus: function (event) {...},
     *   blur: function (event) {...}
     * })
     * ```
     *
     * Third, references use a smart event compression system whenever possible.
     * By reducing the number of events and handlers, it is easier to trace the
     * flow of data/state/etc through a UI system.
     *
     * There are two forms of event compression, simple and complex. Simple event
     * compression attempts to check each referenced element for a shared parent
     * node. If they all share a common parent, the event handler is applied
     * to the parent node, and the handler is executed only when a referenced
     * element is affected. For complex event compression, a common ancestor
     * element is used, along with a practicality algorithm to determine whether
     * event aggregation will make the app more efficient. **This system is ignored
     * for incompatible events**. An example of an incompatible event is `keydown`,
     * which must be applied to each `<input>` element. In most cases, the smart
     * compression system will simply work, but it will fall back to applying
     * event handlers one-by-one to each element if compression cannot be applied.
     * This behavior can be disabled. See #enableComplexEventCompression
     * for details.
     * @param  {String|Object} eventName
     * The event name to listen for. Alternatively, this can be a key/value
     * object containing multiple events/handlers.
     *
     * **Example:**
     * ```js
     * {
     *   click: function (event) {...},
     *   keyup: function (event) {...},
     *   focus: function (event) {...},
     *   blur: function (event) {...}
     * }
     * ```
     * @param  {Function} [handlerFn]
     * The handler function for an event. This is ignored if an object is passed
     * as the `eventName`.
     */

  }, {
    key: 'on',
    value: function on(scope, handlerFn) {
      var _this2 = this;

      if (this.empty) {
        return;
      }

      var elements = this.eventCompression ? this.getCollapsedDomStructure() : this.elements;

      elements = NGN.typeof(elements) === 'array' ? elements : [elements];

      if ((typeof scope === 'undefined' ? 'undefined' : _typeof(scope)) === 'object') {
        var _loop = function _loop(eventName) {
          elements.forEach(function (element) {
            return element.addEventListener(eventName, _this2.wrapHandlerMethod(scope[eventName]));
          });
        };

        for (var eventName in scope) {
          _loop(eventName);
        }
      } else {
        elements.forEach(function (element) {
          return element.addEventListener(scope, _this2.wrapHandlerMethod(handlerFn));
        });
      }
    }
  }, {
    key: 'pool',
    value: function pool() {
      return NGN.deprecate(this.on, 'NGNX.REF.pool has been merged into NGNX.REF.on().');
    }

    /**
     * @method once
     * The same as #on, but the event handler is removed after the event is fired.
     * @param  {String|Object} eventName
     * The event name to listen for. Alternatively, this can be a key/value
     * object containing multiple events/handlers.
     *
     * **Example:**
     * ```js
     * {
     *   click: function (event) {...},
     *   keyup: function (event) {...},
     *   focus: function (event) {...},
     *   blur: function (event) {...}
     * }
     * ```
     * @param  {Function} [handlerFn]
     * The handler function for an event. This is ignored if an object is passed
     * as the `eventName`.
     */

  }, {
    key: 'once',
    value: function once(scope, handlerFn) {
      if (this.empty) {
        return;
      }

      var elements = this.eventCompression ? this.getCollapsedDomStructure() : this.elements;

      elements = NGN.typeof(elements) === 'array' ? elements : [elements];

      var me = this;

      if ((typeof scope === 'undefined' ? 'undefined' : _typeof(scope)) === 'object') {
        var _loop2 = function _loop2(eventName) {
          var fn = function fn() {
            me.wrapHandlerMethod(scope[eventName]).apply(me, arguments);
            me.off(eventName, fn);
          };

          elements.forEach(function (element) {
            return element.addEventListener(eventName, fn);
          });
        };

        for (var eventName in scope) {
          _loop2(eventName);
        }
      } else {
        var _fn = function _fn() {
          me.wrapHandlerMethod(handlerFn).apply(me, arguments);
          me.off(scope, _fn);
        };

        elements.forEach(function (element) {
          return element.addEventListener(scope, _fn);
        });
      }
    }

    /**
     * @method off
     * Remove an existing event handler. This can remove event handlers set with
     * the #on method or those set directly on an element.
     * @param  {String|Object} eventName
     * The event name. Alternatively, this can be a key/value
     * object containing multiple events/handlers.
     *
     * **Example:**
     * ```js
     * {
     *   click: function (event) {...},
     *   keyup: function (event) {...},
     *   focus: function (event) {...},
     *   blur: function (event) {...}
     * }
     * ```
     * @param  {Function} [handlerFn]
     * The handler function to remove. This is ignored if an object is passed
     * as the `eventName`.
     */

  }, {
    key: 'off',
    value: function off(scope, handlerFn) {
      var _this3 = this;

      if (this.empty) {
        return;
      }

      var elements = this.eventCompression ? this.getCollapsedDomStructure() : this.elements;

      elements = NGN.typeof(elements) === 'array' ? elements : [elements];

      if ((typeof scope === 'undefined' ? 'undefined' : _typeof(scope)) === 'object') {
        var _loop3 = function _loop3(eventName) {
          if (scope[eventName].toString().indexOf('wrapHandlerMethod') < 0) {
            scope[eventName] = _this3.wrapHandlerMethod(scope[eventName]);
          }

          elements.forEach(function (element) {
            return element.removeEventListener(eventName, scope[eventName]);
          });
        };

        for (var eventName in scope) {
          _loop3(eventName);
        }
      } else {
        if (handlerFn.toString().indexOf('wrapHandlerMethod') < 0) {
          handlerFn = this.wrapHandlerMethod(handlerFn);
        }

        elements.forEach(function (element) {
          return element.removeEventListener(scope, handlerFn);
        });
      }
    }

    // Convenience alias

  }, {
    key: 'onceoff',
    value: function onceoff() {
      console.warn('HTMLReferenceElement.off can be used for removing any event handler (including one-time events).');
      this.off.apply(this, arguments);
    }

    // Convenience alias

  }, {
    key: 'offonce',
    value: function offonce() {
      this.onceoff.apply(this, arguments);
    }

    // Convenience alias

  }, {
    key: 'addEventListener',
    value: function addEventListener() {
      console.warn('HTMLReferenceElement.addEventListener is not a valid method. Using HTMLReferenceElement.on instead.');
      this.on.apply(this, arguments);
    }

    // Convenience alias

  }, {
    key: 'removeEventListener',
    value: function removeEventListener() {
      console.warn('HTMLReferenceElement.removeEventListener is not a valid method. Using HTMLReferenceElement.off instead.');
      this.off.apply(this, arguments);
    }

    /**
     * @method forward
     * Forwards a DOM/Element event to the NGN.BUS. See @NGN.BUS#forward for
     * additional details.
     * @param {string|object} sourceEvent
     * The source event triggered by the DOM element(s). This may also be a
     * key/value object containing multiple forwards. For example:
     *
     * ```js
     * {
     *   click: 'clicked',
     *   dblclick: 'double.clicked'
     * }
     * ```
     * @param {string} targetEvent
     * The event fired on the NGN.BUS when the sourceEvent is fired.
     * This is ignored if an object is passed to the `sourceEvent`.
     * @param {Boolean} [preventDefault=false]
     * Optionally prevent the default event from happning. This is
     * the equivalent of adding `event.preventDefault()` at the beginning
     * of an event handler.
     */

  }, {
    key: 'forward',
    value: function forward(sourceEvent, targetEvent) {
      var _this4 = this;

      var preventDefault = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      if (this.empty) {
        return;
      }

      // NGN.needs(NGN, 'BUS')

      if ((typeof sourceEvent === 'undefined' ? 'undefined' : _typeof(sourceEvent)) === 'object' && typeof targetEvent === 'boolean') {
        preventDefault = targetEvent;
      }

      var elements = this.eventCompression ? this.getCollapsedDomStructure() : this.elements;

      elements = NGN.typeof(elements) === 'array' ? elements : [elements];

      if ((typeof sourceEvent === 'undefined' ? 'undefined' : _typeof(sourceEvent)) === 'object') {
        var _loop4 = function _loop4(eventName) {
          var fn = function fn(evt) {
            if (preventDefault) {
              evt.preventDefault();
            }

            NGN.BUS.emit(sourceEvent[eventName], evt);
          };

          elements.forEach(function (element) {
            return element.addEventListener(eventName, _this4.wrapHandlerMethod(fn));
          });
        };

        for (var eventName in sourceEvent) {
          _loop4(eventName);
        }
      } else {
        var _fn2 = function _fn2(evt) {
          if (preventDefault) {
            evt.preventDefault();
          }

          NGN.BUS.emit(targetEvent, evt);
        };

        elements.forEach(function (element) {
          return element.addEventListener(sourceEvent, _this4.wrapHandlerMethod(_fn2));
        });
      }
    }

    /**
     * @method getCollapsedDomStructure
     * Retrieves the most effective DOM elements to apply event handlers
     * to when multiple elements are selected.
     * @private
     */

  }, {
    key: 'getCollapsedDomStructure',
    value: function getCollapsedDomStructure() {
      var elements = this.elements;

      // If there's only one element, ignore this operation.
      if (elements <= 1) {
        return this.element;
      }

      // Attempt simplistic collapse using parent nodes
      // This is the most common code structure.
      var parentNodes = NGN.dedupe(elements.map(function (node) {
        return node.parentNode;
      }));

      if (parentNodes.length / elements.length < 0.5) {
        return parentNodes;
      }

      if (!this.deepcollapse) {
        return elements;
      }

      // If complex event compression is configured, apply it.
      var ancestor = NGN.DOM.getCommonAncestorDetail(elements);

      // If the avg is less than the median, the spread is
      // "skewed" and may not benefit from compression. If the
      // average is over 10, the structure is deeply nested and
      // potentially contains many elements to scan through.
      // It's unlikely event collapsing will be beneficial in
      // either of these cases.
      if (ancestor.gap.average < ancestor.gap.median || ancestor.gap.average >= 10) {
        return elements;
      }

      if (ancestor === document.body) {
        return elements;
      }

      return [ancestor.element];
    }

    /**
     * @method enableComplexEventCompression
     * By default, NGN attempts to minimize the number of event
     * handlers applied to the DOM by references. When a reference refers to
     * multiple elements instead of just one, NGN attempts to aggregate event
     * handlers using a simplistic strategy of applying a single event listener
     * to a shared parent node. In most cases, this can reduce "event emitter
     * waste". The simplistic strategy is designed for the 95% use case, wherein
     * most DOM structure references are not very large. However; it is
     * still possible to have complex references. Complex event compression has a
     * native algorithm that finds the least common ancestor (i.e. common DOM
     * element) and applies the event handler to it, distributing events directly
     * to referenced DOM nodes within it. It automatically makes a decision
     * to determine if the gap between nodes is too large (a factor of 3) to
     * effectively determine whether event compression will yield tangible
     * performance gains. If the algorithm does not determine gains, event
     * handlers are applied to individual elements within the reference. Simply
     * put, it falls back to adding an event handler to each referenced element.
     *
     * Since this is not necessary in most cases, it is off by default. Enabling
     * it will perform the analysis and apply efficiencies when possible.
     */

  }, {
    key: 'enableComplexEventCompression',
    value: function enableComplexEventCompression() {
      this.deepcollapse = true;
    }

    /**
     * @method disableComplexEventCompression
     * Disables complex event compression.
     */

  }, {
    key: 'disableComplexEventCompression',
    value: function disableComplexEventCompression() {
      this.deepcollapse = false;
    }
  }, {
    key: 'eventCompression',
    get: function get() {
      return this.smartevents;
    },
    set: function set(value) {
      if (NGN.typeof(value) !== 'boolean') {
        throw new Error('HTMLReferenceElement.eventCompression cannot be set to a non-boolean value.');
      }

      this.smartevents = value;
    }

    /**
     * @property {string} selector
     * The active CSS selector used to reference elements.
     */

  }, {
    key: 'selector',
    get: function get() {
      return this.activeselector;
    },
    set: function set(value) {
      if (typeof value !== 'string' || value.trim().length === 0) {
        throw new Error('Cannot set HTMLReferenceElement selector to a non-string or empty value.');
      }

      this.activeselector = value;
    }

    /**
     * @property {Node|NodeList} element
     * Retrieve the raw Node or NodeList represented by the reference.
     */

  }, {
    key: 'element',
    get: function get() {
      var elements = document.querySelectorAll(this.selector);

      switch (elements.length) {
        case 0:
          return null;

        case 1:
          return elements[0];

        default:
          return elements;
      }
    }

    /**
     * @property {Array} elements
     * Retrieves the elements as an array. If the reference refers to a
     * NodeList, the NodeList will be converted to a standard Array for
     * easy iteration.
     */

  }, {
    key: 'elements',
    get: function get() {
      var _this5 = this;

      if (!this.filters) {
        return NGN.slice(this.element);
      }

      // Filter the elements and return the results.
      return NGN.slice(this.element).filter(function (element, elementIndex, elementList) {
        for (var filterIndex in _this5.filters) {
          var keep = _this5.filters[filterIndex](element, elementIndex, elementList);

          if (!keep) {
            return false;
          }
        }

        return true;
      });
    }

    /**
     * @property {Number} length
     * The number of DOM elements represented by this reference.
     */

  }, {
    key: 'length',
    get: function get() {
      return document.querySelectorAll(this.selector).length;
    }

    /**
     * @property {Boolean} empty
     * Returns `true` if the reference contains no elements.
     */

  }, {
    key: 'empty',
    get: function get() {
      return this.length === 0;
    }

    /**
     * @property {Object} eachClassList
     * This is a unique convenience property of an HTMLReferenceElement. This is
     * **not a standard DOM property**. To reference the native `classList` of
     * an element, use the #element attribute to retrieve the raw DOM element.
     *
     * This property provides 4 methods: `add`, `remove`, `toggle`, and `replace`.
     *
     * Each of these methods conform to their corresponding
     * [Element.classList](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList)
     * methods, but the methods will be applied to each element represented by the
     * selector. In other words, this will apply the same method to each element
     * instead of having to iterate through a NodeList to apply them one at a time.
     *
     * For example:
     *
     * ```html
     * <div class="my">
     *   <div class="selector">A</div>
     *   <div class="selector">B</div>
     *   <div class="selector">C</div>
     * </div>
     * ```
     *
     * ```js
     * let ref = new HTMLReferenceElement('.my .selector')
     *
     * ref.eachClassList.add('blue')
     * ```
     *
     * This results in:
     *
     * ```html
     * <div class="my">
     *   <div class="blue selector">A</div> // "blue" class now exists.
     *   <div class="blue selector">B</div> // "blue" class now exists.
     *   <div class="blue selector">C</div> // "blue" class now exists.
     * </div>
     * ```
     */

  }, {
    key: 'eachClassList',
    get: function get() {
      var me = this;
      var methods = ['add', 'remove', 'toggle'];
      var proxy = {};

      methods.forEach(function (method) {
        proxy[method] = function () {
          var _arguments = arguments;

          me.each(function (element) {
            var _element$classList;

            return (_element$classList = element.classList)[method].apply(_element$classList, _arguments);
          });
        };
      });

      // Add replace method
      proxy.replace = function (oldClass, newClass) {
        me.each(function (element) {
          element.classList.add(newClass);
          element.classList.remove(oldClass);
        });
      };

      return proxy;
    }
  }]);

  return HTMLReferenceElement;
}();

'use strict';

/**
 * @class NGNX.REF
 * A global catalog of "pointers" that reference one or more DOM elements.
 * This is used to reference and manipulate DOM elements in a simple
 * and standardized way, without restricting native functionality.
 * This namespace is also recognized as `NGNX.ref`.
 * @singleton
 * @fires created
 * Triggered when a new reference is created. An object containing reference
 * details is provided as an argument to event handlers.
 * ```js
 * {
 *   name: 'reference_name',
 *   reference: <HTMLReferenceElement>
 * }
 * @fires deleted
 * Triggered when a reference is deleted. An object containing the old reference
 * details is provided as an argument to event handlers.
 * ```js
 * {
 *   name: 'reference_name',
 *   reference: <HTMLReferenceElement>
 * }
 */
window.NGNX = NGN.coalesce(window.NGNX, {});

NGNX.REF = function () {
  var ReferenceManager = function (_NGN$EventEmitter) {
    _inherits(ReferenceManager, _NGN$EventEmitter);

    function ReferenceManager() {
      _classCallCheck(this, ReferenceManager);

      var _this6 = _possibleConstructorReturn(this, (ReferenceManager.__proto__ || Object.getPrototypeOf(ReferenceManager)).call(this));

      Object.defineProperties(_this6, {
        collection: NGN.private([]),
        deepcollapse: NGN.private(false)
      });
      return _this6;
    }

    /**
     * @property {Array} keys
     * A list of keys maintained by the reference manager.
     * @private
     */


    _createClass(ReferenceManager, [{
      key: 'create',


      /**
       * @method create
       * Add a reference.
       * @param {String} [key]
       * The key/name of the reference. For example, if this is `myElement`,
       * then `ref.myElement` will return a pointer to this reference.
       * @param {string} selector
       * The CSS selector path.
       */
      value: function create(key, selector) {
        var reference = new HTMLReferenceElement(selector);

        Object.defineProperty(this, key, {
          configurable: true,
          enumerable: true,
          get: function get() {
            return reference;
          },
          set: function set(newselector) {
            reference.selector = newselector;
          }
        });

        this.collection.push(key);

        this.emit('created', {
          name: key,
          reference: this[key]
        });

        return reference;
      }

      /**
       * @method remove
       * Removes a key from the reference manager.
       * @param {string} name
       * The name of the reference.
       */

    }, {
      key: 'remove',
      value: function remove(key) {
        if (!key) {
          return;
        }

        if (!this.hasOwnProperty(key)) {
          return;
        }

        var oldReference = NGN.slice(this[key])[0];

        delete this[key];

        while (this.collection.indexOf(key) >= 0) {
          this.collection.splice(this.collection.indexOf(key), 1);
        }

        this.emit('deleted', {
          name: key,
          reference: oldReference
        });
      }

      /**
       * @method find
       * A generic find method that finds and returns an element or
       * a collection of elements. This is similar to `document.querySelectorAll`,
       * except it returns an NGN reference.
       * @param {string} selector
       * A CSS selector string representing the.
       * @returns HTMLReferenceElement
       */

    }, {
      key: 'find',
      value: function find(selector) {
        if (typeof selector !== 'string' || selector.trim().length === 0) {
          throw new Error('NGN.REF.find requires a string argument.');
        }

        return new HTMLReferenceElement(NGN.DOM.normalizeSelector(selector));
      }

      /**
       * @method enableComplexEventCompression
       * By default, NGN attempts to minimize the number of event
       * handlers applied to the DOM by references. When a reference refers to
       * multiple elements instead of just one, NGN attempts to aggregate event
       * handlers using a simplistic strategy of applying a single event listener
       * to a shared parent node. In most cases, this can reduce "event emitter
       * waste". The simplistic strategy is designed for the 95% use case, wherein
       * most DOM structure references are not very large. However; it is
       * still possible to have complex references. Complex event compression has a
       * native algorithm that finds the least common ancestor (i.e. common DOM
       * element) and applies the event handler to it, distributing events directly
       * to referenced DOM nodes within it. It automatically makes a decision
       * to determine if the gap between nodes is too large (a factor of 3) to
       * effectively determine whether event compression will yield tangible
       * performance gains. If the algorithm does not determine gains, event
       * handlers are applied to individual elements within the reference. Simply
       * put, it falls back to adding an event handler to each referenced element.
       *
       * Since this is not necessary in most cases, it is off by default. Enabling
       * it will perform the analysis and apply efficiencies when possible.
       */

    }, {
      key: 'enableComplexEventCompression',
      value: function enableComplexEventCompression() {
        var _this7 = this;

        if (!NGN.DOM) {
          console.warn('Complex event compression requires NGN.DOM, which was not found. Complex compression will be ignored.');
          return;
        }

        this.deepcollapse = true;

        if (this.keys.length > 0) {
          this.keys.forEach(function (ref) {
            return _this7[ref].enableComplexEventCompression();
          });
        }
      }

      /**
       * @method disableComplexEventCompression
       * Disables complex event compression.
       */

    }, {
      key: 'disableComplexEventCompression',
      value: function disableComplexEventCompression() {
        var _this8 = this;

        this.deepcollapse = false;

        if (this.keys.length > 0) {
          this.keys.forEach(function (ref) {
            return _this8[ref].disableComplexEventCompression();
          });
        }
      }
    }, {
      key: 'keys',
      get: function get() {
        return NGN.dedupe(this.collection);
      }

      /**
       * @property json
       * A JSON representation of the managed keys and their associated selectors.
       * @returns {Object}
       * A key:selector object.
       */

    }, {
      key: 'json',
      get: function get() {
        var data = {};

        for (var i = 0; i < this.collection.length; i++) {
          data[this.collection[i]] = this[this.collection[i]].selector;
        }

        return data;
      }
    }]);

    return ReferenceManager;
  }(NGN.EventEmitter);

  return new ReferenceManager();
};

NGNX.REF = new NGNX.REF();
NGN.createAlias(NGNX, 'ref', NGNX.REF);

'use strict';

window.NGNX = window.NGNX || {};
window.NGNX.DATA = window.NGNX.DATA || {};

/**
 * @class NGNX.DATA.HttpProxy
 * Provides a gateway to a remote HTTP/S endpoint.
 * @extends NGN.DATA.Proxy
 */
if (NGN.DATA.Proxy && NGN.NET) {
  window.NGNX.DATA.HttpProxy = function (cfg) {
    cfg = cfg || {};

    this.constructor(cfg);
    var me = this;

    Object.defineProperties(this, {
      /**
       * @cfg {object} headers
       * Provide custom HTTP headers that will be applied to every request.
       */
      headers: NGN.define(true, true, false, cfg.headers || {}),

      /**
       * @property options
       * The request option values.
       * @readonly
       * @private
       */
      options: NGN._get(function () {
        var req = {
          url: this.url,
          headers: this.headers
        };
        if (this.token) {
          req.accessToken = this.token;
        }
        if (this.username) {
          req.username = this.username;
        }
        if (this.password) {
          req.password = this.password;
        }
        if (this.username && this.password) {
          req.withCredentials = true;
        }
        return req;
      }),

      /**
       * @method save
       * @param  {string} [path]
       * The path on which save operations should occur.
       * @param {function} [callback]
       * An optional callback to execute when the save is complete.
       * @fires save.error
       * Fired when a non-200/201 response code is received from the
       * remote server when trying to save data.
       */
      save: NGN.define(true, false, false, function (path, callback) {
        if (typeof url === 'function') {
          callback = path;
          path = '';
        }

        var i = 0;
        var increment = function increment(action, model) {
          return function (res) {
            i++;
            if (!(res.status === 200 || res.status === 201)) {
              NGN.emit('save.error', {
                message: res.responseText,
                status: res.status,
                action: action,
                model: model
              });
            }
            if (i === me.actions.create.length + me.actions.update.length + me.actions.delete.length) {
              callback && callback();
            }
          };
        };

        var req = this.options;
        req.url += path || '';

        this.actions.create.forEach(function (model) {
          req.json = model.data;
          NGN.NET.post(req, increment('create', model));
        });
        this.actions.update.forEach(function (model) {
          req.url += '/' + model.id;
          req.json = model.data;
          NGN.NET.put(req, increment('update', model));
        });
        this.actions.delete.forEach(function (model) {
          req.url += '/' + model.id;
          NGN.NET.delete(req, increment('delete', model));
        });
      }),

      /**
       * @method fetch
       * Retrieve a JSON array-based data set from an API endpoint.
       * This method basically runs a `GET /path`, expecting an
       * array of data that can be loaded to the NGN.DATA.Model.
       * @param  {string} [path]
       * An optional path to add to the URL. This can Include
       * query strings.
       * @param {function} callback
       */
      fetch: NGN.define(true, false, false, function (path, callback) {
        var req = this.options;
        req.url += path || '';
        NGN.NET.get(req, function (res) {
          var data = res.responseText;
          if (typeof data === 'string') {
            data = JSON.parse(data);
          }
          if (data instanceof Array) {
            me.store.reload(data);
          }
          callback && callback();
        });
      })
    });
  };

  NGN.inherit(NGN.DATA.Proxy, NGNX.DATA.HttpProxy);
} else {
  throw new Error('NGN.DATA.Proxy & NGN.NET are required for NGN.DATA.HttpProxy.');
}

'use strict';

if (!NGN) {
  console.error('NGN not found.');
} else {
  NGN.global.NGNX = NGN.global.NGNX || {};

  /**
   * @class NGNX.Driver
   * Drivers can be used to easily reference & direct communication between
   * components of an application, such as data stores or DOM elements.
   *
   * NGN is based on the concept of a service bus (NGN.BUS), so the NGNX concept
   * of a driver differs from a tradtional MVC approach in subtle ways.
   * The biggest difference is a driver is designed to trigger events on the
   * global event bus. It also listens to the global event bus, responding
   * only to a selection of events it cares about.
   *
   * NGNX.Driver is designed to simplify event triggering and isolate
   * application logic in an opinionated way (keep it brutally simple). See the
   * options associated with each configuration property for specific details.
   *
   * This class was designed to be extended, acting primarily as a standard way
   * to trigger scoped events. It can be extended with any level of logic by adding
   * custom methods, properties, configurations, etc. For more details about
   * extending drivers, see the NGNX.Driver guide.
   */

  var Driver = function () {
    function Driver(cfg) {
      var _this9 = this;

      _classCallCheck(this, Driver);

      cfg = cfg || {};

      Object.defineProperties(this, {
        /**
         * @cfg {string} [namespace]
         * The namespace is prepended to NGN.BUS events. For example, setting
         * this to `mydriver.` will trigger events like
         * `mydriver.eventname` instead of just `eventname`.
         */
        scope: NGN.const(cfg.namespace || null),

        /**
         * @cfg {Object} [references]
         * An object of key/values depicting a reference. Each key is the
         * reference name, while each value is a DOM selector pattern. Providing
         * references here is the same as writing `NGNX.REF.create('key',
         * 'selector/value')` for each reference (this is a shortcut method).
         * Additionally, these references are associated with the driver for
         * easy access.
         *
         * A reference can be accessed in one of two ways:
         *
         * 1. NGNX.REF.key
         * 1. Driver.ref.key or Driver.dom.key
         *
         * ```js
         * let Driver = new NGNX.Driver({
         *   references: {
         *     buttons: 'body > button',
         *     nav: 'body > header > nav:first-of-type',
         *     input: '#myinput'
         *   }
         * })
         *
         * NGNX.REF.buttons.forward('click', NGN.BUS.attach('some.event'))
         * // same as
         * Driver.ref.buttons.forward('click', NGN.BUS.attach('some.event'))
         * // same as
         * Driver.dom.buttons.forward('click', NGN.BUS.attach('some.event'))
         * // same as
         * Driver.dom.buttons.addEventListener('click', function (e) {
         *   NGN.BUS.emit('some.event', e)
         * })
         * ```
         *
         * References are _tecnically_ global, so they are accessible via
         * `NGNX.REF`. However; practical use has proven there is little reason
         * to access a Driver reference globally. The NGNX.Driver adds a scope
         * (#id) to the reference name to prevent conflicts with other Drivers.
         * This is handled by the driver, providing a simpler syntax. As a
         * result, it is possible for each NGNX.Driver to have the same
         * reference names, where each reference refers to a differnt DOM
         * element. For example:
         *
         * ```js
         * let DriverA = new NGNX.Driver({
         *   references: {
         *     button: 'body > button' // <-- Difference
         *   }
         * })
         *
         * let DriverB = new NGNX.Driver({
         *   references: {
         *     button: 'div > button' // <-- Difference
         *   }
         * })
         *
         * console.log(DriverA.button) // Outputs the `body > button` DOM element
         * console.log(DriverB.button) // Outputs the `div > button` DOM element
         * ```
         *
         * `DriverA.button` and `DriverB.button` both have a `button` reference,
         * but each one refers to a different DOM element.
         */
        _references: NGN.privateconst(NGN.coalesce(cfg.references, cfg.ref, {})),

        /**
         * @property {object} ref
         * Access a DOM #reference.
         * @readonly
         */
        ref: NGN.private({}),

        /**
         * @cfgproperty {Object} [stores]
         * An object of NGN.DATA.Store references to associate with the driver.
         *
         * ```js
         * let MyStore = new NGN.DATA.Store({
         *   model: MyModel,
         *   allowDuplicates: false
         * })
         *
         * let MyOtherStore = new NGN.DATA.Store({
         *   model: MyOtherModel,
         *   allowDuplicates: false
         * })
         *
         * let Driver = new NGNX.Driver({
         *   datastores: {
         *     a: MyStore,
         *     b: MyOtherStore
         *   }
         * })
         *
         * console.log(Driver.store.a.records) // dumps the records for MyModel
         * console.log(Driver.store.b.records) // dumps the records for MyOtherModel
         * ```
         * Setting store references will also trigger specially namespaced events,
         * making it simpler to pinpoint modifications to a specific store.
         * See #scopeStoreEvents for details.
         * @type {Object}
         */
        datastores: NGN.const(cfg.stores || {}),

        /**
         * @cfg {Object} templates
         * A named reference to NGN.NET templates. For example:
         *
         * ```js
         * let Driver = new NGNX.Driver({
         *   templates: {
         *     myview: './views/templates/myview.html',
         *     other: './views/templates/other.html'
         *   }
         * })
         *
         * // Apply the template to the DOM
         * Driver.render('myview', data, function (element) {
         *   document.appendChild(element)
         * })
         *
         * // Alternative way to apply the template to the DOM
         * Driver.render('myview', data, document)
         * Driver.render('myview', data, document, 'beforeEnd')
         * ```
         *
         * The last few lines of code are the equivalent of:
         *
         * ```js
         * NGN.NET.template('./views/templates/myview.html', data, function (el) {
         *   document.appendChild(el)
         * })
         * ```
         * The primary advantage is code simplicity/organization. It is possible
         * to define the same template in multiple Drivers, but they will always
         * reference the same template file because it is all handled by NGN.
         * This means all caching is handled automatically, regardless of which
         * Driver initiates the download. It also allows different drivers to
         * handle the response in a different manner.
         */
        templates: NGN.private(cfg.templates || {}),

        /**
         * @property {Array} dataevents
         * The supported data events.
         * @hidden
         */
        dataevents: NGN.privateconst(['record.create', 'record.delete', 'record.duplicate', 'record.update', 'record.expired', 'record.restored', 'record.purged', 'index.create', 'index.delete', 'filter.create', 'filter.remove']),

        /**
         * @cfg {object} [events]
         * An object of events passed to #NGN.BUS.pool.
         */
        initialpool: NGN.privateconst(NGN.coalesce(cfg.on, cfg.events, cfg.pool, null)),

        /**
         * @cfg {object} [once]
         * An object of event handlers that are removed after executed one time.
         */
        initialpoolonce: NGN.privateconst(cfg.once || null),

        /**
         * @cfg {object} [forward]
         * An object containing bulk NGN.BUS.forward statements.
         */
        initialforwarders: NGN.privateconst(cfg.forward || null),

        /**
         * @cfgproperty {string} id
         * A key to uniquely identify the driver. If unspecified, an auto-generated
         * GUID is assigned in realtime.
         */
        id: NGN.privateconst(NGN.coalesce(cfg.id, cfg.namespace, NGN.DATA.util.GUID()).replace(/[^A-Za-z0-9]/gi, ''))
      });

      // Generate references
      Object.keys(this._references).forEach(function (r) {
        _this9.createReference(r, _this9._references[r]);
      });

      // For each datastore, listen to the store's events and bubble the event.
      if (this.scope !== null) {
        Object.keys(this.datastores).forEach(function (name) {
          _this9.scopeStoreEvents(name);
        });
      }

      // Apply the initial event handlers
      if (this.initialpool) {
        this.pool(this.initialpool);
      }

      // Apply initial one-time event handlers
      if (this.initialpoolonce) {
        Object.keys(this.initialpoolonce).forEach(function (eventName) {
          _this9.initializeOneOffEvent(eventName, _this9.initialpoolonce[eventName]);
        });
      }

      // Apply initial forwarders
      if (this.initialforwarders) {
        Object.keys(this.initialforwarders).forEach(function (eventName) {
          _this9.forward(eventName, _this9.initialforwarders[eventName]);
        });
      }
    }

    /**
     * @property {object} references
     * An alias of #ref.
     * @readonly
     */


    _createClass(Driver, [{
      key: 'initializeOneOffEvent',


      // A helper event to initialize one-off events from the configuration.
      value: function initializeOneOffEvent(eventName, handler, namespace) {
        var _this10 = this;

        namespace = NGN.coalesce(namespace, '');

        if (typeof handler === 'function') {
          return this.once(namespace + eventName, handler);
        }

        Object.keys(handler).forEach(function (name) {
          _this10.initializeOneOffEvent(name, handler[name], namespace + eventName + '.');
        });
      }

      /**
       * @method createReference
       * Create a new reference associated with the Driver.
       * @param {string} name
       * Reference name.
       * @param {string} selector
       * The selector.
       * @private
       */

    }, {
      key: 'createReference',
      value: function createReference(name, selector) {
        if (!selector) {
          throw new Error('Invalid selector specified for new ' + name + ' reference.');
        }

        var originalName = name;
        name = this.id + '-' + name;

        if (NGNX.REF[name] === undefined || NGNX.REF[name] === null) {
          NGNX.REF.create(name, selector);

          Object.defineProperty(this.ref, originalName, NGN.get(function () {
            return NGNX.REF[name];
          }));
        }
      }

      /**
       * @alias addReference
       * Same as #createReference
       * @param {string} name
       * Reference name.
       * @param {string} selector
       * The selector.
       */

    }, {
      key: 'addReference',
      value: function addReference() {
        this.createReference.apply(this, arguments);
      }

      /**
       * @method addTemplate
       * A helper method to add a new template in realtime.
       * @param {string} name
       * The template name.
       * @param {string} source
       * The URL/fielpath where the template can be accessed.
       */

    }, {
      key: 'addTemplate',
      value: function addTemplate(name, source) {
        this.templates[name] = source;
      }

      /**
       * @method render
       * Render a referenced template.
       *
       * **Examples:**
       * ```js
       * // Add the rendered template to the document at the end.
       * Driver.render('myview', data, document, 'beforeend')
       *
       * // Add the rendered template to the document at the end.
       * // Notice the 'beforeend' is missing (it is the default).
       * Driver.render('myview', data, document)
       *
       * // Mannually Apply the template to the DOM using a callback.
       * Driver.render('myview', data, function (element) {
       *   document.appendChild(element)
       * })
       * ```
       * @param {string} name
       * The name of the template provided in #templates.
       * @param {object|NGN.DATA.Model} data
       * The key/value object passed to the NGN.NET.template method.
       * @param {HTMLElement|String} [parent]
       * The parent element or a selector reference to the parent element
       * in which the template code is injected.
       * @param {string} [position=beforeend]
       * If and only if a parent object is specified, this attribute will
       * insert the template at the specified position. Valid options are
       * anything passed to [insertAdjacentHTML](https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML).
       * @param {function} [callback]
       * If no parent/position are provided, an optional callback can be used to
       * receive the DOM element generated by the template.
       * @param {HTMLElement} callback.element
       * The callback receives a valid HTML Element that can be modified or
       * inserted into the DOM.
       */

    }, {
      key: 'render',
      value: function render(name, data, parent, position, callback) {
        var _this11 = this;

        if (!this.templates.hasOwnProperty(name)) {
          throw new Error('The Driver does not have a reference to a template called ' + name.trim() + '.');
        }

        // If a data model was provided, get a representation of it.
        if (data instanceof NGN.DATA.Entity) {
          data = data.representation;
        }

        if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) !== 'object') {
          console.error('Invalid Data', data);
          throw new Error('The data provided to the renderer could not be processed because it is not a key/value object.');
        }

        // If the parent is a function, treat it as a callback
        if (typeof parent === 'function') {
          NGN.NET.template(this.templates[name], data, parent);
          return;
        }

        // If the parent is a selector, reference the element.
        if (typeof parent === 'string') {
          var p = parent;

          parent = document.querySelector(parent);

          if (parent === null) {
            console.warn('%c' + p + '%c is not a valid selector or the referenced parent DOM element could not be found.', NGN.css, '');
            return;
          }
        }

        position = (position || 'beforeend').toLowerCase();

        // Import the template.
        NGN.NET.template(this.templates[name], data, function (element) {
          if (NGN.hasOwnProperty('DOM')) {
            NGN.DOM.svg.update(element, function (content) {
              _this11.adjustedRender(parent, content, position, callback);
            });
          } else {
            _this11.adjustedRender(parent, element, position, callback);
          }
        });
      }
    }, {
      key: 'adjustedRender',
      value: function adjustedRender(parent, element, position, callback) {
        if (['beforebegin', 'afterbegin', 'afterend'].indexOf(position.trim().toLowerCase()) < 0) {
          position = 'beforeend';
        }

        if (typeof element === 'string') {
          parent.insertAdjacentHTML(position, element);
        } else {
          parent.insertAdjacentElement(position, element);
        }

        switch (position) {
          case 'beforeend':
            this.templateRendered(element);
            break;

          case 'beforebegin':
            this.templateRendered(parent.previousSibling);
            break;

          case 'afterend':
            this.templateRendered(parent.nextSibling);
            break;

          case 'afterbegin':
            this.templateRendered(parent.firstChild);
            break;

          default:
            this.templateRendered(parent.lastChild);
        }

        if (NGN.isFn(callback) && !NGN.hasOwnProperty('DOM')) {
          callback();
        }
      }
    }, {
      key: 'templateRendered',
      value: function templateRendered(element) {
        NGN.BUS.emit(this.scope + 'template.rendered', element);
        NGN.BUS.emit('template.rendered', element);
        NGN.BUS.emit('template.render', element);
      }

      /**
       * @method addStore
       * Add a new datastore reference to the driver.
       *
       * **Example:**
       *
       * ```js
       * let MyStore = new NGN.DATA.Store({...})
       * let MyDriver = new NGNX.Driver({
       *   ...
       * })
       *
       * MyDriver.addStore('mystore', MyStore)
       *
       * console.log(MyDriver.store.mystore.records) // dumps the records
       * ```
       * @param {String} referenceName
       * The name by which the datastore can be retrieved.
       * @param {NGN.DATA.Store} store
       * The store to reference.
       */

    }, {
      key: 'addStore',
      value: function addStore(name, store) {
        var _this12 = this;

        if (this.datastores.hasOwnProperty(name)) {
          if (this.scope !== null) {
            // Remove namespaced events.
            this.dataevents.forEach(function (e) {
              NGN.BUS.off(_this12.scope + e);
            });
          }

          console.warn('Driver already had a reference to %c' + name + '%c, which has been overwritten.', NGN.css, '');
        }

        this.datastores[name] = store;
        this.scopeStoreEvents(name);
      }

      /**
       * @method scopeStoreEvents
       * Apply the #namespace prefix to each datastore event. In addition to
       * prefixing with the namespace/scope, a separate event will be prefixed with both
       * the namespace and name of the store reference. This is a convenience event.
       *
       * For example:
       *
       * ```js
       * let MyStore = new NGN.DATA.Store({
       *   model: MyModel,
       *   allowDuplicates: false
       * })
       *
       * let MyOtherStore = new NGN.DATA.Store({
       *   model: MyOtherModel,
       *   allowDuplicates: false
       * })
       *
       * let Driver = new NGNX.Driver({
       *   namespace: 'myscope.', // <--- Notice the Driver scope!
       *   datastores: {
       *     a: MyStore, // <-- "a" is the store reference name for MyStore
       *     b: MyOtherStore // <-- "b" is the store reference name for MyOtherStore
       *   }
       * })
       *
       * // Listen for record creation on ALL stores the Driver references.
       * // In this case, adding a record to `MyStore` (a) or `MyOtherStore` (b)
       * // will both trigger this event handler.
       * NGN.BUS.on('myscope.record.create', function (record) {
       *   console.log(record.data)
       * })
       *
       * // Listen for record creation ONLY ON `MyStore`. Notice the event pattern:
       * // `{scope}.{storeReferenceName}.record.create`.
       * NGN.BUS.on('myscope.a.record.create', funciton (record) {
       *   console.log(record.data)
       * })
       * ```
       *
       * If you use an alternative delimiter/separator to define your events, the
       * Driver will recognize common ones, including a space, `-`, `.`, `_`, `+`,
       * ':', or `;`.
       * @param {String} name
       * The Driver reference name to the store.
       * @param {boolean} suppressWarning
       * Suppress the warning message if the namespace is not defined.
       * @private
       */

    }, {
      key: 'scopeStoreEvents',
      value: function scopeStoreEvents(name, suppress) {
        suppress = NGN.coalesce(suppress, false);

        var me = this;

        if (this.scope !== null) {
          var sep = this.scope === null ? 'NONE' : this.scope.substr(this.scope.length - 1, 1);

          this.dataevents.forEach(function (e) {
            me.datastores[name].on(e, function () {
              var args = NGN.slice(arguments);

              if ([' ', '-', '.', '_', '+', ':'].indexOf(sep) >= 0) {
                args.unshift(me.scope + name + sep + e);
              } else {
                args.unshift(me.scope + name + e);
              }

              NGN.BUS.emit.apply(NGN.BUS, args);
            });
          });
        } else if (!suppress) {
          console.warn('Driver.scopeStoreEvents called without a defined namespace.');
        }
      }

      /**
       * @method applyNamespace
       * A helper method for applying a namespace to the first argument of a method.
       * @private
       */

    }, {
      key: 'applyNamespace',
      value: function applyNamespace(args) {
        if (args.length === 0) {
          return arguments;
        }

        if (typeof args[0] !== 'string') {
          return arguments;
        }

        if (!NGN.BUS) {
          console.warn('%cNGNX.Driver.on(\'' + arguments[0] + '\', ...)%c will not work because NGN.BUS is not available.', NGN.css, '');
          return;
        }

        args[0] = NGN.coalesce(this.scope, '') + args[0];

        return args;
      }

      /**
       * @method on
       * Create an event handler
       * @param {string} eventName
       * Name of the event to handle.
       * @param {function} handler
       * The handler function that responds to the event.
       */

    }, {
      key: 'on',
      value: function on() {
        if (arguments.length > 0) {
          if (_typeof(arguments[0]) === 'object') {
            this.pool.apply(this, arguments);
            return;
          }

          if (arguments[0] === 'template.render') {
            console.warn('%cDEPRECATION NOTICE:%c "template.render" event is now "template.rendered"', NGN.css, '');
          }
        }

        NGN.BUS.on.apply(NGN.BUS, this.applyNamespace(arguments));
      }

      /**
       * @method once
       * Create an event handler that's removed after it executes one time.
       * @param {string} eventName
       * Name of the event to handle.
       * @param {function} handler
       * The handler function that responds to the event.
       */

    }, {
      key: 'once',
      value: function once() {
        if (arguments.length > 0) {
          if (_typeof(arguments[0]) === 'object') {
            throw new Error('Nested/pooled events (object) are only supported for the on() method.');
          }

          if (arguments[0] === 'template.render') {
            console.warn('%cDEPRECATION NOTICE:%c "template.render" event is now "template.rendered"', NGN.css, '');
          }
        }

        NGN.BUS.once.apply(NGN.BUS, this.applyNamespace(arguments));
      }

      /**
       * @method emit
       * This is a shortcut to NGN.BUS.emit, but it adds the #namespace to the event.
       *
       * **Example**:
       * ```js
       * let MyDriver = new NGNX.Driver({
       *   namespace: 'myprefix.'
       * })
       *
       * MyDriver.emit('some.event') // <--- Emit event
       * ```
       * The last line where the event is emitted will actually send an event
       * called `prefix.some.event` to the NGN BUS. In other words, the last line
       * is the equivalent of running:
       *
       * ```js
       * NGN.BUS.emit('prefix.some.event')
       * ```
       *
       * The "value-add" of this method is prepending the namespace automatically.
       * It also supports payloads (just like NGN.BUS.emit).
       * @param {string} eventName
       * The name of the event to trigger (with the #namespace prefixed to it).
       * @param {object|string|number|boolean|array} payload
       * An object to send to the event handler.
       */

    }, {
      key: 'emit',
      value: function emit() {
        // let args = this.applyNamespace(arguments)
        // console.log(args)
        NGN.BUS.emit.apply(NGN.BUS, this.applyNamespace(arguments));
      }

      /**
       * @method pool
       * A shortcut method to create an NGN.BUS.pool. This method will automatically
       * apply the #namespace prefix to the pool. It is possible to create multiple pools
       * by using an "extra" namespace.
       *
       * **Example**
       * ```js
       * let MyDriver = new NGNX.Driver({
       *   namespace: 'myprefix.'
       * })
       *
       * MyDriver.pool('extra.', {
       *   demo: function () {
       *     ...
       *   }
       * })
       *
       * // The above is equivalent to:
       *
       * NGN.BUS.pool('myprefix.extra.', {
       *   demo: function () { ... }
       * })
       * ```
       *
       * If "extra" namespace isn't necessary, it will still apply the #namespace to events
       * in order to associate the events with this store.
       *
       * ```js
       * let MyDriver = new NGNX.Driver({
       *   namespace: 'myprefix.'
       * })
       *
       * MyDriver.pool({
       *   demo: function () {...}
       * })
       *
       * // The above is equivalent to:
       *
       * NGN.BUS.pool('myprefix.', {
       *   demo: function () { ... }
       * })
       * ```
       *
       * While this is a simple abstraction, it offers a code organization benefit.
       * Drivers can encapsulate BUS event logic in one place using a driver.
       * @param {string} [extranamespace]
       * An extra namespace to add to event listeners.
       * @param {object} handlers
       * An object containing event listeners. See NGN.BUS.pool for syntax and
       * examples.
       * @private
       */

    }, {
      key: 'pool',
      value: function pool(extra, data) {
        if ((typeof extra === 'undefined' ? 'undefined' : _typeof(extra)) === 'object') {
          data = extra;
          extra = '';
        }

        var scope = (NGN.coalesce(this.scope, '') + extra).trim();

        scope = scope.length > 0 ? scope : null;
        NGN.BUS.pool(scope, data);
      }

      /**
       * @method forward
       * Customized alias of #NGN.BUS.forward that applies namespacing to listening event.
       */

    }, {
      key: 'forward',
      value: function forward() {
        NGN.BUS.forward.apply(NGN.BUS, this.applyNamespace(arguments));
      }

      /**
       * @method delayEmit
       * Customized alias of #NGN.BUS.delayEmit that applies namespacing to listening event.
       */

    }, {
      key: 'delayEmit',
      value: function delayEmit() {
        NGN.BUS.delayEmit.apply(NGN.BUS, this.applyNamespace(arguments));
      }

      /**
       * @method threshold
       * Customized alias of #NGN.BUS.threshold that applies namespacing to listening event.
       */

    }, {
      key: 'threshold',
      value: function threshold() {
        NGN.BUS.threshold.apply(NGN.BUS, this.applyNamespace(arguments));
      }

      /**
       * @method thresholdOnce
       * Customized alias of #NGN.BUS.thresholdOnce that applies namespacing to listening event.
       */

    }, {
      key: 'thresholdOnce',
      value: function thresholdOnce() {
        NGN.BUS.thresholdOnce.apply(NGN.BUS, this.applyNamespace(arguments));
      }

      /**
       * @method attach
       * Customized alias of #NGN.BUS.attach that applies namespacing to listening event.
       */

    }, {
      key: 'attach',
      value: function attach() {
        return NGN.BUS.attach.apply(NGN.BUS, this.applyNamespace(arguments));
      }
    }, {
      key: 'references',
      get: function get() {
        return this.ref;
      }

      /**
       * @property {Object} store
       * Returns the #datastores associated with the Driver.
       */

    }, {
      key: 'store',
      get: function get() {
        return this.datastores;
      }
    }]);

    return Driver;
  }();

  NGNX.Driver = Driver;
}

'use strict';

if (!NGN) {
  console.error('NGN not found.');
} else {
  if (!window.NGN.BUS) {
    console.warn('NGNX.Loader is not available because NGN.BUS was not found.');
  } else if (!NGN.NET) {
    console.warn('NGNX.Loader is not available because NGN.NET was not found.');
  } else {
    window.NGNX = window.NGNX || {};

    /**
     * @method NGNX.Loader
     * Load files a/synchronously and fire an event/callback when everything
     * is ready. Synchronous files are loaded first in a one-by-one manner.
     * Then asynchronous files are loaded in parallel at the same time. Once
     * **all** files are loaded, the callback or event is triggered.
     *
     * **Example Using Callback**
     * ```js
     * NGNX.Loader({
     *   sync: [
     *     './path/to/file1.js',
     *     './path/to/file2.js',
     *     './path/to/file3.js',
     *   ],
     *   async: [
     *     './path/to/file4.js',
     *     './path/to/file5.js',
     *     './path/to/file6.js',
     *   ],
     * }, function (loadedFiles) {
     *   // Do Something
     *   console.log(loadedFiles) // ['array', 'of', 'files']
     * })
     * ```
     * In this example, the series of actions is as follows:
     * 1. GET ./path/to/file1.js, then:
     * 1. GET ./path/to/file2.js, then:
     * 1. GET ./path/to/file3.js, then:
     * 1. GET ./path/to/file4.js & GET ./path/to/file5.js & GET ./path/to/file6.js, then:
     * 1. Do Something
     *
     * **Example Using Callback**
     * This does the same series of actions and provides the same functionality
     * as the callback example, except it uses the NGN.BUS to identify the end
     * of the load sequence.
     * ```js
     * NGNX.Loader({
     *   sync: [
     *     './path/to/file1.js',
     *     './path/to/file2.js',
     *     './path/to/file3.js',
     *   ],
     *   async: [
     *     './path/to/file4.js',
     *     './path/to/file5.js',
     *     './path/to/file6.js',
     *   ],
     * }, 'myfiles.loaded')
     *
     * NGN.BUS.once('myfiles.loaded', function (loadedFiles) {
     *   // Do Something
     *   console.log(loadedFiles) // ['array', 'of', 'files']
     * })
     * ```
     * The advantage of using the NGN.BUS method is the listener can exist in
     * a different file from the loader.
     * @param {object} cfg
     * @param {Function|string} callbackOrEvent
     * If a function is passed in, it will be run once all files are loaded. If
     * a event name is passed in, it will be triggered on the NGN.BUS once all
     * files are loaded. The callback receives a single array argument containing
     * all of the files loaded. This same argument is sent as a payload to the
     * event bus.
     * @fires load.sync
     * Triggered when a file is loaded synchronously. Event handlers will received
     * the name of the file as an argument.
     */
    window.NGNX.Loader = function (cfg, callback) {
      var _this13 = this;

      cfg = cfg || {};

      Object.defineProperties(this, {
        /**
         * @cfg {Array|String} sync
         * The files that will be loaded one-by-one. They are loaded in the order
         * they are specified.
         */
        async: NGN.public(cfg.async || []),

        /**
         * @cfg {Array|String} async
         * The files that will be loaded asynchronously. They are all loaded at
         * the same time. Even though this is asynchronous, if a callback is
         * provided to the Loader, it will not be run until all of the files
         * are loaded. The point of this method is to reduce time-to-load (parallel
         * downloads).
         */
        sync: NGN.public(cfg.sync || [])
      });

      this.async = Array.isArray(this.async) ? this.async : [this.async];
      this.sync = Array.isArray(this.sync) ? this.sync : [this.sync];

      var meta = {
        sync: this.sync,
        async: this.async
      };

      // Synchronous file loader
      var loadSync = function loadSync(files) {
        var currentFile = files.shift();
        NGN.NET.import(currentFile, function () {
          NGN.BUS.emit('load.sync', currentFile);

          if (files.length > 0) {
            loadSync(files);
          }
        });
      };

      // Load synchronous files first
      if (meta.sync.length > 0) {
        loadSync(meta.sync);
      }

      var responder = function responder(imported, callback) {
        if (typeof callback === 'function') {
          callback(_this13.sync.concat(imported));
        } else {
          NGN.BUS.emit(callback, _this13.sync.concat(imported));
        }
      };

      // Load asynchronous files
      if (this.async.length > 0) {
        NGN.NET.import(this.async, function (imported) {
          if (window.hasOwnProperty('fetch')) {
            responder(_this13.sync.concat(imported), callback);
          } else {
            // Force a slight delay to assure everything is loaded.
            // Double timeouts forces a "nextTick" type of action in some browsers.
            setTimeout(function () {
              setTimeout(function () {
                responder(_this13.sync.concat(imported), callback);
              }, 5);
            }, 0);
          }
        });
      } else {
        if (window.hasOwnProperty('fetch')) {
          responder(this.sync.concat(this.async), callback);
        } else {
          // Double timeouts forces a "nextTick" type of action in some browsers.
          setTimeout(function () {
            setTimeout(function () {
              responder(_this13.sync.concat(_this13.async), callback);
            }, 5);
          }, 0);
        }
      }
    };
  }
}

'use strict';

/**
 * @inherits NGN.BUS
 * This user state management extension triggers events when the page
 * view changes (loading, navigates away, tab change, homescreen, etc).
 * It is a simple "semi-polyfill" that listens to the browser events
 * for desktop and mobile browsers, and responds in a standard way using
 * the NGN.BUS.
 * @fires state.change
 * Fired when the user state changes. Receives a payload of `visible`.
 * For example, to persist data when the user state changes:
 *
 * ```js
 * NGN.BUS.on('state.change', function (visible) {
 *   if (!visibile) {
 *     persistData()
 *   } else {
 *     restoreData()
 *   }
 * })
 * ```
 * @fires state.hidden
 * Fired when the state changes to "hidden". This means the
 * user switches tabs, apps, goes to homescreen, etc.
 * @fires state.visible
 * Fired when the state changes to "visible". This means the
 * user transitions from prerender, user returns to the app/tab, etc.
 */
if (!window.NGN.BUS) {
  console.warn('State management is inactive because NGN.BUS was not found.');
} else {
  window.NGNX = window.NGNX || {};
  Object.defineProperty(NGNX, 'statechangerecorded', NGN.public(false));
  NGN.BUS.on('state.change', function (visible) {
    NGN.BUS.emit('state.' + (visible ? 'visible' : 'hidden'));
  });
  var statehandler = function statehandler() {
    if (!NGNX.statechangerecorded) {
      NGNX.statechangerecorded = true;
      setTimeout(function () {
        NGNX.statechangerecorded = false;
      }, 25);
      NGN.BUS.emit('state.change', document.visibilityState === 'visible');
    }
  };
  document.addEventListener('visibilitychange', statehandler);
  document.addEventListener('beforeunload', statehandler);
  document.addEventListener('pagehide', statehandler);
}

if (!NGN) {
  console.error('NGN not found.');
} else {
  window.NGNX = window.NGNX || {};

  /**
   * @class NGNX.VIEW.Registry
   * A view registry is an organizational collection/grouping of events and
   * references that form the basis of a visual component. It is used to
   * break large applications into structured components that make sense to a
   * human being.
   *
   * NGN provides a global event bus and global references to DOM elements,
   * which are easy to understand when there are only a few. However; the
   * sheer volume of events and references in a larger application can make
   * the code base difficult to understand. View Registries provide a way to
   * group events/references in a logical and organized way.
   *
   * View Registries inherit the functionality of the NGX.Driver, which
   * automatically applies the #namespace to event names. This is an important
   * concept in understanding how event names are constructed/managed.
   *
   * **Example:**
   *
   * ```js
   * let myReg = new NGNX.VIEW.Registry({
   *   namespace: 'mycomponent.',
   *   selector: 'body main .mycomponent'
   * })
   *
   * myReg.forward('some.event', 'another.event')
   *
   * // Generic event handler
   * NGN.BUS.on('another.event', function (data) {
   *   console.log(data)
   * })
   *
   * // Fire an event
   * NGN.BUS.emit('mycomponent.some.event', data) // This is equivalent to the line below.
   * myReg.emit('some.event', data) // This is the equivalent of the line above.
   * ```
   *
   * In this example, the NGN.BUS fires an event recognized by the view registry,
   * called `mycomponent.some.event`. This is forwarded to a generic event called
   * `another.event`, which gets logged to the console.
   *
   * The view registry automatically applies the namespace, called `mycomponent.`,
   * to each event it triggers/handles. This is why `myReg.emit('some.event', data)`
   * actually fires `mycomponent.some.event`. This is also why the `myReg.forward()`
   * is passed `some.event` instead of `mycomponent.some.event`.
   * @extends NGNX.Driver
   * @fires property.changed
   * Fired when a property has changed. Event handlers will receive an object argument
   * that looks like:
   * ```js
   * {
   *   property: 'property name',
   *   old: 'old value',
   *   new: 'new value'
   * }
   * ```
   * @fires property.[field].changed
   * Fired when a specific property has changed. Event handlers will receive an
   * object argument that looks like:
   * ```js
   * {
   *   old: 'old value',
   *   new: 'new value'
   * }
   * ```
   *
   * For example, if a property called `title` exists, the
   * event would be `property.title.changed`.
   * @fires state.changed
   * Triggered when the state of the registry has changed.
   * @fires state.preprocess
   * Triggered when a #preStates process is executed. The name of
   * the preState is provided as the only parameter to event handlers.
   * @fires state.postprocess
   * Triggered when a #postStates process is executed. The name of
   * the postState is provided as the only parameter to event handlers.
   * @fires parent.state.changed
   * Triggered when the state of the parent registry has changed.
   * @fires element.removed
   * Triggered when the element (#selector) is removed from the DOM.
   * The old element is sent as the only argument to event handlers.
   * @fires monitoring.enabled
   * Triggered when DOM element monitoring becomes active.
   * @fires monitoring.disabled
   * Triggered when DOM element monitoring becomes inactive.
   */

  var NgnViewRegistry = function (_NGNX$Driver) {
    _inherits(NgnViewRegistry, _NGNX$Driver);

    function NgnViewRegistry(cfg) {
      var _arguments2 = arguments;

      _classCallCheck(this, NgnViewRegistry);

      cfg = cfg || {};

      // Require an object for the configuration
      if ((typeof cfg === 'undefined' ? 'undefined' : _typeof(cfg)) !== 'object') {
        throw new Error('Invalid configuration. Expected Object, received ' + (typeof cfg === 'undefined' ? 'undefined' : _typeof(cfg)) + '.');
      }

      // cfg.selector = NGN.coalesce(cfg.selector, cfg.element)

      // Make sure the selector has been defined.
      if (!cfg.hasOwnProperty('selector')) {
        throw new Error('Missing required configuration attribute: selector');
      } else if (typeof cfg.selector !== 'string') {
        throw new Error('Invalid selector configuration.');
      }

      // cfg.selector = typeof cfg.selector === 'string' ? cfg.selector : NGN.DOM.selectorOfElement(cfg.selector)

      // Inherit from parent
      if (cfg.hasOwnProperty('parent')) {
        if (document.querySelector(cfg.parent.selector) === null) {
          throw new Error('Parent component could not be found.');
        } else {
          cfg.selector = cfg.parent.selector + ' ' + cfg.selector;
        }

        // Prepend namespace
        if (cfg.hasOwnProperty('namespace')) {
          if (cfg.parent.scope !== null) {
            cfg.namespace = cfg.parent.scope + cfg.namespace;
          }
        } else if (cfg.parent.scope) {
          cfg.namespace = cfg.parent.scope;
        }
      }

      cfg.selector = NGN.DOM.normalizeSelector(cfg.selector);

      // If there are references, scope them according to the selector.
      if (cfg.hasOwnProperty('references')) {
        // let refMap = cfg.references
        var flattenReferences = function flattenReferences(cfg) {
          var namespace = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
          var additionalReferences = arguments[2];

          var refs = NGN.coalesce(additionalReferences, {});

          Object.keys(cfg).forEach(function (key) {
            var capitalizedKey = '' + key.substr(0, 1).toUpperCase() + key.substr(1, key.length);
            var ns = namespace !== '' ? '' + namespace + capitalizedKey : key;

            if (_typeof(cfg[key]) === 'object') {
              flattenReferences(cfg[key], ns, refs);
            } else if (typeof cfg[key] === 'string') {
              refs[ns] = cfg[key];
            }
          });

          return refs;
        };

        cfg.references = flattenReferences(cfg.references);

        Object.keys(cfg.references).forEach(function (r) {
          cfg.references[r] = NGN.DOM.normalizeSelector(cfg.selector + ' ' + cfg.references[r]);
        });
      }

      var element = document.querySelector(cfg.selector);

      if (element === null) {
        throw new Error('Could not find valid DOM element for \'' + cfg.selector + '\'');
      }

      // Initialize the NGNX.Driver

      /**
       * @cfg {NGNX.VIEW.Registry} [parent]
       * The parent View Registry. This optional configuration is commonly used
       * to break large registries into smaller/more managable registries.
       */
      var _this14 = _possibleConstructorReturn(this, (NgnViewRegistry.__proto__ || Object.getPrototypeOf(NgnViewRegistry)).call(this, cfg));

      Object.defineProperties(_this14, {
        /**
         * @cfg {string} element (required)
         * The element or CSS selector string of the DOM element to manage.
         * This is used as the "root" of all NGN references & events.
         */
        selector: NGN.const(cfg.selector),

        _element: NGN.private(element),

        /**
         * @cfg {NGNX.VIEW.Registry} parent
         * A parent registry. This identifies the view registry
         * as a child of another.
         */
        _parent: NGN.privateconst(NGN.coalesce(cfg.parent)),

        /**
         * @cfg {Object} properties
         * Specify the properties of the registry. Properties
         */
        propertyFields: NGN.private(NGN.coalesce(cfg.properties)),

        _properties: NGN.private(null),

        /**
         * @cfg {Object} [states]
         * Define what happens in each state. This is a key/value object
         * where the key represents the name/identifier of the state (string)
         * and the value is a function. The function receives a single argument,
         * the state change object. This object contains the old and new state.
         *
         * **Example**
         *
         * ```js
         * let Registry = new NGNX.VIEW.Registry({
         *   namespace: 'myscope.',
         *   selector: '.path .to element',
         *   references: {
         *     connectionIndicator: '#indicator',
         *     description: 'body > .description'
         *   },
         *   properties: {
         *     online: Boolean,
         *     description: {
         *       type: String,
         *       default: 'No description available.'
         *     }
         *   },
         *   states: {
         *     default: (stateChange) => {
         *       this.properties.description = 'Unknown'
         *     },
         *
         *     offline: (stateChange) => {
         *       if (stateChange.old !== 'offline') {
         *         this.properties.description = 'No connection established.'
         *       }
         *
         *       this.ref.connectionIndicator.classList.remove('online')
         *     },
         *
         *     online: (stateChange) => {
         *       if (stateChange.new === 'online') {
         *         this.properties.description = 'Connection established to remote server.'
         *       }
         *
         *       this.ref.connectionIndicator.classList.add('online')
         *     }
         *   },
         *   initialState: 'offline'
         * })
         *
         * Registry.on('property.change', (change) => {
         *   if (change.property === 'description') {
         *     this.ref.description.innerHTML = change.new
         *   }
         * })
         *
         * // Change the state to "online"
         * Registry.state = 'online'
         *
         * console.log(Registry.state) // Outputs "online"
         *
         * // Change the state back to "offline" after 3 seconds
         * setTimeout(() => {
         *   Registry.state = 'offline'
         * }, 3000)
         * ```
         */
        _states: NGN.private(NGN.coalesce(cfg.states, {})),

        _state: NGN.private('default'),

        /**
         * @cfg {object} preStates
         * This option provides pre-hook style operations that run before a
         * state change occurs. For example:
         *
         * ```js
         * let myRegistry = new NGNX.VIEW.Registry({
         *   selector: '#portal',
         *   properties: {
         *     authorized: {
         *       type: Boolean,
         *       default: false
         *     }
         *   },
         *   states: {
         *     login: function () {...},
         *     privatehomescreen: function () {...},
         *     anotherprivatescreen: function () {...}
         *   },
         *
         *   prestates: {
         *     '*': function (currentState, proposedState) {
         *       console.log(`Switching from ${currentState} to ${proposedState}!`)
         *     },
         *
         *     privatehomescreen: function () {
         *       if (!this.properties.authorized) {
         *         return false
         *       }
         *     },
         *
         *     anotherprivatescreen: function (currentState, proposedState, next) {
         *       myAsyncOperation(function (err, response) {
         *         console.log(response)
         *         next()
         *       })
         *     }
         *   }
         * })
         * ```
         *
         * In the example above, the `'*'` "prestate" is a catch-all that operates
         * **before** _every state change_ and **before** _every other prestate_.
         * For every state change, it will log a message
         * to the console stating "Switching from ____ to ____!"
         *
         * The `privatehomescreen` prestate synchronously checks the registry
         * properties to see if the user is authorized to do so. If not, it returns
         * `false`, which will prevent the state change from happening.
         *
         * The `anotherprivatescreen` prestate runs an asynchronous function, such
         * as an HTTP/AJAX request before proceeding to change the state.
         */
        _prestates: NGN.private(NGN.coalesce(cfg.prestates, cfg.preStates, null)),

        /**
         * @cfg {object} postStates
         * This option provides post-hook style operations that run after a
         * state change occurs. For example:
         *
         * ```js
         * let myRegistry = new NGNX.VIEW.Registry({
         *   selector: '#portal',
         *   properties: {
         *     authorized: {
         *       type: Boolean,
         *       default: false
         *     }
         *   },
         *   states: {
         *     login: function () {...},
         *     privatehomescreen: function () {...},
         *     anotherprivatescreen: function () {...}
         *   },
         *
         *   postStates: {
         *     '*': function () {
         *       console.log(`Switced from ${this.previousState} to ${this.state}!`)
         *     },
         *
         *     login: function () {
         *       console.log('User needs to login again.')
         *     }
         *   }
         * })
         * ```
         *
         * In the example above, the `'*'` "poststate" is a catch-all that operates
         * **after** _every state change_, but **before** _every other poststate_.
         * Every time a state change occurs, it will
         * log "Switched from ____ to ____!". Notice no parameters are passed to
         * the functions, because all state changes are known after they complete.
         *
         * In this example, changing to the `login` state would log a message
         * indicating the user needs to login again.
         */
        _poststates: NGN.private(NGN.coalesce(cfg.poststates, cfg.postStates, null)),

        displaystate: NGN.private(null),

        _previousstate: NGN.private(null),

        /**
         * @cfg {string} [initialState=default]
         * Specify the initial state of the registry.
         */
        initialstate: NGN.private(NGN.coalesce(cfg.initialState, cfg.initialstate, 'default')),

        /**
         * @cfg {Object} [reactions]
         * Map #parent states to the registry #states. This can be used to
         * automatically cascade state changes throughout a view.
         *
         * **Example**
         *
         * ```js
         * let Registry = new NGNX.VIEW.Registry({
         *   parent: MyParentView Registry,
         *   namespace: 'myscope.',
         *   selector: '.path .to element',
         *   references: {
         *     connectionIndicator: '#indicator',
         *     description: 'body > .description'
         *   },
         *   properties: {
         *     online: Boolean,
         *     description: {
         *       type: String,
         *       default: 'No description available.'
         *     }
         *   },
         *   states: {
         *     default: (stateChange) => {
         *       this.properties.description = 'Unknown'
         *     },
         *
         *     offline: (stateChange) => {
         *       if (stateChange.old !== 'offline') {
         *         this.properties.description = 'No connection established.'
         *       }
         *
         *       this.ref.connectionIndicator.classList.remove('online')
         *     },
         *
         *     online: (stateChange) => {
         *       if (stateChange.new === 'online') {
         *         this.properties.description = 'Connection established to remote server.'
         *       }
         *
         *       this.ref.connectionIndicator.classList.add('online')
         *     }
         *   },
         *   initialState: 'offline',
         *   reactions: {
         *     connected: 'online',
         *     disconnected: 'offline'
         *   }
         * })
         *
         * MyParentView Registry.state = 'connected'
         *
         * console.log(Registry.state) // Outputs "online"
         * ```
         *
         * In this example, setting the #parent state to `connected`
         * is detected by `Registry`, which reacts by setting its own
         * state to `online`.
         */
        _reactions: NGN.private(NGN.coalesce(cfg.reactions)),

        /**
         * @cfg {Object|Array} reflexes
         * Map arbitrary states (from a non-parent registry) to the
         * registry #states. Multiple reflexes can be applied simultaneously by
         * passing an array instead of a single object.
         *
         * Reflexes are a special kind of reaction. A _reaction_ responds
         * to state changes in the #parent, whereas a _reflex_ responds to
         * state changes in an arbitrary view registries.
         *
         * **Example**
         *
         * ```js
         * let Registry = new NGNX.VIEW.Registry({
         *   parent: MyParentView Registry,
         *   namespace: 'myscope.',
         *   selector: '.path .to element',
         *   references: {
         *     connectionIndicator: '#indicator',
         *     description: 'body > .description'
         *   },
         *   properties: {
         *     online: Boolean,
         *     description: {
         *       type: String,
         *       default: 'No description available.'
         *     }
         *   },
         *   states: {
         *     default: (stateChange) => {
         *       this.properties.description = 'Unknown'
         *     },
         *
         *     offline: (stateChange) => {
         *       if (stateChange.old !== 'offline') {
         *         this.properties.description = 'No connection established.'
         *       }
         *
         *       this.ref.connectionIndicator.classList.remove('online')
         *     },
         *
         *     online: (stateChange) => {
         *       if (stateChange.new === 'online') {
         *         this.properties.description = 'Connection established to remote server.'
         *       }
         *
         *       this.ref.connectionIndicator.classList.add('online')
         *     }
         *   },
         *   initialState: 'offline',
         *   reactions: {
         *     connected: 'online',
         *     disconnected: 'offline'
         *   },
         *   reflexes: {
         *     registry: someOtherRegistry,
         *     reactions: {
         *       pause: 'offline',
         *       play: 'online'
         *     }
         *   }
         * })
         *
         * someOtherRegistry.state = 'pause'
         *
         * console.log(Registry.state) // Outputs "offline"
         * ```
         */
        _reflexes: NGN.private(NGN.coalesce(cfg.reflexes, [])),

        /**
         * @cfg {function} init
         * Initialize the view registry by running this method before
         * the initial state is set. This is useful for applying event
         * listeners to DOM elements, performing operations before
         * modifying visual layouts, or handling data before any other
         * operations are performed.
         *
         * The init method will receive a single argument that can be used
         * to asynchronously trigger the `initialized` event.
         *
         * ```js
         * let MyReg = new NGNX.VIEW.Registry({
         *   selector: '.selector .path',
         *   namespace: 'test.',
         *   init: function (next) {
         *     someAjaxCall(function (response) {
         *       ... do something with response ...
         *       next()
         *     })
         *   }
         * })
         * ```
         */
        _init: NGN.privateconst(NGN.coalesce(cfg.init)),

        _activeViewportState: NGN.private(null),

        /**
         * @cfg {Boolean} [monitor=false]
         * Set this to `true` to trigger events when the element (#selector)
         * is removed from the DOM.
         */
        monitoring: NGN.private(false),
        _monitor: NGN.private(null) // Placeholder for mutation observer

        // refMap: NGN.privateconst(NGN.coalesce(refMap, null))
      });

      // Assure a default state method exists
      if (!_this14._states.hasOwnProperty('default')) {
        _this14._states['default'] = function () {}; // No-op default
      }

      // If reflexes exist as an object, convert to an array
      if (!Array.isArray(_this14._reflexes)) {
        _this14._reflexes = [_this14._reflexes];
      }

      // Create a self reference by Driver ID (inherited)
      NGNX.REF.create(_this14.id, _this14.selector);

      // Initialize the properties store
      if (_this14.propertyFields !== null) {
        _this14._properties = new NGN.DATA.Model({
          fields: _this14.propertyFields
        })();

        _this14.on('property.changed', function (change) {
          _this14.emit('property.' + change.property + '.changed', {
            old: change.old,
            new: change.new
          });

          _this14.emit('property.changed.' + change.property, {
            old: change.old,
            new: change.new
          });
        });

        _this14._properties.on('field.update', function (change) {
          if (change.old !== change.new) {
            _this14.emit('property.changed', {
              property: change.field,
              old: change.old,
              new: change.new
            });
          }
        });

        _this14._properties.on('field.create', function (change) {
          _this14.emit('property.changed', {
            property: change.field,
            old: null,
            new: NGN.coalesce(_this14._properties[change.field])
          });
        });

        _this14._properties.on('field.delete', function (change) {
          _this14.emit('property.changed', {
            property: change.field,
            old: change.value,
            new: null
          });
        });
      }

      // Watch the parent, if it exists.
      if (_this14._parent) {
        // If a parent exists, bubble state & property events down the chain.
        _this14._parent.on('state.changed', function (state) {
          _this14.emit('parent.state.changed', state);
        });

        _this14._parent.on('property.changed', function (change) {
          _this14.emit('parent.property.changed', change);
        });
      }

      // React to changes in the parent view.
      _this14.on('parent.state.changed', function (state) {
        if (_this14.managesReaction(state.new)) {
          _this14.state = _this14.reactions[state.new];
        }
      });

      // Initialize Reflex Handlers
      _this14._reflexes.forEach(function (reflex) {
        reflex.registry.on('state.changed', _this14.reflexHandler(reflex.registry));
      });

      // Apply scope warnings to all state handlers

      var _loop5 = function _loop5(scope) {
        var handlerFn = _this14._states[scope];
        _this14._states[scope] = function (change) {
          try {
            handlerFn.apply(_this14, _arguments2);
          } catch (e) {
            var fnString = handlerFn.toString().toLowerCase();
            if (fnString.indexOf('this.') >= 0 && fnString.indexOf('function') < 0) {
              console.warn('The %c' + scope + '%c state handler on line ' + NGN.stack.pop().line + ' references the lexical %cthis%c scope, which may be the cause of the error if the handler is defined as a fat arrow function. This can be resolved by using a real function instead of a fat arrow function.', NGN.css, 'font-weight: 100;', NGN.css, 'font-weight: 100;');
            }

            throw e;
          }
        };
      };

      for (var scope in _this14._states) {
        _loop5(scope);
      }

      // Optional Initialization
      if (_this14._init) {
        if (_this14._init.length === 1) {
          // Async
          _this14._init(function () {
            return NGNX.util.requeue(function () {
              return _this14.emit('initialized');
            });
          });
        } else {
          _this14._init();
          NGNX.util.requeue(function () {
            return _this14.emit('initialized');
          });
        }
      } else {
        NGNX.util.requeue(function () {
          return _this14.emit('initialized');
        });
      }

      // Set the initial state.
      if (_this14.initialstate !== _this14._state && _this14.managesState(_this14.initialstate)) {
        NGNX.util.requeue(function () {
          _this14._state = _this14.initialstate;
          _this14._states[_this14._state]();
        });
      } else if (_this14._state === 'default') {
        _this14._states.default();
      }

      if (_this14.monitoring) {
        _this14.enableElementMonitor();
      }
      return _this14;
    }

    /**
     * @property {NGNX.VIEW.Registry} parent
     * Returns the parent registry or `null` if there is no parent.
     */


    _createClass(NgnViewRegistry, [{
      key: 'elementInViewport',


      /**
       * @method elementInViewport
       * Determines whether a DOM element is in the viewport or not.
       * @param {HTMLElement} element
       * The DOM element to check.
       * @returns {boolean}
       * @private
       */
      value: function elementInViewport(element) {
        var x = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
        var y = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 100;

        var rect = element.getBoundingClientRect();
        var tolerance = 0.01; // getBoundingClientRect provides the position up to 10 decimals
        var parentRects = [];

        while (element.parentElement !== null) {
          parentRects.push(element.parentElement.getBoundingClientRect());
          element = element.parentElement;
        }

        return parentRects.every(function (parentRect) {
          var visiblePixelX = Math.min(rect.right, parentRect.right) - Math.max(rect.left, parentRect.left);
          var visiblePixelY = Math.min(rect.bottom, parentRect.bottom) - Math.max(rect.top, parentRect.top);
          var visiblePercentageX = visiblePixelX / rect.width * 100;
          var visiblePercentageY = visiblePixelY / rect.height * 100;

          return visiblePercentageX + tolerance > x && visiblePercentageY + tolerance > y;
        });
      }

      /**
       * @method enableScrollMonitor
       * Enables scroll monitoring associated with the #selector element.
       * This method enables `enterViewport` and `exitViewport` events.
       */

    }, {
      key: 'enableScrollMonitor',
      value: function enableScrollMonitor() {
        var _this15 = this;

        this._activeViewportState = NGN.coalesce(this._activeViewportState, this.inViewport);
        window.addEventListener('scroll', function (scrollEvent) {
          return _this15.handleScrollEvent(scrollEvent);
        });
      }

      /**
       * @method disableScrollMonitor
       * Disables scroll monitoring associated with the #selector element.
       * This method prevents `enterViewport` and `exitViewport` events from firing.
       */

    }, {
      key: 'disableScrollMonitor',
      value: function disableScrollMonitor() {
        var _this16 = this;

        this._activeViewportState = null;
        window.removeEventListener('scroll', function (scrollEvent) {
          return _this16.handleScrollEvent(scrollEvent);
        });
      }

      /**
       * @method handleScrollEvent
       * Responsible for determining when a DOM element is in the viewport
       * and emitting an event when it changes (enter/exit viewport).
       * @param {Event} scrollevent
       * The scroll event.
       * @private
       */

    }, {
      key: 'handleScrollEvent',
      value: function handleScrollEvent(e) {
        var inView = this.inViewport;

        if (this._activeViewportState !== inView) {
          this._activeViewportState = inView;
          this.emit(inView ? 'enterViewport' : 'exitViewport', this.self.element);
        }
      }

      /**
       * @method enableElementMonitor
       * Enables element monitoring. This is the same as setting #monitor to `true`.
       * @private
       */

    }, {
      key: 'enableElementMonitor',
      value: function enableElementMonitor() {
        var _this17 = this;

        this._monitor = new MutationObserver(function (mutations) {
          mutations.forEach(function (mutation) {
            // Make sure the element still exists (otherwise it was deleted permanently)
            if (_this17._element) {
              if (mutation.type === 'childList') {
                setTimeout(function () {
                  for (var node = 0; node < mutation.addedNodes.length; node++) {
                    if (mutation.removedNodes[node] === _this17._element) {
                      _this17.emit('element.removed', mutation.removedNodes[node]);
                      _this17.disableElementMonitor();
                      break;
                    }
                  }
                }, 0);
              }
            }
          });
        });

        this._monitor.observe(this._element.parentNode, {
          childList: true
        });

        this.monitoring = true;

        this.emit('monitoring.enabled');
      }

      /**
       * @method disableElementMonitor
       * Disables element monitoring. This is the same as setting #monitor to `false`.
       * @private
       */

    }, {
      key: 'disableElementMonitor',
      value: function disableElementMonitor() {
        this.monitoring = false;

        if (this._monitor) {
          this._monitor.disconnect();
          this._monitor = null;
          this.emit('monitoring.disabled');
        }
      }

      /**
       * @method managesState
       * Indicates the view registry manages a specific state.
       * @param {string} state
       * The name of the state to check for.
       * returns {boolean}
       * @private
       */

    }, {
      key: 'managesState',
      value: function managesState(state) {
        return this._states.hasOwnProperty(state) && NGN.isFn(this._states[state]);
      }

      /**
       * @method managesPreState
       * Indicates the view registry manages a specific pre-state-change hook.
       * @param {string} state
       * The name of the state to check for.
       * returns {boolean}
       * @private
       */

    }, {
      key: 'managesPreState',
      value: function managesPreState(state) {
        if (!this._prestates) {
          return false;
        }

        return this._prestates.hasOwnProperty(state) && NGN.isFn(this._prestates[state]);
      }

      /**
       * @method managesPostState
       * Indicates the view registry manages a specific post-state-change hook.
       * @param {string} state
       * The name of the state to check for.
       * returns {boolean}
       * @private
       */

    }, {
      key: 'managesPostState',
      value: function managesPostState(state) {
        if (!this._poststates) {
          return false;
        }

        return this._poststates.hasOwnProperty(state) && NGN.isFn(this._poststates[state]);
      }

      /**
       * @method clearPreStates
       * Remove all pre-state-change hooks.
       */

    }, {
      key: 'clearPreStates',
      value: function clearPreStates() {
        this._prestates = null;
      }

      /**
       * @method clearPostStates
       * Remove all post-state-change hooks.
       */

    }, {
      key: 'clearPostStates',
      value: function clearPostStates() {
        this._poststates = null;
      }

      /**
       * @method managesReaction
       * Indicates the view registry manages a specific parent-child reaction.
       * @param {string} parentState
       * The name of the parent state to check for.
       * returns {boolean}
       * @private
       */

    }, {
      key: 'managesReaction',
      value: function managesReaction(state) {
        return this.reactions.hasOwnProperty(state);
      }

      /**
       * @method createReaction
       * Add a new #reaction mapping dynamically.
       * @param {string} parentState
       * The parent state to react to.
       * @param {string} reactionState
       * The state to set when the parentState is recognized.
       */

    }, {
      key: 'createReaction',
      value: function createReaction(source, target) {
        if (!this._parent) {
          console.warn('Cannot create a reaction to a parent view registry when no parent is configured.');
          return;
        }

        this._reactions[source] = target;
      }

      /**
       * @method removeReaction
       * Remove a #reaction mapping dynamically.
       * @param {string} parentState
       * The parent state.
       */

    }, {
      key: 'removeReaction',
      value: function removeReaction(source) {
        if (this.reactions.hasOwnProperty(source)) {
          delete this._reactions[source];
        }
      }

      /**
       * @method clearReactions
       * Remove all reactions.
       */

    }, {
      key: 'clearReactions',
      value: function clearReactions() {
        this._reactions = null;
      }

      /**
       * @method managesReflex
       * Indicates the view registry manages a specific registry-registry reaction (reflex).
       * @param {NGNX.VIEW.Registry} registry
       * The registry whose state changes are observed.
       * @param {string} state
       * The registry state the reflex is responding to.
       * returns {boolean}
       * @private
       */

    }, {
      key: 'managesReflex',
      value: function managesReflex(registry, state) {
        var reactions = this.getRegistryReflexReactions(registry);

        return Object.keys(reactions).contains(state);
      }

      /**
       * @class getRegistryReflex
       * Returns a specific reflex.
       * @param {NGNX.VIEW.Registry} registry
       * The registry to retrieve.
       * @returns {Object}
       * Returns a key/value object mimicking #reactions.
       * @private
       */

    }, {
      key: 'getRegistryReflex',
      value: function getRegistryReflex(registry) {
        var reflexes = this.reflexes.filter(function (reflex) {
          return reflex.registry === registry;
        });

        return reflexes.length === 1 ? reflexes[0] : {};
      }

      /**
       * @class getRegistryReflexReactions
       * Returns a specific reflex for the specified registry.
       * @param {NGNX.VIEW.Registry} registry
       * The registry whose reactions are being requested.
       * @returns {Object}
       * Returns a key/value object mimicking #reactions.
       * @private
       */

    }, {
      key: 'getRegistryReflexReactions',
      value: function getRegistryReflexReactions(registry) {
        var reflexes = this.getRegistryReflex(registry);

        return reflexes.length === 0 ? {} : reflexes.reactions;
      }

      /**
       * @method getRegistryReflexIndex
       * Returns the index of the registry reflex within the #reflexes array.
       * @param NGNX.VIEW.Registry} registry
       * The registry whose reactions are being requested.
       * @returns {Nubmer}
       * @private
       */

    }, {
      key: 'getRegistryReflexIndex',
      value: function getRegistryReflexIndex(registry) {
        var index = -1;

        this.getRegistryReflex(registry).filter(function (reflex, i) {
          if (reflex.registry === registry) {
            index = i;
            return true;
          }

          return false;
        });

        return index;
      }

      /**
       * @method createReflex
       * Add a new #reflexes mapping dynamically.
       * @param {NGNX.VIEW.Registry} registry
       * The registry to monitor for state changes.
       * @param {string} sourceState
       * The registry state to listen for.
       * @param {string} reactionState
       * The state to set when the sourceState is recognized.
       */

    }, {
      key: 'createReflex',
      value: function createReflex(registry, source, target) {
        if (!registry) {
          console.warn('Cannot create a reflex because the source registry does not exist or could no be found.');
          return;
        }

        // Get any existing reactions
        var reactions = this.getRegistryReflexReactions(registry);

        // If the specified reactions already exist within the reflex, warn the user.
        if (reactions.hasOwnProperty(source)) {
          console.warn('The "' + registry.selector + '" view registry reflex (' + source + ' --> ' + target + ') was overridden.');
        }

        // Append/overwrite the reflex reactions with the source and target.
        reactions[source] = target;

        var reflex = {
          registry: registry,
          reactions: reactions
        };

        // Replace the old reflex configuration with the new one.
        var index = this.getRegistryReflexIndex(registry);

        if (index >= 0) {
          // Updating existing reflexes
          this._reflexes = this._reflexes.splice(index, 1, reflex);
        } else {
          // Create a new reflex
          this._reflexes.push(reflex);

          // Add the registry listener
          registry.on('state.changed', this.reflexHandler(registry));
        }
      }

      /**
       * @method removeReflex
       * Remove a #reflexes mapping dynamically.
       * @param {NGNX.VIEW.Registry} registry
       * The registry to monitor for state changes.
       * @param {string} state
       * The registry state to listen for.
       */

    }, {
      key: 'removeReflex',
      value: function removeReflex(registry, state) {
        if (this.managesReflex(registry, state)) {
          var reactions = this.getRegistryReflexReactions(registry);

          // Remove the reaction
          delete reactions[state];

          // If this was the last reaction, remove the entire reflex registry
          var index = this.getRegistryReflexIndex(registry);
          if (Object.keys(reactions).length >= 0) {
            // Modify reflex (not empty)
            this._reflexes = this._reflexes.splice(index, 1);
          } else {
            // Remove empty reflex
            this._reflexes = this._reflexes.splice(index, 1, {
              registry: registry,
              reactions: reactions
            });

            // Remove orphaned event handler.
            registry.off('state.changed', this.reflexHandler(registry));
          }
        }
      }

      /**
       * @method clearReactions
       * Remove all reactions.
       */

    }, {
      key: 'clearReflexes',
      value: function clearReflexes() {
        var _this18 = this;

        this._reflexes.forEach(function (reflex) {
          reflex.registry.off('state.changed', _this18.reflexHandler(reflex.registry));
        });

        this._reflexes = [];
      }

      /**
       * @method reflexHandler
       * Respond to reflex events.
       * @param {NGNX.VIEW.Registry} registry
       * The view registry to handle.
       * @private
       */

    }, {
      key: 'reflexHandler',
      value: function reflexHandler(registry) {
        var _this19 = this;

        return function (change) {
          var reactions = _this19.getRegistryReflexReactions(registry);

          if (reactions.hasOwnProperty(registry.state)) {
            _this19.state = reactions[registry.state];
          }
        };
      }

      /**
       * @method destroy
       * Destroy the DOM element associated with the View Registry.
       * This does not affect any parent elements.
       */

    }, {
      key: 'destroy',
      value: function destroy() {
        if (!NGN.hasOwnProperty('DOM')) {
          throw new Error('NGN.DOM is required to invoke the destroy method.');
        }

        NGN.DOM.destroy(this.self.element);
      }

      /**
       * @method hide
       * A helper method to hide the primary reference.
       * This is accomplished by setting `display: none;`
       * on the component matching the main #selector.
       * The original `display` value is saved so the #show
       * method can redisplay the element correctly.
       */

    }, {
      key: 'hide',
      value: function hide() {
        if (this.self.element.style && this.self.element.style.display) {
          this.displaystate = NGN.coalesce(this.self.element.style.display);
        }

        this.self.element.style.display = 'none';
      }

      /**
       * @method show
       * A helper method to show the primary reference.
       * This is accomplished by setting `display: <ORIGINAL_VALUE>;`
       * on the component matching the main #selector. The original
       * value is saved by the #hide method. If this method is called
       * _before_ #hide is called, the display will be set to `''`.
       */

    }, {
      key: 'show',
      value: function show() {
        this.self.element.style.display = NGN.coalesce(this.displaystate, '');
      }
    }, {
      key: 'parent',
      get: function get() {
        return NGN.coalesce(this._parent);
      }

      /**
       * @property {NGNX.REF} element
       * The NGN reference to the DOM #selector DOM element.
       * @readonly
       */

    }, {
      key: 'self',
      get: function get() {
        return NGNX.REF[this.id];
      }

      /**
       * @property {Object} reactions
       * Retrieve the reactions defined in the configuration.
       * @readonly
       */

    }, {
      key: 'reactions',
      get: function get() {
        return NGN.coalesce(this._reactions, {});
      }

      /**
       * @property {Array} reflexes
       * Retrieve the reflexes defined in the configuration.
       * @readonly
       */

    }, {
      key: 'reflexes',
      get: function get() {
        return NGN.coalesce(this._reflexes, []);
      }

      /**
       * @property {String} previousState
       * The most recent prior state of the view registry.
       * @readonly
       */

    }, {
      key: 'previousState',
      get: function get() {
        return NGN.coalesce(this._previousstate, 'default');
      }

      /**
       * @property {String} state
       * The current state of the view registry.
       */

    }, {
      key: 'state',
      get: function get() {
        return NGN.coalesce(this._state, 'default');
      }

      /**
       * @event state.changed
       * Fired when the state changes. Handlers of this event will be
       * provided an object containing the old and new state:
       *
       * ```js
       * {
       *   old: 'old_state',
       *   new: 'new_state'
       * }
       * ```
       */
      ,
      set: function set(value) {
        var _this20 = this;

        value = NGN.coalesce(value, this.initialstate, 'default');

        // If there is no change, don't update the state.
        if (this.state === value) {
          return;
        }

        // If the state isn't recognized, throw an error.
        if (!this.managesState(value)) {
          console.warn('Could not change from%c ' + this.state + '%c to %c' + value + '%c state.%c ' + value + '%c is not a valid state.', NGN.css, 'font-weight: normal;', NGN.css, 'font-weight: normal;', NGN.css, 'font-weight: normal;');

          console.groupCollapsed('Valid States');
          Object.keys(this._states).forEach(function (state) {
            return console.log(state);
          });
          console.groupEnd();

          throw new Error(value + ' is not state managed by the View Registry.');
        }

        var updated = false;

        var updateState = function updateState() {
          if (updated) {
            return;
          }

          updated = true;

          _this20._previousstate = _this20.state;
          _this20._state = value.toString().trim();

          var change = {
            old: _this20._previousstate,
            new: _this20._state
          };

          // Apply state changes
          _this20._states[_this20._state](change);
          _this20.emit('state.changed', change);

          change = null;

          // Support global post-state-change hook
          if (_this20.managesPostState('*')) {
            _this20._poststates['*']();
            _this20.emit('state.postprocess', '*');
          }

          // Support specific post-state-change hook
          if (_this20.managesPostState(value)) {
            _this20._poststates[value]();
            _this20.emit('state.postprocess', value);
          }
        };

        // If there are no pre-state handlers, just update the state
        // without setting up a taskrunner.
        if (!this.managesPreState('*') && !this.managesPreState(value)) {
          updateState();
        }

        // Change state as a series of tasks
        var tasks = new NGN.Tasks();

        // Run the global pre-state-change hook first, if it is present.
        if (this.managesPreState('*')) {
          tasks.add('Execute global prestate (*).', function (next) {
            var continueProcessing = NGN.coalesce(_this20._prestates['*'].apply(_this20, [_this20.state, value, function () {
              _this20.emit('state.preprocess', '*');
              next();
            }]), true);

            // Support synchronous execution when applicable
            if (_this20._prestates['*'].length !== 3) {
              if (continueProcessing) {
                _this20.emit('state.preprocess', '*');
                next();
              } else {
                tasks.abort();
              }
            }
          });
        }

        // Run the state change if it is present.
        if (this.managesPreState(value)) {
          tasks.add('Execute specific ' + value + ' prestate.', function (next) {
            var continueProcessing = NGN.coalesce(_this20._prestates[value].apply(_this20, [_this20.state, value, function () {
              _this20.emit('state.preprocess', value);
              next();
            }]), true);

            // Support synchronous execution when applicable
            if (_this20._prestates[value].length !== 3) {
              if (continueProcessing) {
                _this20.emit('state.preprocess', value);
                next();
              } else {
                tasks.abort();
              }
            }
          });
        }

        // Run the update if the process isn't aborted by this point.
        tasks.add('Set to ' + value + ' state.', updateState);

        tasks.run(true); // Run tasks sequentially to assure order
      }

      /**
       * @property {Array} states
       * A list of states managed by the view registry.
       * @readonly
       */

    }, {
      key: 'states',
      get: function get() {
        return Object.keys(this._states);
      }

      /**
       * @property {Array} preStates
       * A list of pre-state-change hooks managed by the view registry.
       * @readonly
       */

    }, {
      key: 'preStates',
      get: function get() {
        if (!this._prestates) {
          return [];
        }
        return Object.keys(this._prestates);
      }

      /**
       * @property {Array} postStates
       * A list of post-state-change hooks managed by the view registry.
       * @readonly
       */

    }, {
      key: 'postStates',
      get: function get() {
        if (!this._poststates) {
          return [];
        }
        return Object.keys(this._poststates);
      }

      /**
       * @property {NGN.DATA.Model} properties
       * A reference to the properties of the registry.
       * @readonly
       */

    }, {
      key: 'properties',
      get: function get() {
        if (this._properties === null) {
          console.warn('Registry properties were requested, but none are configured.');
          return {};
        }

        return this._properties;
      }

      /**
       * @property {boolean} inViewport
       * Determines whether the registry element (#selector) is
       * completely in the viewport or not.
       */

    }, {
      key: 'inViewport',
      get: function get() {
        return this.elementInViewport(this.self.element);
      }
    }]);

    return NgnViewRegistry;
  }(NGNX.Driver);

  NGNX.VIEW = NGNX.VIEW || {};
  NGNX.VIEW.Registry = NgnViewRegistry;
  // NGNX.ViewRegistry = NGN.deprecateClass(NGNX.VIEW.Registry, 'NGNX.ViewRegistry is now NGNX.VIEW.Registry')
  // Object.defineProperty(NGNX, 'View Registry', NGN.const(View Registry))
}

'use strict';

if (!NGNX) {
  console.error('NGNX not found.');
} else if (!NGNX.VIEW) {
  console.error('NGNX.VIEW namespace not found.');
} else if (!NGNX.VIEW.Registry) {
  console.error('NGNX.VIEW.Registry not found.');
} else {
  /**
   * @class NGNX.VIEW.Component
   * A view component is a reusable NGNX.VIEW.Registry that belongs to
   * a specific element.
   */
  var NgnViewComponent = function (_NGNX$VIEW$Registry) {
    _inherits(NgnViewComponent, _NGNX$VIEW$Registry);

    function NgnViewComponent(cfg) {
      _classCallCheck(this, NgnViewComponent);

      cfg = cfg || {};

      /**
       * @cfg {HTMLElement} element
       * The DOM element used as a component.
       */
      if (!cfg.hasOwnProperty('element')) {
        throw new Error('A required configuration attribute (element) was not defined.');
      } else if (!(cfg.element instanceof Element)) {
        throw new Error('The specified element is a not a valid DOM element.');
      }

      var parent = void 0; // eslint-disable-line no-unused-vars

      if (cfg.hasOwnProperty('parent')) {
        parent = cfg.parent.self; // eslint-disable-line no-unused-vars
      }

      cfg.selector = NGN.DOM.getElementSelector(cfg.element, NGN.coalesce(parent, document.body)); // eslint-disable-line no-undef

      cfg.namespace = NGN.coalesce(cfg.namespace, '');
      cfg.namespace = (cfg.namespace.length > 0 ? '.' : '') + NGN.DATA.util.GUID() + '.';

      return _possibleConstructorReturn(this, (NgnViewComponent.__proto__ || Object.getPrototypeOf(NgnViewComponent)).call(this, cfg));
    }

    return NgnViewComponent;
  }(NGNX.VIEW.Registry);

  NGNX.VIEW.Component = NgnViewComponent;
}
Object.defineProperty(NGNX, 'version', NGN.const('1.7.13')); console.info('%cDebugging%c NGNX v1.7.13', 'font-weight: bold;', 'font-weight: normal')