var args 			=  arguments[0] || {};
var etablishmentId 		=  args.etablishmentId;
var etablishmentTitle 	=  args.etablishmentTitle;

$.etablishmentData.fetch({
	id: etablishmentId
});


Alloy.Collections.happyhour.fetch({query:'SELECT * from happyhour where id_etablishment="' + etablishmentId + '"'});


$.etablishment.open();

var sViewPagingControl = new Alloy.Globals.PagingControl($.happyScrollable);
$.allHappy.add(sViewPagingControl);


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
