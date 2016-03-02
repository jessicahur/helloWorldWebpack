//http://tylermcginnis.com/angularjs-factory-vs-service-vs-provider/

import angular from 'angular';
import filters from './filters';
import ngMessages from 'angular-messages';
import components from './components';
import ngResource from 'angular-resource';
import services from './services';
import uiRouter from 'angular-ui-router';
import uiBootstrap from 'angular-ui-bootstrap';
import satellizer from 'satellizer';
import ngDialog from 'ng-dialog';
import 'ng-dialog/css/ngDialog.css';
import 'ng-dialog/css/ngDialog-theme-default.css';

var employeeApp = angular.module( 'employeeApp', [ ngMessages,
                                                   ngResource,
                                                   uiRouter,
                                                   uiBootstrap,
                                                   satellizer,
                                                   ngDialog,
                                                   components,
                                                   services,
                                                   filters]);
var baseUrl = BASE_URL;

//SET CONSTANT URL FOR APP
employeeApp.constant( 'url', baseUrl+'/api/employees/:employeeId');

/*----------CONFIGURE APP------------*/
employeeApp.config(function(url, employeeServiceProvider) {
  employeeServiceProvider.setUrl(url);
});

employeeApp.config(function($stateProvider, $urlRouterProvider){

  $urlRouterProvider.otherwise( '/' );//if other routes not handled, redirect here

  $stateProvider
    .state('home', {
      url:'/home',
      template:`<h1>Welcome to your employee Database</h1>`
    })
    .state('employees', {
      url: '/employees',
      data: {
        requireAuth: true
      },
      template:'<app/>',
      controller: 'EmployeeController'
    });

});

employeeApp.config(function($authProvider){
  $authProvider.github({
    clientId: CLIENT_ID
  });

  $authProvider.github({
    url: '/auth/github',
    authorizationEndpoint: 'https://github.com/login/oauth/authorize',
    redirectUri: window.location.origin,
    optionalUrlParams: ['scope'],
    scope: ['user:email'],
    scopeDelimiter: ' ',
    type: '2.0',
    popupOptions: { width: 1020, height: 618 }
  });
});
/*----------APP RUN------------*/

employeeApp.run( [ '$rootScope', 'User', 'ngDialog', '$state', '$auth',
function ( $rootScope, User, ngDialog, $state, $auth ) {

  $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {

      if ( toState.data && toState.data.requireAuth && !$auth.isAuthenticated() /*!User.isAuthed()*/ ) {
          event.preventDefault();
          const dialog = ngDialog.open({
        template: `<login success="success(response)"/>`,
        plain: true,
        controller: [ '$scope', function( $scope ){
          $scope.success = function( response ){
            dialog.close();
            //User.setToken();
            return $state.go( toState.name, toParams );
          };
        }]
      });

      dialog.closePromise
        .then( () => alert( 'success!') )
        .catch( () => alert( 'failure!') );
      }
  });

}]);


/*----------DEFINE CONTROLLER------------*/

//EmployeeCtrl
employeeApp.controller('EmployeeController', function($scope, $window, $auth, employeeService) {

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

});
