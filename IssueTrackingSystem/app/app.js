"use strict";
var IssueTrackingSystem = angular.module('IssueTrackingSystem', ['ngRoute', 'ngStorage']).constant('BASE_URL', 'http://softuni-social-network.azurewebsites.net/api/');

IssueTrackingSystem.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'app/template/home.html',
        controller: 'Main'
    }).when('/login', {
        templateUrl: 'app/template/user/login.html',
        controller: 'User'
    }).when('/signup', {
        templateUrl: 'app/template/user/signup.html',
        controller: 'User'
    }).otherwise({
        redirectTo: '/'
    });
}]);


IssueTrackingSystem.controller('Main', ['$scope', 'authentication', '$sessionStorage', '$location', function ($scope, authentication, $sessionStorage, $location) {
    //if not authenticated
    if (!$sessionStorage.user || !$sessionStorage.isAuthenticated) {
        delete $sessionStorage.access_token;
        delete $sessionStorage.token_type;
        delete $sessionStorage.user;
        $sessionStorage.isAuthenticated = false;
        $scope.isAuthenticated = $sessionStorage.isAuthenticated;
        $location.path('/login');
    } else {
        $sessionStorage.isAuthenticated = true;
        $scope.isAuthenticated = $sessionStorage.isAuthenticated;
        $scope.user = $sessionStorage.user;
    }


}]);