'use strict';

// Declare app level module which depends on views, and components
angular.module('bby-query-mixer', [
    'ngRoute',
    'bby-query-mixer.productSearch',
    'bby-query-mixer.recommendations',
    'bby-query-mixer.openBox',
    'ngClipboard',
    'checklist-model',
    'ui.bootstrap',
    'appConfig',
    'appServices',
    ])
    .config(['$routeProvider', 'ngClipProvider', function ($routeProvider, ngClipProvider) {
        $routeProvider.otherwise({redirectTo: '/productSearch'});
        ngClipProvider.setPath("bower_components/zeroclipboard/dist/ZeroClipboard.swf");
    }])
    .controller('pageController', ['$scope', 'GaService', function($scope, GaService){
    	$scope.apiKey = '';
        $scope.callWatchApiKey = function(){
            GaService.enterKeyEvent($scope.apiKey);
        };
    }])
    .controller('menuController', ['$scope', '$location', function($scope, $location) {
        $scope.isActive = function(route) {
            return route === $location.path();
        }
    }])
    .directive('analytics', ['$rootScope', '$location',
    function ($rootScope, $location) {
    return {
        link: function (scope, elem, attrs, ctrl) {
            $rootScope.$on('$routeChangeSuccess', function(event, currRoute, prevRoute) {
                ga('set', 'page', $location.path());
                var dimension1Value = '';
                ga('set', 'dimension1', dimension1Value);
                ga('send', 'pageview');
            });
        }
    }
}]);
