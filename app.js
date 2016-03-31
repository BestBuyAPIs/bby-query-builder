'use strict';

// Declare app level module which depends on views, and components.
angular.module('bby-query-mixer', [
    'ngRoute',
    'ngSanitize',
    'bby-query-mixer.productSearch',
    'bby-query-mixer.recommendations',
    'bby-query-mixer.openBox',
    'bby-query-mixer.stores',
    'bby-query-mixer.smartLists',
    'bby-query-mixer.categories',
    'ngClipboard',
    'ui.bootstrap',
    'ui.select',
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
}])
    .filter('propsFilter', function() {
      return function(items, props) {
        var out = [];

        if (angular.isArray(items)) {
          items.forEach(function(item) {
            var itemMatches = false;

            var keys = Object.keys(props);
            for (var i = 0; i < keys.length; i++) {
              var prop = keys[i];
              var text = props[prop].toLowerCase();
              if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
                itemMatches = true;
                break;
              }
            }

            if (itemMatches) {
              out.push(item);
            }
          });
        } else {
          // Let the output be the input untouched
          out = items;
        }

        return out;
      };
});
