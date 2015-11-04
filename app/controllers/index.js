$.tabgroup.open();

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
});

Alloy.Collections.etablishment.fetch();
Alloy.Collections.happyhour.fetch();

var reste = require("reste");
var api = new reste();

api.config({
    debug: true, // allows logging to console of ::REST:: messages
    autoValidateParams: false, // set to true to throw errors if <param> url properties are not passed
    timeout: 4000,
    url: "http://happyhours-app.fr/api/",
    requestHeaders: {
        "X-Parse-Application-Id": "APPID",
        "X-Parse-REST-API-Key": "RESTID",
        "Content-Type": "application/json; charset=UTF-8"
    },
    methods: [{
        name: "getEtablishments",
        post: "allEtablishment.php",
        onError: function(e, callback){
            alert("There was an error getting the courses!");
        }
    },{
    	name: "getHappyHours",
        post: "allHappyHours.php",
        onError: function(e, callback){
            alert("There was an error getting the courses!");
        }
    }],
    onError: function(e) {
        alert("There was an error accessing the API");
    },
    onLoad: function(e, callback) {
        callback(e);
    }
});

var happyhour = Alloy.createCollection('happyhour');
var etablishment = Alloy.createCollection('etablishment');


if(Alloy.Globals.hasConnection  && happyhour.count() == 0 && etablishment.count() == 0){


    api.getEtablishments(function(json){
    
        Ti.API.info("on récupère les établissement");
        var d   = new Date();
        var day = d.getDay() == 0 ? 7 : d.getDay();//day
       
        var havehappy;
        var data;
        var etablishment;
        
        var now = "not now";
                
         for (var i = 0; i < json.etablishment.length; i++) {
            data = json.etablishment[i];
            
             havehappy = "false";

            if (data.dayHappy.indexOf(day) >= 0) //Happy is today?
                havehappy = "true";

            etablishment = Alloy.createModel('etablishment', {
                id          : data.id, 
                name        : data.name,
                adress      : data.adress,
                gps         : data.gps,
                yelp_id     : data. yelp_id,
                city        : data.city,
                haveHappy   : havehappy,
                now         : now
            }); 

            etablishment.save();
         }
    });

    api.getHappyHours(function(json){
        
        Ti.API.info("on récupère les Happys");
        
        for (var i = 0; i < json.happyhour.length; i++) {
        
            var data    = json.happyhour[i];

            var happyhour = Alloy.createModel('happyhour', {
                id              : data.id, 
                id_etablishment : data.id_etablishment,
                day             : data.day,
                text            : data.text,
                hours           : data. hours

            }); 
            happyhour.save();
        }
    });
}