'use strict';

angular.module('IssueTrackingSystem.controllers.issue', [])
    .controller('Issue', ['$scope', 'debug', 'issues',
        function ($scope, debug, issues) {

            $scope.getAllIssues = function () {
                issues.getAllIssues()
                    .then(function (issues) {
                        //if debug mode is activated
                        debug ? console.log('All issues:', issues) : '';
                        $scope.issues = issues.data.Issues;
                    });
            };

            $scope.getAllIssues();
        }]);