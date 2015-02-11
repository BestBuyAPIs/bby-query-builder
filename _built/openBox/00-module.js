'use strict';

angular.module('bby-query-mixer.openBox', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/openbox', {
            templateUrl: 'openBox/openBox.html',
            controller: 'openBoxCtrl'
        });
    }]
);