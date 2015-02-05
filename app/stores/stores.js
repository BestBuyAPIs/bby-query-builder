'use strict';

angular.module('bby-query-mixer.stores').controller('storesCtrl', [
    '$scope',
    'categoryConfig',
    'HttpClientService',
    'GaService',
    'regionsConfig',
    'storeServicesConfig',
    function ($scope, categoryConfig, HttpClientService, GaService, regionsConfig, storeServicesConfig) {
        
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

        $scope.resetParams = function () {
            $scope.searchSelection = $scope.options[0];
            $scope.regionOptions = angular.copy(regionsConfig);
            $scope.regionOption = $scope.regionOptions[0];
            $scope.servicesOptions = angular.copy(storeServicesConfig);
            //$scope.servicesOption = $scope.servicesOptions[0];
            $scope.servicesOption.list = [$scope.servicesOptions[0].value,$scope.servicesOptions[1].value,$scope.servicesOptions[3].value]
            $scope.whichPage = 1;
            $scope.pageSize = 10;
            $scope.storeType.list = [$scope.storeTypes[0].value]
        };


        $scope.resetParams();

        $scope.callCopyEvent = function () {
            var tab = "stores";
            GaService.copyUrlEvent(tab,$scope.apiKey);
        };

}]);