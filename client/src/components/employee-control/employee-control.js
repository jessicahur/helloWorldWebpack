import template from './employee-control.html';

export default function (AngularModule) {
  AngularModule.directive('employeeControl', function() {
    return {
      replace: true,
      restrict: 'E',
      template,
      transclude: {
        input: 'input',
        errors: '?errors'
      },
      scope: {
        label: '@',
        obj: '=myelem'
      },
      controller: ['$scope', function($scope) {
        console.log($scope.obj);
      }
    ]}
  });
};
