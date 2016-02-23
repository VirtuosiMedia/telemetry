/**
 * The controller for the login page.
 * @param  {object} $scope                       The local scope.
 * @param  {object} $location                    The location object that determines the hash URL.
 * @param  {object} $rootScope					 The global scope.
 */		
app.controller('loginController', function($scope, $location, $rootScope){
	
	/**
	 * Checks if the login information is valid and redirects to the dashboard if it is, otherwise displays errors.
	 */
	$scope.login = function(){
		$scope.failedLogin = false;

		/**
		 * This mocks the API call. In a real app, it would get an authentication token or be declined.
		 */
		if (($scope.loginForm.$valid) && ($scope.password.toLowerCase() !== 'password')){
			$rootScope.loggedIn = true;
			$rootScope.email = $scope.email;
			$location.path('/dashboard');
		} else if ($scope.loginForm.$valid){
			$scope.failedLogin = true;
		}
	};
});