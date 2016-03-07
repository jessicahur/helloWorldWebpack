import template from './navbar.html';

export default function (AngularModule) {
  AngularModule.directive('navbar', function() {
    return {
      replace: true,
      restrict: 'E',
      template
    }
  });
};
