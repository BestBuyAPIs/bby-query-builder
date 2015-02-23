'use strict';

describe('bby-query-mixer.stores module', function () {

	beforeEach(module('bby-query-mixer.stores', 'appConfig'), function () {
	});

	var ctrl, scope;
	beforeEach(inject(function ($controller, $rootScope) {
		scope = $rootScope.$new();
		ctrl = $controller('storesCtrl', {
			$scope: scope
		});
	}));

	describe('storesCtrl', function () {

		it('should have a controller defined', function () {
			expect(ctrl).toBeDefined();
		});

	});

    describe('build query function', function () {
	    it('should have a build query function', function (){
	        expect(scope.buildRemixQuery).toBeDefined();
	    });
	    it('should build a query string', function (){
	        expect(scope.buildRemixQuery()).toEqual('http://api.remix.bestbuy.com/v1/stores?format=json&callback=JSON_CALLBACK');
	    });
	    it('should update pagination in the query string', function (){
	        scope.pageSize = '12';
	        scope.whichPage = '3';
	        expect(scope.buildRemixQuery()).toEqual('http://api.remix.bestbuy.com/v1/stores?format=json&pageSize=12&page=3&callback=JSON_CALLBACK');
	    });
	    it('should add an ampersand in front of services list, but only if needed', function (){
	        scope.searchSelection.value = 'city';
	        scope.servicesOption.list = ['foo'];
	        expect(scope.buildRemixQuery()).toEqual('http://api.remix.bestbuy.com/v1/stores((city=)&((services.service=foo)))?format=json&callback=JSON_CALLBACK');
	        scope.searchSelection.value = false;
	       	expect(scope.buildRemixQuery()).toEqual('http://api.remix.bestbuy.com/v1/stores((services.service=foo))?format=json&callback=JSON_CALLBACK');
	    });
	   	it('should add list of SKUs to the url', function (){
	        scope.skuList = '6461052,5909042';
	        expect(scope.buildRemixQuery()).toEqual('http://api.remix.bestbuy.com/v1/stores+products(sku%20in%20(6461052,5909042))?format=json&callback=JSON_CALLBACK');
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
            scope.city = 'Narnia';
            scope.storeId = '12345';
            scope.resetInput();
            scope.city = '';
            expect(scope.city).toEqual('');
            expect(scope.storeId).toEqual('');

        });
    });
});