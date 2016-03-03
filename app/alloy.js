Alloy.Globals.json;
Alloy.Globals.dataEtablishment  =  {};
Alloy.Globals.firstOpening  =   true;
Alloy.Globals.endDownload =   false;


Alloy.Globals.CustomTabBar = function(settings) {
	var tabBarItems = [];
	var	tabCurrent = 0;
	
	var resetTabs = function() {
		for(var i = 0; i < tabBarItems.length; i++) {
			tabBarItems[i].image = settings.imagePath + settings.items[i].image;
		}
	};
	
	var assignClick = function(tabItem) {
		tabItem.addEventListener('click', function(e) {
			// Just fetching the 'i' variable from the loop
			var pos = e.source.pos;

			if (tabCurrent == pos) {
				// TODO
				// Change back to root window, like the native tab action.
    			return false;
	        }		
			
			// Switch to the tab associated with the image pressed
			settings.tabBar.tabs[pos].active = true;
			tabCurrent = pos;

			
			// Reset all the tab images
			resetTabs();
			
			// Set the current tab as selected
			tabBarItems[pos].image = settings.imagePath + settings.items[pos].selected;		
		});
	};
	
	// Create the container for our tab items
	var customTabBar = Ti.UI.createWindow({
		height: settings.height,
		bottom: 0
	});
	
	
	for(var i = 0; i < settings.items.length; i++) {
		// Go through each item and create an imageView


		tabBarItems[i] = Titanium.UI.createImageView({
			// background is the default image
			backgroundImage: settings.imagePath + settings.items[i].image,
			
			width: settings.width,
			height: settings.height,
			left: settings.width * i
		});

		// Pass the item number (used later for changing tabs)
		tabBarItems[i].pos = i;
		assignClick(tabBarItems[i]);

		// Add to the container window
		customTabBar.add(tabBarItems[i]);
	}

	// Display the container and it's items
	customTabBar.open();

	// Set the first item as current :)
	resetTabs();
	tabBarItems[0].image = settings.imagePath + settings.items[0].selected;
	
	return {
		hide: function() { customTabBar.hide(); },
		show: function() { customTabBar.show(); }
	};
};


//we use RESTe to take data from API
/////////////////////////////////////////////////////////
/////////////Reste initilization////////////////////////
///////////////////////////////////////////////////////
var reste = require("reste");
var api = new reste();

api.config({
    debug: true, // allows logging to console of ::REST:: messages
    autoValidateParams: false, // set to true to throw errors if <param> url properties are not passed
    timeout: 4000,
    url: "http://happyhours-app.fr/api/",
    requestHeaders: {
        "X-Parse-Application-Id": "APPID",
        "X-Parse-REST-API-Key": "RESTID",
        "Content-Type": "application/json"
    },
    methods: [{
        name: "getEtablishments",
        post: "allEtablishment.php",
        onError: function(e, callback){
            alert("There was an error getting the courses!");
        }
    },{
    	name: "getHappyHours",
        post: "allHappyHours.php",
        onError: function(e, callback){
            alert("There was an error getting the courses!");
        }
    }],
    onError: function(e) {
        alert("There was an error accessing the API");
    },
    onLoad: function(e, callback) {
       callback(e);
    }
});


function getAllData(){
    api.getEtablishments(function(json){
    
        Ti.API.info("Get All Etablishment");
        var d   = new Date();
        var day = d.getDay() === 0 ? 7 : d.getDay();//day
       
        var havehappy;
        var data;
        var etablishment;
        
        //we use now in moment.js to display moment's information of the happy hours 
        var now = "not now";
                
         for (var i = 0; i < json.etablishment.length; i++) {
            data = json.etablishment[i];
            
             havehappy = "false";

            if (data.dayHappy.indexOf(day) >= 0) //Happy is today?
                havehappy = "true";

            etablishment = Alloy.createModel('etablishment', {
                id          : data.id, 
                name        : data.name,
                adress      : data.adress,
                gps         : data.gps,
                yelp_id     : data. yelp_id,
                city        : data.city,
                haveHappy   : havehappy,
                now         : now
            }); 

            etablishment.save();


        }
    });

    api.getHappyHours(function(json){
        
        Ti.API.info("Get All Happy");
        
        for (var i = 0; i < json.happyhour.length; i++) {
        
            var data    = json.happyhour[i];

            var happyhour = Alloy.createModel('happyhour', {
                id              : data.id, 
                id_etablishment : data.id_etablishment,
                day             : data.day,
                text            : data.text,
                hours           : data. hours

            }); 
            happyhour.save();          
        }
    });

    Alloy.Globals.endDownload = true;

    
}

/**
 * Check connection
 *
 * @return boolean
 */
Alloy.Globals.hasConnection = function hasConnection()
{
    if (Ti.Network.networkType === Ti.Network.NETWORK_NONE) return false;

    return true;
};