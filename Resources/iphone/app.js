function getAllData() {
    api.getEtablishments(function(json) {
        Ti.API.info("Get All Etablishment");
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
        Ti.API.info("Get All Happy");
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
    Alloy.Globals.endDownload = true;
}

var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

Alloy.Globals.json;

Alloy.Globals.dataEtablishment = {};

Alloy.Globals.firstOpening = true;

Alloy.Globals.endDownload = false;

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

var reste = require("reste");

var api = new reste();

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
            alert("There was an error getting the courses!");
        }
    }, {
        name: "getHappyHours",
        post: "allHappyHours.php",
        onError: function() {
            alert("There was an error getting the courses!");
        }
    } ],
    onError: function() {
        alert("There was an error accessing the API");
    },
    onLoad: function(e, callback) {
        callback(e);
    }
});

Alloy.Globals.hasConnection = function() {
    if (Ti.Network.networkType === Ti.Network.NETWORK_NONE) return false;
    return true;
};

Alloy.createController("index");