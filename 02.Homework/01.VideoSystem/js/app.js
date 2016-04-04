var videoSystem = angular.module("VideoSystem", ['ngRoute']);

videoSystem.config(['$routeProvider', function ($routeProvider) {
	$routeProvider
		.when('/home', {
			templateUrl : 'homeView/home.html',
			controller : 'homeView'
		})
		.when('/upload', {
			templateUrl : 'uploadVideo/upload.html',
			controller : 'uploadController'
		})
		.otherwise({
			redirectTo : '/home'
		})
}]);
















