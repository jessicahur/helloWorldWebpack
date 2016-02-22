
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

  var employees = [employee];

  var scope, render;

  function getElement() { //need to have this function because we always have to call render after assigning new variables attached to scope
    const element = render( scope );
    scope.$digest();
    return element;
  }

  const employeeTemplate = '<employee-edit edit-employee="editEmployee" new-employee="newEmployee" employees="employees"></employee-edit>';

  //Step 3: Create a functional scope and have template compiled and attached to scope
  beforeEach( angular.mock.inject( function( $rootScope, $compile ) { //we don't need _wrapping_ here since we don't need to assign these to any other var that test need access to
    scope = $rootScope.$new();
    render = $compile(employeeTemplate);
  }));

  //Step 4: Tests
  it('should successfully change its variables as expected', () => {
    //mimic how we have the employees array inside the app's scope
    scope.employees = employees;
    //mimic what $scope.edit(employee) inside the controller
    scope.newEmployee = angular.copy(employee);
    scope.editEmployee = true;

    const element = getElement( scope );//have to render it here so that the new variables assigned to scope get passed into isoScope

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


});
