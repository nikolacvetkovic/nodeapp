var Campground 	= require("../modules/campground");
var Comment 	= require("../modules/comment");
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next){
	if(req.isAuthenticated()){
		Campground.findById(req.params.id, function(err, foundCampground){
			if(err){
				req.flash("error", "Campground not found.");
				res.redirect("back");
			} else  {
				if(foundCampground.author.id.equals(req.user._id)){
					next();
				} else {
					req.flash("error", "You don't have permission to do that.")
					res.redirect("back");
				}
			}

		});
	} else {
		req.flash("error", "You need to be logged in to do that.");
		res.redirect("back");
	}
};

middlewareObj.checkCommentOwnership = function(req, res, next){
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id, function(err, foundComment){
			if(err){
				req.flash("error", "Comment not found.");
				res.redirect("back");
			} else  {
				if(foundComment.author.id.equals(req.user._id)){
					next();
				} else {
					req.flash("error", "You don't have permission to do that.");
					res.redirect("back");
				}
			}

		});
	} else {
		req.flash("error", "You need to be logged in to do that.");
		res.redirect("back");
	}
};

middlewareObj.isLoggedIn = function(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error", "You need to be logged in to do that.");
	if(req.session){
		req.session.redirectUrl = req.headers.referer || req.originalUrl || req.url;
	}
	res.redirect("/login");
};

module.exports = middlewareObj;

// moze i ovako
// module.exports = {
// 	checkCommentOwnership: function (argument) {
// 		// body...
// 	},
// 	checkCampgroundOwnership: function(argument) {

// 	}
// };