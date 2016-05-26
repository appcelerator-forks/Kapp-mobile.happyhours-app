// Alloy.Globals.json;
// Alloy.Globals.dataEtablishment  =  {};
// Alloy.Globals.firstOpening  =   true;
var pageColor = "rgb(226,150,122)";
Alloy.Globals.endDownload = false;

Alloy.Globals.urlEtablishment = "http://happyhours-app.fr/api/allEtablishment.php";
Alloy.Globals.urlHappy = "http://happyhours-app.fr/api/allHappyHours.php";

Alloy.Globals.getAllData = function() {

    var client1 = Ti.Network.createHTTPClient({
        // function called when the response data is available
        onload: function(e) {

            var responseText = JSON.parse(this.responseText);

            // TEST
            responseText = '[{"id":1,"name":"Tonton","description":"Bar de nuit pris\u00e9 des \u00e9tudiants, au d\u00e9cor festif et bon enfant. \u00c9v\u00e9nements, p\u00e9tanques et soir\u00e9es \u00e0 th\u00e8mes.","adress":"Place St Pierre","gps":"43.6038642,1.4351481,15","city":"Toulouse","happies":[{"id":4,"id_description":"happy_tonton","day":"1,2,3,4,5,6,7","text":"Un ricard achet\u00e9, un ricard offert !","hours":"19H00-22H00"},{"id":6,"id_description":"happy_tonton_exceptionnel","day":"2,3","text":"Tout gratuit","hours":"21H00-21H30"}]},{"id":2,"name":"The London Town","description":"Un pub traditionnel anglais, au milieu de l\u2019incessant va-et-vient de la ville. Une client\u00e8le jeune, des concerts et une ambiance g\u00e9niale font que c\u2019est l\u2019un des pubs les plus fr\u00e9quent\u00e9s de Toulouse.","adress":"14 rue de Pretres 31000 Toulouse","gps":"43.5975499,1.4416755","city":"Toulouse","happies":[{"id":5,"id_description":"happy_london","day":"1,2,3","text":"Peitite happy","hours":"19H00-22H00"}]}]';

            responseText = JSON.parse(responseText);

            var d = new Date();
            day = d.getDay() === 0 ? 7 : d.getDay(); //day

            for (var i = 0; i < responseText.length; i++) {
                var etablishment = responseText[i];

                var now = "";

                for (var j = 0; j < etablishment.happies.length; j++) {

                    var happy = etablishment.happies[j];

                    day = day.toString();

                    if (happy.day.indexOf(day) >= 0) {

                        //get heure début et heure fin
                        var hourBegin = getHourBegin(happy.hours);
                        var hourEnd = getHourEnd(happy.hours);

                        //get minute début et heure fin
                        var minBegin = getMinBegin(happy.hours);
                        var minEnd = getMinEnd(happy.hours);

                        now = whenAreHappy(hourBegin, hourEnd, minBegin, minEnd, now);

                    }

                    var happyhour = Alloy.createModel('happyhour', {
                        id              : happy.id,
                        id_etablishment : etablishment.id,
                        day             : happy.day,
                        text            : happy.text,
                        hours           : happy.hours

                    });
                    happyhour.save();
                }

                var havehappy = 'false';

                if (now != "")
                    havehappy = 'true';

                etablishment = Alloy.createModel('etablishment', {
                    id          : etablishment.id,
                    name        : etablishment.name,
                    adress      : etablishment.adress,
                    gps         : etablishment.gps,
                    yelp_id     : etablishment.yelp_id,
                    city        : etablishment.city,
                    description : etablishment.description,
                    haveHappy   : havehappy,
                    now         : now
                });

                etablishment.save();
            }

            Alloy.Collections.etablishment.fetch();

            Alloy.Globals.endDownload = true;

        },
        // function called when an error occurs, including a timeout
        onerror: function(e) {
            Ti.API.debug(e.error);
            Alloy.Globals.endDownload = true;
        },
        timeout: 5000 // in milliseconds

        Alloy.Globals.endDownload = true;

    });

    // Prepare the connection.
    client1.open("GET", Alloy.Globals.urlEtablishment);
    // Send the request.
    client1.send();
}

function getHourBegin(hour) {
    hour = hour.substring(0, 2);
    hour = hour.replace("H", "");
    hour = parseInt(hour);

    if (hour < 6) {
        hour = hour + 24;
    }

    return hour;
}

function getHourEnd(hour) {
    hour = hour.substring(6, 8);
    hour = hour.replace("H", "");
    hour = parseInt(hour);

    if (hour < 6) {
        hour = hour + 24;
    }

    return hour;
}

function getMinBegin(hour) {
    hour = hour.substring(2, 4);
    hour = hour.replace("H", "");
    hour = parseInt(hour);

    return hour;
}

function getMinEnd(hour) {
    hour = hour.substring(9, 10);
    hour = hour.replace("H", "");
    hour = parseInt(hour);

    return hour;
}

function whenAreHappy(hourBegin, hourEnd, minBegin, minEnd, lastNow) {
    var now = "Passer";

    var d = new Date();
    var h = d.getHours();
    var m = d.getMinutes();

    if (h < 6) {
        h = h + 24;
    }

    if (((hourBegin == h && minBegin <= m) || (hourBegin < h)) && ((hourEnd > h) || (hourEnd == h && minEnd >= m))) {

        now = "En ce moment";

    } else if ((
            (hourBegin == h && (minBegin - m) <= 30 && (minBegin - m) > 0)) || (hourBegin == (h + 1) && (((m - minBegin) < 60) && ((m - minBegin) >= 30)))) {

        if (lastNow != "En ce moment")
            now = "Dans 30 min";

    } else if (hourBegin == (h + 1) && (((m - minBegin) >= 0) && ((m - minBegin) <= 30))) {

        if (lastNow != "En ce moment" && lastNow != "Dans 30 min")
            now = "Dans 1h";

    } else if (hourBegin > (h + 1)) {
        if (lastNow != "En ce moment" && lastNow != "Dans 30 min" && lastNow != "Dans 1h")
            now = "Dans la soirée";

    }

    return now;
}

/**
 * Check connection
 *
 * @return boolean
 */
Alloy.Globals.hasConnection = function hasConnection() {
    if (Ti.Network.networkType === Ti.Network.NETWORK_NONE) return false;

    return true;
};



/**
*
* Personal Paging control
*
*/
Alloy.Globals.PagingControl = function(scrollableView){


	// Keep a global reference of the available pages
	var numberOfPages = scrollableView.getViews().length;

    var container = Titanium.UI.createView({
		height    : 30,
		top       : "80%",
        width     : 15 * numberOfPages + 8 * numberOfPages - 15
	});

	var pages = []; // without this, the current page won't work on future references of the module

	// Go through each of the current pages available in the scrollableView
	for (var i = 0; i < numberOfPages; i++) {
		var page = Titanium.UI.createView({
			borderRadius: 4,
			width: 8,
			height: 8,
			left: 15 * i,
			backgroundColor: pageColor,
			opacity: 0.5,
		});
		// Store a reference to this view
		pages.push(page);
		// Add it to the container
		container.add(page);
	}

	// Mark the initial selected page
	pages[scrollableView.getCurrentPage()].setOpacity(1);

	// Callbacks
	onScroll = function(event){
		// Go through each and reset it's opacity
		for (var i = 0; i < numberOfPages; i++) {

            if(pages[i] != pages[event.currentPage])
		          pages[i].setOpacity(0.5);


		}

        pages[event.currentPage].setOpacity(1);


	};

	// Attach the scroll event to this scrollableView, so we know when to update things
	scrollableView.addEventListener("scroll", onScroll);

	return container;
};
