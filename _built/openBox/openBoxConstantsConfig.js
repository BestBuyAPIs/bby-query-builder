'use strict';

angular.module('bby-query-mixer.openBox').constant('searchOptions', [
    { text: "Select an Open Box Search Option", value: 0 },
	{ text: "Open Box Offers All SKUs", value: 'allSkus' },
	{ text: "Open Box Offers by Category", value: 'category' },
	{ text: "Open Box Offers by List of SKUs", value: 'skuList' },
	{ text: "Open Box Offers by SKU", value: 'singleSku' }
]);