'use strict';

describe('my app', function () {

    describe('recommendations', function () {

        beforeEach(function () {
            browser.get('index.html#/recommendations');
        });

        it('should render recommendations and defaults are as expected', function () {
            expect(element(by.css('.selected-option')).getText()).toMatch('RECOMMENDATIONS');
            expect(element(by.id('recommendations-div'))).toBeDefined();
            expect(element(by.id('api-key-label')).getText()).toMatch(/Enter your API key:/);
            expect(element(by.model('apiKey'))).toBeDefined();
            expect(element(by.css('textarea[id="recommendations-query-result"]')).getText()).toMatch(/\{\}/);
            expect(element(by.css('textarea[id="remix-query-result"]')).getText()).toMatch(/\{\}/);

            var runRemixQueryButton = element(by.css('button[id="get-product-information"]'));
            expect(runRemixQueryButton.getAttribute('disabled')).toBeTruthy();

            var recommendationsCopyButton = element(by.id('recommendations-copy-button'));
            expect(recommendationsCopyButton).toBeDefined();
            expect(recommendationsCopyButton.element(by.css('[ng-view] img'))).toBeDefined();

            var remixCopyButton = element(by.id('remix-copy-button'));
            expect(remixCopyButton).toBeDefined();
            expect(remixCopyButton.element(by.css('[ng-view] img'))).toBeDefined();

            var apiKeyInput = element(by.model('apiKey')),
                recommendationsQuery = element((by.css('span[id="recommendations-query"]')));
            expect(recommendationsQuery.isPresent()).toBe(true);
            expect(recommendationsQuery.getText()).toBe('');
            apiKeyInput.sendKeys('someApiKey');
            expect(recommendationsQuery.getText()).toBe('http://api.bestbuy.com/beta/products/trendingViewed?apiKey=someApiKey&callback=JSON_CALLBACK');
            expect(element(by.css('button[id="get-product-information"]'))).toBeDefined();
            var invokeRecommendationsButton = element(by.css('button[id="invoke-query"]'));
            invokeRecommendationsButton.click().then(function () {
                expect(element(by.css('textarea[id="recommendations-query-result"]')).getText()).toMatch(/\{"status":404.+\}/);
                expect(element(by.css('span[id="remix-query"]')).getText()).toMatch(/http:\/\/api\.remix\.bestbuy\.com\/.*/);
                expect(element.all(by.css('textarea[id="remix-query-result"]')).first().getText()).toMatch(/\{}/)
            });
        });
    });
});
