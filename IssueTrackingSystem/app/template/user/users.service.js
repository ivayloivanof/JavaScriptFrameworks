'use strict';

angular.module('IssueTrackingSystem.services.users', [])
    .factory('users', ['$http', '$q', 'BASE_URL', 'header',
        function ($http, $q, BASE_URL, header) {

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
            //
            // function makeAdmin(userId) {
            //     getCurrent().then(function (currentUser) {
            //         if (!currentUser.isAdmin) {
            //             console.error('Only admins can do that.');
            //             return;
            //         }
            //
            //         var deferred = $q.defer();
            //         var data = 'UserId=' + userId;
            //         $http.put(BASE_URL + 'users/makeadmin', data, headerService.getAuthAndWWWContentHeader())
            //             .then(function (success) {
            //                 deferred.resolve(success);
            //             }, function (error) {
            //                 deferred.reject(error);
            //             });
            //
            //         return deferred.promise;
            //     }, function (error) {
            //         console.error(error);
            //     });
            // }
            //
            // function changePassword(oldPass, newPass, confirmNewPass) {
            //     if (newPass != confirmNewPass) {
            //         console.error('Passwords do not match.');
            //         return;
            //     }
            //
            //     var deferred = $q.defer();
            //     var data = 'OldPassword=' + oldPass + '&NewPassword=' + newPass + '&ConfirmPassword=' + confirmNewPass;
            //     $http.post(BASE_URL + 'api/Account/ChangePassword', data, headerService.getAuthAndWWWContentHeader())
            //         .then(function (success) {
            //             deferred.resolve(success);
            //         }, function (error) {
            //             deferred.reject(error);
            //         });
            //
            //     return deferred.promise;
            // }

            return {
                getAllUsers : getAllUsers,
                getCurrentUser : getCurrentUser
            };
        }]);