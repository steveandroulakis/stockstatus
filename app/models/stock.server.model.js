'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * 4 Char Stock Names
 */
var validateStockCodeLength = function(code) {
	return (code && code.length === 4);
};	

/**
 * Stock Schema
 */
var StockSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	title: {
		type: String,
		default: '',
		trim: true,
		required: 'Title cannot be blank'
	},
	code: {
		type: String,
		default: '',
		trim: true,
		validate: [validateStockCodeLength,
                     'Please enter a 4 letter stock code']
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

// StockSchema.methods.speak = function () {

//   //this.update({ title: '333dd' }, function(){});
//   var stockupdater = require('../controllers/core.server.controller.js');
//   console.log(stockupdater.updateStock());

//   return this.title ? 'Meow name is ' + this.title : 'I don\'t have a name';
// };

mongoose.model('Stock', StockSchema);