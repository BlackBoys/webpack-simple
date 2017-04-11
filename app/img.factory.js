import CryptoJS from "crypto-js";
import { utf16to8, utf8to16 } from "./utf";
import { base64encode, base64decode, safe64 } from "./base64";
import domtoimage from 'dom-to-image';
angular.module('App').factory('ImgFactory', ['$state', function ($state) {
    var ImgFactory = {};
    ImgFactory.genUpToken = function (accessKey, secretKey, putPolicy) {

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

    ImgFactory.uploadFile = function (upload_token) {
        var fd = new FormData();
        var uploadUrl = "http://up-z1.qiniu.com";
        // var putPolicy = {
        //     scope: 'cloudhub',
        //     deadline: Date.now() + 3600 * 60,
        //     returnBody: `{
        //     "name": $(fname),
        //     "size": $(fsize),
        //     "w": $(imageInfo.width),
        //     "h": $(imageInfo.height),
        //     "hash": $(etag)
        //     }`
        // };
        // var upload_token = ImgFactory.genUpToken('0Q5EBq9LO_XDOw4Yl7sKlFtYbIE6CY5ezynByzGF', 'BifNlHBRUx9SwUZ8CocbUGaH8rPZ6ekJ46rZWQwl', putPolicy);

        //Take the first selected file
        

    };
    return ImgFactory;
}]);