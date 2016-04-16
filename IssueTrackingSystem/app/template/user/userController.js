(function () {
    "use strict";
    IssueTrackingSystem.controller('User', ['$scope', '$location', 'authentication', 'users', '$sessionStorage',
        function ($scope, $location, authentication, users, $sessionStorage) {

            $scope.loginUserInSystem = function (user) {
                authentication.loginUser(user)
                    .then(function (loggedUser) {
                        $sessionStorage.isAuthenticated = true;
                        $sessionStorage.access_token = loggedUser.data.access_token;
                        $sessionStorage.token_type = loggedUser.data.token_type;
                        $sessionStorage.username = loggedUser.data.userName;
                        $location.path('/login');
                    });
            };

            $scope.registerUserInSystem = function (user) {
                authentication.registerUser(user)
                    .then(function (registeredUser) {
                        $sessionStorage.isAuthenticated = true;
                        $sessionStorage.access_token = registeredUser.data.access_token;
                        $sessionStorage.token_type = registeredUser.data.token_type;
                        $sessionStorage.username = registeredUser.data.userName;
                        $location.path('/register');
                    });
            };

            $scope.getAllUsers = function () {
                users.getAllUsers()
                    .then(function (users) {
                        console.log(users);
                    });
            };

            $scope.logoutUser = function () {
                authentication.logout();
                $location.path('/logout');
            };

            $scope.getAllUsers();
        }]);
}());