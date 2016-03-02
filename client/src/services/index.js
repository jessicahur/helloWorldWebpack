import employeeService from './employee-service';

var services = angular.module('services', []);

employeeService(services);

export default services.name;
