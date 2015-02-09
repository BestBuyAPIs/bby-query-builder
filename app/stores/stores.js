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
            var baseUrl = 'http://api.remix.bestbuy.com/v1/stores';
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
            } else{
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
            $scope.searchSelection = $scope.options[0];
            $scope.regionOptions = angular.copy(regionsConfig);
            $scope.regionOption = $scope.regionOptions[0];
            $scope.servicesOptions = angular.copy(storeServicesConfig);
            $scope.servicesOption.list = [$scope.servicesOptions[0].value,$scope.servicesOptions[1].value];
            $scope.whichPage = 1;
            $scope.pageSize = 10;
            $scope.storeResponses = angular.copy(storeResponseConfig);
            $scope.storeType.list = [$scope.storeTypes[0].value];
            $scope.storeResponse.list = [$scope.storeResponses[0].value,$scope.storeResponses[1].value,$scope.storeResponses[2].value];
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
            }
            return;
        };
}]);