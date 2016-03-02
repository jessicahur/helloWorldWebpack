import template from './login.html';

export default function( ngModule ) {
  ngModule.directive( 'login', function() {
    return {
      replace: true,
      restrict: 'E',
      template,
      scope: {
        success: '&'
      },
      controller ( $scope, $auth, $window ) {
        $scope.authenticate = function( provider ) {
          return $auth.authenticate( provider ) //return this bc in our test, we have to mimic async behavior of $auth.authenticate
            .then( response => {
              $scope.success( { response } );
              // return true; //So that we can test if this success path was taken
            })
            .catch( error => {
              $scope.error = error;
              alert( error );
              //return false; //So that we can test if this pass was taken
            });
        };
        }
    };
  });
}
