var findApp = angular.module("findApp", ["ngRoute","angularCSS"]);
findApp.config(function($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
});
findApp.controller('mainController', function($scope, $http, $window, $location, URL, $interval) {
    
    $scope.baseURL = URL.baseURL;
    var innerWidth = window.innerWidth;
    if(innerWidth <= 425){
        $scope.screenSize = 'mobile';
    } else if(innerWidth <= 768){
        $scope.screenSize = 'tablet';
    } else {
        $scope.screenSize = 'laptop';
    }

    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) {
            $('.goToTop').fadeIn();
        } else {
            $('.goToTop').fadeOut();
        }
    });
    $('.goToTop').click(function() {
        $("html, body").animate({
            scrollTop: 0
        }, 750);
    });

    $(document).ready(function() {
        $("html,body").animate({
            scrollTop: 0
        }, 1000);
    });

    $scope.load = function(){
        
    }

});