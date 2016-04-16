(function () {
    "use strict";
    IssueTrackingSystem.factory('authentication', ['$http', '$q', 'BASE_URL', '$sessionStorage', function ($http, $q, BASE_URL, $sessionStorage) {

        function registerUser(user) {
            var deferred = $q.defer();

            $http.post(BASE_URL + 'Account/Register', user)
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        function loginUser(user) {
            var deferred = $q.defer();

            $http.post(BASE_URL + 'Account/Login', user)
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        function logout() {
            delete $sessionStorage.access_token;
            delete $sessionStorage.token_type;
            delete $sessionStorage.user;
            $sessionStorage.isAuthenticated = false;
        }

        return {
            registerUser: registerUser,
            loginUser: loginUser,
            logout: logout
        };
    }]);
}());

