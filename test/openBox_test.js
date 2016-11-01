'use strict';

describe('bby-query-mixer.productSearch module', function () {

    beforeEach(module('bby-query-mixer.openBox', 'appConfig'), function () {
    });

    var ctrl, scope;
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        ctrl = $controller('openBoxCtrl', {
            $scope: scope
        });
    }));

    describe('openBoxCtrl', function () {

        it('should have a controller defined', function () {
            expect(ctrl).toBeDefined();
        });

        it('should have a category id associated with each category label', function () {
            scope.categories.map(function (categoryOption) {
                expect(categoryOption.value).toBeDefined();
                expect(categoryOption.label).toBeDefined();
            });
        });

        describe('build query function', function () {
            it('should have a build query function', function (){
                expect(scope.buildRemixQuery).toBeDefined();
            });
            it('should build a query string', function (){
                expect(scope.buildRemixQuery()).toEqual('https://api.bestbuy.com/beta/products/openBox');
            });
            it('should update pagination in the query string', function (){
                scope.pageSize = '12';
                scope.whichPage = '3';
                expect(scope.buildRemixQuery()).toEqual('https://api.bestbuy.com/beta/products/openBox&pageSize=12&page=3');
            });
            it('should search by category id', function (){
                scope.searchSelection.value = "category";
                scope.category.value = 'pcmcat209400050001'
                expect(scope.buildRemixQuery()).toEqual('https://api.bestbuy.com/beta/products/openBox(categoryId=pcmcat209400050001)');
            });
            it('should search for all skus', function (){
                scope.searchSelection.value = "allSkus";
                expect(scope.buildRemixQuery()).toEqual('https://api.bestbuy.com/beta/products/openBox');
            });
            it('should add list of skus', function (){
                scope.searchSelection.value = "skuList";
                scope.skuList = '123,321';
                expect(scope.buildRemixQuery()).toEqual('https://api.bestbuy.com/beta/products/openBox(sku%20in(123,321))');
            });
            it('should add singlesku', function (){
                scope.searchSelection.value = "singleSku";
                scope.singleSku = '123';
                expect(scope.buildRemixQuery()).toEqual('https://api.bestbuy.com/beta/products/123/openBox');
            });
    });


    describe('invokeRemixQuery function', function () {
        it('should error if no apikey is present', function () {
            scope.apiKey = '';
            scope.searchSelection.value = "category";
            scope.invokeRemixQuery();
            expect(scope.results).toEqual("Please enter your API Key");
            expect(scope.errorResult).toEqual(true);
        });

        it('should have an invoke query function', function () {
            expect(scope.invokeRemixQuery).toBeDefined();
        });

        it('should error if no search option is selected', function () {
            scope.apiKey = 'myAwesomeApiKey';
            scope.searchSelection.value = 0;
            scope.invokeRemixQuery();
            expect(scope.results).toEqual("Please pick a search option");
            expect(scope.errorResult).toEqual(true);
        });
    });
        
    describe('reset query function', function () {
        it('should reset all relevant query params', function () {
            scope.resetParams();
            expect(scope.errorResult).toEqual(false);
            expect(scope.results).toEqual({});
            expect(scope.pageSize).toEqual(10);
            expect(scope.whichPage).toEqual(1);
            expect(scope.searchSelection).toEqual(scope.options[0]);
        });
        
        it('should leave the apikey as is', function () {
            scope.apiKey = 'myApiKey';
            scope.resetParams();
            expect(scope.apiKey).toEqual('myApiKey');
        });
        it('should reset attribute values if a different selector is chosen', function () {
            scope.skuList = '123,456,789';
            scope.category = 'abcdefghij';
            scope.singleSku = '12345678';
            scope.resetSelectionValues();
            expect(scope.singleSku).toEqual('');
            scope.skuList = '';
            expect(scope.category).toEqual(scope.categories[0]);

        });
    });
    });
});