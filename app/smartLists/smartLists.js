'use strict';

angular.module('bby-query-mixer.smartLists').controller('SmartListsCtrl', [
    '$scope',
    'categoryConfig',
    'HttpClientService',
    'GaService',
    function ($scope, categoryConfig, HttpClientService, GaService) {
        //http://api.bestbuy.com/beta/products/connectedHome?apiKey=YourAPIKey
        var baseUrl = 'http://api.bestbuy.com/beta/products/';
}]);