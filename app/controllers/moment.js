$.moment.setTitleControl(Ti.UI.createLabel({
    color: "#ffffff",
    font: {
        fontFamily: 'TitilliumWeb-Regular',
        fontSize: 20
    },
    text: "En ce moment"
}));

var j = 0;





//Filter
function haveHappyFilter(collection) {

    return collection.where({
        haveHappy: 'true'
    });
}


function myRefresher(e) {

    if (!Titanium.Network.online) {

		Alloy.Globals.endDownload = true;

        setTimeout(downloadWithoutOpen, 1000);



    } else {
        //////////////////////////////////////

        Alloy.Globals.endDownload = false;

        Ti.App.fireEvent("refresh");

        Alloy.Globals.checkVersion();
        setTimeout(downloadWithoutOpen, 1000);

    }

    e.hide();
}

function downloadWithoutOpen() {


        //he is not online during download :/
        if (!Titanium.Network.online) {

            Alloy.Globals.fetchEtablishment();

            j = 0;

            return;
        }

        //if donwload is ended or timeout
        if(Alloy.Globals.endDownload || j > 5000) {

            Alloy.Globals.fetchEtablishment();

            j = 0;

            return;
        }

        j += 1000;

        setTimeout(downloadWithoutOpen, 1000);
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
