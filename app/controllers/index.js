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

if (Alloy.Globals.hasConnection()) {
    etablishment.deleteAll();
    getAllDatas();

    Ti.API.info("INFO data : ");
    Ti.API.info(Alloy.Globals.dataEtablishment);
    Ti.API.info("INFO json : ");
    Ti.API.info(Alloy.Globals.json);
} else {
    Ti.API.info("INFO : sorry,we have no connection with the network");
}

function getAllDatas() {
    var apiUrl = 'http://happyhours-app.fr/api/allEtablishment.php';

    var json;
    var xhr = Ti.Network.createHTTPClient({
        
        onload: function(e) {

            json = JSON.parse(this.responseText);

            Alloy.Globals.json = apiUrl;

            for (var i = 0; i < json.etablishment.length; i++) {

                var data    = json.etablishment[i];

                Alloy.Globals.dataEtablishment[data.ID] = data;

                var etablishment = Alloy.createModel('etablishment', {
                    id          : data.ID, 
                    name       : data.name
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