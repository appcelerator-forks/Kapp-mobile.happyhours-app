
/////////////////////////////////////////////////////////
/////// GO TO PARTNER VIEW ////////
/////////////////////////////////////////////////////////

function goEtablishment() {

	var etablishmentView = Alloy.createController('etablishment', {
		'etablishmentId'	: 1,
		'etablishmentTitle'	: "test"
	}).getView();
	
	//etablishmentView.left = 250;
	etablishmentView.open();

}