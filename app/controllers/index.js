getAllData();

$.tabgroup.open();

//We create our TabBar (see alloy.js for more informations about our TabBar)
new Alloy.Globals.CustomTabBar({
    tabBar: $.tabgroup,
    imagePath: '/tabbar/',
    width: 80,
    height: 49,
    items: [
        { image: 'moment.png', selected: 'moment_select.png' },
        { image: 'search.png', selected: 'search_select.png' },
        { image: 'map.png', selected: 'map_select.png' },
        { image: 'info.png', selected: 'info_select.png' }
    ]
    // TODO : Change images
});