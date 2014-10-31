'use strict';

describe('bby-query-mixer', function () {

    ['index.html#/recommendations', 'index.html#/productSearch'].forEach(function (location) {
        describe(location, function () {
            beforeEach(function () {
                browser.get(location);
            });

            it('renders common common pieces', function () {
                var link = element(by.css('#portal-link'));
                expect(link.getAttribute('href')).toEqual('https://developer.bestbuy.com/');
                expect(element.all(by.css('ul[class="menu content-container"] > li')).count()).toEqual(2);
                expect(element.all(by.css('ul[class="menu content-container"] li:nth-child(1)')).getText()).toMatch(/PRODUCT SEARCH/);
                expect(element.all(by.css('ul[class="menu content-container"] li:nth-child(2)')).getText()).toMatch(/RECOMMENDATIONS/);
                expect(element(by.id('api-key-label')).getText()).toMatch(/Enter your API key:/);
                expect(element(by.model('apiKey'))).toBeDefined();
            });
        });
    });
});