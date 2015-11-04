function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        {
            __processArg(arguments[0], "__parentSymbol");
        }
        {
            __processArg(arguments[0], "$model");
        }
        {
            __processArg(arguments[0], "__itemTemplate");
        }
    }
    var $ = this;
    var exports = {};
    var __alloyId11 = [];
    $.__views.__alloyId12 = Alloy.createController("moment", {
        id: "__alloyId12"
    });
    $.__views.tab1 = Ti.UI.createTab({
        window: $.__views.__alloyId12.getViewEx({
            recurse: true
        }),
        id: "tab1"
    });
    __alloyId11.push($.__views.tab1);
    $.__views.__alloyId14 = Alloy.createController("all", {
        id: "__alloyId14"
    });
    $.__views.tab2 = Ti.UI.createTab({
        window: $.__views.__alloyId14.getViewEx({
            recurse: true
        }),
        id: "tab2"
    });
    __alloyId11.push($.__views.tab2);
    $.__views.__alloyId16 = Alloy.createController("map", {
        id: "__alloyId16"
    });
    $.__views.tab3 = Ti.UI.createTab({
        window: $.__views.__alloyId16.getViewEx({
            recurse: true
        }),
        id: "tab3"
    });
    __alloyId11.push($.__views.tab3);
    $.__views.__alloyId18 = Alloy.createController("info", {
        id: "__alloyId18"
    });
    $.__views.tab4 = Ti.UI.createTab({
        window: $.__views.__alloyId18.getViewEx({
            recurse: true
        }),
        id: "tab4"
    });
    __alloyId11.push($.__views.tab4);
    $.__views.tabgroup = Ti.UI.createTabGroup({
        tabs: __alloyId11,
        id: "tabgroup",
        backgroundColor: "white"
    });
    $.__views.tabgroup && $.addTopLevelView($.__views.tabgroup);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.tabgroup.open();
    new Alloy.Globals.CustomTabBar({
        tabBar: $.tabgroup,
        imagePath: "/tabbar/",
        width: 80,
        height: 49,
        items: [ {
            image: "moment.png",
            selected: "moment_select.png"
        }, {
            image: "search.png",
            selected: "search_select.png"
        }, {
            image: "map.png",
            selected: "map_select.png"
        }, {
            image: "info.png",
            selected: "info_select.png"
        } ]
    });
    Alloy.Collections.etablishment.fetch();
    Alloy.Collections.happyhour.fetch();
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
            "Content-Type": "application/json; charset=UTF-8"
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
    var happyhour = Alloy.createCollection("happyhour");
    var etablishment = Alloy.createCollection("etablishment");
    if (Alloy.Globals.hasConnection && 0 == happyhour.count() && 0 == etablishment.count()) {
        api.getEtablishments(function(json) {
            Ti.API.info("on récupère les établissement");
            var d = new Date();
            var day = 0 == d.getDay() ? 7 : d.getDay();
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
    }
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;