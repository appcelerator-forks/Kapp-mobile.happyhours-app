var Map 	= require('ti.map');
var mapview = Map.createView({mapType:Map.NORMAL_TYPE});

var args 			=  arguments[0] || {};
var etablishmentId 	=  args.etablishmentId;
var etablishmentTitle 	=  args.etablishmentTitle;

/////////////////////////////////////////////////////////
/////////////////////INITIALIZATION/////////////////////
///////////////////////////////////////////////////////

// Toulouse center
var latitude  = 40.604652;
var longitude = 1.4442090000000007;

// Get User location
Ti.Geolocation.distanceFilter = 10;

Ti.Geolocation.getCurrentPosition(function(e) {
	if (e.error) return;

	longitude = e.coords.longitude;
	latitude  = e.coords.latitude;

});

Ti.Geolocation.addEventListener('location',function(e){
	if (e.error) return;

	longitude = e.coords.longitude;
	latitude = e.coords.latitude;

});

$.mapview.setRegion({
	latitude: latitude, longitude: longitude,
    latitudeDelta:0.02, longitudeDelta:0.02

});

/////////////////////////////////////////////////////////
////////////////////BUTTON//////////////////////////////
///////////////////////////////////////////////////////
var btnBack = Ti.UI.createButton({
	title: ' < ',
	color: "black",
	backgroundImage: "none",
	top: "8.5%",
	left : "5%"
});

/////////////////////////////////////////////////////////
//////////////////EVENT LISTENER////////////////////////
///////////////////////////////////////////////////////
$.backToMe.addEventListener('click', function(e) {
	$.mapview.setRegion({
		latitude: latitude, longitude: longitude,
        latitudeDelta:0.02, longitudeDelta:0.02
	});
});

btnBack.addEventListener('click', function(){
	$.MapEtablishment.close();
	//Ti.App.fireEvent('closeWindow');
});

var etablishment = Alloy.createCollection('etablishment');
etablishment.fetch();


// for each etablishment we build an annotation
etablishment.each(function(etablishment) {



	var coord = etablishment.get('gps').split(',');

	var accroche = '';

	if (!etablishment.get('now')) {
		accroche = '';
	} else {
		accroche = etablishment.get('now');
	}

	var d 	= new Date();
	var day = d.getDay() === 0 ? 7 : d.getDay();


	var happy = etablishment.get('text');

	if (etablishmentId && etablishmentId == etablishment.get('id')) {
		$.mapview.setRegion({
			latitude: coord[0], longitude: coord[1],
	        latitudeDelta:0.001, longitudeDelta:0.001
		});
		var annotation = Map.createAnnotation({
			latitude: 	coord[0],
			longitude: 	coord[1],
			title: 		etablishment.get('name'),
			subtitle:   accroche,
			image: 		"pin/pink-pin.png",
			myId:  		etablishment.get('id')
		});

		$.mapview.addAnnotation(annotation);

	}

});


$.MapEtablishment.add(btnBack);

$.MapEtablishment.open();

function clickAnnotation(evt) {

	Ti.API.info("on a cliquer dessus ");
 	if (evt.clicksource == 'leftButton') {
 		goEtablishment(evt.annotation.myId, evt.title);
 	}

}
