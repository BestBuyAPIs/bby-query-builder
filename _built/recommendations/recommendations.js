'use strict';

angular.module('bby-query-mixer.recommendations').controller('RecommendationsCtrl', [
    '$scope',
    'categoryConfig',
    'HttpClientService',
    'GaService',
    function ($scope, categoryConfig, HttpClientService, GaService) {
        $scope.categories = angular.copy(categoryConfig);
        $scope.category = $scope.categories[0];

        $scope.buildRecommendationsQuery = function () {
            var baseUrl = 'http://api.bestbuy.com/beta/products/';
            var queryArgs = [];
            var endpointSelection = $scope.endpoint.selected ? baseUrl += ($scope.endpoint.selected) : '';
            var categoryOption = $scope.category.value ? baseUrl += ('(categoryId='+$scope.category.value+')') : '';
            var addKey = $scope.apiKey ? baseUrl += ('?apiKey='+$scope.apiKey):'';
            baseUrl += '&callback=JSON_CALLBACK';
            return baseUrl;
        };

        $scope.invokeRecommendationsQuery = function () {
            $scope.results = "Running";
            var query = $scope.buildRecommendationsQuery();

            var successFn = function (value) {
                $scope.results = value;
            };
            var errorFn = function (httpResponse) {
                $scope.results = httpResponse;
            };

            if (($scope.apiKey !=  "")&($scope.endpoint.selected != "")){
                $scope.errorResult = false;

                var eventActionName = "recommendation query success";
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

        $scope.isRemixQueryButtonDisabled = function () {
            return ($scope.skuList == recommendationsConfig.skuList);
        };

        $scope.resetRecommendationsQuery = function () {
            $scope.results = {};
            $scope.endpoint = {selected:""};
            $scope.category = $scope.categories[0];
            $scope.errorResult = false;
        };

        $scope.callCopyEvent = function () {
            var tab = "recommendations";
            GaService.copyUrlEvent(tab,$scope.apiKey);
        };

        //this loads our default model scopes on page load
        $scope.resetRecommendationsQuery();

    }
]);