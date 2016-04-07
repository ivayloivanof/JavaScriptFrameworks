var IssueTrackingSystem = angular.module('IssueTrackingSystem', ['ngRoute', 'ngStorage']);

IssueTrackingSystem.config(['$routeProvider', function ($routeProvider) {
	$routeProvider
		.when('/home', {
			templateUrl : 'app/template/home.html',
			controller : 'Home'
		})
		.when('/login', {
			templateUrl : 'app/template/user/login.html',
			controller : 'Login'
		})
		.when('/signup', {
			templateUrl : 'app/template/user/signup.html',
			controller : 'SignUp'
		})
		.when('/edit-issue', {
			templateUrl : 'app/template/edit-issue/edit-issue.html',
			controller : 'EditIssue'
		})
		.otherwise({
			redirectTo: '/home'
		})
}]);


IssueTrackingSystem.controller('Home', ['$scope', 'requester', '$sessionStorage', function ($scope, requester, $sessionStorage) {
	console.log('This is home controller!');
	console.log($sessionStorage);
}]);