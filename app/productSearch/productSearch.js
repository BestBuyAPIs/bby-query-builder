'use strict';

angular.module('bby-query-mixer.productSearch').controller('ProductSearchCtrl', [
    '$scope',
    'categoryConfig',
    '$http',
    '$resource',
    'showOptionsConfig',
    'attributeOptionsConfig',
    function ($scope, categoryConfig, $http, $resource, showOptionsConfig, attributeOptionsConfig) {
        $scope.categories = angular.copy(categoryConfig);
        $scope.showOptions = angular.copy(showOptionsConfig);
        $scope.attributeOptions = angular.copy(attributeOptionsConfig);

        var httpClient = function (query) {
            return $resource(query, {}, {
                jsonp_query: {
                    method: 'JSONP'
                }
            });
        };

        $scope.sortByOptions = [
            {text:"Best Selling Rank", value:"bestSellingRank"},
            {text:"Color", value:"color"},
            {text:"Name", value:"name"},
            {text:"SKU", value:"SKU"},
            {text:"Sale Price", value:"salePrice" }
        ];
        $scope.sortBy = $scope.sortByOptions[0];

        $scope.sortOrderOptions = [
            {text:"Ascending", value:"asc"},
            {text:"Descending", value:"dsc"}
        ];

        $scope.sortOrder = $scope.sortOrderOptions[0];

        $scope.option = {
            showOptions: ['sku', 'name','salePrice']
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
            var baseUrl = searchArgs.length > 0 ? 'https://api.remix.bestbuy.com/v1/products' + '(' + searchArgs.join('&') + ')' : 'https://api.remix.bestbuy.com/v1/products';
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
            if ($scope.apiKey) {
                $scope.errorResult = false;
            httpClient(query).jsonp_query(successFn, errorFn);
            }else{
                $scope.errorResult = true;
                $scope.remixResults = 'Please enter your API Key';
            }
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
            $scope.option = {
                showOptions: ['sku', 'name','salePrice']
            };
            $scope.whichPage = 1;
            $scope.sortOrder = 'asc';
            $scope.complexAttr = '';
            $scope.complexVal = '';
            $scope.pagesize =  10;
            $scope.attributeOption = $scope.attributeOptions[0];
            $scope.sortBy = $scope.sortByOptions[0];
            $scope.sortOrder = $scope.sortOrderOptions[0];
            $scope.remixResults = {};
            $scope.keywordSearch = '';
            $scope.errorResult = false;
        };
        //calling the function here loads the defaults on page load
        $scope.resetParams();

        $scope.preselectOperator = function() {
            console.log('yo');
            $scope.attributeOption.operator.value = $scope.attributeOption.operator[0].value
            // $scope.operator = $scope.attributeOption.operator[0].value
        };

    }
])
angular.module('bby-query-mixer.productSearch').directive("spaceless", function(){
   return {
      require: 'ngModel',
      link: function(scope, element, attrs, ngModelController) {
        ngModelController.$parsers.push(function(data) {
          //convert data from view format to model format
          return data.replace(/\s+/g, '&search='); //converted
        });
    
        ngModelController.$formatters.push(function(data) {
          //convert data from model format to view format
          return data.replace(/\s+/g, '&'); //converted
        });
      }
    };
});