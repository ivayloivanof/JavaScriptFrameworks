(function () {
    "use strict";
    IssueTrackingSystem.controller('Project', ['$scope', 'projects', 'users', function ($scope, projects, users) {

        $scope.getAllUsers = function () {
            users.getAllUsers()
                .then(function (users) {
                    $scope.allUsers = users.data;
                });
        };

        $scope.addProject = function (project, admin) {
            console.log(project);
            //TODO upload project
        };
        
        $scope.getAllProjects = function () {
            projects.getAllProjects()
                .then(function (projects) {
                    $scope.projects = projects.data;
                });
        };

        $scope.getAllUsers();
        $scope.getAllProjects();
    }]);
}());