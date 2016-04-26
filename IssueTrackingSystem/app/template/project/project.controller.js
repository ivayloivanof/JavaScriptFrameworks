"use strict";
angular.module('IssueTrackingSystem.controllers.project', [])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/projects/add-project', {
                templateUrl: 'app/template/project/project-add.html',
                controller: 'Project'
            })
            .when('/projects/:id/edit', {
                templateUrl: 'app/template/project/project-edit.html',
                controller: 'Project'
            })
            .when('/projects/:id', {
                templateUrl: 'app/template/project/project-view.html',
                controller: 'Project'
            })
            .when('/projects', {
                templateUrl: 'app/template/project/projects.html',
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

            $scope.addProject = function (project) {
                users.getCurrentUser()
                    .then(function (currentUser) {
                        var projectCompleteObject, nameSplit;
                        console.log(currentUser);
                        // if (!currentUser.isAdmin) {
                        //     console.error('Only admin can add project.');  //TODO Notification error
                        //     return;
                        // }

                        projectCompleteObject = {
                            Description: project.description,
                            Labels: [],
                            LeadId: project.leadId,
                            Name: project.name,
                            Priorities: []
                        };

                        project.labels = project.labels.split(',');
                        project.labels.forEach(function (label) {
                            projectCompleteObject.Labels.push({Name: label});
                        });

                        project.priorities = project.priorities.split(',');
                        project.priorities.forEach(function (priority) {
                            projectCompleteObject.Priorities.push({Name: priority});
                        });

                        nameSplit = project.name.split(/\s+/g);
                        projectCompleteObject.ProjectKey = '';
                        nameSplit.forEach(function (word) {
                            projectCompleteObject.ProjectKey += word.charAt(0).toUpperCase();
                        });

                        projects.addProject(projectCompleteObject)
                            .then(function (success) {
                                //if debug mode is activated
                                debug ? console.log('Success add Project:', success) : '';  //TODO Notification success
                            }, function (error) {
                                console.error(error);
                            });
                    }, function (error) {
                        console.error(error);
                    });
            };

            $scope.getAllProjects = function () {
                projects.getAllProjects()
                    .then(function (projects) {
                        //if debug mode is activated
                        debug ? console.log('All projects:', projects) : '';
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