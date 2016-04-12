(function() {
	IssueTrackingSystem.controller('Login', ['$scope', '$sessionStorage', '$http', '$q', 'BASEURL',
			function ($scope, $sessionStorage, $http, $q, BASEURL) {
		$scope.login = function login() {
			var deferred = $q.defer();
			$http({
				method: 'POST',
				url: BASEURL + 'users/login',
				data: "username=" + $scope.username + "&password=" + $scope.password,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			}).then(function success(response) {
				deferred.resolve(response.data);
				console.log(response);
				console.log($sessionStorage);
				$sessionStorage.userName = response.data.userName;
				$sessionStorage.userAccessToken = response.data.access_token;
			}, function error(error) {
				console.log(error);
				console.log($sessionStorage);
			});

			return deferred.promise;
		};

	}]);
})();