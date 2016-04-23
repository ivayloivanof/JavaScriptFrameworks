'use strict';

angular.module('IssueTrackingSystem.services.projects', [])
    .factory('projects', ['$http', '$q', 'BASE_URL', 'header',
        function ($http, $q, BASE_URL, header) {

            function getAllProjects() {
                var deferred = $q.defer();

                $http({
                    method: 'get',
                    url: BASE_URL + 'projects',
                    headers: header.authenticationHeader()
                }).then(function (success) {
                    deferred.resolve(success);
                }).then(function (error) {
                    deferred.reject(error);
                });

                return deferred.promise;
            }

            return {
                getAllProjects : getAllProjects
            };
        }]);