function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "mapEtablishment";
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
    $.__views.MapEtablishment = Ti.UI.createWindow({
        id: "MapEtablishment",
        title: "map",
        statusBarStyle: Ti.UI.iPhone.StatusBar.LIGHT_CONTENT
    });
    $.__views.MapEtablishment && $.addTopLevelView($.__views.MapEtablishment);
    var __alloyId23 = [];
    $.__views.mapview = (require("ti.map").createView || Ti.UI.createView)({
        width: "100%",
        height: "100%",
        annotations: __alloyId23,
        id: "mapview",
        mapType: "NORMAL_TYPE",
        animate: "true",
        userLocation: "true",
        regionFit: "true"
    });
    $.__views.MapEtablishment.add($.__views.mapview);
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
    $.__views.MapEtablishment.add($.__views.backToMe);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var Map = require("ti.map");
    Map.createView({
        mapType: Map.NORMAL_TYPE
    });
    var args = arguments[0] || {};
    var etablishmentId = args.etablishmentId;
    var etablishmentTitle = args.etablishmentTitle;
    var latitude = 43.604652;
    var longitude = 1.4442090000000007;
    Ti.Geolocation.distanceFilter = 10;
    Ti.Geolocation.getCurrentPosition(function(e) {
        if (e.error) return;
        longitude = e.coords.longitude;
        latitude = e.coords.latitude;
    });
    Ti.Geolocation.addEventListener("location", function(e) {
        if (e.error) return;
        longitude = e.coords.longitude;
        latitude = e.coords.latitude;
    });
    $.mapview.setRegion({
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: .02,
        longitudeDelta: .02
    });
    $.backToMe.addEventListener("click", function() {
        $.mapview.setRegion({
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: .02,
            longitudeDelta: .02
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
        if (etablishmentId && etablishmentId == etablishment.get("id")) {
            $.mapview.setRegion({
                latitude: coord[0],
                longitude: coord[1],
                latitudeDelta: .001,
                longitudeDelta: .001
            });
            var annotation = Map.createAnnotation({
                latitude: coord[0],
                longitude: coord[1],
                title: etablishment.get("name"),
                subtitle: accroche,
                image: "pin/pink-pin.png",
                myId: etablishment.get("id")
            });
            $.mapview.addAnnotation(annotation);
        }
    });
    var btnBack = Ti.UI.createButton({
        title: " < ",
        color: "black",
        backgroundImage: "none",
        top: "8.5%",
        left: "5%"
    });
    btnBack.addEventListener("click", function() {
        $.MapEtablishment.close();
        Ti.App.fireEvent("closeWindow");
    });
    var tabbedBar = Ti.UI.createTabbedBar({
        labels: [ "Etablishment", "Map" ],
        style: Titanium.UI.iPhone.SystemButtonStyle.BAR,
        top: "9%"
    });
    tabbedBar.index = 1;
    $.MapEtablishment.add(btnBack);
    $.MapEtablishment.add(tabbedBar);
    $.MapEtablishment.open();
    tabbedBar.addEventListener("click", function(e) {
        if (0 === e.index) {
            $.MapEtablishment.close();
            {
                Alloy.createController("etablishment", {
                    etablishmentId: etablishmentId,
                    etablishmentTitle: etablishmentTitle
                });
            }
        }
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;