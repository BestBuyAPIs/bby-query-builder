'use strict';

angular.module('bby-query-mixer.reviews').controller('ReviewsCtrl', [
    '$scope',
    'categoryConfig',
    'HttpClientService',
    'GaService',
    'ProductServices',
    'reviewAttributeOptionsConfig',
    'reviewShowOptionsConfig',
    function ($scope, categoryConfig, HttpClientService, GaService, ProductServices, reviewAttributeOptionsConfig, reviewShowOptionsConfig) {
                
        $scope.showOption = {};

        $scope.buildReviewsQuery = function () {
            var baseUrl = 'http://api.remix.bestbuy.com/v1/reviews';
            var addKey = $scope.apiKey ? baseUrl += ('?apiKey='+$scope.apiKey):'';
            baseUrl += '&callback=JSON_CALLBACK&format=json';
            return baseUrl;
        };

        $scope.invokeReviewsQuery = function () {
            $scope.results = "Running";
            var query = $scope.buildReviewsQuery();

            var successFn = function (value) {
                $scope.results = value;
            };
            var errorFn = function (httpResponse) {
                $scope.results = httpResponse;
            };

            if ($scope.apiKey !=  ""){
                $scope.errorResult = false;

                var eventActionName = "reviews query success";
                GaService.clickQueryButtonEvent(eventActionName, $scope.apiKey);

                HttpClientService.httpClient(query).jsonp_query(successFn, errorFn);
            } else if ($scope.apiKey ===  ""){
                $scope.errorResult = true;
                $scope.results = "Please enter your API Key";
            };
        };

        $scope.dynamicForms = [{id: '0',value:'',opt:'',complexVal:''}];
        var counter = 0;
        $scope.addNewForm = function () {
            counter += 1;
            $scope.dynamicForms.push({'id':''+(counter)});
        };
        $scope.removeForm = function(form) {
            var newItemNo = $scope.dynamicForms.length-1;
            $scope.dynamicForms.splice($scope.dynamicForms.indexOf(form),1);   
        };

        $scope.resetReviewsQuery = function () {
            $scope.whichPage = 1;
            $scope.pageSize = 10;
            $scope.attributeOptions = angular.copy(reviewAttributeOptionsConfig);
            $scope.attributeOption = $scope.attributeOptions[0];
            $scope.dynamicForms = [{value: $scope.attributeOption}];
            $scope.showOptions = angular.copy(reviewShowOptionsConfig);
            $scope.showOption.list = [];
            $scope.remixResults = {};
        };
        $scope.resetReviewsQuery();

        $scope.parseDynamicForms = ProductServices.parseDynamicForms();
        $scope.preselectOperator = ProductServices.preSelectOperator;

        $scope.selectAll = function (z) {
            if (z === 'allreviews') {
                $scope.showOption.list = angular.copy($scope.showOptions);
            } else if (z === 'noreviews') {
                $scope.showOption.list = [];
            } 
            return;
        };
}]);