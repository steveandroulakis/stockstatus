'use strict';

// Setting up route
angular.module('stocks').config(['$stateProvider',
	function($stateProvider) {
		// Stocks state routing
		$stateProvider.
		state('createStockrecord', {
			url: '/stockrecords/create',
			templateUrl: 'modules/stocks/views/create-stockrecord.client.view.html'
		}).	
		state('listStocks', {
			url: '/stocks',
			templateUrl: 'modules/stocks/views/list-stocks.client.view.html'
		}).
		state('createStock', {
			url: '/stocks/create',
			templateUrl: 'modules/stocks/views/create-stock.client.view.html'
		}).
		state('viewStock', {
			url: '/stocks/:stockId',
			templateUrl: 'modules/stocks/views/view-stock.client.view.html'
		}).
		state('editStock', {
			url: '/stocks/:stockId/edit',
			templateUrl: 'modules/stocks/views/edit-stock.client.view.html'
		}).
		state('viewStockrecord', {
			url: '/stockrecords/:stockId',
			templateUrl: 'modules/stocks/views/list-stockrecords.client.view.html'
		});
	}
]);