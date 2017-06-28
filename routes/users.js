var User = require('../models/UserModel');
var userModule = require('../modules/users.js')

module.exports = function(app) {
	
	// Listing of Users
	app.get('/users', function(req, res) {
		userModule.list(req,res);
	});
	
	// Show user Form for adding
	app.get('/user/new', function(req, res) {
		userModule.add(req,res);
	});
	
	// Save an user
	app.post('/user/save', function(req, res) {
		userModule.save(req,res);		
	});
	
	// View an user
	app.get('/user/view/:id', function(req, res) {
		userModule.view(req,res);
	});
		
	// Edit an user
	app.get('/user/edit/:id', function(req, res) {
		userModule.edit(req,res);
	});
	
	// Update user
	app.post('/user/update/:id', function(req, res) {
		userModule.update(req,res);
	});
	
	// Delete an user
	app.get('/user/delete/:id', function(req, res) {
		userModule.delete(req,res);		
	});
};