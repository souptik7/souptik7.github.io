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

    $scope.load = function(){
        $rootScope.loading = true;
        $scope.tokenError = false;
        $scope.find = {};
        $scope.find.planet = [];
        $scope.find.vehicle = [];
        $scope.vehiclesRadio = [];
        $scope.oldModal = [];
        $scope.oldModalKey = [];
        $rootScope.totalTime = 0;
        for(var i=0;i<4;i++){
            var tempObj = {
                "name":"vehicle"+i,
                "ids":[]
            };
            for(var j=0;j<4;j++){
                tempObj.ids.push("vehicle"+i+j);
            }
            $scope.vehiclesRadio.push(tempObj);
        }
        $scope.showVehicles = [false,false,false,false];
        var data = {};
        data = JSON.stringify(data);
        $http.post($scope.serivceURL + 'token', data, {
            headers:{
                'Accept':'application/json'
            }
        }).then(function(data){
            $scope.token = data.data.token;
        });
        $http.get($scope.serivceURL + 'planets')
        .then(function(data){
            $scope.mainPlanets = data.data;
            $scope.planets = [];
            for(var i=0;i<4;i++){
                $scope.planets.push(data.data);
            }
        })
        $http.get($scope.serivceURL + 'vehicles')
        .then(function(data){
            $scope.mainVehicles = data.data;
            $scope.vehicles = [];
            for(var i=0;i<4;i++){
                $scope.vehicles.push(data.data);
            }
            $rootScope.loading = false;
        })
    }

    $scope.load();

    $scope.getPlanets = function(key){
        if($scope.find.planet[key] == undefined)return;
        for(var i=0;i<4;i++){
            if(key != i){
                var tempArr1 = [];
                var loops = $scope.mainPlanets.length;
                for(var j=0;j<loops;j++){
                    var count = 0;
                    for(var k=0;k<4;k++){
                        if($scope.find.planet[k] != null && k != i && JSON.parse($scope.find.planet[k]).name == $scope.mainPlanets[j].name){
                            count++;
                        }
                    }
                    if(count == 0){
                        tempArr1.push($scope.mainPlanets[j]);
                    }
                }
                $scope.planets[i] = tempArr1;
            }
            else {
                $scope.showVehicles[i] = true;
            }
        }
    }

    $scope.getVehicles = function(key1,key2){
        for(var i=0;i<1;i++){
            $scope.vehicles[i][key2].total_no = $scope.vehicles[i][key2].total_no - 1;
            if($scope.oldModal[key1] != undefined && $scope.oldModal[key1] != $scope.find.vehicle[key1]){
                $scope.vehicles[i][$scope.oldModalKey[key1]].total_no = $scope.vehicles[i][$scope.oldModalKey[key1]].total_no + 1;
            }
        }
        $scope.oldModalKey[key1] = key2;
        $scope.oldModal[key1] = $scope.find.vehicle[key1];
        computeTime();
    }

    function computeTime(){
        $rootScope.totalTime = 0;
        for(var i=0;i<4;i++){
            if($scope.find.planet[i] != undefined && $scope.find.vehicle[i] != undefined){ 
                var distance;
                var speed;
                distance = JSON.parse($scope.find.planet[i]).distance;
                for(var j=0;j<4;j++){
                    if($scope.find.vehicle[i] == $scope.vehicles[i][j].name){
                        speed = $scope.vehicles[i][j].speed;
                    }
                }
                $rootScope.totalTime = $rootScope.totalTime + (distance/speed);
            }
        }
    }
    $scope.findFalcone = function(){
        var planetArr = [];
        var vehicleArr = [];
        for(var i=0;i<4;i++){
            planetArr.push(JSON.parse($scope.find.planet[i]).name);
            vehicleArr.push($scope.find.vehicle[i]);
        }
        $rootScope.loading = true;
        var data = {
            "token":$scope.token,
            "planet_names":planetArr,
            "vehicle_names":vehicleArr
        };
        data = JSON.stringify(data);
        $http.post($scope.serivceURL + 'find', data, {
            headers:{
                'Accept':'application/json',
                'Content-type':'application/json'
            }
        }).then(function(data){
            $rootScope.resultData = data.data;
            $rootScope.loading = false;
            $location.path('/result');
        }).catch(function(data){
            $scope.tokenError = true;
            $rootScope.loading = false;
        });
    }

});