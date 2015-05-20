$.tabgroup.open();

var ctb = new Alloy.Globals.CustomTabBar({
    tabBar: $.tabgroup,
    imagePath: 'iphone/images/',
    width: 80,
    height: 40,
    items: [
        { image: 'home.png', selected: 'home_over.png' },
        { image: 'cloud.png', selected: 'cloud_over.png' },
        { image: 'home.png', selected: 'home_over.png' },
        { image: 'cloud.png', selected: 'cloud_over.png' }
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