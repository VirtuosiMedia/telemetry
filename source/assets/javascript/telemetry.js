/**
 * Bootstrap file for the Telemetry sample login application.
 */
var app = window.app = angular.module('telemetry', [
	'ngRoute',
	'ngMessages',
	'loginController'
]);
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