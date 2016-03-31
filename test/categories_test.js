'use strict';

describe('bby-query-mixer.categories module', function () {

	beforeEach(module('bby-query-mixer.categories', 'appConfig'), function () {
	});

	var ctrl, scope, ga;
	beforeEach(inject(function ($controller, $rootScope) {
		scope = $rootScope.$new();
		ctrl = $controller('CategoriesCtrl', {
			$scope: scope
		});
        ga = (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
                })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

		
	}));

    beforeEach(inject(function ($controller, $rootScope) {
        scope.apiKey = 'youreAnApiKey';
    }));

	describe('CategoriesCtrl', function () {

		it('should have a controller defined', function () {
			expect(ctrl).toBeDefined();
		});

		it('should have searchOptions defined', function () {
			expect(scope.searchOptions).toBeDefined();
		});
	});

    describe('build query function', function () {
	    it('should have a build query function', function (){
	        expect(scope.buildRemixQuery).toBeDefined();
	    });
	    it('should build a query string', function (){
	        expect(scope.buildRemixQuery()).toEqual('https://api.bestbuy.com/v1/categories?apiKey=youreAnApiKey&callback=JSON_CALLBACK&format=json');
	    });
	    it('should update pagination in the query string', function (){
	        scope.pageSize = '12';
	        scope.whichPage = '3';
	        expect(scope.buildRemixQuery()).toEqual('https://api.bestbuy.com/v1/categories?apiKey=youreAnApiKey&pageSize=12&page=3&callback=JSON_CALLBACK&format=json');
	    });
	   	it('should add category name if needed', function (){
	        scope.categoryName = 'awesomeProducts';
	        expect(scope.buildRemixQuery()).toEqual('https://api.bestbuy.com/v1/categories(name=awesomeProducts*)?apiKey=youreAnApiKey&callback=JSON_CALLBACK&format=json');
	    });
	   	it('should add category id if needed', function (){
	        scope.categoryId = 'abcat0401000';
	        expect(scope.buildRemixQuery()).toEqual('https://api.bestbuy.com/v1/categories(id=abcat0401000)?apiKey=youreAnApiKey&callback=JSON_CALLBACK&format=json');
	    });
	   	it('should add the correct response attributes', function (){
	        scope.categoryResponse.list = ['id','name','subcategory'];
	        expect(scope.buildRemixQuery()).toEqual('https://api.bestbuy.com/v1/categories?apiKey=youreAnApiKey&show=id,name,subcategory&callback=JSON_CALLBACK&format=json');
	    });	 	    
    });

	describe('invoke query function', function () {
		it('should error when no apikey is present', function () {
			scope.apiKey = '';
			scope.invokeRemixQuery();
			expect(scope.errorResult).toEqual(true);
		});
		it('should error when no category is selected', function () {
			scope.searchSelection.value = '';
			scope.invokeRemixQuery();
			expect(scope.errorResult).toEqual(true);
		});		
		it('should work with category and apikey', function () {
			scope.searchSelection.value = 'cameras';
			scope.apiKey = '12345';
			scope.invokeRemixQuery();
			expect(scope.errorResult).toEqual(false);
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
    describe('clearResponseList function', function () {
        it('should clear the response list', function () {
        	scope.clearResponseList()
            expect(scope.categoryResponse.list).toEqual([]);
        });
    });
    describe('preselectTop function', function () {
        it('should preselect toplevelcategories when necessary', function () {
        	scope.searchSelection.value = 'toplevelcategories';
            scope.preselectTop();
            var expected = scope.searchOptions[2].responseOptions.map(function (item) {
                return item.value;
            });
            expect(scope.categoryResponse.list).toEqual(expected);
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

    });
});