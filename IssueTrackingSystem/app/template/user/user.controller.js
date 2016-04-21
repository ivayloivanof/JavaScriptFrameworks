"use strict";

angular.module('IssueTrackingSystem.controllers.user', [])
    .controller('User', ['$scope', 'debug', '$location', 'authentication', '$sessionStorage', 'users',
        function user($scope, debug, $location, authentication, $sessionStorage, users) {

            $scope.loginUserInSystem = function (user) {
                authentication.loginUser(user)
                    .then(function (loggedUser) {
                        $sessionStorage.isAuthenticated = true;
                        $sessionStorage.access_token = loggedUser.data.access_token;
                        $sessionStorage.token_type = loggedUser.data.token_type;
                        $sessionStorage.username = loggedUser.data.userName;
                        //if debug mode
                        debug ? console.log(loggedUser.data) : '';
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