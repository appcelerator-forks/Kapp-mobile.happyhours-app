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
    this.__controllerPath = "info";
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
    $.__views.win1 = Ti.UI.createWindow({
        id: "win1",
        tabBarHidden: "true",
        navBarHidden: "true"
    });
    $.__views.win1 && $.addTopLevelView($.__views.win1);
    $.__views.label1 = Ti.UI.createLabel({
        text: "info",
        id: "label1",
        color: "#999"
    });
    $.__views.win1.add($.__views.label1);
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;