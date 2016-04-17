(function () {
    IssueTrackingSystem.controller('Issue', ['$scope', 'issues', function ($scope, issues) {

        $scope.getAllIssues = function () {
            issues.getAllIssues()
                .then(function (issues) {
                    console.log(issues);
                    $scope.issues = issues.data.Issues;
                });
        };

        $scope.getAllIssues();
    }]);
}());