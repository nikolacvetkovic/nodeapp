var express 		= require("express"),
	server 			= express(),
	bodyParser 		= require("body-parser"),
	mongoose 		= require("mongoose"),
	passport		= require("passport"),
	LocalStrategy	= require("passport-local"),
	expressSession	= require("express-session"),
	methodOverride	= require("method-override"),
	flash			= require("connect-flash"),
	Campground 		= require("./modules/campground"),
	Comment 		= require("./modules/comment"),
	User 			= require("./modules/user"),
	seedDb 			= require("./seeds");

var campgroundRoutes	= require("./routes/campgrounds"),
	commentRoutes		= require("./routes/comments"),
	indexRoutes			= require("./routes/index");

mongoose.connect("mongodb://localhost/yelp_camp");

//seedDb();

server.use(bodyParser.urlencoded({extended: true}));
server.use(express.static(__dirname + "/public")); //__dirname je direktorijum u kome je skripta
server.use(methodOverride("_method"));
server.use(flash());
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
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

server.use(indexRoutes);
server.use("/campgrounds", campgroundRoutes);
server.use("/campgrounds/:id/comments", commentRoutes); // da bi radio path parameter potrebno dodati mergeParams: true u Router-u

/*---------------------------*/
server.listen(80, function(){
	console.log("Listening...");
});


//https://source.unsplash.com/vaPoJZB9Mzg