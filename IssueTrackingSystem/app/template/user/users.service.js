'use strict';

angular.module('IssueTrackingSystem.services.users', [])
    .factory('users', ['$http', '$q', 'BASE_URL', 'header', '$sessionStorage',
        function ($http, $q, BASE_URL, header, $sessionStorage) {

            function getAllUsers() {
                var deferred = $q.defer();

                $http({
                    method: 'get',
                    url: BASE_URL + 'users',
                    headers: header.authenticationHeader()
                }).then(function (success) {
                    deferred.resolve(success);
                }).then(function (error) {
                    deferred.reject(error);
                });

                return deferred.promise;
            }

            function getCurrentUser() {
                var deferred = $q.defer();

                $http({
                    method: 'get',
                    url: BASE_URL + 'users/me/',
                    headers: header.authenticationHeader()
                }).then(function (success) {
                    deferred.resolve(success);
                }, function (error) {
                    deferred.reject(error);
                });

                return deferred.promise;
            }

            function makeUserAdmin(userId) {
                getCurrent().then(function () {
                    if (!$sessionStorage.isAdmin) {
                        console.error('Only admins can do that.');  //TODO Notification error
                        return;
                    }

                    var deferred = $q.defer();
                    var data = 'UserId=' + userId;
                    $http({
                        method: 'put',
                        url: BASE_URL + 'users/makeadmin',
                        data : data,
                        headers: header.authenticationHeader() + header.getWWWContent()
                    }).then(function (success) {
                        deferred.resolve(success);
                    }, function (error) {
                        deferred.reject(error);
                    });

                    return deferred.promise;
                }, function (error) {
                    console.error(error);
                });
            }

            function changePassword(oldPass, newPass, confirmNewPass) {
                if (newPass != confirmNewPass) {
                    console.error('Passwords do not match.');   //TODO notification
                    return;
                }

                var deferred = $q.defer();
                var data = 'OldPassword=' + oldPass + '&NewPassword=' + newPass + '&ConfirmPassword=' + confirmNewPass;
                $http({
                    method : 'post',
                    url : BASE_URL + 'api/Account/ChangePassword',
                    data : data,
                    headers : header.authenticationHeader() + header.getWWWContent()
                }).then(function (success) {
                    deferred.resolve(success);
                }, function (error) {
                    deferred.reject(error);
                });

                return deferred.promise;
            }

            return {
                getAllUsers : getAllUsers,
                getCurrentUser : getCurrentUser,
                makeUserAdmin : makeUserAdmin,
                changePassword : changePassword
            };
        }]);