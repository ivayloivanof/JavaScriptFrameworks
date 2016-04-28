"use strict";

angular.module('IssueTrackingSystem.controllers.user', [])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/profile/password', {
            templateUrl: 'app/user/partials/change-password.html',
            controller: 'User'
        });
    }])
    .controller('User', ['$scope', 'debug', '$location', 'authentication', '$sessionStorage', 'users',
        function user($scope, debug, $location, authentication, $sessionStorage, users) {

            //completed
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
                                $sessionStorage.Id = currentUser.data.Id;
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

            //completed
            $scope.registerUserInSystem = function (user) {
                authentication.registerUser(user)
                    .then(function (registeredUser) {
                        var userLogin = {
                            username : user.email,
                            password : user.password
                        };
                        //if debug mode is activated
                        debug ? console.log(registeredUser) : '';
                        $scope.loginUserInSystem(userLogin);
                    }, function (error) {
                        console.error(error);
                    });
            };

            //completed
            $scope.changeUserPassword = function changePass(changeData) {
                users.changePassword(changeData)
                    .then(function (changed) {
                        //if debug mode is activated
                        debug ? console.log('Changed password:', changed) : '';
                    }, function (error) {
                        console.error(error);
                    });
            };

            //completed
            $scope.logoutUser = function () {
                authentication.logout();
                $location.path('/logout');
            };

            //completed
            $scope.hasLogged = function hasLogged() {
                if ($sessionStorage.isAuthenticated) {
                    return true;
                }

                $sessionStorage.isAuthenticated = false;
                $location.path('/');
            };

            //completed
            $scope.getCurrentUser = function getCurrentUser() {
                users.getCurrentUser()
                    .then(function (currentUser) {
                        //if debug mode is activated
                        debug ? console.log('Current User:', currentUser) : '';
                        $scope.currentUser = currentUser.data;
                    });
            };

            //completed
            $scope.isAdmin = function isAdmin() {
                if ($sessionStorage.isAdmin) {
                    return true;
                }
                return false;
            };

            $scope.isLead = function isLead(id) {
                if ($sessionStorage.Id === id) {
                    return true;
                }
                return false;
            };
        }]);