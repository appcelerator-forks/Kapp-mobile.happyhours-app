$.tabgroup.open();

new Alloy.Globals.CustomTabBar({
    tabBar: $.tabgroup,
    imagePath: '/tabbar/',
    width: 80,
    height: 40,
    items: [
        { image: 'one.png', selected: 'map.png' },
        { image: 'one.png', selected: 'map.png' },
        { image: 'map.png', selected: 'map_select.png' },
        { image: 'info.png', selected: 'info_select.png' }
    ]
});

getAllDatas();

function getAllDatas() {
    var apiUrl = 'http://happyhours-app.fr/api/allEtablishment.php';

    var json;
    var xhr = Ti.Network.createHTTPClient({
        
        onload: function(e) {

            json = JSON.parse(this.responseText);

            for (var i = 0; i < json.etablishment.length; i++) {

                var data = json.etablishment[i];
                Alloy.Globals.json = data;

                for (var j = 1; j <= 7; j++) {
                    //if have an offer at the day j
                    var etablishment = Alloy.createModel('etablishment', {
                        id          : data.ID, 
                        name        : data.name,
                    }); 
                    etablishment.save();
                };

            }

            etablishment.fetch();

        },

        onerror: function(e) {

        }
    });
    xhr.open("GET", apiUrl);
    xhr.send();
}