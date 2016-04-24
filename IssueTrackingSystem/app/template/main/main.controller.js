'use strict';

angular.module('IssueTrackingSystem.controllers.main', [])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'app/template/home.html',
            controller: 'Main'
        });
    }])
    .controller('Main', ['$scope', '$sessionStorage',
        function ($scope, $sessionStorage) {
            //if not authenticated
            if ($sessionStorage.isAuthenticated === 'undefinded') {
                $sessionStorage.isAuthenticated = false;
                $scope.isAuthenticated = $sessionStorage.isAuthenticated;
            } else {
                $scope.isAuthenticated = $sessionStorage.isAuthenticated;
            }
        }]);