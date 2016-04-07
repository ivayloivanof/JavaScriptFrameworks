var IssueTrackingSystem = angular.module('IssueTrackingSystem', ['ngRoute', 'ngStorage']);

IssueTrackingSystem.config(['$routeProvider', function ($routeProvider) {
	$routeProvider
		.when('/', {
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
		// .otherwise({
		// 	redirectTo: '/home'
		// })
}]);


IssueTrackingSystem.controller('Home', ['$scope', 'requester', '$sessionStorage', '$location',
	function ($scope, requester, $sessionStorage, $location) {

		if(typeof $sessionStorage.userName !== 'undefined' || typeof $sessionStorage.userAccessToken !== 'undefined') {
			console.log($sessionStorage);
		} else {
			$location.path('/login');
		}

}]);