import XuntongJSBridge from "XuntongJSBridge";
import "./visiting-records-detail.css";
angular.module('App').controller('VisitingRecordsDetailController', ['$http', '$scope', '$stateParams', 'domain', '$state', function ($http, $scope, $stateParams, domain, $state) {
    $scope.getDetail = function (planId) {
        $http.get(`${domain.zh}/visitor/selVisitorByPlanId?planId=${planId}`).success(function (data) {
            $scope.record = data;
        }).error(function () {

        });
    }

    $scope.register = function (planId) {
        $http.get(`${domain.zh}/visitor/updateCheckintime?planId=${planId}`).success(function () {
            $state.go('visiting-records');
        }).error();
    }

    $scope.showdialog = function (){
        $scope.dialogshow = true;
    }

    // $scope.showdialog();

    $scope.leave = function (planId) {
        // var myDialog = $.dialog({
        //     title: "温馨提示",
        //     content: '温馨提示内容',
        //     button: ["确认", "取消"]
        // })
        // myDialog.on("dialog:action",function(e){
		// 	        console.log(e.index)
		// 	    });
		// 	    myDialog.on("dialog:hide",function(e){
		// 	        console.log("dialog hide")
		// 	    });
        $http.get(`${domain.zh}/visitor/updateCheckouttime?planId=${planId}`).success(function () {
            $state.go('visiting-records');
        }).error();
    }

    console.dir($stateParams);

    $scope.getDetail($stateParams.planId);
    //（0：未到访；1：已到访；2：已离开；3：已作废；）
    $scope.getType = function (type) {
        switch (type) {
            case "0": return "未到访";
            case "1": return "已到访";
            case "2": return "已离开";
            case "3": return "已作废";
        }
    }

    $scope.selectPerson = function () {
        XuntongJSBridge.call('selectPerson', { 'pType': '1' }, function (result) {
            alert(JSON.stringify(result));
        });
    }

}]);