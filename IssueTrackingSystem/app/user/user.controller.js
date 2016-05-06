"use strict";

angular.module('IssueTrackingSystem.controllers.user', [])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/profile/password', {
                templateUrl: 'app/user/partials/change-password.html',
                controller: 'User'
            })
            .when('/users', {
                templateUrl: 'app/user/partials/users-all.html',
                controller: 'User'
            });
    }])
    .controller('User', ['$scope', 'debug', '$location', 'authentication', '$sessionStorage', 'users', '$route',
        function user($scope, debug, $location, authentication, $sessionStorage, users, $route) {

            //completed
            $scope.getAllUsers = function () {
                users.getAllUsers()
                    .then(function (users) {
                        //if debug mode is activated
                        debug ? console.log('All users:', users) : '';
                        $scope.allUsers = users.data;
                    });
            };

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
                        $location.path('/');
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

            $scope.makeAdmin = function (userId) {
                users.makeUserAdmin(userId)
                    .then(function (success) {
                        //if debug mode is activated
                        debug ? console.log('User changed to admin:', success) : '';
                        $route.reload();
                    });
            };

            //completed
            $scope.isAdmin = function isAdmin() {
                if ($sessionStorage.isAdmin) {
                    return true;
                }
                return false;
            };

            $scope.isLead = function isLead() {
                if ($sessionStorage.LeadId === $sessionStorage.Id) {
                    return true;
                }
                return false;
            };

            $scope.isAssignee = function isAssignee() {
                if ($sessionStorage.AssigneeId === $sessionStorage.Id) {
                    return true;
                }
                return false;
            };
        }]);