function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function __alloyId35(e) {
        if (e && e.fromAdapter) return;
        __alloyId35.opts || {};
        var models = haveHappyFilter(__alloyId34);
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
            goEtablishment ? __alloyId27.addEventListener("click", goEtablishment) : __defers["__alloyId27!click!goEtablishment"] = true;
            var __alloyId29 = Ti.UI.createLabel({
                top: "10%",
                textAlign: "center",
                color: "black",
                text: "undefined" != typeof __alloyId25.__transform["name"] ? __alloyId25.__transform["name"] : __alloyId25.get("name")
            });
            __alloyId27.add(__alloyId29);
            var __alloyId31 = Ti.UI.createLabel({
                top: "50%",
                textAlign: "center",
                color: "black",
                text: "undefined" != typeof __alloyId25.__transform["now"] ? __alloyId25.__transform["now"] : __alloyId25.get("now")
            });
            __alloyId27.add(__alloyId31);
            var __alloyId33 = Ti.UI.createView({
                backgroundColor: "black",
                width: "100%",
                height: "1px"
            });
            $.__views.happyhourcontents.add(__alloyId33);
        }
    }
    function haveHappyFilter(collection) {
        return collection.where({
            haveHappy: "true"
        });
    }
    function test2() {
        var etablishment = Alloy.createCollection("etablishment");
        var happyhour = Alloy.createCollection("happyhour");
        if (Alloy.Globals.hasConnection()) {
            etablishment.deleteAll();
            happyhour.deleteAll();
            getAllHappyHours();
            getAllEtablishment();
        } else alert("INFO : sorry, we have no connection with the network ");
        Alloy.Collections.etablishment.fetch();
    }
    function test(model) {
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
            var happyhourData = db.execute("SELECT * FROM happyhours WHERE id_etablishment = " + transform.id);
            while (happyhourData.isValidRow()) {
                var hour = happyhourData.fieldByName("hours");
                var pos = hour.indexOf("/");
                var begin = hour.substr(0, pos);
                var end = hour.substr(pos + 1, hour.length);
                var heure = begin.substr(0, 2);
                6 > heure && (heure += 18);
                var heure = heure - 6;
                if (3 == begin.length) var minute = 0; else var minute = begin.substr(3, 2);
                var posH = end.lastIndexOf("H");
                var heureEnd = end.substr(0, posH);
                6 > heureEnd && (heureEnd = 18);
                var heureEnd = heureEnd - 6;
                if (3 == end.length) var minuteEnd = 0; else var minuteEnd = end.substr(3, 2);
                hourLast > heure && (hourLast = heure);
                minuteLast > minute && (minuteLast = minute);
                heureEnd > hourEndLast && (hourEndLast = heureEnd);
                minuteEnd > minuteEndLast && (minuteEndLast = minuteEnd);
                happyhourData.next();
            }
            now = (hourLast == h && m >= minuteLast || h > hourLast) && (hourEndLast > h || hourEndLast == h && minuteEndLast >= m) ? "En ce moment " : hourLast == h && 30 >= minuteLast - m && minuteLast - m > 0 ? "Dans 30 min" : hourLast == h + 1 && 60 > m - minuteLast && m - minuteLast >= 30 ? "Dans 30 min" : hourLast == h + 1 && m - minuteLast >= 0 && 30 >= m - minuteLast ? "Dans 1h" : hourLast > h ? "un peu de patience " : "Trop tard ";
            transform.now = now;
            happyhourData.close();
        }
        return transform;
    }
    function goEtablishment() {
        var etablishmentView = Alloy.createController("etablishment", {
            etablishmentId: this.idEtablishment,
            etablishmentTitle: this.titleEtablishment
        }).getView();
        etablishmentView.open();
    }
    function getAllEtablishment() {
        var apiUrl = "http://happyhours-app.fr/api/allEtablishment.php";
        var json;
        var xhr = Ti.Network.createHTTPClient({
            onload: function() {
                json = JSON.parse(this.responseText);
                var d = new Date();
                var day = 0 == d.getDay() ? 7 : d.getDay();
                var havehappy;
                var data;
                var etablishment;
                var now = "not now";
                for (var i = 0; i < json.etablishment.length; i++) {
                    data = json.etablishment[i];
                    havehappy = "false";
                    data.dayHappy.indexOf(day) >= 0 && (havehappy = "true");
                    etablishment = Alloy.createModel("etablishment", {
                        id: data.ID,
                        name: data.name,
                        adress: data.adress,
                        gps: data.gps,
                        yelp_id: data.yelp_id,
                        city: data.city,
                        haveHappy: havehappy,
                        now: now
                    });
                    etablishment.save();
                }
                Alloy.Collections.etablishment.fetch();
            },
            onerror: function() {}
        });
        xhr.open("GET", apiUrl);
        xhr.send();
    }
    function getAllHappyHours() {
        var apiUrl = "http://happyhours-app.fr/api/allHappyHours.php";
        var json;
        var xhr = Ti.Network.createHTTPClient({
            onload: function() {
                json = JSON.parse(this.responseText);
                for (var i = 0; i < json.happyhour.length; i++) {
                    var data = json.happyhour[i];
                    var happyhour = Alloy.createModel("happyhour", {
                        id: data.ID,
                        id_etablishment: data.id_etablishment,
                        day: data.day,
                        text: data.text,
                        hours: data.hours
                    });
                    happyhour.save();
                }
            },
            onerror: function() {}
        });
        xhr.open("GET", apiUrl);
        xhr.send();
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
    $.__views.happyhourcontents = Ti.UI.createScrollView({
        layout: "vertical",
        width: "100%",
        height: "90%",
        id: "happyhourcontents",
        dataTransform: "test"
    });
    $.__views.moment.add($.__views.happyhourcontents);
    var __alloyId34 = Alloy.Collections["etablishment"] || etablishment;
    __alloyId34.on("fetch destroy change add remove reset", __alloyId35);
    exports.destroy = function() {
        __alloyId34.off("fetch destroy change add remove reset", __alloyId35);
    };
    _.extend($, $.__views);
    var beginTouch;
    var move;
    var moveLast = 0;
    var testA = 0;
    var style;
    style = Ti.UI.iPhone.ActivityIndicatorStyle.DARK;
    var activityIndicator = Ti.UI.createActivityIndicator({
        color: "green",
        font: {
            fontFamily: "Helvetica Neue",
            fontSize: 26,
            fontWeight: "bold"
        },
        style: style,
        top: 10,
        left: "45%",
        height: 10,
        width: Ti.UI.SIZE
    });
    $.moment.add(activityIndicator);
    $.happyhourcontents.addEventListener("touchstart", function(e) {
        beginTouch = e.y;
        moveLast = beginTouch;
        testA = 0;
    });
    $.happyhourcontents.addEventListener("touchmove", function(e) {
        move = e.y - beginTouch;
        testA += Math.abs(move);
        if (move > 0 && (testA - beginTouch) / 100 > 0 && 40 > (testA - beginTouch) / 100) if ((testA - beginTouch) / 100 > 30) {
            activityIndicator.show();
            $.happyhourcontents.setTop((testA - beginTouch) / 100);
        } else $.happyhourcontents.setTop((testA - beginTouch) / 100);
    });
    $.happyhourcontents.addEventListener("touchend", function() {
        if ((testA - beginTouch) / 100 > 30) setTimeout(function() {
            test2();
            activityIndicator.hide();
            $.happyhourcontents.setTop(0);
        }, 1e3); else {
            activityIndicator.hide();
            $.happyhourcontents.setTop(0);
        }
    });
    __defers["__alloyId27!click!goEtablishment"] && __alloyId27.addEventListener("click", goEtablishment);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;