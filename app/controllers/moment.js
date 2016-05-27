if (Ti.Platform.name === 'iPhone OS'){
  style = Ti.UI.iPhone.ActivityIndicatorStyle.DARK;
}
else {
  style = Ti.UI.ActivityIndicatorStyle.DARK;
}


$.moment.setTitleControl(Ti.UI.createLabel({
  color : "#ffffff",
  font: {
    fontFamily: 'TitilliumWeb-Regular',
    fontSize: 20
  },
	text: "En ce moment"
}));


//Filter

function haveHappyFilter(collection) {

    return collection.where({
        haveHappy : 'true'
    });
}


function myRefresher(e) {
	Ti.API.info("on refresh");

    if (!Alloy.Globals.hasConnection()) {
        var dialog = Ti.UI.createAlertDialog({
            message : 'Veuillez vous connecter à internet. ',
            ok      : 'Je comprends',
            title   : 'Attention'
        });
        dialog.show();
    }else{
    	//////////////////////////////////////
		var happyhour = Alloy.Collections.instance('happyhour');
		var etablishment = Alloy.Collections.instance('etablishment');
		happyhour.deleteAll();
		etablishment.deleteAll();

		Alloy.Globals.getAllData();

	 }

	e.hide();
}

function goEtablishment() {


	var etablishmentView = Alloy.createController('etablishment', {
		'etablishmentId'	: this.idEtablishment,
		'etablishmentTitle'	: this.titleEtablishment
	}).getView();

}
