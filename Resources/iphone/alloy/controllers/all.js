function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function __alloyId10(e) {
        if (e && e.fromAdapter) return;
        __alloyId10.opts || {};
        var models = __alloyId9.models;
        var len = models.length;
        var rows = [];
        for (var i = 0; len > i; i++) {
            var __alloyId2 = models[i];
            __alloyId2.__transform = {};
            var __alloyId4 = Ti.UI.createTableViewRow({
                width: "100%",
                height: "20%",
                idEtablishment: "undefined" != typeof __alloyId2.__transform["id"] ? __alloyId2.__transform["id"] : __alloyId2.get("id"),
                titleEtablishment: "undefined" != typeof __alloyId2.__transform["name"] ? __alloyId2.__transform["name"] : __alloyId2.get("name")
            });
            rows.push(__alloyId4);
            goEtablishment ? $.addListener(__alloyId4, "click", goEtablishment) : __defers["__alloyId4!click!goEtablishment"] = true;
            var __alloyId6 = Ti.UI.createLabel({
                top: "10%",
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
        }
        $.__views.partnerscontent.setData(rows);
    }
    function goEtablishment() {
        var etablishmentView = Alloy.createController("etablishment", {
            etablishmentId: 1,
            etablishmentTitle: "test"
        }).getView();
        etablishmentView.open();
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
    var __defers = {};
    Alloy.Collections.instance("etablishment");
    $.__views.all = Ti.UI.createWindow({
        id: "all",
        tabBarHidden: "true",
        title: "Établissements"
    });
    $.__views.all && $.addTopLevelView($.__views.all);
    $.__views.partnerscontent = Ti.UI.createTableView({
        layout: "vertical",
        width: "100%",
        height: "90%",
        id: "partnerscontent"
    });
    $.__views.all.add($.__views.partnerscontent);
    var __alloyId9 = Alloy.Collections["etablishment"] || etablishment;
    __alloyId9.on("fetch destroy change add remove reset", __alloyId10);
    exports.destroy = function() {
        __alloyId9.off("fetch destroy change add remove reset", __alloyId10);
    };
    _.extend($, $.__views);
    __defers["__alloyId4!click!goEtablishment"] && $.addListener(__alloyId4, "click", goEtablishment);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;