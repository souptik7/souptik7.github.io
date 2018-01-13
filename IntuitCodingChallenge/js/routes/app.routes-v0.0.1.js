jobApp.config(['$routeProvider', '$locationProvider', '$controllerProvider', '$sceDelegateProvider', 'URL', function($routeProvider, $locationProvider, $controllerProvider, $sceDelegateProvider, URL) {
    $locationProvider.html5Mode(true);
    jobApp.registerCtrl = $controllerProvider.register;
    jobApp.resolveScriptDeps = function(dependencies) {
        return function($q, $rootScope) {
            var deferred = $q.defer();
            $script(dependencies, function() {
                $rootScope.$apply(function() {
                    deferred.resolve();
                });
            });
            return deferred.promise;
        }
    };
    $locationProvider.hashPrefix('');
    var hostName = URL.getURL(window.location.hostname).serviceURL;
    URL.baseURL = window.location.protocol + "//" + window.location.hostname + '/souptik7.github.io/IntuitCodingChallenge/';
    URL.serivceURL = 'https://craft-demo-intuit.herokuapp.com/';
    $routeProvider.when('/', {
        templateUrl: URL.baseURL + 'partials/homepage-v0.0.1.html',
        css: URL.baseURL + 'css/homepage-v0.0.1.css'
    }).when('/result', {
        templateUrl: URL.baseURL + 'partials/result-v0.0.1.html',
        controller: 'resultController',
        css: URL.baseURL + 'css/result-v0.0.1.css',
        resolve: {
            deps: jobApp.resolveScriptDeps([URL.baseURL + 'js/controllers/result-v0.0.1.js'])
        }
    }).otherwise({
        redirectTo: '/'
    });
    $sceDelegateProvider.resourceUrlWhitelist([URL.baseURL + '**']);
}]);