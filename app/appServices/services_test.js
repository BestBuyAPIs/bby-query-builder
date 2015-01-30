'use strict';

describe('appServices module', function () {
    
    var HttpClientService;

    beforeEach(function () {

    	module('appServices');

    	inject(function(_HttpClientService_) {
    		HttpClientService = _HttpClientService_;
    	});
    });


    describe('HttpClientService factory', function () {
    	it('should return a httpclient function', function () {
    		expect(angular.isFunction(HttpClientService.httpClient)).toBe(true);
    	});
    });


});