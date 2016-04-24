"use strict";
angular.module('IssueTrackingSystem.controllers.project', [])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/projects/:id', {
                templateUrl: 'app/template/project/project-view.html',
                controller: 'Project'
            });
    }])
    .controller('Project', ['$scope', 'debug', 'projects', 'users', '$routeParams',
        function ($scope, debug, projects, users, $routeParams) {

            $scope.getAllUsers = function () {
                users.getAllUsers()
                    .then(function (users) {
                        //if debug mode is activated
                        debug ? console.log('All users:', users) : '';
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
                        console.log(projects);
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
                        $scope.getLabels();
                    });
            };

            //for add issue page
            $scope.getLabels = function () {
                var index;
                $scope.labels = '';
                for (index in $scope.project.Labels) {
                    $scope.labels += $scope.project.Labels[index].Name + ',';
                }
                $scope.labels = $scope.labels.replace(/,(\s+)?$/, '');
            };
        }]);