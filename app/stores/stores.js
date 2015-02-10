'use strict';

angular.module('bby-query-mixer.stores').controller('storesCtrl', [
    '$scope',
    'categoryConfig',
    'HttpClientService',
    'GaService',
    'regionsConfig',
    'storeServicesConfig',
    'storeResponseConfig',
    function ($scope, categoryConfig, HttpClientService, GaService, regionsConfig, storeServicesConfig, storeResponseConfig) {
        
        $scope.storeTypes = [
            { text:"Big Box", value: "bigbox" },
            { text: "Mobile", value: "mobile" },
            { text: "Express", value: "express" }
        ];

        $scope.buildRemixQuery = function () {
            var baseUrl = 'http://api.remix.bestbuy.com/v1/stores(';
            
            var byCity = ($scope.searchSelection.value === 'city') ? (baseUrl +='(city='+$scope.cityChoice+')'):'';
            
            var byPostalCode = (function () {
                if (($scope.zipCode)&&($scope.area !== '')) {
                   return (baseUrl += '(area('+$scope.zipCode+','+$scope.area+'))') ;
                } else if ($scope.zipCode) {
                   return (baseUrl += '(postalCode='+$scope.zipCode+')') ;
                }
            })();

            var lat = ($scope.latCompassDirection === 'south') ? '-'+ $scope.latitude: $scope.latitude;
            var long = ($scope.longCompassDirection === 'west') ? '-' + $scope.longitude : $scope.longitude;
            var area = ($scope.latLongArea) ? $scope.latLongArea : '';
            var byLatLong = (($scope.longitude)&&($scope.latitude)) ? baseUrl += '(area('+lat+','+long+','+area+'))' :'';

            var byStoreId = ($scope.searchSelection.value === 'storeId') ? (baseUrl += '(storeId='+$scope.storeId+')'):'';

            var byRegion = ($scope.searchSelection.value === 'region') ? (baseUrl += '(region='+$scope.regionOption.value+')') : '';
            

            //&( (storeType=mobile) | (storeType=bigbox) )
            //then we need to join it with '|' and add it to the url
            var filterStoreType = function (storeTypesArray) {
                var newArray = [];
                angular.forEach(storeTypesArray, function(i) {this.push('(storeType='+i+')')}, newArray);
                return newArray.join('|');
            };
            var addStoreType = ($scope.storeType.list.length > 0) ? baseUrl+=('&('+filterStoreType($scope.storeType.list)+')') : '';


            //((services.service=Windows)&(services.service=Apple%20Shop))
            var filterStoreService = function (storeServiceArray) {
                var newArray = [];
                angular.forEach(storeServiceArray, function(i) {this.push('(services.service='+i+')')}, newArray);
                return newArray.join('&');
            };
            var addStoreServices = ($scope.servicesOption.list.length > 0) ? baseUrl += ('&('+filterStoreService($scope.servicesOption.list)+')' ) :'';


            baseUrl += ')?format=json';
            var addKey = $scope.apiKey ? baseUrl += ('&apiKey='+$scope.apiKey):'';

            var addStoreResponseOptions = ($scope.storeResponse.list.length > 0) ? baseUrl += ('&show=' + $scope.storeResponse.list) : '';


            baseUrl += '&callback=JSON_CALLBACK';
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

        $scope.resetParams = function () {
            $scope.cityChoice = '';
            $scope.area = '';
            $scope.searchSelection = $scope.options[0];
            $scope.regionOptions = angular.copy(regionsConfig);
            $scope.regionOption = $scope.regionOptions[0];
            $scope.servicesOptions = angular.copy(storeServicesConfig);
            $scope.whichPage = 1;
            $scope.pageSize = 10;
            $scope.storeResponses = angular.copy(storeResponseConfig);

            $scope.servicesOption.list = [$scope.servicesOptions[0].value];
            //$scope.servicesOption.list = [$scope.servicesOptions[0].value,$scope.servicesOptions[1].value];

            // $scope.storeType.list = [];
            $scope.storeType.list = [];
            
            $scope.storeResponse.list = [];
            //$scope.storeResponse.list = [$scope.storeResponses[0].value,$scope.storeResponses[1].value,$scope.storeResponses[2].value];
        };


        $scope.resetParams();

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
            }
            return;
        };
}]);