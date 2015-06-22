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
    this.__controllerPath = "map";
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
    $.__views.map = Ti.UI.createWindow({
        tabBarHidden: "true",
        navBarHidden: "true",
        id: "map"
    });
    $.__views.map && $.addTopLevelView($.__views.map);
    var __alloyId20 = [];
    $.__views.mapview = (require("ti.map").createView || Ti.UI.createView)({
        annotations: __alloyId20,
        id: "mapview",
        mapType: "NORMAL_TYPE",
        animate: "true",
        regionFit: "true"
    });
    $.__views.map.add($.__views.mapview);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var Map = require("ti.map");
    Map.createView({
        mapType: Map.NORMAL_TYPE
    });
    var latitude = 43.604652;
    var longitude = 1.4442090000000007;
    $.mapview.setRegion({
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: .02,
        longitudeDelta: .02
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;