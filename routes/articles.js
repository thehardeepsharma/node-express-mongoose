var Article = require('../models/ArticleModel');
var articleModule = require('../modules/article.js')

module.exports = function(app) {
	
	app.get('/', function (req, res) {
		articleModule.list(req,res);
	})
	
	// Listing of Articles
	app.get('/articles', function(req, res) {
		articleModule.list(req,res);
	});
	
	// Show Article Form for adding
	app.get('/article/new', function(req, res) {
		articleModule.add(req,res);
	});
	
	// Save an article
	app.post('/article/save', function(req, res) {
		articleModule.save(req,res);		
	});
	
	// View an article
	app.get('/article/view/:id', function(req, res) {
		articleModule.view(req,res);
	});
	
	// View an article
	app.post('/article/comment/save', function(req, res) {
		articleModule.saveComment(req,res);
	});
	
	// Edit an article
	app.get('/article/edit/:id', function(req, res) {
		articleModule.edit(req,res);
	});
	
	// Update article
	app.post('/article/update/:id', function(req, res) {
		articleModule.update(req,res);
	});
	
	// Delete an article
	app.get('/article/delete/:id', function(req, res) {
		articleModule.delete(req,res);		
	});
};