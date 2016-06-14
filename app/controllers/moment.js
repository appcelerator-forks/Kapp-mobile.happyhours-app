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

        Ti.API.info('refresh not online');


        Alloy.Globals.endDownload = true;

        setTimeout(downloadWithoutOpen, 1000);



    } else {
        //////////////////////////////////////

        Ti.API.info('refresh online');

        Ti.API.info("nice   : we're online");
        Ti.API.info("log    : set endDownload to false");

        Alloy.Globals.endDownload = false;

        Alloy.Globals.checkVersion();
        setTimeout(downloadWithoutOpen, 1000);

    }

    e.hide();
}

function downloadWithoutOpen() {

        Ti.API.info('downloadWithoutOpen');

        //he is not online during download :/
        if (!Titanium.Network.online) {

            Alloy.Globals.fetchEtablishment();

            j = 0;

            return;
        }

        //if donwload is ended or timeout
        if(Alloy.Globals.endDownload || j > 5000) {

            Ti.API.info("log    : end downloadWithoutOpen, fetch data");

            Alloy.Globals.fetchEtablishment();

            j = 0;

            return;
        }

        j += 1000;

        setTimeout(downloadWithoutOpen, 1000);
}

// function doTransform(model) {
//
//     Ti.API.info('transform');
//
//     var d = new Date();
//     day = d.getDay() === 0 ? 7 : d.getDay(); //day
//
//     var nowTransform = "";
//
//     var length = Alloy.Collections.happyhour.models.length;
//
//     Ti.API.info('');
//
//     for (var i = 0; i < length; i++) {
//
//         newNow = "";
//
//         var oneHappy = Alloy.Collections.happyhour.models[i];
//
//         if (oneHappy.get('id_etablishment') == transform.id) {
//
//             var happyday = oneHappy.get('day').toString();
//
//             if ( happyday.indexOf(day) >= 0 ) {
//
//                 //get heure début et heure fin
                // var hourBegin = getHourBegin(oneHappy.get('hours'));
                // var hourEnd = getHourEnd(oneHappy.get('hours'));
                //
                // //get minute début et heure fin
                // var minBegin = getMinBegin(oneHappy.get('hours'));
                // var minEnd = getMinEnd(oneHappy.get('hours'));
                //
                // newNow = whenAreHappy(hourBegin, hourEnd, minBegin, minEnd, nowTransform);
                //
                // if (        (newNow == "En ce moment")
                //         ||  (nowTransform != "En ce moment" && newNow == "Dans 30 min")
                //         ||  (nowTransform != "En ce moment" && nowTransform != "Dans 30 min" && newNow == "Dans 1h")
                //         ||  (nowTransform == "" )
                //         ||  (nowTransform != "En ce moment" && nowTransform != "Dans 30 min" && nowTransform != "Dans 1h" && newNow != "Passé")
                //     )
                //     nowTransform = newNow;
//             }
//         }
//
//     }
//
//     if(nowTransform != "")
//         transform.now = nowTransform;
//
//     var haveHappyTransform;
//
//     if(nowTransform == "Passé") {
//         haveHappyTransform = 'false';
//     } else {
//         haveHappyTransform = 'true';
//     }
//
//     Ti.API.info(nowTransform);
//
//     model.set({
//         haveHappy   : haveHappyTransform,
//         now         : nowTransform,
//     }).save();
//
//     return transform;
//
// }

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
