docsApp.registerCtrl('chatController', function($scope, $http, $location, $rootScope) {
	$scope.userData = JSON.parse(window.sessionStorage.userData);
	$scope.chat = {};
	$scope.chatData = window.sessionStorage.chatData != undefined?JSON.parse(window.sessionStorage.chatData):[];
    $scope.sendMessage = function(){
    	// var date = new Date();
    	// var data = {
    	// 	'author':'user',
    	// 	'time':date,
    	// 	'message':$scope.chat.messsage,
    	// 	'serial':
    	// }
    	// $scope.chatData.push(data);
    	$http.get($scope.serivceURL + '?apiKey=' + $scope.apiKey + '&message=' + $scope.chat.messsage + '&chatBotID=' + $scope.chatBotID + '&externalID=' + $scope.externalID)
    	.then(function(data){
    		console.log(data);
    	});
    }
});