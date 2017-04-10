import XuntongJSBridge from "XuntongJSBridge";
import "./visiting-records.css";
angular.module('App').controller('VisitingRecordsController', ['$http', '$scope', 'domain','$timeout', '$stateParams', function ($http, $scope, domain, $timeout, $stateParams) {
    $scope.scan = function () {
        console.log('click');
        XuntongJSBridge.call('scanQRCode', { 'needResult': 0, 'scanType': ['qrCode'] }, function (result) {
            // alert(angular.toJson(result));
        });
    }


    $scope.search = {
        handlingOpenid:$scope.currentUser.openId,
    };
    $scope.getList = function(planinTime){
        var params = {
            currentPage:1,
            pageSize:10
        };
        $http.get(`${domain.zh}/visitor/visitList`,{params:$scope.search}).success(function(data){
            console.dir(data);
            $scope.records = data;
        }).error(function(e){
            console.dir(e);
        });
    }
    // let uri=new URI(window.location);
    // let params = uri.search(true);
    // $http.get(`${domain.zh}/visitor/ceshi`, {params: params}).success(function (data) {
    //     alert(angular.toJson(data));
    // }).error(function () {
    //     alert('error');
    // });

    $scope.$watch('search.planinTimes',function(oldv,newv){
        $timeout(function(){
            $scope.getList($scope.search.planinTimes);
        },100);
        
    });

    // $scope.getList();
    //（0：未到访；1：已到访；2：已离开；3：已作废；）
    $scope.getType = function(type){
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