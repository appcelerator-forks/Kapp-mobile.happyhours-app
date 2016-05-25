// var pageColor = "#c99ed5";
//
// PagingControl = function(scrollableView){
// 	var container = Titanium.UI.createView({
// 		height: 30,
// 		top : "80%",
// 		width: 'auto',
// 		left: "45%",
// 	});
// 	// Keep a global reference of the available pages
// 	var numberOfPages = scrollableView.getViews().length;
//
// 	console.log(numberOfPages);
//
// 	var pages = []; // without this, the current page won't work on future references of the module
//
// 	// Go through each of the current pages available in the scrollableView
// 	for (var i = 0; i < numberOfPages; i++) {
// 		var page = Titanium.UI.createView({
// 			borderRadius: 4,
// 			width: 8,
// 			height: 8,
// 			left: 15 * i,
// 			backgroundColor: pageColor,
// 			opacity: 0.5,
// 		});
// 		// Store a reference to this view
// 		pages.push(page);
// 		// Add it to the container
// 		container.add(page);
// 	}
//
// 	// Mark the initial selected page
// 	pages[scrollableView.getCurrentPage()].setOpacity(1);
//
// 	console.log(pages[scrollableView.getCurrentPage()]);
//
// 	// Callbacks
// 	onScroll = function(event){
// 		// Go through each and reset it's opacity
// 		for (var i = 0; i < numberOfPages; i++) {
// 			pages[i].setOpacity(0.5);
//
// 		}
//
// 		console.log("coucou");
// 		// Bump the opacity of the new current page
// 		pages[event.currentPage].setOpacity(1);
//
// 	};
//
// 	// Attach the scroll event to this scrollableView, so we know when to update things
// 	scrollableView.addEventListener("scroll", onScroll);
//
// 	return container;
// };
//
// module.exports = PagingControl;
