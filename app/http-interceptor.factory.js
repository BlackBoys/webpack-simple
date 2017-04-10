import XuntongJSBridge from "XuntongJSBridge";
angular.module('App').factory('myHttpInterceptor', ['$q', 'loadingFactory', 'tipsFactroy', '$timeout', function ($q, loadingFactory, tipsFactroy, $timeout) {
  // let loading = loadingFactory.loading;
  return {
    // optional method
    'request': function (config) {
      // do something on success
      loadingFactory.loading.addClass('show');
      return config;
    },

    // optional method
    'requestError': function (rejection) {
      // do something on error
      //   if (canRecover(rejection)) {
      //     return responseOrNewPromise
      //   }
      tipsFactroy.show("请在云之家轻应用里打开应用", 'error', 3000);
      loadingFactory.loading.removeClass('show');

      return $q.reject(rejection);
    },



    // optional method
    'response': function (response) {
      // do something on success
      loadingFactory.loading.removeClass('show');
      if (response.data && response.data.data && !response.data.flag) {
        tipsFactroy.show("程序异常,请联系管理员", 'error', 3000);
        return response;
      } else {
        return response;
      }

    },

    // optional method
    'responseError': function (rejection) {
      // do something on error
      //   if (canRecover(rejection)) {
      //     return responseOrNewPromise
      //   }
      alert(angular.toJson(rejection));
      loadingFactory.loading.removeClass('show');
      XuntongJSBridge.call('getNetworkType', {}, function (result) {
        if (result.data.network_type == 'fail') tipsFactroy.show("您的网络连接已断开", 'error', 3000);
        else tipsFactroy.show("程序异常,请联系管理员", 'error', 3000);
      });
      return $q.reject(rejection);
    }
  };
}]);