'use strict';

angular.module('IssueTrackingSystem.controllers.issue', [])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/issue/:id', {
            templateUrl: 'app/template/issue/issue-view.html',
            controller: 'Issue'
        });
    }])
    .controller('Issue', ['$scope', 'debug', 'issues', '$routeParams',
        function ($scope, debug, issues, $routeParams) {

            $scope.getAllIssues = function () {
                issues.getAllIssues('In Progress', 31, 10, 1)
                    .then(function (issues) {
                        //if debug mode is activated
                        debug ? console.log('All issues:', issues) : '';
                        $scope.issues = issues.data.Issues;
                    });
            };
            
            $scope.getIssueById = function () {
                issues.getIssuesById($routeParams.id)
                    .then(function (issue) {
                        //if debug mode is activated
                        debug ? console.log('Route params:', $routeParams) : '';
                        debug ? console.log('Issue:', issue) : '';
                        $scope.issue = issue.data;
                    });
            };

            $scope.getIssueByProjectId = function () {
                issues.getIssuesByProjectId($routeParams.id)
                    .then(function (issues) {
                        //if debug mode is activated
                        debug ? console.log('Route params:', $routeParams) : '';
                        debug ? console.log('Issues:', issues) : '';
                        $scope.issues = issues.data;
                    });
            };
        }]);