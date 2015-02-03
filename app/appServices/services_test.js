'use strict';

describe('appServices module', function () {
    
    var HttpClientService, GaService;

    beforeEach(function () {

    	module('appServices');

    	inject(function(_HttpClientService_, _GaService_) {
    		HttpClientService = _HttpClientService_;
            GaService = _GaService_;
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
    });

});