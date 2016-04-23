'use strict';

angular.module('IssueTrackingSystem.controllers.issue', [])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/issue-view/:id', {
            templateUrl: 'app/template/issue/issue-view.html',
            controller: 'Issue'
        });
    }])
    .controller('Issue', ['$scope', 'debug', 'issues', '$routeParams',
        function ($scope, debug, issues, $routeParams) {

            $scope.getAllIssues = function () {
                issues.getAllIssues('In Progress', 31, 1000, 1)
                    .then(function (issues) {
                        //if debug mode is activated
                        debug ? console.log('All issues:', issues) : '';
                        $scope.issues = issues.data.Issues;
                    });
            };
            
            $scope.getIssueById = function () {
                console.log($routeParams);
                issues.getIssuesById($routeParams.id)
                    .then(function (issue) {
                        //if debug mode is activated
                        debug ? console.log('All issues:', issue) : '';
                        $scope.issue = issue.data;
                    });
            };
        }]);