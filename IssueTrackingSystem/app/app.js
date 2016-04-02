var app = angular.module('MyFirsApp', []);

app.controller('View', function ($scope) {
	$scope.Home = "This test home page";
	console.log($scope);
});