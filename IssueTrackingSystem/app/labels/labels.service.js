"use strict";

angular.module('IssueTrackingSystem.services.labels', [])
    .factory('labels', ['$http', '$q', 'BASE_URL', 'header',
        function ($http, $q, BASE_URL, header) {

            //completed
            function getAllLabels() {
                var deferred = $q.defer();

                $http({
                    method: 'get',
                    url: BASE_URL + 'labels/?filter=',
                    headers: header.authenticationHeader()
                }).then(function (success) {
                    deferred.resolve(success);
                }).then(function (error) {
                    deferred.reject(error);
                });

                return deferred.promise;
            }

            //completed
            function getLabelsWithFilter(filter) {
                var deferred = $q.defer();

                $http({
                    method: 'get',
                    url: BASE_URL + 'labels/?filter=' + filter,
                    headers: header.authenticationHeader()
                }).then(function (success) {
                    deferred.resolve(success);
                }).then(function (error) {
                    deferred.reject(error);
                });

                return deferred.promise;
            }

            return {
                getAllLabels: getAllLabels,
                getLabelsWithFilter: getLabelsWithFilter
            };
        }]);