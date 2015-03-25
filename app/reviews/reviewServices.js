'use strict';

angular.module('bby-query-mixer.reviews').factory('ReviewServices', [ 'restrictedReviewSortOptions',function(restrictedReviewSortOptions) {
    
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

    var restrictReviewsSortOptionLists = function (array) {
        var newArray = [];
        angular.forEach(array,
            function(i) {
                if (restrictedReviewSortOptions.indexOf(i.value) === -1){
                    this.push(i)
                }
            }, newArray);
        return newArray;
    };

    return {
    	preSelectOperator : preSelectOperator,
    	addAllShowOptions : addAllShowOptions,
    	parseDynamicForms : parseDynamicForms,
        restrictReviewsSortOptionLists : restrictReviewsSortOptionLists
    }
}]);