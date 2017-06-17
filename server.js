var express 	= require("express"),
	server 		= express(),
	bodyParser 	= require("body-parser"),
	mongoose 	= require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");

var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// var campgrounds = [
// 		{name: "Salmon Creek", image: "https://source.unsplash.com/mzZVGFfMOkA"},
// 		{name: "Granite Hill", image: "https://source.unsplash.com/B9z9TjfIw3I"},
// 		{name: "Mountain Goat's Rest", image: "https://source.unsplash.com/oT4hTqWoZ6M"},
// 		{name: "Granite Hill", image: "https://source.unsplash.com/B9z9TjfIw3I"},
// 		{name: "Mountain Goat's Rest", image: "https://source.unsplash.com/oT4hTqWoZ6M"},
// 		{name: "Granite Hill", image: "https://source.unsplash.com/B9z9TjfIw3I"},
// 		{name: "Mountain Goat's Rest", image: "https://source.unsplash.com/oT4hTqWoZ6M"}
// 	];

server.use(bodyParser.urlencoded({extended: true}));
server.set("view engine", "ejs");

server.get("/", function(req, res){
	res.render("index");
});

server.get("/campgrounds", function(req, res){
	Campground.find({}, function(err, campgrounds){
		if(err){
			console.log(err);
		} else {
			res.render("campgrounds", {campgrounds: campgrounds});
		}
	});
});

server.post("/campgrounds", function(req, res){
	var name = req.body.name;
	var image = req.body.image;
	var description = req.body.description;
	var newCampground = {name: name, image: image, description: description};
	Campground.create(newCampground, function(err, campground){
		if(err){
			console.log(err);
		} else {
			res.redirect("/campgrounds");
		}
	});
});

server.get("/campgrounds/new", function(req, res){
	res.render("new");
});

server.get("/campgrounds/:id", function (req, res) {  //mora se postaviti ispod /campgrounds/new
	Campground.findById(req.params.id, function(err, foundCampground){
		if (err) {
			console.log(err);
		} else {
			res.render("show", {campground: foundCampground});
		}
	});
});

/*---------------------------*/
server.listen(80, function(){
	console.log("Listening...");
});


//https://source.unsplash.com/vaPoJZB9Mzg