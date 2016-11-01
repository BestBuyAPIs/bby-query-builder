'use strict';

angular.module('bby-query-mixer.openBox').controller('openBoxCtrl', [
    '$scope',
    'categoryConfig',
    'HttpClientService',
    'GaService',
    'searchOptions',
    function ($scope, categoryConfig, HttpClientService, GaService, searchOptions) {
        $scope.categories = angular.copy(categoryConfig);
        $scope.category = $scope.categories[0];

        $scope.options = angular.copy(searchOptions);

        $scope.buildRemixQuery = function () {
            var baseUrl = 'https://api.bestbuy.com/beta/products/openBox'
            var categoryQuery = (($scope.searchSelection.value === 'category')&& $scope.category.value) ? baseUrl += '(categoryId='+$scope.category.value+')' :'';
            var skuListQuery = (($scope.searchSelection.value === 'skuList')&&($scope.skuList)) ? baseUrl += '(sku%20in('+$scope.skuList+'))':'';
            var singleSkuQuery = (($scope.searchSelection.value === 'singleSku')&&($scope.singleSku)) ? baseUrl = 'https://api.bestbuy.com/beta/products/'+$scope.singleSku +'/openBox' : '';
            var apiKey = $scope.apiKey ? baseUrl += '?apiKey='+$scope.apiKey : '';
        
            
            var checkPageSize = (($scope.pageSize)&&($scope.pageSize !== 10)) ? baseUrl += '&pageSize='+$scope.pageSize : '';
            var checkWhichPage = (($scope.whichPage)&&($scope.whichPage !== 1)) ? baseUrl += '&page='+$scope.whichPage : '';
            
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
                GaService.clickQueryButtonEvent(eventActionName, $scope.apiKey);

                HttpClientService.httpClient(query).get(successFn, errorFn);
            }else if ($scope.apiKey ===  ""){
                $scope.errorResult = true;
                $scope.results = "Please enter your API Key";
            } else{
                $scope.errorResult = true;
                $scope.results = "Please pick a search option";
            };
        };

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

        $scope.callCopyEvent = function () {
            var tab = "open box";
            GaService.copyUrlEvent(tab,$scope.apiKey);
        };
}]);