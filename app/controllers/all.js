
/////////////////////////////////////////////////////////
/////// GO TO PARTNER VIEW ////////
/////////////////////////////////////////////////////////
var seachHide = true;

$.all.setTitleControl(Ti.UI.createLabel({
  color: "#ffffff",
  font: {
    fontFamily: 'TitilliumWeb-Regular',
    fontSize: 20
  },
	text: "Happy Hours"
}));

searchBar = Ti.UI.createSearchBar({
    barColor        : "#BAB9BF",
     borderColor    : "#BAB9BF",
     height         : "43",
     top            : "0",
     hintText       : "Rechercher"
});

$.partnerscontent.setSearch(searchBar);

function goEtablishment() {

	var etablishmentView = Alloy.createController('etablishment', {
		'etablishmentId'	: this.idEtablishment,
		'etablishmentTitle'	: this.titleEtablishment
	}).getView();

}
