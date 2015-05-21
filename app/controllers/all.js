var etablishment = Alloy.createCollection('etablishment');

 if(!etablishment.count()){
 	Ti.API.info("INFO etablishment number : ");
 	Ti.API.info(etablishment.count());
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