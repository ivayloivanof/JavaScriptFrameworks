(function () {
    'use strict';
    IssueTrackingSystem.factory('projects', ['$http', '$q', 'BASE_URL', '$sessionStorage',
        function ($http, $q, BASE_URL, $sessionStorage) {

            function getAllProjects() {
                var deferred = $q.defer();

                $http({
                    method: 'get',
                    url: BASE_URL + 'projects',
                    headers: {
                        'Authorization': $sessionStorage.token_type + ' ' + $sessionStorage.access_token
                    }
                }).then(function (success) {
                    deferred.resolve(success);
                }).then(function (error) {
                    deferred.reject(error);
                });

                return deferred.promise;
            }

            return {
                getAllProjects : getAllProjects
            };
        }]);
}());