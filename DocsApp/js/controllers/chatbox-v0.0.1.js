docsApp.registerCtrl('chatController', function($scope, $http, $location, $rootScope) {
	$scope.userData = JSON.parse(window.localStorage.userData);
	$scope.chat = {};
    $scope.loggedIn = window.localStorage.userData!=undefined?true:false;
	$scope.chatData = window.localStorage.chatData != undefined?JSON.parse(window.localStorage.chatData):[];
    $scope.sendMessage = function(){
    	// var date = new Date();
    	// var data = {
    	// 	'author':'user',
    	// 	'time':date,
    	// 	'message':$scope.chat.messsage,
    	// 	'serial':
    	// }
    	// $scope.chatData.push(data);
    	// $http.get($scope.serivceURL + '?apiKey=' + $scope.apiKey + '&message=' + $scope.chat.messsage + '&chatBotID=' + $scope.chatBotID + '&externalID=' + $scope.externalID)
    	// .then(function(data){
    	// 	console.log(data);
    	// });
        var url = $scope.serivceURL + '?apiKey=' + $scope.apiKey + '&message=' + $scope.chat.messsage + '&chatBotID=' + $scope.chatBotID + '&externalID=' + $scope.externalID;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
               console.log(http.responseText);
            }
        };
        xhttp.open("GET", url, true);
        xhttp.send();
    }
});