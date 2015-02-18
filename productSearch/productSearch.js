'use strict';

angular.module('bby-query-mixer.productSearch').controller('ProductSearchCtrl', [
    '$scope',
    'categoryConfig',
    'showOptionsConfig',
    'attributeOptionsConfig',
    'HttpClientService',
    'GaService',
    function ($scope, categoryConfig, showOptionsConfig, attributeOptionsConfig, HttpClientService, GaService) {
        $scope.categories = angular.copy(categoryConfig);
        $scope.showOptions = angular.copy(showOptionsConfig);
        $scope.attributeOptions = angular.copy(attributeOptionsConfig);

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

        $scope.showOpts = function () {
            console.log($scope.option.showOptions);
        };

        $scope.buildRemixQuery = function () {
            var searchArgs = [];
            var keywordQuery = $scope.keywordSearch ? searchArgs.push( '(search=' + $scope.keywordSearch +')' ) :'' ;

            var attributeQuery = 
            (($scope.attributeOption.value)&&($scope.operator.value === ' in ')) ? searchArgs.push( '('+ $scope.attributeOption.value + $scope.operator.value +'('+ $scope.complexVal + '))' ):
                $scope.attributeOption.value ? searchArgs.push( '('+ $scope.attributeOption.value + $scope.operator.value + $scope.complexVal + ')' ) : '';
 
            var manyAttributes = $scope.dynamicForms[0].value.productAttribute ? searchArgs.push($scope.parseDynamicForms($scope.dynamicForms)) : '';

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
                paramArgs.push('apiKey=' + $scope.apiKey + '&callback=JSON_CALLBACK' );
            }

            if ($scope.sortBy.value && $scope.sortBy.value != 'none') {
                paramArgs.push('sort=' + $scope.sortBy.value + '.' + $scope.sortOrder.value);
            }

            if ($scope.showOption.list.length > 0){
                paramArgs.push('show=' + $scope.showOption.list);
            };
            if ($scope.facetAttribute.value){
                paramArgs.push('facet=' + $scope.facetAttribute.value + ',' + $scope.facetNumber);
            };

            if(($scope.pageSize !== 10) || ($scope.whichPage !== 1)){
                paramArgs.push('pageSize='+$scope.pageSize + '&page='+$scope.whichPage);
            };

            paramArgs.push('format=json');

            if (paramArgs.length > 0) {
                return '?' + paramArgs.join('&');
            } else {
                return '';
            }
        };
        $scope.resetFacetNumber = function () {
            $scope.facetNumber = 10;
        };

        $scope.showOption = {};

        $scope.resetParams = function () {
            $scope.category = $scope.categories[0];
            $scope.whichPage = 1;
            $scope.sortOrder = 'asc';
            $scope.complexAttr = '';
            $scope.complexVal = '';
            $scope.pageSize =  10;
            $scope.attributeOption = $scope.attributeOptions[0];
            $scope.sortBy = $scope.sortByOptions[0];
            $scope.sortOrder = $scope.sortOrderOptions[0];
            $scope.remixResults = {};
            $scope.keywordSearch = '';
            $scope.errorResult = false;
            $scope.operator = $scope.attributeOption.operator[0];
            $scope.resetFacetNumber();
            $scope.facetAttribute = $scope.attributeOptions[0];
            $scope.showOption.list = [];
            
            $scope.dynamicForms = [{value: $scope.attributeOption}];
        };
        //calling the function here loads the defaults on page load
        $scope.resetParams();

        //this function is fired on a ng-change when attribute is selected. it sets the first operator to be pre-selected
        $scope.preselectOperator = function(form) {
            form.opt = form.value.operator[0];
            form.complexVal = form.value.valueOptions ? form.value.valueOptions[0].value : '';
        };

        $scope.callCopyEvent = function () {
            var tab = "products";
            GaService.copyUrlEvent(tab,$scope.apiKey);
        };

        var addAllOptions = function(optionArray) {
            var newArray = [];
            angular.forEach(optionArray, function(i) { this.push(i.value) }, newArray);
            return newArray;
        };

        $scope.selectAll = function (z) {
            if (z === 'allproducts') {
            $scope.showOption.list = addAllOptions($scope.showOptions);
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
            var newItemNo = $scope.dynamicForms.length-1;
            console.log(form)
            console.log($scope.dynamicForms.indexOf(form))
            $scope.dynamicForms.splice($scope.dynamicForms.indexOf(form),1);   
        };

        $scope.parseDynamicForms = function (array) {
            var newArray = [];
            angular.forEach(array, function(i) { 
                if (i.value.productAttribute && i.opt.value && i.complexVal)
                this.push(i.value.productAttribute + i.opt.value + i.complexVal); 
                // console.dir(i) 

            }, newArray);

            return newArray.join('&');
        };
        
        $scope.parseDynamicForms($scope.dynamicForms);

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