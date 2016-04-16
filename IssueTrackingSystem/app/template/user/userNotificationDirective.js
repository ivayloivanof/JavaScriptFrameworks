(function() {
    'use strict';
    IssueTrackingSystem.directive('notificationSuccess', ['$timeout', '$sessionStorage', function ($timeout, $sessionStorage) {
        return {
            restrict: 'A',
            controller: ['$scope', function ($scope) {
                $scope.notification = {
                    status: 'hide',
                    type: 'success',
                    message: 'Welcome! ' + $sessionStorage.username
                };
            }],
            link: function (scope, elem, attrs) {
                attrs.$observe('notificationSuccess', function () {
                    if ($sessionStorage.isAuthenticated === true) {
                        $(elem).show();
                        $timeout(function () {
                            $(elem).hide();
                            scope.notification.status = 'hide';
                        }, 5000);
                    }
                });
            }
        };
    }]);

    IssueTrackingSystem.directive('notificationError', ['$timeout', function ($timeout) {
        return {
            restrict: 'A',
            controller: ['$scope', function ($scope) {
                $scope.notification = {
                    status: 'hide',
                    type: 'error',
                    message: 'Error! '
                };
            }],
            link: function (scope, elem, attrs) {
                attrs.$observe('notificationSuccess', function () {
                    if (true) {
                        $(elem).show();
                        $timeout(function () {
                            $(elem).hide();
                            scope.notification.status = 'hide';
                        }, 5000);
                    }
                });
            }
        };
    }]);
}());