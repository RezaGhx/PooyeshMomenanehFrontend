sdInputContainer.$inject = ["sdUtil", "$$rAF"];

function sdInputContainer(sdUtil, $$rAF) {
  var INPUT_TAGS = ["INPUT", "TEXTAREA", "SELECT"];

  var BEFORE_SELECTORS = INPUT_TAGS.reduce(function (selectors, isel) {
    return selectors.concat(["sd-icon ~ " + isel, ".sd-icon ~ " + isel]);
  }, []).join(",");

  var AFTER_SELECTORS = INPUT_TAGS.reduce(function (selectors, isel) {
    return selectors.concat([isel + " ~ sd-icon", isel + " ~ .sd-icon"]);
  }, []).join(",");
  return {
    restrict: "E",
    compile: compile,
    controller: ContainerCtrl
  };

  function compile(tElement) {
    // Check for both a left & right icon
    var hasBeforeIcon = tElement[0].querySelector(BEFORE_SELECTORS);
    var hasAfterIcon = tElement[0].querySelector(AFTER_SELECTORS);

    return function postLink(scope, element) {
      if (sdUtil.isRtl(document)) {
        element.addClass("sd-rtl");
      } else {
        element.addClass("sd-ltr");
      }
      if (hasBeforeIcon || hasAfterIcon) {
        // When accessing the element's contents synchronously, they may not be defined yet because
        // of the use of ng-if. If we wait one frame, then the element should be there if the ng-if
        // resolves to true.
        $$rAF(function () {
          // Handle the case where the sd-icon element is initially hidden via ng-if from #9529.
          // We don't want to preserve the space for the icon in the case of ng-if, like we do for
          // ng-show.
          // Note that we can't use the same selectors from above because the elements are no longer
          // siblings for textareas at this point due to the insertion of the sd-resize-wrapper.

          let addClassName = ["sd-icon-left", "sd-icon-right"];
          var iconNotRemoved =
            element[0].querySelector("sd-icon") ||
            element[0].querySelector(".sd-icon");

          if (sdUtil.isRtl(document)) {
            if (hasBeforeIcon && iconNotRemoved) {
              element.addClass(addClassName[1]);
            }
            if (hasAfterIcon && iconNotRemoved) {
              element.addClass(addClassName[0]);
            }
          } else {
            if (hasBeforeIcon && iconNotRemoved) {
              element.addClass(addClassName[0]);
            }
            if (hasAfterIcon && iconNotRemoved) {
              element.addClass(addClassName[1]);
            }
          }
        });
      }
    };
  }

  /* @ngInject */ function ContainerCtrl($scope, $element, $attrs, $animate, $parse) {
    var self = this;

    self.isErrorGetter = $attrs.sdIsError && $parse($attrs.sdIsError);
    self.isValidGetter = $attrs.sdIsValid && $parse($attrs.sdIsValid);

    self.delegateClick = function () {
      self.input.focus();
    };
    self.element = $element;
    self.setFocused = function (isFocused) {
      $element.toggleClass("sd-input-focused", !!isFocused);
    };
    self.setHasValue = function (hasValue) {
      $element.toggleClass("sd-input-has-value", !!hasValue);
    };
    self.setHasPlaceholder = function (hasPlaceholder) {
      $element.toggleClass("sd-input-has-placeholder", !!hasPlaceholder);
    };
    self.setInvalid = function (isInvalid) {
      if (isInvalid) {
        $animate.addClass($element, "sd-input-invalid");
      } else {
        $animate.removeClass($element, "sd-input-invalid");
      }
    };
    self.setValid = function (isValid) {
      if (isValid) {
        $animate.addClass($element, "sd-input-valid");
      } else {
        $animate.removeClass($element, "sd-input-valid");
      }
    };
    $scope.$watch(
      function () {
        return self.label && self.input;
      },
      function (hasLabelAndInput) {
        if (hasLabelAndInput && !self.label.attr("for")) {
          self.label.attr("for", self.input.attr("id"));
        }
      }
    );
  }
}

export default sdInputContainer;
