describe( 'Providers' , () => {

  var $resource = function(url) {
   return true
   };
  var employeeService;

  beforeEach(module('services'), $provide => {
    $provide.value('$resource', $resource);
  }); //same as using angular.mock.module

  describe('employee-service as provider', () => {

    beforeEach(module(_employeeServiceProvider_ => {
      employeeService = _employeeServiceProvider_;
    }));

    beforeEach(inject());//same as angular.mock.inject

    it('should successfully set $resource url', () => {
      var testUrl = 'http://test';
      var urlBeforeConfig = employeeService.setUrl();

      var urlAfterConfig = employeeService.setUrl(testUrl);

      //Test that employeeService's setUrl method works
      assert.equal(urlAfterConfig, testUrl);

      var serviceInstance = employeeService.$get($resource);

      //Test if a value resulted from passing $resource into $get is returned
      assert.equal(serviceInstance, true);
    });
  });

});
