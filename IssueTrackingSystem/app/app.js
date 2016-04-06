var IssueTrackingSystem = angular.module('IssueTrackingSystem', ['ngRoute']);

IssueTrackingSystem.config(['$routeProvider', function ($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl : 'home.html',
			controller : 'Home'
		})
}]);


IssueTrackingSystem.controller('Home', ['$scope', function ($scope) {
	console.log($scope);
}]);