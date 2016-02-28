import employeeService from './employee-service';
import user from './user';

var services = angular.module('services', []);

employeeService(services);
user( services );

export default services.name;
