(function () {
    "use strict";
    IssueTrackingSystem.controller('Project', ['$scope', 'users', function ($scope, users) {

        $scope.getAllUsers = function () {
            users.getAllUsers()
                .then(function (users) {
                    console.log(users);
                });
        };

        $scope.getAllUsers();
        $scope.addProject = function (project) {
            console.log(project);
            //TODO upload project
        };
    }]);
}());