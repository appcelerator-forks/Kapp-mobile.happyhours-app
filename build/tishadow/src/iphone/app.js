var Alloy = __p.require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

Alloy.Globals.json = "";

Alloy.Globals.dataEtablishment = {};

Alloy.Globals.CustomTabBar = function(settings) {
    var tabBarItems = [];
    var tabCurrent = 0;
    var resetTabs = function() {
        for (var i = 0; i < tabBarItems.length; i++) tabBarItems[i].image = __p.file(settings.imagePath + settings.items[i].image);
    };
    var assignClick = function(tabItem) {
        tabItem.addEventListener("click", function(e) {
            var pos = e.source.pos;
            if (tabCurrent == pos) return false;
            settings.tabBar.tabs[pos].active = true;
            tabCurrent = pos;
            resetTabs();
            tabBarItems[pos].image = __p.file(settings.imagePath + settings.items[pos].selected);
        });
    };
    var customTabBar = __ui.createWindow({
        height: settings.height,
        bottom: 0
    });
    for (var i = 0; i < settings.items.length; i++) {
        tabBarItems[i] = Titanium.UI.createImageView({
            backgroundImage: __p.file(settings.imagePath + settings.items[i].image),
            width: settings.width,
            height: settings.height,
            left: settings.width * i
        });
        tabBarItems[i].pos = i;
        assignClick(tabBarItems[i]);
        customTabBar.add(tabBarItems[i]);
    }
    customTabBar.open();
    resetTabs();
    tabBarItems[0].image = __p.file(settings.imagePath + settings.items[0].selected);
    return {
        hide: function() {
            customTabBar.hide();
        },
        show: function() {
            customTabBar.show();
        }
    };
};

Alloy.Globals.hasConnection = function() {
    if (Ti.Network.networkType === Ti.Network.NETWORK_NONE) return false;
    return true;
};

Alloy.createController("index");