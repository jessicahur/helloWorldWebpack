import template from './about-us.html';

export default function(AngularModule) {
  AngularModule.directive('aboutUs', function() {
    return {
      replace: true, //replace this element with content from this directive's html template
      restrict: 'E', //restrict this directive to be html tag element
      template
    }//end of return
  })
}
