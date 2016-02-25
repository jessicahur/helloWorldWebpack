import angular from 'angular';
import employeeEdit from './employee-edit/employee-edit';
import employeeControl from './employee-control/employee-control';
import employeeTable from './employee-table/employee-table';

var components = angular.module('components', []);

employeeEdit(components);
employeeControl(components);
employeeTable(components);

export default components.name;
