import angular from 'angular';
import filters from './filters';
import ngMessages from 'angular-messages';
import components from './components';
import ngResource from 'angular-resource';


var employeeApp = angular.module( 'employeeApp', [ngMessages, ngResource, components]);

filters(employeeApp);

employeeApp.controller('EmployeeController', function($scope, $http, $resource) {

  $scope.currencies = {
    USD: { symbol: '$', rate: 1 },
    JPY: { symbol: '¥' },
    CNY: { symbol: '¥' }
  };
  $scope.salaryFormat = $scope.currencies.USD;

  $scope.newEmployee = {};//Angular won't inititate this in childScope!

  //Getting currency exchange rate
  $http.get('https://openexchangerates.org/api/latest.json?app_id=fb4db514dcda4cce9452221d5993cc04')
       .then(res => {
          $scope.currencies.JPY.rate = res.data.rates.JPY;
          $scope.currencies.CNY.rate = res.data.rates.CNY;
       });

  //Define resource class
  var Resource = $resource('http://localhost:3000/api/employees/:employeeId',
                            {employeeId: '@id'});

  //GET all employees in DB
  $scope.employees = Resource.query(() => {
    $scope.employees.forEach(employee => {
      employee.DOB = employee.DOB.substring(0,10);
    });
  });

  //DELETE
  $scope.delete = function(employee) {
    Resource.delete({employeeId: employee._id})
            .$promise.then(deletedEmployee => {
              $scope.employees.splice($scope.employees.indexOf(employee), 1);
              $scope.deleteConfirmation = 'Deleted Employee:';
              $scope.deletedEmployee = deletedEmployee;
              $scope.deletedEmployee.DOB = $scope.deletedEmployee.DOB.substring(0,10);
            },
            err => {
              $scope.deleteConfirmation = res.statusText;
            })
  }

  //EDIT-PUT/PATCH
  //edit() is triggered with the link on the table
  $scope.edit = function(employee) { //when user clicks on the edit link next to the employee
    $scope.newEmployee = angular.copy(employee);
    $scope.employeeToEdit = employee;
    $scope.editEmployee = true;
    $scope.disable = true;
  }

});
