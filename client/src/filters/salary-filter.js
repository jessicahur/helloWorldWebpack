/*Rewrite a date format instead of using moment.js*/

export default function(angularModule) {
  angularModule.filter('salary', function() { //register "moment" filter to the angular module passed in
    return function salaryFilter( salary, format) {
      const simplifyArr = ['', 'k', 'm'];
      const base = 1000;
      const baseJYen = 114.31;
      if (format === 'yen') {
        var salary = salary/baseJYen;
      }
      if (salary < base) {
        return salary + simplifyArr[0];
      }
      else {
        var count = 1;
        var output = Math.floor(salary/base);
        while ( output >= base) {
          output = Math.floor(output/base);
          count ++;
        }
        var result = output + simplifyArr[count];
        return result;
      }

    }
  })//end of angularModule.filter
}
