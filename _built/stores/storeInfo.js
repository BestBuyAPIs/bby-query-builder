'use strict';

angular.module('bby-query-mixer.stores').constant('storeServicesConfig', [ 
	{ text:'Apple Shop', value: '"apple shop"' },
	{ text:'Best Buy for Business', value: '"best buy for business"' },
	{ text:'Best Buy Mobile', value: '"best buy mobile"' },
	{ text:'Best Buy Mobile Specialty Store', value: '"best buy mobile specialty store"' },
	{ text:'Car & GPS Installation Services', value: '"car & gps installation services"' },
	{ text:'Electronics Recycling', value: '"electronics recycling"' },
	{ text:'Geek Squad Services', value: '"geek squad services"' },
	{ text:'Geek Squad Solution Central', value: '"geek squad solution central"' },
	{ text:'Hablamos Español', value: '"hablamos espa*ol"' },
	{ text:'Magnolia Design Center', value: '"magnolia design center"' },
	{ text:'Magnolia Home Theater', value: '"magnolia home theater"' },
	{ text:'Pacific Kitchen & Home', value: '"pacific kitchen & home"' },
	{ text:'Samsung Experience Shop', value: '"samsung experience shop"' },
	{ text:'Support for Military Families', value: '"support for military families"' },
	{ text:'Windows Store', value: '"windows store"' }
])
.constant('storeTypesConfig',[
    { text:"Big Box", value: "big box" },
    { text: "Mobile", value: "mobile sas" },
    { text: "Express Kiosk", value: "express kiosk" },
    { text: "Warehouse Sale", value: "warehouse sale" },
    { text: "Outlet Center", value: "outlet center" },
    { text: "PAC Standalone Store", value: "pac standalone store" }
]);
