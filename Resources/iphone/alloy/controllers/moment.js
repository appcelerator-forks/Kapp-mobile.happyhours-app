function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function __alloyId34(e) {
        if (e && e.fromAdapter) return;
        __alloyId34.opts || {};
        var models = haveHappyFilter(__alloyId33);
        var len = models.length;
        var rows = [];
        for (var i = 0; len > i; i++) {
            var __alloyId26 = models[i];
            __alloyId26.__transform = {};
            var __alloyId28 = Ti.UI.createTableViewRow({
                width: "100%",
                height: "20%",
                idEtablishment: "undefined" != typeof __alloyId26.__transform["id"] ? __alloyId26.__transform["id"] : __alloyId26.get("id"),
                titleEtablishment: "undefined" != typeof __alloyId26.__transform["name"] ? __alloyId26.__transform["name"] : __alloyId26.get("name"),
                selectedBackgroundColor: "##E8E8E8"
            });
            rows.push(__alloyId28);
            goEtablishment ? $.addListener(__alloyId28, "click", goEtablishment) : __defers["__alloyId28!click!goEtablishment"] = true;
            var __alloyId30 = Ti.UI.createLabel({
                top: "10%",
                textAlign: "center",
                color: "black",
                text: "undefined" != typeof __alloyId26.__transform["name"] ? __alloyId26.__transform["name"] : __alloyId26.get("name")
            });
            __alloyId28.add(__alloyId30);
            var __alloyId32 = Ti.UI.createLabel({
                top: "50%",
                textAlign: "center",
                color: "black",
                text: "undefined" != typeof __alloyId26.__transform["now"] ? __alloyId26.__transform["now"] : __alloyId26.get("now")
            });
            __alloyId28.add(__alloyId32);
        }
        $.__views.happyhourcontents.setData(rows);
    }
    function setNow() {
        Alloy.createCollection("etablishment");
        var db = Ti.Database.open("etablishmentdb");
        var etablishmentData = db.execute("SELECT * FROM etablishment");
        while (etablishmentData.isValidRow()) etablishmentData.next();
        etablishmentData.close();
        db.close();
        Alloy.Collections.etablishment.fetch();
    }
    function haveHappyFilter(collection) {
        Ti.API.info("haveHappyFilter ");
        return collection.where({
            haveHappy: "true"
        });
    }
    function myRefresher(e) {
        Ti.API.info("on refresh ");
        if (Alloy.Globals.hasConnection()) getAllData(); else {
            var dialog = Ti.UI.createAlertDialog({
                message: "Afin de voir les Happy hours Toulousains, veuillez vous connecter à internet au moins une fois.",
                ok: "Je comprends",
                title: "Attention"
            });
            dialog.show();
        }
        e.hide();
    }
    function goEtablishment() {
        Alloy.createController("etablishment", {
            etablishmentId: this.idEtablishment,
            etablishmentTitle: this.titleEtablishment
        }).getView();
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
    setNow ? $.addListener($.__views.moment, "open", setNow) : __defers["$.__views.moment!open!setNow"] = true;
    $.__views.happyhourcontents = Ti.UI.createTableView({
        layout: "vertical",
        width: "100%",
        height: "90%",
        id: "happyhourcontents"
    });
    var __alloyId33 = Alloy.Collections["etablishment"] || etablishment;
    __alloyId33.on("fetch destroy change add remove reset", __alloyId34);
    $.__views.ptr = Alloy.createWidget("nl.fokkezb.pullToRefresh", "widget", {
        id: "ptr",
        children: [ $.__views.happyhourcontents ],
        __parentSymbol: $.__views.moment
    });
    $.__views.ptr.setParent($.__views.moment);
    myRefresher ? $.__views.ptr.on("release", myRefresher) : __defers["$.__views.ptr!release!myRefresher"] = true;
    exports.destroy = function() {
        __alloyId33.off("fetch destroy change add remove reset", __alloyId34);
    };
    _.extend($, $.__views);
    style = Ti.UI.iPhone.ActivityIndicatorStyle.DARK;
    __defers["$.__views.moment!open!setNow"] && $.addListener($.__views.moment, "open", setNow);
    __defers["__alloyId28!click!goEtablishment"] && $.addListener(__alloyId28, "click", goEtablishment);
    __defers["$.__views.ptr!release!myRefresher"] && $.__views.ptr.on("release", myRefresher);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;