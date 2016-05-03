'use strict';

angular.module('IssueTrackingSystem.controllers.error', [])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/error', {
            templateUrl: 'app/error/partials/error.html',
            controller: 'Error'
        });
    }])
    .controller('Error', ['$scope', '$sessionStorage',
        function ($scope, $sessionStorage) {
            //TODO
        }]);