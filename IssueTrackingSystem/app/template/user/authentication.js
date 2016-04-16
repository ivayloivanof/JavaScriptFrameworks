(function () {
    "use strict";
    IssueTrackingSystem.factory('authentication', ['$http', '$q', 'BASE_URL', '$sessionStorage',
        function ($http, $q, BASE_URL, $sessionStorage) {

            function registerUser(user) {
                var deferred = $q.defer();
                var serialUser = 'email=' + user.email + '&password=' + user.password + '&confirmPassword=' + user.confirmPassword;
                $http({
                    method: 'post',
                    url: BASE_URL + 'api/Account/Register',
                    data: serialUser,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(function (success) {
                    deferred.resolve(success);
                }).then(function (error) {
                    deferred.reject(error);
                });
                return deferred.promise;
            }
            function loginUser(user) {
                var deferred = $q.defer();
                user.grant_type = 'password';
                var serializedUser = 'grant_type=password&username=' + user.username + '&password=' + user.password;
                $http({
                    method: 'post',
                    url: BASE_URL + 'api/Token',
                    data: serializedUser,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(function (success) {
                    deferred.resolve(success);
                }).then(function (error) {
                    deferred.reject(error);
                });
                return deferred.promise;
            }
            function logout() {
                delete $sessionStorage.access_token;
                delete $sessionStorage.token_type;
                delete $sessionStorage.username;
                $sessionStorage.isAuthenticated = false;
            }
            return {
                registerUser: registerUser,
                loginUser: loginUser,
                logout: logout
            };
        }]);
}());

