import angular from 'angular';

import filters from '../filters';
import services from '../services';
import components from '../components';

import employeeCtrl from './employeeCtrl';

import ngMessages from 'angular-messages';
import ngResource from 'angular-resource';
import uiRouter from 'angular-ui-router';
import uiBootstrap from 'angular-ui-bootstrap';
import satellizer from 'satellizer';
import ngDialog from 'ng-dialog';

var baseUrl = BASE_URL;

export default angular
                .module( 'employeeApp', [ ngMessages,
                                               ngResource,
                                               uiRouter,
                                               uiBootstrap,
                                               satellizer,
                                               ngDialog,
                                               components,
                                               services,
                                               filters])
                .controller('EmployeeController', employeeCtrl)
                .constant( 'url', baseUrl + '/api/employees/:employeeId');
