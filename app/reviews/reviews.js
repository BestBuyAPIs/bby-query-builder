'use strict';

angular.module('bby-query-mixer.reviews').controller('ReviewsCtrl', [
    '$scope',
    'categoryConfig',
    'HttpClientService',
    'GaService',
    'reviewAttributeOptionsConfig',
    'reviewShowOptionsConfig',
    'ReviewServices',
    'sortOrderConfig',
    function ($scope, categoryConfig, HttpClientService, GaService, reviewAttributeOptionsConfig, reviewShowOptionsConfig, ReviewServices, sortOrderConfig) {
                
        $scope.showOption = {};
        $scope.sortOptions = {};
        $scope.sortOrderOptions = angular.copy(sortOrderConfig);

        $scope.buildReviewsQuery = function () {

            var searchArgs = [];
            var manyAttributes = $scope.dynamicForms[0].value.reviewAttribute ? searchArgs.push($scope.parseDynamicForms($scope.dynamicForms)) : '';

            var baseUrl = searchArgs.length > 0 ? 'https://api.remix.bestbuy.com/v1/reviews' + '(' + searchArgs.join('&') + ')' : 'https://api.remix.bestbuy.com/v1/reviews';
            var addKey = $scope.apiKey ? baseUrl += ('?apiKey='+$scope.apiKey):'';

            var checkPageSize = (($scope.pageSize)&&($scope.pageSize !== 10)) ? baseUrl +=('&pageSize='+$scope.pageSize) : '';
            var checkWhichPage = (($scope.whichPage)&&($scope.whichPage !== 1)) ? baseUrl +=('&page='+$scope.whichPage) : '';
            var sortBy = ($scope.sortBy && $scope.sortBy.value) ? baseUrl += ('sort=' + $scope.sortBy.value + '.' + $scope.sortOrder.value):'';

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
            $scope.results = {};
            $scope.errorResult = false;
            $scope.sortOrder = $scope.sortOrderOptions[0];
            $scope.sortByOptions = angular.copy(sortOrderConfig);
            $scope.sortBy = $scope.sortOptions[0];
        };
        $scope.resetReviewsQuery();

        $scope.parseDynamicForms = ReviewServices.parseDynamicForms;
        $scope.preselectOperator = ReviewServices.preSelectOperator;
        $scope.addAllShowOptions = ReviewServices.addAllShowOptions;


        $scope.selectAll = function (z) {
            if (z === 'allreviews') {
                $scope.showOption.list = angular.copy($scope.showOptions);
            } else if (z === 'noreviews') {
                $scope.showOption.list = [];
            } 
            return;
        };
        $scope.clearBlankSelect = function () {
            $scope.sortOptions.list = ReviewServices.restrictReviewsSortOptionLists($scope.showOption.list);
            $scope.sortBy = $scope.sortOptions.list[0];
        };
}]);