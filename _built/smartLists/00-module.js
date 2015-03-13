'use strict';

angular.module('bby-query-mixer.smartLists', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/smartlists', {
            templateUrl: 'smartLists/smartLists.html',
            controller: 'SmartListsCtrl'
        });
    }]
);
