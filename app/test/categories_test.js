'use strict';

describe('bby-query-mixer.categories module', function () {

	beforeEach(module('bby-query-mixer.categories', 'appConfig'), function () {
	});

	var ctrl, scope;
	beforeEach(inject(function ($controller, $rootScope) {
		scope = $rootScope.$new();
		ctrl = $controller('CategoriesCtrl', {
			$scope: scope
		});
	}));

    beforeEach(inject(function ($controller, $rootScope) {
        scope.apiKey = 'youreAnApiKey';
    }));

	describe('CategoriesCtrl', function () {

		it('should have a controller defined', function () {
			expect(ctrl).toBeDefined();
		});

	});

    describe('build query function', function () {
	    it('should have a build query function', function (){
	        expect(scope.buildRemixQuery).toBeDefined();
	    });
	    it('should build a query string', function (){
	        expect(scope.buildRemixQuery()).toEqual('http://api.remix.bestbuy.com/v1/categories?apiKey=youreAnApiKey&callback=JSON_CALLBACK&format=json');
	    });
	    it('should update pagination in the query string', function (){
	        scope.pageSize = '12';
	        scope.whichPage = '3';
	        expect(scope.buildRemixQuery()).toEqual('http://api.remix.bestbuy.com/v1/categories?apiKey=youreAnApiKey&pageSize=12&page=3&callback=JSON_CALLBACK&format=json');
	    });
	   	it('should add category name if needed', function (){
	        scope.categoryName = 'awesomeProducts';
	        expect(scope.buildRemixQuery()).toEqual('http://api.remix.bestbuy.com/v1/categories(name=awesomeProducts*)?apiKey=youreAnApiKey&callback=JSON_CALLBACK&format=json');
	    });
	   	it('should add category id if needed', function (){
	        scope.categoryId = 'abcat0401000';
	        expect(scope.buildRemixQuery()).toEqual('http://api.remix.bestbuy.com/v1/categories(id=abcat0401000)?apiKey=youreAnApiKey&callback=JSON_CALLBACK&format=json');
	    });
	   	it('should add the correct response attributes', function (){
	        scope.categoryResponse.list = ['id','name','subcategory'];
	        expect(scope.buildRemixQuery()).toEqual('http://api.remix.bestbuy.com/v1/categories?apiKey=youreAnApiKey&show=id,name,subcategory&callback=JSON_CALLBACK&format=json');
	    });	 	    
    });

    describe('reset query function', function () {
        it('should reset all relevant query params', function () {
            scope.resetParams();
            expect(scope.categoryResponse.list).toEqual([]);
            expect(scope.searchSelection).toEqual(scope.searchOptions[0]);
            expect(scope.categoryResponse.list).toEqual([]);
        });
        
        it('should leave the apikey as is', function () {
            scope.apiKey = 'myApiKey';
            scope.resetParams();
            expect(scope.apiKey).toEqual('myApiKey');
        });
    });

    describe('resetInput function', function () {
    	it('should reset inputs and response options', function () {
    		scope.categoryName = 'test';
    		scope.categoryId = '1234';
    		scope.categoryResponse.list = ['foo','bar'];
    		scope.pageSize = 300;
    		scope.whichPage = 300;

    		scope.resetInput();

    		expect(scope.categoryName).toEqual('');
    		expect(scope.categoryId).toEqual('');
    		expect(scope.categoryResponse.list).toEqual([]);
    		expect(scope.whichPage).toEqual(1);
    		expect(scope.pageSize).toEqual(10);
    	});
    	it('should preselect id and name for top level categories search', function () {
    		scope.searchSelection.value = 'toplevelcategories';
    		scope.resetInput();
    		expect(scope.categoryResponse.list).toEqual(['id','name']);
    	});
    });
});