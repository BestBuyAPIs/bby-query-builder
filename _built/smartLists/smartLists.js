'use strict';

angular.module('bby-query-mixer.smartLists').controller('SmartListsCtrl', [
    '$scope',
    'categoryConfig',
    'HttpClientService',
    'GaService',
    function ($scope, categoryConfig, HttpClientService, GaService) {
        //http://api.bestbuy.com/beta/products/connectedHome?apiKey=YourAPIKey

        $scope.buildSmartListsQuery = function () {
            var baseUrl = 'http://api.bestbuy.com/beta/products/';
            var queryArgs = [];
            var endpointSelection = $scope.endpoint.selected ? baseUrl += ($scope.endpoint.selected) : '';
            var addKey = $scope.apiKey ? baseUrl += ('?apiKey='+$scope.apiKey):'';
            baseUrl += '&callback=JSON_CALLBACK';
            return baseUrl;
        };

        $scope.invokeRecommendationsQuery = function () {
            $scope.results = "Running";
            var query = $scope.buildSmartListsQuery();

            var successFn = function (value) {
                $scope.results = value;
            };
            var errorFn = function (httpResponse) {
                $scope.results = httpResponse;
            };

            if (($scope.apiKey !=  "")&($scope.endpoint.selected != "")){
                $scope.errorResult = false;

                var eventActionName = "smart lists query success";
                GaService.clickQueryButtonEvent(eventActionName, $scope.apiKey);

                HttpClientService.httpClient(query).jsonp_query(successFn, errorFn);
            }else if ($scope.apiKey ===  ""){
                $scope.errorResult = true;
                $scope.results = "Please enter your API Key";
            } else{
                $scope.errorResult = true;
                $scope.results = "Please pick an endpoint";
            };
        };

        $scope.resetSmartListsQuery = function () {
            $scope.results = {};
            $scope.endpoint = {selected:""};
            $scope.errorResult = false;
        };

        $scope.callCopyEvent = function () {
            var tab = "smart lists";
            GaService.copyUrlEvent(tab,$scope.apiKey);
        };

        //this loads our default model scopes on page load
        $scope.resetSmartListsQuery();

}]);