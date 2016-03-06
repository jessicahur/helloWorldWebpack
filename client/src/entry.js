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
// import 'ng-dialog/css/ngDialog.css';
// import 'ng-dialog/css/ngDialog-theme-default.css';
import './main.scss';

import mobileViewCtrl from './js/mobileViewCtrl';
import employeeCtrl from './js/employeeCtrl';

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
employeeApp.constant( 'url', baseUrl + '/api/employees/:employeeId');

/*----------CONFIGURE APP------------*/
employeeApp.config(function(url, employeeServiceProvider) {
  employeeServiceProvider.setUrl(url);
});

employeeApp.config(function($stateProvider, $urlRouterProvider){

  $urlRouterProvider.otherwise( '/home' );//if other routes not handled, redirect here

  $stateProvider
    .state('home', {
      url:'/home',
      views: {
        main: {
          template: `<homepage/>`
        },
        mobile: {
          template: `<hpview-mobile/>`,
          controller: mobileViewCtrl
        },
        nonmobile: {
          template: `<hpview-nonmobile/>`,
          controller: function($scope, agents) {
            $scope.agents = agents;
          }
        }
      },
      resolve: {
        agents( employeeService ) {
          return employeeService.query().$promise;
        }
      },

    })

    .state('employees', {
      url: '/employees',
      data: {
        requireAuth: true
      },
      template:'<app/>',
      controller: 'EmployeeController'
    })
    .state('employees.action', {
      url: '/:action',
      template: '<employee-delete deletedEmployee="deletedEmployee"></employee-delete>'
    });

});

employeeApp.config(function($authProvider){
  $authProvider.github({
    clientId: CLIENT_ID
  });

  $authProvider.github({
    url: `${baseUrl}/auth/github`,
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

employeeApp.run( [ '$rootScope', 'ngDialog', '$state', '$auth',
function ( $rootScope, ngDialog, $state, $auth ) {

  $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {

      if ( toState.data && toState.data.requireAuth && !$auth.isAuthenticated() ) {
          event.preventDefault();
          const dialog = ngDialog.open({
        template: `<login success="success(response)"/>`,
        plain: true,
        controller: [ '$scope', function( $scope ){
          $scope.success = function( response ){
            dialog.close();
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
employeeApp.controller('EmployeeController', employeeCtrl);
