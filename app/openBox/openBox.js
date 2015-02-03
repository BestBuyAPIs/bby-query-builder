'use strict';

angular.module('bby-query-mixer.openBox').controller('openBoxCtrl', [
    '$scope',
    'categoryConfig',
    'HttpClientService',
    'GaService',
    function ($scope, categoryConfig, HttpClientService, GaService) {
        $scope.categories = angular.copy(categoryConfig);
        $scope.category = $scope.categories[0];

        $scope.options = [
            { text: "Select an Open Box Search Option", value: 0 },
        	{ text: "Open Box Offers All SKUs", value: 'allSkus' },
        	{ text: "Open Box Offers by Category", value: 'category' },
        	{ text: "Open Box Offers by List of SKUs", value: 'skuList' },
        	{ text: "Open Box Offers by SKU", value: 'singleSku' }
        ];
        
        $scope.buildRemixQuery = function () {
            var baseUrl = 'http://api.bestbuy.com/beta/products/openBox'
            var categoryQuery = (($scope.searchSelection.value === 'category')&& $scope.category.value) ? baseUrl += '(categoryId='+$scope.category.value+')' :'';
            var skuListQuery = (($scope.searchSelection.value === 'skuList')&&($scope.skuList)) ? baseUrl += '(sku%20in('+$scope.skuList+')':'';
            var singleSkuQuery = (($scope.searchSelection.value === 'singleSku')&&($scope.singleSku)) ? baseUrl = 'http://api.bestbuy.com/beta/products/'+$scope.singleSku +'/openBox' : '';
            var apiKey = $scope.apiKey ? baseUrl += '?apiKey='+$scope.apiKey : '';
            baseUrl += '&callback=JSON_CALLBACK' + '&pageSize='+$scope.pageSize+'&page='+$scope.whichPage;
            return baseUrl
        };

        $scope.invokeRemixQuery = function () {
            $scope.results = "Running";
            var query = $scope.buildRemixQuery();
            var successFn = function (value) {
                $scope.results = value;
            };
            var errorFn = function (httpResponse) {
                $scope.results = httpResponse;
            };

            if (($scope.apiKey !==  "")&($scope.searchSelection.value !== 0)){
                $scope.errorResult = false;

                var eventActionName = "open box query success";
                GaService.clickQueryButton(eventActionName, $scope.apiKey);

                HttpClientService.httpClient(query).jsonp_query(successFn, errorFn);
            }else if ($scope.apiKey ===  ""){
                $scope.errorResult = true;
                $scope.results = "Please enter your API Key";
            } else{
                $scope.errorResult = true;
                $scope.results = "Please pick a search option";
            };
        };

        $scope.searchSelection = $scope.options[0];

        $scope.resetParams = function () {
            $scope.errorResult = false;
            $scope.results = {};
        	$scope.pageSize = 10;
        	$scope.whichPage = 1;
        	$scope.searchSelection = $scope.options[0];
            $scope.skuList = '';
            $scope.resetSelectionValues();
        };
        $scope.resetSelectionValues = function () {
            $scope.skuList = '';
            $scope.singleSku = '';
            $scope.category = $scope.categories[0];
        };

        $scope.resetParams();
}]);