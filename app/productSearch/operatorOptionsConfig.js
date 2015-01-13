'use strict';

angular.module('bby-query-mixer.productSearch').constant('operatorOptionsConfig', [
	        {text: "Equals : equals", value:"="},
            {text: "Pipe : Any", value:"|"},
            {text:"Greater than: >", value:">"},
            {text:"Less than: <", value:"<"},
            {text:"Greater than or equal to: >=", value:">="},
            {text:"Less than or equal to: <=", value:"<="},
            {text:"In", value:" in "}
]);