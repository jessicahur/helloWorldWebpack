const fs = require( 'fs' );

describe('employeeApp', () => {
  var testObj = {
    'newEmployee.name': 'Test999',
    'newEmployee._id': '999',
    'newEmployee.username': 'test999',
    'newEmployee.DOB': '3000-12-12',
    'newEmployee.address': '123 testing, test city, TEST',
    'newEmployee.phone': '000-000-0000',
    'newEmployee.email': 'test@test.com',
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

  it('POST: a new employee to db', () => {
    modify(testObj);
    element(by.buttonText('ADD')).click();

        browser.takeScreenshot().then( png => {
          fs.writeFileSync( '../../test0.png', png, { encoding: 'base64' } );
        });

    element.all(by.repeater('employee in employees').column('employee.name')).last().getText()
            .then(text => {
              expect(text).toEqual('Test999');
            });
  });

  it('EDIT: a test employee', () => {
    element.all(by.repeater('employee in employees'))
            .then( arr => {
              return arr[arr.length-1].all(by.css('a'));
            })
            .then( arr => {
              return arr[0].click();
            })
            .then( () => {
              return element(by.model('newEmployee.name')).clear().sendKeys('Test1000');
            })
            .then( () => {
              element(by.buttonText('EDIT')).click();

              element.all(by.repeater('employee in employees').column('employee.name')).last().getText()
                  .then(text => {
                    console.log(text);
                  });
              browser.takeScreenshot().then( png => {
                fs.writeFileSync( '../../test1.png', png, { encoding: 'base64' } );
              });
            });

  });
});
