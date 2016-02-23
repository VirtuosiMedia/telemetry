/**
 * The controller for the dashboard page.
 * @param  {object} $scope                       The local scope.
 * @param  {object} $location                    The location object that determines the hash URL.
 * @param  {object} $rootScope				 The global scope.
 */		
app.controller('dashboardController', function($scope, $location, $rootScope){
	
	/**
	 * Logs the user out and returns them to the login page.
	 */
	$scope.logout = function(){
		delete $rootScope.email;
		$rootScope.loggedIn = false;
		$location.path('/');
	};
});