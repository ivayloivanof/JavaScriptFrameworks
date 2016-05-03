'use strict';

angular.module('IssueTrackingSystem.controllers.issue', [])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/issues', {
                templateUrl: 'app/issue/partials/issues.html',
                controller: 'Issue'
            })
            .when('/issues/:id', {
                templateUrl: 'app/issue/partials/issue-view.html',
                controller: 'Issue'
            })
            .when('/issues/:id/edit', {
                templateUrl: 'app/issue/partials/issue-edit.html',
                controller: 'Issue'
            })
            .when('/projects/:id/add-issue', {
                templateUrl: 'app/issue/partials/issue-add.html',
                controller: 'Issue'
            });
    }])
    .controller('Issue', ['$scope', 'debug', 'pageNumber', 'issues', '$routeParams', '$route', '$location',
        function ($scope, debug, pageNumber, issues, $routeParams, $route, $location) {

            $scope.page = pageNumber;
            //completed
            $scope.getAllIssues = function getAllIssues() {
                issues.getAllIssues('In Progress', 31, 1000, 1)
                    .then(function (issues) {
                        //if debug mode is activated
                        debug ? console.log('All issues:', issues) : '';
                        $scope.issues = issues.data.Issues;
                    });
            };

            //completed
            $scope.getIssueById = function getIssueById() {
                issues.getIssuesById($routeParams.id)
                    .then(function (issue) {
                        //if debug mode is activated
                        debug ? console.log('Route params:', $routeParams) : '';
                        debug ? console.log('Issue by Id:', issue) : '';
                        $scope.issue = issue.data;
                    });
            };

            //completed
            $scope.getIssueByProjectId = function getIssueByProjectId() {
                issues.getIssuesByProjectId($routeParams.id)
                    .then(function (issues) {
                        //if debug mode is activated
                        debug ? console.log('Route params:', $routeParams) : '';
                        debug ? console.log('Issues by Project Id:', issues) : '';
                        $scope.issues = issues.data;
                    });
            };

            //completed
            $scope.getAllCommentsByIssueId = function getAllCommentsByIssueId() {
                issues.getAllIssueComments($routeParams.id)
                    .then(function (comments) {
                        //if debug mode is activated
                        debug ? console.log('Route params:', $routeParams) : '';
                        debug ? console.log('All Comments:', comments) : '';
                        $scope.comments = comments.data;
                    });
            };

            //completed
            $scope.getMyIssues = function () {
                console.log(pageNumber);
                issues.getMyIssues(pageNumber)
                    .then(function (issues) {
                        //if debug mode is activated
                        debug ? console.log('All my issues:', issues) : '';
                        $scope.issues = issues.data.Issues;
                    });
            };

            $scope.nextPage = function nextPage(page) {
                console.log(page);
            };

            $scope.prevPage = function prevPage(page) {
                console.log(page);
            };

            //admin or lead - for other not working
            $scope.addIssue = function addIssue(issue) {

                // build issue object
                var issueCompleteObject = {
                    Title: issue.title,
                    Description: issue.description,
                    DueDate: issue.dueDate, //Todo date is problem - 29.04.2016 ever
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
                        //if debug mode is activated
                        debug ? console.log('Add issue success:', success) : '';
                        $location.path('/');
                    });
            };

            $scope.editIssue = function (issueEdit) {
                $scope.issueEdit;
                
                //TODO load data to issue edit page and complete edit logic
                console.log(issueEdit);
            };

            //completed
            $scope.addComment = function addComment(comment, currentUser) {

                var commentCompleteObject = {
                    Author : currentUser,
                    CreatedOn : new Date(),
                    Text : comment.text
                };

                issues.addCommentToIssue($routeParams.id, commentCompleteObject)
                    .then(function (success) {
                        //if debug mode is activated
                        debug ? console.log('Route params:', $routeParams) : '';
                        debug ? console.log('Add Comment success:', success) : '';
                        $route.reload();
                    });
            };
        }]);