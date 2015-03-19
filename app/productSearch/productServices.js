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

    return {
    	preSelectOperator : preSelectOperator,
    	addAllShowOptions : addAllShowOptions,
    	parseDynamicForms : parseDynamicForms,
    	addAllOptionValues : addAllOptionValues
    }
}]);