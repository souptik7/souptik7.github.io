docsApp.registerCtrl('loginController', function($scope, $http, $location, $rootScope) {
	if($scope.screenSize != 'mobile'){
        $location.path('/');
    }
    $scope.user = {};
    $scope.startConsultation = function(){
    	$scope.userData = {
    		'firstName':$scope.user.firstName,
    		'lastName':$scope.user.lastName,
    		'mobile':$scope.user.mobile,
    		'gender':$scope.user.gender,
    		'externalID':'chirag1'
    	}
    	window.sessionStorage.userData = JSON.stringify($scope.userData);
    	$location.path('/chat');
    }
});