$.tabgroup.open();

var ctb = new Alloy.Globals.CustomTabBar({
    tabBar: $.tabgroup,
    imagePath: 'iphone/images/',
    width: 80,
    height: 40,
    items: [
        { image: 'home.png', selected: 'home_over.png' },
        { image: 'cloud.png', selected: 'cloud_over.png' },
        { image: 'home.png', selected: 'home_over.png' },
        { image: 'cloud.png', selected: 'cloud_over.png' }
    ]
});
