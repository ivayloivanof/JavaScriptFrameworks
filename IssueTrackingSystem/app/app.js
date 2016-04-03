var app = angular.module('SoftUniIssueTracker', []);

app.controller('View', function ($scope) {
	$scope.Home = "This test home page";
	console.log($scope);
});