'use strict';

describe('bby-query-mixer.productSearch module', function () {

    beforeEach(module('bby-query-mixer.productSearch'), function () {
    });

    var ctrl, scope;
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        ctrl = $controller('ProductSearchCtrl', {
            $scope: scope
        });
    }));

    describe('productSearch controller', function () {

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
                expect(scope.buildRemixQuery()).toEqual("https://api.remix.bestbuy.com/v1/products?apiKey=youreAnApiKey&callback=JSON_CALLBACK&sort=bestSellingRank.asc&show=sku,name&pageSize=10&page=1&format=json");
            });

            it('should return a query string with no apiKey parameter when no key provided', function () {
                expect(scope.buildRemixQuery()).toEqual("https://api.remix.bestbuy.com/v1/products?sort=bestSellingRank.asc&show=sku,name&pageSize=10&page=1&format=json");
            });

            it('should update the category id value when category is changed', function () {
                scope.category = {
                    value: "abcat33"
                };
                expect(scope.buildRemixQuery()).toEqual("https://api.remix.bestbuy.com/v1/products((categoryPath.id=abcat33))?sort=bestSellingRank.asc&show=sku,name&pageSize=10&page=1&format=json");
                scope.category.value = "abcat34";
                expect(scope.buildRemixQuery()).toEqual("https://api.remix.bestbuy.com/v1/products((categoryPath.id=abcat34))?sort=bestSellingRank.asc&show=sku,name&pageSize=10&page=1&format=json");
            });

            it('should return a query string with a sort filter and sortOrder when specified', function () {
                scope.category.value = "someCategory";
                scope.sortBy = "sku";
                expect(scope.buildRemixQuery()).toEqual("https://api.remix.bestbuy.com/v1/products((categoryPath.id=someCategory))?show=sku,name&pageSize=10&page=1&format=json");
                scope.sortOrder = "desc";
                expect(scope.buildRemixQuery()).toEqual("https://api.remix.bestbuy.com/v1/products((categoryPath.id=someCategory))?show=sku,name&pageSize=10&page=1&format=json");
            });

        });

        describe('buildParams function', function () {
            it('should return empty string when no apiKey and no sortBy', function () {
                scope.sortBy = 'none';
                scope.apiKey = '';
                scope.sortOrder = 'asc';
                expect(scope.buildParams()).toEqual('?show=sku,name&pageSize=10&page=1&format=json');
            });

            it('should return sortBy and sortOrder asc when only sortBy selected', function () {
                scope.apiKey = '';
                scope.sortBy.value = 'sku';
                scope.sortOrder.value = 'asc';

                expect(scope.buildParams()).toEqual('?sort=sku.asc&show=sku,name&pageSize=10&page=1&format=json');
            });

            it('should return sortBy and sortOrder asc when only sortBy selected', function () {
                scope.apiKey = '';
                scope.sortBy.value = 'sku';
                scope.sortOrder.value = 'desc';

                expect(scope.buildParams()).toEqual('?sort=sku.desc&show=sku,name&pageSize=10&page=1&format=json');
            });

            it('should return apiKey when only apiKey specified', function () {
                scope.apiKey = 'someApiKey';
                scope.sortBy = 'none';
                scope.sortOrder = 'desc';

                expect(scope.buildParams()).toEqual('?apiKey=someApiKey&callback=JSON_CALLBACK&show=sku,name&pageSize=10&page=1&format=json');
            });

            it('should return both apiKey and sortBy with sortOrder when both specified', function () {
                scope.apiKey = 'someApiKey';
                scope.sortBy.value = 'sku';
                scope.sortOrder.value = 'desc';

                expect(scope.buildParams()).toEqual('?apiKey=someApiKey&callback=JSON_CALLBACK&sort=sku.desc&show=sku,name&pageSize=10&page=1&format=json');
            });
        });
        describe('reset query function', function () {
            it('should reset all relevant query params', function () {
                scope.resetParams();
                expect(scope.category).toEqual(scope.categories[0]);
                 expect(scope.option).toEqual({showOptions: ['sku', 'name']});
                 expect(scope.whichPage).toEqual(1);
                 expect(scope.sortOrder.value).toEqual('asc');
                 expect(scope.complexAttr).toEqual('');
                 expect(scope.complexVal).toEqual('');
                 expect(scope.pagesize).toEqual(10);
                 expect(scope.attributeOption).toEqual(scope.attributeOptions[0]);
                 expect(scope.sortBy.value).toEqual(scope.sortByOptions[0].value);
                 expect(scope.sortOrder).toEqual(scope.sortOrderOptions[0]);
                 expect(scope.remixResults).toEqual({});
                 expect(scope.keywordSearch).toEqual('');
            });
            it('should leave the apikey as is', function () {
                scope.apiKey = 'myApiKey';
                scope.resetParams();
                expect(scope.apiKey).toEqual('myApiKey');
            });
        });
    });
});