import angular from 'angular';
import app from './app/app';
import navbar from './navbar/navbar';
import login from './login/login';
import hpviewMobile from './hpview-mobile/hpview-mobile';
import aboutus from './about-us/about-us';
import ouremployees from './our-employees/our-employees';
import locations from './locations/locations';
import employeeEdit from './employee-edit/employee-edit';
import employeeControl from './employee-control/employee-control';
import employeeTable from './employee-table/employee-table';
import employeeDelete from './employee-delete/employee-delete';
import homepage from './homepage/homepage';

var components = angular.module('components', []);

navbar(components);
login(components);
hpviewMobile(components);
aboutus(components);
ouremployees(components);
locations(components);
employeeEdit(components);
employeeControl(components);
employeeTable(components);
employeeDelete(components);
homepage(components);
app(components);

export default components.name;
