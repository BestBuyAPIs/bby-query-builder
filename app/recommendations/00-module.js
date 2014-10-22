'use strict';

angular.module('bby-query-mixer.recommendations', ['ngRoute', 'ngResource'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/recommendations', {
            templateUrl: 'recommendations/recommendations.html',
            controller: 'RecommendationsCtrl'
        });
    }]
);