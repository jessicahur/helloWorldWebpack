describe ('LOGIN', () => {

  //Step 1: Create an $auth obj so that we can override satellizer's $auth behaviors
  var $auth = {};

  //Step 2: Mock your app and provide the mock $auth. Whenever $auth is called later in the app, it will be OUR $auth instead of satellizer's $auth
  beforeEach( angular.mock.module('employeeApp', $provide => {
    $provide.value('$auth', $auth);
  }));

  var scope, render, $httpBackend;


  //Step 3: Set up rendering function and template
  const loginTemplate = `<login success="success(response)"/>`;

  function getElement(scope) { //need to have this function because we always have to call render and $digest after assigning new variables attached to scope
    const element = render( scope );
    scope.$digest();
    return element;
  }

  //Step 3b: Before each test, create new scope and create new render function
  beforeEach( angular.mock.inject( function( _$rootScope_, _$compile_) { //we don't need _wrapping_ here since we don't need to assign these to any other var that test need access to
    scope = _$rootScope_.$new();
    render = _$compile_(loginTemplate);
  }));

  it('login successfully', done => {
    var response = {}; //Need a response to simulate what $auth.authenticate does later
    let authCalled = false; //Need a sign to tell us if $auth.authenticate(provider) was called, make it private here so that the next test can't change its value
    let successCalled = false; //Also need a sign to check if the success path was called, also make it private

    //Redefine $auth.authenticate:
    $auth.authenticate = function (provider) {
      assert.equal(provider, 'github'); //make sure that the provider getting passed in is github
      authCalled = true; //change the flag so that we know $auth was called
      return Promise.resolve(response); //Simulate the promise resolve prop of $auth.authenticate
    }

    //Redefine what our outer scope's success function does, instead of importing the anonymous controller in:
    //(Recall that outter scope's success will call dialog.close and redirect our app)
    scope.success = function(res) {
      successCalled = true;
      assert.equal(res, response); //Make sure our mock $auth.authenticate pass the same response obj defined in the beginning of test
    }

    var element = getElement(scope);//Create outer controller's scope

    var isoScope = element.isolateScope();//create our controller's isoscope

    isoScope.authenticate('github')
            .then(res => {
              console.log(res);
              // assert.ok(res);//Test if the success path was taken
              assert.ok(authCalled);//Test if $auth.authenticate was called
              assert.ok(successCalled);//Test if the outer scope's success function was called
              done();
            })
            .catch(done);
  });

  it('fails if authentication returns error', done => {
    var error = 'bad user';
    let authCalled = false;
    let successCalled = false;

    $auth.authenticate = function (provider) {
      assert.equal(provider, 'github');
      authCalled = true;
      return Promise.reject(error); //Simulate $auth.authenticate returns error for bad authentication
    };

    var element = getElement(scope);

    var isoScope = element.isolateScope();

    isoScope.authenticate('github')
            .then(() => {
              assert.ok(authCalled);
              assert.notOk(successCalled);
              assert.equal(isoScope.error, error);
              done();
            })
            .catch(done);
  });
});
