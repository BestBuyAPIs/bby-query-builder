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

        it('should have apiKey', function () {
            expect(scope.apiKey).toBeDefined();
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
                expect(scope.buildRemixQuery()).toEqual("https://api.remix.bestbuy.com/v1/products(categoryPath.id=pcmcat209400050001)?apiKey=youreAnApiKey");
            });

            it('should return a empty string when a empty apikey is passed in', function () {
                expect(scope.buildRemixQuery()).toEqual("https://api.remix.bestbuy.com/v1/products(categoryPath.id=pcmcat209400050001)");
            });

            it('should return a query string with a category filter when one is selected', function () {
                scope.category = {
                    value: "abcat33"
                };
                scope.apiKey = "youreAnApiKey";
                expect(scope.buildRemixQuery()).toEqual("https://api.remix.bestbuy.com/v1/products(categoryPath.id=abcat33)?apiKey=youreAnApiKey");
                scope.category.value = "abcat34";
                expect(scope.buildRemixQuery()).toEqual("https://api.remix.bestbuy.com/v1/products(categoryPath.id=abcat34)?apiKey=youreAnApiKey");
                scope.apiKey = "";
                scope.category.value = "someCategory";
                expect(scope.buildRemixQuery()).toEqual("https://api.remix.bestbuy.com/v1/products(categoryPath.id=someCategory)");
            });

            it('should return a query string with a sort filter and sortOrder when a sort filter is selected', function () {
                scope.category = {
                    value: "someCategory"
                };
                scope.apiKey = "youreAnApiKey";
                scope.sortBy = "none"
                expect(scope.buildRemixQuery()).toEqual("https://api.remix.bestbuy.com/v1/products(categoryPath.id=someCategory)?apiKey=youreAnApiKey");
                scope.sortBy = "sku"
                expect(scope.buildRemixQuery()).toEqual("https://api.remix.bestbuy.com/v1/products(categoryPath.id=someCategory)?apiKey=youreAnApiKey&sort=sku.asc");
                scope.sortOrder = "desc"
                expect(scope.buildRemixQuery()).toEqual("https://api.remix.bestbuy.com/v1/products(categoryPath.id=someCategory)?apiKey=youreAnApiKey&sort=sku.desc");
                scope.sortBy = "none"
                expect(scope.buildRemixQuery()).toEqual("https://api.remix.bestbuy.com/v1/products(categoryPath.id=someCategory)?apiKey=youreAnApiKey")
                scope.apiKey = ""
                expect(scope.buildRemixQuery()).toEqual("https://api.remix.bestbuy.com/v1/products(categoryPath.id=someCategory)")
                expect(scope.sortOrder.isDisabled)
                expect(scope.sortBy.isDisabled)
            });

        });

    });


});