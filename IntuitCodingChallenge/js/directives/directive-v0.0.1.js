jobApp.directive("headerDirective", function(URL) {
    return {
        templateUrl: URL.baseURL+"partials/header-v0.0.1.html"
    }
    ;
}

);
jobApp.directive("footerDirective", function(URL) {
    return {
        templateUrl: URL.baseURL+"partials/footer-v0.0.1.html"
    }
    ;
}

);
jobApp.directive('loading', function() {
    return {
        restrict:'E', replace:true, template:'<div id="resultLoading" style="display:none"><div><div class="loader-gif"></div></div><div class="bg"></div></div>', link:function(scope, element, attr) {
            scope.$watch('loading', function(val) {
                if(val)$(element).show();
                else $(element).hide();
            }
            );
        }
    }
}

);
jQuery(document).ready(function() {
    jQuery('#resultLoading').css( {
        'width': '100%', 'height': '100%', 'position': 'fixed', 'z-index': '10000000', 'top': '0', 'left': '0', 'right': '0', 'bottom': '0', 'margin': 'auto'
    }
    );
    jQuery('#resultLoading .bg').css( {
        'background': '#000000', 'opacity': '0.8', 'width': '100%', 'height': '100%', 'position': 'absolute', 'top': '0'
    }
    );
    jQuery('#resultLoading>div:first').css( {
        'width': '54px', 'height': '58px', 'position': 'fixed', 'top': '0', 'left': '0', 'right': '0', 'bottom': '0', 'margin': 'auto', 'z-index': '10',
    }
    );
}

);
jobApp.directive('modalDialog', function() {
    return {
        restrict:'E', scope: {
            show: '=', close: '='
        }
        , replace:true, transclude:true, link:function(scope, element, attrs) {
            scope.dialogStyle= {}
            ;
            scope.dialogStyle.width='500px';
            if(attrs.width)scope.dialogStyle.width=attrs.width;
            if(attrs.height)scope.dialogStyle.height=attrs.height;
            if(attrs.header)scope.dialogHeader=attrs.header;
            if(attrs.content)scope.dialogContent=attrs.content;
            if(attrs.closeText)scope.closeText=attrs.closeText;
            scope.hideModal=function() {
                scope.show=false;
            }
            ;
        }
        , template:"<div class='ng-modal' ng-show='show'><div class='ng-modal-overlay'></div><div class='ng-modal-dialog' ng-style='dialogStyle'><span ng-if='close==true' class='ng-modal-close' ng-click='hideModal()'>X</span><h2 class='ng-modal-header' ng-if='dialogHeader'>{{dialogHeader}}</h2><div class='ng-modal-dialog-content'><p ng-if='dialogContent'>{{dialogContent}}</p><ng-transclude></ng-transclude><button type='button' ng-click='hideModal()' ng-if='closeText'>{{closeText}}</button></div></div></div>"
    }
}

);