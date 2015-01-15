'use strict';

// Declare app level module which depends on views, and components
angular.module('bby-query-mixer', [
    'ngRoute',
    'bby-query-mixer.productSearch',
    'bby-query-mixer.recommendations',
    'ngClipboard',
    'checklist-model',
    'ui.bootstrap',
    ])
    .config(['$routeProvider', 'ngClipProvider', function ($routeProvider, ngClipProvider) {
        $routeProvider.otherwise({redirectTo: '/productSearch'});
        ngClipProvider.setPath("bower_components/zeroclipboard/dist/ZeroClipboard.swf");
    }])
    .controller('pageController', ['$scope', function($scope){
    	$scope.apiKey = '';

    }])
    .controller('menuController', ['$scope', '$location', function($scope, $location) {
        $scope.isActive = function(route) {
            return route === $location.path();
        }
    }]);
