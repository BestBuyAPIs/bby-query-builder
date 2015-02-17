'use strict';

angular.module('bby-query-mixer.productSearch').constant('attributeOptionsConfig', [ 
	{text:'Choose Attribute', productAttribute:false, operator:[{value:'operator'}], placeholder:'Value', type:false},		
	{text:'Best Selling Rank', productAttribute:'bestSellingRank', operator:[{value:'='},{value:'>'},{value:'<'},{value:'<='},{value:'>='}], placeholder:'1', type: "number"},		
	{text:'Color', productAttribute:'color', operator:[{value:'='},{value:'!='}], placeholder:'black', type:"text"},
	{text:'Condition', productAttribute:'condition', operator:[{value:'='},{value:'!='}], placeholder:'new,refurbished', type:"text"},
	{text:'Customer Review Average', productAttribute:'customerReviewAverage', operator:[{value:'='},{value:'>'},{value:'<'},{value:'<='},{value:'>='}], placeholder:5.0, type:"number"},
	{text:'Customer Review Count', productAttribute:'customerReviewCount', operator:[{value:'='},{value:'>'},{value:'<'},{value:'<='},{value:'>='}], placeholder:5, type:"number"},
	{text:'Description', productAttribute:'description', operator:[{value:'='},{value:'!='}], placeholder:'text', type:'text'},
	{text:'Dollar Savings', productAttribute:'dollarSavings', operator:[{value:'='},{value:'>'},{value:'<'},{value:'<='},{value:'>='}], placeholder:'10.99', type:'number'},
	{text:'Free Shipping', productAttribute:'freeShipping', operator:[{value:'='}], placeholder:true, type:"boolean", valueOptions:[{value:true},{value:false},{value:'*'}] },
	{text:'In Store Availability', value:'inStoreAvailability', operator:[{value:'='}], placeholder:true, type:"boolean", valueOptions:[{value:true},{value:false},{value:'*'}] },
	{text:'Manufacturer', productAttribute:'manufacturer', operator:[{value:'='},{value:'!='}], placeholder:"canon", type:"text"},
	{text:'Model Number', productAttribute:'modelNumber', operator:[{value:'='},{value:'!='}], placeholder:"4460B004", type:"text"},
	{text:'Name', productAttribute:'name', operator:[{value:'='},{value:'!='}], placeholder:"Canon - EOS 60D DSLR Camera", type:"text"},
	{text:'Online Availability', productAttribute:'onlineAvailability', operator:[{value:'='}], placeholder:true, type:"boolean", valueOptions:[{value:true},{value:false},{value:'*'}] },
	{text:'On Sale', productAttribute:'onSale', operator:[{value:'='}], placeholder:true, type:"boolean", valueOptions:[{value:true},{value:false},{value:'*'}] },
	{text:'Percent Savings', productAttribute:'percentSavings', operator:[{value:'='},{value:'>'},{value:'<'},{value:'<='},{value:'>='}], placeholder:'10', type:"number"},
	{text:'Preowned', productAttribute:'preowned', operator:[{value:'='}], placeholder:true, type:"boolean", valueOptions:[{value:true},{value:false},{value:'*'}] },
	{text:'Regular Price', productAttribute:'regularPrice', operator:[{value:'='},{value:'>'},{value:'<'},{value:'<='},{value:'>='}], placeholder:'19.99', type:"number"},
	{text:'Sale Price', productAttribute:'salePrice', operator:[{value:'='},{value:'>'},{value:'<'},{value:'<='},{value:'>='}], placeholder:'9.99', type:"number"},
	{text:'Shipping Cost', productAttribute:'shippingCost', operator:[{value:'='},{value:'>'},{value:'<'},{value:'<='},{value:'>='}], placeholder:'9.99', type:"number"},
	{text:'SKU', productAttribute:'sku',operator:[{value:'='},{value:'!='},{value:' in '}], placeholder:'1234567,7654321', type:"text"},
	{text:'Type', productAttribute:'type', operator:[{value:'='},{value:'!='}], placeholder:"Music", type:"text"},
	{text:'UPC', productAttribute:'upc', operator:[{value:'='},{value:'!='}], placeholder:"12345678910", type:"text"}
]);