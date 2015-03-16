'use strict';

angular.module('bby-query-mixer.categories').controller('CategoriesCtrl', [
    '$scope',
    'HttpClientService',
    'GaService',
    'categoryResponseConfig',
    function ($scope, HttpClientService, GaService, categoryResponseConfig) {

            $scope.categoryResponses = angular.copy(categoryResponseConfig);


        $scope.searchOptions = [
            {text:"Choose a seach option", value:""},        
            {text:"All Categories", value:"allcategories", responseOptions:$scope.categoryResponses},
            {text:"Top Level Categories", value:"toplevelcategories", responseOptions:[$scope.categoryResponses[0],$scope.categoryResponses[1]]},
            {text:"Search By Category Name", value:"categoryname", responseOptions:$scope.categoryResponses},
            {text:"Search By Category Id", value:"categoryid", responseOptions:$scope.categoryResponses}
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
            queryParams += '&callback=JSON_CALLBACK&format=json';

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
            } else if ($scope.apiKey ===  ""){
                $scope.errorResult = true;
                $scope.results = "Please enter your API Key";
            } else {
                $scope.errorResult = true;
                $scope.results = "Please pick a search option";
            };
        };

        $scope.resetInput = function () {
            $scope.categoryName = '';
            $scope.categoryId = '';
            // $scope.categoryResponse.list = [];
            $scope.whichPage = 1;
            $scope.pageSize = 10;
            var toplevelcats = ($scope.searchSelection.value ==='toplevelcategories')
                ? $scope.selectAll("toplevelcategories") : $scope.categoryResponse.list = [];
        };

        $scope.categoryResponse = {};

        $scope.resetParams = function () {
            $scope.categoryName = '';
            $scope.categoryId = '';
            $scope.pageSize = 10;
            $scope.whichPage = 1;
            $scope.categoryResponses = angular.copy(categoryResponseConfig);
            $scope.categoryResponse.list = [];
            $scope.searchSelection = $scope.searchOptions[0];
            $scope.resetInput();
        };
        //calling the function here loads the defaults on page load
        $scope.resetParams();

        $scope.selectAll = function (z) {
            if (z === 'toplevelcategories') {
                $scope.categoryResponse.list = [$scope.categoryResponses[0],$scope.categoryResponses[1]];
            } else if (z !== 'noResponse'){
                $scope.categoryResponse.list = angular.copy($scope.categoryResponses);
            }else if (z === 'noResponse'){
                $scope.categoryResponse.list = [];
            }
            return;
        };

    }
]);
