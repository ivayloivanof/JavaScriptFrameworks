var IssueTrackingSystem = angular
	.module('IssueTrackingSystem', ['ngRoute', 'ngStorage'])
	.constant('BASEURL', 'http://softuni-social-network.azurewebsites.net/api/');

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


IssueTrackingSystem.controller('Home', ['$scope', '$sessionStorage', '$location', '$http',
	function ($scope, $sessionStorage, $location, $http) {

		// $http({
		// 	method: 'POST',
		// 	url: 'http://softuni-social-network.azurewebsites.net/api/users/login',
		// 	data: "username=" + "n1p3ha" + "&password=" + "666666",
		// 	headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		// }).then(function success(response) {
		// 	console.log(response);
		// 	console.log($sessionStorage);
		// 	$sessionStorage.userName = response.data.userName;
		// 	$sessionStorage.userAccessToken = response.data.access_token;
		// }, function error(error) {
		// 	console.log(error);
		// 	console.log($sessionStorage);
		// });

}]);