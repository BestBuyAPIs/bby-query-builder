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
                expect(scope.buildRemixQuery()).toEqual("https://api.remix.bestbuy.com/v1/products(categoryPath.id=pcmcat209400050001)?apiKey=youreAnApiKey&format=json");
            });

            it('should return a query string with no apiKey parameter when no key provided', function () {
                expect(scope.buildRemixQuery()).toEqual("https://api.remix.bestbuy.com/v1/products(categoryPath.id=pcmcat209400050001)?format=json");
            });

            it('should update the category id value when category is changed', function () {
                scope.category = {
                    value: "abcat33"
                };
                expect(scope.buildRemixQuery()).toEqual("https://api.remix.bestbuy.com/v1/products(categoryPath.id=abcat33)?format=json");
                scope.category.value = "abcat34";
                expect(scope.buildRemixQuery()).toEqual("https://api.remix.bestbuy.com/v1/products(categoryPath.id=abcat34)?format=json");
            });

            it('should return a query string with a sort filter and sortOrder when specified', function () {
                scope.category.value = "someCategory";
                scope.sortBy = "sku";
                expect(scope.buildRemixQuery()).toEqual("https://api.remix.bestbuy.com/v1/products(categoryPath.id=someCategory)?sort=sku.asc&format=json");
                scope.sortOrder = "desc";
                expect(scope.buildRemixQuery()).toEqual("https://api.remix.bestbuy.com/v1/products(categoryPath.id=someCategory)?sort=sku.desc&format=json");
            });

        });

        describe('buildParams function', function () {
            it('should return empty string when no apiKey and no sortBy', function () {
                scope.sortBy = 'none';
                scope.apiKey = '';
                scope.sortOrder = 'asc';
                expect(scope.buildParams()).toEqual('?format=json');
            });

            it('should return sortBy and sortOrder asc when only sortBy selected', function () {
                scope.apiKey = '';
                scope.sortBy = 'sku';
                scope.sortOrder = 'asc';

                expect(scope.buildParams()).toEqual('?sort=sku.asc&format=json');
            });

            it('should return sortBy and sortOrder asc when only sortBy selected', function () {
                scope.apiKey = '';
                scope.sortBy = 'sku';
                scope.sortOrder = 'desc';

                expect(scope.buildParams()).toEqual('?sort=sku.desc&format=json');
            });

            it('should return apiKey when only apiKey specified', function () {
                scope.apiKey = 'someApiKey';
                scope.sortBy = 'none';
                scope.sortOrder = 'desc';

                expect(scope.buildParams()).toEqual('?apiKey=someApiKey&format=json');
            });

            it('should return both apiKey and sortBy with sortOrder when both specified', function () {
                scope.apiKey = 'someApiKey';
                scope.sortBy = 'sku';
                scope.sortOrder = 'desc';

                expect(scope.buildParams()).toEqual('?apiKey=someApiKey&sort=sku.desc&format=json');
            });
        });
    });
});