import mobileViewCtrl from './mobileViewCtrl';

export default function( app ) {
  app.config( [ '$stateProvider', '$urlRouterProvider', configRoutes ]);
}

function configRoutes($stateProvider, $urlRouterProvider) {
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
          template: `<hpview-nonmobile/>`
          // controller: function($scope, agents) {
          //   $scope.agents = agents;
          // }
        }
      },
      // resolve: {
      //   agents( employeeService ) {
      //     return employeeService.query().$promise;
      //   }
      // },

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
}
