"use strict";

angular.module('IssueTrackingSystem.services.issues', [])
    .factory('issues', ['$http', '$q', 'BASE_URL', 'header',
        function ($http, $q, BASE_URL, header) {

            //completed
            function getAllIssues(filter, pageSize, pageNumber) {
                var deferred, urlQuery;
                deferred = $q.defer();
                urlQuery = BASE_URL + 'issues/?filter=' + filter;
                if (pageSize) {
                    urlQuery += '&pageSize=' + pageSize;
                }

                if (pageNumber) {
                    urlQuery += '&pageNumber=' + pageNumber;
                }

                $http({
                    method: 'get',
                    url: urlQuery,
                    headers: header.authenticationHeader()
                }).then(function (success) {
                    deferred.resolve(success);
                }).then(function (error) {
                    deferred.reject(error);
                });

                return deferred.promise;
            }

            //completed
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

            //completed
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

            //completed
            function getIssuesByProjectId(id) {
                var deferred = $q.defer();

                $http({
                    method: 'get',
                    url: BASE_URL + 'projects/' + id + '/issues',
                    headers : header.authenticationHeader()
                }).then(function (succes) {
                    deferred.resolve(succes);
                }, function (error) {
                    deferred.reject(error);
                });

                return deferred.promise;
            }

            //completed
            function getMyIssues(pageSize, pageNumber) {
                var deferred = $q.defer();

                $http({
                    method: 'get',
                    url: BASE_URL + 'issues/me?orderBy=DueDate,IssueKey&pageSize=' +
                    pageSize + '&pageNumber=' + pageNumber,
                    headers : header.authenticationHeader()
                }).then(function (succes) {
                    deferred.resolve(succes);
                }, function (error) {
                    deferred.reject(error);
                });

                return deferred.promise;
            }

            //completed
            function addIssue(issue) {
                var deferred = $q.defer();

                $http({
                    method : 'post',
                    url : BASE_URL + 'issues',
                    data : issue,
                    headers : header.authenticationHeader()
                }).then(function (success) {
                    deferred.resolve(success);
                }, function (error) {
                    deferred.reject(error);
                });

                return deferred.promise;
            }

            //completed
            function editIssueById(id, issue) {
                var deferred = $q.defer();

                $http({
                    method : 'put',
                    url : BASE_URL + 'issues/' + id,
                    data : issue,
                    headers : header.authenticationHeader()
                }).then(function (success) {
                    deferred.resolve(success);
                }, function (error) {
                    deferred.reject(error);
                });

                return deferred.promise;
            }

            //completed
            function editIssueStatus(id, statusId) {
                var deferred = $q.defer();

                $http({
                    method : 'put',
                    url : BASE_URL + 'issues/' + id + '/changestatus?statusid=' + statusId,
                    data : null,
                    headers : header.authenticationHeader()
                }).then(function (success) {
                    deferred.resolve(success);
                }, function (error) {
                    deferred.reject(error);
                });

                return deferred.promise;
            }

            //completed
            function getAllIssueComments(id) {
                var deferred = $q.defer();

                $http({
                    method : 'get',
                    url : BASE_URL + 'issues/' + id + '/comments',
                    headers : header.authenticationHeader()
                }).then(function (success) {
                    deferred.resolve(success);
                }, function (error) {
                    deferred.reject(error);
                });

                return deferred.promise;
            }

            //completed
            function addCommentToIssue(id, comment) {
                var deferred = $q.defer();

                $http({
                    method : 'post',
                    url : BASE_URL + 'issues/' + id + '/comments',
                    data : comment,
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
                getIssuesByProjectId : getIssuesByProjectId,
                getMyIssues : getMyIssues,
                addIssue : addIssue,
                editIssueById : editIssueById,
                editIssueStatus : editIssueStatus,
                getAllIssueComments : getAllIssueComments,
                addCommentToIssue : addCommentToIssue
            };

        }]);