'use strict';

angular.module('bby-query-mixer.productSearch').controller('ProductSearchCtrl', [
    '$scope',
    'categoryConfig',
    '$http',
    '$resource',
    function ($scope, categoryConfig, $http, $resource) {
        $scope.categories = angular.copy(categoryConfig);
        $scope.category = $scope.categories[0];
        $scope.sortBy = 'none';
        $scope.sortOrder = 'asc';
        $scope.pagination = 'none';
        $scope.pagesize = 10;
        $scope.whichPage = 1;


        var httpClient = function (query) {
            return $resource(query, {}, {
                jsonp_query: {
                    method: 'JSONP'
                }
            });
        };

        $scope.showOptions = [
            { text: 'sku', value: 'sku' },
            { text: 'name', value: 'name' },
            { text: 'regularPrice', value: 'regularPrice' },
            { text: 'shortDescription', value: 'shortDescription' },
            { text: 'weight', value: 'weight' },
            { text: 'height', value: 'height' },
            { text: 'longDescription', value: 'longDescription' },
            { text: 'platform', value: 'platform'}
        ];

        $scope.option = {
            showOptions: ['sku', 'name']
        };

        $scope.operatorOptions = [
            {text: "Equals : equals", value:"="},
            {text: "Pipe : Any", value:"|"},
            {text:"Greater than: >", value:">"},
            {text:"Less than: <", value:"<"},
            {text:"Greater than or equal to: >=", value:">="},
            {text:"Less than or equal to: <=", value:"<="},
            {text:"In", value:" in "}

        ];
        $scope.operatorOption = $scope.operatorOptions[0];

        $scope.showMyOptions = $scope.option.showOptions.join(',');


        $scope.showOpts = function () {
            console.log($scope.option.showOptions);
        };

        $scope.buildRemixQuery = function () {
            var complexQuery = $scope.complexAttr ? '&('+ $scope.complexAttr + $scope.operatorOption.value + $scope.complexVal + ')' : '';
            var baseUrl = 'https://api.remix.bestbuy.com/v1/products' + ($scope.category.value ? '(categoryPath.id=' + $scope.category.value + complexQuery +')' : '');
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

            if ($scope.sortBy && $scope.sortBy != 'none') {
                paramArgs.push('sort=' + $scope.sortBy + '.' + $scope.sortOrder);
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
    }
]);