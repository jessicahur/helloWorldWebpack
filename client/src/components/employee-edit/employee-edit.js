import template from './employee-edit.html';

export default function(AngularModule) {
  AngularModule.directive('employeeEdit', function() {
    return {
      replace: true, //replace this element with content from this directive's html template
      restrict: 'E', //restrict this directive to be html tag element
      // transclude: true,//put content of parent html inside my tags
      template,
      scope: {
        editEmployee: '=', //attr in index.html has to be in the form edit-employee
        newEmployee: '=',
        employees: '=',
        employeeToEdit: '='
      },
      controller: ['$scope','$http','employeeService', function($scope, $http, Resource) {
        //Form logic handling:
        // console.log($scope.newEmployee);
        //When user clicks on the "CANCEL" button

        $scope.cancelEdit = function() {
          $scope.editEmployee = null;
          $scope.badRequest = false;
          $scope.newEmployee = null;
          $scope.disable = false;
          $scope.myForm.$setPristine();//Why $scope.myForm is defined here but console.log($scope.myForm)doesn't show?
          $scope.myForm.$setUntouched();
        }

        //When user click on the "EDIT" button
        $scope.editSelectedEmployee = function() {
          //Since $scope.newEmployee is also an instance of Resource, we can call $update on itself. Ng will automatically detect the change and upate the DOM, no need to do array,splice
          $scope.newEmployee.$update({employeeId: $scope.newEmployee._id})
            .then(
            function(res){
              res.DOB = res.DOB.substring(0,10);
              $scope.newEmployee = null;
              $scope.editEmployee = null;
              $scope.employeeToEdit = null;
              $scope.badRequest = false;
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

        //When user clicks on the "ADD" button
        $scope.addEmployee = function() {
          $http.post('http://localhost:3000/api/employees', JSON.stringify($scope.newEmployee))
               .then(
                  function(res){
                    var newEmp = res.data;
                    newEmp.DOB = newEmp.DOB.substring(0,10);
                    $scope.employees.push(newEmp);
                    $scope.badRequest = false;
                    $scope.newEmployee = null;
                    $scope.myForm.$setPristine();
                    $scope.myForm.$setUntouched();
                  },
                  function(err){
                    $scope.badRequest = `${err.status}: ${err.data.errmsg}`;
                    $scope.myForm.$setPristine();
                    $scope.myForm.$setUntouched();
                  }
                )
        }
      }]
    }
  });
};
