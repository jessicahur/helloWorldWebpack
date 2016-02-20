import angular from 'angular';
import filters from './filters';
import ngMessages from 'angular-messages';
import components from './components';


var employeeApp = angular.module( 'employeeApp', [ngMessages, components]);

filters(employeeApp);

employeeApp.directive('overwriteEmail', function() {
  var EMAIL_REGEXP = /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@example\.com$/i;

  return {
    require: '?ngModel',
    link: function(scope, elm, attrs, ctrl) {
      // only apply the validator if ngModel is present and Angular has added the email validator
      if (ctrl && ctrl.$validators.email) {

        // this will overwrite the default Angular email validator
        ctrl.$validators.email = function(modelValue) {
          return ctrl.$isEmpty(modelValue) || EMAIL_REGEXP.test(modelValue);
        };
      }
    },
    controller: ['$scope', function($scope) {
      console.log('NG', form.overwrittenEmail);
    }]
  };
});

employeeApp.controller('EmployeeController', function($scope, $http) {

  $scope.currencies = {
    USD: { symbol: '$', rate: 1 },
    JPY: { symbol: '¥' },
    CNY: { symbol: '¥' }
  };
  $scope.salaryFormat = $scope.currencies.USD;

  $http.get('https://openexchangerates.org/api/latest.json?app_id=fb4db514dcda4cce9452221d5993cc04')
       .then(res => {
          $scope.currencies.JPY.rate = res.data.rates.JPY;
          $scope.currencies.CNY.rate = res.data.rates.CNY;
       });

  //GET
  $http.get('http://localhost:3000/api/employees').then( function( res ) {
    $scope.employees = res.data;//Angular specific(?)
    $scope.employees.forEach(function(employee){
      employee.DOB = employee.DOB.substring(0,10);
    });
  });

  //DELETE
  $scope.delete = function(employee) {
    $scope.deleteEmployeeIndex = employee.index;
    $http.delete('http://localhost:3000/api/employees/'+employee._id)
         .then(
          function(res){
            $scope.employees.splice($scope.employees.indexOf(employee), 1);
            $scope.deleteConfirmation = 'Deleted Employee:';
            $scope.deletedEmployee = res.data;
            $scope.deletedEmployee.DOB = $scope.deletedEmployee.DOB.substring(0,10);
          },
          function(err){
            $scope.deleteConfirmation = res.statusText;
          });
  }

  //EDIT-PUT/PATCH
  $scope.edit = function(employee) { //when user clicks on the edit link next to the employee
    $scope.newEmployee = angular.copy(employee);
    $scope.employeeToEdit = employee;
    $scope.editEmployee = true;
    $scope.disable = true;
  }
  // $scope.cancelEdit = function() {
  //   $scope.editEmployee = null;
  //   $scope.badRequest = false;
  //   $scope.newEmployee = null;
  //   $scope.disable = false;
  //   $scope.myForm.$setPristine();
  //   $scope.myForm.$setUntouched();
  // }
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

  //ADD-POST

  $scope.addEmployee = function() {
    $http.post('http://localhost:3000/api/employees', JSON.stringify($scope.newEmployee))
         .then(
            function(res){
              var newEmployee = res.data;
              newEmployee.DOB = newEmployee.DOB.substring(0,10);
              $scope.employees.push(newEmployee);
              $scope.badRequest = false;
              $scope.newEmployee = {};
              $scope.myForm.$setPristine();
              $scope.myForm.$setUntouched();
            },
            function(err){
              $scope.badRequest = `${err.status}: ${err.data.errmsg}`;
              $scope.myForm.$setPristine();
            }
          )
  }
});
