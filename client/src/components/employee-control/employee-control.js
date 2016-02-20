import template from './employee-control.html';

export default function (AngularModule) {
  AngularModule.directive('employeeControl', function() {
    return {
      replace: true,
      restrict: 'E',
      template,
      // transclude: true,
      scope: {
        label: '@'
      }
    }
  });
};
