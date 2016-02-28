
export default function( ngModule ) {

  ngModule.factory( 'User', [ '$window', function( $window ) {

    return {
      isAuthed() {
        return !!$window.localStorage.token;
      }
    };

  }]);

}

