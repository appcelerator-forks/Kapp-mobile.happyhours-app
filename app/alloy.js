Alloy.Globals.firstOpening = true;
var pageColor = "#E2967A";
Alloy.Globals.endDownload = false;

Alloy.Globals.urlApi = "http://e04d78d1.ngrok.io";
Alloy.Globals.urlEtablishment = Alloy.Globals.urlApi + "/web/api/etablishment";
Alloy.Globals.urlVersion = Alloy.Globals.urlApi + "/web/api/version";


Alloy.Globals.updateNow = function () {

    Ti.API.info('okey : update Now');

    Alloy.Collections.etablishment.fetch();
    Alloy.Collections.happyhour.fetch();

    var lengthEtablishmentCollection    = Alloy.Collections.etablishment.models.length;
    var lengthHappyCollection           = Alloy.Collections.happyhour.models.length;

    var oneEtablishment;
    var oneHappy;

    var etablishmentNow;
    var newNow;

    var haveHappyEtablishment = 'true';

    Ti.API.info('log : etablishment length : ' + lengthEtablishmentCollection);
    // for all etablishment
    for (var i = 0; i < lengthEtablishmentCollection; i++) {

         oneEtablishment = Alloy.Collections.etablishment.models[i];

         etablishmentNow = "";

         Ti.API.info("log : etablishment name : " + oneEtablishment.get("name"));

         Ti.API.info("log : happy lengt : " + lengthHappyCollection);

         //for all happy
         for (var j = 0; j < lengthHappyCollection; j++) {

             newNow = "";

             oneHappy = Alloy.Collections.happyhour.models[j];

             // which are related to current etablishmnet
             if ( oneHappy.get('id_etablishment') == oneEtablishment.get("id") ) {

                 Ti.API.info('log : update now of etabishement ' + oneEtablishment.get("name") );

                 var hourBegin = getHourBegin(oneHappy.get('hours'));
                 var hourEnd = getHourEnd(oneHappy.get('hours'));

                 //get minute début et heure fin
                 var minBegin = getMinBegin(oneHappy.get('hours'));
                 var minEnd = getMinEnd(oneHappy.get('hours'));

                 newNow = whenAreHappy(hourBegin, hourEnd, minBegin, minEnd, etablishmentNow);

                 if (        (newNow == "En ce moment")
                         ||  (etablishmentNow != "En ce moment" && newNow == "Dans 30 min")
                         ||  (etablishmentNow != "En ce moment" && etablishmentNow != "Dans 30 min" && newNow == "Dans 1h")
                         ||  (etablishmentNow == "" )
                         ||  (etablishmentNow != "En ce moment" && etablishmentNow != "Dans 30 min" && etablishmentNow != "Dans 1h" && newNow != "Passé")
                     ) {
                        etablishmentNow = newNow;
                     }


             }// end if happy is related to current etablishment

         }// end for happies

         if(etablishmentNow == "" || etablishmentNow == "Passé") {
             haveHappyEtablishment = 'false';
         }

         Ti.API.info('before');
         Ti.API.info(oneEtablishment);

         Ti.API.info('');

         oneEtablishment.set({
             now        : etablishmentNow,
             haveHappy  : haveHappyEtablishment,
         });

         oneEtablishment.save();

         Ti.API.info('after');
         Ti.API.info(oneEtablishment);

         Ti.API.info('');

    }// end for all etablishment

    Alloy.Globals.fetchEtablishment();
    Alloy.Globals.endDownload = true;

    Ti.API.info('');
}

Alloy.Globals.fetchEtablishment = function () {

    Ti.API.info('fetchEtablishment');

    //fetch and sort etablishment
    Alloy.Collections.etablishment.fetch();
    Alloy.Collections.etablishment.sort();

    Ti.API.info('fetchHappy');

    Alloy.Collections.happyhour.fetch();

}

// get last api change version
Alloy.Globals.getFirstVersion = function () {

    Ti.API.info('get First Version');

    var client2 = Ti.Network.createHTTPClient({
        onload: function(e) {
            var version = JSON.parse(this.responseText);

            var version_bd = Alloy.createModel('version', {
                id      : version.id,
                version : version.version
            });

            version_bd.save();

        },
        onerror: function(e) {
            Ti.API.debug(e.error);
        },
        timeout: 5000 // in milliseconds
    });

    // Prepare the connection.
    client2.open("GET", Alloy.Globals.urlVersion);
    // Send the request.
    client2.send();


};

Alloy.Globals.checkVersion = function () {

    Ti.API.info('good   : we check last version');

    var client2 = Ti.Network.createHTTPClient({

        onload: function(e) {
            var version = JSON.parse(this.responseText);

            var versionColelction = Alloy.createCollection('version');
            versionColelction.fetch();

            Ti.API.info("log    : my num version    : " + version.num);
            Ti.API.info("log    :server version     : " + versionColelction.models[versionColelction.models.length - 1].get("version"));

            if(versionColelction.models[versionColelction.models.length - 1].get("version") != version.num) {

                var version_bd = Alloy.createModel('version', {
                    id      : version.id,
                    version : version.num
                });

                version_bd.save();

                Ti.API.info('log : save new version');

                var happyhour = Alloy.createCollection('happyhour');
                var etablishment = Alloy.createCollection('etablishment');

                happyhour.deleteAll();
                etablishment.deleteAll();
                Ti.API.info('log : delete all datas');

                Alloy.Globals.getAllData();

            } else {

                Alloy.Globals.updateNow();

            }


        },

        onerror: function(e) {
            Ti.API.debug(e.error);
            Alloy.Globals.endDownload = true;
        },
        timeout: 5000 // in milliseconds
    });

    // Prepare the connection.
    client2.open("GET", Alloy.Globals.urlVersion);
    // Send the request.
    client2.send();

};


// get all data from api
Alloy.Globals.getAllData = function() {

    Ti.API.info('get all datas');

    var client1 = Ti.Network.createHTTPClient({
        // function called when the response data is available
        onload: function(e) {

            var responseText = JSON.parse(this.responseText);

            var d = new Date();
            day = d.getDay() === 0 ? 7 : d.getDay(); //day

            var now = "";
            var newNow = "";

            for (var i = 0; i < responseText.length; i++) {

                var etablishment = responseText[i];

                now = "";

                for (var j = 0; j < etablishment.happies.length; j++) {

                    newNow = "";

                    var happy = etablishment.happies[j];

                    day = day.toString();


                    if (happy.day.indexOf(day) >= 0) {

                        //get heure début et heure fin
                        var hourBegin = getHourBegin(happy.hours);
                        var hourEnd = getHourEnd(happy.hours);

                        //get minute début et heure fin
                        var minBegin = getMinBegin(happy.hours);
                        var minEnd = getMinEnd(happy.hours);

                        newNow = whenAreHappy(hourBegin, hourEnd, minBegin, minEnd, now);


                        if (        (newNow == "En ce moment")
                                ||  (now != "En ce moment" && newNow == "Dans 30 min")
                                ||  (now != "En ce moment" && now != "Dans 30 min" && newNow == "Dans 1h")
                                ||  (now == "" )
                                ||  (now != "En ce moment" && now != "Dans 30 min" && now != "Dans 1h" && newNow != "Passé")
                            )
                            now = newNow;
                    }



                    var happyhour_bd = Alloy.createModel('happyhour', {
                        id: happy.id,
                        id_etablishment: etablishment.id,
                        day: happy.day,
                        text: happy.text,
                        hours: happy.hours

                    });


                    happyhour_bd.save();

                }

                var havehappy = 'false';

                if (now != "" && now != "Passé")
                    havehappy = 'true';

                etablishment_bd = Alloy.createModel('etablishment', {
                    id: etablishment.id,
                    name: etablishment.name,
                    adress: etablishment.adress,
                    gps: etablishment.gps,
                    yelp_id: etablishment.yelp_id,
                    city: etablishment.city,
                    description_2: etablishment.description,
                    haveHappy: havehappy,
                    now: now,
                    image: etablishment.image,
                });

                etablishment_bd.save();

            }

            Alloy.Globals.endDownload = true;

            Alloy.Globals.fetchEtablishment();
            Alloy.Collections.happyhour.fetch();

        },
        // function called when an error occurs, including a timeout
        onerror: function(e) {
            Ti.API.debug(e.error);

            Alloy.Globals.endDownload = true;

            Alloy.Globals.fetchEtablishment();
            Alloy.Collections.happyhour.fetch();
        },
        timeout: 5000 // in milliseconds

    });

    // Prepare the connection.
    client1.open("GET", Alloy.Globals.urlEtablishment);
    // Send the request.
    client1.send();
};

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

function getMinBegin(min) {

    min = min.substring(3, 5);
    min = min.replace("H", "");
    min = parseInt(min);

    return min;
}

function getMinEnd(min) {

    min = min.substring(9, 11);
    min = min.replace("H", "");
    min = parseInt(min);

    return min;
}

function whenAreHappy(hourBegin, hourEnd, minBegin, minEnd, lastNow) {
    var now = "Passé";

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


        now = "Dans 30 min";

    } else if ((hourBegin == (h + 1) && (((m - minBegin) >= 0) && ((m - minBegin) <= 30))) || (hourBegin == h && (minBegin - m) > 30)) {


        now = "Dans 1h";

    } else if (hourBegin >= (h + 1)) {


        minString = minBegin.toString();

        if (minString.length == 1) {
            minString = "0" + minString;
        }

        hourString = hourBegin.toString();

        if (hourString.length == 1) {
            hourString = "0" + hourString;
        }

        now = hourString + "H" + minString;

    }

    return now;
}

/**
 * Check connection
 *
 * @return boolean
 */
Alloy.Globals.hasConnection = function hasConnection() {
    return Titanium.Network.online;
};


/**
 *
 * Personal Paging control
 *
 */
Alloy.Globals.PagingControl = function(scrollableView) {


    // Keep a global reference of the available pages
    var numberOfPages = scrollableView.getViews().length;

    var container = Titanium.UI.createView({
        height: 30,
        top: "80%",
        width: 15 * numberOfPages + 8 * numberOfPages - 15
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
    if (pages[0]) {
        pages[0].setOpacity(1);
    }


    // Callbacks
    onScroll = function(event) {
        // Go through each and reset it's opacity
        for (var i = 0; i < numberOfPages; i++) {

            if (pages[i] != pages[event.currentPage])
                pages[i].setOpacity(0.5);


        }

        pages[event.currentPage].setOpacity(1);


    };

    // Attach the scroll event to this scrollableView, so we know when to update things
    scrollableView.addEventListener("scroll", onScroll);

    return container;
};
