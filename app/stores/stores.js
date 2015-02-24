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
    function ($scope, categoryConfig, HttpClientService, GaService, regionsConfig, storeServicesConfig, storeResponseConfig, productAttributesConfig) {
        
        $scope.storeTypes = [
            { text:"Big Box", value: "bigbox" },
            { text: "Mobile", value: "mobile" },
            { text: "Express (Kiosk)", value: "express" }
        ];

        $scope.filterStoreType = function (storeTypesArray) {
            var newArray = [];
            angular.forEach(storeTypesArray, function(i) {this.push('(storeType='+i+')')}, newArray);
            return newArray.join('|');
        };

        $scope.filterStoreService = function (storeServiceArray) {
            var newArray = [];
            angular.forEach(storeServiceArray, function(i) {this.push('(services.service='+i+')')}, newArray);
            return newArray.join('&');
        };

        $scope.buildRemixQuery = function () {
            var baseUrl = 'http://api.remix.bestbuy.com/v1/stores';
            
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

            queryParams.push('?format=json');
            var productShowOptions = (($scope.productOption.list.length > 0)&&($scope.skuList !== '')) ? queryParams.push('&show='+$scope.productOption.list):'';
            var addKey = $scope.apiKey ? queryParams.push(('&apiKey='+$scope.apiKey)):'';
            var addStoreResponseOptions = ($scope.storeResponse.list.length > 0) ? queryParams.push(('&show=' + $scope.storeResponse.list)) : '';
            var addPagination = (($scope.pageSize !== 10) || ($scope.whichPage !== 1)) ? queryParams.push(('&pageSize='+$scope.pageSize+'&page='+$scope.whichPage)) :'';

            queryParams.push('&callback=JSON_CALLBACK');
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

            if (($scope.apiKey !==  "")&($scope.searchSelection.value !== 0)){
                $scope.errorResult = false;

                var eventActionName = "stores query success";
                GaService.clickQueryButtonEvent(eventActionName, $scope.apiKey);

                HttpClientService.httpClient(query).jsonp_query(successFn, errorFn);
            }else if ($scope.apiKey ===  ""){
                $scope.errorResult = true;
                $scope.results = "Please enter your API Key";
            } else {
                $scope.errorResult = true;
                $scope.results = "Please pick a search option";
            };
        };

        $scope.options = [
            {text:"Location Criteria", value:false},
            {text:"By City", value:"city"},
            {text:"By Postal Code", value:"postalCode"},
            {text:"By Latitude/Longitude", value:"latLong"},
            {text:"By StoreId", value:"storeId"},
            {text:"By Region/State", value:"region"}
        ];
            
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
            $scope.productOption.list = [];
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

        //this function lets us 'select' all options in an array of objects, instead of having to hardcode it
        var addAllOptions = function(optionArray) {
            var newArray = [];
            angular.forEach(optionArray, function(i) { this.push(i.value) }, newArray);
            return newArray;
        };


        $scope.selectAll = function (z) {
            if (z === 'services') {
                $scope.servicesOption.list = addAllOptions($scope.servicesOptions);
            } else if (z === 'noservices') {
                $scope.servicesOption.list = [];
            } else if (z === 'types') {
                $scope.storeType.list = addAllOptions($scope.storeTypes);
            } else if (z === 'notypes') {
                $scope.storeType.list = [];
            } else if (z === 'responseAttributes') {
                $scope.storeResponse.list = addAllOptions($scope.storeResponses);
            } else if (z === 'noResponse') {
                $scope.storeResponse.list = [];
            }
            return;
        };
}]);