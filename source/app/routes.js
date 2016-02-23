/**
 * The routes for all templates and controllers.
 */
app.config(['$routeProvider', function($routeProvider){
	
	/**
	 * This could be reconfigured to verify an authentication token in an actual application.
	 */
	var loggedInStatus = function($location, $rootScope){
		if (!$rootScope.loggedIn){
			$location.path('/');
		}		
	};

	$routeProvider.when('/', {
		templateUrl: 'app/components/login/login.html'
	}).when('/dashboard', {
		resolve: {"check": loggedInStatus},
		templateUrl: 'app/components/dashboard/dashboard.html'
	}).otherwise({
		redirectTo: '/'
	});
}]);