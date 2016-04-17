"use strict";
var IssueTrackingSystem = angular.module('IssueTrackingSystem', ['ngRoute', 'ngStorage']).constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/');

IssueTrackingSystem.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'app/template/home.html',
            controller: 'Main'
        }).when('/projects/add', {
            //TODO check for administrator
            templateUrl: 'app/template/project/project-add.html',
            controller: 'Project'
        }).otherwise({
            redirectTo: '/'
        });
}]);


IssueTrackingSystem.controller('Main', ['$scope', '$sessionStorage',
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