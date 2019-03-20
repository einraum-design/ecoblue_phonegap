var _W = $(window).width()
var _H = $(window).height()

var ecoblueMode = false
var atPoint = 0
var detailScreen = false
var iAmAnAndroidTabletThatIsTooBadForSimpleFuckingAnimations = false
var pressingSwitch = false

var switch1 = $("#switch #option1")
var switch2 = $("#switch #option2")
var ecoBox = $("#ecoblueBox")
var easyColor = "rgba(240,240,242, 0.2)"

var plantVideo = $("#plantVideo")
plantVideo.hide()

var logo = $("#plantBody .logo")

var detailBubblePos
var detailOverlay = $("#detailOverlay")
var detailOverlayBg = $("#detailOverlayBg")
var detailBubble = $("#detailOverlay .bubble")
var detailVideo = [
	$(".detailVideo").eq(0),
	$(".detailVideo").eq(1),
]
var detailUl = $("#detailOverlay ul")
detailVideo[1].css({"opacity": 0})

var detailTextA = [
	["regular pressure", "higher energy consumption"],
	["heating of pipe bend, due to friction", "generation of fines and streamers", "wear of pipe surface"],
	["regular amount of waste product"],
	["regular amount of waste product", "pollution of silo walls and lid"],
	["regular conveying"],
	["regular amount of waste"],
]
var detailTextB = [
	["lower pressure", "less energy consumption"],
	["less friction, thus no heating of pipe bend", "minimize fines and streamers"],
	["minimal waste product", "exchange of conveying gas"],
	["minimal waste product", "less dust in silo", "less cleaning effort", "less risk for cross contamination"],
	["new FLUIDLIFT ecoblue® control technology"],
	["minimum amount of waste"],
]

var triggerPos = [
	[-465,279],
	[-21,271],
	[126,-319],
	[126,-155],
	[-322,279],
	[344,271],
]
$.each(triggerPos, function(i){
	$(".trigger").eq(i).css({"margin-left": triggerPos[i][0], "margin-top": triggerPos[i][1]})
	$(".trigger").eq(i).attr("i",i)
	
	detailBubble.eq(i).css({"margin-left": triggerPos[i][0]+5, "margin-top": triggerPos[i][1]+5})
})
//detailBubble.eq(4).css({"margin-left": -317, "margin-top": 284})


// function startVideo(){
// 	$("video").each(function(){
// 		$(this).get(0).play()	
// 	})
// }
// $("video").ready(function(){
// 	setTimeout(startVideo, 3000)
// })

// $("#plantVideo").on("loadeddata", function () {
// 	function startVideo(){
// 		$("#plantVideo").get(0).play()
// 	}	
// 	setTimeout(startVideo, 1000)
// })

var isClicked = false

$(".trigger").on("touchstart mousedown", function(){
	//$(this).attr("src", "tex/trigger.2_active.png")
	$(this).css({"transform": "scale(0.93)"})
	isClicked = true
	
}).on("touchend mouseup", function(e){
	if (isClicked == false){
		return true
	}
	
	isClicked = false
	
	$(this).css({"transform": "scale(1)"})
	
	if ($(this).parent().css("opacity") < 0.1){
		return false
	}
	$(this).attr("src", "tex/trigger.2.png")
	
	if (detailScreen == false){
		
		detailVideo[0].removeClass("a"+atPoint)
		detailVideo[1].removeClass("b"+atPoint)
		
		atPoint = $(this).attr("i")
		console.log(atPoint)
		
		//detailBubble.attr("src", "tex/detail/"+atPoint+".png")
		$.each(detailBubble, function(i){
			detailBubble.eq(i).css({"opacity": "0"})
		})
		detailBubble.eq(atPoint).css({"opacity": "1"})
		
		// detailVideo[0].attr("src", "tex/vid/"+atPoint+"a.gif")
		// detailVideo[1].attr("src", "tex/vid/"+atPoint+"b.gif")
		detailVideo[0].addClass("a"+atPoint)
		detailVideo[1].addClass("b"+atPoint)
		changeDetailText()
		
		detailScreen = true
		detailOverlay.animate({"opacity": 1}, 200)
		logo.fadeOut(300)
		//detailOverlay.css({"opacity": 1})
		
		detailOverlay.delay(20).queue(function(){
			$(this).css({"pointer-events": "auto"})	
		})
		detailBubblePos = $(this).offset()
		$.each(detailVideo, function(i){
			if (iAmAnAndroidTabletThatIsTooBadForSimpleFuckingAnimations){
				//detailVideo[i].stop().css({"width": 460, "height": 460, "left": "50%", "top": "50%"})
			} else {
				detailVideo[i].stop().css({"width": 70, "height": 70, "left": detailBubblePos.left+385, "top": detailBubblePos.top+235}).animate({"width": 460, "height": 460, "left": "50%", "top": "50%"})
			}
			
			//detailVideo[i].stop().removeClass("animateShit").css({"transform": "scale(0.15)", "left": detailBubblePos.left+45}).delay(100).queue(function(){
			// 	$(this).addClass("animateShit").css({"transform": "scale(1)", "left": "50%"})
			// })
		})
		
		// if (atPoint == 4){
		// 	switch1.animate({"opacity": 0.2})
		// }
	}
})

detailOverlay.on("mouseup touchend", function(){
	if (detailScreen == true && pressingSwitch == false){
		console.log("x")
		detailScreen = false
		
		detailOverlay.stop().animate({"opacity": 0}, 300, function(){
			$(this).css({"pointer-events": "none"})	
			$.each(detailVideo, function(i){
				//detailVideo[i].stop().removeClass("animateShit").css({"transform": "scale(0.15)", "left": "50%", "top": "50%"})
			})
		})
		
		logo.fadeIn(300)
		
		setTimeout(function(){
			changeEcoblueMode(false)
		},300);
		
		$.each(detailVideo, function(i){
			//detailVideo[i].stop().css({"left": detailBubblePos.left+190, "top": detailBubblePos.top+40, "transform": "scale(0.15)"})
			if (iAmAnAndroidTabletThatIsTooBadForSimpleFuckingAnimations){
			} else {
				detailVideo[i].stop().animate({"left": detailBubblePos.left+385, "top": detailBubblePos.top+235, "width": 70, "height": 70})
			}
		})
		
		// if (atPoint == 4){
		// 	switch1.animate({"opacity": 1})
		// }
	}
})


switch1.on("mousedown touchstart", function(){
	// if (atPoint == 4 && detailScreen == true){
	// 	return false
	// }
	pressingSwitch = true
	if (ecoblueMode == true){
		switch1.css({"background-color": easyColor})
	}
}).on("mouseup touchend", function(){
	// if (atPoint == 4 && detailScreen == true){
	// 	return false
	// }
	setTimeout(function(){
		pressingSwitch = false
	},100);
	
	changeEcoblueMode(false)
})

switch2.on("mousedown touchstart", function(){
	pressingSwitch = true
	if (ecoblueMode == false){
		switch2.css({"background-color": easyColor})
	}
}).on("mouseup touchend", function(){
	setTimeout(function(){
		pressingSwitch = false
	},100);
	
	changeEcoblueMode(true)
})


function changeEcoblueMode(e){
	ecoblueMode = e
	var s1 = switch1
	var s2 = switch2
	if (e == false){
		s1 = switch2
		s2 = switch1
		ecoBox.stop().animate({"opacity": 0})
	} else {
		if (atPoint == 4){
			ecoBox.stop().animate({"opacity": 1})
		}
	}
	
	s1.css({"background-color": "transparent"})
	s1.children("h1").css({"color": "white"})
	s2.css({"background-color": "white"})
	s2.children("h1").css({"color": "black"})
	
	switchVideo()
}

function switchVideo(){
	
	changeDetailText()
	
	if (ecoblueMode == false) {
		detailVideo[0].show()
		detailVideo[1].stop().animate({"opacity": 0}, 100)
	} else {
		//detailVideo[0].hide()
		detailVideo[1].stop().animate({"opacity": 1}, 100)
	}
}

function changeDetailText(){
	var texts = detailTextA[atPoint]
	if (ecoblueMode == true){
		texts = detailTextB[atPoint]
	}
	
	detailUl.html("")
	$.each(texts, function(i){
		detailUl.html(detailUl.html() + "<li>" + texts[i] +"</li>")
	})
	
	detailUl.css({"margin-top": -detailUl.height()/2 -16})
}













