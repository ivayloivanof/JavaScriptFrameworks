videoSystem.controller('uploadController', ['$scope', '$videoFile', '$location', function ($scope, $videoFile, $location) {
	$scope.uploadVideo = function () {
		$videoFile.addVideo($scope.video);
		$location.path('#/home');
	};
}]);