"use strict";

angular.module('IssueTrackingSystem.directives.navbar', [])
    .directive('navbarUsers', ['$sessionStorage', function navbarUsers($sessionStorage) {
        return {
            restrict: 'A',
            templateUrl: 'app/template/common/template/navbar.html',
            link: function (scope, element, attributes) {
                attributes.$observe('navbarUsers', function () {
                    //TODO show and hide after refresh - BUG
                    $(element).hide();
                    if ($sessionStorage.isAuthenticated) {
                        $(element).show();
                    }
                });
            }
        };
    }]);