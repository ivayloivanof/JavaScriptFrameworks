'use strict';

angular.module('IssueTrackingSystem.services.header', [])
    .factory('header', ['$sessionStorage',
        function header($sessionStorage) {
            
            //completed
            function authenticationHeader() {
                return {
                    'Authorization': $sessionStorage.token_type + ' ' + $sessionStorage.access_token
                };
            }

            //completed
            function authenticationHeaderAndWWWContent() {
                return {
                    'Authorization': $sessionStorage.token_type + ' ' + $sessionStorage.access_token,
                    'Content-Type': 'application/x-www-form-urlencoded'
                };
            }

            //completed
            function authenticationHeaderAndJSONContent() {
                return {
                    'Authorization': $sessionStorage.token_type + ' ' + $sessionStorage.access_token,
                    'Content-Type': 'application/json'
                };
            }

            //completed
            function getWWWContent() {
                return {
                    'Content-Type': 'application/x-www-form-urlencoded'
                };
            }

            //completed
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