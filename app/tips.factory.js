angular.module('App').factory('tipsFactroy', ['$window', '$rootScope', '$timeout', function (win, $rootScope, $timeout) {
    let tipsFactroy = { isshow: false };
    tipsFactroy.show = function (message, type, time) {
        if (!message || !type || !time) return;
        tipsFactroy.isshow = true;
        tipsFactroy.message = message;
        tipsFactroy.type = type;
        $timeout(function (){
            tipsFactroy.isshow = false;
        }, time)
    };
    return tipsFactroy;
}]);

