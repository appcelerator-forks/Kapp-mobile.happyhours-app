if (Ti.Platform.name === 'iPhone OS'){
  style = Ti.UI.iPhone.ActivityIndicatorStyle.DARK;
}
else {
  style = Ti.UI.ActivityIndicatorStyle.DARK;
}


$.moment.setTitleControl(Ti.UI.createLabel({
  color: "#ffffff",
  font: {
    fontFamily: 'TitilliumWeb-Regular',
    fontSize: 20
  },
	text: "En ce moment"
}));


function setNow(model){

	var etablishment = Alloy.createCollection('etablishment');

	var db = Ti.Database.open('etablishmentdb');

	var etablishmentData = db.execute("SELECT * FROM etablishment" );

	while (etablishmentData.isValidRow()){

		etablishmentData.next();
	}

	etablishmentData.close();
	db.close();


	Alloy.Collections.etablishment.fetch();
}

//Filter
function haveHappyFilter(collection) {
	Ti.API.info("haveHappyFilter ");

    return collection.where({
        haveHappy : 'true'
    });
}




function myRefresher(e) {
	Ti.API.info("on refresh");

    if (!Alloy.Globals.hasConnection()) {
        var dialog = Ti.UI.createAlertDialog({
            message: 'Veuillez vous connecter à internet. ',
            ok: 'Je comprends',
            title: 'Attention'
        });
        dialog.show();
    }else{
    	//////////////////////////////////////
    	var happyhour = Alloy.createCollection('happyhour');
		var etablishment = Alloy.createCollection('etablishment');
		happyhour.deleteAll();
		etablishment.deleteAll();

		Alloy.Globals.getAllData();

	 }
   	Alloy.Collections.etablishment.fetch();
	e.hide();
}

function goEtablishment() {


	var etablishmentView = Alloy.createController('etablishment', {
		'etablishmentId'	: this.idEtablishment,
		'etablishmentTitle'	: this.titleEtablishment
	}).getView();

}






// function transform(model) {
//
// 	Ti.API.info("transform");
//
// 	date = new Date();
// 	h = date.getHours()-6;
// 	m = date.getMinutes();
//
// 	if(h <0)
// 		h = h + 24;
//
// 	var hourLast= 100;
// 	var minuteLast= 100;
// 	var hourEndLast= -1;
// 	var minuteEndLast= -1;
//
// 	var happyhour = Alloy.createCollection('happyhour');
//
// 	var db = Ti.Database.open('happyhourdb');
//
// 	var myTransform = model.toJSON();
//
// 	if (myTransform.id) {
//
//
//
// 		var happyhourData = db.execute("SELECT * FROM happyhour WHERE id_etablishment = " +  myTransform.id);
//
//
// 		while (happyhourData.isValidRow()){
//
//
// 			////////Complicated operation on hour !!!///////
// 			var hour = happyhourData.fieldByName('hours');
//
// 			var pos = hour.indexOf('/');
//
// 			var begin = hour.substr(0, pos);
// 			var end = hour.substr(pos+1, hour.length);
//
// 			var heure = begin.substr(0, 2);
//
// 			var minute = 0;
//
// 			if (heure < 6) {
// 				heure = heure + 18;
// 			}
//
// 			heure = heure - 6;
//
// 			if (begin.length == 3) {
// 			 	minute = 0;
// 			} else {
// 				minute = begin.substr(3, 2);
// 			}
//
// 			var posH = end.lastIndexOf('H');
// 			var heureEnd = end.substr(0, posH);
// 			var minuteEnd = 0;
//
// 			if (heureEnd < 6) {
// 				heureEnd =+ 18;
// 			}
//
// 			heureEnd = heureEnd - 6;
//
// 			if (end.length == 3) {
// 			 	minuteEnd = 0;
// 			} else {
// 				minuteEnd = end.substr(3, 2);
// 			}
//
// 			if (hourLast>heure) {
// 				hourLast=heure;
// 			}
//
// 			if (minuteLast>minute){
// 				minuteLast=minute;
// 			}
//
// 			if (hourEndLast<heureEnd){
// 				hourEndLast=heureEnd;
// 			}
//
// 			if (minuteEndLast<minuteEnd){
// 				minuteEndLast=minuteEnd;
// 			}
//
// 			happyhourData.next();
// 		}
//
// 		happyhourData.close();
//
// 		var now ="";
//
// 		if (((hourLast == h &&  minuteLast <= m ) || (hourLast < h)) && ((hourEndLast > h  )||(hourEndLast == h && minuteEndLast >= m))) {
// 			now = "En ce moment";
// 		} else if (((hourLast == h &&  (minuteLast - m)  <= 30 && (minuteLast - m) > 0)) || (hourLast == (h + 1) &&  (((m - minuteLast)  < 60) && ((m - minuteLast)  >= 30))) ) {
// 			now = "Dans 30 min";
// 		} else if (hourLast == (h + 1) &&  (((m - minuteLast)  >= 0) && ((m - minuteLast)  <= 30))){
// 			now = "Dans 1h";
// 		} else if (hourLast > (h+1)){
// 			now ="Dans la soirée";
// 		}
//
// 		var db2 = Ti.Database.open('etablishmentdb');
// 		var sql = '';
//
//
// 		Ti.API.error(myTransform);
// 		myTransform.now = now;
//
// 		db2.close();
//
// 	} else {
//
// 	}
//
// 	db.close();
//
// 	return myTransform;
// }
