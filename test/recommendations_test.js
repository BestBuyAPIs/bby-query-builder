'use strict';

describe('bby-query-mixer.recommendations module', function () {

    beforeEach(module('bby-query-mixer.recommendations', 'appConfig'));

    describe('recommendations controller', function () {
        var ctrl, scope, ga;
        beforeEach(inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();
            ctrl = $controller('RecommendationsCtrl', {
                $scope: scope
            });
            ga = (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
                    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
            }));

        var successfulRecommendationsResponse = {
            metadata: {},
            results: [
                {
                    productLink: "https://api.bestbuy.com/v1/products/5070633.json?apiKey=totallyLegitAPIKey",
                    rank: 1,
                    sku: "5070633"
                },
                {
                    productLink: "https://api.bestbuy.com/v1/products/8618049.json?apiKey=totallyLegitAPIKey",
                    rank: 2,
                    sku: "8618049"
                },
                {
                    productLink: "https://api.bestbuy.com/v1/products/9064159.json?apiKey=totallyLegitAPIKey",
                    rank: 3,
                    sku: "9064159"
                }
            ]
        };

        it('should have a controller defined', function () {
            expect(ctrl).toBeDefined();
        });

        describe('buildRecommendationsQuery function', function () {
            it('should have a recommendationsQuery function', function () {
                expect(scope.buildRecommendationsQuery).toBeDefined();
            });

            it('should return a url when apiKey is supplied', function () {
                scope.apiKey = 'someApiKey';
                expect(scope.buildRecommendationsQuery()).toEqual('https://api.bestbuy.com/beta/products/?apiKey=someApiKey&callback=JSON_CALLBACK')
            });
        });

        describe('invokeRecommendationsQuery function', function () {
            var $httpBackend;

            beforeEach(inject(function (_$httpBackend_) {
                $httpBackend = _$httpBackend_;
            }));

            it('should have an invoke query function', function () {
                expect(scope.invokeRecommendationsQuery).toBeDefined();
            });

            it('should return an error in an array on a failing response', function () {
                $httpBackend.expectJSONP('https://api.bestbuy.com/beta/products/trendingViewed?apiKey=inactiveKey&callback=JSON_CALLBACK').respond(403, {
                    status: 403,
                    errorMessage: "Account Inactive",
                    help: "http://developer.bestbuy.com/get-started"
                });

                scope.apiKey = 'inactiveKey';
                scope.endpoint.selected = 'trendingViewed';

                scope.invokeRecommendationsQuery();
                $httpBackend.flush();
                expect(scope.results.data.errorMessage).toEqual("Account Inactive");

                $httpBackend.verifyNoOutstandingExpectation();
                $httpBackend.verifyNoOutstandingRequest();
            });

            it('should error if no apikey is present', function () {
                scope.apiKey = '';
                scope.endpoint.selected = "mostViewed";
                scope.invokeRecommendationsQuery();
                expect(scope.results).toEqual("Please enter your API Key");
                expect(scope.errorResult).toEqual(true);
            });

            it('should error if no search option is selected', function () {
                scope.apiKey = 'myAwesomeApiKey';
                scope.endpoint.selected = "";
                scope.invokeRecommendationsQuery();
                expect(scope.results).toEqual("Please pick an endpoint");
                expect(scope.errorResult).toEqual(true);
            });

        });

        describe('resetQuery function', function (){
            it('should reset all relevant query params', function () {
                scope.resetRecommendationsQuery();
                expect(scope.results).toEqual({});
                expect(scope.endpoint).toEqual({selected:""});
                expect(scope.category).toEqual(scope.categories[0]);
            });
            it('should leave the apikey as is', function () {
                scope.apiKey = 'myApiKey';
                scope.resetRecommendationsQuery();
                expect(scope.apiKey).toEqual('myApiKey');
            });
        });

    });
});