'use strict';

angular.module('IssueTrackingSystem', [
    'ngRoute', 'ngStorage', 'angular-loading-bar',
    'IssueTrackingSystem.controllers.main',
    'IssueTrackingSystem.controllers.project',
    'IssueTrackingSystem.controllers.user',
    'IssueTrackingSystem.controllers.issue',
    'IssueTrackingSystem.services.projects',
    'IssueTrackingSystem.services.authentication',
    'IssueTrackingSystem.services.issues',
    'IssueTrackingSystem.services.users',
    'IssueTrackingSystem.directives.notification'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({
            redirectTo: '/'
        });
    }])
    .constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/');