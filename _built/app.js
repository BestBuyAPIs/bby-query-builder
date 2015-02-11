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
    'ngCookies'
    ])
    .config(['$routeProvider', 'ngClipProvider', function ($routeProvider, ngClipProvider) {
        $routeProvider.otherwise({redirectTo: '/productSearch'});
        ngClipProvider.setPath("bower_components/zeroclipboard/dist/ZeroClipboard.swf");
    }])
    .controller('pageController', ['$scope', 'GaService', '$cookies', function($scope, GaService, $cookies){
    	$scope.apiKey = $cookies.apiKey || '';

        $scope.$watch('apiKey', function (key) {
            $cookies.apiKey = key;
            GaService.enterKeyEvent(key);
        });
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
                //'dimension1' was registered as 'api key' in the google analytics admin console
                ga('set', 'dimension1', dimension1Value);
                ga('send', 'pageview');
            });
        }
    }
}]);
