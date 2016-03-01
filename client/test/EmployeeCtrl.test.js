// /*put "babel": {
//     "presets": [ "es2015" ]
//   }
// into package.json since babel will need a preset to run the test files

// defaults write com.apple.Safari ApplePersistenceIgnoreState YES : prevent new Safari tab opens for each time tests are run
// */

describe( 'Employee Controller', () => {

  beforeEach( angular.mock.module( 'employeeApp' ));

  var $controller, $scope, $httpBackend, $window, $auth, mockResource;

  var obj = {
                _id: '1',
                name: 'test',
                username: 'test',
                DOB: '1986-04-24UTC',
                address: '123 testing',
                phone: '555-555-5555',
                email: 'test@testing.com',
                position: 'accountant'
              };
  var keys = Object.keys(obj);

  beforeEach( angular.mock.inject( function(_$rootScope_, _$controller_, _$httpBackend_, _$window_, _$auth_, employeeService) { //we wrap these dependencies with underscore because we need to pass them to the declared vars $controller (for example) so that the tests will have access to it
    $controller = _$controller_;
    $scope = _$rootScope_.$new();//use rootScope instead of {} because we may set $rootScope.user = 'Something'
    $httpBackend = _$httpBackend_;
    $window = _$window_;
    $auth = _$auth_;
    mockResource = new employeeService();

    keys.forEach(key => {
      mockResource[key] = obj[key];
    });

  }));


  it('GET', () => {

    $httpBackend.expect('GET', 'http://localhost:3000/api/employees')
                .respond(200, [mockResource]);

    $controller('EmployeeController', {$scope, $httpBackend, $window, $auth});

    $httpBackend.flush();

    var props = Object.keys(obj);
    props.forEach(prop => {
      assert.equal($scope.employees[0].prop, obj.prop);
    });
  });

  it ('EDIT', () => {
    $httpBackend.expect('GET', 'http://localhost:3000/api/employees')
                .respond(200, [mockResource]);

    $controller('EmployeeController', {$scope, $httpBackend, $window, $auth});

    $httpBackend.flush();

    $scope.edit(mockResource);

    //Test if a copy is made and newEmployee has the same reference to the editting instance
    var copy = angular.copy(mockResource);
    assert.equal($scope.newEmployee, mockResource);
    assert.notEqual($scope.employeeToEdit, copy);
    assert.deepEqual($scope.employeeToEdit, copy);

    //Test if scope variables are set correctly after a user clicks on Edit link
    assert.equal($scope.editEmployee, true);
    assert.equal($scope.disable, true);
  });

  it('DELETE', () => {

    $httpBackend.expect('GET', 'http://localhost:3000/api/employees')
                .respond(200, [mockResource]);

    $httpBackend.expect('DELETE', 'http://localhost:3000/api/employees/1')
                .respond(200, mockResource);

    $controller('EmployeeController', {$scope, $httpBackend, $window, $auth});

    $scope.delete(mockResource);
    $httpBackend.flush();

    var keys = Object.keys($scope.deletedEmployee);
    keys.forEach(key => {
      assert.equal($scope.deletedEmployee.key, mockResource.key);
    });
  });

  it ('LOG OUT', () => {
    $httpBackend.expect('GET', 'http://localhost:3000/api/employees')
                .respond(200, [mockResource]);
    $controller('EmployeeController', {$scope, $httpBackend, $window, $auth});

    $scope.logout();

    //Test that after logout, the user is not authenticated anymore
    assert.equal($auth.isAuthenticated(), false);
  });
});
