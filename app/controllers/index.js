var happyhour = Alloy.createCollection('happyhour');
var etablishment = Alloy.createCollection('etablishment');

var activityIndicator = Ti.UI.createActivityIndicator({
    color: 'gray',
    message: 'Chargement...',
    style: Ti.UI.ActivityIndicatorStyle.DARK,
    top: '45%',
    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
    height:Ti.UI.SIZE,
    width:Ti.UI.SIZE
});

var chargement = Ti.UI.createWindow({
    backgroundColor: 'white',
    fullscreen: true
});

// $.tabgroup.open();

chargement.add(activityIndicator);
//$.tabgroup.add(chargement);

chargement.open();
activityIndicator.show();

/*for test */
//////////////////////////////////////
happyhour.deleteAll();
etablishment.deleteAll();


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
    }else{

        Ti.API.info("Get All data");

        Alloy.Globals.getAllData();
    }

}else {
    if (!Alloy.Globals.hasConnection()) {
        var dialog = Ti.UI.createAlertDialog({
            message: 'Afin de voir les Happy hours Toulousains, veuillez vous connecter à internet au moins une fois.',
            ok: 'Je comprends',
            title: 'Attention'
        });
        dialog.show();
    }else {
        // TODO : Update data after 24h
    }
}


setTimeout(function(){
    if(Alloy.Globals.endDownload) {

        activityIndicator.hide();
        chargement.close();

        $.tabgroup.open();
    }


}, 1000);
