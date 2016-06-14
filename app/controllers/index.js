var happyhour = Alloy.createCollection('happyhour');
var etablishment = Alloy.createCollection('etablishment');
var version = Alloy.createCollection('version');
var i = 0;
var j = 0;

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
   // happyhour.deleteAll();
   // etablishment.deleteAll();
}
//////////////////////////////////////


/////////////////////////////////////////////////////////
////////////////////Get DATA////////////////////////////
///////////////////////////////////////////////////////

// no etablishment
if (!Alloy.Collections.etablishment.count() || !version.count()) {

    //Not online :(
    if (!Titanium.Network.online) {
        var dialog = Ti.UI.createAlertDialog({
            message: 'Afin de voir les Happy hours Toulousains, veuillez vous connecter à internet au moins une première fois.',
            ok: 'Ok',
            title: 'Attention'
        });
        dialog.show();

        //stop unused download
        Alloy.Globals.endDownload = true;

        openTabGroup();

    //he's online !!!!
    }else{

        Alloy.Globals.endDownload = false;
        Alloy.Globals.getFirstVersion();
        //go get all data dude
        Alloy.Globals.getAllData();

        //check download activity
        setTimeout(download, 1000);
    }

//have already data
}else {

    //but he's not online :(
    if (!Titanium.Network.online) {

        Alloy.Globals.endDownload = false;
        Alloy.Globals.updateNow();

        setTimeout(download, 1000);


    //he is online !
    }else {

        Alloy.Globals.endDownload = false;
        Alloy.Globals.checkVersion();


        setTimeout(download, 1000);

    }
}

function openTabGroup () {

    //close download indicator
    activityIndicator.hide();
    chargement.close();

    $.tabgroup.open();
}



function download() {

    //he is not online during download :/
    if (!Titanium.Network.online) {

        Alloy.Globals.fetchEtablishment();
        openTabGroup();

        i = 0;

        return;
    }

    //if donwload is ended or timeout
    if(Alloy.Globals.endDownload || i > 5000) {

        Alloy.Globals.fetchEtablishment();
        openTabGroup();

        i = 0;

        return;
    }

    i += 1000;

    setTimeout(download, 1000);
}
