var Article = require('../models/ArticleModel');
var Comment = require('../models/CommentModel');
var User = require('../models/UserModel');

module.exports = {
	list: function(req,res) {
		Article.find({}, function(err, articles) {
			if(err) { 
				console.log('EREREREERR'); 
			} else {
				res.render('articles/index.twig', {
					title: 'List of Articles',
					articles: articles
				});
			}
		});
	},
	
	add: function(req,res) { 
		User.find({}, function(err,users) {
			if (err) { console.log(err); }
			res.render('articles/new.twig', {
				users: users,
				title: 'New Article',
				body: 'Test body',
			});
		});		
	},
	
	save: function(req,res) {
		var article = new Article(req.body.article);
		article.save(function(err) {
			if(err) { 
				req.flash('error', 'Article not added');
				res.redirect('/articles');
			} else {
				if (req.body.article.author && req.body.article.author) {
					User.findOne({ _id : req.body.article.author }, function(err,user) {
						user.articles.push(article);
						user.save(function(err) {
							if(err) console.log(err);
						});
					});
					req.flash('info', 'Article added successfully');
				}
				res.redirect('/articles');
			}
		});
	},
	view: function(req,res) {
		Article
			.findOne({ _id : req.params.id })
			.populate('comments') // only works if we pushed refs to children
			.exec(function (err, article) {
				if (err) {
					req.flash('error', 'Invalid Article');
					return res.redirect('/articles');
				}
				if (!article) {
					req.flash('error', 'Invalid Article');
					return res.redirect('/articles');
				}
				res.render('articles/show.twig', {
					article: article
				});
			})
			
		// Working for getting Article	
		/*Comment
			.findOne({ _id : '59265d2611e84905bceea79c' })
			.populate('article')
			.exec(function (err, cmt) {
			if (err) return handleError(err);
			console.log('The creator is %s', cmt.article.title);
		});*/
	},
	saveComment: function(req,res) {
		Article.findOne({ _id : req.body.article._id }, function(err,article) {
			if (err) {
				req.flash('error', 'Invalid Article');
				return res.redirect('/articles');
			}
			if (article) {
				if (req.body.article.comment && req.body.article.comment.body) {
					var comment = new Comment({
						fullname : req.body.article.comment.fullname,
						article_id : req.body.article._id,
						body : req.body.article.comment.body
					});
					article.comments.push(comment);
					req.flash('info', 'Comment added successfully');
				}
				article.save(function(err, doc) {
				  if (err) throw err;
				  if (comment) {
						comment.save(function(err){
							if (err) throw err;
						});
					}
				});
			}	
		});
		res.redirect('/articles');
	},
	edit: function(req,res) {
		Article.findOne({ _id : req.params.id }, function(err,article) {
			if (err) {
				req.flash('error', 'Invalid Article');
				return res.redirect('/articles');
			}
			if (!article) {
				req.flash('error', 'Invalid Article');
				return res.redirect('/articles');
			}
			res.render('articles/edit.twig', {
				article: article
			});
		});
	},
	update: function(req,res) {
		objectId = req.body.article._id;
		if(objectId != '') {
			Article.findOneAndUpdate({_id: objectId }, req.body.article, function(err) {
				if(err) {
					req.flash('error', 'Article not updated');
				} else {
					req.flash('info', 'Article updated successfully');
				}
				res.redirect('/articles');
			});
		}
	},
	delete: function(req,res) {		
		if(req.params.id != '') {
			Article.findByIdAndRemove({_id: req.params.id }, function(err) {
				if(err) {
					req.flash('error', 'Article not deletion');
				} else {
					req.flash('info', 'Article deleted successfully');
				}
				res.redirect('/articles');		
			});
		} else {
			res.redirect('/articles');
		}
	}
}