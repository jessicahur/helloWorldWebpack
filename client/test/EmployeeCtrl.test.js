// /*put "babel": {
//     "presets": [ "es2015" ]
//   }
// into package.json since babel will need a preset to run the test files

// defaults write com.apple.Safari ApplePersistenceIgnoreState YES : prevent new Safari tab opens for each time tests are run
// */

// describe( 'Employee Controller', () => {

//   beforeEach( angular.mock.module( 'employeeApp' ));

//   var $controller, $scope, $httpBackend;

//   var obj = {
//                 _id: '1',
//                 name: 'test',
//                 username: 'test',
//                 DOB: '1986-04-24UTC',
//                 address: '123 testing',
//                 phone: '555-555-5555',
//                 email: 'test@testing.com',
//                 position: 'accountant'
//               };

//   var exchangeRates = {
//         rates: {
//           JPY: 2,
//           CNY: 1.5
//         }
//     };

//   beforeEach( angular.mock.inject( function(_$rootScope_, _$controller_, _$httpBackend_) { //we wrap these dependencies with underscore because we need to pass them to the declared vars $controller (for example) so that the tests will have access to it
//     $controller = _$controller_;
//     $scope = _$rootScope_.$new();//use rootScope instead of {} because we may set $rootScope.user = 'Something'
//     $httpBackend = _$httpBackend_;
//   }));

//   it('filter: changes currencies', () => {

//     $httpBackend.expect('GET', 'https://openexchangerates.org/api/latest.json?app_id=fb4db514dcda4cce9452221d5993cc04')
//                 .respond(200, exchangeRates);

//     $httpBackend.expect('GET', 'http://localhost:3000/api/employees')
//                 .respond(200, [obj]);

//     $controller('EmployeeController', {$scope, $httpBackend});

//     $httpBackend.flush();

//     assert.equal($scope.currencies.USD.rate, 1);
//     assert.equal($scope.currencies.JPY.rate, 2);
//     assert.equal($scope.currencies.CNY.rate, 1.5);

//   });

//   it('GET', () => {

//     $httpBackend.expect('GET', 'https://openexchangerates.org/api/latest.json?app_id=fb4db514dcda4cce9452221d5993cc04')
//                 .respond(200, exchangeRates);

//     $httpBackend.expect('GET', 'http://localhost:3000/api/employees')
//                 .respond(200, [obj]);

//     $controller('EmployeeController', {$scope, $httpBackend});

//     $httpBackend.flush();

//     var props = Object.keys($scope.employees[0]);
//     props.forEach(prop => {
//       assert.equal($scope.employees[0].prop, obj.prop);
//     });
//   });


//   it('DELETE', () => {

//     $httpBackend.expect('GET', 'https://openexchangerates.org/api/latest.json?app_id=fb4db514dcda4cce9452221d5993cc04')
//                 .respond(200, exchangeRates);

//     $httpBackend.expect('GET', 'http://localhost:3000/api/employees')
//                 .respond(200, [obj]);

//     $httpBackend.expect('DELETE', 'http://localhost:3000/api/employees/1')
//                 .respond(200, obj);

//     $controller('EmployeeController', {$scope, $httpBackend});

//     $scope.delete(obj);
//     $httpBackend.flush();

//     var keys = Object.keys($scope.deletedEmployee);
//     keys.forEach(key => {
//       assert.equal($scope.deletedEmployee.key, obj.key);
//     });
//   });

//   // it('ADD', () => {
//   //   var newEmployee = {
//   //               _id: '2',
//   //               name: 'new',
//   //               username: 'new',
//   //               DOB: '1989-04-24UTC',
//   //               address: '123 new',
//   //               phone: '555-555-5555',
//   //               email: 'new@testing.com',
//   //               position: 'accountant'
//   //   };

//   //   $httpBackend.expect('GET', 'https://openexchangerates.org/api/latest.json?app_id=fb4db514dcda4cce9452221d5993cc04')
//   //               .respond(200, exchangeRates);

//   //   $httpBackend.expect('GET', 'http://localhost:3000/api/employees')
//   //               .respond(200, [obj]);

//   //   $httpBackend.expect('POST','http://localhost:3000/api/employees')//No need to include newEmployee here?
//   //               .respond(newEmployee);

//   //   $controller('EmployeeController', {$scope, $httpBackend});

//   //   $scope.edit(newEmployee);
//   //   $scope.addEmployee();
//   //   $httpBackend.flush();

//   //   var keys = Object.keys($scope.employees[1]);
//   //   keys.forEach(key => {
//   //     assert.equal($scope.employees[1].key, newEmployee.key);
//   //   });
//   //   assert.equal($scope.badRequest, false);
//   // });

//   // it('EDIT', () => {
//   //   obj.name = 'NEW NAME';

//   //   $httpBackend.expect('GET', 'https://openexchangerates.org/api/latest.json?app_id=fb4db514dcda4cce9452221d5993cc04')
//   //               .respond(200, exchangeRates);

//   //   $httpBackend.expect('GET', 'http://localhost:3000/api/employees')
//   //               .respond(200, [obj]);

//   //   $httpBackend.expect('PUT', 'http://localhost:3000/api/employees/1')
//   //               .respond(200, obj);

//   //   $controller('EmployeeController', {$scope, $httpBackend});

//   //   $scope.edit(obj);
//   //   $scope.newEmployee.index = 1;
//   //   $scope.editSelectedEmployee();

//   //   $httpBackend.flush();

//   //   var keys = Object.keys($scope.employees[0]);
//   //   keys.forEach(key => {
//   //     assert.equal($scope.employees[0].key, obj.key);
//   //   });
//   // });

// });
