function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function __alloyId11(e) {
        if (e && e.fromAdapter) return;
        __alloyId11.opts || {};
        var models = __alloyId10.models;
        var len = models.length;
        var children = $.__views.__alloyId2.children;
        for (var d = children.length - 1; d >= 0; d--) $.__views.__alloyId2.remove(children[d]);
        for (var i = 0; len > i; i++) {
            var __alloyId3 = models[i];
            __alloyId3.__transform = {};
            var __alloyId5 = Ti.UI.createView({
                width: "100%",
                height: "30%",
                idPartner: "undefined" != typeof __alloyId3.__transform["id"] ? __alloyId3.__transform["id"] : __alloyId3.get("id"),
                titlePartner: "undefined" != typeof __alloyId3.__transform["name"] ? __alloyId3.__transform["name"] : __alloyId3.get("name")
            });
            $.__views.__alloyId2.add(__alloyId5);
            var __alloyId7 = Ti.UI.createLabel({
                text: "undefined" != typeof __alloyId3.__transform["name"] ? __alloyId3.__transform["name"] : __alloyId3.get("name")
            });
            __alloyId5.add(__alloyId7);
            var __alloyId9 = Ti.UI.createView({
                backgroundColor: "black",
                width: "100%",
                height: "1px"
            });
            $.__views.__alloyId2.add(__alloyId9);
        }
    }
    __p.require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "all";
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
    Alloy.Collections.instance("etablishment");
    $.__views.all = __ui.createWindow({
        title: "Établissement",
        tabBarHidden: "true",
        id: "all"
    });
    $.__views.all && $.addTopLevelView($.__views.all);
    $.__views.__alloyId2 = Ti.UI.createScrollView({
        layout: "vertical",
        width: "100%",
        id: "__alloyId2"
    });
    $.__views.all.add($.__views.__alloyId2);
    var __alloyId10 = Alloy.Collections["etablishment"] || etablishment;
    __alloyId10.on("fetch destroy change add remove reset", __alloyId11);
    exports.destroy = function() {
        __alloyId10.off("fetch destroy change add remove reset", __alloyId11);
    };
    _.extend($, $.__views);
    var etablishment = Alloy.createCollection("etablishment");
    etablishment.fetch();
    Alloy.Collections.etablishment.fetch();
    _.extend($, exports);
}

var Alloy = __p.require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;