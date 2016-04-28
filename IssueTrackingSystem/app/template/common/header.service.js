'use strict';

angular.module('IssueTrackingSystem.services.header', [])
    .factory('header', ['$sessionStorage',
        function header($sessionStorage) {
            function authenticationHeader() {
                return {
                    'Authorization': $sessionStorage.token_type + ' ' + $sessionStorage.access_token
                };
            }

            function authenticationHeaderAndWWWContent() {
                return {
                    'Authorization': $sessionStorage.token_type + ' ' + $sessionStorage.access_token,
                    'Content-Type': 'application/x-www-form-urlencoded'
                };
            }

            function authenticationHeaderAndJSONContent() {
                return {
                    'Authorization': $sessionStorage.token_type + ' ' + $sessionStorage.access_token,
                    'Content-Type': 'application/json'
                };
            }

            function getWWWContent() {
                return {
                    'Content-Type': 'application/x-www-form-urlencoded'
                };
            }

            function getJSONContent() {
                return {
                    'Content-Type': 'application/json'
                };
            }

            return {
                authenticationHeader : authenticationHeader,
                getWWWContent : getWWWContent,
                getJSONContent : getJSONContent,
                authenticationHeaderAndWWWContent : authenticationHeaderAndWWWContent,
                authenticationHeaderAndJSONContent : authenticationHeaderAndJSONContent
            };
        }]);