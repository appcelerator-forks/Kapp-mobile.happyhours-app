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

$.tabgroup.open();

chargement.add(activityIndicator);
//$.tabgroup.add(chargement);

//loading
 Ti.API.info("Begin download / end pub ");
chargement.open();
activityIndicator.show();

/*for test */
//////////////////////////////////////
happyhour.deleteAll();
etablishment.deleteAll();


/////////////////////////////////////////////////////////
////////////////////Get DATA////////////////////////////
///////////////////////////////////////////////////////
if(Alloy.Globals.firstOpening){

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

        Ti.API.info("End download/end pub ");

        Alloy.Globals.endDownload = false;

        activityIndicator.hide();
        chargement.close();

        openTab();

        Alloy.Globals.firstOpening = false;

    }, 3000);


} else {

  setTimeout(function () {
    activityIndicator.hide();
    chargement.close();

    openTab();
  }, 1000);

}

/**
 * Fetch data & open tabs
 */
function openTab()
{
    Alloy.Collections.etablishment.fetch();

    $.tabgroup.open();
}
