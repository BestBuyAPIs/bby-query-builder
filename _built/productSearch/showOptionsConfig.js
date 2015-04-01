'use strict';

angular.module('bby-query-mixer.productSearch').constant('showOptionsConfig', [ 
	{ text: 'Accessories SKUs', value: 'accessories.sku' },
	{ text: 'Add To Cart Url', value: 'addToCartUrl' },
	{ text: 'Best Selling Rank', value: 'bestSellingRank' },
	{ text: 'Category Path Id', value: 'categoryPath.id' },
	{ text: 'Category Path Name', value: 'categoryPath.name' },
	{ text: 'Color', value: 'color' },
	{ text: 'Condition', value: 'condition' },
	{ text: 'Customer Review Average', value: 'customerReviewAverage' },
	{ text: 'Customer Review Count', value: 'customerReviewCount' },
	{ text: 'Description', value: 'description' },
	{ text: 'Detail Text', value: 'details.name' },
	{ text: 'Details Value', value: 'details.value' },
	{ text: 'Dollar Savings', value: 'dollarSavings' },
	{ text: 'Features', value: 'features.feature' },
	{ text: 'Free Shipping', value: 'freeShipping' },
	{ text: 'Frequently Purchased With SKUs', value: 'frequentlyPurchasedWith.sku' },
	{ text: 'Image', value: 'image' },
	{ text: 'Included Items', value: 'includedItemList.includedItem' },
	{ text: 'In Store Availability', value: 'inStoreAvailability' },
	{ text: 'In Store Availability Text', value: 'inStoreAvailabilityText' },
	{ text: 'Long Description', value: 'longDescription' },
	{ text: 'Manufacturer', value: 'manufacturer' },
	{ text: 'Mobile Url', value: 'mobileUrl' },
	{ text: 'Model Number', value: 'modelNumber' },
	{ text: 'Name', value: 'name' },
	{ text: 'Online Availability', value: 'onlineAvailability' },
	{ text: 'Online Availability Text', value: 'onlineAvailabilityText' },
	{ text: 'On Sale', value: 'onSale' },
	{ text: 'Percent Savings', value: 'percentSavings' },
	{ text: 'Preowned?', value: 'preowned' },
	{ text: 'Regular Price', value: 'regularPrice' },
	{ text: 'Related Product SKUs', value: 'relatedProducts.sku' },
	{ text: 'Sale Price', value: 'salePrice' },
	{ text: 'Shipping', value: 'shipping' },
	{ text: 'Shipping Cost', value: 'shippingCost' },
	{ text: 'Short Description', value: 'shortDescription' },
	{ text: 'SKU', value: 'sku' },
    { text: 'Thumbnail Image', value: 'thumbnailImage' },
    { text: 'Type', value: 'type' },
    { text: 'UPC', value: 'upc' },
    { text: 'URL', value: 'url' }
])
.constant('restrictedSortOptions', [
    'accessories.sku',
    'addToCartUrl',
    'categoryPath.id',
    'categoryPath.name',
    'details.name',
    'details.value',
    'features.feature',
    'frequentlyPurchasedWith.sku',
    'includedItemList.includedItem',
    'mobileUrl',
    'relatedProducts.sku',
    'shipping'
]);