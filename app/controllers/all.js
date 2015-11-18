
/////////////////////////////////////////////////////////
/////// GO TO PARTNER VIEW ////////
/////////////////////////////////////////////////////////

function goEtablishment() {

	var etablishmentView = Alloy.createController('etablishment', {
		'etablishmentId'	: this.idEtablishment,
		'etablishmentTitle'	: this.titleEtablishment
	}).getView();

}