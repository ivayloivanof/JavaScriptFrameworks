"use strict";

angular.module('IssueTrackingSystem.services.issues', [])
    .factory('issues', ['$http', '$q', 'BASE_URL', 'header',
        function ($http, $q, BASE_URL, header) {

            function getAllIssues(status, dueDate, pageSize, pageNumber) {
                var deferred = $q.defer();

                $http({
                    method: 'get',
                    url: BASE_URL + 'issues/?filter=Status.Name == ' + status
                                    + ' or DueDate.Day <= ' + dueDate
                                    + '&pageSize=' + pageSize
                                    + '&pageNumber=' + pageNumber,
                    headers: header.authenticationHeader()
                }).then(function (success) {
                    deferred.resolve(success);
                }).then(function (error) {
                    deferred.reject(error);
                });

                return deferred.promise;
            }

            function getActiveUserIssues(pageSize, pageNumber, orderBy) {
                var deferred = $q.defer();
                $http({
                    method : 'get',
                    url : BASE_URL + 'issues/me?pageSize=' + pageSize
                                    + '&pageNumber=' + pageNumber
                                    + '&orderBy=' + orderBy,
                    headers : header.authenticationHeader()
                }).then(function (succes) {
                    deferred.resolve(succes);
                }, function (error) {
                    deferred.reject(error);
                });

                return deferred.promise;
            }

            function getIssuesById(id) {
                var deferred = $q.defer();

                $http({
                    method: 'get',
                    url: BASE_URL + 'issues/' + id,
                    headers : header.authenticationHeader()
                }).then(function (succes) {
                    deferred.resolve(succes);
                }, function (error) {
                    deferred.reject(error);
                });

                return deferred.promise;
            }

            function addIssue(issue) {
                var deferred = $q.defer();
                $http({
                    method : 'post',
                    url : BASE_URL + 'issues/',
                    data : issue,
                    headers : header.authenticationHeader()
                }).then(function (success) {
                    deferred.resolve(success);
                }, function (error) {
                    deferred.reject(error);
                });

                return deferred.promise;
            }

            return {
                getAllIssues : getAllIssues,
                getActiveUserIssues : getActiveUserIssues,
                getIssuesById : getIssuesById,
                addIssue : addIssue
            };

        }]);