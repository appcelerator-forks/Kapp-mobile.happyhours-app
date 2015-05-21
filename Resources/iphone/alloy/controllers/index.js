function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function getAllDatas() {
        var apiUrl = "http://happyhours-app.fr/api/allEtablishment.php";
        var json;
        var xhr = Ti.Network.createHTTPClient({
            onload: function() {
                json = JSON.parse(this.responseText);
                for (var i = 0; i < json.etablishment.length; i++) {
                    var data = json.etablishment[i];
                    Alloy.Globals.json = data;
                    for (var j = 1; 7 >= j; j++) {
                        var etablishment = Alloy.createModel("etablishment", {
                            id: data.ID,
                            name: data.name
                        });
                        etablishment.save();
                    }
                }
            },
            onerror: function() {}
        });
        xhr.open("GET", apiUrl);
        xhr.send();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
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
    var __alloyId12 = [];
    $.__views.__alloyId13 = Alloy.createController("moment", {
        id: "__alloyId13"
    });
    $.__views.tab1 = Ti.UI.createTab({
        window: $.__views.__alloyId13.getViewEx({
            recurse: true
        }),
        id: "tab1"
    });
    __alloyId12.push($.__views.tab1);
    $.__views.__alloyId15 = Alloy.createController("all", {
        id: "__alloyId15"
    });
    $.__views.tab2 = Ti.UI.createTab({
        window: $.__views.__alloyId15.getViewEx({
            recurse: true
        }),
        id: "tab2"
    });
    __alloyId12.push($.__views.tab2);
    $.__views.__alloyId18 = Alloy.createController("map", {
        id: "__alloyId18"
    });
    $.__views.tab3 = Ti.UI.createTab({
        window: $.__views.__alloyId18.getViewEx({
            recurse: true
        }),
        id: "tab3"
    });
    __alloyId12.push($.__views.tab3);
    $.__views.__alloyId20 = Alloy.createController("info", {
        id: "__alloyId20"
    });
    $.__views.tab4 = Ti.UI.createTab({
        window: $.__views.__alloyId20.getViewEx({
            recurse: true
        }),
        id: "tab4"
    });
    __alloyId12.push($.__views.tab4);
    $.__views.tabgroup = Ti.UI.createTabGroup({
        tabs: __alloyId12,
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
    getAllDatas();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;