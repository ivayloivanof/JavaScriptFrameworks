'use strict';

angular.module('IssueTrackingSystem.controllers.label', [])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/labels', {
                templateUrl: 'app/labels/partials/labels.html',
                controller: 'Label'
            });
    }])
    .controller('Label', ['$scope', 'debug', 'labels',
        function ($scope, debug, labels) {

            //completed
            $scope.getAllLabels = function getAllLabels() {
                labels.getAllLabels()
                    .then(function (labels) {
                        //if debug mode is activated
                        debug ? console.log('All labels:', labels) : '';
                        $scope.labels = labels.data;
                    });
            };

            //completed
            $scope.getLabelsWithFilter = function getLabelsWithFilter(filter) {
                labels.getLabelsWithFilter(filter)
                    .then(function (filteredLabels) {
                        //if debug mode is activated
                        debug ? console.log('All filtered Labels:', filteredLabels) : '';
                        $scope.labelsFiltered = filteredLabels.data;
                    });
            };

        }]);