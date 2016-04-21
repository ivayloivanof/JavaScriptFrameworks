'use strict';

angular.module('IssueTrackingSystem.services.header', [])
    .factory('header', ['$sessionStorage',
        function header($sessionStorage) {
            function authenticationHeader() {
                return {
                    'Authorization': $sessionStorage.token_type + ' ' + $sessionStorage.access_token
                };
            }

            return {
                authenticationHeader : authenticationHeader
            };
        }]);