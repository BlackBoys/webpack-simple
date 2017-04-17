/**
 * Created by luoxiao on 10/17/16.
 */

angular.module('App').factory('authorization', ['$rootScope', '$state', 'principal',
    function ($rootScope, $state, principal) {
        return {
            authorize: function () {
                return principal.identity()
                    .then(function () {
                        var isAuthenticated = principal.isAuthenticated();
                        if ($rootScope.toState.data && $rootScope.toState.data.roles && $rootScope.toState.data.roles.length > 0 && !principal.isInAnyRole($rootScope.toState.data.roles)) {
                            if (isAuthenticated) $state.go('accessdenied'); // user is signed in but not authorized for desired state
                            else {
                                // user is not authenticated. stow the state they wanted before you
                                // send them to the signin state, so you can return them when you're done
                                $rootScope.returnToState = $rootScope.toState;
                                $rootScope.returnToStateParams = $rootScope.toStateParams;
                                // $state.go('login');
                                // window.location.href = "./login.html";
                                //$rootScope.settings.isLogin = true;
                                // now, send them to the signin state so they can log in
                                //$state.go('signin');

                            }
                        }
                    });
            }
        };
    }
])
