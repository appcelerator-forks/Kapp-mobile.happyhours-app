
/////////////////////////////////////////////////////////
/////// GO TO PARTNER VIEW ////////
/////////////////////////////////////////////////////////
Alloy.Collections.etablishment.fetch();


function goEtablishment() {

	var etablishmentView = Alloy.createController('etablishment', {
		'etablishmentId'	: this.idEtablishment,
		'etablishmentTitle'	: this.titleEtablishment
	}).getView();

}