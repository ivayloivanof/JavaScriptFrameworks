'use strict';

angular.module('IssueTrackingSystem.services.error', [])
    .factory('error', ['$sessionStorage',
        function error($sessionStorage) {
            var errors = {};

            function setError(type, number, errorMessage, location) {
                errors.type = type;
                errors.number = number;
                errors.message = errorMessage;
                errors.location = location;
            }
            
            return {
                getError : errors
            };
        }]);