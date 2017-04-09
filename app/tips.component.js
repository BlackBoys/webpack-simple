import './tips.css';
angular.module('App').component('tips', {
    template: `<div ng-show="$ctrl.tipsFactroy.isshow" class="ui-poptips ui-poptips-warn">
        <div class="ui-poptips-cnt"><i></i>{{$ctrl.tipsFactroy.message}}</div>
        </div>`,
    controller: ['tipsFactroy',function (tipsFactroy) {
        this.tipsFactroy = tipsFactroy;
    }]
});