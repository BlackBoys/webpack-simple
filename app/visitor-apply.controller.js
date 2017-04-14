import XuntongJSBridge from "XuntongJSBridge";
import "./visitor-apply.css";
angular.module('App').controller('VisitorApplyController', ['$http', '$scope', '$state', 'domain', function ($http, $scope, $state, domain) {

    $scope.vistor = {
        visitorIdType: 'ID'
    };


    // XuntongJSBridge.call('selectPerson', { 'pType': '1' }, function (result) {

    //     alert(JSON.stringify(result));

    // });
    
    $scope.addVistor = function () {
        if(!$scope.currentUser)return;
        var serveData = angular.copy($scope.vistor);
        serveData.planinTimes = serveData.planinTimes.format('YYYY-MM-DD HH:mm:ss');
        serveData.planoutTimes = serveData.planoutTimes.format('YYYY-MM-DD HH:mm:ss');
        serveData.handlingOpenid = $scope.currentUser.openid;
        serveData.openid = $scope.currentUser.openid;
        $http.get(`${domain.zh}/visitor/addVisitor`, { params: serveData }).success(function () {
            $state.go('visiting-records');
        }).error(function () {

        });

    }
}]);