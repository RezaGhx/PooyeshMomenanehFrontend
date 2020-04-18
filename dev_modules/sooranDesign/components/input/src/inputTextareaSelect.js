inputTextareaSelect.$inject = ["sdUtil"];

function inputTextareaSelect(sdUtil) {
  return {
    restrict: "E", // only activate on element attribute
    require: ["^?sdInputContainer", "?ngModel", "?^form"], // get a hold of NgModelController
    link: function (scope, element, attr, ctrls) {
      var containerCtrl = ctrls[0];
      var hasNgModel = !!ctrls[1];
      var ngModelCtrl = ctrls[1] || sdUtil.fakeNgModel();
      var parentForm = ctrls[2];
      var isReadonly = angular.isDefined(attr.readonly);
      var sdNoAsterisk = sdUtil.parseAttributeBoolean(attr.sdNoAsterisk);
      var tagName = element[0].tagName.toLowerCase();

      if (!containerCtrl) return;
      if (attr.type === "hidden") {
        element.attr("aria-hidden", "true");
        return;
      } else if (containerCtrl.input) {
        if (containerCtrl.input[0].contains(element[0])) {
          return;
        } else {
          throw new Error(
            "<sd-input-container> can only have *one* <input>, <textarea> or <select> child element!"
          );
        }
      }
      containerCtrl.input = element;

      setupAttributeWatchers();

      var showWarnings = this.showWarnings;


      /**
       * Check if expected attribute has been specified on the target element or child
       * @param element
       * @param attrName
       * @param {optional} defaultValue What to set the attr to if no value is found
       */
      var ariaExpect = function (element, attrName, defaultValue) {
        var node = angular.element(element)[0] || element;

        // if node exists and neither it nor its children have the attribute
        if (
          node &&
          ((!node.hasAttribute(attrName) ||
            node.getAttribute(attrName).length === 0) &&
            !childHasAttribute(node, attrName))
        ) {
          defaultValue = angular.isString(defaultValue)
            ? defaultValue.trim()
            : "";
          if (defaultValue.length) {
            element.attr(attrName, defaultValue);
          } else if (showWarnings) {
            $log.warn(
              'ARIA: Attribute "',
              attrName,
              '", required for accessibility, is missing on node:',
              node
            );
          }
        }
      }

      function childHasAttribute(node, attrName) {
        var hasChildren = node.hasChildNodes(),
          hasAttr = false;

        function isHidden(el) {
          var style = el.currentStyle ? el.currentStyle : $window.getComputedStyle(el);
          return (style.display === 'none');
        }

        if (hasChildren) {
          var children = node.childNodes;
          for (var i = 0; i < children.length; i++) {
            var child = children[i];
            if (child.nodeType === 1 && child.hasAttribute(attrName)) {
              if (!isHidden(child)) {
                hasAttr = true;
              }
            }
          }
        }
        return hasAttr;
      }

      // Add an error spacer div after our input to provide space for the char counter and any ng-messages
      // now this future disabled
      // var errorsSpacer = angular.element('<div class="sd-errors-spacer">');
      //element.after(errorsSpacer);

      var placeholderText = angular.isString(attr.placeholder)
        ? attr.placeholder.trim()
        : "";
      if (!containerCtrl.label && !placeholderText.length) {
        ariaExpect(element, "aria-label");
      }

      element.addClass("sd-input");
      if (!element.attr("id")) {
        element.attr("id", "input_" + sdUtil.nextUid());
      }

      // This works around a Webkit issue where number inputs, placed in a flexbox, that have
      // a `min` and `max` will collapse to about 1/3 of their proper width. Please check #7349
      // for more info. Also note that we don't override the `step` if the user has specified it,
      // in order to prevent some unexpected behaviour.
      if (
        tagName === "input" &&
        attr.type === "number" &&
        attr.min &&
        attr.max &&
        !attr.step
      ) {
        element.attr("step", "any");
      }

      // If the input doesn't have an ngModel, it may have a static value. For that case,
      // we have to do one initial check to determine if the container should be in the
      // "has a value" state.
      if (!hasNgModel) {
        inputCheckValue();
      }

      var isErrorGetter =
        containerCtrl.isErrorGetter ||
        function () {
          return ngModelCtrl.$invalid && (ngModelCtrl.$touched || (parentForm && parentForm.$submitted));
        };

      var isValidGetter =
        containerCtrl.isValidGetter ||
        function () {
          return ngModelCtrl.$valid && (ngModelCtrl.$touched || (parentForm && parentForm.$submitted));
        };

      scope.$watch(isErrorGetter, containerCtrl.setInvalid);
      scope.$watch(isValidGetter, containerCtrl.setValid);

      // When the developer uses the ngValue directive for the input, we have to observe the attribute, because
      // AngularJS's ngValue directive is just setting the `value` attribute.
      if (attr.ngValue) {
        attr.$observe("value", inputCheckValue);
      }

      ngModelCtrl.$parsers.push(ngModelPipelineCheckValue);
      ngModelCtrl.$formatters.push(ngModelPipelineCheckValue);

      element.on("input", inputCheckValue);

      if (!isReadonly) {
        element
          .on("focus", function (ev) {
            sdUtil.nextTick(function () {
              containerCtrl.setFocused(true);
            });
          })
          .on("blur", function (ev) {
            sdUtil.nextTick(function () {
              containerCtrl.setFocused(false);
              inputCheckValue();
            });
          });
      }

      scope.$on("$destroy", function () {
        containerCtrl.setFocused(false);
        containerCtrl.setHasValue(false);
        containerCtrl.input = null;
      });

      /** Gets run through ngModel's pipeline and set the `has-value` class on the container. */
      function ngModelPipelineCheckValue(arg) {
        containerCtrl.setHasValue(!ngModelCtrl.$isEmpty(arg));
        return arg;
      }

      function setupAttributeWatchers() {
        if (containerCtrl.label) {
          attr.$observe("required", function (value) {
            // We don't need to parse the required value, it's always a boolean because of angular's
            // required directive.
            containerCtrl.label.toggleClass(
              "sd-required",
              value && !sdNoAsterisk
            );
          });
        }
      }

      function inputCheckValue() {
        // An input's value counts if its length > 0,
        // or if the input's validity state says it has bad input (eg string in a number input)
        containerCtrl.setHasValue(
          element.val().length > 0 || (element[0].validity || {}).badInput
        );
      }
    }
  };
}

export default inputTextareaSelect;