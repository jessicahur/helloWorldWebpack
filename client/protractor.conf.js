var env = require('./env.js');

exports.config = {
  allScriptsTimeout: 11000, //// The timeout in milliseconds for each script run on the browser. This should
  // be longer than the maximum time your application needs to stabilize between
  // tasks.

  specs:['test-e2e/**/*.js'], //where the test files are. We use suites in this case so we don't need specs

   //suites: {}, //for part testings

   capabilities: {
    'browserName': 'chrome'
  },
  // multiCapabilities: [{'browserName':'chrome'}, {'browserName': 'safari'}],//testing on many browsers. Running safari ended up with 'Unable to establish a connection with the SafariDriver extension'

  seleniumAddress: 'http://localhost:4444/wd/hub', // The address of a running Selenium Server. If specified, Protractor will
  // connect to an already running instance of Selenium (called with 'webdriver-manager start'). This usually looks like
  // seleniumAddress: 'http://localhost:4444/wd/hub'

  // onPrepare: function(){
  //   // browser.executeScript('window.sessionStorage.clear();');
  // },
  // params: {
  //   login: {
  //     token: env.token
  //   }
  // },

  baseUrl: 'http://localhost:8080', //because of webpack-dev-sever, we don't have to put the entire path down in the test files

  framework: 'jasmine', //limited supports for mocha/chai

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000 // Default time to wait in ms before a test fails.
  }
};

