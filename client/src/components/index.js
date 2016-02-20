import angular from 'angular';
import employeeEdit from './employee-edit/employee-edit';
import employeeControl from './employee-control/employee-control';

var components = angular.module('components', []);

employeeEdit(components);
employeeControl(components);

export default components.name;
