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
        var children = $.__views.happyhourcontents.children;
        for (var d = children.length - 1; d >= 0; d--) $.__views.happyhourcontents.remove(children[d]);
        for (var i = 0; len > i; i++) {
            var __alloyId25 = models[i];
            __alloyId25.__transform = test(__alloyId25);
            var __alloyId27 = Ti.UI.createView({
                width: "100%",
                height: "20%",
                idEtablishment: "undefined" != typeof __alloyId25.__transform["id"] ? __alloyId25.__transform["id"] : __alloyId25.get("id"),
                titleEtablishment: "undefined" != typeof __alloyId25.__transform["name"] ? __alloyId25.__transform["name"] : __alloyId25.get("name")
            });
            $.__views.happyhourcontents.add(__alloyId27);
            var __alloyId29 = Ti.UI.createLabel({
                top: "10%",
                textAlign: "center",
                color: "black",
                text: "undefined" != typeof __alloyId25.__transform["name"] ? __alloyId25.__transform["name"] : __alloyId25.get("name")
            });
            __alloyId27.add(__alloyId29);
            var __alloyId30 = Ti.UI.createLabel({
                top: "50%",
                textAlign: "center",
                color: "black",
                text: "undefined" != typeof __alloyId25.__transform["test"] ? __alloyId25.__transform["test"] : __alloyId25.get("test")
            });
            __alloyId27.add(__alloyId30);
            var __alloyId32 = Ti.UI.createView({
                backgroundColor: "black",
                width: "100%",
                height: "1px"
            });
            $.__views.happyhourcontents.add(__alloyId32);
        }
    }
    function haveHappyFilter(collection) {
        return collection.where({
            haveHappy: "true"
        });
    }
    function test(model) {
        date = new Date();
        h = date.getHours();
        m = date.getMinutes();
        Ti.API.info(m);
        var heure;
        var minute;
        var now = "";
        var db = Ti.Database.open("happyhourdb");
        var transform = model.toJSON();
        var happyhourData = db.execute("SELECT * FROM happyhours WHERE id_etablishment = " + transform.id);
        var hour = happyhourData.fieldByName("hours");
        db.close();
        var pos = hour.lastIndexOf("/");
        var begin = hour.substr(0, pos);
        if (3 == begin.length) {
            heure = hour.substr(0, 2);
            now = heure == h ? "maintenant !" : heure == h + 1 ? m > 30 ? "dans 30min" : "dans 1h" : "dans longtemps";
        } else {
            heure = hour.substr(0, 2);
            minute = hour.substr(3, 2);
            now = heure == h && m >= minute ? "maintenant" : heure == h && minute >= m ? "dans 30min" : heure == h + 1 ? minutes > m ? "dans longtemps" : "dans 1h" : "dans longtemps";
        }
        transform.test = now;
        return transform;
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
    Alloy.Collections.instance("etablishment");
    $.__views.moment = Ti.UI.createWindow({
        id: "moment",
        title: "Happy Hours",
        tabBarHidden: "true"
    });
    $.__views.moment && $.addTopLevelView($.__views.moment);
    $.__views.happyhourcontents = Ti.UI.createScrollView({
        layout: "vertical",
        width: "100%",
        id: "happyhourcontents",
        dataTransform: "test"
    });
    $.__views.moment.add($.__views.happyhourcontents);
    var __alloyId33 = Alloy.Collections["etablishment"] || etablishment;
    __alloyId33.on("fetch destroy change add remove reset", __alloyId34);
    exports.destroy = function() {
        __alloyId33.off("fetch destroy change add remove reset", __alloyId34);
    };
    _.extend($, $.__views);
    Alloy.Collections.etablishment.fetch();
    var childrens = $.happyhourcontents.children;
    var idEtablishment;
    var hour;
    var db = Ti.Database.open("happyhourdb");
    for (var i = 0; i < childrens.length; i++) {
        if (!childrens[i].idEtablishment) continue;
        idEtablishment = childrens[i].idEtablishment;
        var happyhourData = db.execute("SELECT * FROM happyhours WHERE id_etablishment = " + idEtablishment);
        hour = happyhourData.fieldByName("hours");
    }
    db.close();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;