exports.config = {
  allScriptsTimeout: 11000, //deal with some angular bootstrapping issues

   specs:['test-e2e/**/*.js'], //where the test files are. We use suites in this case so we don't need specs

   //suites: {}, //for part testings

   multiCapabilities: ['chrome'],

   seleniumAddress: 'http://localhost:4444/wd/hub',

   baseUrl: 'http://localhost:8080', //because of webpack-dev-sever

   framework: 'jasmine', //limited supports for mocha/chai

   jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
   }
};

