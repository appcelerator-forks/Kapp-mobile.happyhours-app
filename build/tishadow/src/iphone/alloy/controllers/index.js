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
                for (var i = 0; i < json.etablishment.length; i++) {
                    var data = json.etablishment[i];
                    var etablishment = Alloy.createModel("etablishment", {
                        id: data.ID,
                        name: data.name,
                        adress: data.adress,
                        gps: data.gps,
                        yelp_id: data.yelp_id,
                        city: data.city
                    });
                    etablishment.save();
                }
                Alloy.Collections.etablishment.fetch();
            },
            onerror: function() {}
        });
        xhr.open("GET", apiUrl);
        xhr.send();
    }
    __p.require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
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
    $.__views.__alloyId19 = Alloy.createController("map", {
        id: "__alloyId19"
    });
    $.__views.tab3 = Ti.UI.createTab({
        window: $.__views.__alloyId19.getViewEx({
            recurse: true
        }),
        id: "tab3"
    });
    __alloyId13.push($.__views.tab3);
    $.__views.__alloyId21 = Alloy.createController("info", {
        id: "__alloyId21"
    });
    $.__views.tab4 = Ti.UI.createTab({
        window: $.__views.__alloyId21.getViewEx({
            recurse: true
        }),
        id: "tab4"
    });
    __alloyId13.push($.__views.tab4);
    $.__views.tabgroup = __ui.createTabGroup({
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
            image: __p.file("moment.png"),
            selected: "moment_select.png"
        }, {
            image: __p.file("search.png"),
            selected: "search_select.png"
        }, {
            image: __p.file("map.png"),
            selected: "map_select.png"
        }, {
            image: __p.file("info.png"),
            selected: "info_select.png"
        } ]
    });
    var etablishment = Alloy.createCollection("etablishment");
    etablishment.deleteAll();
    etablishment.count() || (Alloy.Globals.hasConnection() ? getAllEtablishment() : __log.info("INFO : sorry, we have no connection with the network :("));
    _.extend($, exports);
}

var Alloy = __p.require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;