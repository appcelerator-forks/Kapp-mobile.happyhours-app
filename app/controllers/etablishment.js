var args 			=  arguments[0] || {};
var etablishmentId 		=  args.etablishmentId;
var etablishmentTitle 	=  args.etablishmentTitle;

// var myModule = require('../lib/PagingControl');

/////////////////////////////////////////////////////////
////////////////////SQL//////////////////////////////////
/////////////////////////////////////////////////////////
var db = Ti.Database.open('happyhourdb');
var happy  = [];
var hour  = [];
var day = [];
var i =0;

var happyhourData = db.execute("SELECT * FROM happyhour WHERE id_etablishment = " +  etablishmentId);
while (happyhourData.isValidRow()){
	happy.push(happyhourData.fieldByName('text'));
	hour.push(happyhourData.fieldByName('hours'));
	day.push(happyhourData.fieldByName('day'));
	hour[i] = hour[i].replace("/", " à ");
	happyhourData.next();
	i++;
}

var db = Ti.Database.open('etablishmentdb');

var etablishmentData = db.execute("SELECT * FROM etablishment WHERE id = " +  etablishmentId);
var adress = etablishmentData.fieldByName('adress');

db.close();

$.etablishment.open();


/////////////////////////////////////////////////////////
////////////MAIN VIEW ///////////////////////////////////
/////////////////////////////////////////////////////////
var controlView = Ti.UI.createView({
	backgroundImage	:'background/background.png',
    height			: "40%",
    width			: "100%",
    top 			: "0%",
	zIndex			: 0
});

var happyView = Ti.UI.createView({
	backgroundImage	:'background/background_etablishment.png',
    height			: "50%",
    width			: "100%",
    top 			: "30%",
	zIndex			: 10
});

var allHappy = Ti.UI.createView({
	backgroundImage	:'background/background_happy.png',
    height			: "55%",
    width			: "98%",
    top 			: "40%",
	left			: "1%",
	zIndex			: 10
});

var happyScrollable = Ti.UI.createScrollableView({
	views				: [],
	height				: "55%",
    width				: "80%",
    top 				: "30%",
	left				: "10%",
	backgroundColor		: "white",
});

/////////////////////////////////////////////////////////
////////////////////BUTTON///////////////////////////////
/////////////////////////////////////////////////////////
var btnBack = Ti.UI.createButton({
	backgroundImage	: "icons/cross.png",
	top				: "5%",
	right 			: "6%",
	width			: "120px",
	height			: "120px",
	zIndex			: 20
});
var btnMap = Ti.UI.createButton({
	backgroundImage	: "icons/map_etablishment.png",
	top				: "26%",
	right 			: "5%",
	width			: "120px",
	height			: "120px",
	zIndex			: 20

});

/////////////////////////////////////////////////////////
////////////////////Icon////////////////////////////////
/////////////////////////////////////////////////////////
var barreIcon = Ti.UI.createImageView({
	image			: "icons/barre.png",
	top				: "60%",
	left 			: "10px",
	width			: "100px",
	height			: "50px",
	zIndex			: 20

});

/////////////////////////////////////////////////////////
////////////////////LABEL////////////////////////////////
/////////////////////////////////////////////////////////
var labelTitle = Ti.UI.createLabel({
	text: etablishmentTitle,
	color	: "black",
	top		: "50%",
	left 	: "30px",
	color	: "white",
	font : {
		fontSize	: "25px"
	},
	zIndex	: 0
});


var labeladress = Ti.UI.createLabel({
	top			: "70%",
	left 		: "30px",
	text		: adress,
	textAlign	: Ti.UI.TEXT_ALIGNMENT_CENTER,
	color		: "white",
	font : {
		fontSize	: "10px"
	},
	zIndex		: 0
});

////////////////////////////////////////////////////////
///////////////////VIEWS Happy Hours///////////////////
//////////////////////////////////////////////////////
var labelDay = [];
var labelHour = [];
var labelHappy = [];
var oneHappy = [];

var labelTextDay;
var labeltextHour;

for (var j = 0; j< hour.length; j++) { //

	console.log(hour[j]);

	oneHappy.push(Ti.UI.createView({
		backgroundColor	: 'white',
		className		: 'row',
		height			: "90%",
		width			: "100%",
		left			: "0%",
		top				: "0%",
		zIndex			: 40,
	}));

	//////////////////////////////////////////////////////
	/////////////////Happy Hour Day /////////////////////
	////////////////////////////////////////////////////

	var happyText = '';

	day[j]= day[j].toString();
	//
	if(day[j].match(/1/)){
		happyText+=' Lundi ';
	}
	if(day[j].match(/2/)){
		happyText+=' Mardi ';
	}
	if(day[j].match(/3/)){
		happyText+=' Mercredi ';
	}
	if(day[j].match(/4/)){
		happyText+=' Jeudi ';
	}
	if(day[j].match(/5/)){
		happyText+=' Vendredi ';
	}
	if(day[j].match(/6/)){
		happyText+=' Samedi ';
	}
	if(day[j].match(/7/)){
		happyText+=' Dimanche ';
	}

	console.log(happyText);


	labelTextDay = Ti.UI.createLabel({
		text		: happyText,
		color		: "black",
		font: {
			fontSize: 9,
		},
		textAlign	: Titanium.UI.TEXT_ALIGNMENT_CENTER,
	});

	labelDay.push(Ti.UI.createView({
		top			: "5%",
		width 		: "90%",
		height 		: "50px",
		left 		: "5%",
	}));

	labelDay[j].add(labelTextDay)


	labelHour.push(Ti.UI.createLabel({
		top: "80%",
		left : "5%",
	}));

	labeltextHour = Ti.UI.createLabel({
		text		: "De "+hour[j],
		color		: "black",
		textAlign	: Titanium.UI.TEXT_ALIGNMENT_LEFT,
		font: {
			fontSize: 11
		}
	});
	labelHour[j].add(labeltextHour);


	labelHappy.push(Ti.UI.createView({
		top		: "20%",
		left 	: "5%",
		height	: "60%",
		width	: "90%",
	}));

	var text = happy[j].split("-");

	var labelTextHappy = [];

	for (var i = 0; i < text.length; i++) {
		labelTextHappy.push(Ti.UI.createLabel({
			text		: text[i] ,
			textAlign	: Titanium.UI.TEXT_ALIGNMENT_LEFT,
			font: {
				fontSize: 12,
			},
			color		: "black",
			top			: '' + i * 60 + 10 + 'px',
			left		: 0,
			height		: Ti.UI.SIZE,
		}));

		console.log(labelTextHappy[i]);

		labelHappy[j].add(labelTextHappy[i]);

	}


	oneHappy[j].add(labelDay[j]);
	oneHappy[j].add(labelHour[j]);
	oneHappy[j].add(labelHappy[j]);


	happyScrollable.addView(oneHappy[j]);
}


/////////////////////////////////////////////////////////
//////////////////////ADD////////////////////////////////
/////////////////////////////////////////////////////////

controlView.add(labelTitle);
controlView.add(labeladress);
controlView.add(barreIcon);


// var sViewPagingControl = new PagingControl(happyScrollable);

allHappy.add(happyScrollable);
// allHappy.add(sViewPagingControl);



$.etablishment.add(btnMap);
$.etablishment.add(btnBack);

$.etablishment.add(controlView);
$.etablishment.add(happyView);

$.etablishment.add(allHappy);

$.etablishment.open();


/////////////////////////////////////////////////////////
////////////////////EVENT////////////////////////////////
/////////////////////////////////////////////////////////
btnBack.addEventListener('click', closeWindow);
btnMap.addEventListener('click', openMap);

Ti.App.addEventListener('closeWindow', closeWindow);


function closeWindow(){
	$.etablishment.close();
    setTimeout(function(e){
    	$.etablishment.left = 320,
        $.etablishment.close(slideRight);
    }, 30);
}

function closeWindow() {
	$.etablishment.close();
}

function openMap() {

	// Toulouse center
	var latitude  = 43.584652;
	var longitude = 1.4442090000000007;

	// Get User location
    Ti.Geolocation.distanceFilter = 10;

		Ti.API.info("hey");
		Ti.Geolocation.getCurrentPosition(function(e) {
			if (e.error) Ti.API.info("mince");

			Ti.API.info("ok") ;
			longitude = e.coords.longitude;
			latitude  = e.coords.latitude;

			var etablishment = Alloy.createCollection('etablishment');
			etablishment.fetch();

			// for each etablishment we build an annotation
			etablishment.each(function(etablishment) {

				if (etablishmentId && etablishmentId == etablishment.get('id')) {
						var coord = etablishment.get('gps');

						Ti.Platform.openURL("http://maps.apple.com/?saddr="+latitude+","+longitude+"&daddr="+coord);
				}

			});


	});

}
