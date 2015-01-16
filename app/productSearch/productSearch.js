'use strict';

angular.module('bby-query-mixer.productSearch').controller('ProductSearchCtrl', [
    '$scope',
    'categoryConfig',
    '$http',
    '$resource',
    'operatorOptionsConfig',
    'showOptionsConfig',
    'attributeOptionsConfig',
    function ($scope, categoryConfig, $http, $resource, operatorOptionsConfig, showOptionsConfig, attributeOptionsConfig) {
        $scope.categories = angular.copy(categoryConfig);
        $scope.category = $scope.categories[0];
        $scope.pagination = 'none';
        $scope.pagesize = 10;
        $scope.whichPage = 1;
        $scope.operatorOptions = angular.copy(operatorOptionsConfig);
        $scope.operatorOption = $scope.operatorOptions[0];
        $scope.showOptions = angular.copy(showOptionsConfig);
        $scope.attributeOptions = angular.copy(attributeOptionsConfig);
        $scope.attributeOption = $scope.attributeOptions[0];
        $scope.operator = $scope.attributeOption.operator[0]; 

        var httpClient = function (query) {
            return $resource(query, {}, {
                jsonp_query: {
                    method: 'JSONP'
                }
            });
        };

        $scope.sortByOptions = [
            {text:"Customer Top Rated", value:"customerTopRated"},
            {text:"SKU", value:"SKU"},
            {text:"Sale Price", value:"salePrice" }
        ];
        $scope.sortBy = $scope.sortByOptions[0];

        $scope.sortOrderOptions = [
            {text:"Ascending", value:"asc"},
            {text:"Descending", value:"desc"}
        ];

        $scope.sortOrder = $scope.sortOrderOptions[0];

        $scope.option = {
            showOptions: ['sku', 'name']
        };

        $scope.showMyOptions = $scope.option.showOptions.join(',');


        $scope.showOpts = function () {
            console.log($scope.option.showOptions);
        };

        $scope.buildRemixQuery = function () {
            var searchArgs = [];
            var keywordQuery = $scope.keywordSearch ? searchArgs.push( '(search=' + $scope.keywordSearch +')' ) :'' ;
            var attributeQuery = $scope.attributeOption.value ? searchArgs.push( '('+ $scope.attributeOption.value + $scope.operator.value + $scope.complexVal + ')' ): '';
            var categoryQuery = $scope.category.value ? searchArgs.push('(categoryPath.id=' + $scope.category.value + ')') : '';
            var baseUrl = 'https://api.remix.bestbuy.com/v1/products' + '(' + searchArgs.join('&') + ')';
            return baseUrl + $scope.buildParams();
        };

        $scope.invokeRemixQuery = function () {
            $scope.remixResults = "Running";
            var query = $scope.buildRemixQuery();
            var successFn = function (value) {
                $scope.remixResults = value;
            };
            var errorFn = function (httpResponse) {
                console.log('invokeRemixQuery failure: ' + JSON.stringify(httpResponse));
                $scope.remixResults = [
                    {error: httpResponse}
                ];
            }
            httpClient(query).jsonp_query(successFn, errorFn);
        };

        $scope.buildParams = function () {
            var paramArgs = [];

            if ($scope.apiKey) {
                paramArgs.push('apiKey=' + $scope.apiKey + '&callback=JSON_CALLBACK' );
            }

            if ($scope.sortBy.value && $scope.sortBy.value != 'none') {
                paramArgs.push('sort=' + $scope.sortBy.value + '.' + $scope.sortOrder.value);
            }

            paramArgs.push('show=' + $scope.option.showOptions.join(','));

            paramArgs.push('pageSize='+$scope.pagesize + '&page='+$scope.whichPage);

            paramArgs.push('format=json');

            if (paramArgs.length > 0) {
                return '?' + paramArgs.join('&');
            } else {
                return '';
            }
        };



        $scope.resetParams = function () {
            $scope.category = $scope.categories[0];
            $scope.operatorOption = $scope.operatorOptions[0];
            $scope.option = {
                showOptions: ['sku', 'name']
            };
            $scope.push = 10;
            $scope.whichPage = 1;
            $scope.sortBy = 'customerTopRated';
            $scope.sortOrder = 'asc';
            $scope.complexAttr = '';
            $scope.complexVal = '';
            $scope.pagesize =  10;
            $scope.attributeOption = $scope.attributeOptions[0];
            $scope.sortBy = $scope.sortByOptions[0];
            $scope.sortOrder = $scope.sortOrderOptions[0];
            $scope.remixResults = {};
            $scope.keywordSearch = '';


        };

    }
]);