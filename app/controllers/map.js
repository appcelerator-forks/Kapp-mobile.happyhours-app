var Map 	= require('ti.map');
var mapview = Map.createView({mapType:Map.NORMAL_TYPE});

// Toulouse center
var latitude  = 43.604652;
var longitude = 1.4442090000000007;

$.mapview.setRegion({
	latitude: 		latitude, 
	longitude: 		longitude,
    latitudeDelta: 	0.02,
    longitudeDelta: 0.02
});