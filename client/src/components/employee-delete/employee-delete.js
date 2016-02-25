import template from './employee-delete.html';

export default function(AngularModule) {
  AngularModule.directive('employeeDelete', function() {
    return {
      replace: true, //replace this element with content from this directive's html template
      restrict: 'E', //restrict this directive to be html tag element
      template
    }//end of return
  })
}
