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
                if (!$sessionStorage.isAdmin) {
                    console.error('Only admins can change user to Admin.');  //TODO Notification error
                }

                var deferred = $q.defer();
                $http({
                    method: 'put',
                    url: BASE_URL + 'users/makeadmin',
                    data: 'UserId=' + userId,
                    headers: header.authenticationHeaderAndWWWContent()
                }).then(function (success) {
                    deferred.resolve(success);
                }, function (error) {
                    deferred.reject(error);
                });

                return deferred.promise;
            }

            function changePassword(changedData) {
                if (changedData.passwordNew !== changedData.passwordNewConfirm) {
                    console.error('Passwords new and old do not match.');   //TODO throw notification
                    return;
                }

                var deferred = $q.defer();
                var data = 'OldPassword=' + changedData.passwordOld + '&NewPassword=' + changedData.passwordNew + '&ConfirmPassword=' + changedData.passwordNewConfirm;
                $http({
                    method : 'post',
                    url : BASE_URL + 'api/Account/ChangePassword',
                    data : data,
                    headers : header.authenticationHeaderAndWWWContent()
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