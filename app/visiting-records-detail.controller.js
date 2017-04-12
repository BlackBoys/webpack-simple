import XuntongJSBridge from "XuntongJSBridge";
import "./visiting-records-detail.css";
angular.module('App').controller('VisitingRecordsDetailController', ['$http', '$scope', '$stateParams', 'domain', '$state', '$timeout', function ($http, $scope, $stateParams, domain, $state, $timeout) {

    $scope.getDetail = function (planId) {
        $http.get(`${domain.zh}/visitor/selVisitorByPlanId?planId=${planId}`).success(function (rs) {
            $scope.record = rs.data;
        }).error(function () {

        });
    }
   

    $scope.register = function (planId) {
        $http.get(`${domain.zh}/visitor/updateCheckintime?planId=${planId}`).success(function (data) {
            // alert(angular.toJson(data));
            $state.go('visiting-records');
        }).error();
    }

    $scope.showdialog = function () {
        $scope.dialogshow = true;
    }

    // $scope.showdialog();

    $scope.leave = function (planId) {
        alert(`${domain.zh}/visitor/updateCheckouttime?planId=${planId}`);
        $http.get(`${domain.zh}/visitor/updateCheckouttime?planId=${planId}`).success(function (data) {
            // alert(angular.toJson(data));
            $state.go('visiting-records');
        }).error();
    }

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
    console.log(window.location.href);
    // $timeout(function () {

    // }, 5000);
    

}]);