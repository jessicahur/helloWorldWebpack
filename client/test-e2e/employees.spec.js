//http://stackoverflow.com/questions/20959748/e2e-protractor-test-requiring-oauth-authentication
//To run protractor: Run MongoDB, webdriver-manager start, npm start for client, npm start for server, then start test
//https://github.com/angular/protractor/issues/188 execute script to set localStorage for e2e

describe('employeeApp', () => {
  var env = require('../env.js');

  var testObj = {
    'newEmployee.name': 'Test999',
    'newEmployee._id': '999',
    'newEmployee.username': 'test999',
    'newEmployee.DOB': '3000-12-12',
    'newEmployee.address': '123 testing, test city, TEST',
    'newEmployee.phone': '000-000-0000',
    'newEmployee.email': 'test@test.com',
    'newEmployee.salary': '10000',
    'newEmployee.position': 'accountant'
  };

    function modify(testObj) {
      var keys = Object.keys(testObj);
      keys.forEach(key => {
        element(by.model(key)).sendKeys(testObj[key]);
      });
    }

    it('should have a title', () => {
      browser.get('/');
      expect(browser.getTitle()).toEqual('Employee List');
    });


    describe('inside protected route with token setup', () => {

      it('should be able to view employees with token set', () => {
        browser.executeScript(`window.localStorage.setItem('satellizer_token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1NmQzN2JmOTEwMDc4NGQ4MDVkZGU3NGUiLCJpYXQiOjE0NTcwMzcyMDksImV4cCI6MTQ1ODI0MzIwOX0.Es_vRz7sEBc6r61dA75oDqXtNoIChxPbItCjLsLL5GY');`);
        element(by.css('#viewEmployee')).click();
      });

      it('POST: a new employee to db', () => {
        modify(testObj);
        element(by.buttonText('ADD')).click();
        element.all(by.repeater('employee in employees').column('employee.name')).last().getText()
                .then(text => {
                  expect(text).toEqual('Test999');
                });
      });

      it('should be able to filter out the testing name', () => {
        element(by.model('search.name')).sendKeys('Test999');
        element.all(by.repeater('employee in employees').column('employee.name')).first().getText()
               .then( text => {
                 expect(text).toEqual('Test999');
               });
      });

      it('EDIT: a test employee', () => {
        element(by.model('search.name')).clear();
        element.all(by.repeater('employee in employees'))
                .then( arr => {
                  return arr[arr.length-1].all(by.css('a'));
                })
                .then( arr => {
                  arr[0].click();
                  element(by.model('newEmployee.name')).clear().sendKeys('Test1000');
                  element(by.buttonText('EDIT')).click();
                  element.all(by.repeater('employee in employees').column('employee.name')).last().getText()
                      .then(text => {
                        expect(text).toEqual('Test1000');
                      });
                });
      });

      it('DELETE: a test employee', () => {
        element.all(by.repeater('employee in employees'))
                .then( arr => {
                  return arr[arr.length-1].all(by.css('a'));
                })
                .then( arr => {
                  arr[1].click();
                  element.all(by.repeater('employee in employees').column('employee.name')).last().getText()
                      .then(text => {
                        expect(text).not.toEqual('Test1000');
                      });
                });
      });

    });
});
// const fs = require( 'fs' );

// describe('employeeApp', () => {
//   var testObj = {
//     'newEmployee.name': 'Test999',
//     'newEmployee._id': '999',
//     'newEmployee.username': 'test999',
//     'newEmployee.DOB': '3000-12-12',
//     'newEmployee.address': '123 testing, test city, TEST',
//     'newEmployee.phone': '000-000-0000',
//     'newEmployee.email': 'test@test.com',
//     'newEmployee.position': 'accountant'
//   };

//   function modify(testObj) {
//     var keys = Object.keys(testObj);
//     keys.forEach(key => {
//       element(by.model(key)).sendKeys(testObj[key]);
//     });
//   }

//   it('should have a title', () => {
//     browser.get('/');
//     expect(browser.getTitle()).toEqual('Employee List');
//   });

//   it('POST: a new employee to db', () => {
//     modify(testObj);
//     element(by.buttonText('ADD')).click();
//     element.all(by.repeater('employee in employees').column('employee.name')).last().getText()
//             .then(text => {
//               expect(text).toEqual('Test999');
//             });
//   });

//   it('should be able to filter out the testing name', () => {
//     element(by.model('search.name')).sendKeys('Test999');
//     element.all(by.repeater('employee in employees').column('employee.name')).first().getText()
//            .then( text => {
//              expect(text).toEqual('Test999');
//            })
//   });

//   it('EDIT: a test employee', () => {
//     element.all(by.repeater('employee in employees'))
//             .then( arr => {
//               return arr[arr.length-1].all(by.css('a'));
//             })
//             .then( arr => {
//               arr[0].click();
//               element(by.model('newEmployee.name')).clear().sendKeys('Test1000');
//               element(by.buttonText('EDIT')).click();
//               element.all(by.repeater('employee in employees').column('employee.name')).last().getText()
//                   .then(text => {
//                     expect(text).toEqual('Test1000');
//                   });
//             });
//   });

//   it('DELETE: a test employee', () => {
//     element.all(by.repeater('employee in employees'))
//             .then( arr => {
//               return arr[arr.length-1].all(by.css('a'));
//             })
//             .then( arr => {
//               arr[1].click();
//               element.all(by.repeater('employee in employees').column('employee.name')).last().getText()
//                   .then(text => {
//                     expect(text).not.toEqual('Test1000');
//                   });
//             });
//   })

// });
