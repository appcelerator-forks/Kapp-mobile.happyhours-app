$.moment.setTitleControl(Ti.UI.createLabel({
    color: "#ffffff",
    font: {
        fontFamily: 'TitilliumWeb-Regular',
        fontSize: 20
    },
    text: "En ce moment"
}));


//Filter

function haveHappyFilter(collection) {

    return collection.where({
        haveHappy: 'true'
    });
}


function myRefresher(e) {

    if (!Titanium.Network.online) {

        Alloy.Collections.etablishment.fetch();

        Alloy.Collections.happyhour.fetch();

        Alloy.Collections.etablishment.sort();

    } else {
        //////////////////////////////////////
        var happyhour = Alloy.Collections.instance('happyhour');
        var etablishment = Alloy.Collections.instance('etablishment');
        happyhour.deleteAll();
        etablishment.deleteAll();

        Alloy.Globals.getAllData();

    }

    e.hide();
}

function doTransform(model) {



    var transform = model.toJSON();

    Ti.API.info('transform : ' + transform.name);

    happyhour = Alloy.Collections.happyhour.where({
        id_etablishment: transform.id
    });


    now = "";

    var length = Alloy.Collections.happyhour.models.length;

    for (var i = 0; i < length; i++) {

        newNow = "";

        var oneHappy = Alloy.Collections.happyhour.models[i];


        if (oneHappy.get('id_etablishment') == transform.id) {
            if (oneHappy.get('day').indexOf(day) >= 0) {

                //get heure début et heure fin
                var hourBegin = getHourBegin(oneHappy.get('hours'));
                var hourEnd = getHourEnd(oneHappy.get('hours'));

                //get minute début et heure fin
                var minBegin = getMinBegin(oneHappy.get('hours'));
                var minEnd = getMinEnd(oneHappy.get('hours'));

                newNow = whenAreHappy(hourBegin, hourEnd, minBegin, minEnd, now);

                if ((newNow == "En ce moment") || (now != "En ce moment" && newNow == "Dans 30 min") || (now != "En ce moment" && now != "Dans 30 min" && newNow == "Dans 1h") || now == "")
                    now = newNow;

                Ti.API.info('now : ' + now);
            }
        }



    }

    transform.now = now;

    return transform;

}

function goEtablishment() {


    var etablishmentView = Alloy.createController('etablishment', {
        'etablishmentId': this.idEtablishment,
        'etablishmentTitle': this.titleEtablishment
    }).getView();

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


        now = "Dans 30 min";

    } else if (hourBegin == (h + 1) && (((m - minBegin) >= 0) && ((m - minBegin) <= 30))) {


        now = "Dans 1h";

    } else if (hourBegin > (h + 1)) {
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
