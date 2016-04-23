"use strict";
angular.module('IssueTrackingSystem.controllers.project', [])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/project/:id', {
            templateUrl: 'app/template/project/project-view.html',
            controller: 'Project'
        });
    }])
    .controller('Project', ['$scope', 'debug', 'projects', 'users', '$routeParams',
        function ($scope, debug, projects, users, $routeParams) {

            $scope.getAllUsers = function () {
                users.getAllUsers()
                    .then(function (users) {
                        $scope.allUsers = users.data;
                    });
            };

            $scope.addProject = function (project, admin) {
                console.log(project);
                //TODO upload project
            };

            $scope.getAllProjects = function () {
                projects.getAllProjects()
                    .then(function (projects) {
                        $scope.projects = projects.data;
                    });
            };

            $scope.getProjectById = function () {
                projects.getProjectById($routeParams.id)
                    .then(function (project) {
                        //if debug mode is activated
                        debug ? console.log('Route params:', $routeParams) : '';
                        debug ? console.log('Project:', project) : '';
                        $scope.project = project.data;
                    });
            };
        }]);