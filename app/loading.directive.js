angular.module('App').directive('ngSpinnerBar', ['$rootScope', '$state','loadingFactory',
    function($rootScope, $state,loadingFactory) {
        return {
            link: function(scope, element, attrs) {
                loadingFactory.loading = element;
                element.removeClass('show');
                // $rootScope.$on('$stateChangeStart', function() {
                //     element.addClass('show'); // show spinner bar
                // });

                // // hide the spinner bar on rounte change success(after the content loaded)
                // $rootScope.$on('$stateChangeSuccess', function() {
                //     element.removeClass('show'); // hide spinner bar
                // });

                // // handle errors
                // $rootScope.$on('$stateNotFound', function() {
                //     element.removeClass('show'); // hide spinner bar
                // });

                // // handle errors
                // $rootScope.$on('$stateChangeError', function() {
                //     element.removeClass('show'); // hide spinner bar
                // });
            }
        };
    }
])