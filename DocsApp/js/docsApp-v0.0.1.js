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
    $scope.loggedIn = window.localStorage.loggedIn!=undefined?window.localStorage.loggedIn:false;

    if($scope.screenSize == 'mobile'){
        $location.path('/login');
    }

});