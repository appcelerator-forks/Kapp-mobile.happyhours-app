var etablishment = Alloy.createCollection('etablishment');

 if(!etablishment.count()){
 	Ti.API.info("INFO : we have no etablishment data ");
 } else {
 	
 	displayAllEtablishment();
 }

 /**
 * fetch to the view all etablishment 
 *
 * @return void
 */
function displayAllEtablishment() {

	Alloy.Collections.etablishment.fetch();
}