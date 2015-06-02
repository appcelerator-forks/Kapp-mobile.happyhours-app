var args 			=  arguments[0] || {};
var etablishmentId 		=  args.etablishmentId;
var etablishmentTitle 	=  args.etablishmentTitle;

/////////////////////////////////////////////////////////
////////////////////SQL//////////////////////////////////
/////////////////////////////////////////////////////////
var db = Ti.Database.open('happyhourdb');
var happy  = new Array();
var hour  = new Array();
var i =0;

var happyhourData = db.execute("SELECT * FROM happyhours WHERE id_etablishment = " +  etablishmentId);
while (happyhourData.isValidRow()){
	happy.push(happyhourData.fieldByName('text'));
	hour.push(happyhourData.fieldByName('hours'));
	hour[i] = hour[i].replace("/", " à ");
	Ti.API.info(i + " :  " +happy[i]);
	happyhourData.next();
	i++;
}

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
////////////MAIN VIEW AND SCROLL VIEW////////////////////
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
var happyView = Ti.UI.createScrollView({
  showVerticalScrollIndicator: true,
  showHorizontalScrollIndicator: true,
  backgroundColor:'white',
    height: "52.64%",
    width: "100%",
    top : "37.36%"
});

var Cnull = Ti.UI.createView({
	backgroundColor:'white',
    height: "10%",
    width: "100%",
    top : "90%"
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
var labelStar = Ti.UI.createLabel({ 
	text: "3 etoiles ", 
	color: "black", 
	textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER
});
var labelNumber = Ti.UI.createLabel({ 
	text: "3 personnes", 
	color: "black", 
	top: "28%",
	left : "2%"
});
var labelVibes = Ti.UI.createLabel({ 
	text: "sourire ", 
	color: "black", 
	top: "28%",
	right : "2%"
});

////////////////////////////////////////////////////////
///////////////////VIEWS Happy Hours///////////////////
//////////////////////////////////////////////////////
var labelDay = new Array();
var labelHour = new Array();
var labelHappy = new Array();
var oneHappy = new Array();

var labelTextDay;
var labeltextHour;

Ti.API.info("ici");
for (var j = 0; j<hour.length; j++) {
	Ti.API.info("laaaaa");
	oneHappy.push(Ti.UI.createView({
		backgroundColor:'white',
		height: "25%",
	    top : (j+4)+(j*25)+"%"
	}));

	labelDay.push(Ti.UI.createLabel({   
		top: "2%",
		left : "1%",
		width : "15%"
	}));

	labelTextDay = Ti.UI.createLabel({
		text: "L   M   M   J   V   S  D ",
		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		color: "black",
		font: {
			fontSize: 11
		}

	});
	labelDay[j].add(labelTextDay);


	labelHour.push(Ti.UI.createLabel({ 
		top: "3%",
		right : "0%",
		width : "16%",
	}));

	labeltextHour = Ti.UI.createLabel({ 
		text: "De "+hour[j], 
		color: "black", 
		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		font: {
			fontSize: 11
		}
	});
	labelHour[j].add(labeltextHour);


	labelHappy.push(Ti.UI.createLabel({ 
		text: happy[j] , 
		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		top: "1%",
		width : "60%",
		color: "black",
		font: {
			fontSize: 14
		},
		borderRadius: 6
	}));

	oneHappy[j].add(labelDay[j]);
	oneHappy[j].add(labelHour[j]);
	oneHappy[j].add(labelHappy[j]);
};
Ti.API.info("la");
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

controlView.add(btnBack);
controlView.add(labelTitle);

adressView.add(labeladress);

vibesView.add(labelNumber);
vibesView.add(labelStar);
vibesView.add(labelVibes);

Ti.API.info("normalement c'est bon");
for (var v = 0; v<hour.length; v++) {
	happyView.add(oneHappy[v]);
}
Ti.API.info("yes!");

$.etablishment.add(controlView);
$.etablishment.add(adressView);
$.etablishment.add(blackView1);
$.etablishment.add(vibesView);

$.etablishment.add(happyView);
$.etablishment.add(Cnull);

$.etablishment.open();

function closeWindow(){
	$.etablishment.close();
}
