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
            link: function succesLogin(scope, element, attrs) {
                attrs.$observe('notificationSuccess', function () {
                    if ($sessionStorage.isAuthenticated === true) {
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