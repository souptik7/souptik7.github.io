var docsApp = angular.module("docsApp", ["ngRoute","angularCSS"]);
docsApp.controller('mainController', function($scope, $http, $location, URL, $rootScope) {
    
    $scope.baseURL = URL.baseURL;
    var innerWidth = window.innerWidth;
    if(innerWidth <= 425){
        $scope.screenSize = 'mobile';
    } else if(innerWidth <= 768){
        $scope.screenSize = 'tablet';
    } else {
        $scope.screenSize = 'laptop';
    }
    
    $scope.serivceURL = URL.serivceURL;
    $scope.loggedIn = window.localStorage.userData!=undefined?true:false;
    $scope.chatBotID = '63906';
    $scope.externalID = 'chirag1';
    $scope.apiKey = '6nt5d1nJHkqbkphe';
    
    if($scope.screenSize == 'mobile'){
        $location.path('/login');
    }

});