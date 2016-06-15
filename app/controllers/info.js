$.info.setTitleControl(Ti.UI.createLabel({
  color: "#ffffff",
  font: {
    fontFamily: 'TitilliumWeb-Regular',
    fontSize: 20
  },
	text: "Informations"
}));

$.buttonMail.addEventListener('click', function (e) {

    var emailDialog = Titanium.UI.createEmailDialog();
    emailDialog.subject = "Happyhour app";
    emailDialog.toRecipients = ['gaetankueny@gmail.com'];
    emailDialog.messageBody = '';

    emailDialog.open();
});
