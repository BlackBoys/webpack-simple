import XuntongJSBridge from "XuntongJSBridge";
angular.module('App').controller('CodeLogController', ['$http', '$scope', function ($http, $scope) {
    $scope.visitor = {
        type:'register'
    };
    // $scope.register = function () {
    //     XuntongJSBridge.call('scanQRCode', { 'needResult': 0, 'scanType': ['qrCode'] }, function (result) {
    //         // alert(angular.toJson(result));
    //     });
    // }

    $scope.selectPerson = function () {
        XuntongJSBridge.call('selectPerson', { 'pType': '1' }, function (result) {
            alert(JSON.stringify(result));
        });
    }

}]);