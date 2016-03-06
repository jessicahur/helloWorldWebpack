import template from './hpview-nonmobile.html';

export default function (AngularModule) {
  AngularModule.directive('hpviewNonmobile', function() {
    return {
      replace: true,
      restrict: 'E',
      template
    }
  });
};
