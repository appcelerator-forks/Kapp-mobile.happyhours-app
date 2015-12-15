function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function clickAnnotation(evt) {
        "leftButton" == evt.clicksource && goEtablishment(evt.annotation.myId, evt.title);
    }
    function goEtablishment(etablishmentId, etablishmentTitle) {
        var etablishmentView = Alloy.createController("etablishment", {
            etablishmentId: etablishmentId,
            etablishmentTitle: etablishmentTitle
        }).getView();
        etablishmentView.open();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "map";
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
    $.__views.map = Ti.UI.createWindow({
        id: "map",
        title: "Map",
        statusBarStyle: Ti.UI.iPhone.StatusBar.LIGHT_CONTENT
    });
    $.__views.map && $.addTopLevelView($.__views.map);
    var __alloyId22 = [];
    $.__views.mapview = (require("ti.map").createView || Ti.UI.createView)({
        width: "100%",
        height: "100%",
        annotations: __alloyId22,
        id: "mapview",
        mapType: "NORMAL_TYPE",
        animate: "true",
        userLocation: "true",
        regionFit: "true"
    });
    $.__views.map.add($.__views.mapview);
    $.__views.backToMe = Ti.UI.createButton({
        color: "white",
        top: "80%",
        left: "75%",
        font: {
            fontSize: 20,
            fontWeight: "bold"
        },
        shadowColor: "#000000",
        shadowRadius: 3,
        backgroundImage: "pics/btn-card.png",
        width: "60",
        height: "60",
        id: "backToMe"
    });
    $.__views.map.add($.__views.backToMe);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var Map = require("ti.map");
    Map.createView({
        mapType: Map.NORMAL_TYPE
    });
    var latitude = 43.604652;
    var longitude = 1.4442090000000007;
    Ti.Geolocation.distanceFilter = 10;
    Ti.Geolocation.getCurrentPosition(function(e) {
        if (e.error) return;
        longitude = e.coords.longitude;
        latitude = e.coords.latitude;
        $.mapview.setRegion({
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: .02,
            longitudeDelta: .02
        });
        Ti.Geolocation.addEventListener("location", function(e) {
            if (e.error) return;
            longitude = e.coords.longitude;
            latitude = e.coords.latitude;
            $.mapview.setRegion({
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: .02,
                longitudeDelta: .02
            });
        });
        $.backToMe.addEventListener("click", function() {
            $.mapview.setRegion({
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: .02,
                longitudeDelta: .02
            });
        });
    });
    var etablishment = Alloy.createCollection("etablishment");
    etablishment.fetch();
    etablishment.each(function(etablishment) {
        var coord = etablishment.get("gps").split(",");
        var accroche = "";
        accroche = etablishment.get("now") ? etablishment.get("now") : "";
        var d = new Date();
        0 === d.getDay() ? 7 : d.getDay();
        etablishment.get("text");
        var annotation = Map.createAnnotation({
            latitude: coord[0],
            longitude: coord[1],
            title: etablishment.get("name"),
            subtitle: accroche,
            image: "pin/blue-pin.png",
            myId: etablishment.get("id"),
            leftButton: "icons/goto.png"
        });
        annotation.addEventListener("click", clickAnnotation);
        $.mapview.addAnnotation(annotation);
    });
    $.mapview.setRegion({
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: .02,
        longitudeDelta: .02
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;