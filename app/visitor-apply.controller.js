import XuntongJSBridge from "XuntongJSBridge";
import "./visitor-apply.css";
angular.module('App').controller('VisitorApplyController', ['$http', '$scope', '$state', 'domain', function ($http, $scope, $state, domain) {

    $scope.vistor = {
        visitorIdType: 'ID'
    };


    // XuntongJSBridge.call('selectPerson', { 'pType': '1' }, function (result) {

    //     alert(JSON.stringify(result));

    // });
    XuntongJSBridge.call('getPersonInfo', {}, function (result) {
        // alert('用户数据：' + JSON.stringify(result));
        $scope.currentUser = result.data;

    });
    $scope.addVistor = function () {
        if(!$scope.currentUser)return;
        var serveData = angular.copy($scope.vistor);
        serveData.planinTimes = serveData.planinTimes.format('YYYY-MM-DD HH:mm:ss');
        serveData.planoutTimes = serveData.planoutTimes.format('YYYY-MM-DD HH:mm:ss');
        serveData.handlingOpenid = $scope.currentUser.openId;
        serveData.openid = $scope.currentUser.openId;
        $http.get(`${domain.zh}/visitor/addVisitor`, { params: serveData }).success(function () {
            $state.go('visiting-records');
        }).error(function () {

        });

    }
}]);