function haveHappyFilter(collection) {
    return collection.where({
        haveHappy : "true"
    });
}

function test(model)
{
	Ti.API.info("on est dans la fonction datafliter");

	date = new Date;
	h = date.getHours()-6;
	m = date.getMinutes();

	if(h <0)
		h = h + 24;

	var now ="";

	var happyhour = Alloy.createCollection('happyhour');

	var db = Ti.Database.open('happyhourdb');

	var transform = model.toJSON();
	Alloy.Globals.json = model;
		
	if (happyhour.count() && transform.id) {
		
		var happyhourData = db.execute("SELECT * FROM happyhours WHERE id_etablishment = " +  transform.id);
		var hour = happyhourData.fieldByName('hours');
		db.close();

		var pos = hour.indexOf('/');

		var begin = hour.substr(0, pos);
		var end = hour.substr(pos+1, hour.length);
	
		var heure = begin.substr(0, 2);
		var heure = heure - 6;
	
		if (begin.length == 3) {
		 	var minute = 0;
		} else {
			var minute = begin.substr(3, 2);
		};
	
		var heureEnd = end.substr(0, 2);
		var heureEnd = heureEnd - 6;

		Ti.API.info(h + " === " + heure + ":" + minute + " -> " + heureEnd);

		if (end.length == 3) {
		 	var minuteEnd = 0;
		} else {
			var minuteEnd = end.substr(3, 2);
		};
	
		if (((heure == h &&  minute <= m ) || (heure < h)) && ((heureEnd > h  )||(heureEnd == h && minuteEnd >= m))) {
			now = "En ce moment";
		} else if((heure == h &&  (minute - m)  <= 30 && (minute - m) > 0)) {
			now = "Dans 30 min";
		} else if (heure == (h + 1) &&  (((m - minute)  < 60) && ((m - minute)  >= 30))){
			now = "Dans 30 min";
		} else if (heure == (h + 1) &&  (((m - minute)  >= 0) && ((m - minute)  <= 30))){
			now = "Dans 1h";
		} else if (heure>h){
			now = "un peu de patience ";
		} else {
			now = "Trop tard ";
		}
	
		transform.test = now;

	} else {

	}
	
	

	return transform;
}

/////////////////////////////////////////////////////////
/////// GO TO PARTNER VIEW ////////
/////////////////////////////////////////////////////////

function goEtablishment(model) {

	var etablishmentView = Alloy.createController('etablishment', {
		'etablishmentId'	: this.idEtablishment,
		'etablishmentTitle'	: this.titleEtablishment
	}).getView();
	
	etablishmentView.left = 250;
	etablishmentView.open();
	etablishmentView.animate({
	    left: 0,
	    duration:200
	}, function(){});
}