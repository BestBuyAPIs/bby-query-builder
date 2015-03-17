'use strict';

angular.module('bby-query-mixer.categories', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/categories', {
            templateUrl: 'categories/categories.html',
            controller: 'CategoriesCtrl'
        });
    }]
);