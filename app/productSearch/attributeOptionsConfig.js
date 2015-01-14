'use strict';

angular.module('bby-query-mixer.productSearch').constant('attributeOptionsConfig', [ 
	{text:'salePrice', value:'salePrice', placeholder:'19.99'},
	{text:'regularPrice', value:'regularPrice', placeholder:'9.99'},
	{text:'color', value:'color', placeholder:'black'},
	{text:'preowned', value:'preowned', placeholder:true},
	{text:'modelNumber', value:'modelNumber', placeholder:"4460B004"},
	{text:'manufacturer', value:'manufacturer', placeholder:"canon"},
	{text:'description', value:'description', placeholder:'text'},
	{text:'shortDescription', value:'shortDescription', placeholder:'text'},
	{text:'inStoreAvailability', value:'inStoreAvailability', placeholder:true},
	{text:'freeShipping', value:'freeShipping', placeholder:true},
	{text:'customerReviewAverage', value:'customerReviewAverage', placeholder:5.0},
	{text:'customerReviewCount', value:'customerReviewCount', placeholder:5},
	{text:'onSale', value:'onSale', placeholder:true},
	{text:'type', value:'type', placeholder:"Music, Hardgood, Movie"},
	{text:'sku', value:'sku', placeholder:'1234567'}
]);