import template from './employee-edit.html';

export default function(AngularModule) {
  AngularModule.directive('employeeEdit', function() {
    return {
      replace: true, //replace this element with content from this directive's html template
      restrict: 'E', //restrict this directive to be html tag element
      // transclude: true,//put content of parent html inside my tags
      template,
      // scope:{

      // },
      controller: ['$scope', function($scope) {
        console.log('FORM in edit',myForm);
        console.log('Input', myForm.myName);
      }] //don't need to create controller for this component yet
    }
  });
};
