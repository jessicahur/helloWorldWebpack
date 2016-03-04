import moneyFilter from './money-filter';


var filters = angular.module('filters', []);

moneyFilter(filters);

export default filters.name;
