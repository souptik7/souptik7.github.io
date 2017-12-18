docsApp.registerCtrl('chatController', function($scope, $http, $location, $rootScope) {
	$scope.userData = JSON.parse(window.localStorage.userData);
	$scope.chat = {};
    $scope.loggedIn = window.localStorage.userData!=undefined?true:false;
	$scope.chatData = window.localStorage.chatData != undefined?JSON.parse(window.localStorage.chatData):[];
    $scope.scrollToBottom();

    $scope.sendMessage = function(){
        addChatData('user',$scope.chat.messsage);
        if($scope.chatData.length == 0){
            $http.get($scope.serivceURL + '?apiKey=' + $scope.apiKey + '&chatBotID=' + $scope.chatBotID + '&message=' + $scope.chat.messsage + '&externalID=' + $scope.externalID + '&firstName=' + $scope.userData.firstName + '&lastName=' + $scope.userData.lastName +'&gender=' + $scope.userData.gender)
            .then(function(data){
                console.log(data);
            });
        }
        else {
            $http.get($scope.serivceURL + '?apiKey=' + $scope.apiKey + '&message=' + $scope.chat.messsage + '&chatBotID=' + $scope.chatBotID + '&externalID=' + $scope.externalID)
            .then(function(data){
                console.log(data);
            });
        }
    }
    function addChatData(user,message) {
        var date = new Date();
        var data = {
            'author':user,
            'time':date,
            'message':message
        }
        $scope.chatData.push(data);
        $scope.scrollToBottom();
        window.localStorage.chatData = JSON.stringify($scope.chatData);
    }
});