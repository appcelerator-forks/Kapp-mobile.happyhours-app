function haveHappyFilter(collection) {
    return collection.where({
        haveHappy : "true"
    });
}

function test(model)
{
	date = new Date;
	h = date.getHours();
	m = date.getMinutes();

	var now ="";

	var db = Ti.Database.open('happyhourdb');

	var transform = model.toJSON();
	
	var happyhourData = db.execute("SELECT * FROM happyhours WHERE id_etablishment = " +  transform.id);
	var hour = happyhourData.fieldByName('hours');
	db.close();

		var pos = hour.indexOf('/');

		var begin = hour.substr(0, pos);
		var end = hour.substr(pos+1, hour.length);
	
		var heure = begin.substr(0, 2);
	
		if (begin.length == 3) {
		 	var minute = 0;
		} else {
			var minute = begin.substr(3, 2);
		};
	
		var heureEnd = end.substr(0, 2);
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
			now = "un peu de patience";
		} else {
			now = "Trop tard";
		}
	
		transform.test = now;
	

	return transform;
}