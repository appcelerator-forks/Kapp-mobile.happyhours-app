var args 			=  arguments[0] || {};
var etablishmentId 		=  args.etablishmentId;
var etablishmentTitle 	=  args.etablishmentTitle;

$.etablishmentData.fetch({
	id: etablishmentId
});

var happyhour = Alloy.createCollection('happyhour');
var table = happyhour.config.adapter.collection_name;
console.log(table);


//fetch happy and construct happy views
happyhour.fetch({
	query:'SELECT * from ' + table + ' where id_etablishment="' + etablishmentId + '"',
	success: function(){
        console.log(happyhour.models);

		for (var i = 0; i < happyhour.models.length; i++) {
			var oneHappy = happyhour.models[i].toJSON();
			var day = oneHappy.day;
			var hour = oneHappy.hours;
			var text = oneHappy.text.split("-");

			// Text offer
			labelHappy = Ti.UI.createView({
				top		: "30%",
				left 	: "5%",
				height	: "60%",
				width	: "90%",
			});

			var labelTextHappy = [];

			for (var j = 0; j < text.length; j++) {
				labelTextHappy.push(Ti.UI.createLabel({
					text		: text[j] ,
					textAlign	: Titanium.UI.TEXT_ALIGNMENT_LEFT,
					font: {
						fontSize: 12,
					},
					color		: "black",
					top			: '' + j * 60 + 10 + 'px',
					left		: 0,
					height		: Ti.UI.SIZE,
				}));

				labelHappy.add(labelTextHappy[j]);

			}

			//hour
			var dayText = '';

			day = day.toString();
			//
			if(day.match(/1/)){
				dayText+=' Lundi ';
			}
			if(day.match(/2/)){
				dayText+=' Mardi ';
			}
			if(day.match(/3/)){
				dayText+=' Mercredi ';
			}
			if(day.match(/4/)){
				dayText+=' Jeudi ';
			}
			if(day.match(/5/)){
				dayText+=' Vendredi ';
			}
			if(day.match(/6/)){
				dayText+=' Samedi ';
			}
			if(day.match(/7/)){
				dayText+=' Dimanche ';
			}

			var labelTextDay = Ti.UI.createLabel({
				text		: dayText,
				color		: "black",
				font: {
					fontSize: 9,
				},
				textAlign	: Titanium.UI.TEXT_ALIGNMENT_CENTER,
				top			: "5%",
				width 		: "90%",
				height 		: "50px",
				left 		: "5%",
			});

			var labeltextHour = Ti.UI.createLabel({
				text		: "De "+ hour,
				color		: "black",
				textAlign	: Titanium.UI.TEXT_ALIGNMENT_LEFT,
				font: {
					fontSize: 11
				},
				left		: "15%",
				top			: "80%",
			});

			var oneHappyView = Ti.UI.createView({
				backgroundColor	: 'white',
				height			: "90%",
				width			: "100%",
				left			: "0%",
				top				: "0%",
				zIndex			: 40,

			});

			// icons
			var barreIconDay = Ti.UI.createImageView({
				image			: "icons/line_happy.png",
				top				: "18%",
				left 			: "40%",
				width			: "100px",
				height			: "50px",
				zIndex			: 20

			});

			var clock = Ti.UI.createImageView({
				image			: "icons/clock.png",
				top				: "80%",
				left 			: "5%",
				width			: "40px",
				height			: "40px",
				zIndex			: 20

			});

			oneHappyView.add(labelTextDay);
			oneHappyView.add(labeltextHour);
			oneHappyView.add(labelHappy);

			oneHappyView.add(barreIconDay);
			oneHappyView.add(clock);


			$.happyScrollable.addView(oneHappyView);

		}






    },
    error: function(){
    console.log("error");
    }
});

var sViewPagingControl = new Alloy.Globals.PagingControl($.happyScrollable);
$.allHappy.add(sViewPagingControl);

$.etablishment.open();

//listener
$.btnBack.addEventListener('click', closeWindow);
$.btnMap.addEventListener('click', openMap);



function closeWindow() {
	$.etablishment.close();
}

function openMap() {

	// Toulouse center
	var latitude  = 43.584652;
	var longitude = 1.4442090000000007;

	// Get User location
    Ti.Geolocation.distanceFilter = 10;

		Ti.Geolocation.getCurrentPosition(function(e) {

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
