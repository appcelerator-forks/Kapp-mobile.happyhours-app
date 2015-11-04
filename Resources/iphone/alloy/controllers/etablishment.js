function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "etablishment";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        {
            __processArg(arguments[0], "__parentSymbol");
        }
        {
            __processArg(arguments[0], "$model");
        }
        {
            __processArg(arguments[0], "__itemTemplate");
        }
    }
    var $ = this;
    var exports = {};
    $.__views.etablishment = Ti.UI.createWindow({
        barColor: "#e3004e",
        titleAttributes: {
            color: "white",
            fontWeight: "bold"
        },
        height: "100%",
        width: "100%",
        id: "etablishment",
        title: "Etablishment"
    });
    $.__views.etablishment && $.addTopLevelView($.__views.etablishment);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var etablishmentId = args.etablishmentId;
    var etablishmentTitle = args.etablishmentTitle;
    var db = Ti.Database.open("happyhourdb");
    var happy = new Array();
    var hour = new Array();
    var day = new Array();
    var i = 0;
    var happyhourData = db.execute("SELECT * FROM happyhours WHERE id_etablishment = " + etablishmentId);
    while (happyhourData.isValidRow()) {
        happy.push(happyhourData.fieldByName("text"));
        hour.push(happyhourData.fieldByName("hours"));
        day.push(happyhourData.fieldByName("day"));
        hour[i] = hour[i].replace("/", " à ");
        happyhourData.next();
        i++;
    }
    var db = Ti.Database.open("etablishmentdb");
    var etablishmentData = db.execute("SELECT * FROM etablishment WHERE id = " + etablishmentId);
    var adress = etablishmentData.fieldByName("adress");
    db.close();
    $.etablishment.left = 250;
    $.etablishment.open();
    $.etablishment.animate({
        left: 0,
        duration: 30
    }, function() {});
    var controlView = Ti.UI.createView({
        backgroundColor: "white",
        height: "14%",
        width: "100%",
        top: "0%"
    });
    var adressView = Ti.UI.createView({
        backgroundColor: "white",
        height: "13%",
        width: "100%",
        top: "14%"
    });
    var blackView1 = Ti.UI.createView({
        backgroundColor: "gray",
        height: "0.18%",
        width: "100%",
        top: "26.9%"
    });
    var vibesView = Ti.UI.createView({
        backgroundColor: "white",
        height: "10%",
        width: "100%",
        top: "27.18%"
    });
    var blackView2 = Ti.UI.createView({
        backgroundColor: "gray",
        height: "0.18%",
        width: "100%",
        top: "37.18%"
    });
    var btnBack = Ti.UI.createButton({
        title: "<Retour",
        color: "black",
        backgroundImage: "none",
        top: "53%",
        left: "5%"
    });
    var labelTitle = Ti.UI.createLabel({
        text: etablishmentTitle,
        color: "black",
        top: "60%",
        left: "37%"
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
        left: "2%"
    });
    var labelVibes = Ti.UI.createLabel({
        text: "sourire ",
        color: "black",
        top: "28%",
        right: "2%"
    });
    var labelDay = new Array();
    var labelHour = new Array();
    var labelHappy = new Array();
    var oneHappy = new Array();
    var labelTextDay;
    var labeltextHour;
    var StyledLabel = require("ti.styledlabel");
    for (var j = 0; j < hour.length; j++) {
        oneHappy.push(Ti.UI.createTableViewRow({
            backgroundColor: "white",
            className: "row",
            height: "30%"
        }));
        labelDay.push(Ti.UI.createLabel({
            top: "22%",
            left: "1%",
            width: "15%"
        }));
        var happyText = '<p style="text-align: center; font-size: 11px;">';
        day[j] = day[j].toString();
        happyText += day[j].match(/1/) ? '<span style= "color: orange;">L</span>' : "<span>L</span>";
        happyText += day[j].match(/2/) ? '<span style= "color: orange;">M</span>' : "<span>M</span>";
        happyText += day[j].match(/3/) ? '<span style= "color: orange;">M</span><br/>' : "<span>M</span><br/>";
        happyText += day[j].match(/4/) ? '<span style= "color: orange;">J</span>' : "<span>J</span>";
        happyText += day[j].match(/5/) ? '<span style= "color: orange;">V</span>' : "<span>V</span>";
        happyText += day[j].match(/6/) ? '<span style= "color: orange;">S</span><br/>' : "<span>S</span><br/>";
        happyText += day[j].match(/7/) ? '<span style= "color: orange;">D</span>' : "<span>D</span>";
        happyText += "</p>";
        labelTextDay = StyledLabel.createLabel({
            html: happyText
        });
        labelDay[j].add(labelTextDay);
        labelHour.push(Ti.UI.createLabel({
            top: "23%",
            right: "0%",
            width: "16%"
        }));
        labeltextHour = Ti.UI.createLabel({
            text: "De " + hour[j],
            color: "black",
            textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
            font: {
                fontSize: 11
            }
        });
        labelHour[j].add(labeltextHour);
        labelHappy.push(Ti.UI.createLabel({
            text: happy[j],
            textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
            top: "21%",
            width: "60%",
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
    var slideRight = Ti.UI.createAnimation();
    slideRight.right = 320;
    slideRight.duration = 30;
    btnBack.addEventListener("click", function() {
        setTimeout(function() {
            $.etablishment.left = 320, $.etablishment.close(slideRight);
        }, 30);
    });
    controlView.add(btnBack);
    controlView.add(labelTitle);
    adressView.add(labeladress);
    vibesView.add(labelNumber);
    vibesView.add(labelStar);
    vibesView.add(labelVibes);
    var happyViewScroll = Ti.UI.createTableView({
        backgroundColor: "white",
        height: "62.63%",
        width: "100%",
        top: "37.36%",
        data: oneHappy
    });
    $.etablishment.add(controlView);
    $.etablishment.add(adressView);
    $.etablishment.add(blackView1);
    $.etablishment.add(vibesView);
    $.etablishment.add(blackView2);
    $.etablishment.add(happyViewScroll);
    $.etablishment.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;