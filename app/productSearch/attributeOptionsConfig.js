'use strict';

angular.module('bby-query-mixer.productSearch').constant('attributeOptionsConfig', [ 
	{text:'salePrice', value:'salePrice', operator:[{value:'='},{value:'>'},{value:'<'},{value:'<='},{value:'>='}], placeholder:'9.99'},
	{text:'regularPrice', value:'regularPrice', operator:[{value:'='},{value:'>'},{value:'<'},{value:'<='},{value:'>='}], placeholder:'19.99'},
	{text:'color', value:'color', operator:[{value:'='},{value:'!='}], placeholder:'black'},
	{text:'preowned', value:'preowned', operator:[{value:'='}], placeholder:true},
	{text:'modelNumber', value:'modelNumber', operator:[{value:'='},{value:'!='}], placeholder:"4460B004"},
	{text:'manufacturer', value:'manufacturer', operator:[{value:'='},{value:'!='}], placeholder:"canon"},
	{text:'description', value:'description', operator:[{value:'='},{value:'!='}], placeholder:'text'},
	{text:'shortDescription', value:'shortDescription', operator:[{value:'='},{value:'!='}], placeholder:'text'},
	{text:'inStoreAvailability', value:'inStoreAvailability', operator:[{value:'='}], placeholder:true},
	{text:'freeShipping', value:'freeShipping', operator:[{value:'='}], placeholder:true},
	{text:'customerReviewAverage', value:'customerReviewAverage', operator:[{value:'='},{value:'>'},{value:'<'},{value:'<='},{value:'>='}], placeholder:5.0},
	{text:'customerReviewCount', value:'customerReviewCount', operator:[{value:'='},{value:'>'},{value:'<'},{value:'<='},{value:'>='}], placeholder:5},
	{text:'onSale', value:'onSale', operator:[{value:'='}], placeholder:true},
	{text:'type', value:'type', operator:[{value:'='},{value:'!='}], placeholder:"Music"},
	{text:'sku', value:'sku',operator:[{value:'='},{value:'!='},{value:' in '}], placeholder:'1234567,7654321'}
]);