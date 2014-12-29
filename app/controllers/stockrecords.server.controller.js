'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Stockrecord = mongoose.model('Stockrecord'),
	Stock = mongoose.model('Stock'),
	_ = require('lodash');

/**
 * Create a stock
 */
exports.createrecord = function(req, res) {
	var stockrecord = new Stockrecord(req.body);
	stockrecord.stock = req.stock;

	stockrecord.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(stockrecord);
		}
	});
};

/**
 * Show the current stock
 */
exports.readrecord = function(req, res) {
	res.json(req.stockrecord);
};

/**
 * List of Stocks
 */
exports.listrecord = function(req, res, stockrecordId) {
	Stockrecord.find({'Stock': stockrecordId}).sort('-created').exec(function(err, stockrecord) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			req.stocks = stockrecord;
			res.json(stockrecord);
		}
	});
};

/**
 * Stock middleware
 */
exports.stockrecordByID = function(req, res, next, id) {
	Stockrecord.find({'Stock': id}).exec(function(err, stockrecord) {
		if (err) return next(err);
		if (!stockrecord) return next(new Error('Failed to load stock ' + id));
		req.stockrecord = stockrecord;
		next();
	});
};

/**
 * Stock authorization middleware
 */
exports.hasAuthorizationrecord = function(req, res, next) {
	if (req.stockrecord.stock.id !== req.stock.id) {
		return res.status(403).send({
			message: 'Can\'t view stock'
		});
	}
	next();
};