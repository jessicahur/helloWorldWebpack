import template from './employee-table.html';

export default function(AngularModule) {
  AngularModule.directive('employeeTable', function() {
    return {
      replace: true, //replace this element with content from this directive's html template
      restrict: 'E', //restrict this directive to be html tag element
      template,
      scope: {
        employees: '=',
        edit: '&'
      },
      controller: function($scope, $http){
        $scope.currencies = {
          USD: { symbol: '$', rate: 1 },
          JPY: { symbol: '¥' },
          CNY: { symbol: '¥' }
        };

        //Getting currency exchange rate
      $http.get('https://openexchangerates.org/api/latest.json?app_id=fb4db514dcda4cce9452221d5993cc04')
       .then(res => {
          $scope.currencies.JPY.rate = res.data.rates.JPY;
          $scope.currencies.CNY.rate = res.data.rates.CNY;
       });

        $scope.salaryFormat = $scope.currencies.USD;

        $scope.update = function(employee) {
          $scope.edit({employee: employee});
        };

      }
    }//end of return
  })
}
