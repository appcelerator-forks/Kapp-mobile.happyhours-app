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

etablishment.deleteAll();// for tests

if (!etablishment.count()) {
    if (Alloy.Globals.hasConnection()) {

        getAllEtablishment();

    } else {
        Ti.API.info("INFO : sorry, we have no connection with the network :(");
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

            for (var i = 0; i < json.etablishment.length; i++) {

                var data    = json.etablishment[i];

                var etablishment = Alloy.createModel('etablishment', {
                    id          : data.ID, 
                    name        : data.name,
                    adress      : data.adress,
                    gps         : data.gps,
                    yelp_id     : data. yelp_id,
                    city        : data.city

                }); 
                etablishment.save();
            }

            Alloy.Collections.etablishment.fetch();

        },

        onerror: function(e) {

        }
    });

    xhr.open("GET", apiUrl);
    xhr.send();
}