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

 var activityIndicator = Ti.UI.createActivityIndicator({
  color: 'green',
  font: {fontFamily:'Helvetica Neue', fontSize:26, fontWeight:'bold'},
  style:style,
  top:10,
  left:"45%",
  height:10,
  width:Ti.UI.SIZE
});
$.moment.add(activityIndicator);

$.happyhourcontents.addEventListener('touchstart', function(e) {
 
	//Ti.API.info("e.y begin : " + e.y);
	beginTouch = e.y;
	moveLast = beginTouch;
	testA = 0;
});
$.happyhourcontents.addEventListener('touchmove', function(e) {
  	
  	move = (e.y- beginTouch);

  	testA = testA + Math.abs(move);
  	//Ti.API.info(move);

  	if (move>0) {
  		if (((testA - beginTouch)/100)>0 && ((testA - beginTouch)/100)<40) {
	  		if (((testA - beginTouch)/100)>30) {
	  			activityIndicator.show();
				//Ti.API.info((testA - beginTouch)/100);
	  			$.happyhourcontents.setTop((testA - beginTouch)/100);
			} else {
				//Ti.API.info((testA - beginTouch)/100);
	  			$.happyhourcontents.setTop((testA - beginTouch)/100);
			}

  		};

  	};
});
 
$.happyhourcontents.addEventListener('touchend', function(e) {
	if (((testA - beginTouch)/100)>30) {
		setTimeout(function(){ 
			test2();
			activityIndicator.hide();
			$.happyhourcontents.setTop(0);
		}, 1000);
	}else{
		activityIndicator.hide();
		$.happyhourcontents.setTop(0);
	}
});

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

function test2() {
	//Ti.API.info("on est dans la fonction test2");	


	Alloy.Collections.etablishment.fetch();

}

function test(model) {
	//Ti.API.info("on est dans la fonction datafliter");

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

		if (end.length == 3) {
		 	var minuteEnd = 0;
		} else {
			var minuteEnd = end.substr(3, 2);
		};
	
		if (((heure == h &&  minute <= m ) || (heure < h)) && ((heureEnd > h  )||(heureEnd == h && minuteEnd >= m))) {
			now = "En ce moment";
		} else if((heure == h &&  (minute - m)  <= 30 && (minute - m) > 0)) {
			now = "Dans 30 min 1";
		} else if (heure == (h + 1) &&  (((m - minute)  < 60) && ((m - minute)  >= 30))){
			now = "Dans 30 min 1";
		} else if (heure == (h + 1) &&  (((m - minute)  >= 0) && ((m - minute)  <= 30))){
			now = "Dans 1h 1";
		} else if (heure>h){
			now = "un peu de patience";
		} else {
			now = "Trop tard";
		}
		transform.now = now;

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