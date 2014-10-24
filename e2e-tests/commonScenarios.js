'use strict';

describe('bby-query-mixer', function () {

    ['index.html#/recommendations', 'index.html#/productSearch'].forEach(function (location) {
        describe(location, function () {
            beforeEach(function () {
                browser.get(location);
            });

            it('directs to developer portal', function () {
                var link = element(by.css('#portal-link'));
                expect(link.getAttribute('href')).toEqual('https://developer.bestbuy.com/');
            });
        });
    });
});