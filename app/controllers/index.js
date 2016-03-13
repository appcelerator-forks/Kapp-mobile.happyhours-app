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

chargement.add(activityIndicator);
$.tabgroup.add(chargement);

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

            getAllData();
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

    //sleep(3000);

    setTimeout(function(){ 

        Ti.API.info("End download/end pub ");

        Alloy.Globals.endDownload = false;

        activityIndicator.hide();
        chargement.close();
       
        openTab();

        Alloy.Globals.firstOpening = false;

    }, 3000);
 

}else {

    sleep(1000);
    activityIndicator.hide();
    chargement.close();
    
    openTab();
   
}

function openTab(){

    /////////////////////////////////////////////////////////
    ///////////////FETCH DATA///////////////////////////////
    ///////////////////////////////////////////////////////
    Alloy.Collections.etablishment.fetch();

    $.tabgroup.open(); 

    //We create our TabBar (see alloy.js for more informations about our TabBar)
    new Alloy.Globals.CustomTabBar({
        tabBar: $.tabgroup,
        imagePath: '/tabbar/',
        width: 80,
        height: 49,
        items: [
            { image: 'moment.png', selected: 'moment_select.png' },
            { image: 'search.png', selected: 'search_select.png' },
            { image: 'map.png', selected: 'map_select.png' },
            { image: 'info.png', selected: 'info_select.png' }
        ]

        // TODO : Change images !
    });
}


function sleep(miliseconds) {
   var currentTime = new Date().getTime();

   while (currentTime + miliseconds >= new Date().getTime()) {
   }
}




