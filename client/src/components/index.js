import angular from 'angular';
import employeeEdit from './employee-edit/employee-edit';

var components = angular.module('components', []);

employeeEdit(components);

export default components.name;
