'use strict';

describe('bby-query-mixer.reviews module', function () {

    beforeEach(module('bby-query-mixer.reviews', 'appConfig'));

    describe('reviews controller', function () {
        var ctrl, scope, ga, ReviewServices;
        beforeEach(inject(function ($controller, $rootScope, _ReviewServices_) {
            scope = $rootScope.$new();
            ctrl = $controller('ReviewsCtrl', {
                $scope: scope
            });
            ReviewServices = _ReviewServices_;
            ga = (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
                    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
            }));
        beforeEach(inject(function ($controller, $rootScope) {
            scope.apiKey = 'testKey';
        
        }));
        describe('build reviews query function', function () {
            it('should be defined', function () {
                expect(scope.buildReviewsQuery).toBeDefined();
            });
            it('should build the right base url', function (){
                expect(scope.buildReviewsQuery()).toEqual('https://api.bestbuy.com/v1/reviews?apiKey=testKey&callback=JSON_CALLBACK&format=json');
            });
            it('should be add apikey if present', function () {
                scope.apiKey = '123456';
                expect(scope.buildReviewsQuery()).toEqual('https://api.bestbuy.com/v1/reviews?apiKey=123456&callback=JSON_CALLBACK&format=json');
            });
            it('should be add pagination if it is not default value', function () {
                scope.whichPage = '12';
                scope.pageSize = '12';
                expect(scope.buildReviewsQuery()).toEqual('https://api.bestbuy.com/v1/reviews?apiKey=testKey&pageSize=12&page=12&callback=JSON_CALLBACK&format=json');
            });
            it('should add sort options if needed', function () {
                scope.sortBy = "rating";
                scope.sortOrder.value = 'asc';
                expect(scope.buildReviewsQuery()).toEqual('https://api.bestbuy.com/v1/reviews?apiKey=testKey&callback=JSON_CALLBACK&format=json');
            });
            it('should add list of different search paramters', function () {
                scope.dynamicForms = [ {value:{reviewAttribute:'test'}, opt:{value:'='}, complexVal:"bar" },{value:{reviewAttribute:'foo'}, opt:{value:'='}, complexVal:"apple" } ];
                expect(scope.buildReviewsQuery()).toEqual('https://api.bestbuy.com/v1/reviews(test=bar&foo=apple)?apiKey=testKey&callback=JSON_CALLBACK&format=json');
            });
            it('should add the correct show parameters', function () {
                scope.showOption.list = [ {text:'reviewer', value:'reviewer'}, {text:'title', value:'title'}, {text:'rating', value:'rating'} ];
                expect(scope.buildReviewsQuery()).toEqual('https://api.bestbuy.com/v1/reviews?apiKey=testKey&show=reviewer,title,rating&callback=JSON_CALLBACK&format=json');
            });    
            it("should add parens for 'sku in' queries" , function () {
                scope.dynamicForms = [ {value:{reviewAttribute:'sku'}, opt:{value:' in '}, complexVal:"12345, 54321" } ];
                expect(scope.buildReviewsQuery()).toEqual('https://api.bestbuy.com/v1/reviews(sku in (12345, 54321))?apiKey=testKey&callback=JSON_CALLBACK&format=json');
            });   
            it("should add parens for 'id in' queries" , function () {
                scope.dynamicForms = [ {value:{reviewAttribute:'id'}, opt:{value:' in '}, complexVal:"12345, 54321" } ];
                expect(scope.buildReviewsQuery()).toEqual('https://api.bestbuy.com/v1/reviews(id in (12345, 54321))?apiKey=testKey&callback=JSON_CALLBACK&format=json');
            });                   
        });
        describe('invoke recommendations query function', function (){
            it('should be defined', function () {
                expect(scope.invokeReviewsQuery).toBeDefined();
            });
            it('should error when no key is given', function () {
                scope.apiKey = '';
                scope.invokeReviewsQuery();

                expect(scope.results).toBeDefined("Please enter your API Key");
            });
        });
        describe('reset function', function () {
            it('should be defined', function () {
                expect(scope.resetReviewsQuery).toBeDefined();
            });
            it('should reset the right params', function (){
                scope.resetReviewsQuery();
                expect(scope.results).toEqual({});
                expect(scope.errorResult).toEqual(false);
                expect(scope.whichPage).toEqual(1);
                expect(scope.pageSize).toEqual(10);
                expect(scope.showOption.list).toEqual([]);

            });
        });
        describe('select all button', function () {
            it('should select all', function () {
                scope.selectAll('allreviews')
                expect(scope.showOption.list.length).toEqual(7);
            });
            it('should select none', function () {
                scope.selectAll('none')
                expect(scope.showOption.list.length).toEqual(0);
            });
        });
        describe('restrict sort options function', function () {
            it('should return an array without the values on the restricted list', function () {
                var firstArray = [{value:'reviewer.name'},{value:'rating'},{value:'comment'}];
                var secondArray = ReviewServices.restrictReviewsSortOptionLists(firstArray);
                expect(secondArray).toEqual([ { value : 'rating' }, { value : 'comment' } ]);
            });
        });
        describe('clearBlankSelect function', function () {
            it('should set sortBy and sortOptions correctly', function () {
                scope.showOption.list = [{value:'reviewer.name'},{value:'rating'},{value:'comment'}];
                scope.clearBlankSelect();
                expect(scope.sortOptions.list).toEqual( [{value:'rating'},{value:'comment'}]);
                expect(scope.sortBy).toEqual({ value : 'rating' });
            });
        });

    });
});