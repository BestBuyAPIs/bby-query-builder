'use strict';

angular.module('bby-query-mixer.reviews', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/reviews', {
            templateUrl: 'reviews/reviews.html',
            controller: 'ReviewsCtrl'
        });
    }]
);
