import template from './app.html';

export default function( ngModule ) {
  ngModule.directive( 'app', function() {
    return {
      replace: true,
      restrict: 'E',
      template
    };
  });
}
