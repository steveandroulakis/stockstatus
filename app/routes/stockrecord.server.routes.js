'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
	stockrecords = require('../../app/controllers/stockrecords.server.controller');

module.exports = function(app) {
	// Stockrecord Routes
	app.route('/stockrecords')
		.get(stockrecords.listrecord, users.requiresLogin)
		.post(users.requiresLogin, stockrecords.createrecord);

	// Finish by binding the stock middleware
	app.param('stockrecordId', stockrecords.stockrecordByID);
};