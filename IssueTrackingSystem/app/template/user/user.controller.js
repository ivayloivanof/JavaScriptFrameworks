"use strict";

angular.module('IssueTrackingSystem.controllers.user', [])
    .controller('User', ['$scope', '$location', 'authentication', '$sessionStorage',
        function ($scope, $location, authentication, $sessionStorage) {

            $scope.loginUserInSystem = function (user) {
                authentication.loginUser(user)
                    .then(function (loggedUser) {
                        $sessionStorage.isAuthenticated = true;
                        $sessionStorage.access_token = loggedUser.data.access_token;
                        $sessionStorage.token_type = loggedUser.data.token_type;
                        $sessionStorage.username = loggedUser.data.userName;
                        $location.path('/login');
                    }, function (error) {
                        console.error(error);
                    });
            };

            $scope.registerUserInSystem = function (user) {
                authentication.registerUser(user)
                    .then(function (registeredUser) {
                        $scope.loginUserInSystem(registeredUser);
                    }, function (error) {
                        console.error(error);
                    });
            };

            $scope.logoutUser = function () {
                authentication.logout();
                $location.path('/logout');
            };
        }]);