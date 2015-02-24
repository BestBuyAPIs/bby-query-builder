'use strict';

angular.module('bby-query-mixer.stores').constant('productAttributesConfig', [ 
	{ text: "SKU", value: "products.sku" },
	{ text: "Name", value: "products.name" },
	{ text: "Short Description", value: "products.shortDescription" },
	{ text: "Sale Price", value: "products.salePrice" },
	{ text: "Regular Price", value: "products.regularPrice" },
	{ text: "Add To Cart URL", value: "products.addToCartURL" },
	{ text: "Product Url", value: "products.url" },
	{ text: "Image", value: "products.image" },
	{ text: "Customer Review Count", value: "products.customerReviewCount" },
	{ text: "Customer Review Average", value: "products.customerReviewAverage" }
]);