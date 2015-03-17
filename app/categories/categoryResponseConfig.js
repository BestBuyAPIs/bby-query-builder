'use strict';

angular.module('bby-query-mixer.categories').constant('categoryResponseConfig', [ 
    {text:"Name", value:"name" },
    {text:"Id", value:"id" },
    {text:"SubCategory Name", value:"subCategories.name" },
    {text:"SubCategory Id", value:"subCategories.id" }
]);