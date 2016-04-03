var IssueTrackingSystem = angular.module('IssueTrackingSystem', ['ngRoute']);

IssueTrackingSystem.config(['$routeProvider', function ($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl : 'index.html',
			controller : 'Home'
		})
		.when('/dashboard', {
		templateUrl : 'view/dashboard/index.html',
		controller : 'Dashboard'
		})
		.when('/login', {
			templateUrl : 'view/login/login.html',
			controller : 'Login'
		})
		.when('/Register', {
			templateUrl : 'view/login/register.html',
			controller : 'Register'
		})
		.otherwise({
			redirectTo : '/'
		})
}]);


IssueTrackingSystem.controller('Home', ['$scope', function ($scope) {
	console.log($scope);
}]);