function labelDirective() {
  return {
    restrict: 'E',
    require: '^?sdInputContainer',
    link: function(scope, element, attr, containerCtrl) {
       
      if (!containerCtrl || attr.mdNoFloat || element.hasClass('sd-container-ignore')) return;

      containerCtrl.label = element;
      scope.$on('$destroy', function() {
        containerCtrl.label = null;
      });
    }
  };
}

export default labelDirective;