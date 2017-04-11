// import yun from 'yun-ui';
// import 'yun-ui/dist/yun/index.css';
import XuntongJSBridge from "XuntongJSBridge";

var App = angular.module('App', ['ui.router', 'moment-picker','ngAnimate']);

angular.module("App").config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, $httpProvider) {
    // Redirect any unmatched url
    $httpProvider.interceptors.push('myHttpInterceptor');
    $urlRouterProvider.otherwise("/dashboard");
    $stateProvider
        .state('dashboard', {
            url: "/dashboard?ticket",
            templateUrl: "dashboard.html",
            data: { pageTitle: '访客管理-ZHJD' },
            controller: "DashboardController"
        })

        .state('visitor-apply', {
            url: "/visitor-apply",
            templateUrl: "visitor-apply.html",
            data: { pageTitle: '访客申请-ZHJD' },
            controller: "VisitorApplyController"
        })
        .state('visiting-records', {
            url: "/visiting-records",
            templateUrl: "visiting-records.html",
            data: { pageTitle: '来访记录-ZHJD' },
            controller: "VisitingRecordsController"
        })
        .state('visiting-records-detail', {
            url: "/visiting-records/:planId?type",
            templateUrl: "visiting-records-detail.html",
            data: { pageTitle: '来访记录-ZHJD' },
            controller: "VisitingRecordsDetailController"
        })
        .state('code-log', {
            url: "/code-log",
            templateUrl: "code-log.html",
            data: { pageTitle: '手动登记-ZHJD' },
            controller: "CodeLogController"
        })
}]);


angular.module("App").run(['$rootScope', '$window', '$state', '$timeout', '$stateParams', function ($rootScope, $window, $state, $timeout, $stateParams) {
    $rootScope.$stateParams = $stateParams;
    $rootScope.goBack = function () {
        $window.history.back();
    }
    XuntongJSBridge.call('getPersonInfo', {}, function (result) {
        // alert(angular.toJson(result));
        $rootScope.currentUser = result.data;

    });

    // XuntongJSBridge.call('openInBrowser',
    //                     { 'url': "http://www.baidu.com" }, //自定义链接
    //                     function (result) {
    //                         alert(angular.toJson(result));
    //                     }
    //                 );

    $rootScope.$on('$stateChangeSuccess',
        function (event, toState, toParams, fromState, fromParams) {
            // do something
            $timeout(function () {
                XuntongJSBridge.call('setWebViewTitle', { 'title': $state.current.data.pageTitle });
            });

        });
        
    // XuntongJSBridge.call('hideWebViewTitle');//隐藏页面标题
    // XuntongJSBridge.call('hideOptionMenu');
    // XuntongJSBridge.call('defback',
    //     {},
    //     function () {
    //         //   alert('点击了返回按钮');
    //         if (history.length <= 1) { //顶级页面，则关闭当前Web
    //             XuntongJSBridge.call('closeWebView');
    //         } else {
    //             $window.history.back();
    //         }
    //     }
    // );
    // XuntongJSBridge.call('createPop',
    //     {
    //         'popTitle': '提交',
    //         'popTitleCallBackId': '123',
    //         'items': [
    //             // { 'text': '自定义条目1', 'callBackId': 'callback1' },
    //             // { 'text': '自定义条目2', 'callBackId': 'callback2' },
    //         ],
    //         // 'menuList': ['forward', 'refresh', 'share', 'openWithBrowser'],
    //         // 'shareData': {
    //         //     'isShowExt': '转发时是否显示商务伙伴，true or false，默认为true',
    //         //     'title': '分享或者转发的标题',
    //         //     'url': '分享的链接，若空则取当前的url',
    //         //     'description': '分享或者转发的内容',
    //         //     'appLogo': '轻应用Logo，base64数据',
    //         //     'appName': '轻应用名称'
    //         // }
    //     },
    //     function (result) {
    //         if (result.success == true || result.success == 'true') {
    //             var callBackId = result.data ? result.data.callBackId : '';
    //             if (callBackId == 'callback1') {
    //                 callback1();
    //             }
    //         }
    //     }
    // );

    // function callback1() {
    //     alert('callback1')
    // }
    
}]);
