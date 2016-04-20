"use strict";

angular.module('IssueTrackingSystem.services.issues', [])
    .factory('issues', ['$http', '$q', 'BASE_URL', '$sessionStorage',
        function ($http, $q, BASE_URL, $sessionStorage) {

            function getAllIssues() {
                var deferred = $q.defer();

                $http({
                    method: 'get',
                    url: BASE_URL + 'issues/?filter=Status.Name == "In Progress" or DueDate.Day <= 31&pageSize=1000&pageNumber=1',
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
                getAllIssues : getAllIssues
            };

        }]);