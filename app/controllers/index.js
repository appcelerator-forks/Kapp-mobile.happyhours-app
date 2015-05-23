$.tabgroup.open();

new Alloy.Globals.CustomTabBar({
    tabBar: $.tabgroup,
    imagePath: '/tabbar/',
    width: 80,
    height: 40,
    items: [
        { image: 'moment.png', selected: 'moment_select.png' },
        { image: 'search.png', selected: 'search_select.png' },
        { image: 'map.png', selected: 'map_select.png' },
        { image: 'info.png', selected: 'info_select.png' }
    ]
});

var etablishment = Alloy.createCollection('etablishment');
var happyhour = Alloy.createCollection('happyhour');

etablishment.deleteAll();// for tests
happyhour.deleteAll();// for tests

if (!etablishment.count()) {
    if (Alloy.Globals.hasConnection()) {

       getAllEtablishment();
       getAllHappyHours();

    } else {
        alert("INFO : sorry, we have no connection with the network ");
    }
}

/**
 * get all Etablishment from http://happyhours-app.fr/api/allEtablishment.php
 *
 * @return void
 */
function getAllEtablishment() {
    var apiUrl = 'http://happyhours-app.fr/api/allEtablishment.php';

    var json;
    var xhr = Ti.Network.createHTTPClient({
        
        onload: function(e) {

            json = JSON.parse(this.responseText);

            var d   = new Date();
            var day = d.getDay() == 0 ? 7 : d.getDay();
           
            var havehappy;
            var data;
            var etablishment;

            for (var i = 0; i < json.etablishment.length; i++) {

                data = json.etablishment[i];
                
                havehappy = false;

                if (data.dayHappy.indexOf(day) > 0) 
                    havehappy = "true";

                etablishment = Alloy.createModel('etablishment', {
                    id          : data.ID, 
                    name        : data.name,
                    adress      : data.adress,
                    gps         : data.gps,
                    yelp_id     : data. yelp_id,
                    city        : data.city,
                    haveHappy   : havehappy
                }); 

                etablishment.save();

                Alloy.Collections.etablishment.fetch();
            }

        },

        onerror: function(e) {

        }
    });

    xhr.open("GET", apiUrl);
    xhr.send();
}

function getAllHappyHours() {
    var apiUrl = 'http://happyhours-app.fr/api/allHappyHours.php';

    var json;
    var xhr = Ti.Network.createHTTPClient({
        
        onload: function(e) {

            json = JSON.parse(this.responseText);

            for (var i = 0; i < json.happyhour.length; i++) {

                var data    = json.happyhour[i];

                var happyhour = Alloy.createModel('happyhour', {
                    id              : data.ID, 
                    id_etablishment : data.id_etablishment,
                    day             : data.day,
                    text            : data.text,
                    hours           : data. hours

                }); 
                happyhour.save();
            }

        },

        onerror: function(e) {

        }
    });

    xhr.open("GET", apiUrl);
    xhr.send();
}