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
							console.log(registeredUser);
						})
						
					
				};

				$scope.logoutUser = function () {
					delete $sessionStorage.access_token;
					delete $sessionStorage.token_type;
					delete $sessionStorage.user;
					$sessionStorage.isAuthenticated = false;
					$location.path('/login');
				}

	}]);
})();