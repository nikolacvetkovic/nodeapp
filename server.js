var express = require("express");
var server = express();
var bodyParser = require("body-parser");

var campgrounds = [
		{name: "Salmon Creek", image: "https://source.unsplash.com/mzZVGFfMOkA"},
		{name: "Granite Hill", image: "https://source.unsplash.com/B9z9TjfIw3I"},
		{name: "Mountain Goat's Rest", image: "https://source.unsplash.com/oT4hTqWoZ6M"},
		{name: "Granite Hill", image: "https://source.unsplash.com/B9z9TjfIw3I"},
		{name: "Mountain Goat's Rest", image: "https://source.unsplash.com/oT4hTqWoZ6M"},
		{name: "Granite Hill", image: "https://source.unsplash.com/B9z9TjfIw3I"},
		{name: "Mountain Goat's Rest", image: "https://source.unsplash.com/oT4hTqWoZ6M"}
	];
server.use(bodyParser.urlencoded({extended: true}));
server.set("view engine", "ejs");

server.get("/", function(req, res){
	res.render("index");
});

server.get("/campgrounds", function(req, res){
	res.render("campgrounds", {campgrounds: campgrounds});
});

server.get("/campgrounds/new", function(req, res){
	res.render("new.ejs");
});

server.post("/campgrounds", function(req, res){
	var name = req.body.name;
	var image = req.body.image;
	var newCampground = {name: name, image: image};
	campgrounds.push(newCampground);
	res.redirect("/campgrounds");
});

/*---------------------------*/
server.listen(80, function(){
	console.log("Listening...");
});


//https://source.unsplash.com/vaPoJZB9Mzg