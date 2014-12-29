'use strict';

// //Stockrecords service used for communicating with the stocks REST endpoints
// angular.module('stocks').factory('Stockrecords', ['$resource',
// 	function($resource) {
// 		return $resource('stockrecords/:stockId', {
// 			stockId: '@_id'
// 		}, {
// 			update: {
// 				method: 'PUT'
// 			}
// 		});
// 	}
// ]);

// //Stocks service used for communicating with the stocks REST endpoints
// angular.module('stocks').factory('Stocks', ['$resource',
// 	function($resource) {
// 		return $resource('stockrecords/:stockId', {
// 			stockrecordId: '@_id'
// 		}, {
// 			update: {
// 				method: 'PUT'
// 			}
// 		});
// 	}
// ]);

/// ABOVE AND BELOW ARE MUTUTALLY EXCLUSIVE -- NOTICE THE STOCKRECORDS IN 2ND ONE ABOVE

// //Stocks service used for communicating with the stocks REST endpoints
// angular.module('stocks').factory('Stocks', ['$resource',
// 	function($resource) {
// 		return $resource('stocks/:stockId', {
// 			stockrecordId: '@_id'
// 		}, {
// 			update: {
// 				method: 'PUT'
// 			}
// 		});
// 	}
// ]);

//Stocks service used for communicating with the stocks REST endpoints
angular.module('stocks').factory('Stocks', ['$resource',
	function($resource) {
		return $resource('stocks/:stockId', {
			stockrecordId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);