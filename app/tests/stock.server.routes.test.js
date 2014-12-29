'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Stock = mongoose.model('Stock'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, stock;

/**
 * Stock routes tests
 */
describe('Stock CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new stock
		user.save(function() {
			stock = {
				title: 'Stock Title',
				code: 'APPL',
			};

			done();
		});
	});

	it('should be able to save an stock if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new stock
				agent.post('/stocks')
					.send(stock)
					.expect(200)
					.end(function(stockSaveErr, stockSaveRes) {
						// Handle stock save error
						if (stockSaveErr) done(stockSaveErr);

						// Get a list of stocks
						agent.get('/stocks')
							.end(function(stocksGetErr, stocksGetRes) {
								// Handle stock save error
								if (stocksGetErr) done(stocksGetErr);

								// Get stocks list
								var stocks = stocksGetRes.body;

								// Set assertions
								(stocks[0].user._id).should.equal(userId);
								(stocks[0].title).should.match('Stock Title');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save an stock if not logged in', function(done) {
		agent.post('/stocks')
			.send(stock)
			.expect(401)
			.end(function(stockSaveErr, stockSaveRes) {
				// Call the assertion callback
				done(stockSaveErr);
			});
	});

	it('should not be able to save an stock if no title is provided', function(done) {
		// Invalidate title field
		stock.title = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new stock
				agent.post('/stocks')
					.send(stock)
					.expect(400)
					.end(function(stockSaveErr, stockSaveRes) {
						// Set message assertion
						(stockSaveRes.body.message).should.match('Title cannot be blank');
						
						// Handle stock save error
						done(stockSaveErr);
					});
			});
	});

	it('should be able to update an stock if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new stock
				agent.post('/stocks')
					.send(stock)
					.expect(200)
					.end(function(stockSaveErr, stockSaveRes) {
						// Handle stock save error
						if (stockSaveErr) done(stockSaveErr);

						// Update stock title
						stock.title = 'WHY YOU GOTTA BE SO MEAN?';

						// Update an existing stock
						agent.put('/stocks/' + stockSaveRes.body._id)
							.send(stock)
							.expect(200)
							.end(function(stockUpdateErr, stockUpdateRes) {
								// Handle stock update error
								if (stockUpdateErr) done(stockUpdateErr);

								// Set assertions
								(stockUpdateRes.body._id).should.equal(stockSaveRes.body._id);
								(stockUpdateRes.body.title).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of stocks if not signed in', function(done) {
		// Create new stock model instance
		var stockObj = new Stock(stock);

		// Save the stock
		stockObj.save(function() {
			// Request stocks
			request(app).get('/stocks')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single stock if not signed in', function(done) {
		// Create new stock model instance
		var stockObj = new Stock(stock);

		// Save the stock
		stockObj.save(function() {
			request(app).get('/stocks/' + stockObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('title', stock.title);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete an stock if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new stock
				agent.post('/stocks')
					.send(stock)
					.expect(200)
					.end(function(stockSaveErr, stockSaveRes) {
						// Handle stock save error
						if (stockSaveErr) done(stockSaveErr);

						// Delete an existing stock
						agent.delete('/stocks/' + stockSaveRes.body._id)
							.send(stock)
							.expect(200)
							.end(function(stockDeleteErr, stockDeleteRes) {
								// Handle stock error error
								if (stockDeleteErr) done(stockDeleteErr);

								// Set assertions
								(stockDeleteRes.body._id).should.equal(stockSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete an stock if not signed in', function(done) {
		// Set stock user 
		stock.user = user;

		// Create new stock model instance
		var stockObj = new Stock(stock);

		// Save the stock
		stockObj.save(function() {
			// Try deleting stock
			request(app).delete('/stocks/' + stockObj._id)
			.expect(401)
			.end(function(stockDeleteErr, stockDeleteRes) {
				// Set message assertion
				(stockDeleteRes.body.message).should.match('User is not logged in');

				// Handle stock error error
				done(stockDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Stock.remove().exec();
		done();
	});
});