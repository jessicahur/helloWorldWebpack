import template from './our-employees.html';

export default function(AngularModule) {
  AngularModule.directive('ourEmployees', function() {
    return {
      replace: true, //replace this element with content from this directive's html template
      restrict: 'E', //restrict this directive to be html tag element
      template,
      scope: {
        agents: '='
      }
    }//end of return
  })
}
