/*Rewrite a date format instead of using moment.js*/


export default function(angularModule) {
  angularModule.filter('moneyExchange', function() { //register "moment" filter to the angular module passed in
    return function filter( salary, format) {
      const simplifyArr = ['', 'k', 'm'];
      const base = 1000;

      function convert() {
        if (salary < base) {
          return `${format.symbol} ${salary} ${simplifyArr[0]}`;
          // return format.symbol+ salary + simplifyArr[0];
        }
        else {
          var count = 1;
          var output = Math.floor(salary / base);
          while ( output >= base) {
            output = Math.floor(output / base);
            count ++;
          }
          var result = output + simplifyArr[count];
          return `${format.symbol} ${result}`;
        }
      }
      if (format.rate) {
        salary = Math.floor(salary / format.rate * 100) / 100;
        return convert();
      }
      else {
        return salary = 'Not Available';
      }

    }
  })//end of angularModule.filter
}
