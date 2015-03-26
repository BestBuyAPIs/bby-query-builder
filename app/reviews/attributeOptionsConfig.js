'use strict';

angular.module('bby-query-mixer.productSearch').constant('reviewAttributeOptionsConfig', [ 
	{text:'Choose review attributes', reviewAttribute:false,operator:false,placeholder:false},
	{text:'Comment', reviewAttribute:'comment',operator:[{value:'='}],placeholder:'I <3 this phone.', type:'string' },
	{text:'Id', reviewAttribute:'id',operator:[{value:'='}],placeholder:'24798186', type:'string' },
	{text:'Rating', reviewAttribute:'rating',operator:[{value:'='},{value:'>'},{value:'<'},{value:'<='},{value:'>='}],placeholder:'4.0', type:'number' },
	{text:'Reviewer', reviewAttribute:'reviewer.name',operator:[{value:'='}],placeholder:'BBY-Fan28', type:'string' },
	{text:'SKU', reviewAttribute:'sku',operator:[{value:'='}],placeholder:'3764993', type:'string' },
	{text:'Submission Time', reviewAttribute:'submissionTime',operator:[{value:'='}],placeholder:'2014-04-29 T22:40:33', type:'string' },
	{text:'Title', reviewAttribute:'title',operator:[{value:'='}],placeholder:'Good keyboard', type:'string' }
]);