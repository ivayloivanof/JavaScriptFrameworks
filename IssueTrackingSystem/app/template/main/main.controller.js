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
            if (!$sessionStorage.username || !$sessionStorage.isAuthenticated) {
                delete $sessionStorage.access_token;
                delete $sessionStorage.token_type;
                delete $sessionStorage.username;
                $sessionStorage.isAuthenticated = false;
                $scope.isAuthenticated = $sessionStorage.isAuthenticated;
            } else {
                $sessionStorage.isAuthenticated = true;
                $scope.isAuthenticated = $sessionStorage.isAuthenticated;
            }

            console.log($sessionStorage);   //TODO remove log session
        }]);