'use strict';

angular.module('bby-query-mixer.categories').controller('CategoriesCtrl', [
    '$scope',
    'HttpClientService',
    'GaService',
    'categoryResponseConfig',
    function ($scope, HttpClientService, GaService, categoryResponseConfig) {

        $scope.searchOptions = [
            {text:"Choose a seach option", value:""},        
            {text:"All Categories", value:"allcategories"},
            {text:"Top Level Categories", value:"toplevelcategories"},
            {text:"Search By Category Name", value:"categoryname"},
            {text:"Search By Category Id", value:"categoryid"}
        ];

        $scope.buildRemixQuery = function () {
            var queryUrl = 'http://api.remix.bestbuy.com/v1/categories';

            var topLevel = ($scope.searchSelection.value === 'toplevelcategories') ? queryUrl += '(id=abcat*)' : '';
            var addCategoryName = ($scope.categoryName.length > 0) ? queryUrl += '(name='+$scope.categoryName+'*)':''; 
            var addCategoryId = ($scope.categoryId.length > 0) ? queryUrl += '(id='+$scope.categoryId+')':'';

            var queryParams = '?';
            var addKey = $scope.apiKey ? queryParams += 'apiKey=' + $scope.apiKey : '';
            var pageSize = (($scope.pageSize)&&($scope.pageSize !== 10)) ? queryParams += '&pageSize='+$scope.pageSize:'';
            var whichPage = (($scope.whichPage)&&($scope.whichPage !== 1)) ? queryParams += '&page='+$scope.whichPage:'';
            var addShowOptions =  ($scope.categoryResponse.list.length > 0) ? queryParams += '&show='+$scope.categoryResponse.list :'';
            queryParams += '&format=json&callback=JSON_CALLBACK';

            return queryUrl + queryParams;
        };

        $scope.buildParams = function () {
           
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

            if (($scope.apiKey !==  "")&($scope.searchSelection.value !== '')){
                $scope.errorResult = false;

                var eventActionName = "categories query success";
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

        $scope.categoryResponse = {};

        $scope.resetParams = function () {
            $scope.categoryName = '';
            $scope.categoryId = '';
            $scope.pageSize = 10;
            $scope.whichPage = 1;
            $scope.categoryResponse.list = [];
            $scope.categoryResponses = angular.copy(categoryResponseConfig);
            $scope.searchSelection = $scope.searchOptions[0];
        };
        //calling the function here loads the defaults on page load
        $scope.resetParams();

        $scope.addAllOptions = function(optionArray) {
            var newArray = [];
            angular.forEach(optionArray, function(i) { this.push(i.value) }, newArray);
            return newArray;
        };

        $scope.selectAll = function (z) {
            if (z === 'categoryAttributes') {
                $scope.categoryResponse.list = $scope.addAllOptions($scope.categoryResponses);
            } else if (z === 'noResponse'){
                $scope.categoryResponse.list = [];
            }
            return;
        };

    }
]);
