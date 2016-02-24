//http://tylermcginnis.com/angularjs-factory-vs-service-vs-provider/

import angular from 'angular';
import filters from './filters';
import ngMessages from 'angular-messages';
import components from './components';
import ngResource from 'angular-resource';
import services from './services';
// import employeeService from './services/employee-service';

var employeeApp = angular.module( 'employeeApp', [ ngMessages,
                                                   ngResource,
                                                   components,
                                                   services,
                                                   filters]);

//SET CONSTANT URL FOR APP
employeeApp.constant( 'url', 'http://localhost:3000/api/employees/:employeeId');

//CONFIGURE APP
employeeApp.config(function(url,employeeServiceProvider) {
  employeeServiceProvider.setUrl(url);
});

employeeApp.controller('EmployeeController', function($scope, $http, $resource, employeeService) {

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

  //GET all employees in DB
  $scope.employees = employeeService.query(() => {
    console.log($scope.employees);
    $scope.employees.forEach(employee => {
      employee.DOB = employee.DOB.substring(0,10);
    });
  });

  //DELETE
  $scope.delete = function(employee) {
    employeeService.delete({employeeId: employee._id})
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
    $scope.newEmployee = employee;
    $scope.employeeToEdit = angular.copy(employee);
    $scope.editEmployee = true;
    $scope.disable = true;
  }

});
