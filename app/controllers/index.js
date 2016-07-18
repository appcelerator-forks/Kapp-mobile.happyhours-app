var happyhour = Alloy.createCollection('happyhour');
var etablishment = Alloy.createCollection('etablishment');
var version = Alloy.createCollection('version');
var i = 0;
var j = 0;


var activityIndicator = Ti.UI.createActivityIndicator({
    color           : 'gray',
    message         : 'Chargement...',
    style           : Ti.UI.ActivityIndicatorStyle.DARK,
    top             : '45%',
    textAlign       : Ti.UI.TEXT_ALIGNMENT_CENTER,
    height          : Ti.UI.SIZE,
    width           : Ti.UI.SIZE,
    zIndex          : "42"

});

var chargement = Ti.UI.createWindow({
    fullscreen: true,
    backgroundColor : "white"
});

chargement.add(activityIndicator);

chargement.open();
activityIndicator.show();

if (Titanium.Network.online) {
    //get imagePub from API
	Ti.API.info('imagePub' + Alloy.Globals.imagePub );
	Ti.API.info( Alloy.Globals.imagePub == undefined  );
	
    if( Alloy.Globals.imagePub == undefined ) {

        Alloy.Globals.getImagePub();
        
      
        Ti.App.addEventListener("imagePub", function(data) {
        	
            
            Alloy.Globals.imagePub = data.image;
           
           var imagePubView = Ti.UI.createImageView({
           		image : data.image,
           		width: "100%",
           		height: "100%",
           });
           
           	chargement.setBackgroundImage(data.image);
           	chargement.add(imagePubView);

        });
    } else {
        var imagePubView = Ti.UI.createView({
            height  : "100%",
            width   : "100%",
            backgroundImage : Alloy.Globals.imagePub
        });
        
       

        chargement.add(imagePubView);
    }
    
    
} else {

}

/*for test */
//////////////////////////////////////
if(Titanium.Network.online) {
   // happyhour.deleteAll();
   // etablishment.deleteAll();
}
//////////////////////////////////////

setInterval(Alloy.Globals.updateNow, 300000);

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

    var button_close = Ti.UI.createButton({
        backgroundImage	: "icons/cross.png",
    	top				: "3%",
    	right 			: "3%",
    	width			: "120px",
    	height			: "120px",
    	zIndex			: 20
    });

    button_close.addEventListener('click', function () {
        //close download indicato
        chargement.close();

        $.tabgroup.open();

        Ti.App.fireEvent("openTab");
    });

    activityIndicator.hide();

    chargement.add(button_close);

}



function download() {

    sleep(3000);
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

function sleep(miliseconds) {
   var currentTime = new Date().getTime();

   while (currentTime + miliseconds >= new Date().getTime()) {
   }
}
