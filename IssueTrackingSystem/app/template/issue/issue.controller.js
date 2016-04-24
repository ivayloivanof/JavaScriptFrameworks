'use strict';

angular.module('IssueTrackingSystem.controllers.issue', [])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/issues', {
                templateUrl: 'app/template/issue/issues.html',
                controller: 'Issue'
            })
            .when('/issues/:id', {
                templateUrl: 'app/template/issue/issue-view.html',
                controller: 'Issue'
            }).when('/projects/:id/add-issue', {
                templateUrl: 'app/template/issue/issue-add.html',
                controller: 'Issue'
            });
    }])
    .controller('Issue', ['$scope', 'debug', 'issues', '$routeParams',
        function ($scope, debug, issues, $routeParams) {

            $scope.getAllIssues = function getAllIssues() {
                issues.getAllIssues('In Progress', 31, 1000, 1)
                    .then(function (issues) {
                        //if debug mode is activated
                        debug ? console.log('All issues:', issues) : '';
                        $scope.issues = issues.data.Issues;
                    });
            };
            
            $scope.getIssueById = function getIssueById() {
                issues.getIssuesById($routeParams.id)
                    .then(function (issue) {
                        //if debug mode is activated
                        debug ? console.log('Route params:', $routeParams) : '';
                        debug ? console.log('Issue:', issue) : '';
                        $scope.issue = issue.data;
                    });
            };

            $scope.getIssueByProjectId = function getIssueByProjectId() {
                issues.getIssuesByProjectId($routeParams.id)
                    .then(function (issues) {
                        //if debug mode is activated
                        debug ? console.log('Route params:', $routeParams) : '';
                        debug ? console.log('Issues:', issues) : '';
                        $scope.issues = issues.data;
                    });
            };

            //admin or lead - for other not working
            $scope.addIssue = function addIssue(issue) {

                // build issue object
                var issueCompleteObject = {
                    Title: issue.title,
                    Description: issue.description,
                    DueDate: issue.dueDate,
                    ProjectId: issue.projectId,
                    AssigneeId: issue.assigneeId,
                    PriorityId: issue.priorityId,
                    Labels: []
                };
                issue.labels = issue.labels.split(',');
                issue.labels.forEach(function (label) {
                    issueCompleteObject.Labels.push({Name: label.trim()});
                });

                issues.addIssue(issueCompleteObject)
                    .then(function (success) {
                        console.log(success);
                    });
            };
        }]);