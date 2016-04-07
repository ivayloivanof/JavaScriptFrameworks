(function() {
	IssueTrackingSystem.controller('Login', ['$scope', 'requester', function ($scope, requester) {

		$scope.login = function login() {
			requester.loginUser($scope.username, $scope.password);
		};

	}]);
})();