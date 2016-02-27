//http://tylermcginnis.com/angularjs-factory-vs-service-vs-provider/

import angular from 'angular';
import filters from './filters';
import ngMessages from 'angular-messages';
import components from './components';
import ngResource from 'angular-resource';
import services from './services';
import uiRouter from 'angular-ui-router';
import uiBootstrap from 'angular-ui-bootstrap';
// import employeeService from './services/employee-service';

var employeeApp = angular.module( 'employeeApp', [ ngMessages,
                                                   ngResource,
                                                   uiRouter,
                                                   uiBootstrap,
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

employeeApp.config(function($stateProvider, $urlRouterProvider){

  $urlRouterProvider.otherwise( '/home' );//if other routes not handled, redirect here

  $stateProvider
    .state('home', {
      url:'/home',
      template:`<h1>Welcome to your employee Database</h1>`
    })
    .state('employees', {
      url: '/employees?action',
      template:'<app/>',
      controller: 'EmployeeController'
    })
    .state('newEmployee', {
      url: '/new',
      template:`<employee-edit
                      edit-employee="editEmployee"
                      new-employee="newEmployee"
                      employees="employees"
                      employee-to-edit="employeeToEdit"
                      disable="disable">
                </employee-edit>`,
      controller: 'EmployeeController'
    });
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
