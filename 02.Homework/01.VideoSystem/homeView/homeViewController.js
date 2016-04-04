videoSystem.controller('homeView', ['$scope', '$videoFile', function ($scope, $videoFile) {
	
	$scope.video = $videoFile.getVideo();
	console.log($scope.video);
}]);