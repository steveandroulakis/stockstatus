'use strict';

//Stocks service used for communicating with the stocks REST endpoints
angular.module('stocks').factory('Stocks', ['$resource',
	function($resource) {
		return $resource('stocks/:stockId', {
			stockId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);

//Stockrecords service used for communicating with the stocks REST endpoints
angular.module('stocks').factory('Stockrecords', ['$resource',
	function($resource) {
		return $resource('stockrecords/:stockrecordId', {
			stockrecordId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);