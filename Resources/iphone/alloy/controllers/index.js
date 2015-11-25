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
    $.__views.__alloyId17 = Alloy.createController("info", {
        id: "__alloyId17"
    });
    $.__views.tab4 = Ti.UI.createTab({
        window: $.__views.__alloyId17.getViewEx({
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
    getAllData();
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
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;