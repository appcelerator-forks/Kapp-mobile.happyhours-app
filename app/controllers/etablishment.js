var args 			=  arguments[0] || {};
var etablishmentId 		=  args.etablishmentId;
var etablishmentTitle 	=  args.etablishmentTitle;

/////////////////////////////////////////////////////////
////////////////////SQL//////////////////////////////////
/////////////////////////////////////////////////////////
var db = Ti.Database.open('happyhourdb');

var happyhourData = db.execute("SELECT * FROM happyhours WHERE id_etablishment = " +  etablishmentId);
var happy = happyhourData.fieldByName('text');
var hour = happyhourData.fieldByName('hours');
var hour = hour.replace("/", " à ");

var db = Ti.Database.open('etablishmentdb');

var etablishmentData = db.execute("SELECT * FROM etablishment WHERE id = " +  etablishmentId);
var adress = etablishmentData.fieldByName('adress');

db.close();

$.etablishment.left = 250;
$.etablishment.open();
$.etablishment.animate({
    left: 0,
    duration:600
}, function(){});

/////////////////////////////////////////////////////////
////////////////////VIEW/////////////////////////////////
/////////////////////////////////////////////////////////
var controlView = Ti.UI.createView({
	backgroundColor:'white',
    height: "14%",
    width: "100%",
    top : "0%"
});
var adressView = Ti.UI.createView({
	backgroundColor:'white',
    height: "13%",
    width: "100%",
    top : "14%"
});
var blackView1 = Ti.UI.createView({
	backgroundColor:'gray',
    height: "0.18%",
    width: "100%",
    top : "27%"
});
var vibesView = Ti.UI.createView({
	backgroundColor:'white',
    height: "10%",
    width: "100%",
    top : "27.18%"
});
var blackView2 = Ti.UI.createView({
	backgroundColor:'gray',
    height: "0.18%",
    width: "100%",
    top : "37.18%"
});
var happyView = Ti.UI.createView({
	backgroundColor:'white',
    height: "20.70%",
    width: "100%",
    top : "37.36%"
});
var Cnull = Ti.UI.createView({
	backgroundColor:'white',
    height: "42%",
    width: "100%",
    top : "57%"
});

/////////////////////////////////////////////////////////
////////////////////BUTTON///////////////////////////////
/////////////////////////////////////////////////////////
var btnBack = Ti.UI.createButton({ 
	title: '<Retour', 
	color: "black", 
	backgroundImage: "none",
	top: "53%",
	left : "5%"
});

/////////////////////////////////////////////////////////
////////////////////LABEL////////////////////////////////
/////////////////////////////////////////////////////////
var labelTitle = Ti.UI.createLabel({ 
	text: etablishmentTitle,
	color: "black", 
	top: "60%",
	left : "37%"
});
var labeladress = Ti.UI.createLabel({ 
	text: adress, 
	textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
	color: "black"
});
var labelVibes = Ti.UI.createLabel({ 
	text: "Happy Hour ", 
	color: "black", 
	top: "28%",
	left : "2%"
});
var labelDay = Ti.UI.createLabel({   
	top: "30%",
	left : "1%",
	width : "15%",
});
var labelTextDay = Ti.UI.createLabel({
	text: "L   M   M   J   V   S  D ",
	textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
	color: "black",
	font: {
		fontSize: 11
	}

});
labelDay.add(labelTextDay);

var labelHour = Ti.UI.createLabel({ 
	top: "35%",
	right : "0%",
	width : "16%",
});
var labeltextHour = Ti.UI.createLabel({ 
	text: "De "+hour, 
	color: "black", 
	textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
	font: {
		fontSize: 11
	}
});
labelHour.add(labeltextHour);

var labelHappy = Ti.UI.createLabel({ 
	text: happy , 
	textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
	width : "60%",
	color: "black",
	font: {
		fontSize: 14
	},
	borderRadius: 6
});

/////////////////////////////////////////////////////////
//////////////////ANIMATION//////////////////////////////
/////////////////////////////////////////////////////////
var slideRight = Ti.UI.createAnimation();
    slideRight.right = 320;
    slideRight.duration = 300;

/////////////////////////////////////////////////////////
////////////////////EVENT////////////////////////////////
/////////////////////////////////////////////////////////
btnBack.addEventListener('click', function(){ 

    setTimeout(function(e){
    	$.etablishment.left = 320,
        $.etablishment.close(slideRight);
    }, 300);

});

/////////////////////////////////////////////////////////
//////////////////////ADD////////////////////////////////
/////////////////////////////////////////////////////////
Ti.API.info(happy);

controlView.add(btnBack);
controlView.add(labelTitle);

adressView.add(labeladress);

vibesView.add(labelVibes);

happyView.add(labelHappy);
happyView.add(labelHour);
happyView.add(labelDay);

$.etablishment.add(controlView);
$.etablishment.add(adressView);
$.etablishment.add(blackView1);
$.etablishment.add(vibesView);
$.etablishment.add(blackView2);
$.etablishment.add(happyView);
$.etablishment.add(Cnull);

$.etablishment.open();

function closeWindow(){
	$.etablishment.close();
}
