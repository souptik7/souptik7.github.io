findApp.registerCtrl('resultController', function($scope, $http, $location, $window, $rootScope) {
	if($rootScope.resultData == undefined){
		$location.path('/');
	}
	$scope.gotoHomePage = function(){
		$scope.load();
		$location.path('/');
	}
});