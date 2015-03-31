'use strict';

angular.module('bby-query-mixer.productSearch').factory('ProductServices', [ 'restrictedSortOptions',function(restrictedSortOptions) {
    
    var parseDynamicForms = function (array) {
            var newArray = [];
            angular.forEach(array, function(i) { 
                if (i.value.productAttribute && i.opt.value && i.complexVal){
                    if (i.opt.value === ' in ') {
                        this.push(i.value.productAttribute + i.opt.value +'('+ i.complexVal+')'); 
                    } else {
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
    	parseDynamicForms : parseDynamicForms,
    	addAllOptionValues : addAllOptionValues,
        restrictSortOptionLists : restrictSortOptionLists
    }
}]);