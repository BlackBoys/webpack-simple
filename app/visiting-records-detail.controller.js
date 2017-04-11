import XuntongJSBridge from "XuntongJSBridge";
import domtoimage from 'dom-to-image';
import "./visiting-records-detail.css";
import CryptoJS from "crypto-js";
angular.module('App').controller('VisitingRecordsDetailController', ['$http', '$scope', '$stateParams', 'domain', '$state', '$timeout', function ($http, $scope, $stateParams, domain, $state, $timeout) {
    $scope.getDetail = function (planId) {
        $http.get(`${domain.zh}/visitor/selVisitorByPlanId?planId=${planId}`).success(function (rs) {
            $scope.record = rs.data;
            imgFactory();
        }).error(function () {

        });
    }
    /* utf.js - UTF-8 <=> UTF-16 convertion
 *
 * Copyright (C) 1999 Masanao Izumo <iz@onicos.co.jp>
 * Version: 1.0
 * LastModified: Dec 25 1999
 * This library is free.  You can redistribute it and/or modify it.
 */

    /*
     * Interfaces:
     * utf8 = utf16to8(utf16);
     * utf16 = utf16to8(utf8);
     */

    function utf16to8(str) {
        var out, i, len, c;

        out = "";
        len = str.length;
        for (i = 0; i < len; i++) {
            c = str.charCodeAt(i);
            if ((c >= 0x0001) && (c <= 0x007F)) {
                out += str.charAt(i);
            } else if (c > 0x07FF) {
                out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
                out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
                out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
            } else {
                out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
                out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
            }
        }
        return out;
    }

    function utf8to16(str) {
        var out, i, len, c;
        var char2, char3;

        out = "";
        len = str.length;
        i = 0;
        while (i < len) {
            c = str.charCodeAt(i++);
            switch (c >> 4) {
                case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
                    // 0xxxxxxx
                    out += str.charAt(i - 1);
                    break;
                case 12: case 13:
                    // 110x xxxx   10xx xxxx
                    char2 = str.charCodeAt(i++);
                    out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
                    break;
                case 14:
                    // 1110 xxxx  10xx xxxx  10xx xxxx
                    char2 = str.charCodeAt(i++);
                    char3 = str.charCodeAt(i++);
                    out += String.fromCharCode(((c & 0x0F) << 12) |
                        ((char2 & 0x3F) << 6) |
                        ((char3 & 0x3F) << 0));
                    break;
            }
        }

        return out;
    }

    /*
 * Interfaces:
 * b64 = base64encode(data);
 * data = base64decode(b64);
 */
    var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
    var base64DecodeChars = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
        52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
        15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
        41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);

    function base64encode(str) {
        var out, i, len;
        var c1, c2, c3;
        len = str.length;
        i = 0;
        out = "";
        while (i < len) {
            c1 = str.charCodeAt(i++) & 0xff;
            if (i == len) {
                out += base64EncodeChars.charAt(c1 >> 2);
                out += base64EncodeChars.charAt((c1 & 0x3) << 4);
                out += "==";
                break;
            }
            c2 = str.charCodeAt(i++);
            if (i == len) {
                out += base64EncodeChars.charAt(c1 >> 2);
                out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
                out += base64EncodeChars.charAt((c2 & 0xF) << 2);
                out += "=";
                break;
            }
            c3 = str.charCodeAt(i++);
            out += base64EncodeChars.charAt(c1 >> 2);
            out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
            out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
            out += base64EncodeChars.charAt(c3 & 0x3F);
        }
        return out;
    }

    function base64decode(str) {
        var c1, c2, c3, c4;
        var i, len, out;
        len = str.length;
        i = 0;
        out = "";
        while (i < len) {
            /* c1 */
            do {
                c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
            } while (i < len && c1 == -1);
            if (c1 == -1) break;
            /* c2 */
            do {
                c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
            } while (i < len && c2 == -1);
            if (c2 == -1) break;
            out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));
            /* c3 */
            do {
                c3 = str.charCodeAt(i++) & 0xff;
                if (c3 == 61) return out;
                c3 = base64DecodeChars[c3];
            } while (i < len && c3 == -1);
            if (c3 == -1) break;
            out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));
            /* c4 */
            do {
                c4 = str.charCodeAt(i++) & 0xff;
                if (c4 == 61) return out;
                c4 = base64DecodeChars[c4];
            } while (i < len && c4 == -1);
            if (c4 == -1) break;
            out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
        }
        return out;
    }
    var safe64 = function (base64) {
        base64 = base64.replace(/\+/g, "-");
        base64 = base64.replace(/\//g, "_");
        return base64;
    };

    var genUpToken = function (accessKey, secretKey, putPolicy) {

        //SETP 2
        var put_policy = angular.toJson(putPolicy);
        console && console.log("put_policy = ", put_policy);

        //SETP 3
        var encoded = base64encode(utf16to8(put_policy));
        console && console.log("encoded = ", encoded);

        //SETP 4
        var hash = CryptoJS.HmacSHA1(encoded, secretKey);
        var encoded_signed = hash.toString(CryptoJS.enc.Base64);
        console && console.log("encoded_signed=", encoded_signed)

        //SETP 5
        var upload_token = accessKey + ":" + safe64(encoded_signed) + ":" + encoded;
        console && console.log("upload_token=", upload_token)
        return upload_token;
    };

    $scope.uploadFile = function (files) {
        var fd = new FormData();
        var uploadUrl = "http://up-z1.qiniu.com";
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
        var upload_token = genUpToken('0Q5EBq9LO_XDOw4Yl7sKlFtYbIE6CY5ezynByzGF', 'BifNlHBRUx9SwUZ8CocbUGaH8rPZ6ekJ46rZWQwl', putPolicy);

        //Take the first selected file
        var node = document.getElementsByTagName('html')[0];
        domtoimage.toBlob(node)
            .then(function (blob) {
                // window.saveAs(blob, 'my-node.png');
                fd.append("token", upload_token);
                fd.append("file", blob);
                return $http.post(uploadUrl, fd, {
                    withCredentials: true,
                    headers: { 'Content-Type': undefined },
                    transformRequest: angular.identity
                })
            }).then(function (rs) {
                alert('上传成功!');
            });

        // $http.post(uploadUrl, fd, {
        //     withCredentials: true,
        //     headers: { 'Content-Type': undefined },
        //     transformRequest: angular.identity
        // }).success().error();

    };

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

    // $timeout(function () {
    //     XuntongJSBridge.call('openInBrowser',
    //         { 'url': "http://www.baidu.com" }, //自定义链接
    //         function (result) { }
    //     );
    // }, 5000);

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
    console.log(window.location.href);
    // $timeout(function () {

    // }, 5000);
    // XuntongJSBridge.call('createPop', {
    //     'popTitle': '测试菜单',
    //     'popTitleCallBackId': '弹出菜单的ID',
    //     'items': [{
    //         'text': '测试1',
    //         'callBackId': 'test1ID'
    //     },
    //     {
    //         'text': '测试2',
    //         'callBackId': 'test2ID'
    //     }],
    //     'menuList': ['refresh', 'share', 'openWithBrowser']
    // }, function (result) {
    //     if (result.success == true || result.success == 'true') {
    //         var callBackId = result.data ? result.data.callBackId : '';
    //         if (callBackId == 'callback1') {
    //             callback1();
    //         }
    //     }
    // });

}]);