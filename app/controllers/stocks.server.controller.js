'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Stock = mongoose.model('Stock'),
	_ = require('lodash');

/**
 * Create a stock
 */
exports.create = function(req, res) {
	var stock = new Stock(req.body);
	stock.user = req.user;

	stock.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(stock);
		}
	});
};

/**
 * Show the current stock
 */
exports.read = function(req, res) {
	res.json(req.stock);
};

/**
 * Update a stock
 */
exports.update = function(req, res) {
	var stock = req.stock;

	stock = _.extend(stock, req.body);

	stock.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(stock);
		}
	});
};

/**
 * Delete an stock
 */
exports.delete = function(req, res) {
	var stock = req.stock;

	stock.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(stock);
		}
	});
};

/**
 * List of Stocks
 */
exports.list = function(req, res) {
	console.log(req.user.id); // { 'user': req.user.id }
	Stock.find().sort('-created').populate('user', 'displayName').exec(function(err, stocks) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(stocks);
		}
	});
};

/**
 * Stock middleware
 */
exports.stockByID = function(req, res, next, id) {
	Stock.findById(id).populate('user', 'displayName').exec(function(err, stock) {
		if (err) return next(err);
		if (!stock) return next(new Error('Failed to load stock ' + id));
		req.stock = stock;
		next();
	});
};

/**
 * Stock authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.stock.user.id !== req.user.id) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}
	next();
};