'use strict';

angular.module('bby-query-mixer.categories').controller('CategoriesCtrl', [
    '$scope',
    'HttpClientService',
    'GaService',
    'categoryResponseConfig',
    '$timeout',
    function ($scope, HttpClientService, GaService, categoryResponseConfig, $timeout) {

        $scope.categoryResponses = angular.copy(categoryResponseConfig);        

        $scope.searchOptions = [
            {text:"Choose a seach option", value:""},        
            {text:"All Categories", value:"allcategories", responseOptions:$scope.categoryResponses},
            {text:"Top Level Categories", value:"toplevelcategories", responseOptions:[$scope.categoryResponses[0],$scope.categoryResponses[1]]},
            {text:"Search By Category Name", value:"categoryname", responseOptions:$scope.categoryResponses},
            {text:"Search By Category Id", value:"categoryid", responseOptions:$scope.categoryResponses}
        ];

        $scope.buildRemixQuery = function () {
            var queryUrl = 'https://api.bestbuy.com/v1/categories';

            var topLevel = ($scope.searchSelection.value === 'toplevelcategories') ? queryUrl += '(id=abcat*)' : '';
            var addCategoryName = ($scope.categoryName.length > 0) ? queryUrl += '(name='+$scope.categoryName+'*)':''; 
            var addCategoryId = ($scope.categoryId.length > 0) ? queryUrl += '(id='+$scope.categoryId+')':'';

            var queryParams = '?';
            var addKey = $scope.apiKey ? queryParams += 'apiKey=' + $scope.apiKey : '';
            var pageSize = (($scope.pageSize)&&($scope.pageSize !== 10)) ? queryParams += '&pageSize='+$scope.pageSize:'';
            var whichPage = (($scope.whichPage)&&($scope.whichPage !== 1)) ? queryParams += '&page='+$scope.whichPage:'';
            
            var addShowOptions =  (($scope.categoryResponse.list.length > 0)||($scope.searchSelection.value ==='toplevelcategories')) ? 
                ($scope.searchSelection.value !=='toplevelcategories') ?
                (queryParams += '&show='+$scope.categoryResponse.list) :
                    (queryParams += '&show=id,name'):'';
            

            queryParams += '&callback=JSON_CALLBACK&format=json';

            return queryUrl + queryParams;
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

        $scope.preselectTop = function () {
            if ($scope.searchSelection.value === 'toplevelcategories') {
                $scope.categoryResponse.list = $scope.searchOptions[2].responseOptions.map(function (item) {
                    return item.value;
                });
            } else
            return
        };

        $scope.clearResponseList = function () {
            $scope.categoryResponse.list = [];
            $timeout(function(){$scope.preselectTop()},0);
        };

        $scope.resetInput = function () {
            $scope.categoryName = '';
            $scope.categoryId = '';
            $scope.whichPage = 1;
            $scope.pageSize = 10;
            $scope.clearResponseList();
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
                $scope.categoryResponse.list = [$scope.categoryResponses[0].value,$scope.categoryResponses[1].value];
            } else if (z !== 'noResponse'){
                $scope.categoryResponse.list = angular.copy($scope.categoryResponses).map(function (item) {
                    return item.value;
                });
            }else if (z === 'noResponse'){
                $scope.categoryResponse.list = [];
            }
            return;
        };

    }
]);
