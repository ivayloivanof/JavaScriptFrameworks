"use strict";

angular.module('IssueTrackingSystem.services.authentication', [])
    .factory('authentication', ['$http', '$q', 'BASE_URL', '$sessionStorage', 'header',
        function ($http, $q, BASE_URL, $sessionStorage, header) {

            function registerUser(user) {
                var deferred = $q.defer();
                var serialUser = 'email=' + user.email + '&password=' + user.password + '&confirmPassword=' + user.confirmPassword;
                $http({
                    method: 'post',
                    url: BASE_URL + 'api/Account/Register',
                    data: serialUser,
                    headers: header.getWWWContent()
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
                    headers: header.getWWWContent()
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