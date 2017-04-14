import XuntongJSBridge from "XuntongJSBridge";
angular.module('App').controller('DashboardController', ['$http', '$scope', '$rootScope', '$state', '$stateParams', 'domain', function ($http, $scope, $rootScope, $state, $stateParams, domain) {

    $scope.scan = function (type) {
        XuntongJSBridge.call('scanQRCode', { 'needResult': 1, 'scanType': ['qrCode'] }, function (result) {
            // alert(angular.toJson(result));
            $state.go('visiting-records-detail', { planId: result.data.qrcode_str, type: type });
        });
    }

    let uri = new URI(window.location);
    let ticket = uri.search(true).ticket;
    

    $scope.selectPerson = function () {
        XuntongJSBridge.call('selectPerson', { 'pType': '1' }, function (result) {
            // alert(JSON.stringify(result));
        });
    }

}]);