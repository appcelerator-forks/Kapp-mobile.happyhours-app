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
    $.__views.__alloyId14 = Alloy.createController("all", {
        id: "__alloyId14"
    });
    $.__views.tab2 = Ti.UI.createTab({
        window: $.__views.__alloyId14.getViewEx({
            recurse: true
        }),
        id: "tab2"
    });
    __alloyId12.push($.__views.tab2);
    $.__views.__alloyId17 = Alloy.createController("map", {
        id: "__alloyId17"
    });
    $.__views.tab3 = Ti.UI.createTab({
        window: $.__views.__alloyId17.getViewEx({
            recurse: true
        }),
        id: "tab3"
    });
    __alloyId12.push($.__views.tab3);
    $.__views.__alloyId18 = Alloy.createController("info", {
        id: "__alloyId18"
    });
    $.__views.tab4 = Ti.UI.createTab({
        window: $.__views.__alloyId18.getViewEx({
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
        imagePath: "iphone/images/",
        width: 80,
        height: 40,
        items: [ {
            image: "home.png",
            selected: "home_over.png"
        }, {
            image: "cloud.png",
            selected: "cloud_over.png"
        }, {
            image: "home.png",
            selected: "home_over.png"
        }, {
            image: "cloud.png",
            selected: "cloud_over.png"
        } ]
    });
    alert(Alloy.Globals.json);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;