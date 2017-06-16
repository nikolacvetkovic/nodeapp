var express = require("express");
var server = express();
var campgrounds = [
		{name: "Salmon Creek", image: "https://source.unsplash.com/mzZVGFfMOkA"},
		{name: "Granite Hill", image: "https://source.unsplash.com/B9z9TjfIw3I"},
		{name: "Mountain Goat's Rest", image: "https://source.unsplash.com/oT4hTqWoZ6M"}
	];
server.set("view engine", "ejs");

server.get("/", function(req, res){
	res.render("index");
});

server.get("/campgrounds", function(req, res){
	res.render("campgrounds", {campgrounds: campgrounds});
});

/*---------------------------*/
server.listen(80, function(){
	console.log("Listening...");
});


//https://source.unsplash.com/vaPoJZB9Mzg