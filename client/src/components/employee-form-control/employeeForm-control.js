export default function(AngularModule) {
  AngularModule.directive('employeeFormControl', function() {
    return {
      replace: true, //replace this element with content from this directive's html template
      restrict: 'E', //restrict this directive to be html tag element
      transclude: {
        input: 'input',
        errors: 'errors'
      },//put content of parent html inside my tags
      templateUrl: './employeeForm-control.html',
      scope:{
        label:'@', //only want to pass in value from outer scope to our "label" variable
        obj: '='
      }
      // controller: ['$scope', function($scope) {

      // }] //don't need to create controller for this component yet
    }
  });
};
