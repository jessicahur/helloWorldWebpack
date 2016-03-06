//http://tylermcginnis.com/angularjs-factory-vs-service-vs-provider/

import employeeApp from './js/app';
import 'ng-dialog/css/ngDialog.css';
import 'ng-dialog/css/ngDialog-theme-default.css';
import './main.scss';

import employeeCtrl from './js/employeeCtrl';
import configRoute from './js/config-route';
import configAuth from './js/config-auth';


/*----------CONFIGURE APP------------*/
configRoute(employeeApp);

employeeApp.config(function(url, employeeServiceProvider) {
  employeeServiceProvider.setUrl(url);
});

configAuth(employeeApp);

