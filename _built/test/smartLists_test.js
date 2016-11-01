'use strict';

describe('bby-query-mixer.smartLists module', function () {

    beforeEach(module('bby-query-mixer.smartLists', 'appConfig'));

    describe('smartLists controller', function () {
        var ctrl, scope, ga;
        beforeEach(inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();
            ctrl = $controller('SmartListsCtrl', {
                $scope: scope
            });
            ga = (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
                    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
            }));

        describe('build smart lists query function', function () {
            it('should be defined', function () {
                expect(scope.buildSmartListsQuery).toBeDefined();
            });
            it('should add the appropriate endpoint', function (){
                scope.endpoint.selected = 'activeAdventurer';
                expect(scope.buildSmartListsQuery()).toEqual('https://api.bestbuy.com/beta/products/activeAdventurer');
                scope.endpoint.selected = 'connectedHome';
                expect(scope.buildSmartListsQuery()).toEqual('https://api.bestbuy.com/beta/products/connectedHome');            
            });
        });
        describe('invoke recommendations query function', function (){
            it('should be defined', function () {
                expect(scope.invokeRecommendationsQuery).toBeDefined();
            });
            it('should error when no key is given', function () {
                scope.apiKey = '';
                scope.endpoint.selected = 'connected home';
                scope.invokeRecommendationsQuery();

                expect(scope.results).toEqual("Please enter your API Key");
            });
            it('should work', function () {
                scope.apiKey = '12345';
                scope.endpoint.selected = 'connected home';
                scope.invokeRecommendationsQuery();

                expect(scope.results).toEqual("Running");
            });            
        });
        describe('reset function', function () {
            it('should be defined', function () {
                expect(scope.resetSmartListsQuery).toBeDefined();
            });
            it('should reset the right params', function (){
                scope.resetSmartListsQuery();
                expect(scope.results).toEqual({});
                expect(scope.endpoint.selected).toEqual("");
                expect(scope.errorResult).toEqual(false);
            });
        });
        describe('call google analytics function', function () {
            it('should be defined', function () {
                expect(scope.callCopyEvent).toBeDefined();
            });

        });
    });
});