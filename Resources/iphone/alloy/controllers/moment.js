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
            __alloyId26.__transform = transform(__alloyId26);
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
    function haveHappyFilter(collection) {
        Ti.API.info("on est dans la fonction haveHappyFilter");
        date = new Date();
        h = date.getHours() - 6;
        m = date.getMinutes();
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
        var now = "";
        var happyhour = Alloy.createCollection("happyhour");
        var db = Ti.Database.open("happyhourdb");
        var transform = model.toJSON();
        if (happyhour.count() && transform.id) {
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
            now = (hourLast == h && m >= minuteLast || h > hourLast) && (hourEndLast > h || hourEndLast == h && minuteEndLast >= m) ? "En ce moment" : hourLast == h && 30 >= minuteLast - m && minuteLast - m > 0 ? "Dans 30 min" : hourLast == h + 1 && 60 > m - minuteLast && m - minuteLast >= 30 ? "Dans 30 min" : hourLast == h + 1 && m - minuteLast >= 0 && 30 >= m - minuteLast ? "Dans 1h" : hourLast > h ? " " : " ";
            {
                Alloy.createCollection("etablishment");
            }
            var db2 = Ti.Database.open("etablishmentdb");
            var sql = "";
            if (" " == now) {
                if ("false" != transform.haveHappy) {
                    sql = "UPDATE etablishment SET haveHappy='false' WHERE id=" + transform.id;
                    db2.execute(sql);
                }
            } else if ("true" != transform.haveHappy) {
                sql = "UPDATE etablishment SET haveHappy='true' WHERE id=" + transform.id;
                db2.execute(sql);
            }
            transform.now = now;
            happyhourData.close();
            db.close();
            db2.close();
        }
        return transform;
    }
    function myRefresher(e) {
        Alloy.Collections.etablishment.fetch();
        Ti.API.info("on refresh");
        e.hide();
    }
    function goEtablishment() {
        Ti.API.info("on ouvre la fenetre etablishment");
        Alloy.createController("etablishment", {
            etablishmentId: this.idEtablishment,
            etablishmentTitle: this.titleEtablishment
        });
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
    Alloy.Collections.etablishment.fetch();
    __defers["__alloyId28!click!goEtablishment"] && $.addListener(__alloyId28, "click", goEtablishment);
    __defers["$.__views.ptr!release!myRefresher"] && $.__views.ptr.on("release", myRefresher);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;