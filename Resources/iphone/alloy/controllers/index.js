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
        id: "tab1",
        title: "Moment"
    });
    __alloyId14.push($.__views.tab1);
    $.__views.__alloyId17 = Alloy.createController("all", {
        id: "__alloyId17"
    });
    $.__views.tab2 = Ti.UI.createTab({
        window: $.__views.__alloyId17.getViewEx({
            recurse: true
        }),
        id: "tab2",
        title: "All"
    });
    __alloyId14.push($.__views.tab2);
    $.__views.__alloyId19 = Alloy.createController("map", {
        id: "__alloyId19"
    });
    $.__views.tab3 = Ti.UI.createTab({
        window: $.__views.__alloyId19.getViewEx({
            recurse: true
        }),
        id: "tab3",
        title: "Map"
    });
    __alloyId14.push($.__views.tab3);
    $.__views.__alloyId20 = Alloy.createController("info", {
        id: "__alloyId20"
    });
    $.__views.tab4 = Ti.UI.createTab({
        window: $.__views.__alloyId20.getViewEx({
            recurse: true
        }),
        id: "tab4",
        title: "Info"
    });
    __alloyId14.push($.__views.tab4);
    $.__views.tabgroup = Ti.UI.createTabGroup({
        tabs: __alloyId14,
        id: "tabgroup"
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
    $.tabgroup.open();
    chargement.add(activityIndicator);
    Ti.API.info("Begin download / end pub ");
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
            Alloy.Globals.getAllData();
        } else {
            var dialog = Ti.UI.createAlertDialog({
                message: "Afin de voir les Happy hours Toulousains, veuillez vous connecter à internet au moins une fois.",
                ok: "Je comprends",
                title: "Attention"
            });
            dialog.show();
        }
        setTimeout(function() {
            Ti.API.info("End download/end pub ");
            Alloy.Globals.endDownload = false;
            activityIndicator.hide();
            chargement.close();
            openTab();
            Alloy.Globals.firstOpening = false;
        }, 3e3);
    } else setTimeout(function() {
        activityIndicator.hide();
        chargement.close();
        openTab();
    }, 1e3);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;