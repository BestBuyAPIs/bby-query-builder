'use strict';

angular.module('bby-query-mixer.productSearch').factory('ProductServices', [ function() {
    
    var preSelectOperator = function(form) {
        form.opt = form.value.operator[0];
        form.complexVal = form.value.valueOptions ? form.value.valueOptions[0].value : '';
    };

    var addAllShowOptions = function(optionArray) {
        var newArray = [];
        angular.forEach(optionArray, function(i) { this.push(i.value) }, newArray);
        return newArray.join(',');
    };

    var parseDynamicForms = function (array) {
            var newArray = [];
            angular.forEach(array, function(i) { 
                if (i.value.productAttribute && i.opt.value && i.complexVal){
                    if (i.opt.value === ' in ') {
                        this.push(i.value.productAttribute + i.opt.value +'('+ i.complexVal+')'); 
                    }else {
                this.push(i.value.productAttribute + i.opt.value + i.complexVal); 
                    }
                }
            }, newArray);

            return newArray.join('&');
    };

    var addAllOptionValues = function(optionArray) {
        var newArray = [];
        angular.forEach(optionArray, function(i) { this.push(i.value) }, newArray);
        return newArray;
    };

    var restrictedSortOptions = [
        'accessories.sku',
        'categoryPath.id',
        'categoryPath.name',
        'details.text',
        'details.value',
        'features.feature',
        'frequentlyPurchasedWith.sku',
        'includedItemList.includedItem',
        'mobileURL',
        'relatedProducts.sku',
        'shipping'
    ];

    var restrictSortOptionLists = function (array) {
        var newArray = [];
        angular.forEach(array,
            function(i) {
                if (restrictedSortOptions.indexOf(i.value) === -1){
                    this.push(i)
                }
            }, newArray);
        return newArray;
    };

    return {
    	preSelectOperator : preSelectOperator,
    	addAllShowOptions : addAllShowOptions,
    	parseDynamicForms : parseDynamicForms,
    	addAllOptionValues : addAllOptionValues,
        restrictSortOptionLists : restrictSortOptionLists
    }
}]);