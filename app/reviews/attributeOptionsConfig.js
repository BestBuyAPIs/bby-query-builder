'use strict';

angular.module('bby-query-mixer.productSearch').constant('reviewAttributeOptionsConfig', [ 
	{text:'Choose review attributes', reviewAttribute:false,operator:false,placeholder:false},
	{text:'Comment', reviewAttribute:'comment',operator:[{value:'='}],placeholder:'I <3 this phone.' },
	{text:'Id', reviewAttribute:'id',operator:[{value:'='}],placeholder:'24798186' },
	{text:'Rating', reviewAttribute:'rating',operator:[{value:'='}],placeholder:'4.0' },
	{text:'Reviewer', reviewAttribute:'reviewer.name',operator:[{value:'='}],placeholder:'BBY-Fan28' },
	{text:'SKU', reviewAttribute:'sku',operator:[{value:'='}],placeholder:'3764993' },
	{text:'Submission Time', reviewAttribute:'submissionTime',operator:[{value:'='}],placeholder:'2014-04-29 T22:40:33' },
	{text:'Title', reviewAttribute:'title',operator:[{value:'='}],placeholder:'Good keyboard' }
]);