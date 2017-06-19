var mongoose = require("mongoose");
var Campground = require("./modules/campground");
var Comment = require("./modules/comment");

var data = [
	{
		name: "Salmon Creek",
		image: "https://source.unsplash.com/mzZVGFfMOkA",
		description: "Bla bla"
	},
	{
		name: "Granite Hill",
		image: "https://source.unsplash.com/B9z9TjfIw3I",
		description: "Trt trt"
	},
	{
		name: "Svitac",
		image: "https://source.unsplash.com/rRljZzjNQAA",
		description: "Ops ups"
	},
	{
		name: "Zvezda Vodilja",
		image: "https://source.unsplash.com/OivhEmfO-kk",
		description: "Opsaaa saaa"
	},
	{
		name: "Kamenjar",
		image: "https://source.unsplash.com/63pP6_FlnMY",
		description: "......."
	},
	{
		name: "Izlazak Sunca",
		image: "https://source.unsplash.com/qelGaL2OLyE",
		description: "Nesto bre"
	},
];


function seedDb(){
	// Remove all campgrounds
	Campground.remove({}, function(err){
		if(err){
			console.log(err);
		}
		console.log("removed campgrounds!");
		// Add campgrounds
		data.forEach(function(seed){ //ovde se postavlja kako bi se osiguralo da ce se dodati nakon brisanja
			Campground.create(seed, function(err, campground){
				if(err){
					console.log(err);
				} else {
					console.log("added a campground");
					// Add comments
					Comment.create({
						text: "This place is great!",
						author: "Homer"
					}, function(err, comment){
						if(err){
							console.log(err);
						} else {
							campground.comments.push(comment);
							campground.save();
							console.log("created comment");
						}
					})
				}
			});
		});
	});
}

module.exports = seedDb;