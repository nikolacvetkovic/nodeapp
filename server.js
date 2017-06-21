var express 		= require("express"),
	server 			= express(),
	bodyParser 		= require("body-parser"),
	mongoose 		= require("mongoose"),
	passport		= require("passport"),
	LocalStrategy	= require("passport-local"),
	expressSession	= require("express-session"),
	Campground 		= require("./modules/campground"),
	Comment 		= require("./modules/comment"),
	User 			= require("./modules/user"),
	seedDb 			= require("./seeds");

seedDb();

mongoose.connect("mongodb://localhost/yelp_camp");

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
server.use(express.static(__dirname + "/public")); //__dirname je direktorijum u kome je skripta
server.set("view engine", "ejs");

server.use(expressSession({
	secret: "Tajna",
	resave: false,
	saveUninitialized: false
}));

server.use(passport.initialize());
server.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

server.use(function(req, res, next){
	res.locals.currentUser = req.user;
	next();
});

server.get("/", function(req, res){
	res.render("campgrounds/index");
});

server.get("/campgrounds", function(req, res){
	Campground.find({}, function(err, campgrounds){
		if(err){
			console.log(err);
		} else {
			res.render("campgrounds/campgrounds", {campgrounds: campgrounds, currentUser: req.user});
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
			res.redirect("/campgrounds/campgrounds");
		}
	});
});

server.get("/campgrounds/new", function(req, res){
	res.render("campgrounds/new");
});

server.get("/campgrounds/:id", function (req, res) {  //mora se postaviti ispod /campgrounds/new
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if (err) {
			console.log(err);
		} else {
			res.render("campgrounds/show", {campground: foundCampground});
		}
	});
});

server.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res){
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
		} else {
			res.render("comments/new", {campground: campground});
		}
	});
});

server.post("/campgrounds/:id/comments", isLoggedIn, function(req, res){
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
			res.redirect("/campgrounds");
		} else {
			Comment.create(req.body.comment, function(err, comment){
				if(err){
					console.log(err);
				} else {
					campground.comments.push(comment);
					campground.save();
					res.redirect("/campgrounds/"+campground._id);
				}
			});
		}
	});
});

server.get("/register", function(req, res){
	res.render("register");
});

server.post("/register", function(req, res){
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			return res.render("register");
		}
		passport.authenticate("local")(req, res, function(){
			res.redirect("/campgrounds");
		});
	})
});

server.get("/login", function (req, res) {
	res.render("login");
});

server.post("/login", passport.authenticate("local", {
	successRedirect: "/campgrounds",
	failureRedirect: "/login"
}), function(req, res){
});

server.get("/logout", function(req, res){
	req.logout();
	res.redirect("/");
});

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

/*---------------------------*/
server.listen(80, function(){
	console.log("Listening...");
});


//https://source.unsplash.com/vaPoJZB9Mzg