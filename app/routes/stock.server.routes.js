'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
	stocks = require('../../app/controllers/stocks.server.controller');

module.exports = function(app) {
	// Stock Routes
	app.route('/stocks')
		.get(stocks.list, users.requiresLogin)
		.post(users.requiresLogin, stocks.create);

	app.route('/stocks/:stockId')
		.get(users.requiresLogin, stocks.hasAuthorization, stocks.read)
		.put(users.requiresLogin, stocks.hasAuthorization, stocks.update)
		.delete(users.requiresLogin, stocks.hasAuthorization, stocks.delete);

	// Finish by binding the stock middleware
	app.param('stockId', stocks.stockByID);
};