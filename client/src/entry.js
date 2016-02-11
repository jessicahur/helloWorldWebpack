import angular from 'angular';

var employeeApp = angular.module( 'employeeApp', []);

employeeApp.controller('EmployeeController', function($scope, $http) {

  //GET
  $http.get('http://localhost:3000/employees').then( function( res ) {
    $scope.employees = res.data;//Angular specific(?)
    $scope.employees.forEach(function(employee){
      employee.DOB = employee.DOB.substring(0,10);
      employee.index = employee._id;
    });
  });

  //DELETE
  $scope.delete = function(employee) {
    $scope.deleteEmployeeIndex = employee.index;
    $http.delete('http://localhost:3000/employees/'+employee._id)
         .then(
          function(res){
            var temp = [];
            $scope.employees.forEach(function(employee){
              if (employee.index != $scope.deleteEmployeeIndex){
                temp.push(employee);
              }
            });
            $scope.employees = temp;

            $scope.deleteConfirmation = 'Deleted Employee:';
            $scope.deletedEmployee = res.data;
            $scope.deletedEmployee.DOB = $scope.deletedEmployee.DOB.substring(0,10);
          },
          function(err){
            $scope.deleteConfirmation = res.statusText;
          });
  }

  //EDIT-PUT/PATCH
  $scope.edit = function(employee) {
    $scope.newEmployee = employee;
    // $scope.idHolder = $scope.newEmployee._id;
    $scope.editEmployee = true;
  }
  $scope.cancelEdit = function() {
    $scope.editEmployee = null;
    $scope.badRequest = false;
    $http.get('http://localhost:3000/employees/'+$scope.newEmployee.index)
         .then(
            function(res) {
              var temp = [];
              $scope.employees.forEach(function(employee){
                if (employee.index != $scope.newEmployee.index){
                  temp.push(employee);
                }
              });
              $scope.employees = temp;
              res.data.index = res.data._id;
              res.data.DOB = res.data.DOB.substring(0,10);
              $scope.employees.push(res.data);
              $scope.newEmployee = null;
            },
            function(err) {
              $scope.badRequest = `${err.status}: ${err.data.errmsg}`;
            }
          );
  }
  $scope.editSelectedEmployee = function() {
    $http.put('http://localhost:3000/employees/'+$scope.newEmployee.index, $scope.newEmployee)
         .then(
            function(res){

              // console.log(res);
              $scope.employees.splice($scope.employees.indexOf($scope.newEmployee), 1);
              res.data.index = res.data._id;
              res.data.DOB = res.data.DOB.substring(0,10);
              $scope.employees.push(res.data);

              $scope.newEmployee = null;
              $scope.badRequest = false;
            },
            function(err){
              console.log(err);
              $scope.badRequest = `${err.status}: ${err.data.errmsg}`;
            }
          );
  }

  //ADD-POST
  $scope.addEmployee = function() {
    $http.post('http://localhost:3000/employees', JSON.stringify($scope.newEmployee))
         .then(
            function(res){
              var newEmployee = res.data;
              newEmployee.DOB = newEmployee.DOB.substring(0,10);
              newEmployee.index = newEmployee._id;
              $scope.employees.push(newEmployee);
              console.log($scope.employees);
              $scope.badRequest = false;
              $scope.newEmployee = {};
            },
            function(err){
              $scope.badRequest = `${err.status}: ${err.data.errmsg}`;
            }
          )
  }
});
