'use strict';

describe('appServices module', function () {
    
    var HttpClientService, GaService, AddAllShowOptionsService, PreSelectOperatorService;

    beforeEach(function () {

    	module('appServices');

    	inject(function(_HttpClientService_, _GaService_,_AddAllShowOptionsService_,_PreSelectOperatorService_) {
    		HttpClientService = _HttpClientService_;
            GaService = _GaService_;
            AddAllShowOptionsService = _AddAllShowOptionsService_;
            PreSelectOperatorService = _PreSelectOperatorService_;
    	});
    });


        describe('HttpClientService factory', function () {
        	it('should return a httpclient function', function () {
        		expect(angular.isFunction(HttpClientService.httpClient)).toBe(true);
        	});
        });
        describe('GaService factory', function () {
            it('should return a clickQueryButton function', function () {
                expect(angular.isFunction(GaService.clickQueryButtonEvent)).toBe(true);
            });
            it('should return an enterKeyEvent function', function () {
                expect(angular.isFunction(GaService.enterKeyEvent)).toBe(true);
            });
            it('should return a copyUrlEvent function', function () {
                expect(angular.isFunction(GaService.copyUrlEvent)).toBe(true);
            });
        });
        describe('AddAllShowOptionsService factory', function () {
            it('should return a addAllShowOptions function', function () {
                expect(angular.isFunction(AddAllShowOptionsService.addAllShowOptions)).toBe(true);
            });
            it('should make a new array with the correct format', function () {
                var firstArray = [{value:'name'},{value:'price'},{value:'rating'}];
                expect(AddAllShowOptionsService.addAllShowOptions(firstArray)).toEqual('name,price,rating');
            });
        });
        describe('PreSelectOperatorService factory', function () {
        it('should return a preSelectOperator function', function () {
            expect(angular.isFunction(PreSelectOperatorService.preSelectOperator)).toBe(true);
        });
    });
});