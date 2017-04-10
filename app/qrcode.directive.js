import QRCode from "./qrcode";
angular.module('App').directive('qrcode', ['$stateParams',function ($stateParams) {
    return {
        link: function (scope, element, attrs) {
            console.dir(scope);
            new QRCode(element[0], $stateParams.planId);
        }
    }
}]);