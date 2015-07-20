'use strict';

describe('bby-query-mixer.productSearch module', function () {

    beforeEach(module('bby-query-mixer.productSearch', 'appConfig'), function () {
    });

    var ctrl, scope, ProductServices, PreSelectOperatorService;
    beforeEach(inject(function ($controller, $rootScope, _ProductServices_, _PreSelectOperatorService_) {
        scope = $rootScope.$new();
        ctrl = $controller('ProductSearchCtrl', {
            $scope: scope
        });
        ProductServices = _ProductServices_;
        PreSelectOperatorService = _PreSelectOperatorService_;
    }));
    describe('productSearch controller', function () {
        beforeEach(inject(function ($controller, $rootScope) {
            scope.apiKey = 'youreAnApiKey';
        }));
        it('should have a controller defined', function () {
            expect(ctrl).toBeDefined();
        });
        it('should have a category id associated with each category label', function () {
            scope.categories.map(function (categoryOption) {
                expect(categoryOption.value).toBeDefined();
                expect(categoryOption.label).toBeDefined();
            });
        });
        describe('buildRemixQuery function', function () {
            it('should have a remix query function', function () {
                expect(scope.buildRemixQuery).toBeDefined();
            });

            it('should return a url when apikey passed in', function () {
                scope.apiKey = "youreAnApiKey";
                expect(scope.buildRemixQuery()).toEqual("https://api.bestbuy.com/v1/products?apiKey=youreAnApiKey&callback=JSON_CALLBACK&format=json");
            });

            it('should return a query string with no apiKey parameter when no key provided', function () {
                scope.apiKey='';
                expect(scope.buildRemixQuery()).toEqual("https://api.bestbuy.com/v1/products?callback=JSON_CALLBACK&format=json");
            });

            it('should update the category id value when category is changed', function () {
                scope.category = {
                    value: "abcat33"
                };
                expect(scope.buildRemixQuery()).toEqual("https://api.bestbuy.com/v1/products((categoryPath.id=abcat33))?apiKey=youreAnApiKey&callback=JSON_CALLBACK&format=json");
                scope.category.value = "abcat34";
                expect(scope.buildRemixQuery()).toEqual("https://api.bestbuy.com/v1/products((categoryPath.id=abcat34))?apiKey=youreAnApiKey&callback=JSON_CALLBACK&format=json");
            });

            it('should return a query string with a sort filter and sortOrder when specified', function () {
                scope.category.value = "someCategory";
                expect(scope.buildRemixQuery()).toEqual("https://api.bestbuy.com/v1/products((categoryPath.id=someCategory))?apiKey=youreAnApiKey&callback=JSON_CALLBACK&format=json");
                scope.sortOrder.value = "desc";
                expect(scope.buildRemixQuery()).toEqual("https://api.bestbuy.com/v1/products((categoryPath.id=someCategory))?apiKey=youreAnApiKey&callback=JSON_CALLBACK&format=json");
            });
            it('should return the right parens when sku in query is made', function () {
                scope.dynamicForms= [{value:{productAttribute:'sku'},opt:{value:' in '},complexVal:'123, 456'}]
                var form = {value:{operator:[{value:'='}]}}
                scope.facetAttribute = '';
                scope.attributeOption.value = 'sku';
                scope.operator.value = ' in ';
                scope.complexVal = '123, 456';
                expect(scope.buildRemixQuery()).toEqual("https://api.bestbuy.com/v1/products(sku in (123, 456))?apiKey=youreAnApiKey&callback=JSON_CALLBACK&format=json");
            });
            it('should add an asterisk after category path name', function () {
                scope.dynamicForms= [{value:{productAttribute:'categoryPath.name'},opt:{value:'='},complexVal:'Home Theater'}]
                expect(scope.buildRemixQuery()).toEqual("https://api.bestbuy.com/v1/products(categoryPath.name=Home Theater*)?apiKey=youreAnApiKey&callback=JSON_CALLBACK&format=json");
            });            
            it('should return add faceting when specified', function () {
                scope.facetAttribute.productAttribute = 'color';
                scope.facetNumber = 11;
                expect(scope.buildRemixQuery()).toEqual("https://api.bestbuy.com/v1/products?apiKey=youreAnApiKey&facet=color,11&callback=JSON_CALLBACK&format=json");
            });
            it('should add bad values to query so that remix returns the proper error status', function () {
                scope.dynamicForms= [{value:{productAttribute:'bestSellingRank'},opt:{value:'='},complexVal:'wwwwwwwwww'}]
                expect(scope.buildRemixQuery()).toEqual("https://api.bestbuy.com/v1/products(bestSellingRank=wwwwwwwwww)?apiKey=youreAnApiKey&callback=JSON_CALLBACK&format=json");
            });
            it('should add the star value to the query when selected', function () {
                scope.dynamicForms= [{value:{productAttribute:'onSale'},opt:{value:'='},complexVal:'*'}];
                expect(scope.buildRemixQuery()).toEqual("https://api.bestbuy.com/v1/products(onSale=*)?apiKey=youreAnApiKey&callback=JSON_CALLBACK&format=json");
            });
            it('should allow invalid page sizes so remix can return the real error message', function () {
                scope.pageSize = 111;
                expect(scope.buildRemixQuery()).toEqual("https://api.bestbuy.com/v1/products?apiKey=youreAnApiKey&pageSize=111&callback=JSON_CALLBACK&format=json");
            });              
        });
        describe('buildParams function', function () {
            it('should return sortBy and sortOrder asc when only sortBy selected', function () {
                scope.apiKey = '';
                scope.sortBy = {value : 'sku'};
                scope.sortOrder.value = 'asc';
                expect(scope.buildParams()).toEqual('?sort=sku.asc&callback=JSON_CALLBACK&format=json');
            });
            it('should return sortBy and sortOrder asc when only sortBy selected', function () {
                scope.apiKey = '';
                scope.sortBy = {value : 'sku'};
                scope.sortOrder.value = 'desc';

                expect(scope.buildParams()).toEqual('?sort=sku.desc&callback=JSON_CALLBACK&format=json');
            });
            it('should return apiKey when only apiKey specified', function () {
                scope.apiKey = 'someApiKey';
                expect(scope.buildParams()).toEqual('?apiKey=someApiKey&callback=JSON_CALLBACK&format=json');
            });
            it('should return both apiKey and sortBy with sortOrder when both specified', function () {
                scope.apiKey = 'someApiKey';
                scope.sortBy = {value : 'sku'};
                scope.sortOrder.value = 'desc';

                expect(scope.buildParams()).toEqual('?apiKey=someApiKey&sort=sku.desc&callback=JSON_CALLBACK&format=json');
            });
            it('should add faceting when it\'s defined', function () {
                scope.facetAttribute.productAttribute = 'manufacturer';
                scope.facetNumber = '3';
                expect(scope.buildParams()).toEqual('?apiKey=youreAnApiKey&facet=manufacturer,3&callback=JSON_CALLBACK&format=json');
            });
            it('construct pagination only when needed', function () {
                expect(scope.buildParams()).toEqual('?apiKey=youreAnApiKey&callback=JSON_CALLBACK&format=json');
                scope.pageSize = 11;
                scope.whichPage = 3;
                expect(scope.buildParams()).toEqual('?apiKey=youreAnApiKey&pageSize=11&page=3&callback=JSON_CALLBACK&format=json');
            });
        });
        describe('reset query function', function () {
            it('should reset all relevant query params', function () {
                scope.resetParams();
                expect(scope.category).toEqual(scope.categories[0]);
                expect(scope.whichPage).toEqual(1);
                expect(scope.sortOrder.value).toEqual('asc');
                expect(scope.complexAttr).toEqual('');
                expect(scope.complexVal).toEqual('');
                expect(scope.pageSize).toEqual(10);
                expect(scope.attributeOption).toEqual(scope.attributeOptions[0]);
                expect(scope.sortOrder).toEqual(scope.sortOrderOptions[0]);
                expect(scope.remixResults).toEqual({});
                expect(scope.keywordSearch).toEqual('');
                expect(scope.facetAttribute).toEqual(scope.attributeOptions[0]);
            });
            it('should leave the apikey as is', function () {
                scope.apiKey = 'myApiKey';
                scope.resetParams();
                expect(scope.apiKey).toEqual('myApiKey');
            });
        });
        describe('invokeRemixQuery function', function () {
            it('should error if no apikey is present', function () {
                scope.apiKey = '';
                scope.invokeRemixQuery();
                expect(scope.remixResults).toEqual("Please enter your API Key");
                expect(scope.errorResult).toEqual(true);
            });
        });
        describe('preselectOperator function', function () {
            it('should reset values when attribute dropdown is changed', function () {
                var form = {value:{operator:[]}};
                PreSelectOperatorService.preSelectOperator(form);
                expect(scope.operator).toEqual(scope.attributeOption.operator[0]);
                expect(scope.complexVal).toEqual('');
            });
        });
        describe('dynamic forms functionality', function () {
            it('should compile the array of forms and add it to the remix query url', function () {
                scope.dynamicForms= [{value:{productAttribute:'foo'},opt:{value:'='},complexVal:'foo'}]
                expect(scope.buildRemixQuery()).toEqual("https://api.bestbuy.com/v1/products(foo=foo)?apiKey=youreAnApiKey&callback=JSON_CALLBACK&format=json");
            });
             it('should add/delete forms from the dynamic attributes list', function () {
                scope.dynamicForms = [{value:{productAttribute:'foo'},opt:{value:'='},complexVal:'foo'}]
                expect(scope.dynamicForms.length).toEqual(1);
                scope.addNewForm();
                expect(scope.dynamicForms.length).toEqual(2);
                scope.removeForm();
                expect(scope.dynamicForms.length).toEqual(1);
            });           
        });
        describe('sort by form function', function () {
            it('should populate the sort by list depending on what is in the product attributes', function () {
                scope.showOption.list = ['buzz','foo','bar'];
                scope.clearBlankSelect();
                expect(scope.sortBy).toEqual("buzz");
                scope.showOption.list = ['fizz','banana','mango'];
                scope.clearBlankSelect();
                expect(scope.sortBy).toEqual("fizz");
            });
        });
        describe('select all button', function () {
            it('should select all', function () {
                scope.selectAll('allproducts')
                expect(scope.showOption.list.length).toEqual(41);
            });
            it('should select none', function () {
                scope.selectAll('none')
                expect(scope.showOption.list.length).toEqual(0);
            });
        });
        describe('restrict sort options function', function () {
            it('should return an array without the values on the restricted list', function () {
                var firstArray = [    
                    {value:'accessories.sku'},
                    {value:'categoryPath.id'},
                    {value:'categoryPath.name'},
                    {value:'details.name'},
                    {value:'details.value'},
                    {value:'features.feature'},
                    {value:'frequentlyPurchasedWith.sku'},
                    {value:'includedItemList.includedItem'},
                    {value:'mobileUrl'},
                    {value:'relatedProducts.sku'},
                    {value:'shipping'},
                    {value:'color'},
                    {value:'salePrice'}, 
                ];
                var secondArray = ProductServices.restrictSortOptionLists(firstArray);
                expect(secondArray).toEqual([ { value : 'color' }, { value : 'salePrice' } ]);
            });
        });
        describe('clearBlankSelect function', function () {
            it('should set sortBy and sortOptions correctly', function () {
                scope.showOption.list = [{value:'shipping'},{value:'color'},{value:'salePrice'},{value:'type'}];
                scope.clearBlankSelect();
                expect(scope.sortOptions.list).toEqual([ { value : 'color' }, { value : 'salePrice' }, { value : 'type' } ]);
                expect(scope.sortBy).toEqual({ value : 'color' });
            });
        });
    });
});