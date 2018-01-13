var jobApp = angular.module("jobApp", ["ngRoute", "angularCSS"]);
jobApp.controller('mainController', function($scope, $http, $window, $location, URL, $interval, $rootScope) {
    $scope.baseURL = URL.baseURL;
    $(document).ready(function() {
        $("html,body").animate({
            scrollTop: 0
        }, 1000);
    });
    $scope.serivceURL = URL.serivceURL;
    $scope.reset = function() {
        $scope.load();
        $location.path('/');
    }
    $scope.load = function() {
        $rootScope.loading = true;
        $scope.tokenError = false;
        $scope.find = {};
        $scope.find.city = [];
        $scope.find.vehicle = [];
        $scope.vehiclesRadio = [];
        $scope.oldModal = [];
        $scope.oldModalKey = [];
        $rootScope.totalTime = 0;
        for (var i = 0; i < 4; i++) {
            var tempObj = {
                "name": "vehicle" + i,
                "ids": []
            };
            for (var j = 0; j < 4; j++) {
                tempObj.ids.push("vehicle" + i + j);
            }
            $scope.vehiclesRadio.push(tempObj);
        }
        $scope.showVehicles = [false, false, false, false];
        var data = {};
        data = JSON.stringify(data);
        $http.post($scope.serivceURL + 'token', data, {
            headers: {
                'Accept': 'application/json'
            }
        }).then(function(data) {
            $scope.token = data.data.token;
        });
        $http.get($scope.serivceURL + 'cities').then(function(data) {
            $scope.mainCities = data.data;
            $scope.cities = [];
            for (var i = 0; i < 4; i++) {
                $scope.cities.push(data.data);
            }
        })
        $http.get($scope.serivceURL + 'vehicles').then(function(data) {
            $scope.mainVehicles = data.data;
            $scope.vehicles = [];
            for (var i = 0; i < 4; i++) {
                $scope.vehicles.push(data.data);
            }
            $rootScope.loading = false;
        })
    }
    $scope.load();
    $scope.getCities = function(key) {
        if ($scope.find.city[key] == undefined) return;
        for (var i = 0; i < 4; i++) {
            if (key != i) {
                var tempArr1 = [];
                var loops = $scope.mainCities.length;
                for (var j = 0; j < loops; j++) {
                    var count = 0;
                    for (var k = 0; k < 4; k++) {
                        if ($scope.find.city[k] != null && k != i && JSON.parse($scope.find.city[k]).name == $scope.mainCities[j].name) {
                            count++;
                        }
                    }
                    if (count == 0) {
                        tempArr1.push($scope.mainCities[j]);
                    }
                }
                $scope.cities[i] = tempArr1;
            } else {
                $scope.showVehicles[i] = true;
            }
        }
    }
    $scope.getVehicles = function(key1, key2) {
        for (var i = 0; i < 1; i++) {
            $scope.vehicles[i][key2].total_no = $scope.vehicles[i][key2].total_no - 1;
            if ($scope.oldModal[key1] != undefined && $scope.oldModal[key1] != $scope.find.vehicle[key1]) {
                $scope.vehicles[i][$scope.oldModalKey[key1]].total_no = $scope.vehicles[i][$scope.oldModalKey[key1]].total_no + 1;
            }
        }
        $scope.oldModalKey[key1] = key2;
        $scope.oldModal[key1] = $scope.find.vehicle[key1];
        computeTime();
    }

    function computeTime() {
        $rootScope.totalTime = 0;
        for (var i = 0; i < 4; i++) {
            if ($scope.find.city[i] != undefined && $scope.find.vehicle[i] != undefined) {
                var distance;
                var speed;
                distance = JSON.parse($scope.find.city[i]).distance;
                for (var j = 0; j < 4; j++) {
                    if ($scope.find.vehicle[i] == $scope.vehicles[i][j].name) {
                        speed = $scope.vehicles[i][j].speed;
                    }
                }
                $rootScope.totalTime = $rootScope.totalTime + (distance / speed);
            }
        }
    }
    $scope.findJob = function() {
        var cityArr = [];
        var vehicleArr = [];
        for (var i = 0; i < 4; i++) {
            cityArr.push(JSON.parse($scope.find.city[i]).name);
            vehicleArr.push($scope.find.vehicle[i]);
        }
        $rootScope.loading = true;
        var data = {
            "token": $scope.token,
            "city_names": cityArr,
            "transportvehicle_names": vehicleArr
        };
        data = JSON.stringify(data);
        $http.post($scope.serivceURL + 'find', data, {
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            }
        }).then(function(data) {
            $rootScope.resultData = data.data;
            $rootScope.loading = false;
            $location.path('/result');
        }).catch(function(data) {
            $scope.tokenError = true;
            $rootScope.loading = false;
        });
    }
});