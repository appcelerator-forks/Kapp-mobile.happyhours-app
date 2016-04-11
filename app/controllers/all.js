
/////////////////////////////////////////////////////////
/////// GO TO PARTNER VIEW ////////
/////////////////////////////////////////////////////////
Alloy.Collections.etablishment.fetch();

$.all.setTitleControl(Ti.UI.createLabel({
  color: "#ffffff",
  font: {
    fontFamily: 'TitilliumWeb-Regular',
    fontSize: 20
  },
	text: "Happy Hours"
}));

function goEtablishment() {

	var etablishmentView = Alloy.createController('etablishment', {
		'etablishmentId'	: this.idEtablishment,
		'etablishmentTitle'	: this.titleEtablishment
	}).getView();

}
