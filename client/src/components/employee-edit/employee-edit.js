import template from './employee-edit.html';

export default function(AngularModule) {
  AngularModule.directive('employeeEdit', function() {
    return {
      replace: true, //replace this element with content from this directive's html template
      restrict: 'E', //restrict this directive to be html tag element
      // transclude: true,//put content of parent html inside my tags
      template,
      scope: {
        editEmployee: '=info',
        newEmployee: '=info2'
      },
      controller: ['$scope', function($scope) {
        console.log($scope.editEmployee);
        console.log('FORM in edit',myForm);
        console.log('Input', myForm.myName);
        $scope.cancelEdit = function() {
          $scope.editEmployee = null;
          $scope.badRequest = false;
          $scope.newEmployee = null;
          $scope.disable = false;
          $scope.myForm.$setPristine();
          $scope.myForm.$setUntouched();
        }
      }] //don't need to create controller for this component yet
    }
  });
};
