function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
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
    var __alloyId0 = [];
    $.__views.__alloyId1 = Alloy.createController("moment", {
        id: "__alloyId1"
    });
    $.__views.tab1 = Ti.UI.createTab({
        window: $.__views.__alloyId1.getViewEx({
            recurse: true
        }),
        id: "tab1"
    });
    __alloyId0.push($.__views.tab1);
    $.__views.win2 = __ui.createWindow({
        id: "win2",
        title: "Tab 2",
        tabBarHidden: "true"
    });
    $.__views.label2 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#999",
        text: "I am Window 2",
        id: "label2"
    });
    $.__views.win2.add($.__views.label2);
    $.__views.tab2 = Ti.UI.createTab({
        window: $.__views.win2,
        id: "tab2"
    });
    __alloyId0.push($.__views.tab2);
    $.__views.__alloyId2 = Alloy.createController("map", {
        id: "__alloyId2"
    });
    $.__views.tab3 = Ti.UI.createTab({
        window: $.__views.__alloyId2.getViewEx({
            recurse: true
        }),
        id: "tab3"
    });
    __alloyId0.push($.__views.tab3);
    $.__views.__alloyId3 = Alloy.createController("info", {
        id: "__alloyId3"
    });
    $.__views.tab4 = Ti.UI.createTab({
        window: $.__views.__alloyId3.getViewEx({
            recurse: true
        }),
        id: "tab4"
    });
    __alloyId0.push($.__views.tab4);
    $.__views.tabgroup = __ui.createTabGroup({
        tabs: __alloyId0,
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
            image: __p.file("home.png"),
            selected: "home_over.png"
        }, {
            image: __p.file("cloud.png"),
            selected: "cloud_over.png"
        }, {
            image: __p.file("home.png"),
            selected: "home_over.png"
        }, {
            image: __p.file("cloud.png"),
            selected: "cloud_over.png"
        } ]
    });
    _.extend($, exports);
}

var Alloy = __p.require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;