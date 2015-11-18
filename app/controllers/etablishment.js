var args 			=  arguments[0] || {};
var etablishmentId 		=  args.etablishmentId;
var etablishmentTitle 	=  args.etablishmentTitle;

/////////////////////////////////////////////////////////
////////////////////SQL//////////////////////////////////
/////////////////////////////////////////////////////////
var db = Ti.Database.open('happyhourdb');
var happy  = new Array();
var hour  = new Array();
var day = new Array();
var i =0;

var happyhourData = db.execute("SELECT * FROM happyhour WHERE id_etablishment = " +  etablishmentId);
while (happyhourData.isValidRow()){
	happy.push(happyhourData.fieldByName('text'));
	hour.push(happyhourData.fieldByName('hours'));
	day.push(happyhourData.fieldByName('day'));
	hour[i] = hour[i].replace("/", " à ");
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
    duration:30
}, function(){});

/////////////////////////////////////////////////////////
////////////MAIN VIEW ///////////////////////////////////
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
    top : "26.9%"
});
/*var vibesView = Ti.UI.createView({
	backgroundColor:'white',
    height: "10%",
    width: "100%",
    top : "27.18%"
});*/
var blackView2 = Ti.UI.createView({
	backgroundColor:'gray',
    height: "0.18%",
    width: "100%",
    top : "37.18%"
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
var btnGoToMap = Ti.UI.createButton({ 
	title: 'Map>', 
	color: "black", 
	backgroundImage: "none",
	top: "53%",
	right : "5%"
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

////////////////////////////////////////////////////////
///////////////////VIEWS Happy Hours///////////////////
//////////////////////////////////////////////////////
var labelDay = new Array();
var labelHour = new Array();
var labelHappy = new Array();
var oneHappy = new Array();

var labelTextDay;
var labeltextHour;


var StyledLabel = require('ti.styledlabel');



for (var j = 0; j<hour.length; j++) {
	
	oneHappy.push(Ti.UI.createTableViewRow({
		backgroundColor:'white',
		className: 'row',
		height: "30%",
		selectedBackgroundColor: "Transparent"
	}));

	labelDay.push(Ti.UI.createLabel({   
		top: "22%",
		left : "1%",
		width : "15%"
	}));


	var happyText = '<p style="text-align: center; font-size: 11px;">';

	day[j]= day[j].toString();

	if(day[j].match(/1/)){
		happyText+='<span style= "color: orange;">L</span>';
	}else{
		happyText+='<span>L</span>';
	}
	if(day[j].match(/2/)){
		happyText+='<span style= "color: orange;">M</span>';
	}else{
		happyText+='<span>M</span>';
	}
	if(day[j].match(/3/)){
		happyText+='<span style= "color: orange;">M</span><br/>';
	}else{
		happyText+='<span>M</span><br/>';
	}
	if(day[j].match(/4/)){
		happyText+='<span style= "color: orange;">J</span>';
	}else{
		happyText+='<span>J</span>';
	}
	if(day[j].match(/5/)){
		happyText+='<span style= "color: orange;">V</span>';
	}else{
		happyText+='<span>V</span>';
	}
	if(day[j].match(/6/)){
		happyText+='<span style= "color: orange;">S</span><br/>';
	}else{
		happyText+='<span>S</span><br/>';
	}
	if(day[j].match(/7/)){
		happyText+='<span style= "color: orange;">D</span>';
	}else{
		happyText+='<span>D</span>';
	}

	happyText+='</p>';	

	labelTextDay = StyledLabel.createLabel({
		html: happyText
	});

	labelDay[j].add(labelTextDay);


	labelHour.push(Ti.UI.createLabel({ 
		top: "23%",
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
		top: "21%",
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
}
/////////////////////////////////////////////////////////
//////////////////ANIMATION//////////////////////////////
/////////////////////////////////////////////////////////
var slideRight = Ti.UI.createAnimation();
    slideRight.right = 320;
    slideRight.duration = 30;

/////////////////////////////////////////////////////////
////////////////////EVENT////////////////////////////////
/////////////////////////////////////////////////////////
btnBack.addEventListener('click', function(){ 

    setTimeout(function(e){
    	$.etablishment.left = 320,
        $.etablishment.close(slideRight);
    }, 30);

});

btnGoToMap.addEventListener('click', function(){
	
	Ti.API.info('hey');
	var mapView = Alloy.createController('mapEtablishment', {
		'etablishmentId' : etablishmentId
	}).getView();


});

/////////////////////////////////////////////////////////
//////////////////////ADD////////////////////////////////
/////////////////////////////////////////////////////////

controlView.add(btnBack);
controlView.add(labelTitle);
controlView.add(btnGoToMap);

adressView.add(labeladress);

/*vibesView.add(labelNumber);
vibesView.add(labelStar);
vibesView.add(labelVibes);*/


var happyViewScroll = Ti.UI.createTableView({
  	backgroundColor:'white',
  	height: "72.63%",
    width: "100%",
    top : "27.18%",
    data: oneHappy

});
/*for (var v = 0; v<hour.length; v++) {
	happyViewScroll.add(oneHappy[v]);
}*/

$.etablishment.add(controlView);
$.etablishment.add(adressView);
$.etablishment.add(blackView1);
//$.etablishment.add(vibesView);
//$.etablishment.add(blackView2);
$.etablishment.add(happyViewScroll);

$.etablishment.open();

function closeWindow(){
	$.etablishment.close();
}