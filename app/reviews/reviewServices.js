'use strict';

angular.module('bby-query-mixer.reviews').factory('ReviewServices', [ 'restrictedReviewSortOptions',function(restrictedReviewSortOptions) {

    var parseDynamicForms = function (array) {
            var newArray = [];
            angular.forEach(array, function(i) { 
                if (i.value.reviewAttribute && i.opt.value && i.complexVal){
                    if ((i.value.reviewAttribute === 'comment')||(i.value.reviewAttribute === 'title')) {
                        this.push(i.value.reviewAttribute + i.opt.value + i.complexVal+'*'); 
                    }else {
                this.push(i.value.reviewAttribute + i.opt.value + i.complexVal); 
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
    	parseDynamicForms : parseDynamicForms,
        restrictReviewsSortOptionLists : restrictReviewsSortOptionLists
    }
}]);