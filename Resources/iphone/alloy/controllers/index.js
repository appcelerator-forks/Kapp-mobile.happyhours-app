function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function getAllEtablishment() {
        var apiUrl = "http://happyhours-app.fr/api/allEtablishment.php";
        var json;
        var xhr = Ti.Network.createHTTPClient({
            onload: function() {
                json = JSON.parse(this.responseText);
                Ti.API.info(json);
                var d = new Date();
                var day = 0 == d.getDay() ? 7 : d.getDay();
                var havehappy;
                var data;
                var etablishment;
                for (var i = 0; i < json.etablishment.length; i++) {
                    data = json.etablishment[i];
                    havehappy = false;
                    data.dayHappy.indexOf(day) > 0 && (havehappy = "true");
                    etablishment = Alloy.createModel("etablishment", {
                        id: data.ID,
                        name: data.name,
                        adress: data.adress,
                        gps: data.gps,
                        yelp_id: data.yelp_id,
                        city: data.city,
                        haveHappy: havehappy
                    });
                    etablishment.save();
                    Alloy.Collections.etablishment.fetch();
                }
            },
            onerror: function() {}
        });
        xhr.open("GET", apiUrl);
        xhr.send();
    }
    function getAllHappyHours() {
        var apiUrl = "http://happyhours-app.fr/api/allHappyHours.php";
        var json;
        var xhr = Ti.Network.createHTTPClient({
            onload: function() {
                json = JSON.parse(this.responseText);
                for (var i = 0; i < json.happyhour.length; i++) {
                    var data = json.happyhour[i];
                    var happyhour = Alloy.createModel("happyhour", {
                        id: data.ID,
                        id_etablishment: data.id_etablishment,
                        day: data.day,
                        text: data.text,
                        hours: data.hours
                    });
                    happyhour.save();
                }
            },
            onerror: function() {}
        });
        xhr.open("GET", apiUrl);
        xhr.send();
    }
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
    var __alloyId13 = [];
    $.__views.__alloyId14 = Alloy.createController("moment", {
        id: "__alloyId14"
    });
    $.__views.tab1 = Ti.UI.createTab({
        window: $.__views.__alloyId14.getViewEx({
            recurse: true
        }),
        id: "tab1"
    });
    __alloyId13.push($.__views.tab1);
    $.__views.__alloyId16 = Alloy.createController("all", {
        id: "__alloyId16"
    });
    $.__views.tab2 = Ti.UI.createTab({
        window: $.__views.__alloyId16.getViewEx({
            recurse: true
        }),
        id: "tab2"
    });
    __alloyId13.push($.__views.tab2);
    $.__views.__alloyId18 = Alloy.createController("map", {
        id: "__alloyId18"
    });
    $.__views.tab3 = Ti.UI.createTab({
        window: $.__views.__alloyId18.getViewEx({
            recurse: true
        }),
        id: "tab3"
    });
    __alloyId13.push($.__views.tab3);
    $.__views.__alloyId20 = Alloy.createController("info", {
        id: "__alloyId20"
    });
    $.__views.tab4 = Ti.UI.createTab({
        window: $.__views.__alloyId20.getViewEx({
            recurse: true
        }),
        id: "tab4"
    });
    __alloyId13.push($.__views.tab4);
    $.__views.tabgroup = Ti.UI.createTabGroup({
        tabs: __alloyId13,
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
        height: 40,
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
    var etablishment = Alloy.createCollection("etablishment");
    var happyhour = Alloy.createCollection("happyhour");
    etablishment.deleteAll();
    happyhour.deleteAll();
    if (!etablishment.count()) if (Alloy.Globals.hasConnection()) {
        getAllEtablishment();
        getAllHappyHours();
        Ti.API.info("on recupere tout");
    } else Ti.API.info("INFO : sorry, we have no connection with the network ");
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;