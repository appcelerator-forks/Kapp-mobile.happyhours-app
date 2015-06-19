var beginTouch;
var move;
var moveLast = 0;

var testA = 0;
var style;
if (Ti.Platform.name === 'iPhone OS'){
  style = Ti.UI.iPhone.ActivityIndicatorStyle.DARK;
}
else {
  style = Ti.UI.ActivityIndicatorStyle.DARK;
}

function myRefresher(e) {
   Alloy.Collections.etablishment.fetch();
	e.hide();
}

////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////

function haveHappyFilter(collection) {
    return collection.where({
        haveHappy : "true"
    });
}

function transform(model) {
	//Ti.API.info("on est dans la fonction datafliter");

	date = new Date;
	h = date.getHours()-6;
	m = date.getMinutes();

	if(h <0)
		h = h + 24;

	var hourLast= 100;
	var minuteLast= 100;
	var hourEndLast= -1;
	var minuteEndLast= -1;

	var now ="";

	var happyhour = Alloy.createCollection('happyhour');

	var db = Ti.Database.open('happyhourdb');

	var transform = model.toJSON();
		
	if (happyhour.count() && transform.id) {
		
		var happyhourData = db.execute("SELECT * FROM happyhours WHERE id_etablishment = " +  transform.id);
		

		while (happyhourData.isValidRow()){
		
			var hour = happyhourData.fieldByName('hours');

			var pos = hour.indexOf('/');

			var begin = hour.substr(0, pos);
			var end = hour.substr(pos+1, hour.length);
		
			var heure = begin.substr(0, 2);
			
			if (heure < 6) {
				heure = heure + 18;
			};
			var heure = heure - 6;
		
			if (begin.length == 3) {
			 	var minute = 0;
			} else {
				var minute = begin.substr(3, 2);
			};
		
			var posH = end.lastIndexOf('H');
			var heureEnd = end.substr(0, posH);

			if (heureEnd < 6) {
				heureEnd =+ 18;
			};

			var heureEnd = heureEnd - 6;

			if (end.length == 3) {
			 	var minuteEnd = 0;
			} else {
				var minuteEnd = end.substr(3, 2);
			};
	
			if (hourLast>heure) {
				hourLast=heure;
			}

			if (minuteLast>minute){
				minuteLast=minute;
			}

			if (hourEndLast<heureEnd){
				hourEndLast=heureEnd;
			}

			if (minuteEndLast<minuteEnd){
				minuteEndLast=minuteEnd;
			}

			happyhourData.next();
		}


		if (((hourLast == h &&  minuteLast <= m ) || (hourLast < h)) && ((hourEndLast > h  )||(hourEndLast == h && minuteEndLast >= m))) {
			now = "En ce moment ";
		} else if((hourLast == h &&  (minuteLast - m)  <= 30 && (minuteLast - m) > 0)) {
			now = "Dans 30 min";
		} else if (hourLast == (h + 1) &&  (((m - minuteLast)  < 60) && ((m - minuteLast)  >= 30))){
			now = "Dans 30 min";
		} else if (hourLast == (h + 1) &&  (((m - minuteLast)  >= 0) && ((m - minuteLast)  <= 30))){
			now = "Dans 1h";
		} else if (hourLast>h){
			now = "un peu de patience ";
		} else {
			now = "Trop tard ";
		}

			transform.now = now;


		happyhourData.close();
	} else {

	}
	
	

	return transform;
}

/////////////////////////////////////////////////////////
/////// GO TO PARTNER VIEW ////////
/////////////////////////////////////////////////////////

function goEtablishment() {

	var etablishmentView = Alloy.createController('etablishment', {
		'etablishmentId'	: this.idEtablishment,
		'etablishmentTitle'	: this.titleEtablishment
	}).getView();
	
	//etablishmentView.left = 250;
	etablishmentView.open();
	/*etablishmentView.animate({
	    left: 0,
	    duration:600
	}, function(){});*/
}

function getAllEtablishment() {
    var apiUrl = 'http://happyhours-app.fr/api/allEtablishment.php';

    var json;
    var xhr = Ti.Network.createHTTPClient({
        
        onload: function(e) {

            json = JSON.parse(this.responseText);

            var d   = new Date();
            var day = d.getDay() == 0 ? 7 : d.getDay();
           
            var havehappy;
            var data;
            var etablishment;
            var now = "not now";

            for (var i = 0; i < json.etablishment.length; i++) {

                data = json.etablishment[i];
                
                havehappy = "false";


                if (data.dayHappy.indexOf(day) >= 0) 
                    havehappy = "true";

                etablishment = Alloy.createModel('etablishment', {
                    id          : data.ID, 
                    name        : data.name,
                    adress      : data.adress,
                    gps         : data.gps,
                    yelp_id     : data. yelp_id,
                    city        : data.city,
                    haveHappy   : havehappy,
                    now         : now
                }); 

                etablishment.save();

            }

            Alloy.Collections.etablishment.fetch();

        },

        onerror: function(e) {

        }
    });

    xhr.open("GET", apiUrl);
    xhr.send();
}

function getAllHappyHours() {
    var apiUrl = 'http://happyhours-app.fr/api/allHappyHours.php';

    var json;
    var xhr = Ti.Network.createHTTPClient({
        
        onload: function(e) {

            json = JSON.parse(this.responseText);

            for (var i = 0; i < json.happyhour.length; i++) {

                var data    = json.happyhour[i];

                var happyhour = Alloy.createModel('happyhour', {
                    id              : data.ID, 
                    id_etablishment : data.id_etablishment,
                    day             : data.day,
                    text            : data.text,
                    hours           : data. hours

                }); 
                happyhour.save();
            }

        },

        onerror: function(e) {

        }
    });

    xhr.open("GET", apiUrl);
    xhr.send();
}