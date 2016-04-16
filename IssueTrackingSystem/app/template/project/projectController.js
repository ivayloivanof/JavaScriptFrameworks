(function () {
    "use strict";
    IssueTrackingSystem.controller('Project', ['$scope', function ($scope) {
        $scope.addProject = function (project) {
            console.log(project);
            //TODO upload project
        };
    }]);
}());