/**
 * Created by luoxiao on 10/17/16.
 */

angular.module('App').factory('principal', ['$q', '$http', '$timeout', 'domain', '$state', '$rootScope',
    function ($q, $http, $timeout, domain, $state, $rootScope) {
        var _identity = undefined,
            _authenticated = false;

        return {
            isIdentityResolved: function () {
                return angular.isDefined(_identity);
            },
            isAuthenticated: function () {
                return _authenticated;
            },
            isInRole: function (role) {
                if (!_authenticated || !_identity.roles) return false;

                return _identity.roles.indexOf(role) != -1;
            },
            isInAnyRole: function (roles) {
                if (!_authenticated || !_identity.roles) return false;

                for (var i = 0; i < roles.length; i++) {
                    if (this.isInRole(roles[i])) return true;
                }

                return false;
            },
            authenticate: function (identity) {
                _identity = identity;
                _authenticated = identity != null;

                // for this demo, we'll store the identity in localStorage. For you, it could be a cookie, sessionStorage, whatever
                if (identity) localStorage.setItem("demo.identity", angular.toJson(identity));
                else localStorage.removeItem("demo.identity");
            },
            identity: function (force) {
                var deferred = $q.defer();

                if (force === true) _identity = undefined;

                // check and see if we have retrieved the identity data from the server. if we have, reuse it by immediately resolving
                if (angular.isDefined(_identity)) {
                    deferred.resolve(_identity);

                    return deferred.promise;
                }
                var self = this;
                var uri = new URI(window.location);
                let params = {
                    grant_type: 'client_credential',
                    appid: '10108',
                    secret: 'zongheng',
                };
                $http.get(`${domain.zemt}/openauth2/api/token`, { params: params }).then(function (data) {
                    let paramsForUser = uri.search(true);
                    paramsForUser.access_token = data.data.access_token;
                    return $http.get(`${domain.zemt}/openauth2/api/getcontext`, { params: paramsForUser })
                })
                    .then(function (rs) {
                        // alert(angular.toJson(rs.data));
                        let _identity = rs.data;
                        _authenticated = true;
                        _identity.roles = ['USER'];
                        $rootScope.currentUser = _identity;
                        self.authenticate(_identity);
                        deferred.resolve(_identity);
                    })


                // $http.get(domain.userinfo + '/user?access_token=' + access_token, { ignoreErrors: true })
                //     .then(function (rs) {
                //         let data = rs.data;
                //         _authenticated = true;
                //         _identity = data.emp;
                //         _identity.roles = data.role.map(value => value.authority);
                //         $rootScope.user = _identity;
                //         self.authenticate(_identity);
                //         deferred.resolve(_identity);
                //         return $http.get(`/sidebar-admin.json`)
                //     })
                //     .then(function (rs) {
                //         $rootScope.menuList = rs.data;
                //         let myMenuList = [];
                //         $rootScope.user.roles.forEach(function (value) {
                //             let list = $rootScope.menuList[value];
                //             if (list && list.length > 0) myMenuList = myMenuList.concat(list);
                //         });
                //         bughd("user", $rootScope.user);
                //         $rootScope.user.menuList = myMenuList;
                //         // console.dir(myMenuList);
                //     })
                //     .catch(function () {
                //         _identity = null;
                //         _authenticated = false;
                //         self.authenticate(_identity);
                //         deferred.resolve(_identity);
                //         $state.go('login');
                //         // window.location.href = "/login.html";
                //     });


                // // for the sake of the demo, we'll attempt to read the identity from localStorage. the example above might be a way if you use cookies or need to retrieve the latest identity from an api
                // i put it in a timeout to illustrate deferred resolution
                //var self = this;
                //$timeout(function () {
                //    _identity = angular.fromJson(localStorage.getItem("demo.identity"));
                //    console.dir(_identity);
                //    self.authenticate(_identity);
                //    deferred.resolve(_identity);
                //}, 1000);

                return deferred.promise;
            }
        };
    }
])
