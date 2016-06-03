var happyhour = Alloy.createCollection('happyhour');
var etablishment = Alloy.createCollection('etablishment');
var i = 0;

var activityIndicator = Ti.UI.createActivityIndicator({
    color       : 'gray',
    message     : 'Chargement...',
    style       : Ti.UI.ActivityIndicatorStyle.DARK,
    top         : '45%',
    textAlign   : Ti.UI.TEXT_ALIGNMENT_CENTER,
    height      :Ti.UI.SIZE,
    width       :Ti.UI.SIZE
});

var chargement = Ti.UI.createWindow({
    backgroundColor: 'white',
    fullscreen: true
});

chargement.add(activityIndicator);

chargement.open();
activityIndicator.show();

/*for test */
//////////////////////////////////////

if(Titanium.Network.online) {
    Ti.API.info('online : ' + Titanium.Network.online);
    Ti.API.info('has connection');
    happyhour.deleteAll();
    etablishment.deleteAll();
} else {
    Ti.API.info("hasn't connection");
}

Ti.API.info('online : ' + Titanium.Network.online);



/////////////////////////////////////////////////////////
////////////////////Get DATA////////////////////////////
///////////////////////////////////////////////////////

// si pas établissement existants
if (!Alloy.Collections.etablishment.count()) {

    Ti.API.info('no etablishment');

    if (!Titanium.Network.online) {
        var dialog = Ti.UI.createAlertDialog({
            message: 'Afin de voir les Happy hours Toulousains, veuillez vous connecter à internet au moins une fois.',
            ok: 'Je comprends',
            title: 'Attention'
        });
        dialog.show();

        Alloy.Globals.endDownload = true;

        Alloy.Collections.etablishment.fetch();

        Alloy.Collections.etablishment.sort();

        activityIndicator.hide();
        chargement.close();

        $.tabgroup.open();

    }else{



        Alloy.Globals.getAllData();

        setTimeout(download, 1000);
    }

}else {

    Ti.API.info('etablishment');

    if (!Titanium.Network.online) {

        Alloy.Globals.endDownload = true;

        updateNow();

        Alloy.Collections.etablishment.fetch();

        Alloy.Collections.etablishment.sort();

        activityIndicator.hide();
        chargement.close();

        $.tabgroup.open();

    }else {

        Alloy.Globals.endDownload = true;

        Alloy.Collections.etablishment.fetch();

        Alloy.Collections.etablishment.sort();

        activityIndicator.hide();
        chargement.close();

        $.tabgroup.open();

        // TODO : Update data after 24h
    }
}


function download() {

    Ti.API.info('download');

    if (!Titanium.Network.online) {
        activityIndicator.hide();
        chargement.close();

        $.tabgroup.open();

        return;
    }
    if(Alloy.Globals.endDownload || i > 5000) {

        activityIndicator.hide();
        chargement.close();

        $.tabgroup.open();

        return;
    }

    i += 1000;

    setTimeout(download, 1000);



}


function updateNow() {

}
