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

    var toUTCDate = function(date) {
        var _utc = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
        return _utc;
    };
    var millisToUTCDate = function(millis) {
        return toUTCDate(new Date(millis));
    };
    $scope.toUTCDate = toUTCDate;
    $scope.millisToUTCDate = millisToUTCDate;

    $scope.scrollToBottom = function() {
        $(document).ready(function() {
            $("html,body").animate({
                scrollTop: $(document).height()
            }, 1000);
            console.log($(this).height() - $(this).scrollTop());
        });
        // console.log($(this).height() - $(this).scrollTop());
    }

    $(window).scroll(function() {
        console.log($(this).height() - $(this).scrollTop());
        if (($(this).height() - $(this).scrollTop()) > 900) {
            $('.goToTop').fadeIn();
        } else {
            $('.goToTop').fadeOut();
        }
    });
    
    $scope.serivceURL = URL.serivceURL;
    $scope.loggedIn = window.localStorage.userData!=undefined?true:false;
    $scope.chatBotID = '63906';
    $scope.externalID = 'chirag1';
    $scope.apiKey = '6nt5d1nJHkqbkphe';
    
    if($scope.screenSize == 'mobile' && $scope.loggedIn == false){
        $location.path('/login');
    }

    if($scope.loggedIn){
        $location.path('/chat');
    }

});