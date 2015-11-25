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
        var models = haveHappyFilter(__alloyId30);
        var len = models.length;
        var rows = [];
        for (var i = 0; len > i; i++) {
            var __alloyId23 = models[i];
            __alloyId23.__transform = transform(__alloyId23);
            var __alloyId25 = Ti.UI.createTableViewRow({
                width: "100%",
                height: "20%",
                idEtablishment: "undefined" != typeof __alloyId23.__transform["id"] ? __alloyId23.__transform["id"] : __alloyId23.get("id"),
                titleEtablishment: "undefined" != typeof __alloyId23.__transform["name"] ? __alloyId23.__transform["name"] : __alloyId23.get("name"),
                selectedBackgroundColor: "##E8E8E8"
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
    function setNow(model) {
        Alloy.createCollection("etablishment");
        var db = Ti.Database.open("etablishmentdb");
        var etablishmentData = db.execute("SELECT * FROM etablishment");
        while (etablishmentData.isValidRow()) {
            Ti.API.info(etablishmentData.fieldByName("id"));
            etablishmentData.next();
        }
        etablishmentData.close();
        db.close();
        Ti.API.info(model);
        Alloy.Collections.etablishment.fetch();
    }
    function haveHappyFilter(collection) {
        Ti.API.info("on est dans la fonction haveHappyFilter ");
        return collection.where({
            haveHappy: "true"
        });
    }
    function transform(model) {
        Ti.API.info("on est dans la fonction transform");
        date = new Date();
        h = date.getHours() - 6;
        m = date.getMinutes();
        0 > h && (h += 24);
        var hourLast = 100;
        var minuteLast = 100;
        var hourEndLast = -1;
        var minuteEndLast = -1;
        Alloy.createCollection("happyhour");
        var db = Ti.Database.open("happyhourdb");
        var transform = model.toJSON();
        if (transform.id) {
            var happyhourData = db.execute("SELECT * FROM happyhour WHERE id_etablishment = " + transform.id);
            while (happyhourData.isValidRow()) {
                var hour = happyhourData.fieldByName("hours");
                var pos = hour.indexOf("/");
                var begin = hour.substr(0, pos);
                var end = hour.substr(pos + 1, hour.length);
                var heure = begin.substr(0, 2);
                var minute = 0;
                6 > heure && (heure += 18);
                heure -= 6;
                minute = 3 == begin.length ? 0 : begin.substr(3, 2);
                var posH = end.lastIndexOf("H");
                var heureEnd = end.substr(0, posH);
                var minuteEnd = 0;
                6 > heureEnd && (heureEnd = 18);
                heureEnd -= 6;
                minuteEnd = 3 == end.length ? 0 : end.substr(3, 2);
                hourLast > heure && (hourLast = heure);
                minuteLast > minute && (minuteLast = minute);
                heureEnd > hourEndLast && (hourEndLast = heureEnd);
                minuteEnd > minuteEndLast && (minuteEndLast = minuteEnd);
                happyhourData.next();
            }
            var now = "";
            now = (hourLast == h && m >= minuteLast || h > hourLast) && (hourEndLast > h || hourEndLast == h && minuteEndLast >= m) ? "En ce moment" : hourLast == h && 30 >= minuteLast - m && minuteLast - m > 0 ? "Dans 30 min" : hourLast == h + 1 && 60 > m - minuteLast && m - minuteLast >= 30 ? "Dans 30 min" : hourLast == h + 1 && m - minuteLast >= 0 && 30 >= m - minuteLast ? "Dans 1h" : hourLast > h ? "Pas en ce moment" : "Pas en ce moment ";
            {
                Alloy.createCollection("etablishment");
            }
            var db2 = Ti.Database.open("etablishmentdb");
            transform.now = now;
            happyhourData.close();
            db.close();
            db2.close();
        }
        return transform;
    }
    function myRefresher(e) {
        Ti.API.info("on refresh ");
        getAllData();
        Alloy.Collections.etablishment.fetch();
        e.hide();
    }
    function goEtablishment() {
        Ti.UI.createWindow({
            title: "test"
        });
        Ti.API.info(Alloy.Globals.CustomTabBar.tabBar);
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
    __defers["$.__views.moment!open!setNow"] && $.addListener($.__views.moment, "open", setNow);
    __defers["__alloyId25!click!goEtablishment"] && $.addListener(__alloyId25, "click", goEtablishment);
    __defers["$.__views.ptr!release!myRefresher"] && $.__views.ptr.on("release", myRefresher);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;