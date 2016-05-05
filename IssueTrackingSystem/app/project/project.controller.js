"use strict";
angular.module('IssueTrackingSystem.controllers.project', [])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/projects-all', {
                templateUrl: 'app/project/partials/projects-all.html',
                controller: 'Project'
            })
            .when('/projects/add', {
                templateUrl: 'app/project/partials/project-add.html',
                controller: 'Project'
            })
            .when('/projects/:id/edit', {
                templateUrl: 'app/project/partials/project-edit.html',
                controller: 'Project'
            })
            .when('/projects/:id', {
                templateUrl: 'app/project/partials/project-view.html',
                controller: 'Project'
            })
            .when('/projects', {
                templateUrl: 'app/project/partials/projects.html',
                controller: 'Project'
            });
    }])
    .controller('Project', ['$scope', 'debug', 'projects', 'users', '$routeParams', '$location', '$sessionStorage',
        function ($scope, debug, projects, users, $routeParams, $location, $sessionStorage) {

            $scope.prioritiesAll = [];
            //completed
            $scope.getAllUsers = function () {
                users.getAllUsers()
                    .then(function (users) {
                        //if debug mode is activated
                        debug ? console.log('All users:', users) : '';
                        $scope.allUsers = users.data;
                    });
            };

            //completed
            function objectComplete(project, string) {
                var projectCompleteObject, nameSplit;

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

                if (string === 'add') {
                    nameSplit = project.name.split(/\s+/g);
                    projectCompleteObject.ProjectKey = '';
                    nameSplit.forEach(function (word) {
                        projectCompleteObject.ProjectKey += word.charAt(0).toUpperCase();
                    });
                }
                return projectCompleteObject;
            }

            //completed
            $scope.addProject = function addProject(project) {
                users.getCurrentUser()
                    .then(function (currentUser) {
                        //if debug mode is activated
                        debug ? console.log('Current user:', currentUser) : '';
                        // if (!currentUser.isAdmin) {
                        //     console.error('Only admin can add project.');  //TODO Notification error
                        //     return;
                        // }

                        var completeObject = objectComplete(project, 'add');

                        projects.addProject(completeObject)
                            .then(function (success) {
                                //if debug mode is activated
                                debug ? console.log('Success add Project:', success) : '';  //TODO Notification success
                                $location.path('/projects/' + success.data.Id);
                            }, function (error) {
                                console.error(error);
                            });
                    }, function (error) {
                        console.error(error);
                    });
            };

            //completed
            $scope.editProject = function editProject(project) {
                users.getCurrentUser()
                    .then(function (currentUser) {
                        //if debug mode is activated
                        debug ? console.log('Current user:', currentUser) : '';
                        // if (!currentUser.isAdmin) {
                        //     console.error('Only admin can add project.');  //TODO Notification error
                        //     return;
                        // }

                        var completeObject = objectComplete(project, 'edit');
                        console.log(completeObject);

                        projects.editProjectById($scope.project.Id, completeObject)
                            .then(function (success) {
                                //if debug mode is activated
                                debug ? console.log('Success edit Project:', success) : '';  //TODO Notification success
                                $location.path('/projects/' + success.data.Id);
                            }, function (error) {
                                console.error(error);
                            });
                    }, function (error) {
                        console.error(error);
                    });
            };

            //remove duplicate
            function uniqBy(a, key) {
                var seen = {};
                return a.filter(function (item) {
                    var k = key(item);
                    return seen.hasOwnProperty(k) ? false : (seen[k] = true);
                });
            }

            //completed
            $scope.getAllProjects = function getAllProjects() {
                projects.getAllProjects()
                    .then(function (projects) {
                        //if debug mode is activated
                        debug ? console.log('All projects:', projects) : '';
                        $scope.projects = projects.data;
                        $scope.projects.forEach(function (project) {
                            project.Priorities.forEach(function (prioroty) {
                                $scope.prioritiesAll.push(prioroty);
                            });
                        });
                        $scope.prioritiesAll = uniqBy($scope.prioritiesAll, JSON.stringify);
                    });
            };

            //completed
            $scope.getMyProjects = function getMyProjects() {
                projects.getProjectByFilter(10, 1, 'Lead.Id', $sessionStorage.Id)
                    .then(function (projects) {
                        //if debug mode is activated
                        debug ? console.log('My projects:', projects) : '';
                        $scope.myProjects = projects.data;
                    });
            };

            //for add issue page - completed
            function getLabels() {
                var index;
                $scope.labels = '';
                for (index in $scope.project.Labels) {
                    $scope.labels += $scope.project.Labels[index].Name + ',';
                }
                $scope.labels = $scope.labels.replace(/,(\s+)?$/, '');
            }

            //for edit page - completed
            function getPriorities() {
                var i;
                $scope.priorities = '';
                for (i in $scope.project.Priorities) {
                    $scope.priorities += $scope.project.Priorities[i].Name + ',';
                }
                $scope.priorities = $scope.priorities.replace(/,(\s+)?$/, '');
            }

            //completed
            $scope.getProjectById = function getProjectById() {
                projects.getProjectById($routeParams.id)
                    .then(function (project) {
                        //if debug mode is activated
                        debug ? console.log('Route params:', $routeParams) : '';
                        debug ? console.log('Project:', project) : '';
                        $scope.project = project.data;
                        getLabels();
                        getPriorities();
                    });
            };
        }]);