'use strict';

angular.module('bby-query-mixer.productSearch').constant('attributeOptionsConfig', [ 
	{text:'Choose Attribute', value:false, operator:[{value:'operator'}], placeholder:'Value', type:false},		
	{text:'Best Selling Rank', value:'bestSellingRank', operator:[{value:'='},{value:'>'},{value:'<'},{value:'<='},{value:'>='}], placeholder:'1', type: "number"},		
	{text:'Color', value:'color', operator:[{value:'='},{value:'!='}], placeholder:'black', type:"text"},
	{text:'Condition', value:'condition', operator:[{value:'='},{value:'!='}], placeholder:'new,refurbished', type:"text"},
	{text:'Customer Review Average', value:'customerReviewAverage', operator:[{value:'='},{value:'>'},{value:'<'},{value:'<='},{value:'>='}], placeholder:5.0, type:"number"},
	{text:'Customer Review Count', value:'customerReviewCount', operator:[{value:'='},{value:'>'},{value:'<'},{value:'<='},{value:'>='}], placeholder:5, type:"number"},
	{text:'Description', value:'description', operator:[{value:'='},{value:'!='}], placeholder:'text', type:'text'},
	{text:'Dollar Savings', value:'dollarSavings', operator:[{value:'='},{value:'>'},{value:'<'},{value:'<='},{value:'>='}], placeholder:'10.99', type:'number'},
	{text:'Free Shipping', value:'freeShipping', operator:[{value:'='}], placeholder:true, type:"radio"},
	{text:'In Store Availability', value:'inStoreAvailability', operator:[{value:'='}], placeholder:true, type:"radio"},
	{text:'Manufacturer', value:'manufacturer', operator:[{value:'='},{value:'!='}], placeholder:"canon", type:"text"},
	{text:'Model Number', value:'modelNumber', operator:[{value:'='},{value:'!='}], placeholder:"4460B004", type:"text"},
	{text:'Name', value:'name', operator:[{value:'='},{value:'!='}], placeholder:"Canon - EOS 60D DSLR Camera", type:"text"},
	{text:'Online Availability', value:'onlineAvailability', operator:[{value:'='}], placeholder:true, type:"radio"},
	{text:'On Sale', value:'onSale', operator:[{value:'='}], placeholder:true, type:"radio"},
	{text:'Percent Savings', value:'percentSavings', operator:[{value:'='},{value:'>'},{value:'<'},{value:'<='},{value:'>='}], placeholder:'10', type:"number"},
	{text:'Preowned', value:'preowned', operator:[{value:'='}], placeholder:true, type:"radio"},
	{text:'Regular Price', value:'regularPrice', operator:[{value:'='},{value:'>'},{value:'<'},{value:'<='},{value:'>='}], placeholder:'19.99', type:"number"},
	{text:'Sale Price', value:'salePrice', operator:[{value:'='},{value:'>'},{value:'<'},{value:'<='},{value:'>='}], placeholder:'9.99', type:"number"},
	{text:'Shipping Cost', value:'shippingCost', operator:[{value:'='},{value:'>'},{value:'<'},{value:'<='},{value:'>='}], placeholder:'9.99', type:"number"},
	{text:'SKU', value:'sku',operator:[{value:'='},{value:'!='},{value:' in '}], placeholder:'1234567,7654321', type:"text"},
	{text:'Type', value:'type', operator:[{value:'='},{value:'!='}], placeholder:"Music", type:"text"},
	{text:'UPC', value:'upc', operator:[{value:'='},{value:'!='}], placeholder:"12345678910", type:"text"}
]);