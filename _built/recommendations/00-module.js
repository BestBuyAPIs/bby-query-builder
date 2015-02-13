'use strict';

angular.module('bby-query-mixer.recommendations', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/recommendations', {
            templateUrl: 'recommendations/recommendations.html',
            controller: 'RecommendationsCtrl'
        });
    }]
);