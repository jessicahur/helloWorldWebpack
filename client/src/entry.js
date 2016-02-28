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

// import employeeService from './services/employee-service';

var employeeApp = angular.module( 'employeeApp', [ ngMessages,
                                                   ngResource,
                                                   uiRouter,
                                                   uiBootstrap,
                                                   satellizer,
                                                   ngDialog,
                                                   components,
                                                   services,
                                                   filters]);
var baseUrl = 'http://localhost:3000/api/employees/:employeeId';
//SET CONSTANT URL FOR APP
employeeApp.constant( 'url', baseUrl);

/*----------CONFIGURE APP------------*/
employeeApp.config(function(url, employeeServiceProvider) {
  employeeServiceProvider.setUrl(url);
});

employeeApp.config(function($stateProvider, $urlRouterProvider){

  $urlRouterProvider.otherwise( '/home' );//if other routes not handled, redirect here

  $stateProvider
    // .state('login', {
    //     url: '/login',
    //     template: '<login></login>',
    //     controller: 'LoginCtrl',
    //     resolve: {
    //       skipIfLoggedIn: skipIfLoggedIn
    //     }
    //   })
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

    // function skipIfLoggedIn($q, $auth) {
    //   var deferred = $q.defer();
    //   if ($auth.isAuthenticated()) {
    //     deferred.reject();
    //   } else {
    //     deferred.resolve();
    //   }
    //   return deferred.promise;
    // }
});

employeeApp.config(function($authProvider){
  $authProvider.github({
      clientId: 'd9dff7bff1850d059f18'
  });

  $authProvider.httpInterceptor = function() { return true; },
  $authProvider.withCredentials = true;
  $authProvider.tokenRoot = null;
  $authProvider.cordova = false;
  $authProvider.baseUrl = '/';
  $authProvider.loginUrl = '/auth/login';
  $authProvider.signupUrl = '/auth/signup';
  $authProvider.unlinkUrl = '/auth/unlink/';
  $authProvider.tokenName = 'token';
  $authProvider.tokenPrefix = 'satellizer';
  $authProvider.authHeader = 'Authorization';
  $authProvider.authToken = 'Bearer';
  $authProvider.storageType = 'localStorage';

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
})
/*----------APP RUN------------*/

employeeApp.run( [ '$rootScope', 'User', 'ngDialog', '$state', '$auth',
function ( $rootScope, User, ngDialog, $state, $auth ) {

  $auth.logout();

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

//LoginCtrl
employeeApp
  .controller('LoginCtrl', function($scope, $auth) {

    $scope.authenticate = function(provider) {
      $auth.authenticate(provider);
    };

  });

//EmployeeCtrl
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
