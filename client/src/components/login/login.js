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
      controller ( $scope, $auth ) {
        $scope.authenticate = function( provider ) {
          $auth.authenticate( provider )
            .then( response => {
              $scope.success( { response } );
            })
            .catch( response => {
              alert( 'problem!' );
              console.log(response);
            });
        };
        }
    };
  });
}
