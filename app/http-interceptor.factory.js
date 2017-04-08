angular.module('App').factory('myHttpInterceptor', ['$q','loadingFactory',function($q,loadingFactory) {
    // let loading = loadingFactory.loading;
  return {
    // optional method
    'request': function(config) {
      // do something on success
        loadingFactory.loading.addClass('show');
      return config;
    },

    // optional method
   'requestError': function(rejection) {
      // do something on error
    //   if (canRecover(rejection)) {
    //     return responseOrNewPromise
    //   }
    loadingFactory.loading.removeClass('show');
    
      return $q.reject(rejection);
    },



    // optional method
    'response': function(response) {
      // do something on success
    loadingFactory.loading.removeClass('show');
      return response;
    },

    // optional method
   'responseError': function(rejection) {
      // do something on error
    //   if (canRecover(rejection)) {
    //     return responseOrNewPromise
    //   }
      loadingFactory.loading.removeClass('show');
    
      return $q.reject(rejection);
    }
  };
}]);