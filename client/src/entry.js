//http://tylermcginnis.com/angularjs-factory-vs-service-vs-provider/

import angular from 'angular';
import filters from './filters';
import ngMessages from 'angular-messages';
import uiRouter from 'angular-ui-router';
import components from './components';
import ngResource from 'angular-resource';
import services from './services';

var employeeApp = angular.module( 'employeeApp', [ ngMessages,
                                                   ngResource,
                                                   uiRouter,
                                                   components,
                                                   services,
                                                   filters]);
var baseUrl = 'http://localhost:3000/api/employees/:employeeId';
// console.log(process.env.BASE_URL);

//SET CONSTANT URL FOR APP
employeeApp.constant( 'url', baseUrl);

//CONFIGURE APP
employeeApp.config(function(url, resourceServiceProvider) {
  resourceServiceProvider.setUrl(url);
});

employeeApp.config(function($stateProvider, $locationProvider, $urlRouterProvider) {

  // $locationProvider.html5Mode(false); //omit # in angular url,need <base> in index.html

  $urlRouterProvider.otherwise( '/employees' );//if other routes not handled, redirect here

  $stateProvider
      .state('employees', {
        url:'/employees',
        views:{
          table:{
            template: `<employee-table employees="employees"
                              edit="edit(employee)"
                              delete="delete(employee)">
                       </employee-table>`,
            controller: 'EmployeeController'
          },
          new: {
            template: `<employee-edit
                          edit-employee="editEmployee"
                          new-employee="newEmployee"
                          employees="employees"
                          employee-to-edit="employeeToEdit"
                          disable="disable">
                      </employee-edit>`,
            controller: 'EmployeeController'
          }
        }
      })
});

//DEFINE CONTROLLER
employeeApp.controller('EmployeeController',function($scope, resourceService, employeeService) {

  $scope.newEmployee = new resourceService();//Angular won't inititate this in childScope!

  //GET all employees in DB
  $scope.employees = resourceService.query(() => {
    $scope.employees.forEach(employee => {
      employee.DOB = employee.DOB.substring(0,10);
    });
  });
  employeeService.employees = $scope.employees;

  //DELETE
  $scope.delete = function(employee) {
    employee.$delete(() => {//$delete does not return a promise
              $scope.employees.splice($scope.employees.indexOf(employee), 1);
              $scope.deletedEmployee = employee;
              console.log($scope.employees);
              console.log($scope.deletedEmployee.name);
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
