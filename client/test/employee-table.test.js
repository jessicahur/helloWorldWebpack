describe ('Employee-Table Directive', () => {

  beforeEach( angular.mock.module('employeeApp'));

  var $httpBackend, $scope, render;

  var template = `<employee-table employees="employees"
                      edit="edit(employee)"
                      delete="delete(employee)">
                  </employee-table>`;

  function getElement($scope){
    const element = render($scope);
    $scope.$digest();
    return element;
  }

  beforeEach( angular.mock.inject(function(_$httpBackend_, _$rootScope_, _$compile_){
    $scope = _$rootScope_.$new();
    $httpBackend = _$httpBackend_;
    render = _$compile_(template);
  }));

  it('should GET currency rates', () => {
    $httpBackend.expect('GET', 'https://openexchangerates.org/api/latest.json?app_id=fb4db514dcda4cce9452221d5993cc04')
                .respond(200, {rates: { JPY: 2,
                                              CNY: 1.5 }
                              });

    var element = getElement($scope);
    var isoScope = element.isolateScope();

    $httpBackend.flush();

    assert.equal(isoScope.currencies.JPY.rate, 2);
    assert.equal(isoScope.currencies.CNY.rate, 1.5);
  });

  it('should be able to call edit employee', () => {
    var outerScopeEditCalled = false;

    $httpBackend.expect('GET', 'https://openexchangerates.org/api/latest.json?app_id=fb4db514dcda4cce9452221d5993cc04')
                .respond(200, {rates: { JPY: 2,
                                              CNY: 1.5 }
                              });
    $scope.edit = function () {
      outerScopeEditCalled = true;
    }
    var element = getElement($scope);
    var isoScope = element.isolateScope();

    $httpBackend.flush();

    //Test if isoScope.update wasn't called then outerScopeEditCalled is still false
    assert.equal(outerScopeEditCalled, false);

    //Test if isoScope.update was called then outerScopeEditCalled is true
    isoScope.update();//I don't think we care that an actual employee obj is passed here so I'll leave it empty
    assert.equal(outerScopeEditCalled, true);
  });

  it('should be able to call outer scope delete function', () => {
    var outerScopeDeleteCalled = false;

    $httpBackend.expect('GET', 'https://openexchangerates.org/api/latest.json?app_id=fb4db514dcda4cce9452221d5993cc04')
                .respond(200, {rates: { JPY: 2,
                                              CNY: 1.5 }
                              });
    $scope.delete = function () {
      outerScopeDeleteCalled = true;
    }

    var element = getElement($scope);
    var isoScope = element.isolateScope();

    assert.equal(outerScopeDeleteCalled, false);

    isoScope.deleteEmployee();
    assert.equal(outerScopeDeleteCalled, true);
  });
});
