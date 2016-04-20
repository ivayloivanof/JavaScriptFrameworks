var app = angular.module("MyApp", []);

app.controller('Hello', function ($scope) {
	$scope.helloMsg = 'Hello Angular';
});