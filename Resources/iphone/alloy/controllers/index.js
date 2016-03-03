function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function openTab() {
        Alloy.Collections.etablishment.fetch();
        $.tabgroup.open();
        $.tabgroup.close();
        $.tabgroup.open();
        new Alloy.Globals.CustomTabBar({
            tabBar: $.tabgroup,
            imagePath: "/tabbar/",
            width: 80,
            height: 49,
            items: [ {
                image: "moment.png",
                selected: "moment_select.png"
            }, {
                image: "search.png",
                selected: "search_select.png"
            }, {
                image: "map.png",
                selected: "map_select.png"
            }, {
                image: "info.png",
                selected: "info_select.png"
            } ]
        });
    }
    function sleep(miliseconds) {
        var currentTime = new Date().getTime();
        while (currentTime + miliseconds >= new Date().getTime()) ;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
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
    var __alloyId14 = [];
    $.__views.__alloyId15 = Alloy.createController("moment", {
        id: "__alloyId15"
    });
    $.__views.tab1 = Ti.UI.createTab({
        window: $.__views.__alloyId15.getViewEx({
            recurse: true
        }),
        id: "tab1"
    });
    __alloyId14.push($.__views.tab1);
    $.__views.__alloyId17 = Alloy.createController("all", {
        id: "__alloyId17"
    });
    $.__views.tab2 = Ti.UI.createTab({
        window: $.__views.__alloyId17.getViewEx({
            recurse: true
        }),
        id: "tab2"
    });
    __alloyId14.push($.__views.tab2);
    $.__views.__alloyId19 = Alloy.createController("map", {
        id: "__alloyId19"
    });
    $.__views.tab3 = Ti.UI.createTab({
        window: $.__views.__alloyId19.getViewEx({
            recurse: true
        }),
        id: "tab3"
    });
    __alloyId14.push($.__views.tab3);
    $.__views.__alloyId20 = Alloy.createController("info", {
        id: "__alloyId20"
    });
    $.__views.tab4 = Ti.UI.createTab({
        window: $.__views.__alloyId20.getViewEx({
            recurse: true
        }),
        id: "tab4"
    });
    __alloyId14.push($.__views.tab4);
    $.__views.tabgroup = Ti.UI.createTabGroup({
        tabs: __alloyId14,
        id: "tabgroup",
        backgroundColor: "white"
    });
    $.__views.tabgroup && $.addTopLevelView($.__views.tabgroup);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var happyhour = Alloy.createCollection("happyhour");
    var etablishment = Alloy.createCollection("etablishment");
    var activityIndicator = Ti.UI.createActivityIndicator({
        color: "gray",
        message: "Chargement...",
        style: Ti.UI.ActivityIndicatorStyle.DARK,
        top: "45%",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE
    });
    var chargement = Ti.UI.createWindow({
        backgroundColor: "white",
        fullscreen: true
    });
    chargement.add(activityIndicator);
    $.tabgroup.add(chargement);
    chargement.open();
    activityIndicator.show();
    happyhour.deleteAll();
    etablishment.deleteAll();
    if (Alloy.Globals.firstOpening) {
        if (happyhour.count() || etablishment.count()) {
            if (!Alloy.Globals.hasConnection()) {
                var dialog = Ti.UI.createAlertDialog({
                    message: "Afin de voir les Happy hours Toulousains, veuillez vous connecter à internet au moins une fois.",
                    ok: "Je comprends",
                    title: "Attention"
                });
                dialog.show();
            }
        } else if (Alloy.Globals.hasConnection()) {
            Ti.API.info("Get All data");
            getAllData();
        } else {
            var dialog = Ti.UI.createAlertDialog({
                message: "Afin de voir les Happy hours Toulousains, veuillez vous connecter à internet au moins une fois.",
                ok: "Je comprends",
                title: "Attention"
            });
            dialog.show();
        }
        setTimeout(function() {
            Ti.API.info("End download / end pub ");
            Alloy.Globals.endDownload = false;
            activityIndicator.hide();
            chargement.close();
            openTab();
            Alloy.Globals.firstOpening = false;
        }, 3e3);
    } else {
        sleep(1e3);
        activityIndicator.hide();
        chargement.close();
        openTab();
    }
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;