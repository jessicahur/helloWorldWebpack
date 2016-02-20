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
        newEmployee: '=info2',
        employees: '=info3'
      },
      controller: ['$scope','$http', function($scope, $http) {
        // console.log($scope.editEmployee);
        // console.log($scope);
        // console.log('FORM in edit',myForm);
        // console.log('Input', $scope.myForm);
        $scope.cancelEdit = function() {
          $scope.editEmployee = null;
          $scope.badRequest = false;
          $scope.newEmployee = null;
          $scope.disable = false;
          $scope.myForm.$setPristine();//Why $scope.myForm is defined here but console.log($scope.myForm)doesn't show?
          $scope.myForm.$setUntouched();
        }

        $scope.editSelectedEmployee = function() {
          $http.put('http://localhost:3000/api/employees/'+$scope.newEmployee._id, $scope.newEmployee)
            .then(
            function(res){
              $scope.employees.splice($scope.employees.indexOf($scope.employeeToEdit), 1);
              res.data.DOB = res.data.DOB.substring(0,10);
              $scope.employees.push(res.data);
              $scope.newEmployee = null;
              $scope.editEmployee = null;
              $scope.employeeToEdit = null;
              $scope.badRequest = false;
              $scope.myForm.$setPristine();
              $scope.disable = false;
              $scope.myForm.$setPristine();
              $scope.myForm.$setUntouched();
            },
            function(err){
              console.log(err);
              $scope.badRequest = `${err.statusText}`;
              $scope.cancelEdit();
              $scope.disable = false;
            }
          );
        }
      }] //don't need to create controller for this component yet
    }
  });
};
