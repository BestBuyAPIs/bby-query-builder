'use strict';

describe('bby-query-mixer.recommendations module', function () {

    beforeEach(module('bby-query-mixer.recommendations'));

    describe('recommendations controller', function () {
        var ctrl, scope;
        beforeEach(inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();
            ctrl = $controller('RecommendationsCtrl', {
                $scope: scope
            });
        }));

        var successfulRecommendationsResponse = {
            metadata: {},
            results: [
                {
                    productLink: "http://api.remix.bestbuy.com/v1/products/5070633.json?apiKey=totallyLegitAPIKey",
                    rank: 1,
                    sku: "5070633"
                },
                {
                    productLink: "http://api.remix.bestbuy.com/v1/products/8618049.json?apiKey=totallyLegitAPIKey",
                    rank: 2,
                    sku: "8618049"
                },
                {
                    productLink: "http://api.remix.bestbuy.com/v1/products/9064159.json?apiKey=totallyLegitAPIKey",
                    rank: 3,
                    sku: "9064159"
                }
            ]
        };

        it('should have a controller defined', function () {
            expect(ctrl).toBeDefined();
        });

        it('should have a skuList constant defined', function () {
            expect(scope.skuList).toBe('sku1,sku2,sku3');
        });

        describe('buildRecommendationsQuery function', function () {
            it('should have a recommendationsQuery function', function () {
                expect(scope.buildRecommendationsQuery).toBeDefined();
            });

            it('should return a url when apiKey is supplied', function () {
                scope.apiKey = 'someApiKey';
                expect(scope.buildRecommendationsQuery()).toEqual('http://api.bestbuy.com/beta/products/trendingViewed?apiKey=someApiKey&callback=JSON_CALLBACK')
            });

            it('should return a empty string when a empty apiKey is passed in', function () {
                expect(scope.buildRecommendationsQuery("")).toEqual("")
            });
        });

        describe('buildRemixQuery function', function () {
            it('should have a remixQuery function', function () {
                expect(scope.buildRemixQuery).toBeDefined();
            });

            it('should return a url when scope.results has data', function () {
                scope.apiKey = 'someApiKey';
                scope.skuList = 'sku1,sku2,sku3';
                expect(scope.buildRemixQuery()).toEqual('http://api.remix.bestbuy.com/v1/products(sku in(sku1,sku2,sku3))?apiKey=someApiKey&format=json&show=sku,name,description,image,addToCartUrl,salePrice&callback=JSON_CALLBACK')
            });

            it('should return an empty string when apiKey is empty', function () {
                scope.apiKey = '';
                scope.skuList = 'sku1,sku2,sku3';
                expect(scope.buildRemixQuery()).toEqual('')
            })

            it('should return an empty string when results is empty', function () {
                scope.apiKey = '';
                scope.skuList = '';
                expect(scope.buildRemixQuery()).toEqual('')
            })

        });

        describe('isRemixQueryButtonDisabled function', function () {

            it('should be true when no skuList', function () {
                scope.skuList = 'sku1,sku2,sku3';
                expect(scope.isRemixQueryButtonDisabled()).toBeTruthy();
            });

            it('should be false when skuList populated', function () {
                scope.skuList = '8880044,5041792';
                expect(scope.isRemixQueryButtonDisabled()).toBeFalsy();
            });

        });

        describe('invokeRemixQuery function', function () {
            var $httpBackend;
            beforeEach(inject(function (_$httpBackend_) {
                $httpBackend = _$httpBackend_;
            }));

            it('should have an invokeRemixQuery function', function () {
                expect(scope.invokeRecommendationsQuery).toBeDefined();
            });

            it('should return a product array when a query is passed in', function () {
                scope.skuList = 'sku1,sku2,sku3';
                $httpBackend.expectJSONP('http://api.remix.bestbuy.com/v1/products(sku in(sku1,sku2,sku3))?apiKey=someApiKey&format=json&show=sku,name,description,image,addToCartUrl,salePrice&callback=JSON_CALLBACK').respond(
                    {
                        products: [
                            {
                                sku: 5041792,
                                productId: 1218603006847,
                                name: "AKG - K495NC Over-the-Ear Headphones"
                            },
                            {
                                sku: 8880044,
                                productId: 1484301,
                                name: "Batman Begins (Blu-ray Disc)"
                            }
                        ]
                    }
                );

                expect(scope.remixResults).toEqual({});
                scope.apiKey = 'someApiKey';
                scope.invokeRemixQuery();
                expect(scope.remixResults).toEqual('Running');
                $httpBackend.flush();
                expect(JSON.stringify(scope.remixResults)).toEqual('{"products":[{"sku":5041792,"productId":1218603006847,"name":"AKG - K495NC Over-the-Ear Headphones"},{"sku":8880044,"productId":1484301,"name":"Batman Begins (Blu-ray Disc)"}],"$promise":{},"$resolved":true}');

                $httpBackend.verifyNoOutstandingExpectation();
                $httpBackend.verifyNoOutstandingRequest();
            });

        })

        describe('invokeRecommendationsQuery function', function () {
            var $httpBackend;

            beforeEach(inject(function (_$httpBackend_) {
                $httpBackend = _$httpBackend_;
            }));

            it('should have an invoke query function', function () {
                expect(scope.invokeRecommendationsQuery).toBeDefined();
            });

            it('should set list of skus to skuList when invoked', function () {
                scope.skuList = '123,456,789'
                scope.invokeRecommendationsQuery();
                expect(scope.skuList).toBe('sku1,sku2,sku3');
            });

            it('should clear remix query results when invoked', function () {
                scope.remixResults = { someKey: 'some value'};
                scope.invokeRecommendationsQuery();
                expect(scope.remixResults).toEqual({});
            });

            it('should return a map when a valid query is generated and populate skuList', function () {

                $httpBackend.expectJSONP('http://api.bestbuy.com/beta/products/trendingViewed?apiKey=someApiKey&callback=JSON_CALLBACK').respond(successfulRecommendationsResponse);

                expect(scope.results).toEqual({});
                expect(scope.skuList).toBe('sku1,sku2,sku3');
                scope.apiKey = 'someApiKey';
                scope.invokeRecommendationsQuery();
                expect(scope.results).toEqual('Running');
                expect(scope.skuList).toBe('sku1,sku2,sku3');
                $httpBackend.flush();
                expect(scope.results.results).toEqual(successfulRecommendationsResponse.results);
                expect(scope.skuList).toBe('5070633,8618049,9064159');

                $httpBackend.verifyNoOutstandingExpectation();
                $httpBackend.verifyNoOutstandingRequest();
            });

            it('should return an error in an array on a failing response', function () {
                $httpBackend.expectJSONP('http://api.bestbuy.com/beta/products/trendingViewed?apiKey=inactiveKey&callback=JSON_CALLBACK').respond(403, {
                    status: 403,
                    errorMessage: "Account Inactive",
                    help: "http://developer.bestbuy.com/get-started"
                });

                scope.apiKey = 'inactiveKey';
                scope.invokeRecommendationsQuery();
                $httpBackend.flush();
                expect(scope.results.data.errorMessage).toEqual("Account Inactive");

                $httpBackend.verifyNoOutstandingExpectation();
                $httpBackend.verifyNoOutstandingRequest();
            });
        });

        describe('buildSkuList function', function () {
            it('should return a string of skus with successful response', function () {
                scope.results = successfulRecommendationsResponse;
                scope.buildSkuList()
                expect(scope.skuList).toEqual('5070633,8618049,9064159');
            });
        });
    });
});