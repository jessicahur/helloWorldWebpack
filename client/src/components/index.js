import angular from 'angular';
import employeeEdit from './employee-edit/employee-edit';
import employeeControl from './employee-control/employee-control';
import employeeTable from './employee-table/employee-table';
import employeeDelete from './employee-delete/employee-delete';

var components = angular.module('components', []);

employeeEdit(components);
employeeControl(components);
employeeTable(components);
employeeDelete(components);

export default components.name;
