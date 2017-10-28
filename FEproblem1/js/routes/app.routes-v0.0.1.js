findApp.config(['$routeProvider', '$locationProvider', '$controllerProvider', '$sceDelegateProvider','URL', function($routeProvider, $locationProvider, $controllerProvider, $sceDelegateProvider,URL) {
    // remember mentioned function for later use
    findApp.registerCtrl = $controllerProvider.register;
    findApp.resolveScriptDeps = function(dependencies) {
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
    // $locationProvider.hashPrefix('');
    var hostName = URL.getURL(window.location.hostname).serviceURL;
    if(hostName == "localhost"){
        URL.baseURL = window.location.protocol +"//"+ window.location.hostname+'/souptik7.github.io/FEproblem1/';
    }
    $routeProvider.when('/', {
        templateUrl: URL.baseURL+'partials/homepage-v0.0.1.html',
        css: URL.baseURL+'css/homepage-v0.0.1.css'
    }).when('/result', {
        templateUrl: URL.baseURL+'partials/result-v0.0.1.html',
        controller: 'resultController',
        css: URL.baseURL+'css/result-v0.0.1.css',
        resolve: {
            deps: findApp.resolveScriptDeps([URL.baseURL+'js/controllers/result-v0.0.1.js'])
        }
    }).otherwise({
        redirectTo : '/'
    });
    $sceDelegateProvider.resourceUrlWhitelist([URL.baseURL + '**']);
}]);