'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Stockrecord Schema
 */
var StockrecordSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	price: {
		type: Number,
		default: '-1',
	},
	stock: {
		type: Schema.ObjectId,
		ref: 'Stock'
	}	
});

mongoose.model('Stockrecord', StockrecordSchema);