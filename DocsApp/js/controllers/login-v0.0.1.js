docsApp.registerCtrl('loginController', function($scope, $http, $location, $rootScope) {
	if($scope.screenSize != 'mobile'){
        $location.path('/');
    }
});