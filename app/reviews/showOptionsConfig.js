'use strict';

angular.module('bby-query-mixer.reviews').constant('reviewShowOptionsConfig', [ 
	{ text: 'Comment', value: 'comment' },
	{ text: 'Id', value: 'id' },
	{ text: 'Rating', value: 'rating' },
	{ text: 'Reviewer', value: 'reviewer' },
	{ text: 'SKU', value: 'sku' },
	{ text: 'Submission Time', value: 'submissionTime' },
	{ text: 'Title', value: 'title' }
])
.constant('restrictedReviewSortOptions', [
	'reviewer.name',
	'aboutMe.customerType'
]);