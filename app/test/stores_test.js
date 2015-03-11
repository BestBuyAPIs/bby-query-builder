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

		beforeEach(inject(function ($controller, $rootScope) {
			scope.apiKey = 'testKey';
		
		}));

    describe('build query function', function () {
	    it('should have a build query function', function (){
	        expect(scope.buildRemixQuery).toBeDefined();
	    });
	    it('should build a query string', function (){
	        expect(scope.buildRemixQuery()).toEqual('https://api.remix.bestbuy.com/v1/stores?apiKey=testKey&callback=JSON_CALLBACK&format=json');
	    });
	    it('should update pagination in the query string', function (){
	        scope.pageSize = '12';
	        scope.whichPage = '3';
	        expect(scope.buildRemixQuery()).toEqual('https://api.remix.bestbuy.com/v1/stores&pageSize=12&page=3?apiKey=testKey&callback=JSON_CALLBACK&format=json');
	    });
	    it('should add an ampersand in front of services list, but only if needed', function (){
	     	scope.apiKey = 'testKey';   	        
	        scope.searchSelection.value = 'city';
	        scope.servicesOption.list = ['foo'];
	        expect(scope.buildRemixQuery()).toEqual('https://api.remix.bestbuy.com/v1/stores((city=)&((services.service=foo)))?apiKey=testKey&callback=JSON_CALLBACK&format=json');
	        scope.searchSelection.value = false;
	       	expect(scope.buildRemixQuery()).toEqual('https://api.remix.bestbuy.com/v1/stores((services.service=foo))?apiKey=testKey&callback=JSON_CALLBACK&format=json');
	    });
	   	it('should add list of SKUs to the url', function (){
	        scope.skuList = '6461052,5909042';
	        expect(scope.buildRemixQuery()).toEqual('https://api.remix.bestbuy.com/v1/stores+products(sku%20in%20(6461052,5909042))?apiKey=testKey&show=products.sku,products.name,products.shortDescription,products.salePrice,products.regularPrice,products.addToCartURL,products.url,products.image,products.customerReviewCount,products.customerReviewAverage&callback=JSON_CALLBACK&format=json');
	    });
	   	it('should add list of product options to the url', function (){
	        scope.skuList = '6461052,5909042';
	        scope.productOption.list = 'products.shortDescription'
	        expect(scope.buildRemixQuery()).toEqual('https://api.remix.bestbuy.com/v1/stores+products(sku%20in%20(6461052,5909042))?apiKey=testKey&show=products.shortDescription&callback=JSON_CALLBACK&format=json');
	    });
	   it('should add list of store response options to the url', function (){
	        scope.storeResponse.list = ['hours','name'];
	        expect(scope.buildRemixQuery()).toEqual('https://api.remix.bestbuy.com/v1/stores?apiKey=testKey&show=hours,name&callback=JSON_CALLBACK&format=json');
	    });	 	   
	   	it('should add list of product options AND store response options to the url', function (){
	        scope.skuList = '6461052,5909042';
	        scope.storeResponse.list = ['name','hours'];
	        scope.productOption.list = 'products.shortDescription'
	        expect(scope.buildRemixQuery()).toEqual('https://api.remix.bestbuy.com/v1/stores+products(sku%20in%20(6461052,5909042))?apiKey=testKey&show=products.shortDescription,name,hours&callback=JSON_CALLBACK&format=json');
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