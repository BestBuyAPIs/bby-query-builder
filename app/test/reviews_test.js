'use strict';

describe('bby-query-mixer.reviews module', function () {

    beforeEach(module('bby-query-mixer.reviews', 'appConfig'));

    describe('reviews controller', function () {
        var ctrl, scope, ga;
        beforeEach(inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();
            ctrl = $controller('ReviewsCtrl', {
                $scope: scope
            });
            ga = (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
                    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
            }));

        describe('build reviews query function', function () {
            it('should be defined', function () {
                expect(scope.buildReviewsQuery).toBeDefined();
            });
            it('should add the appropriate endpoint', function (){
                expect(scope.buildReviewsQuery()).toEqual('http://api.remix.bestbuy.com/v1/reviews&callback=JSON_CALLBACK&format=json');
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
            });
        });


    });
});