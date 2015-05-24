function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function __alloyId12(e) {
        if (e && e.fromAdapter) return;
        __alloyId12.opts || {};
        var models = __alloyId11.models;
        var len = models.length;
        var children = $.__views.partnerscontent.children;
        for (var d = children.length - 1; d >= 0; d--) $.__views.partnerscontent.remove(children[d]);
        for (var i = 0; len > i; i++) {
            var __alloyId2 = models[i];
            __alloyId2.__transform = {};
            var __alloyId4 = Ti.UI.createView({
                width: "100%",
                height: "20%",
                idEtablishment: "undefined" != typeof __alloyId2.__transform["id"] ? __alloyId2.__transform["id"] : __alloyId2.get("id"),
                titleEtablishment: "undefined" != typeof __alloyId2.__transform["name"] ? __alloyId2.__transform["name"] : __alloyId2.get("name")
            });
            $.__views.partnerscontent.add(__alloyId4);
            var __alloyId6 = Ti.UI.createLabel({
                top: "20%",
                textAlign: "center",
                color: "black",
                text: "undefined" != typeof __alloyId2.__transform["name"] ? __alloyId2.__transform["name"] : __alloyId2.get("name")
            });
            __alloyId4.add(__alloyId6);
            var __alloyId8 = Ti.UI.createLabel({
                top: "50%",
                textAlign: "center",
                color: "black",
                text: "undefined" != typeof __alloyId2.__transform["adress"] ? __alloyId2.__transform["adress"] : __alloyId2.get("adress")
            });
            __alloyId4.add(__alloyId8);
            var __alloyId10 = Ti.UI.createView({
                backgroundColor: "black",
                width: "100%",
                height: "1px"
            });
            $.__views.partnerscontent.add(__alloyId10);
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "all";
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
    Alloy.Collections.instance("etablishment");
    $.__views.all = Ti.UI.createWindow({
        id: "all",
        tabBarHidden: "true",
        title: "Établissements"
    });
    $.__views.all && $.addTopLevelView($.__views.all);
    $.__views.partnerscontent = Ti.UI.createScrollView({
        layout: "vertical",
        width: "100%",
        id: "partnerscontent"
    });
    $.__views.all.add($.__views.partnerscontent);
    var __alloyId11 = Alloy.Collections["etablishment"] || etablishment;
    __alloyId11.on("fetch destroy change add remove reset", __alloyId12);
    exports.destroy = function() {
        __alloyId11.off("fetch destroy change add remove reset", __alloyId12);
    };
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;