'use strict';

angular.module('IssueTrackingSystem.controllers.label', [])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/labels', {
                templateUrl: 'app/labels/partials/labels.html',
                controller: 'Label'
            })
            .when('/labels/?filters=:filter', {
                templateUrl: 'app/labels/partials/labels.html',
                controller: 'Label'
            });
    }])
    .controller('Label', ['$scope', 'debug', '$routeParams', 'labels',
        function ($scope, debug, $routeParams, labels) {

            //completed
            $scope.getLabelsWithFilter = function getLabelsWithFilter() {
                if ($routeParams.filters === undefined) {
                    $routeParams.filters = '';
                }

                labels.getLabelsWithFilter($routeParams.filters)
                    .then(function (filteredLabels) {
                        //if debug mode is activated
                        debug ? console.log('All filtered Labels:', filteredLabels) : '';
                        $scope.labelsFiltered = filteredLabels.data;
                    });
            };

        }]);