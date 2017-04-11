import XuntongJSBridge from "XuntongJSBridge";
angular.module('App').controller('DashboardController', ['$http', '$scope', '$rootScope', '$state', '$stateParams', 'domain', function ($http, $scope, $rootScope, $state, $stateParams, domain) {

    $scope.scan = function (type) {
        XuntongJSBridge.call('scanQRCode', { 'needResult': 1, 'scanType': ['qrCode'] }, function (result) {
            // alert(angular.toJson(result));
            $state.go('visiting-records-detail', { planId: result.data.qrcode_str, type: type });
        });
    }

    $scope.toPage = function(){
        window.location.href="https://eligrey.com/demos/FileSaver.js/";
    }

    // $(".ui-dialog").dialog("show");
    // var myDialog = $.dialog({
    //     title: "温馨提示",
    //     content: '温馨提示内容',
    //     button: ["确认", "取消"]
    // })
    // myDialog.on("dialog:hide", function (e) {
    //     // To do sth when dialog hide
    // })
    $scope.selectPerson = function () {
        XuntongJSBridge.call('selectPerson', { 'pType': '1' }, function (result) {
            // alert(JSON.stringify(result));
        });
    }

}]);