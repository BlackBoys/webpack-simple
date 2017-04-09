angular.module('App').factory('myHttpInterceptor', ['$q', 'loadingFactory', 'tipsFactroy', '$timeout', function ($q, loadingFactory, tipsFactroy, $timeout) {
  // let loading = loadingFactory.loading;
  return {
    // optional method
    'request': function (config) {
      // do something on success
      loadingFactory.loading.addClass('show');
      $timeout(function(){
        tipsFactroy.show("网络请求失败", 'error', 1500);
      },1000)
      
      return config;
    },

    // optional method
    'requestError': function (rejection) {
      // do something on error
      //   if (canRecover(rejection)) {
      //     return responseOrNewPromise
      //   }
      loadingFactory.loading.removeClass('show');

      return $q.reject(rejection);
    },



    // optional method
    'response': function (response) {
      // do something on success
      loadingFactory.loading.removeClass('show');
      return response;
    },

    // optional method
    'responseError': function (rejection) {
      // do something on error
      //   if (canRecover(rejection)) {
      //     return responseOrNewPromise
      //   }
      loadingFactory.loading.removeClass('show');
      return $q.reject(rejection);
    }
  };
}]);