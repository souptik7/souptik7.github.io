docsApp.config(['$routeProvider', '$locationProvider', '$controllerProvider', '$sceDelegateProvider','URL', function($routeProvider, $locationProvider, $controllerProvider, $sceDelegateProvider,URL) {
    $locationProvider.html5Mode(true);
    docsApp.registerCtrl = $controllerProvider.register;
    docsApp.resolveScriptDeps = function(dependencies) {
        return function($q, $rootScope) {
            var deferred = $q.defer();
            $script(dependencies, function() {
                // all dependencies have now been loaded by $script.js so resolve the promise
                $rootScope.$apply(function() {
                    deferred.resolve();
                });
            });
            return deferred.promise;
        }
    };
    $locationProvider.hashPrefix('');
    var hostName = URL.getURL(window.location.hostname).serviceURL;
    URL.baseURL = window.location.protocol +"//"+ window.location.hostname+'/souptik7.github.io/DocsApp/';
    URL.serivceURL = 'http://www.personalityforge.com/api/chat/';
    $routeProvider.when('/', {
        templateUrl: URL.baseURL+'partials/homepage-v0.0.1.html',
        controller: 'chatController',
        css: URL.baseURL+'css/homepage-v0.0.1.css',
        resolve: {
            deps: docsApp.resolveScriptDeps([URL.baseURL+'js/controllers/chatbox-v0.0.1.js'])
        }
    }).when('/login', {
        templateUrl: URL.baseURL+'partials/login-v0.0.1.html',
        controller: 'loginController',
        css: URL.baseURL+'css/login-v0.0.1.css',
        resolve: {
            deps: docsApp.resolveScriptDeps([URL.baseURL+'js/controllers/login-v0.0.1.js'])
        }
    }).otherwise({
        redirectTo : '/'
    });
    $sceDelegateProvider.resourceUrlWhitelist([URL.baseURL + '**']);
}]);