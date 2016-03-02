function getAllData() {
    var happyhour = Alloy.createCollection("happyhour");
    var etablishment = Alloy.createCollection("etablishment");
    if (!happyhour.count() && !etablishment.count()) {
        api.getEtablishments(function(json) {
            Ti.API.info("on récupère les établissement ");
            var d = new Date();
            var day = 0 === d.getDay() ? 7 : d.getDay();
            var havehappy;
            var data;
            var etablishment;
            var now = "not now";
            for (var i = 0; i < json.etablishment.length; i++) {
                data = json.etablishment[i];
                havehappy = "false";
                data.dayHappy.indexOf(day) >= 0 && (havehappy = "true");
                etablishment = Alloy.createModel("etablishment", {
                    id: data.id,
                    name: data.name,
                    adress: data.adress,
                    gps: data.gps,
                    yelp_id: data.yelp_id,
                    city: data.city,
                    haveHappy: havehappy,
                    now: now
                });
                etablishment.save();
            }
        });
        api.getHappyHours(function(json) {
            Ti.API.info("on récupère les Happys");
            for (var i = 0; i < json.happyhour.length; i++) {
                var data = json.happyhour[i];
                var happyhour = Alloy.createModel("happyhour", {
                    id: data.id,
                    id_etablishment: data.id_etablishment,
                    day: data.day,
                    text: data.text,
                    hours: data.hours
                });
                happyhour.save();
            }
        });
        Ti.API.info(Alloy.Collections);
    }
}

var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

Alloy.Globals.json;

Alloy.Globals.dataEtablishment = {};

<<<<<<< HEAD
var reste = require("reste");

var api = new reste();

var dialogNoConnection = Ti.UI.createAlertDialog({
    message: "Afin de voir les Happy hours Toulousains, veuillez vous connecter à internet au moins une première fois.",
    ok: "Je comprends",
    title: "Attention"
});

api.config({
    debug: true,
    autoValidateParams: false,
    timeout: 4e3,
    url: "http://happyhours-app.fr/api/",
    requestHeaders: {
        "X-Parse-Application-Id": "APPID",
        "X-Parse-REST-API-Key": "RESTID",
        "Content-Type": "application/json"
    },
    methods: [ {
        name: "getEtablishments",
        post: "allEtablishment.php",
        onError: function() {
            dialogNoConnection.show();
            var etablishment = Alloy.createCollection("etablishment");
            etablishment = Alloy.createModel("etablishment", {
                id: 1,
                name: "TestBar",
                adress: "07 rue de la rocalve",
                gps: "",
                yelp_id: "",
                city: "Toulouse",
                haveHappy: "true",
                now: "not now"
            });
            etablishment.save();
        }
    }, {
        name: "getHappyHours",
        post: "allHappyHours.php",
        onError: function() {}
    } ],
    onError: function() {
        dialogNoConnection.show();
    },
    onLoad: function(e, callback) {
        callback(e);
    }
});
=======
Alloy.Globals.firstOpening = true;
>>>>>>> master

Alloy.Globals.CustomTabBar = function(settings) {
    var tabBarItems = [];
    var tabCurrent = 0;
    var resetTabs = function() {
        for (var i = 0; i < tabBarItems.length; i++) tabBarItems[i].image = settings.imagePath + settings.items[i].image;
    };
    var assignClick = function(tabItem) {
        tabItem.addEventListener("click", function(e) {
            var pos = e.source.pos;
            if (tabCurrent == pos) return false;
            settings.tabBar.tabs[pos].active = true;
            tabCurrent = pos;
            resetTabs();
            tabBarItems[pos].image = settings.imagePath + settings.items[pos].selected;
        });
    };
    var customTabBar = Ti.UI.createWindow({
        height: settings.height,
        bottom: 0
    });
    for (var i = 0; i < settings.items.length; i++) {
        tabBarItems[i] = Titanium.UI.createImageView({
            backgroundImage: settings.imagePath + settings.items[i].image,
            width: settings.width,
            height: settings.height,
            left: settings.width * i
        });
        tabBarItems[i].pos = i;
        assignClick(tabBarItems[i]);
        customTabBar.add(tabBarItems[i]);
    }
    customTabBar.open();
    resetTabs();
    tabBarItems[0].image = settings.imagePath + settings.items[0].selected;
    return {
        hide: function() {
            customTabBar.hide();
        },
        show: function() {
            customTabBar.show();
        }
    };
};

Alloy.Globals.hasConnection = function() {
    if (Ti.Network.networkType === Ti.Network.NETWORK_NONE) return false;
    return true;
};

Alloy.createController("index");