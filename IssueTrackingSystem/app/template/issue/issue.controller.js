'use strict';

angular.module('IssueTrackingSystem.controllers.issue', [])
    .controller('Issue', ['$scope', 'debug', 'issues',
        function ($scope, debug, issues) {

            $scope.getAllIssues = function () {
                issues.getAllIssues('In Progress', 31, 1000, 1)
                    .then(function (issues) {
                        //if debug mode is activated
                        debug ? console.log('All issues:', issues) : '';
                        $scope.issues = issues.data.Issues;
                    });
            };

            $scope.getAllIssues();
        }]);