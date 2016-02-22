
describe('employee-edit Component', () => {
  //Step 1: Mock your app
  beforeEach( angular.mock.module('employeeApp') );

  //Step 2: Set up all variables inside the rootScope so that you can pass in
  var employee = {
                _id: '1',
                name: 'test',
                username: 'test',
                DOB: '1986-04-24UTC',
                address: '123 testing',
                phone: '000-000-0000',
                email: 'test@testing.com',
                position: 'accountant'
              };

  var updatedEmployee = {
                _id: '1',
                name: 'Changed',
                username: 'test',
                DOB: '1986-04-24',
                address: '123 testing',
                phone: '000-000-0000',
                email: 'test@testing.com',
                position: 'accountant'
              };

  var newEmployeeData = {
                _id: '2',
                name: 'newEmployee',
                username: 'test',
                DOB: '1986-04-24',
                address: '123 testing',
                phone: '000-000-0000',
                email: 'test@testing.com',
                position: 'accountant'
  }

  var employees = [employee];

  var scope, render, $httpBackend;

  function getElement() { //need to have this function because we always have to call render after assigning new variables attached to scope
    const element = render( scope );
    scope.$digest();
    return element;
  }

  const employeeTemplate = '<employee-edit edit-employee="editEmployee" new-employee="newEmployee" employees="employees"></employee-edit>';

  //Step 3: Create a functional scope and have template compiled and attached to scope
  beforeEach( angular.mock.inject( function( _$rootScope_, _$compile_, _$httpBackend_ ) { //we don't need _wrapping_ here since we don't need to assign these to any other var that test need access to
    scope = _$rootScope_.$new();
    render = _$compile_(employeeTemplate);
    $httpBackend = _$httpBackend_;
    //mimic how we have the employees array inside the app's scope
    scope.employees = employees;
  }));

  //Step 4: Tests
  it('should successfully change its variables as expected', () => {
    //mimic what $scope.edit(employee) inside the controller
    scope.newEmployee = angular.copy(employee);
    scope.editEmployee = true;

    const element = getElement(scope);//have to render it here so that the new variables assigned to scope get passed into isoScope

    var isoScope = element.isolateScope();

    var arr = [isoScope.editEmployee, isoScope.badRequest, isoScope.newEmployee, isoScope.disable ];
    var expectedAfter = [null, null, null,false];//"After" values for the variables in arr

    //Test if isoScope.newEmployee is an Angular copy of employee
    assert.notEqual(employee, isoScope.newEmployee);
    assert.deepEqual(employee, isoScope.newEmployee);

    //mimic user edit the name field on the form
    isoScope.newEmployee.name = 'Changed';

    isoScope.cancelEdit();

    expectedAfter.forEach( (item, index) => {
      assert.equal(item, expectedAfter[index]);
    });
  });

  it('should successfully update the changed employee', () => {
    $httpBackend.expect('PUT', 'http://localhost:3000/api/employees/1')
                .respond(200, updatedEmployee);

    scope.newEmployee = angular.copy(employee);
    scope.editEmployee = true;
    scope.employeeToEdit = employee;

    const element = getElement(scope);

    var isoScope = element.isolateScope();

    isoScope.newEmployee.name = 'Changed';

    isoScope.editSelectedEmployee();
    $httpBackend.flush(); // CAN'T STRESS ENOUGH: NEED TO DO "FLUSH" AFTER A FUNCTION THAT DO HTTP REQUEST!!!!!!

    assert.equal(isoScope.newEmployee, null);
    assert.deepEqual(isoScope.employees[0], updatedEmployee);
  });

  it('should successfully add a new employee to employees array', () => {
    $httpBackend.expect('POST', 'http://localhost:3000/api/employees')
                .respond(200, newEmployeeData);

    scope.newEmployee = {};
    const element = getElement(scope);
    var isoScope = element.isolateScope();

    assert.equal(scope.employees.length, 1);

    isoScope.addEmployee();
    $httpBackend.flush();

    assert.equal(scope.employees.length, 2);
    assert.deepEqual(isoScope.employees[1], newEmployeeData);
  });
});
