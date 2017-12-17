var findApp = angular.module("findApp", ["ngRoute","angularCSS"]);
findApp.controller('mainController', function($scope, $http, $window, $location, URL, $interval, $rootScope) {
    
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

    $scope.serivceURL = URL.serivceURL;
    $scope.find = {};
    load();

    function load(){
        $rootScope.loading = true;
        var data = {};
        data = JSON.stringify(data);
        $http.post($scope.serivceURL + 'token', data, {
            headers:{
                'Accept':'application/json'
            }
        }).then(function(data){
            $scope.token = data.token;
        });
        $http.get($scope.serivceURL + 'planets')
        .then(function(data){
            $scope.planets = [];
            for(var i=0;i<4;i++){
                $scope.mainPlanets = data.data;
                $scope.planets.push(data.data);
            }
        })
        $http.get($scope.serivceURL + 'vehicles')
        .then(function(data){
            $scope.vehicles = [];
            for(var i=0;i<4;i++){
                $scope.vehicles.push(data.data);
            }
            $rootScope.loading = false;
        })
    }

    $scope.sortArray = function(key){
        if($scope.find.planet[key] == undefined)return;
        for(var i=0;i<$scope.planets.length;i++){
            if(key != i){
                $scope.planets[i] = $scope.mainPlanets;
                for(var j=0;j<4;j++){
                    debugger;
                    if($scope.find.planet[i] != null && $scope.planets[i][j].name == JSON.parse($scope.find.planet[i]).name){
                        $scope.planets[i].splice(j,1);
                    }
                }
            }
        }
        console.log($scope.planets);
    }

});