'use strict';

angular.module('IssueTrackingSystem', [
    'ngRoute', 'ngStorage', 'angular-loading-bar',
    'IssueTrackingSystem.services.header',
    'IssueTrackingSystem.services.projects',
    'IssueTrackingSystem.services.authentication',
    'IssueTrackingSystem.services.issues',
    'IssueTrackingSystem.services.users',
    'IssueTrackingSystem.services.error',
        'IssueTrackingSystem.services.labels',
    'IssueTrackingSystem.controllers.main',
    'IssueTrackingSystem.controllers.error',
    'IssueTrackingSystem.controllers.project',
    'IssueTrackingSystem.controllers.user',
    'IssueTrackingSystem.controllers.issue',
    'IssueTrackingSystem.controllers.issueChangeStatus',
        'IssueTrackingSystem.controllers.label',
    'IssueTrackingSystem.directives.date',
    'IssueTrackingSystem.directives.navbar',
    'IssueTrackingSystem.directives.notification'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({
            redirectTo: '/'
        });
    }])
    .constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/')
    .value('debug', true);