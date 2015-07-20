'use strict';

describe('bby-query-mixer.stores module', function () {

	beforeEach(module('bby-query-mixer.stores', 'appConfig'), function () {
	});

	var ctrl, scope, queryParams, StoreServices, ga;
	beforeEach(inject(function ($controller, $rootScope,_StoreServices_) {
		scope = $rootScope.$new();
		ctrl = $controller('storesCtrl', {
			$scope: scope
		});
		StoreServices = _StoreServices_;
		queryParams = [];
        ga = (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
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
	        expect(scope.buildRemixQuery()).toEqual('https://api.bestbuy.com/v1/stores?apiKey=testKey&callback=JSON_CALLBACK&format=json');
	    });
	    it('should update pagination in the query string', function (){
	        var queryParams = [];
	        scope.pageSize = '12';
	        scope.whichPage = '3';
	        expect(scope.buildRemixQuery()).toEqual('https://api.bestbuy.com/v1/stores?apiKey=testKey&pageSize=12&page=3&callback=JSON_CALLBACK&format=json');
	    });
	    it('should add an ampersand in front of services list, but only if needed', function (){
	     	scope.apiKey = 'testKey';   	        
	        scope.searchSelection.value = 'city';
	        scope.servicesOption.list = ['foo'];
	        expect(scope.buildRemixQuery()).toEqual('https://api.bestbuy.com/v1/stores((city=)&((services.service=foo)))?apiKey=testKey&callback=JSON_CALLBACK&format=json');
	        scope.searchSelection.value = false;
            expect(scope.buildRemixQuery()).toEqual('https://api.bestbuy.com/v1/stores((services.service=foo))?apiKey=testKey&callback=JSON_CALLBACK&format=json');
	    });
	   	it('should add list of SKUs to the url', function (){
	        scope.skuList = '6461052,5909042';
	        expect(scope.buildRemixQuery()).toEqual('https://api.bestbuy.com/v1/stores+products(sku%20in%20(6461052,5909042))?apiKey=testKey&show=products.sku,products.name,products.shortDescription,products.salePrice,products.regularPrice,products.addToCartURL,products.url,products.image,products.customerReviewCount,products.customerReviewAverage&callback=JSON_CALLBACK&format=json');
	    });
	   	it('should add list of product options to the url', function (){
	        scope.skuList = '6461052,5909042';
	        scope.productOption.list = 'products.shortDescription'
	        expect(scope.buildRemixQuery()).toEqual('https://api.bestbuy.com/v1/stores+products(sku%20in%20(6461052,5909042))?apiKey=testKey&show=products.shortDescription&callback=JSON_CALLBACK&format=json');
	    });
	   	it('should add list of store response options to the url', function (){
	        scope.storeResponse.list = ['hours','name'];
	        expect(scope.buildRemixQuery()).toEqual('https://api.bestbuy.com/v1/stores?apiKey=testKey&show=hours,name&callback=JSON_CALLBACK&format=json');
	    });	 	   
	   	it('should add list of product options AND store response options to the url', function (){
	        scope.skuList = '6461052,5909042';
	        scope.storeResponse.list = ['name','hours'];
	        scope.productOption.list = 'products.shortDescription'
	        expect(scope.buildRemixQuery()).toEqual('https://api.bestbuy.com/v1/stores+products(sku%20in%20(6461052,5909042))?apiKey=testKey&show=products.shortDescription,name,hours&callback=JSON_CALLBACK&format=json');
	    });
	    it('should search by city', function () {
	    	scope.searchSelection.value = 'city';
	    	scope.cityChoice = "EmeraldCity";
	        expect(scope.buildRemixQuery()).toEqual('https://api.bestbuy.com/v1/stores((city=EmeraldCity))?apiKey=testKey&callback=JSON_CALLBACK&format=json')
	    });
	    it('should search by postal code', function () {
	    	scope.zipCode = '12345';
            expect(scope.buildRemixQuery()).toEqual('https://api.bestbuy.com/v1/stores((postalCode=12345))?apiKey=testKey&callback=JSON_CALLBACK&format=json')

	    });
	    it('should search by lat long', function () {
	    	scope.longitude = 50;
	    	scope.latitude = 50;
	    	expect(scope.buildRemixQuery()).toEqual('https://api.bestbuy.com/v1/stores((area(50,50,)))?apiKey=testKey&callback=JSON_CALLBACK&format=json')

	    });	
	    it('should search by storeid', function () {
			scope.searchSelection.value = 'storeId';
			scope.storeId = '54321';
			expect(scope.buildRemixQuery()).toEqual('https://api.bestbuy.com/v1/stores((storeId=54321))?apiKey=testKey&callback=JSON_CALLBACK&format=json')
	    });	        	    		     
	    it('should search by region/state', function () {
			scope.searchSelection.value ='region';
			scope.regionOption = {value:"Minnesota"};
			expect(scope.buildRemixQuery()).toEqual('https://api.bestbuy.com/v1/stores((region=Minnesota))?apiKey=testKey&callback=JSON_CALLBACK&format=json');
	    });   
	    it('should add a key', function () {
	    	scope.apiKey = "mySuperSecretApiKey";
	    	expect(scope.buildRemixQuery()).toEqual('https://api.bestbuy.com/v1/stores?apiKey=mySuperSecretApiKey&callback=JSON_CALLBACK&format=json');
	    }); 	
	   	it('should add store types', function () {
	    	scope.storeType.list = ['Big Box', 'Express'];
	    	expect(scope.buildRemixQuery()).toEqual('https://api.bestbuy.com/v1/stores(((storeType=Big Box)|(storeType=Express)))?apiKey=testKey&callback=JSON_CALLBACK&format=json');
	    });  
	   	it('should add store services', function () {
	    	scope.servicesOption.list = ['Geek Squad', 'Best Buy for Enterprise'];
	    	expect(scope.buildRemixQuery()).toEqual('https://api.bestbuy.com/v1/stores((services.service=Geek Squad)&(services.service=Best Buy for Enterprise))?apiKey=testKey&callback=JSON_CALLBACK&format=json');
	    });     
    });

	describe('invoke query function', function () {
		it('should error when no apikey is present', function () {
			scope.apiKey = '';
			scope.invokeRemixQuery();
			expect(scope.errorResult).toEqual(true);
		});	
		it('should work with an apikey', function () {
			scope.apiKey = '12345';
			scope.invokeRemixQuery();
			expect(scope.errorResult).toEqual(false);
		});		
	});

	describe('helpers / constants', function (){
		it('should have a list of search options', function (){
			expect(scope.options).toBeDefined();
		});
		it('should have a add all options function', function (){
			expect(StoreServices.addAllOptions).toBeDefined();
		});
		it('should have a function for tracking copy url events', function (){
			expect(scope.callCopyEvent).toBeDefined();
		});
		it('should have a select all function', function (){
			expect(scope.selectAll).toBeDefined();
		});		
		it('should have a list of store types', function (){
			expect(scope.storeTypes).toBeDefined();
		})
		it('should have a store type filter function', function (){
			expect(StoreServices.filterStoreType).toBeDefined();
		})
		it('should filter store types correctly', function (){
			var storeTypesArray = ['big box', 'mobile', 'express kiosk']
			expect(StoreServices.filterStoreType(storeTypesArray)).toEqual('(storeType=big box)|(storeType=mobile)|(storeType=express kiosk)');
		});
		it('should have a store service filter', function (){
			expect(StoreServices.filterStoreService()).toBeDefined();
		})
		it('should filter store services correctly', function (){
			var storeServicesArray = ['repairs','business','mobile phones'];
			expect(StoreServices.filterStoreService(storeServicesArray)).toEqual('(services.service=repairs)&(services.service=business)&(services.service=mobile phones)');
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