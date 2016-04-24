"use strict";

angular.module('IssueTrackingSystem.controllers.user', [])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/profile/password', {
            templateUrl: 'app/template/user/change-password.html',
            controller: 'User'
        });
    }])
    .controller('User', ['$scope', 'debug', '$location', 'authentication', '$sessionStorage', 'users',
        function user($scope, debug, $location, authentication, $sessionStorage, users) {

            $scope.loginUserInSystem = function (user) {
                authentication.loginUser(user)
                    .then(function (loggedUser) {
                        $sessionStorage.isAuthenticated = true;
                        $sessionStorage.access_token = loggedUser.data.access_token;
                        $sessionStorage.token_type = loggedUser.data.token_type;
                        $sessionStorage.username = loggedUser.data.userName;

                        users.getCurrentUser()
                            .then(function (currentUser) {
                                $sessionStorage.isAdmin = currentUser.data.isAdmin;
                                //if debug mode is activated
                                debug ? console.log('Current user:', currentUser) : '';
                            }, function (error) {
                                console.error(error);
                            });
                        //if debug mode is activated
                        debug ? console.log('Logged user:', loggedUser) : '';
                        $location.path('/login');
                    }, function (error) {
                        console.error(error);
                    });
            };

            $scope.registerUserInSystem = function (user) {
                authentication.registerUser(user)
                    .then(function (registeredUser) {
                        //if debug mode is activated
                        debug ? console.log(registeredUser) : '';
                        $scope.loginUserInSystem(registeredUser);
                    }, function (error) {
                        console.error(error);
                    });
            };

            $scope.changeUserPassword = function changePass(changeData) {
                users.changePassword(changeData)
                    .then(function (changed) {
                        //if debug mode is activated
                        debug ? console.log('Changed password:', changed) : '';
                    }, function (error) {
                        console.error(error);
                    });
            };

            $scope.logoutUser = function () {
                authentication.logout();
                $location.path('/logout');
            };

            $scope.hasLogged = function () {
                if ($sessionStorage.isAuthenticated) {
                    return true;
                }

                $sessionStorage.isAuthenticated = false;
                $location.path('/');
            };
        }]);