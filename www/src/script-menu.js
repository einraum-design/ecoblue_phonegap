// MENU

var isMenu = false
var menu = $("#menu")
var menuBg = $("#darken")



$( document ).ready(function() {
//document.addEventListener("deviceready", function() {
	console.log("deviceready");
	$("#menu #dots").on("click", function (){
		console.log("click menu")
		if (isMenu == false){
			showMenu(true)
		} else {
			console.log("b")
			showMenu(false)
		}
	})

	$("#menu #option1").on("click", function (){
		// window.open("calculator.html", "_self")
		$("#plantBody").css({"display": "none"})
		$("#calcBody").css({"display": "block"})
		$("#menu #option1").css({"display": "none"})
		$("#menu #option3").css({"display": "block"})
		showMenu(false)
	})


	    $("#menu #option2").on("click", function (){
			console.log(">> exit")
			//window.top.close()
			// if (navigator.app) {
			//    navigator.app.exitApp();
			// } else if (navigator.device) {
			//     navigator.device.exitApp();
			// } else {
			//     window.close();
			// }
			//$("#menu #option2").html("FUCKYOU")
			
			setTimeout( function () {
				//navigator.app.exitApp();
				console.log("closing");
				

				if (navigator.app) {
				    navigator.app.exitApp();
				} else if (navigator.device) {
				    navigator.device.exitApp();
				} else {
				    window.close();
				}
				
			}, 150 );
		})


	$("#menu #option3").on("click", function (){
		// window.open("index.html", "_self")
		$("#calcBody").css({"display": "none"})
		$("#plantBody").css({"display": "block"})
		$("#menu #option3").css({"display": "none"})
		$("#menu #option1").css({"display": "block"})
		showMenu(false)
	})

	menuBg.on("click", function (){
		if (isMenu == true){
			showMenu(false)
		}
	})

	function showMenu(on){
		if (on){
			isMenu = true
			menu.animate({"margin-top": 20}, 300)
			menuBg.fadeIn(200)
			$("#menu #dots h1").css({"pointer-events": "none"})
		} else {
			isMenu = false
			menu.animate({"margin-top": -90}, 300)
			menuBg.fadeOut(200)
			$("#menu #dots h1").css({"pointer-events": "auto"})
		}
	}
})