var app = angular.module('MyFirsApp', []);

app.controller('View', function ($scope) {
	$scope.Home = "This home page";
	console.log($scope);
});