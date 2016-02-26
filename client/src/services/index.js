import resourceService from './resource-service';
import employeeService from './employee-service';

var services = angular.module('services', []);

resourceService(services);
employeeService(services);

export default services.name;
