// import yun from 'yun-ui';
// import 'yun-ui/dist/yun/index.css';
import XuntongJSBridge from "XuntongJSBridge";
import domtoimage from 'dom-to-image';
import html2canvas from 'html2canvas';
var App = angular.module('App', ['ui.router', 'moment-picker', 'ngAnimate']);
/*
 * JavaScript Canvas to Blob
 * https://github.com/blueimp/JavaScript-Canvas-to-Blob
 *
 * Copyright 2012, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 *
 * Based on stackoverflow user Stoive's code snippet:
 * http://stackoverflow.com/q/4998908
 */

/* global atob, Blob, define */

; (function (window) {
    'use strict'

    var CanvasPrototype = window.HTMLCanvasElement &&
        window.HTMLCanvasElement.prototype
    var hasBlobConstructor = window.Blob && (function () {
        try {
            return Boolean(new Blob())
        } catch (e) {
            return false
        }
    }())
    var hasArrayBufferViewSupport = hasBlobConstructor && window.Uint8Array &&
        (function () {
            try {
                return new Blob([new Uint8Array(100)]).size === 100
            } catch (e) {
                return false
            }
        }())
    var BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder ||
        window.MozBlobBuilder || window.MSBlobBuilder
    var dataURIPattern = /^data:((.*?)(;charset=.*?)?)(;base64)?,/
    var dataURLtoBlob = (hasBlobConstructor || BlobBuilder) && window.atob &&
        window.ArrayBuffer && window.Uint8Array &&
        function (dataURI) {
            var matches,
                mediaType,
                isBase64,
                dataString,
                byteString,
                arrayBuffer,
                intArray,
                i,
                bb
            // Parse the dataURI components as per RFC 2397
            matches = dataURI.match(dataURIPattern)
            if (!matches) {
                throw new Error('invalid data URI')
            }
            // Default to text/plain;charset=US-ASCII
            mediaType = matches[2]
                ? matches[1]
                : 'text/plain' + (matches[3] || ';charset=US-ASCII')
            isBase64 = !!matches[4]
            dataString = dataURI.slice(matches[0].length)
            if (isBase64) {
                // Convert base64 to raw binary data held in a string:
                byteString = atob(dataString)
            } else {
                // Convert base64/URLEncoded data component to raw binary:
                byteString = decodeURIComponent(dataString)
            }
            // Write the bytes of the string to an ArrayBuffer:
            arrayBuffer = new ArrayBuffer(byteString.length)
            intArray = new Uint8Array(arrayBuffer)
            for (i = 0; i < byteString.length; i += 1) {
                intArray[i] = byteString.charCodeAt(i)
            }
            // Write the ArrayBuffer (or ArrayBufferView) to a blob:
            if (hasBlobConstructor) {
                return new Blob(
                    [hasArrayBufferViewSupport ? intArray : arrayBuffer],
                    { type: mediaType }
                )
            }
            bb = new BlobBuilder()
            bb.append(arrayBuffer)
            return bb.getBlob(mediaType)
        }
    if (window.HTMLCanvasElement && !CanvasPrototype.toBlob) {
        if (CanvasPrototype.mozGetAsFile) {
            CanvasPrototype.toBlob = function (callback, type, quality) {
                if (quality && CanvasPrototype.toDataURL && dataURLtoBlob) {
                    callback(dataURLtoBlob(this.toDataURL(type, quality)))
                } else {
                    callback(this.mozGetAsFile('blob', type))
                }
            }
        } else if (CanvasPrototype.toDataURL && dataURLtoBlob) {
            CanvasPrototype.toBlob = function (callback, type, quality) {
                callback(dataURLtoBlob(this.toDataURL(type, quality)))
            }
        }
    }
    if (typeof define === 'function' && define.amd) {
        define(function () {
            return dataURLtoBlob
        })
    } else if (typeof module === 'object' && module.exports) {
        module.exports = dataURLtoBlob
    } else {
        window.dataURLtoBlob = dataURLtoBlob
    }
}(window))
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
    html2canvas(document.body).then(function (canvas) {
        console.dir(canvas);
        canvas.toBlob(function (blob) {
            alert(blob);
        });
        // document.body.appendChild(canvas);
    });
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
                    alert(angular.toJson(node));
                    alert(angular.toJson(domtoimage));
                    html2canvas(document.body).then(function (canvas) {
                        console.dir(canvas);
                        canvas.toBlob(function (blob) {
                            alert(blob);
                            fd.append("token", upload_token);
                                    fd.append("file", blob);
                                    return $http.post(domain.qiniuUpload, fd, {
                                        // withCredentials: true,
                                        headers: { 'Content-Type': undefined },
                                        transformRequest: angular.identity
                                    })
                             });
                        // document.body.appendChild(canvas);
                    })

                    // domtoimage.toBlob(node)
                    //             .then(function (blob) {
                    //                 alert('已经到了生成数据的时候');
                    //                 fd.append("token", upload_token);
                    //                 fd.append("file", blob);
                    //                 return $http.post(domain.qiniuUpload, fd, {
                    //                     // withCredentials: true,
                    //                     headers: { 'Content-Type': undefined },
                    //                     transformRequest: angular.identity
                    //                 })
                    //             })
                                .then(function (rs) {
                                    alert(angular.toJson(rs.data));
                                    alert('上传文件成功');
                                    XuntongJSBridge.call('previewImage',
                                        {
                                            current: `${domain.qiniuDownload}/${rs.data.hash}`, // 当前显示图片的http链接
                                            urls: [`${domain.qiniuDownload}/${rs.data.hash}`] // 需要预览的图片http链接列表
                                        }, function (result) {

                                        }
                                    );
                                }).catch(function (e) {
                                    alert('失败！');
                                    alert(angular.toJson(e));
                                });
                       

                }
            }
        }
    );

}]);
