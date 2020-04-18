var nextUniqueId = 0;

/* @ngInject */
function UtilFactory($document, $timeout, $compile, $rootScope) {
  // Polyfill document.contains for IE11.
  document.contains ||
    (document.contains = function (node) {
      return document.body.contains(node);
    });

  var $sdUtil = {
    dom: {},
    now:
      window.performance && window.performance.now
        ? angular.bind(window.performance, window.performance.now)
        : Date.now ||
        function () {
          return new Date().getTime();
        },

    /**
     * Parses an attribute value, mostly a string.
     * By default checks for negated values and returns `false´ if present.
     * Negated values are: (native falsy) and negative strings like:
     * `false` or `0`.
     * @param value Attribute value which should be parsed.
     * @param negatedCheck When set to false, won't check for negated values.
     * @returns {boolean}
     */
    parseAttributeBoolean: function (value, negatedCheck) {
      return (
        value === "" ||
        (!!value &&
          (negatedCheck === false || (value !== "false" && value !== "0")))
      );
    },

    /**
     * Get a unique ID.
     *
     * @returns {string} an unique numeric string
     */
    nextUid: function () {
      return "" + nextUniqueId++;
    },

    /**
     * Returns true if the parent form of the element has been submitted.
     *
     * @param element An AngularJS or HTML5 element.
     *
     * @returns {boolean}
     */
    isParentFormSubmitted: function (element) {
      var parent = $sdUtil.getClosest(element, "form");
      var form = parent ? angular.element(parent).controller("form") : null;

      return form ? form.$submitted : false;
    },

    /**
 * getClosest replicates jQuery.closest() to walk up the DOM tree until it finds a matching
 * nodeName.
 *
 * @param {Node} el Element to start walking the DOM from
 * @param {string|function} validateWith If a string is passed, it will be evaluated against
 * each of the parent nodes' tag name. If a function is passed, the loop will call it with each
 * of the parents and will use the return value to determine whether the node is a match.
 * @param {boolean=} onlyParent Only start checking from the parent element, not `el`.
 * @returns {Node|null} closest matching parent Node or null if not found
 */
    getClosest: function getClosest(el, validateWith, onlyParent) {
      if (angular.isString(validateWith)) {
        var tagName = validateWith.toUpperCase();
        validateWith = function (el) {
          return el.nodeName.toUpperCase() === tagName;
        };
      }

      if (el instanceof angular.element) el = el[0];
      if (onlyParent) el = el.parentNode;
      if (!el) return null;

      do {
        if (validateWith(el)) {
          return el;
        }
      } while (el = el.parentNode);

      return null;
    },

    /**
     * Alternative to $timeout calls with 0 delay.
     * nextTick() coalesces all calls within a single frame
     * to minimize $digest thrashing
     *
     * @param {Function} callback function to be called after the tick
     * @param {boolean} digest true to call $rootScope.$digest() after callback
     * @param scope scope associated with callback. If the scope is destroyed, the callback will
     *  be skipped.
     * @returns {*}
     */
    nextTick: function (callback, digest, scope) {
      // grab function reference for storing state details
      var nextTick = $sdUtil.nextTick;
      var timeout = nextTick.timeout;
      var queue = nextTick.queue || [];

      // add callback to the queue
      queue.push({
        scope: scope,
        callback: callback
      });

      // set default value for digest
      if (digest == null) digest = true;

      // store updated digest/queue values
      nextTick.digest = nextTick.digest || digest;
      nextTick.queue = queue;

      // either return existing timeout or create a new one
      return timeout || (nextTick.timeout = $timeout(processQueue, 0, false));

      /**
       * Grab a copy of the current queue
       * Clear the queue for future use
       * Process the existing queue
       * Trigger digest if necessary
       */
      function processQueue() {
        var queue = nextTick.queue;
        var digest = nextTick.digest;

        nextTick.queue = [];
        nextTick.timeout = null;
        nextTick.digest = false;

        queue.forEach(function (queueItem) {
          var skip = queueItem.scope && queueItem.scope.$$destroyed;
          if (!skip) {
            queueItem.callback();
          }
        });

        if (digest) $rootScope.$digest();
      }
    },

    fakeNgModel: function () {
      return {
        $fake: true,
        $setTouched: angular.noop,
        $setViewValue: function (value) {
          this.$viewValue = value;
          this.$render(value);
          this.$viewChangeListeners.forEach(function (cb) {
            cb();
          });
        },
        $isEmpty: function (value) {
          return ("" + value).length === 0;
        },
        $parsers: [],
        $formatters: [],
        $viewChangeListeners: [],
        $render: angular.noop
      };
    },
    /**
     * Cross-version compatibility method to retrieve an option of a ngModel controller,
     * which supports the breaking changes in the AngularJS snapshot (SHA 87a2ff76af5d0a9268d8eb84db5755077d27c84c).
     * @param {!angular.ngModelCtrl} ngModelCtrl
     * @param {!string} optionName
     * @returns {Object|undefined}
     */
    getModelOption: function (ngModelCtrl, optionName) {
      if (!ngModelCtrl.$options) {
        return;
      }

      var $options = ngModelCtrl.$options;

      // The newer versions of AngularJS introduced a `getOption function and made the option values no longer
      // visible on the $options object.
      return $options.getOption
        ? $options.getOption(optionName)
        : $options[optionName];
    },

    /**
     * Determines the current 'dir'ectional value based on the value of 'dir'
     * attribute of the element. If that is not defined, it will try to use
     * a 'dir' attribute of the body or html tag.
     *
     * @param {Object=} attrs a hash object with key-value pairs of normalized
     *     attribute names and their corresponding attribute values.
     * @returns {boolean} true if the element's passed in attributes,
     *     the document, or the body indicates RTL mode, false otherwise.
     */
    isRtl: function (attrs) {
      var dir =
        angular.isDefined(attrs) && attrs.hasOwnProperty("dir") && attrs.dir;

      switch (dir) {
        case "ltr":
          return false;

        case "rtl":
          return true;
      }

      return $document[0].dir === "rtl" || $document[0].body.dir === "rtl";
    },

    // Mobile safari only allows you to set focus in click event listeners...
    forceFocus: function (element) {
      var node = element[0] || element;

      document.addEventListener(
        "click",
        function focusOnClick(ev) {
          if (ev.target === node && ev.$focus) {
            node.focus();
            ev.stopImmediatePropagation();
            ev.preventDefault();
            node.removeEventListener("click", focusOnClick);
          }
        },
        true
      );

      var newEvent = document.createEvent("MouseEvents");
      newEvent.initMouseEvent(
        "click",
        false,
        true,
        window,
        {},
        0,
        0,
        0,
        0,
        false,
        false,
        false,
        false,
        0,
        null
      );
      newEvent.$material = true;
      newEvent.$focus = true;
      node.dispatchEvent(newEvent);
    },

    /**
     * facade to build sd-backdrop element with desired styles
     * NOTE: Use $compile to trigger backdrop postLink function
     */
    createBackdrop: function (scope, addClass) {
      return $compile(
        $sdUtil.supplant('<sd-backdrop class="{0}">', [addClass])
      )(scope);
    },

    /**
     * Support: IE 9-11 only
     * documentMode is an IE-only property
     * http://msdn.microsoft.com/en-us/library/ie/cc196988(v=vs.85).aspx
     */
    msie: window.document.documentMode
  };

  return $sdUtil;
}

/*
 * Since removing jQuery from the demos, some code that uses `element.focus()` is broken.
 * We need to add `element.focus()`, because it's testable unlike `element[0].focus`.
 */

angular.element.prototype.focus =
  angular.element.prototype.focus ||
  function () {
    if (this.length) {
      this[0].focus();
    }
    return this;
  };
angular.element.prototype.blur =
  angular.element.prototype.blur ||
  function () {
    if (this.length) {
      this[0].blur();
    }
    return this;
  };

export default UtilFactory;