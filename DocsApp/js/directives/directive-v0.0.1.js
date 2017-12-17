//Directives for partials
docsApp.directive("headerDirective", function(URL) {
    return {
        templateUrl: URL.baseURL+"partials/header-v0.0.1.html"
    };
});
docsApp.directive("footerDirective", function(URL) {
    return {
        templateUrl: URL.baseURL+"partials/footer-v0.0.1.html"
    };
});

/*modal directive*/
docsApp.directive('modalDialog', function() {
    return {
        restrict: 'E',
        scope: {
            show: '=',
            close: '='
        },
        replace: true,
        transclude: true,
        link: function(scope, element, attrs) {
            scope.dialogStyle = {};
            scope.dialogStyle.width = '500px';
            if (attrs.width) scope.dialogStyle.width = attrs.width;
            if (attrs.height) scope.dialogStyle.height = attrs.height;
            if (attrs.header) scope.dialogHeader = attrs.header;
            if (attrs.content) scope.dialogContent = attrs.content;
            if (attrs.closeText) scope.closeText = attrs.closeText;
            scope.hideModal = function() {
                scope.show = false;
            };
        },
        template: "<div class='ng-modal' ng-show='show'><div class='ng-modal-overlay'></div><div class='ng-modal-dialog' ng-style='dialogStyle'><span ng-if='close==true' class='ng-modal-close' ng-click='hideModal()'>X</span><h4 class='ng-modal-header' ng-if='dialogHeader'>{{dialogHeader}}</h4><div class='ng-modal-dialog-content'><p ng-if='dialogContent'>{{dialogContent}}</p><ng-transclude></ng-transclude><button type='button' ng-click='hideModal()' ng-if='closeText'>{{closeText}}</button></div></div></div>"
    }
});

docsApp.directive('allowPattern', [allowPatternDirective]);
function allowPatternDirective() {
        return {
            restrict: "A",
            compile: function(tElement, tAttrs) {
                return function(scope, element, attrs) {
                    element.bind("keypress", function(event) {
                        var keyCode = event.which || event.keyCode;
                        var keyCodeChar = String.fromCharCode(keyCode);
                        if (!keyCodeChar.match(new RegExp(attrs.allowPattern, "i"))) {
                            if ((keyCodeChar.charCodeAt(0)) != 8) {
                                event.preventDefault();
                                return false;
                            }
                        }
                    });
                };
            }
        };
    }