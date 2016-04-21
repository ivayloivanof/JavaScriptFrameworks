'use strict';

angular.module('IssueTrackingSystem.directives.notification', [])
    .directive('notificationSuccess', ['$timeout', '$sessionStorage', function ($timeout, $sessionStorage) {
        return {
            restrict: 'A',
            controller: ['$scope', function ($scope) {
                $scope.notification = {
                    status: 'hide',
                    type: 'success',
                    message: 'Welcome! ' + $sessionStorage.username
                };
            }],
            link: function succesLogin(scope, elem, attrs) {
                attrs.$observe('notificationSuccess', function () {
                    if ($sessionStorage.isAuthenticated === true) {
                        $(elem).show();
                        $timeout(function () {
                            $(elem).hide();
                            scope.notification.status = 'hide';
                        }, 4000);
                    }
                });
            }
        };
    }])
    .directive('notificationError', ['$timeout', '$sessionStorage', function ($timeout, $sessionStorage) {
        return {
            restrict: 'A',
            controller: ['$scope', function ($scope) {
                $scope.notification = {
                    status: 'hide',
                    type: 'error',
                    message: 'Error! User is not login!'
                };
            }],
            link: function notLogin(scope, element, attrs) {
                attrs.$observe('notificationError', function () {
                    if ($sessionStorage.isAuthenticated === false) {
                        $(element).show();
                        $timeout(function () {
                            $(element).hide();
                            scope.notification.status = 'hide';
                        }, 4000);
                    }
                });
            }
        };
    }]);