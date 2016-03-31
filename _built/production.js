'use strict';

// Declare app level module which depends on views, and components.
angular.module('bby-query-mixer', [
    'ngRoute',
    'ngSanitize',
    'bby-query-mixer.productSearch',
    'bby-query-mixer.recommendations',
    'bby-query-mixer.openBox',
    'bby-query-mixer.stores',
    'bby-query-mixer.smartLists',
    'bby-query-mixer.categories',
    'bby-query-mixer.reviews',
    'ngClipboard',
    'ui.bootstrap',
    'ui.select',
    'appConfig',
    'appServices',
    'ngCookies'
    ])
    .config(['$routeProvider', 'ngClipProvider', function ($routeProvider, ngClipProvider) {
        $routeProvider.otherwise({redirectTo: '/productSearch'});
        ngClipProvider.setPath("bower_components/zeroclipboard/dist/ZeroClipboard.swf");
    }])
    .controller('pageController', ['$scope', 'GaService', '$cookies', function($scope, GaService, $cookies){
    	$scope.apiKey = $cookies.apiKey || '';

        $scope.$watch('apiKey', function (key) {
            $cookies.apiKey = key;
            GaService.enterKeyEvent(key);
        });
    }])
    .controller('menuController', ['$scope', '$location', function($scope, $location) {
        $scope.isActive = function(route) {
            return route === $location.path();
        }
    }])
    .directive('analytics', ['$rootScope', '$location',
    function ($rootScope, $location) {
    return {
        link: function (scope, elem, attrs, ctrl) {
            $rootScope.$on('$routeChangeSuccess', function(event, currRoute, prevRoute) {
                ga('set', 'page', $location.path());
                var dimension1Value = '';
                //'dimension1' was registered as 'api key' in the google analytics admin console
                ga('set', 'dimension1', dimension1Value);
                ga('send', 'pageview');
            });
        }
    }
}])
    .filter('propsFilter', function() {
      return function(items, props) {
        var out = [];

        if (angular.isArray(items)) {
          items.forEach(function(item) {
            var itemMatches = false;

            var keys = Object.keys(props);
            for (var i = 0; i < keys.length; i++) {
              var prop = keys[i];
              var text = props[prop].toLowerCase();
              if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
                itemMatches = true;
                break;
              }
            }

            if (itemMatches) {
              out.push(item);
            }
          });
        } else {
          // Let the output be the input untouched
          out = items;
        }

        return out;
      };
});

'use strict';

angular.module('appConfig', ['ngRoute', 'ngResource','bby-query-mixer']);
'use strict';

angular.module('appConfig').constant('categoryConfig', [
    {
        value: false,
        label: 'Choose Category'
    },
    {
        value: 'pcmcat209400050001',
        label: 'All Cell Phones with Plans'
    },
    {
        value: 'abcat0501000',
        label: 'Desktop & All-in-One Computers'
    },
    {
        value: 'abcat0401000',
        label: 'Digital Cameras'
    },
    {
        value: 'pcmcat242800050021',
        label: 'Health, Fitness & Beauty'
    },
    {
        value: 'abcat0204000',
        label: 'Headphones'
    },
    {
        value: 'pcmcat241600050001',
        label: 'Home Audio'
    },
    {
        value: 'pcmcat254000050002',
        label: 'Home Automation & Security'
    },
    {
        value: 'pcmcat209000050006',
        label: 'iPad, Tablets & E-Readers'
    },
    {
        value: 'abcat0502000',
        label: 'Laptops'
    },
    {
        value: 'pcmcat232900050000',
        label: 'Nintendo 3DS'
    },
    {
        value: 'pcmcat295700050012',
        label: 'PlayStation 4'
    },
    {
        value: 'pcmcat310200050004',
        label: 'Portable & Wireless Speakers'
    },
    {
        value: 'pcmcat243400050029',
        label: 'PS Vita'
    },
    {
        value: 'abcat0904000',
        label: 'Ranges, Cooktops & Ovens'
    },
    {
        value: 'abcat0901000',
        label: 'Refrigerators'
    },
    {
        value: 'abcat0912000',
        label: 'Small Kitchen Appliances'
    },
    {
        value: 'abcat0101000',
        label: 'TVs'
    },
    {
        value: 'abcat0910000',
        label: 'Washers & Dryers'
    },
    {
        value: 'pcmcat273800050036',
        label: 'Wii U'
    },
    {
        value: 'pcmcat300300050002',
        label: 'Xbox One'
    }
]);
'use strict';

angular.module('appConfig').constant('sortOrderConfig',[
	{text:"Ascending", value:"asc"},
	{text:"Descending", value:"dsc"}
]);
'use strict';

angular.module('appServices', ['ngRoute', 'ngResource','bby-query-mixer']);
'use strict';

angular.module('appServices').factory('AddAllShowOptionsService', [ function () {
    
    var addAllShowOptions = function(optionArray) {
        var newArray = [];
        angular.forEach(optionArray, function(i) { this.push(i.value) }, newArray);
        return newArray.join(',');
    };

	return {
		addAllShowOptions : addAllShowOptions
	}
}]);
'use strict';

angular.module('appServices').factory('GaService', [ function() {
    
    var clickQueryButtonEvent = function(eventActionName, apiKey){
    	// var eventActionName = '';
    	return ga('send', 'event', 'button click', eventActionName, {'dimension1': apiKey});
    };

    var enterKeyEvent = function (apiKey) {
        //ng-minlength & ng-maxlength sets apikey as undefined unless it is the proper length
        if (apiKey){
            ga('send', 'event', 'user input', 'tried entering an api key', {'dimension1': apiKey});
        };
    };

    var copyUrlEvent = function (tab, apiKey) {
        ga('send', 'event', 'button click', 'copied a ' + tab + ' complete url', {'dimension1': apiKey});

    };

    return {
    	clickQueryButtonEvent : clickQueryButtonEvent,
    	enterKeyEvent : enterKeyEvent,
        copyUrlEvent : copyUrlEvent
    }
}]);
'use strict';

angular.module('appServices').factory('HttpClientService', ['$resource', function($resource) {
    
    var httpClient = function (query) {
		return $resource(query, {}, {
		    jsonp_query: {
		        method: 'JSONP'
		    }
		});
	};

	return {
		httpClient : httpClient
	}
}]);
'use strict';

angular.module('appServices').factory('PreSelectOperatorService', [ function () {
    
    var preSelectOperator = function(form) {
        form.opt = form.value.operator[0];
        form.complexVal = form.value.valueOptions ? form.value.valueOptions[0].value : '';
    };

	return {
		preSelectOperator : preSelectOperator
	}
}]);
'use strict';

angular.module('bby-query-mixer.openBox', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/openbox', {
            templateUrl: 'openBox/openBox.html',
            controller: 'openBoxCtrl'
        });
    }]
);
'use strict';

angular.module('bby-query-mixer.openBox').controller('openBoxCtrl', [
    '$scope',
    'categoryConfig',
    'HttpClientService',
    'GaService',
    'searchOptions',
    function ($scope, categoryConfig, HttpClientService, GaService, searchOptions) {
        $scope.categories = angular.copy(categoryConfig);
        $scope.category = $scope.categories[0];

        $scope.options = angular.copy(searchOptions);

        $scope.buildRemixQuery = function () {
            var baseUrl = 'https://api.bestbuy.com/beta/products/openBox'
            var categoryQuery = (($scope.searchSelection.value === 'category')&& $scope.category.value) ? baseUrl += '(categoryId='+$scope.category.value+')' :'';
            var skuListQuery = (($scope.searchSelection.value === 'skuList')&&($scope.skuList)) ? baseUrl += '(sku%20in('+$scope.skuList+'))':'';
            var singleSkuQuery = (($scope.searchSelection.value === 'singleSku')&&($scope.singleSku)) ? baseUrl = 'https://api.bestbuy.com/beta/products/'+$scope.singleSku +'/openBox' : '';
            var apiKey = $scope.apiKey ? baseUrl += '?apiKey='+$scope.apiKey : '';
            
            baseUrl += '&callback=JSON_CALLBACK' ;
            
            var checkPageSize = (($scope.pageSize)&&($scope.pageSize !== 10)) ? baseUrl += '&pageSize='+$scope.pageSize : '';
            var checkWhichPage = (($scope.whichPage)&&($scope.whichPage !== 1)) ? baseUrl += '&page='+$scope.whichPage : '';
            
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

                var eventActionName = "open box query success";
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

        $scope.resetParams = function () {
            $scope.errorResult = false;
            $scope.results = {};
        	$scope.pageSize = 10;
        	$scope.whichPage = 1;
        	$scope.searchSelection = $scope.options[0];
            $scope.skuList = '';
            $scope.resetSelectionValues();
        };
        $scope.resetSelectionValues = function () {
            $scope.skuList = '';
            $scope.singleSku = '';
            $scope.category = $scope.categories[0];
        };

        $scope.resetParams();

        $scope.callCopyEvent = function () {
            var tab = "open box";
            GaService.copyUrlEvent(tab,$scope.apiKey);
        };
}]);
'use strict';

angular.module('bby-query-mixer.openBox').constant('searchOptions', [
    { text: "Select an Open Box Search Option", value: 0 },
	{ text: "Open Box Offers All SKUs", value: 'allSkus' },
	{ text: "Open Box Offers by Category", value: 'category' },
	{ text: "Open Box Offers by List of SKUs", value: 'skuList' },
	{ text: "Open Box Offers by SKU", value: 'singleSku' }
]);
'use strict';

angular.module('bby-query-mixer.productSearch', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/productSearch', {
            templateUrl: 'productSearch/productSearch.html',
            controller: 'ProductSearchCtrl'
        });
    }]
);

'use strict';

angular.module('bby-query-mixer.productSearch').constant('attributeOptionsConfig', [ 
	{text:'Choose Attribute', productAttribute:false, operator:[{value:'operator'}], placeholder:'Value', type:false},		
	{text:'Best Selling Rank', productAttribute:'bestSellingRank', operator:[{value:'='},{value:'>'},{value:'<'},{value:'<='},{value:'>='}], placeholder:'1', type: "number"},		
	{text: 'Category Path Id', productAttribute: 'categoryPath.id', operator:[{value:'='},{value:'!='},{value:' in '}], placeholder:'abcat0502000', type:"text" },
	{text: 'Category Path Name', productAttribute: 'categoryPath.name', operator:[{value:'='},{value:'!='}], placeholder:'Laptops', type:"text" },
	{text:'Color', productAttribute:'color', operator:[{value:'='},{value:'!='}], placeholder:'black', type:"text"},
	{text:'Condition', productAttribute:'condition', operator:[{value:'='},{value:'!='}], placeholder:'new,refurbished', type:"text"},
	{text:'Customer Review Average', productAttribute:'customerReviewAverage', operator:[{value:'='},{value:'>'},{value:'<'},{value:'<='},{value:'>='}], placeholder:5.0, type:"number"},
	{text:'Customer Review Count', productAttribute:'customerReviewCount', operator:[{value:'='},{value:'>'},{value:'<'},{value:'<='},{value:'>='}], placeholder:5, type:"number"},
	{text:'Description', productAttribute:'description', operator:[{value:'='},{value:'!='}], placeholder:'text', type:'text'},
	{text:'Dollar Savings', productAttribute:'dollarSavings', operator:[{value:'='},{value:'>'},{value:'<'},{value:'<='},{value:'>='}], placeholder:'10.99', type:'number'},
	{text:'Free Shipping', productAttribute:'freeShipping', operator:[{value:'='}], placeholder:true, type:"boolean", valueOptions:[{value:"true"},{value:"false"},{value:'*'}] },
	{text:'In Store Availability', productAttribute:'inStoreAvailability', operator:[{value:'='}], placeholder:true, type:"boolean", valueOptions:[{value:"true"},{value:"false"},{value:'*'}] },
	{text:'Manufacturer', productAttribute:'manufacturer', operator:[{value:'='},{value:'!='}], placeholder:"canon", type:"text"},
	{text:'Model Number', productAttribute:'modelNumber', operator:[{value:'='},{value:'!='}], placeholder:"4460B004", type:"text"},
	{text:'Name', productAttribute:'name', operator:[{value:'='},{value:'!='}], placeholder:"Canon - EOS 60D DSLR Camera", type:"text"},
	{text:'Online Availability', productAttribute:'onlineAvailability', operator:[{value:'='}], placeholder:true, type:"boolean", valueOptions:[{value:"true"},{value:"false"},{value:'*'}] },
	{text:'On Sale', productAttribute:'onSale', operator:[{value:'='}], placeholder:true, type:"boolean", valueOptions:[{value:"true"},{value:"false"},{value:'*'}] },
	{text:'Percent Savings', productAttribute:'percentSavings', operator:[{value:'='},{value:'>'},{value:'<'},{value:'<='},{value:'>='}], placeholder:'10', type:"number"},
	{text:'Preowned', productAttribute:'preowned', operator:[{value:'='}], placeholder:true, type:"boolean", valueOptions:[{value:"true"},{value:"false"},{value:'*'}] },
	{text:'Regular Price', productAttribute:'regularPrice', operator:[{value:'='},{value:'>'},{value:'<'},{value:'<='},{value:'>='}], placeholder:'19.99', type:"number"},
	{text:'Sale Price', productAttribute:'salePrice', operator:[{value:'='},{value:'>'},{value:'<'},{value:'<='},{value:'>='}], placeholder:'9.99', type:"number"},
	{text:'Shipping Cost', productAttribute:'shippingCost', operator:[{value:'='},{value:'>'},{value:'<'},{value:'<='},{value:'>='}], placeholder:'9.99', type:"number"},
	{text:'SKU', productAttribute:'sku',operator:[{value:'='},{value:'!='},{value:' in '}], placeholder:'1234567,7654321', type:"text"},
	{text:'Type', productAttribute:'type', operator:[{value:'='},{value:'!='}], placeholder:"Music", type:"text"},
	{text:'UPC', productAttribute:'upc', operator:[{value:'='},{value:'!='}], placeholder:"12345678910", type:"text"}
]);
'use strict'
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
'use strict';

angular.module('bby-query-mixer.productSearch').factory('ProductServices', [ 'restrictedSortOptions',function(restrictedSortOptions) {
    
    var parseDynamicForms = function (array) {
            var newArray = [];
            angular.forEach(array, function(i) { 
                if (i.value.productAttribute && i.opt.value && i.complexVal){
                    if (i.opt.value === ' in ') {
                        this.push(i.value.productAttribute + i.opt.value +'('+ i.complexVal+')'); 
                    } else if (i.value.productAttribute === 'categoryPath.name'){
                        this.push(i.value.productAttribute + i.opt.value + i.complexVal+'*'); 
                    } else {
                        this.push(i.value.productAttribute + i.opt.value + i.complexVal); 
                    }
                }
            }, newArray);

            return newArray.join('&');
    };

    var addAllOptionValues = function(optionArray) {
        var newArray = [];
        angular.forEach(optionArray, function(i) { this.push(i.value) }, newArray);
        return newArray;
    };

    var restrictSortOptionLists = function (array) {
        var newArray = [];
        angular.forEach(array,
            function(i) {
                if (restrictedSortOptions.indexOf(i.value) === -1){
                    this.push(i)
                }
            }, newArray);
        return newArray;
    };

    return {
    	parseDynamicForms : parseDynamicForms,
    	addAllOptionValues : addAllOptionValues,
        restrictSortOptionLists : restrictSortOptionLists
    }
}]);
'use strict';

angular.module('bby-query-mixer.productSearch').constant('showOptionsConfig', [ 
	{ text: 'Accessories SKUs', value: 'accessories.sku' },
	{ text: 'Add To Cart Url', value: 'addToCartUrl' },
	{ text: 'Best Selling Rank', value: 'bestSellingRank' },
	{ text: 'Category Path Id', value: 'categoryPath.id' },
	{ text: 'Category Path Name', value: 'categoryPath.name' },
	{ text: 'Color', value: 'color' },
	{ text: 'Condition', value: 'condition' },
	{ text: 'Customer Review Average', value: 'customerReviewAverage' },
	{ text: 'Customer Review Count', value: 'customerReviewCount' },
	{ text: 'Description', value: 'description' },
	{ text: 'Detail Text', value: 'details.name' },
	{ text: 'Details Value', value: 'details.value' },
	{ text: 'Dollar Savings', value: 'dollarSavings' },
	{ text: 'Features', value: 'features.feature' },
	{ text: 'Free Shipping', value: 'freeShipping' },
	{ text: 'Frequently Purchased With SKUs', value: 'frequentlyPurchasedWith.sku' },
	{ text: 'Image', value: 'image' },
	{ text: 'Included Items', value: 'includedItemList.includedItem' },
	{ text: 'In Store Availability', value: 'inStoreAvailability' },
	{ text: 'In Store Availability Text', value: 'inStoreAvailabilityText' },
	{ text: 'Long Description', value: 'longDescription' },
	{ text: 'Manufacturer', value: 'manufacturer' },
	{ text: 'Mobile Url', value: 'mobileUrl' },
	{ text: 'Model Number', value: 'modelNumber' },
	{ text: 'Name', value: 'name' },
	{ text: 'Online Availability', value: 'onlineAvailability' },
	{ text: 'Online Availability Text', value: 'onlineAvailabilityText' },
	{ text: 'On Sale', value: 'onSale' },
	{ text: 'Percent Savings', value: 'percentSavings' },
	{ text: 'Preowned?', value: 'preowned' },
	{ text: 'Regular Price', value: 'regularPrice' },
	{ text: 'Related Product SKUs', value: 'relatedProducts.sku' },
	{ text: 'Sale Price', value: 'salePrice' },
	{ text: 'Shipping', value: 'shipping' },
	{ text: 'Shipping Cost', value: 'shippingCost' },
	{ text: 'Short Description', value: 'shortDescription' },
	{ text: 'SKU', value: 'sku' },
    { text: 'Thumbnail Image', value: 'thumbnailImage' },
    { text: 'Type', value: 'type' },
    { text: 'UPC', value: 'upc' },
    { text: 'URL', value: 'url' }
])
.constant('restrictedSortOptions', [
    'accessories.sku',
    'addToCartUrl',
    'categoryPath.id',
    'categoryPath.name',
    'details.name',
    'details.value',
    'features.feature',
    'frequentlyPurchasedWith.sku',
    'includedItemList.includedItem',
    'mobileUrl',
    'relatedProducts.sku',
    'shipping'
]);
'use strict';

angular.module('bby-query-mixer.recommendations', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/recommendations', {
            templateUrl: 'recommendations/recommendations.html',
            controller: 'RecommendationsCtrl'
        });
    }]
);
'use strict';

angular.module('bby-query-mixer.recommendations').controller('RecommendationsCtrl', [
    '$scope',
    'categoryConfig',
    'HttpClientService',
    'GaService',
    function ($scope, categoryConfig, HttpClientService, GaService) {
        $scope.categories = angular.copy(categoryConfig);
        $scope.category = $scope.categories[0];

        $scope.buildRecommendationsQuery = function () {
            var baseUrl = 'https://api.bestbuy.com/beta/products/';
            var queryArgs = [];
            var endpointSelection = $scope.endpoint.selected ? baseUrl += ($scope.endpoint.selected) : '';
            var categoryOption = $scope.category.value ? baseUrl += ('(categoryId='+$scope.category.value+')') : '';
            var addKey = $scope.apiKey ? baseUrl += ('?apiKey='+$scope.apiKey):'';
            baseUrl += '&callback=JSON_CALLBACK';
            return baseUrl;
        };

        $scope.invokeRecommendationsQuery = function () {
            $scope.results = "Running";
            var query = $scope.buildRecommendationsQuery();

            var successFn = function (value) {
                $scope.results = value;
            };
            var errorFn = function (httpResponse) {
                $scope.results = httpResponse;
            };

            if (($scope.apiKey !=  "")&($scope.endpoint.selected != "")){
                $scope.errorResult = false;

                var eventActionName = "recommendation query success";
                GaService.clickQueryButtonEvent(eventActionName, $scope.apiKey);

                HttpClientService.httpClient(query).jsonp_query(successFn, errorFn);
            }else if ($scope.apiKey ===  ""){
                $scope.errorResult = true;
                $scope.results = "Please enter your API Key";
            } else{
                $scope.errorResult = true;
                $scope.results = "Please pick an endpoint";
            };
        };

        $scope.isRemixQueryButtonDisabled = function () {
            return ($scope.skuList == recommendationsConfig.skuList);
        };

        $scope.resetRecommendationsQuery = function () {
            $scope.results = {};
            $scope.endpoint = {selected:""};
            $scope.category = $scope.categories[0];
            $scope.errorResult = false;
        };

        $scope.callCopyEvent = function () {
            var tab = "recommendations";
            GaService.copyUrlEvent(tab,$scope.apiKey);
        };

        //this loads our default model scopes on page load
        $scope.resetRecommendationsQuery();

    }
]);
'use strict';

angular.module('bby-query-mixer.smartLists', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/smartlists', {
            templateUrl: 'smartLists/smartLists.html',
            controller: 'SmartListsCtrl'
        });
    }]
);

'use strict';

angular.module('bby-query-mixer.smartLists').controller('SmartListsCtrl', [
    '$scope',
    'categoryConfig',
    'HttpClientService',
    'GaService',
    function ($scope, categoryConfig, HttpClientService, GaService) {

        $scope.buildSmartListsQuery = function () {
            var baseUrl = 'https://api.bestbuy.com/beta/products/';
            var endpointSelection = $scope.endpoint.selected ? baseUrl += ($scope.endpoint.selected) : '';
            var addKey = $scope.apiKey ? baseUrl += ('?apiKey='+$scope.apiKey):'';
            baseUrl += '&callback=JSON_CALLBACK';
            return baseUrl;
        };

        $scope.invokeRecommendationsQuery = function () {
            $scope.results = "Running";
            var query = $scope.buildSmartListsQuery();

            var successFn = function (value) {
                $scope.results = value;
            };
            var errorFn = function (httpResponse) {
                $scope.results = httpResponse;
            };

            if (($scope.apiKey !=  "")&($scope.endpoint.selected != "")){
                $scope.errorResult = false;

                var eventActionName = "smart lists query success";
                GaService.clickQueryButtonEvent(eventActionName, $scope.apiKey);

                HttpClientService.httpClient(query).jsonp_query(successFn, errorFn);
            }else if ($scope.apiKey ===  ""){
                $scope.errorResult = true;
                $scope.results = "Please enter your API Key";
            } else{
                $scope.errorResult = true;
                $scope.results = "Please pick an endpoint";
            };
        };

        $scope.resetSmartListsQuery = function () {
            $scope.results = {};
            $scope.endpoint = {selected:""};
            $scope.errorResult = false;
        };

        $scope.callCopyEvent = function () {
            var tab = "smart lists";
            GaService.copyUrlEvent(tab,$scope.apiKey);
        };

        //this loads our default model scopes on page load
        $scope.resetSmartListsQuery();

}]);
'use strict';

angular.module('bby-query-mixer.stores', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/stores', {
            templateUrl: 'stores/stores.html',
            controller: 'storesCtrl'
        });
    }]
);

'use strict';

angular.module('bby-query-mixer.stores').constant('productAttributesConfig', [ 
	{ text: "SKU", value: "products.sku" },
	{ text: "Name", value: "products.name" },
	{ text: "Short Description", value: "products.shortDescription" },
	{ text: "Sale Price", value: "products.salePrice" },
	{ text: "Regular Price", value: "products.regularPrice" },
	{ text: "Add To Cart URL", value: "products.addToCartURL" },
	{ text: "Product Url", value: "products.url" },
	{ text: "Image", value: "products.image" },
	{ text: "Customer Review Count", value: "products.customerReviewCount" },
	{ text: "Customer Review Average", value: "products.customerReviewAverage" }
]);
'use strict';

angular.module('bby-query-mixer.stores').constant('regionsConfig', [ 
	{ text:"Choose a Region/State", value: false },
	{ text:"AL - Alabama", value:"AL" },
	{ text:"AK - Alaska", value:"AK" },
	{ text:"AP - Armed Forces Pacific", value:"AP" },
	{ text:"AE - Armed Forces Europe", value:"AE" },
	{ text:"AA - Armed Forces America", value:"AA" },
	{ text:"AZ - Arizona", value:"AZ" },
	{ text:"AR - Arkansas", value:"AR" },
	{ text:"CA - California", value:"CA" },
	{ text:"CO - Colorado", value:"CO" },
	{ text:"CT - Connecticut", value:"CT" },
	{ text:"DC - Washington D.C.", value:"DC" },
	{ text:"DE - Delaware", value:"DE" },
	{ text:"FL - Florida", value:"FL" },
	{ text:"GA - Georgia", value:"GA" },
	{ text:"GU - Guam", value:"GU" },
	{ text:"HI - Hawaii", value:"HI" },
	{ text:"ID - Idaho", value:"ID" },
	{ text:"IL - Illinois", value:"IL" },
	{ text:"IN - Indiana", value:"IN" },
	{ text:"IA - Iowa", value:"IA" },
	{ text:"KS - Kansas", value:"KS" },
	{ text:"KY - Kentucky", value:"KY" },
	{ text:"LA - Louisiana", value:"LA" },
	{ text:"ME - Maine", value:"ME" },
	{ text:"MD - Maryland", value:"MD" },
	{ text:"MA - Massachusetts", value:"MA" },
	{ text:"MI - Michigan", value:"MI" },
	{ text:"MN - Minnesota", value:"MN" },
	{ text:"MS - Mississippi", value:"MS" },
	{ text:"MO - Missouri", value:"MO" },
	{ text:"MT - Montana", value:"MT" },
	{ text:"NE - Nebraska", value:"NE" },
	{ text:"NV - Nevada", value:"NV" },
	{ text:"NH - New Hampshire", value:"NH" },
	{ text:"NJ - New Jersey", value:"NJ" },
	{ text:"NM - New Mexico", value:"NM" },
	{ text:"NY - New York", value:"NY" },
	{ text:"NC - North Carolina", value:"NC" },
	{ text:"ND - North Dakota", value:"ND" },
	{ text:"OH - Ohio", value:"OH" },
	{ text:"OK - Oklahoma", value:"OK" },
	{ text:"OR - Oregon", value:"OR" },
	{ text:"PA - Pennsylvania", value:"PA" },
	{ text:"PR - Puerto Rico", value:"PR" },
	{ text:"RI - Rhode Island", value:"RI" },
	{ text:"SC - South Carolina", value:"SC" },
	{ text:"SD - South Dakota", value:"SD" },
	{ text:"TN - Tennessee", value:"TN" },
	{ text:"TX - Texas", value:"TX" },
	{ text:"UT - Utah", value:"UT" },
	{ text:"VT - Vermont", value:"VT" },
	{ text:"VA - Virginia", value:"VA" },
	{ text:"VI - Virgin Island", value:"VI" },
	{ text:"WA - Washington", value:"WA" },
	{ text:"WV - West Virginia", value:"WV" },
	{ text:"WI - Wisconsin", value:"WI" },
	{ text:"WY - Wyoming", value:"WY" },
]);
angular.module('bby-query-mixer.stores').constant('searchValueOptionsConfig', [
            {text:"Location Criteria", value:false},
            {text:"By City", value:"city"},
            {text:"By Postal Code", value:"postalCode"},
            {text:"By Latitude/Longitude", value:"latLong"},
            {text:"By StoreId", value:"storeId"},
            {text:"By Region/State", value:"region"}
        ]);
'use strict';

angular.module('bby-query-mixer.stores').constant('storeServicesConfig', [ 
	{ text:'Apple Shop', value: '"apple shop"' },
	{ text:'Best Buy for Business', value: '"best buy for business"' },
	{ text:'Best Buy Mobile', value: '"best buy mobile"' },
	{ text:'Best Buy Mobile Specialty Store', value: '"best buy mobile specialty store"' },
	{ text:'Car & GPS Installation Services', value: '"car & gps installation services"' },
	{ text:'Electronics Recycling', value: '"electronics recycling"' },
	{ text:'Geek Squad Services', value: '"geek squad services"' },
	{ text:'Geek Squad Solution Central', value: '"geek squad solution central"' },
	{ text:'Hablamos Español', value: '"hablamos espa*ol"' },
	{ text:'Magnolia Design Center', value: '"magnolia design center"' },
	{ text:'Magnolia Home Theater', value: '"magnolia home theater"' },
	{ text:'Pacific Kitchen & Home', value: '"pacific kitchen & home"' },
	{ text:'Samsung Experience Shop', value: '"samsung experience shop"' },
	{ text:'Support for Military Families', value: '"support for military families"' },
	{ text:'Windows Store', value: '"windows store"' }
])
.constant('storeTypesConfig',[
    { text:"Big Box", value: "bigbox" },
    { text: "Mobile", value: "mobile" },
    { text: "Express (Kiosk)", value: "express" }
]);
 'use strict';

angular.module('bby-query-mixer.stores').factory('StoreServices', [ function(){

    var filterStoreType = function (storeTypesArray) {
        var newArray = [];
        angular.forEach(storeTypesArray, function(i) {this.push('(storeType='+i+')')}, newArray);
        return newArray.join('|');
    };

    var filterStoreService = function (storeServiceArray) {
        var newArray = [];
        angular.forEach(storeServiceArray, function(i) {this.push('(services.service='+i+')')}, newArray);
        return newArray.join('&');
    };

    var addAllOptions = function(optionArray) {
            var newArray = [];
            angular.forEach(optionArray, function(i) { this.push(i.value) }, newArray);
            return newArray;
        };

    return {
    	filterStoreService : filterStoreService ,
    	filterStoreType : filterStoreType,
    	addAllOptions : addAllOptions
    }

}]);
'use strict';

angular.module('bby-query-mixer.stores').controller('storesCtrl', [
    '$scope',
    'categoryConfig',
    'HttpClientService',
    'GaService',
    'regionsConfig',
    'storeServicesConfig',
    'storeResponseConfig',
    'productAttributesConfig',
    'StoreServices',
    'searchValueOptionsConfig',
    'storeTypesConfig',
    function ($scope, categoryConfig, HttpClientService, GaService, regionsConfig, storeServicesConfig, storeResponseConfig, productAttributesConfig, StoreServices, searchValueOptionsConfig,storeTypesConfig) {
        
        $scope.storeTypes = angular.copy(storeTypesConfig);

        $scope.options = angular.copy(searchValueOptionsConfig);

        $scope.filterStoreType = StoreServices.filterStoreType;
        $scope.filterStoreService = StoreServices.filterStoreService;

        $scope.buildRemixQuery = function () {
            var baseUrl = 'https://api.bestbuy.com/v1/stores';
            
            //searchArgs = optional search arguments like store type, store services, region, etc
            var searchArgs = [];
            var byCity = ($scope.searchSelection.value === 'city') ? (searchArgs.push('(city='+$scope.cityChoice+')')):'';
            var byPostalCode = (function () {
                if (($scope.zipCode)&&($scope.area !== '')) {
                   return (searchArgs.push('(area('+$scope.zipCode+','+$scope.area+'))')) ;
                } else if ($scope.zipCode) {
                   return (searchArgs.push('(postalCode='+$scope.zipCode+')')) ;
                }
            })();
            var lat = ($scope.latCompassDirection === 'south') ? '-'+ $scope.latitude: $scope.latitude;
            var long = ($scope.longCompassDirection === 'west') ? '-' + $scope.longitude : $scope.longitude;
            var area = ($scope.latLongArea) ? $scope.latLongArea : '';
            var byLatLong = (($scope.longitude)&&($scope.latitude)) ? searchArgs.push('(area('+lat+','+long+','+area+'))') :'';
            var byStoreId = ($scope.searchSelection.value === 'storeId') ? (searchArgs.push('(storeId='+$scope.storeId+')')):'';
            var byRegion = ($scope.searchSelection.value === 'region') ? (searchArgs.push('(region='+$scope.regionOption.value+')')) : '';
            
            var addStoreType = ($scope.storeType.list.length > 0) ? searchArgs.push(('('+$scope.filterStoreType($scope.storeType.list)+')')) : '';

            var addStoreServices = ((!$scope.searchSelection.value) && ($scope.servicesOption.list.length > 0)) ? searchArgs.push(($scope.filterStoreService($scope.servicesOption.list) )) :
                    (($scope.searchSelection.value) && ($scope.servicesOption.list.length > 0)) ? searchArgs.push('('+$scope.filterStoreService($scope.servicesOption.list)+')' ) : '' ;

            //queryParams are things like apikey, format, etc
            var queryParams = [];
            var skuListOption = $scope.skuList !== '' ? queryParams.push('+products(sku%20in%20('+$scope.skuList+'))') : '';

            queryParams.push('?')

            var addKey = $scope.apiKey ? queryParams.push(('apiKey='+$scope.apiKey)):'';

            var showParams = [];
            var productShowOptions = $scope.skuList !== '' ? showParams.push($scope.productOption.list):'';
            var addStoreResponseOptions = ($scope.storeResponse.list.length > 0) ? showParams.push($scope.storeResponse.list) : '';
            var addShowParams = showParams.length > 0 ? queryParams.push('&show='+showParams):'';

            var checkPageSize = (($scope.pageSize)&&($scope.pageSize !== 10)) ? queryParams.push('&pageSize='+$scope.pageSize) : '';
            var checkWhichPage = (($scope.whichPage)&&($scope.whichPage !== 1)) ? queryParams.push('&page='+$scope.whichPage) : '';
                        
            queryParams.push('&callback=JSON_CALLBACK&format=json');
            var parensCheck = searchArgs.length === 0 ? baseUrl += (searchArgs.join('')) : baseUrl += ('('+searchArgs.join('&')+')');
            baseUrl += queryParams.join('');
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

            if (($scope.apiKey !==  "")){
                $scope.errorResult = false;

                var eventActionName = "stores query success";
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
            
        $scope.servicesOption = {};
        $scope.storeType = {};
        $scope.storeResponse = {};
        $scope.productOption = {};
        
        $scope.resetInput = function () {
            $scope.area = '';
            $scope.latLongArea = '';
            $scope.cityChoice = '';
            $scope.regionOption = $scope.regionOptions[0];
            $scope.storeId = '';
            $scope.longitude = '';
            $scope.latitude = '';
            $scope.zipCode = '';
        };

        $scope.resetParams = function () {
            $scope.searchSelection = $scope.options[0];
            $scope.regionOptions = angular.copy(regionsConfig);
            $scope.servicesOptions = angular.copy(storeServicesConfig);
            $scope.servicesOption.list = [];
            $scope.productOptions = angular.copy(productAttributesConfig);
            $scope.productOption.list = StoreServices.addAllOptions($scope.productOptions);
            $scope.whichPage = 1;
            $scope.pageSize = 10;
            $scope.storeResponses = angular.copy(storeResponseConfig);
            $scope.storeResponse.list = [];
            $scope.storeType.list = [];
            $scope.resetInput();
            $scope.errorResult = false;
            $scope.results = {};
            $scope.latCompassDirection = 'north';
            $scope.longCompassDirection = 'east';
            $scope.skuList = '';
        };


        $scope.resetParams();

        $scope.callCopyEvent = function () {
            var tab = "stores";
            GaService.copyUrlEvent(tab,$scope.apiKey);
        };

        $scope.selectAll = function (z) {
            if (z === 'services') {
                $scope.servicesOption.list = angular.copy($scope.servicesOptions).map(function (item) {
                    return item.value;
                });
            } else if (z === 'noservices') {
                $scope.servicesOption.list = [];
            } else if (z === 'types') {
                $scope.storeType.list = angular.copy($scope.storeTypes).map(function (item) {
                    return item.value;
                });
            } else if (z === 'notypes') {
                $scope.storeType.list = [];
            } else if (z === 'responseAttributes') {
                $scope.storeResponse.list = angular.copy($scope.storeResponses).map(function (item) {
                    return item.value;
                });
            } else if (z === 'noResponse') {
                $scope.storeResponse.list = [];
            } else if (z === 'products') {
                $scope.productOption.list = StoreServices.addAllOptions($scope.productOptions)
            } else if (z === 'noproducts'){
                $scope.productOption.list = [];
            }
            return;
        };
}]);
'use strict';

angular.module('bby-query-mixer.stores').constant('storeResponseConfig', [ 
	{ text: "Address", value: "address" },
	{ text: "Address 2", value: "address2" },	
	{ text: "City", value: "city" },
	{ text: "Country", value: "country" },
	{ text: "Hours", value: "hours" },
	{ text: "Hours AM/PM", value: "hoursAmPm" },
	{ text: "Hours Detailed", value: "detailedHours" },
	{ text: "Latitude", value: "lat" },
	{ text: "Location", value: "location" },
	{ text: "Longitude", value: "lng" },
	{ text: "Name", value: "name" },
	{ text: "Name Long", value: "longName" },
	{ text: "Phone", value: "phone" },
	{ text: "Postal Code", value: "fullPostalCode" },
	{ text: "Services", value: "services" },
	{ text: "State, Territory", value: "region" },
	{ text: "Store Id", value: "storeId" },
	{ text: "Store Type", value: "storeType" },
	{ text: "Trade In Information", value: "tradeIn" }
]);
'use strict';

angular.module('bby-query-mixer.categories', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/categories', {
            templateUrl: 'categories/categories.html',
            controller: 'CategoriesCtrl'
        });
    }]
);
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

'use strict';

angular.module('bby-query-mixer.categories').constant('categoryResponseConfig', [ 
    {text:"Name", value:"name" },
    {text:"Id", value:"id" },
    {text:"SubCategory Name", value:"subCategories.name" },
    {text:"SubCategory Id", value:"subCategories.id" }
]);
'use strict';

angular.module('bby-query-mixer.reviews', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/reviews', {
            templateUrl: 'reviews/reviews.html',
            controller: 'ReviewsCtrl'
        });
    }]
);
'use strict';

angular.module('bby-query-mixer.productSearch').constant('reviewAttributeOptionsConfig', [ 
	{text:'Choose review attributes', reviewAttribute:false,operator:false,placeholder:false},
	{text:'Comment', reviewAttribute:'comment',operator:[{value:'='}],placeholder:'I <3 this phone.', type:'string' },
	{text:'Id', reviewAttribute:'id',operator:[{value:'='},{value:'!='},{value:' in '}],placeholder:'24798186', type:'string' },
	{text:'Rating', reviewAttribute:'rating',operator:[{value:'='},{value:'>'},{value:'<'},{value:'<='},{value:'>='}],placeholder:'4.0', type:'number' },
	{text:'Reviewer', reviewAttribute:'reviewer.name',operator:[{value:'='}],placeholder:'BBY-Fan28', type:'string' },
	{text:'SKU', reviewAttribute:'sku',operator:[{value:'='},{value:'!='},{value:' in '}],placeholder:'3764993', type:'string' },
	{text:'Submission Time', reviewAttribute:'submissionTime',operator:[{value:'='}],placeholder:'2014-04-29 T22:40:33', type:'string' },
	{text:'Title', reviewAttribute:'title',operator:[{value:'='}],placeholder:'Good keyboard', type:'string' }
]);
'use strict';

angular.module('bby-query-mixer.reviews').factory('ReviewServices', [ 'restrictedReviewSortOptions',function(restrictedReviewSortOptions) {

    var parseDynamicForms = function (array) {
            var newArray = [];
            angular.forEach(array, function(i) { 
                if (i.value.reviewAttribute && i.opt.value && i.complexVal){
                    if ((i.value.reviewAttribute === 'comment')||(i.value.reviewAttribute === 'title')) {
                        this.push(i.value.reviewAttribute + i.opt.value + i.complexVal+'*'); 
                    } else if (i.opt.value === ' in ') {
                        this.push(i.value.reviewAttribute + i.opt.value +'('+ i.complexVal+')'); 
                    } else {
                this.push(i.value.reviewAttribute + i.opt.value + i.complexVal); 
                    }
                }
            }, newArray);

            return newArray.join('&');
    };

    var restrictReviewsSortOptionLists = function (array) {
        var newArray = [];
        angular.forEach(array,
            function(i) {
                if (restrictedReviewSortOptions.indexOf(i.value) === -1){
                    this.push(i)
                }
            }, newArray);
        return newArray;
    };

    return {
    	parseDynamicForms : parseDynamicForms,
        restrictReviewsSortOptionLists : restrictReviewsSortOptionLists
    }
}]);
'use strict';

angular.module('bby-query-mixer.reviews').controller('ReviewsCtrl', [
    '$scope',
    'categoryConfig',
    'HttpClientService',
    'GaService',
    'reviewAttributeOptionsConfig',
    'reviewShowOptionsConfig',
    'ReviewServices',
    'sortOrderConfig',
    'AddAllShowOptionsService',
    'PreSelectOperatorService',
    function ($scope, categoryConfig, HttpClientService, GaService, reviewAttributeOptionsConfig, reviewShowOptionsConfig, ReviewServices, sortOrderConfig, AddAllShowOptionsService, PreSelectOperatorService) {
                
        $scope.showOption = {};
        $scope.sortOptions = {};
        $scope.sortOrderOptions = angular.copy(sortOrderConfig);

        $scope.buildReviewsQuery = function () {

            var searchArgs = [];
            var manyAttributes = $scope.dynamicForms[0].value.reviewAttribute ? searchArgs.push($scope.parseDynamicForms($scope.dynamicForms)) : '';

            var baseUrl = searchArgs.length > 0 ? 'https://api.bestbuy.com/v1/reviews' + '(' + searchArgs.join('&') + ')' : 'https://api.bestbuy.com/v1/reviews';
            var addKey = $scope.apiKey ? baseUrl += ('?apiKey='+$scope.apiKey):'';

            var addShowOptions = $scope.showOption.list.length > 0 ? baseUrl+=('&show='+$scope.addAllShowOptions($scope.showOption.list)) : '';

            var checkPageSize = (($scope.pageSize)&&($scope.pageSize !== 10)) ? baseUrl +=('&pageSize='+$scope.pageSize) : '';
            var checkWhichPage = (($scope.whichPage)&&($scope.whichPage !== 1)) ? baseUrl +=('&page='+$scope.whichPage) : '';
            var sortBy = ($scope.sortBy && $scope.sortBy.value) ? baseUrl += ('&sort=' + $scope.sortBy.value + '.' + $scope.sortOrder.value):'';

            baseUrl += '&callback=JSON_CALLBACK&format=json';
            return baseUrl;
        };

        $scope.invokeReviewsQuery = function () {
            $scope.results = "Running";
            var query = $scope.buildReviewsQuery();

            var successFn = function (value) {
                $scope.results = value;
            };
            var errorFn = function (httpResponse) {
                $scope.results = httpResponse;
            };

            if ($scope.apiKey !=  ""){
                $scope.errorResult = false;

                var eventActionName = "reviews query success";
                GaService.clickQueryButtonEvent(eventActionName, $scope.apiKey);

                HttpClientService.httpClient(query).jsonp_query(successFn, errorFn);
            } else if ($scope.apiKey ===  ""){
                $scope.errorResult = true;
                $scope.results = "Please enter your API Key";
            };
        };

        $scope.dynamicForms = [{id: '0',value:'',opt:'',complexVal:''}];
        var counter = 0;
        $scope.addNewForm = function () {
            counter += 1;
            $scope.dynamicForms.push({'id':''+(counter)});
        };
        $scope.removeForm = function(form) {
            $scope.dynamicForms.splice($scope.dynamicForms.indexOf(form),1);   
        };

        $scope.resetReviewsQuery = function () {
            $scope.whichPage = 1;
            $scope.pageSize = 10;
            $scope.attributeOptions = angular.copy(reviewAttributeOptionsConfig);
            $scope.attributeOption = $scope.attributeOptions[0];
            $scope.dynamicForms = [{value: $scope.attributeOption}];
            $scope.showOptions = angular.copy(reviewShowOptionsConfig);
            $scope.showOption.list = [];
            $scope.remixResults = {};
            $scope.results = {};
            $scope.errorResult = false;
            $scope.sortOrder = $scope.sortOrderOptions[0];
            $scope.sortByOptions = angular.copy(sortOrderConfig);
            $scope.sortBy = $scope.sortOptions[0];
        };
        $scope.resetReviewsQuery();

        $scope.parseDynamicForms = ReviewServices.parseDynamicForms;
        $scope.preselectOperator = PreSelectOperatorService.preSelectOperator;
        $scope.addAllShowOptions = AddAllShowOptionsService.addAllShowOptions;


        $scope.selectAll = function (z) {
            if (z === 'allreviews') {
                $scope.showOption.list = angular.copy($scope.showOptions);
            } else if (z === 'noreviews') {
                $scope.showOption.list = [];
            } 
            return;
        };
        $scope.clearBlankSelect = function () {
            $scope.sortOptions.list = ReviewServices.restrictReviewsSortOptionLists($scope.showOption.list);
            $scope.sortBy = $scope.sortOptions.list[0];
        };
}]);
'use strict';

angular.module('bby-query-mixer.reviews').constant('reviewShowOptionsConfig', [ 
	{ text: 'Comment', value: 'comment' },
	{ text: 'Id', value: 'id' },
	{ text: 'Rating', value: 'rating' },
	{ text: 'Reviewer', value: 'reviewer.name' },
	{ text: 'SKU', value: 'sku' },
	{ text: 'Submission Time', value: 'submissionTime' },
	{ text: 'Title', value: 'title' }
])
.constant('restrictedReviewSortOptions', [
	'reviewer.name',
	'aboutMe.customerType'
]);