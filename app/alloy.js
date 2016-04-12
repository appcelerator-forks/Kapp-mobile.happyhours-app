Alloy.Globals.json;
Alloy.Globals.dataEtablishment  =  {};
Alloy.Globals.firstOpening  =   true;
Alloy.Globals.endDownload =   false;

//we use RESTe to take data from API
/////////////////////////////////////////////////////////
/////////////Reste initilization////////////////////////
///////////////////////////////////////////////////////
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
        "Content-Type": "application/json"
    },
    methods: [{
        name: "getEtablishments",
        post: "allEtablishment.php",
        onError: function(e, callback){
            //alert("There was an error getting the courses!");
        }
    },{
    	name: "getHappyHours",
        post: "allHappyHours.php",
        onError: function(e, callback){
            //alert("There was an error getting the courses!");
        }
    }],
    onError: function(e) {
        alert("Une erreur c'est produite lors de la récupération des données. Veuillez réessayer ultérieurement");
    },
    onLoad: function(e, callback) {
       callback(e);
    }
});

/**
 * Récupération de tout les établissements depuis la bdd
 */
Alloy.Globals.getAllData = function()
{
    api.getEtablishments(function(json){

        Ti.API.info("Get All Etablishment");
        var d   = new Date();
        var day = d.getDay() === 0 ? 7 : d.getDay();//day

        var havehappy;
        var data;
        var etablishment;

        //we use now in moment.js to display moment's information of the happy hours
        var now = "";

         for (var i = 0; i < json.etablishment.length; i++) {
            data = json.etablishment[i];

             havehappy = "false";

            if (data.now !== "Passer") //Happy is today?
                havehappy = "true";

            Ti.API.info(havehappy);
            Ti.API.info(data.now);
            etablishment = Alloy.createModel('etablishment', {
                id          : data.id,
                name        : data.name,
                adress      : data.adress,
                gps         : data.gps,
                yelp_id     : data.yelp_id,
                city        : data.city,
                haveHappy   : havehappy,
                now         : data.now
            });

            etablishment.save();


        }

        Alloy.Collections.etablishment.fetch();
    });

    api.getHappyHours(function(json){

        Ti.API.info("Get AHappy");

        for (var i = 0; i < json.happyhour.length; i++) {
            Ti.API.info("happy");
            var data    = json.happyhour[i];

            var happyhour = Alloy.createModel('happyhour', {
                id              : data.id,
                id_etablishment : data.id_etablishment,
                day             : data.day,
                text            : data.text,
                hours           : data.hours

            });
            happyhour.save();
        }
    });

    Alloy.Globals.endDownload = true;
}

/**
 * Check connection
 *
 * @return boolean
 */
Alloy.Globals.hasConnection = function hasConnection()
{
    if (Ti.Network.networkType === Ti.Network.NETWORK_NONE) return false;

    return true;
};
