'use strict';

angular.module('bby-query-mixer.stores').controller('storesCtrl', [
    '$scope',
    'categoryConfig',
    'HttpClientService',
    'GaService',
    'regionsConfig',
    'storeServicesConfig',
    'storeResponseConfig',
    'productAttributesConfig',
    'StoreServices',
    'searchValueOptionsConfig',
    'storeTypesConfig',
    function ($scope, categoryConfig, HttpClientService, GaService, regionsConfig, storeServicesConfig, storeResponseConfig, productAttributesConfig, StoreServices, searchValueOptionsConfig,storeTypesConfig) {
        
        $scope.storeTypes = angular.copy(storeTypesConfig);

        $scope.options = angular.copy(searchValueOptionsConfig);

        $scope.filterStoreType = StoreServices.filterStoreType;
        $scope.filterStoreService = StoreServices.filterStoreService;

        $scope.buildRemixQuery = function () {
            var baseUrl = 'https://api.bestbuy.com/v1/stores';
            
            //searchArgs = optional search arguments like store type, store services, region, etc
            var searchArgs = [];
            var byCity = ($scope.searchSelection.value === 'city') ? (searchArgs.push('(city='+$scope.cityChoice+')')):'';
            var byPostalCode = (function () {
                if (($scope.zipCode)&&($scope.area !== '')) {
                   return (searchArgs.push('(area('+$scope.zipCode+','+$scope.area+'))')) ;
                } else if ($scope.zipCode) {
                   return (searchArgs.push('(postalCode='+$scope.zipCode+')')) ;
                }
            })();
            var lat = ($scope.latCompassDirection === 'south') ? '-'+ $scope.latitude: $scope.latitude;
            var long = ($scope.longCompassDirection === 'west') ? '-' + $scope.longitude : $scope.longitude;
            var area = ($scope.latLongArea) ? $scope.latLongArea : '';
            var byLatLong = (($scope.longitude)&&($scope.latitude)) ? searchArgs.push('(area('+lat+','+long+','+area+'))') :'';
            var byStoreId = ($scope.searchSelection.value === 'storeId') ? (searchArgs.push('(storeId='+$scope.storeId+')')):'';
            var byRegion = ($scope.searchSelection.value === 'region') ? (searchArgs.push('(region='+$scope.regionOption.value+')')) : '';
            
            var addStoreType = ($scope.storeType.list.length > 0) ? searchArgs.push(('('+$scope.filterStoreType($scope.storeType.list)+')')) : '';

            var addStoreServices = ((!$scope.searchSelection.value) && ($scope.servicesOption.list.length > 0)) ? searchArgs.push(($scope.filterStoreService($scope.servicesOption.list) )) :
                    (($scope.searchSelection.value) && ($scope.servicesOption.list.length > 0)) ? searchArgs.push('('+$scope.filterStoreService($scope.servicesOption.list)+')' ) : '' ;

            //queryParams are things like apikey, format, etc
            var queryParams = [];
            var skuListOption = $scope.skuList !== '' ? queryParams.push('+products(sku%20in%20('+$scope.skuList+'))') : '';

            queryParams.push('?')

            var addKey = $scope.apiKey ? queryParams.push(('apiKey='+$scope.apiKey)):'';

            var showParams = [];
            var productShowOptions = $scope.skuList !== '' ? showParams.push($scope.productOption.list):'';
            var addStoreResponseOptions = ($scope.storeResponse.list.length > 0) ? showParams.push($scope.storeResponse.list) : '';
            var addShowParams = showParams.length > 0 ? queryParams.push('&show='+showParams):'';

            var checkPageSize = (($scope.pageSize)&&($scope.pageSize !== 10)) ? queryParams.push('&pageSize='+$scope.pageSize) : '';
            var checkWhichPage = (($scope.whichPage)&&($scope.whichPage !== 1)) ? queryParams.push('&page='+$scope.whichPage) : '';
                        
            queryParams.push('&callback=JSON_CALLBACK&format=json');
            var parensCheck = searchArgs.length === 0 ? baseUrl += (searchArgs.join('')) : baseUrl += ('('+searchArgs.join('&')+')');
            baseUrl += queryParams.join('');
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

            if (($scope.apiKey !==  "")){
                $scope.errorResult = false;

                var eventActionName = "stores query success";
                GaService.clickQueryButtonEvent(eventActionName, $scope.apiKey);

                HttpClientService.httpClient(query).jsonp_query(successFn, errorFn);
            } else if ($scope.apiKey ===  ""){
                $scope.errorResult = true;
                $scope.results = "Please enter your API Key";
            } else {
                $scope.errorResult = true;
                $scope.results = "Please pick a search option";
            };
        };
            
        $scope.servicesOption = {};
        $scope.storeType = {};
        $scope.storeResponse = {};
        $scope.productOption = {};
        
        $scope.resetInput = function () {
            $scope.area = '';
            $scope.latLongArea = '';
            $scope.cityChoice = '';
            $scope.regionOption = $scope.regionOptions[0];
            $scope.storeId = '';
            $scope.longitude = '';
            $scope.latitude = '';
            $scope.zipCode = '';
        };

        $scope.resetParams = function () {
            $scope.searchSelection = $scope.options[0];
            $scope.regionOptions = angular.copy(regionsConfig);
            $scope.servicesOptions = angular.copy(storeServicesConfig);
            $scope.servicesOption.list = [];
            $scope.productOptions = angular.copy(productAttributesConfig);
            $scope.productOption.list = StoreServices.addAllOptions($scope.productOptions);
            $scope.whichPage = 1;
            $scope.pageSize = 10;
            $scope.storeResponses = angular.copy(storeResponseConfig);
            $scope.storeResponse.list = [];
            $scope.storeType.list = [];
            $scope.resetInput();
            $scope.errorResult = false;
            $scope.results = {};
            $scope.latCompassDirection = 'north';
            $scope.longCompassDirection = 'east';
            $scope.skuList = '';
        };


        $scope.resetParams();

        $scope.callCopyEvent = function () {
            var tab = "stores";
            GaService.copyUrlEvent(tab,$scope.apiKey);
        };

        $scope.selectAll = function (z) {
            if (z === 'services') {
                $scope.servicesOption.list = angular.copy($scope.servicesOptions).map(function (item) {
                    return item.value;
                });
            } else if (z === 'noservices') {
                $scope.servicesOption.list = [];
            } else if (z === 'types') {
                $scope.storeType.list = angular.copy($scope.storeTypes).map(function (item) {
                    return item.value;
                });
            } else if (z === 'notypes') {
                $scope.storeType.list = [];
            } else if (z === 'responseAttributes') {
                $scope.storeResponse.list = angular.copy($scope.storeResponses).map(function (item) {
                    return item.value;
                });
            } else if (z === 'noResponse') {
                $scope.storeResponse.list = [];
            } else if (z === 'products') {
                $scope.productOption.list = StoreServices.addAllOptions($scope.productOptions)
            } else if (z === 'noproducts'){
                $scope.productOption.list = [];
            }
            return;
        };
}]);