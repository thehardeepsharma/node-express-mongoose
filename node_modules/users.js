var User = require('../models/UserModel');

module.exports = {
	list: function(req,res) {
		User.find({}, function(err, users) {
			if(err) {
				console.log(err);
			} else {
				res.render('users/index.twig', {
					title: 'List of Users',
					users: users
				});
			}
		});
	},
	
	add: function(req,res) { 
		res.render('users/new.twig', {
			title: 'New User',
		});
	},
	
	save: function(req,res) {
		var user = new User(req.body.user);
		user.save(function(err) {
			if(err) {
				req.flash('error', 'User not added');
			} else {
				req.flash('info', 'User added successfully');				
			}
			res.redirect('/users');
		});
	},
	
	edit: function(req,res) {
		User.findOne({ _id : req.params.id }, function(err,user) {
			if (err) console.log(err);
			if (!user) return next(new Error('Failed to load user ' + req.params.id));
			res.render('users/edit.twig', {
				user: user
			});
		});
	},
	
	update: function(req,res) {
		objectId = req.body.user._id;
		if(objectId != '') {
			User.findOneAndUpdate({_id: objectId }, req.body.user, function(err) {
				if(err) {
					req.flash('error', 'User not updated.');
				} else {
					req.flash('info', 'User updated successfully');
				}
				res.redirect('/users');
			});
		}
	},
	
	delete: function(req,res) {		
		if(req.params.id != '') {
			User.findByIdAndRemove({_id: req.params.id }, function(err) {
				if(err) {
					req.flash('error', 'User not deletion');
				} else {
					req.flash('info', 'User Deleted successfully');
				}
				res.redirect('/users');
			});
		}
	}
}