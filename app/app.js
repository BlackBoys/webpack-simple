// import yun from 'yun-ui';
// import 'yun-ui/dist/yun/index.css';
import XuntongJSBridge from "XuntongJSBridge";
import domtoimage from 'dom-to-image';
var App = angular.module('App', ['ui.router', 'moment-picker', 'ngAnimate']);

angular.module("App").config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, $httpProvider) {
    // Redirect any unmatched url
    $httpProvider.interceptors.push('myHttpInterceptor');
    $urlRouterProvider.otherwise("/dashboard");
    $stateProvider
        .state('site', {
            // url: "/site",
            abstract: true,
            template: '<div ui-view />',
            // templateUrl: "site/site.html",
            resolve: {
                authorize: ['authorization',
                    function (authorization) {
                        return authorization.authorize();
                    }
                ]
            }
        })
        .state('dashboard', {
            url: "/dashboard?ticket",
            parent: 'site',
            templateUrl: "dashboard.html",
            data: { pageTitle: '访客管理-ZHJD', roles: ['USER'] },
            controller: "DashboardController"
        })

        .state('visitor-apply', {
            url: "/visitor-apply",
            parent: 'site',
            templateUrl: "visitor-apply.html",
            data: { pageTitle: '访客申请-ZHJD', roles: ['USER'] },
            controller: "VisitorApplyController"
        })
        .state('visiting-records', {
            parent: 'site',
            url: "/visiting-records",
            templateUrl: "visiting-records.html",
            data: { pageTitle: '来访记录-ZHJD', roles: ['USER'] },
            controller: "VisitingRecordsController"
        })
        .state('visiting-records-detail', {
            parent: 'site',
            url: "/visiting-records/:planId?type",
            templateUrl: "visiting-records-detail.html",
            data: { pageTitle: '来访记录-ZHJD', roles: ['USER'] },
            controller: "VisitingRecordsDetailController"
        })
        .state('code-log', {
            parent: 'site',
            url: "/code-log",
            templateUrl: "code-log.html",
            data: { pageTitle: '手动登记-ZHJD', roles: ['USER'] },
            controller: "CodeLogController"
        })
}]);


angular.module("App").run(['$rootScope', '$window', '$state', '$timeout', '$stateParams', 'ImgFactory', 'domain', '$http', 'principal', 'authorization', function ($rootScope, $window, $state, $timeout, $stateParams, ImgFactory, domain, $http, principal, authorization) {
    $rootScope.$stateParams = $stateParams;
    $rootScope.goBack = function () {
        $window.history.back();
    }
    // XuntongJSBridge.call('getPersonInfo', {}, function (result) {
    //     // alert(angular.toJson(result));
    //     $rootScope.currentUser = result.data;

    // });
    $rootScope.$on('$stateChangeStart',
        function (event, toState, toStateParams) {
            // track the state the user wants to go to;
            // authorization service needs this
            $rootScope.toState = toState;
            $rootScope.toStateParams = toStateParams;
            //console.log(toState, toStateParams);
            // if the principal is resolved, do an
            // authorization check immediately. otherwise,
            // it'll be done when the state it resolved.
            if (principal.isIdentityResolved())
                authorization.authorize();
        });

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
    XuntongJSBridge.call('createPop',
        {
            'popTitle': '',
            'popTitleCallBackId': '123',
            'items': [
                { 'text': '保存为图片', 'callBackId': 'callback1' },
            ],
            'menuList': ['refresh'],
            // 'shareData': {
            //     'isShowExt': '转发时是否显示商务伙伴，true or false，默认为true',
            //     'title': '分享或者转发的标题',
            //     'url': '分享的链接，若空则取当前的url',
            //     'description': '分享或者转发的内容',
            //     'appLogo': '轻应用Logo，base64数据',
            //     'appName': '轻应用名称'
            // }
        },
        function (result) {
            if (result.success == true || result.success == 'true') {
                var callBackId = result.data ? result.data.callBackId : '';
                if (callBackId == 'callback1') {
                    var putPolicy = {
                        scope: 'cloudhub',
                        deadline: Date.now() + 3600 * 60,
                        returnBody: `{
                        "name": $(fname),
                        "size": $(fsize),
                        "w": $(imageInfo.width),
                        "h": $(imageInfo.height),
                        "hash": $(etag)
                        }`
                    };
                    var fd = new FormData();
                    var uploadUrl = "http://up-z1.qiniu.com";
                    var upload_token = ImgFactory.genUpToken('0Q5EBq9LO_XDOw4Yl7sKlFtYbIE6CY5ezynByzGF', 'BifNlHBRUx9SwUZ8CocbUGaH8rPZ6ekJ46rZWQwl', putPolicy);
                    var node;
                    if (document.getElementById('ui-container-form')) node = document.getElementById('ui-container-form');
                    else node = document.getElementsByTagName('html')[0];
                    domtoimage.toBlob(node)
                        .then(function (blob) {
                            fd.append("token", upload_token);
                            fd.append("file", blob);
                            return $http.post(domain.qiniuUpload, fd, {
                                // withCredentials: true,
                                headers: { 'Content-Type': undefined },
                                transformRequest: angular.identity
                            })
                        }).then(function (rs) {
                            alert(angular.toJson(rs.data));
                            XuntongJSBridge.call('previewImage',
                                {
                                    current: `${domain.qiniuDownload}/${rs.data.hash}`, // 当前显示图片的http链接
                                    urls: [`${domain.qiniuDownload}/${rs.data.hash}`] // 需要预览的图片http链接列表
                                }, function (result) {

                                }
                            );
                        });
                }
            }
        }
    );

}]);
