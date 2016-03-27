export default function(angularModule){
  angularModule.provider('employeeService', function() {//use provider here so that I can configure it in app.config

    var _url = '';

    this.setUrl = function(url) {
      _url = url;
      return _url;
    };

    this.$get = function ($resource){
      var Resource = $resource(_url,
                              {employeeId: '@_id'}, {
                                add: {method: 'POST'},
                                update: {method: 'PUT'}
                              });
      return Resource;
    }
  });
}
