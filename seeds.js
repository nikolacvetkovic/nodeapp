var mongoose = require("mongoose");
var Campground = require("./modules/campground");
var Comment = require("./modules/comment");

var data = [
	{
		name: "Salmon Creek",
		image: "https://source.unsplash.com/mzZVGFfMOkA",
		description: "Alcatra frankfurter ham hock strip steak venison pig andouille, landjaeger prosciutto burgdoggen tri-tip pork loin swine leberkas salami. Burgdoggen hamburger ham hock tri-tip boudin kevin chuck pig fatback andouille shank shoulder strip steak swine. Strip steak capicola boudin pork chop cupim, swine ground round tail beef ribs landjaeger sausage alcatra rump chicken. Ball tip alcatra swine rump boudin beef bresaola doner."
	},
	{
		name: "Granite Hill",
		image: "https://source.unsplash.com/B9z9TjfIw3I",
		description: "Tenderloin andouille tri-tip pork chop landjaeger, tail beef ribs rump alcatra strip steak ball tip sausage turducken fatback pork. Drumstick picanha pork pork loin. Flank landjaeger capicola, rump salami meatloaf frankfurter beef ribs ribeye pork loin tri-tip turkey chicken ground round. Fatback short loin shoulder, alcatra corned beef prosciutto landjaeger flank tongue sirloin leberkas turkey cow kielbasa. Bacon andouille spare ribs shank swine sausage fatback tail jowl short ribs tenderloin rump ribeye boudin meatloaf. Prosciutto ground round rump kielbasa cupim jerky. Hamburger short loin doner, tenderloin beef ribs flank bacon pork belly rump capicola."
	},
	{
		name: "Svitac",
		image: "https://source.unsplash.com/rRljZzjNQAA",
		description: "Ham hock shoulder cow meatloaf andouille cupim leberkas landjaeger bacon short ribs tenderloin ball tip burgdoggen. Swine venison cupim alcatra tongue chicken short ribs frankfurter. Ham hock pork loin turkey, meatloaf bresaola landjaeger alcatra leberkas frankfurter burgdoggen. Ribeye porchetta chuck swine kevin ham hock doner pork loin chicken rump corned beef. Tenderloin jerky boudin shankle cupim."
	},
	{
		name: "Zvezda Vodilja",
		image: "https://source.unsplash.com/OivhEmfO-kk",
		description: "Bacon sirloin pork salami, pastrami meatball chuck filet mignon tongue hamburger pancetta tri-tip prosciutto. Pork filet mignon kevin cupim alcatra bresaola meatball drumstick. Picanha chicken biltong, t-bone pork pancetta doner tail ham hock leberkas corned beef. Strip steak corned beef pancetta, pork ground round frankfurter shank kevin capicola pastrami ball tip tongue landjaeger beef."
	},
	{
		name: "Kamenjar",
		image: "https://source.unsplash.com/63pP6_FlnMY",
		description: "Strip steak capicola pork belly doner, turkey landjaeger jerky boudin hamburger pork chop pancetta. Porchetta swine tongue sausage shank cupim prosciutto jowl doner corned beef shoulder tenderloin. Cow tongue kielbasa pork loin landjaeger drumstick short loin spare ribs beef leberkas shank cupim burgdoggen tenderloin pork chop. Bresaola ham venison turkey ribeye alcatra. Fatback pig picanha meatball corned beef. Pork chop flank jowl, hamburger pig beef pork loin shoulder. Turkey burgdoggen t-bone biltong brisket beef flank, pork loin kevin tail filet mignon sausage spare ribs."
	},
	{
		name: "Izlazak Sunca",
		image: "https://source.unsplash.com/qelGaL2OLyE",
		description: "Meatloaf strip steak salami, ham hock capicola filet mignon jowl drumstick swine andouille prosciutto tri-tip chuck beef ribs hamburger. Shoulder beef ribs rump venison fatback ham hock pork beef spare ribs alcatra brisket capicola picanha tongue chuck. Pork chop beef ribs fatback leberkas tail shankle ham pork belly. Pancetta rump t-bone fatback frankfurter, pork belly kevin cupim shoulder burgdoggen pork hamburger salami ball tip jowl. Bacon venison leberkas drumstick boudin pig pancetta picanha biltong porchetta pork short ribs pork loin."
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