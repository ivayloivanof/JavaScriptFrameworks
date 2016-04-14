(function() {
	IssueTrackingSystem.controller('User', ['$scope', '$location', 'authentication', '$sessionStorage',
			function ($scope, $location, authentication, $sessionStorage) {

				$scope.loginUserInSystem = function (user) {
					authentication.loginUser(user)
						.then(function (loggedUser) {
							$sessionStorage.isAuthenticated = true;
							$sessionStorage.access_token = loggedUser.access_token;
							$sessionStorage.token_type = loggedUser.token_type;
							$sessionStorage.user = loggedUser.userName;
							$location.path('/');
						})
				};

				$scope.registerUserInSystem = function (user) {
					authentication.registerUser(user)
						.then(function (registeredUser) {
							$sessionStorage.isAuthenticated = true;
							$sessionStorage.access_token = registeredUser.access_token;
							$sessionStorage.token_type = registeredUser.token_type;
							$sessionStorage.user = registeredUser.userName;
							$location.path('/');
						})
				};

				$scope.logoutUser = function () {
					authentication.logout();
					$location.path('/login');
				}

	}]);
})();