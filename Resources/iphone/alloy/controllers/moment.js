function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function __alloyId31(e) {
        if (e && e.fromAdapter) return;
        __alloyId31.opts || {};
        var models = __alloyId30.models;
        var len = models.length;
        var rows = [];
        for (var i = 0; len > i; i++) {
            var __alloyId23 = models[i];
            __alloyId23.__transform = {};
            var __alloyId25 = Ti.UI.createTableViewRow({
                width: "100%",
                height: "20%",
                idEtablishment: "undefined" != typeof __alloyId23.__transform["id"] ? __alloyId23.__transform["id"] : __alloyId23.get("id"),
                titleEtablishment: "undefined" != typeof __alloyId23.__transform["name"] ? __alloyId23.__transform["name"] : __alloyId23.get("name")
            });
            rows.push(__alloyId25);
            goEtablishment ? $.addListener(__alloyId25, "click", goEtablishment) : __defers["__alloyId25!click!goEtablishment"] = true;
            var __alloyId27 = Ti.UI.createLabel({
                top: "10%",
                textAlign: "center",
                color: "black",
                text: "undefined" != typeof __alloyId23.__transform["name"] ? __alloyId23.__transform["name"] : __alloyId23.get("name")
            });
            __alloyId25.add(__alloyId27);
            var __alloyId29 = Ti.UI.createLabel({
                top: "50%",
                textAlign: "center",
                color: "black",
                text: "undefined" != typeof __alloyId23.__transform["now"] ? __alloyId23.__transform["now"] : __alloyId23.get("now")
            });
            __alloyId25.add(__alloyId29);
        }
        $.__views.happyhourcontents.setData(rows);
    }
    function myRefresher(e) {
        Alloy.Collections.etablishment.fetch();
        e.hide();
    }
    function goEtablishment() {
        Ti.API.info("on ouvre la fentre etablishment");
        var etablishmentView = Alloy.createController("etablishment", {
            etablishmentId: this.idEtablishment,
            etablishmentTitle: this.titleEtablishment
        }).getView();
        etablishmentView.open();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "moment";
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
    $.__views.moment = Ti.UI.createWindow({
        id: "moment",
        title: "Happy Hours",
        tabBarHidden: "true"
    });
    $.__views.moment && $.addTopLevelView($.__views.moment);
    $.__views.happyhourcontents = Ti.UI.createTableView({
        layout: "vertical",
        width: "100%",
        height: "90%",
        id: "happyhourcontents"
    });
    var __alloyId30 = Alloy.Collections["etablishment"] || etablishment;
    __alloyId30.on("fetch destroy change add remove reset", __alloyId31);
    $.__views.ptr = Alloy.createWidget("nl.fokkezb.pullToRefresh", "widget", {
        id: "ptr",
        children: [ $.__views.happyhourcontents ],
        __parentSymbol: $.__views.moment
    });
    $.__views.ptr.setParent($.__views.moment);
    myRefresher ? $.__views.ptr.on("release", myRefresher) : __defers["$.__views.ptr!release!myRefresher"] = true;
    exports.destroy = function() {
        __alloyId30.off("fetch destroy change add remove reset", __alloyId31);
    };
    _.extend($, $.__views);
    style = Ti.UI.iPhone.ActivityIndicatorStyle.DARK;
    Alloy.Collections.etablishment.fetch();
    __defers["__alloyId25!click!goEtablishment"] && $.addListener(__alloyId25, "click", goEtablishment);
    __defers["$.__views.ptr!release!myRefresher"] && $.__views.ptr.on("release", myRefresher);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;