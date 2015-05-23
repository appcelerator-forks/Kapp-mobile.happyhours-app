Alloy.Collections.etablishment.fetch();

function haveHappyFilter(collection) {
    return collection.where({
        haveHappy : "true"
    });
}

var childrens = $.happyhourcontents.children;
var idEtablishment;
var hour;

var db = Ti.Database.open('happyhourdb');

for(var i=0; i < childrens.length; i++ ) {

	if (!childrens[i].idEtablishment)
		continue;

	idEtablishment = childrens[i].idEtablishment;

	var happyhourData = db.execute("SELECT * FROM happyhours WHERE id_etablishment = " +  idEtablishment);
	hour = happyhourData.fieldByName('hours');


}

db.close();

function test(model)
{
	date = new Date;
	h = date.getHours();
	m = date.getMinutes();
	Ti.API.info(m);
	var heure;
	var minute;
	var now ="";

	var db = Ti.Database.open('happyhourdb');

	var transform = model.toJSON();
	
	var happyhourData = db.execute("SELECT * FROM happyhours WHERE id_etablishment = " +  transform.id);
	var hour = happyhourData.fieldByName('hours');
	db.close();

	 var pos = hour.lastIndexOf('/');

	 var begin = hour.substr(0, pos);

	 if (begin.length == 3) {
	 	
	 	heure = hour.substr(0, 2);
	 	
	 	if (heure == h) {
	 		
	 		now = "maintenant !";
	 	
	 	} else if(heure == h + 1) {
	 		
	 		if (m > 30) {
	 			now = "dans 30min";
	 		} else {
				now = "dans 1h";
	 		};
	 	} else {
	 		now = "dans longtemps";
	 	}
	
	} else {
		heure = hour.substr(0, 2);
		minute = hour.substr(3, 2);

		if (heure == h && minute <= m) {
	 		
	 		now = "maintenant";
	 	
	 	} else if (heure == h && minute >= m){

	 		now="dans 30min";

	 	}else if(heure == h + 1) {
	 		
	 		if (m < minutes) {
	 			now = "dans longtemps";
	 		} else {
				now = "dans 1h";
	 		};
	 	} else {
	 		now = "dans longtemps";
	 	}
	};

	transform.test = now;

	return transform;
}