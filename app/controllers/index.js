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
if(Alloy.Globals.hasConnection) {
    Ti.API.info('has connection');
    happyhour.deleteAll();
    etablishment.deleteAll();
}



/////////////////////////////////////////////////////////
////////////////////Get DATA////////////////////////////
///////////////////////////////////////////////////////


// si pas d'happyhour et d'établissement existants
if (!happyhour.count() && !etablishment.count()) {

    if (!Alloy.Globals.hasConnection()) {
        var dialog = Ti.UI.createAlertDialog({
            message: 'Afin de voir les Happy hours Toulousains, veuillez vous connecter à internet au moins une fois.',
            ok: 'Je comprends',
            title: 'Attention'
        });
        dialog.show();

        Alloy.Globals.endDownload = true;

        Alloy.Collections.etablishment.fetch();

        Alloy.Collections.etablishment.sort();

    }else{

        Alloy.Globals.getAllData();

        setTimeout(download, 1000);
    }

}else {
    if (!Alloy.Globals.hasConnection()) {

        Alloy.Globals.endDownload = true;

        Alloy.Collections.etablishment.fetch();

        Alloy.Collections.etablishment.sort();

    }else {

        Alloy.Globals.endDownload = true;

        Alloy.Collections.etablishment.fetch();

        Alloy.Collections.etablishment.sort();
        // TODO : Update data after 24h
    }
}


function download() {

    if (!Alloy.Globals.hasConnection) {
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
