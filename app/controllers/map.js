var Map 	= require('ti.map');
var mapview = Map.createView({mapType:Map.NORMAL_TYPE});
var k = 0;

$.map.setTitleControl(Ti.UI.createLabel({
  color : "#ffffff",
  font: {
    fontFamily: 'TitilliumWeb-Regular',
    fontSize: 20
  },
  text  : "Carte"
}));

Ti.App.addEventListener("refresh", fetchEtablishmentToMap);

/////////////////////////////////////////////////////////
/////////////////////INITIALIZATION/////////////////////
///////////////////////////////////////////////////////
// Toulouse center
var latitude  = 43.604652;
var longitude = 1.4442090000000007;

// Get User location
Ti.Geolocation.distanceFilter = 10;

Ti.Geolocation.getCurrentPosition(function(e) {
	if (e.error) return;

	longitude = e.coords.longitude;
	latitude  = e.coords.latitude;


		$.mapview.setRegion({
			latitude         : latitude,
            longitude        : longitude,
	        latitudeDelta    :0.02, longitudeDelta:0.02
		});

});

Ti.Geolocation.addEventListener('location',function(e){
	if (e.error) return;

	longitude = e.coords.longitude;
	latitude = e.coords.latitude;


		$.mapview.setRegion({
			latitude: latitude, longitude: longitude,
	        latitudeDelta:0.02, longitudeDelta:0.02
		});


});


/////////////////////////////////////////////////////////
//////////////////EVENT LISTENER////////////////////////
///////////////////////////////////////////////////////
$.backToMe.addEventListener('click', function(e) {
	$.mapview.setRegion({
		latitude      : latitude,
        longitude     : longitude,
        latitudeDelta : 0.02,
        longitudeDelta:0.02
	});
});

fetchEtablishmentToMap();
setInterval(fetchEtablishmentToMap, 300000);

function fetchEtablishmentToMap() {

	if(!Alloy.Globals.endDownload && k < 10000) {

		setTimeout(fetchEtablishmentToMap, 500);
		k += 500;
		return;
	}

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

		var annotation = Map.createAnnotation({
			latitude      : coord[0],
			longitude     : coord[1],
			title         : etablishment.get('name'),
			subtitle      : accroche,
			image         : "pin/blue-pin.png",
			myId          : etablishment.get('id'),
			leftButton    : "icons/goto.png"
		});

		$.mapview.addAnnotation(annotation);

		annotation.addEventListener('click', clickAnnotation);

	});

}

$.mapview.addEventListener('click', function(evt){
    if(evt.clicksource == "leftButton"){
    	goEtablishment(evt.annotation.myId, evt.annotation.title);

    }
});


function clickAnnotation(evt) {

	Ti.API.error(evt);
 	if (evt.clicksource == 'leftButton') {
 		goEtablishment(evt.annotation.myId, evt.annotation.title);
 	}

}


	$.mapview.setRegion({
		latitude: 		latitude,
		longitude: 		longitude,
	    latitudeDelta: 	0.02,
	    longitudeDelta: 0.02
	});




/////////////////////////////////////////////////////////
/////// GO TO etablishment VIEW ////////
/////////////////////////////////////////////////////////

function goEtablishment(etablishmentId, etablishmentTitle) {

	var etablishmentView = Alloy.createController('etablishment', {
		'etablishmentId': 	etablishmentId,
		'etablishmentTitle': etablishmentTitle
	}).getView();

	etablishmentView.open();
}
