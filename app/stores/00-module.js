'use strict';

angular.module('bby-query-mixer.stores', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/stores', {
            templateUrl: 'stores/stores.html',
            controller: 'storesCtrl'
        });
    }]
);
