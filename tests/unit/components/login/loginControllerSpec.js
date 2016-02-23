describe('loginController', function(){
	var $scope, $controller;

	//Setup each test
	beforeEach(module('telemetry'));

	/**
	 * Error: For some reason this isn't working because the _$controller_ is not a constructor. 
	 */
	beforeEach(inject(function(_$controller_, $rootScope, _$location_){
		$scope = $rootScope.$new();
		$controller = _$controller_('loginController', {$scope: $scope, $location: _$location_});
	}));

	it('should require an email', function(){
		$scope.password = 12345678;
		$scope.login();
		expect($scope.loginForm.$valid).toEqual(false);
	});
});