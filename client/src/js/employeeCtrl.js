export default function($scope, $window, $auth, employeeService) {

  //For mobile navbar
  $scope.isCollapsed = true;
  //For About Use
  $scope.aboutClose = true;
  $scope.closeAbout = function (){
    $scope.aboutClose = !$scope.aboutClose;
    $window.location = '/home';
  }

  $scope.newEmployee = new employeeService();//Angular won't inititate this in childScope!

  //GET all employees in DB
  $scope.employees = employeeService.query(() => {
    $scope.employees.forEach(employee => {
      employee.DOB = employee.DOB.substring(0,10);
    });
  });

  //DELETE
  $scope.delete = function(employee) {
    employee.$delete(() => {//$delete also returns a promise
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

  //Logout
  $scope.logout = function(){
    if (!$auth.isAuthenticated()) {return; }
    $auth.logout()
      .then(function() {
        $window.location = '/';
      });
  }

}
