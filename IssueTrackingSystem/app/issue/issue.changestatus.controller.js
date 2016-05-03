'use strict';

angular.module('IssueTrackingSystem.controllers.issueChangeStatus', [])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/issues/:id/:status', {
                templateUrl: 'app/issue/partials/issue-view.html',
                controller: 'IssueChangeStatus'
            });
    }])
    .controller('IssueChangeStatus', ['$scope', 'debug', 'issues', '$routeParams', '$location',
        function ($scope, debug, issues, $routeParams, $location) {

            function editIssueStatus() {
                var status = 0;
                if ($routeParams.status === "Open") {
                    status = 2;
                } else if ($routeParams.status === "InProgress") {
                    status = 3;
                } else if ($routeParams.status === "StoppedProgress") {
                    status = 4;
                } else if ($routeParams.status === "Closed") {
                    status = 1;
                }
                if (status > 0) {
                    issues.editIssueStatus($routeParams.id, status)
                        .then(function (success) {
                            //if debug mode is activated
                            debug ? console.log('Route params:', $routeParams) : '';
                            debug ? console.log('Edit issue status:', success) : '';
                            $location.path('issues/' + $routeParams.id);
                        });
                }
            }

            editIssueStatus();
        }]);