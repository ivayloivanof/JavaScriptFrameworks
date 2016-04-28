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

            function getProjectById(id) {
                var deferred = $q.defer();

                $http({
                    method : 'get',
                    url : BASE_URL + 'projects/' + id,
                    headers : header.authenticationHeader()
                }).then(function (success) {
                    deferred.resolve(success);
                }, function (error) {
                    deferred.reject(error);
                });

                return deferred.promise;
            }

            function addProject(project) {
                var deferred = $q.defer();

                $http({
                    method : 'post',
                    url : BASE_URL + 'projects/',
                    data : project,
                    headers : header.authenticationHeader()
                }).then(function (success) {
                    deferred.resolve(success);
                }, function (error) {
                    deferred.reject(error);
                });

                return deferred.promise;
            }

            function editProjectById(id, project) {
                var deferred = $q.defer();

                $http({
                    method : 'put',
                    url : BASE_URL + 'projects/' + id,
                    data : project,
                    headers : header.authenticationHeader()
                }).then(function (success) {
                    deferred.resolve(success);
                }, function (error) {
                    deferred.reject(error);
                });

                return deferred.promise;
            }

            function getProjectByFilter(pageSize, pageNumber, filter, value) {
                var deferred = $q.defer();

                $http({
                    method : 'get',
                    url : BASE_URL + 'projects/?' + 'pageSize=' +
                            pageSize + '&pageNumber=' +
                            pageNumber + '&filter=' +
                            filter + '=="' + value + '"',
                    headers : header.authenticationHeaderAndJSONContent()
                }).then(function (success) {
                    deferred.resolve(success);
                }, function (error) {
                    deferred.reject(error);
                });

                return deferred.promise;
            }

            return {
                getAllProjects : getAllProjects,
                getProjectById : getProjectById,
                addProject : addProject,
                editProjectById : editProjectById,
                getProjectByFilter : getProjectByFilter
            };
        }]);