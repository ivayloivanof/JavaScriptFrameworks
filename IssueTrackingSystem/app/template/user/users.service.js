'use strict';

angular.module('IssueTrackingSystem.services.users', [])
    .factory('users', ['$http', '$q', 'BASE_URL', '$sessionStorage',
        function ($http, $q, BASE_URL, $sessionStorage) {

            function getAllUsers() {
                var deferred = $q.defer();

                $http({
                    method: 'get',
                    url: BASE_URL + 'users',
                    headers: {
                        'Authorization': $sessionStorage.token_type + ' ' + $sessionStorage.access_token
                    }
                }).then(function (success) {
                    deferred.resolve(success);
                }).then(function (error) {
                    deferred.reject(error);
                });

                return deferred.promise;
            }

            return {
                getAllUsers : getAllUsers
            };
        }]);