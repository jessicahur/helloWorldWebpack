//http://tylermcginnis.com/angularjs-factory-vs-service-vs-provider/

import angular from 'angular';
import filters from './filters';
import ngMessages from 'angular-messages';
import components from './components';
import ngResource from 'angular-resource';
import services from './services';
import uiRouter from 'angular-ui-router';
// import employeeService from './services/employee-service';

var employeeApp = angular.module( 'employeeApp', [ ngMessages,
                                                   ngResource,
                                                   uiRouter,
                                                   components,
                                                   services,
                                                   filters]);
var baseUrl = 'http://localhost:3000/api/employees/:employeeId';
//SET CONSTANT URL FOR APP
employeeApp.constant( 'url', baseUrl);

//CONFIGURE APP
employeeApp.config(function(url, employeeServiceProvider) {
  employeeServiceProvider.setUrl(url);
});

employeeApp.config(function($stateProvider){
  $stateProvider
    .state('employees', {
      url: '/employees',
      templateUrl:'index.html'
    })
});

//DEFINE CONTROLLER
employeeApp.controller('EmployeeController', function($scope, employeeService) {

  $scope.newEmployee = new employeeService();//Angular won't inititate this in childScope!

  //GET all employees in DB
  $scope.employees = employeeService.query(() => {
    $scope.employees.forEach(employee => {
      employee.DOB = employee.DOB.substring(0,10);
    });
  });

  //DELETE
  $scope.delete = function(employee) {
    employee.$delete(() => {//$delete does not return a promise
              $scope.employees.splice($scope.employees.indexOf(employee), 1);
              $scope.deletedEmployee = employee;
          });
  }

  //EDIT-PUT/PATCH
  //don't want to move this out of entry.js because it's linked with other components as well...
  $scope.edit = function(employee) { //when user clicks on the edit link next to the employee
    $scope.newEmployee = employee;
    $scope.employeeToEdit = angular.copy(employee);
    $scope.editEmployee = true;
    $scope.disable = true;
  }

});
