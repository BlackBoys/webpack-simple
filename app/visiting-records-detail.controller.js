import XuntongJSBridge from "XuntongJSBridge";
import domtoimage from 'dom-to-image';
import "./visiting-records-detail.css";
angular.module('App').controller('VisitingRecordsDetailController', ['$http', '$scope', '$stateParams', 'domain', '$state', '$timeout', function ($http, $scope, $stateParams, domain, $state, $timeout) {

    $scope.getDetail = function (planId) {
        $http.get(`${domain.zh}/visitor/selVisitorByPlanId?planId=${planId}`).success(function (rs) {
            $scope.record = rs.data;
            imgFactory();
        }).error(function () {

        });
    }
   

    function imgFactory() {
        var node = document.getElementsByTagName('html')[0];



        // domtoimage.toBlob(node)
        //     .then(function (blob) {
        //         window.saveAs(blob, 'my-node.png');
        //     });

        // domtoimage.toPng(node)
        //     .then(function (dataUrl) {
        //         var img = new Image();
        //         img.src = dataUrl;
        //         console.log(`imgurl:${dataUrl}`);
        //         XuntongJSBridge.call('previewImage',
        //             {
        //                 current: 'http://www.easyicon.net/api/resizeApi.php?id=1177605&size=128', // 当前显示图片的http链接
        //                 urls: ['http://www.easyicon.net/api/resizeApi.php?id=1177605&size=128'] // 需要预览的图片http链接列表
        //             }, function (result) {

        //             }
        //         );
        //         // document.body.appendChild(img);
        //     })
        //     .catch(function (error) {
        //         console.error('oops, something went wrong!', error);
        //     });
    }

    $scope.register = function (planId) {
        $http.get(`${domain.zh}/visitor/updateCheckintime?planId=${planId}`).success(function () {
            $state.go('visiting-records');
        }).error();
    }

    $scope.showdialog = function () {
        $scope.dialogshow = true;
    }

    // $scope.showdialog();

    $scope.leave = function (planId) {
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
    console.log(window.location.href);
    // $timeout(function () {

    // }, 5000);
    

}]);