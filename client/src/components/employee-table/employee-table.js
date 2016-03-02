import template from './employee-table.html';

export default function(AngularModule) {
  AngularModule.directive('employeeTable', function() {
    return {
      replace: true, //replace this element with content from this directive's html template
      restrict: 'E', //restrict this directive to be html tag element
      template,
      scope: {
        employees: '=',
        edit: '&',
        delete: '&'
      },
      controller: function($scope, $http){
        $scope.currencies = {
          USD: { symbol: '$', rate: 1 },
          JPY: { symbol: '¥' },
          CNY: { symbol: '¥' }
        };

        //Getting currency exchange rate
        $http({ //FINALLY FIX THIS! Check Satellizer's README.md and satellizer.js for skipping authorization being added to header
          method: 'GET',
          url: 'https://openexchangerates.org/api/latest.json?app_id=fb4db514dcda4cce9452221d5993cc04',
          skipAuthorization: true  // `Authorization: Bearer <token>` will not be sent on this request.
        })
       .then(res => {
          $scope.currencies.JPY.rate = res.data.rates.JPY;
          $scope.currencies.CNY.rate = res.data.rates.CNY;
       });
        // $http({
        //   url: 'https://openexchangerates.org/api/latest.json?app_id=fb4db514dcda4cce9452221d5993cc04',
        //   method: 'GET',
        //   headers: {none: 'none'}
        // }).then(res => {
        //   console.log(res);
        // });

        $scope.salaryFormat = $scope.currencies.USD;

        $scope.update = function(employee) {
          $scope.edit({employee: employee});
        };

        $scope.deleteEmployee = function(employee) {
          $scope.delete({employee: employee});
        };
      }
    }//end of return
  })
}
