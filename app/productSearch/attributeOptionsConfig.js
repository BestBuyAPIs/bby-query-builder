'use strict';

angular.module('bby-query-mixer.productSearch').constant('attributeOptionsConfig', [ 
	{text:'Choose Attribute', value:'', operator:[{value:'operator'}], placeholder:'Value'},		
	{text:'Best Selling Rank', value:'bestSellingRank', operator:[{value:'='},{value:'>'},{value:'<'},{value:'<='},{value:'>='}], placeholder:'1'},		
	{text:'Color', value:'color', operator:[{value:'='},{value:'!='}], placeholder:'black'},
	{text:'Condition', value:'condition', operator:[{value:'='},{value:'!='}], placeholder:'new,refurbished'},
	{text:'Customer Review Average', value:'customerReviewAverage', operator:[{value:'='},{value:'>'},{value:'<'},{value:'<='},{value:'>='}], placeholder:5.0},
	{text:'Customer Review Count', value:'customerReviewCount', operator:[{value:'='},{value:'>'},{value:'<'},{value:'<='},{value:'>='}], placeholder:5},
	{text:'Description', value:'description', operator:[{value:'='},{value:'!='}], placeholder:'text'},
	{text:'Dollar Savings', value:'dollarSavings', operator:[{value:'='},{value:'>'},{value:'<'},{value:'<='},{value:'>='}], placeholder:'10.99'},
	{text:'Free Shipping', value:'freeShipping', operator:[{value:'='}], placeholder:true},
	{text:'In Store Availability', value:'inStoreAvailability', operator:[{value:'='}], placeholder:true},
	{text:'Manufacturer', value:'manufacturer', operator:[{value:'='},{value:'!='}], placeholder:"canon"},
	{text:'Model Number', value:'modelNumber', operator:[{value:'='},{value:'!='}], placeholder:"4460B004"},
	{text:'Name', value:'name', operator:[{value:'='},{value:'!='}], placeholder:"Canon - EOS 60D DSLR Camera"},
	{text:'Online Availability', value:'onlineAvailability', operator:[{value:'='}], placeholder:true},
	{text:'On Sale', value:'onSale', operator:[{value:'='}], placeholder:true},
	{text:'Percent Savings', value:'percentSavings', operator:[{value:'='},{value:'>'},{value:'<'},{value:'<='},{value:'>='}], placeholder:'10'},
	{text:'Preowned', value:'preowned', operator:[{value:'='}], placeholder:true},
	{text:'Regular Price', value:'regularPrice', operator:[{value:'='},{value:'>'},{value:'<'},{value:'<='},{value:'>='}], placeholder:'19.99'},
	{text:'Sale Price', value:'salePrice', operator:[{value:'='},{value:'>'},{value:'<'},{value:'<='},{value:'>='}], placeholder:'9.99'},
	{text:'Shipping Cost', value:'shippingCost', operator:[{value:'='},{value:'>'},{value:'<'},{value:'<='},{value:'>='}], placeholder:'9.99'},
	{text:'SKU', value:'sku',operator:[{value:'='},{value:'!='},{value:' in '}], placeholder:'1234567,7654321'},
	{text:'Type', value:'type', operator:[{value:'='},{value:'!='}], placeholder:"Music"},
	{text:'UPC', value:'upc', operator:[{value:'='},{value:'!='}], placeholder:"12345678910"}
]);