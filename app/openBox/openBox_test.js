'use strict';

describe('bby-query-mixer.productSearch module', function () {

    beforeEach(module('bby-query-mixer.openBox', 'appConfig'), function () {
    });

    var ctrl, scope;
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        ctrl = $controller('openBoxCtrl', {
            $scope: scope
        });
    }));

    describe('openBoxCtrl', function () {

        it('should have a controller defined', function () {
            expect(ctrl).toBeDefined();
        });

        it('should have a category id associated with each category label', function () {
            scope.categories.map(function (categoryOption) {
                expect(categoryOption.value).toBeDefined();
                expect(categoryOption.label).toBeDefined();
            });
        });

        describe('invokeRemixQuery function', function () {
            it('should error if no apikey is present', function () {
                scope.apiKey = '';
                scope.searchSelection.value = "category";
                scope.invokeRemixQuery();
                expect(scope.results).toEqual("Please enter your API Key");
                expect(scope.errorResult).toEqual(true);
            });

            it('should error if no search option is selected', function () {
                scope.apiKey = 'myAwesomeApiKey';
                scope.searchSelection.value = 0;
                scope.invokeRemixQuery();
                expect(scope.results).toEqual("Please pick a search option");
                expect(scope.errorResult).toEqual(true);
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
                expect(scope.skuList).toEqual('');
                expect(scope.singleSku).toEqual('');
            });
            
            it('should leave the apikey as is', function () {
                scope.apiKey = 'myApiKey';
                scope.resetParams();
                expect(scope.apiKey).toEqual('myApiKey');
            });
        });
    });
});