'use strict';

angular.module('bby-query-mixer.productSearch').controller('ProductSearchCtrl', [
    '$scope',
    'categoryConfig',
    'showOptionsConfig',
    'attributeOptionsConfig',
    'HttpClientService',
    'GaService',
    'ProductServices',
    'sortOrderConfig',
    'AddAllShowOptionsService',
    'PreSelectOperatorService',
    function ($scope, categoryConfig, showOptionsConfig, attributeOptionsConfig, HttpClientService, GaService, ProductServices, sortOrderConfig, AddAllShowOptionsService, PreSelectOperatorService) {
        $scope.categories = angular.copy(categoryConfig);
        $scope.showOptions = angular.copy(showOptionsConfig);
        $scope.attributeOptions = angular.copy(attributeOptionsConfig);

        $scope.sortOrderOptions = angular.copy(sortOrderConfig);

        $scope.buildRemixQuery = function () {
            var searchArgs = [];
            var keywordQuery = $scope.keywordSearch ? searchArgs.push( '(search=' + $scope.keywordSearch +')' ) :'' ;

            var manyAttributes = $scope.dynamicForms[0].value.productAttribute ? searchArgs.push($scope.parseDynamicForms($scope.dynamicForms)) : '';

            var categoryQuery = $scope.category.value ? searchArgs.push('(categoryPath.id=' + $scope.category.value + ')') : '';
            var baseUrl = searchArgs.length > 0 ? 'https://api.bestbuy.com/v1/products' + '(' + searchArgs.join('&') + ')' : 'https://api.bestbuy.com/v1/products';
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

                var eventActionName = "products query success";
                GaService.clickQueryButtonEvent(eventActionName, $scope.apiKey);

                HttpClientService.httpClient(query).jsonp_query(successFn, errorFn);
            }else{
                $scope.errorResult = true;
                $scope.remixResults = 'Please enter your API Key';
            }
        };

        $scope.buildParams = function () {
            var paramArgs = [];

            if ($scope.apiKey) {
                paramArgs.push('apiKey=' + $scope.apiKey );
            }

            if ($scope.sortBy && $scope.sortBy != 'none') {
                paramArgs.push('sort=' + $scope.sortBy.value + '.' + $scope.sortOrder.value);
            }

            if ($scope.showOption.list.length > 0){
                paramArgs.push('show=' + ProductServices.addAllOptionValues($scope.showOption.list));
            };
            if (($scope.facetAttribute.productAttribute)&&($scope.facetNumber)){
                paramArgs.push('facet=' + $scope.facetAttribute.productAttribute + ',' + $scope.facetNumber);
            } else if($scope.facetAttribute.productAttribute){
                paramArgs.push('facet=' + $scope.facetAttribute.productAttribute);
            };

            var checkPageSize = (($scope.pageSize)&&($scope.pageSize !== 10)) ? paramArgs.push('pageSize='+$scope.pageSize) : '';
            var checkWhichPage = (($scope.whichPage)&&($scope.whichPage !== 1)) ? paramArgs.push('page='+$scope.whichPage) : '';

            paramArgs.push('callback=JSON_CALLBACK&format=json');

            if (paramArgs.length > 0) {
                return '?' + paramArgs.join('&');
            } else {
                return '';
            }
        };
        $scope.resetFacetNumber = function () {
            $scope.facetNumber = '';
        };

        $scope.showOption = {};
        $scope.sortOptions = {};

        $scope.resetParams = function () {
            $scope.category = $scope.categories[0];
            $scope.whichPage = 1;
            $scope.complexAttr = '';
            $scope.complexVal = '';
            $scope.pageSize =  10;
            $scope.attributeOption = $scope.attributeOptions[0];
            $scope.sortOrder = $scope.sortOrderOptions[0];
            $scope.remixResults = {};
            $scope.keywordSearch = '';
            $scope.errorResult = false;
            $scope.operator = $scope.attributeOption.operator[0];
            $scope.resetFacetNumber();
            $scope.facetAttribute = $scope.attributeOptions[0];
            $scope.showOption.list = [];
            $scope.dynamicForms = [{value: $scope.attributeOption}];

            $scope.sortOptions.list = [];
        };
        // $scope.sortOptions.list = ProductServices.restrictSortOptionLists($scope.showOption.list);
        
        //calling the function here loads the defaults on page load
        $scope.resetParams();

        //this function is fired on a ng-change when attribute is selected. it sets the first operator to be pre-selected
        $scope.preselectOperator = PreSelectOperatorService.preSelectOperator;

        $scope.callCopyEvent = function () {
            var tab = "products";
            GaService.copyUrlEvent(tab,$scope.apiKey);
        };
        
        $scope.addAllShowOptions = AddAllShowOptionsService.addAllShowOptions;

        $scope.selectAll = function (z) {
            if (z === 'allproducts') {
                $scope.showOption.list = angular.copy($scope.showOptions);
            } else if (z === 'noproducts') {
                $scope.showOption.list = [];
            } 
            return;
        };
        
        $scope.dynamicForms = [{id: '0',value:'',opt:'',complexVal:''}];  

        var counter = 0;
        $scope.addNewForm = function() {
            counter += 1;
            $scope.dynamicForms.push({'id':''+(counter)});

        };
        $scope.removeForm = function(form) {
            $scope.dynamicForms.splice($scope.dynamicForms.indexOf(form),1);   
        };

        $scope.parseDynamicForms = ProductServices.parseDynamicForms;

        $scope.clearBlankSelect = function () {
            $scope.sortOptions.list = ProductServices.restrictSortOptionLists($scope.showOption.list);
            $scope.sortBy = $scope.sortOptions.list[0];
        };

    }
]);