(function() {
	IssueTrackingSystem.controller('User', ['$scope', '$location', 'authentication', '$sessionStorage',
			function ($scope, $location, authentication, $sessionStorage) {
				$scope.loginUserInSystem = function (user) {
					console.log(user);
					authentication.loginUser(user)
						.then(function (loggedUser) {
							console.log(loggedUser);
							$sessionStorage.isAuthenticated = true;
							//$location.path('/newsFeed');
						})
				};

				$scope.registerUserInSystem = function (user) {
					authentication.registerUser(user)
						.then(function (registeredUser) {
							console.log(registeredUser);
						})
						
					
				}

	}]);
})();