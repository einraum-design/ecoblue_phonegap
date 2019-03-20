var _W = $(window).width()
var _H = $(window).height()

var atMainDiv = -1

var heads = [
	$("#head1"),
	$("#head2"),
]

var mainDivs = [
	$("#qualityDiv"),
	$("#productivityDiv"),
	$("#wasteDiv"),
	$("#energyDiv"),
	$("#operationDiv")
]

var shadows = [
	$("#shadow2Left"),
	$("#shadow2Right"),
]

var tabs = $("#tabs").children().children("div")


var mouseDown = "mousedown"
var mouseUp = "mouseup"
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
	mouseDown = "touchstart"
	mouseUp = "touchend"
}


tabs.on(mouseDown, function(){
	//console.log($(this).index())
	$(this).addClass("pushed")
	
}).on(mouseUp, function(){

	
	hideEverything()
	if ($(this).index() == atMainDiv){
		atMainDiv = -1
		heads[0].animate({"padding": "30px 0px"}, 300)
		heads[1].animate({"padding": "30px 0px"}, 300)
		return false
	} else {
		heads[0].animate({"padding": "5px 0px"}, 300)
		heads[1].animate({"padding": "5px 0px"}, 300)
	}
	atMainDiv = $(this).index()
	
	
	$(this).addClass("active")
	if (atMainDiv == 3){
		mainDivs[atMainDiv].stop().animate({"height": 370}, 200)
	} else if (atMainDiv == 4){
		mainDivs[atMainDiv].stop().animate({"height": 200}, 200)
	} else {
		mainDivs[atMainDiv].stop().animate({"height": 300}, 200)	
	}
	
	shadows[0].css({"width": atMainDiv*20 + "%"})
	shadows[1].css({"width": 80 - atMainDiv*20 + "%"})
})


function hideEverything(){
	$.each(mainDivs, function(i){
		mainDivs[i].stop().animate({"height": 0}, 200)
		
		tabs.eq(i).removeClass("pushed")
		tabs.eq(i).removeClass("active")
	})
	
	shadows[0].css({"width": 0})
	shadows[1].css({"width": 0})
	
}

$("#touchBg").on("touchend", function(){
	console.log("bg")
	hideEverything()
	heads[0].animate({"padding": "30px 0px"}, 300)
	heads[1].animate({"padding": "30px 0px"}, 300)
})


$("input").keyup(function(event) {

	//awesomifyLocalString($(this));


    if (event.which === 13) {
      $(this).blur()
    }


})


function awesomify(number, noComma, exact){
	
	number = parseFloat(number)
	if (isNaN(number)){
		return(0)
	}
	
	if (number > 1000000 && exact != true){
		number = Math.round(number/1000)*1000
	}
	
	if (number < 1 && noComma != true){
		return (number.toFixed(1))
	} else if (number < 10 && noComma != true){
		return (number.toFixed(1))
	} else if (number < 100 && noComma != true){
		return (number.toFixed(1))
	} else if (number < 1000){
		return (number.toFixed(0))
	} else {
		//return (Math.round(number).toString().replace(/\B(?=(\d{3})+(?!\d))/g, "&thinsp;"))
		return (Math.round(number).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))
	}
}

// format nubers as text toLacalStirng("en-US");
function awesomifyLocalString(el){        
            
            // When user select text in the document, also abort.
            // var selection = window.getSelection().toString();
            // if ( selection !== '' ) {
            //     // return;
            // }
            
            // // When the arrow keys are pressed, abort.
            // if ( $.inArray( event.keyCode, [38,40,37,39] ) !== -1 ) {
            //     // return;
            // }
            
            
            // // Get the value.
            // var input = el.val();

            // console.log(input);
            
            // var input = input.replace(/[\D\s\._\-]+/g, "");

            // input = input ? parseInt( input, 10 ) : 0;

            // console.log(input);

            // el.val( function() {
            //             return ( input === 0 ) ? "" : input.toLocaleString( "en-US" );
            // } );
};


var bonus

function makeCalc(){
	// main
	productionTotalB = productionTotalA + productionTotalA*debottlenecking*0.01
	salesPriceTotalB = salesPriceTotalA + salesPriceTotalA*salesPriceIncrease*0.01
	profitTotalB = productionTotalB * (salesPriceTotalB - salesPriceTotalA + salesPriceTotalA*profitPercent*0.01) + wastePlus + operationPlus + energyPlus
	
	//waste
	if (wasteActive){
		finesAndStreamersA = productionTotalA*finesAndStreamersPercentA*0.01
		finesAndStreamersB = productionTotalB*finesAndStreamersPercentB*0.01
		disposalA = finesAndStreamersA*disposalCost
		disposalB = finesAndStreamersB*disposalCost
		bonus = (finesAndStreamersA-finesAndStreamersB)*salesPriceTotalB
		wastePlus = bonus+disposalA-disposalB
	}
	
	// productivity
	if (productivityActive){
		salesA = productionTotalA*salesPriceTotalA
		salesB = productionTotalB*salesPriceTotalB
	}
	
	// energy
	if (energyActive){
		installedCapacity = (specificCapacityA / operatingHours) * productionTotalA
		electricityPriceA = specificCapacityA * electricityCost / 100
		electricityPriceB = specificCapacityB * electricityCost / 100
		specificCapacityB = (installedCapacity * operatingHours * (100-decreaseEnergyPrice + debottlenecking)/100) / productionTotalB
		operatingCostsA = electricityPriceA * productionTotalA
		operatingCostsB = electricityPriceB * productionTotalB
		energyPlus = operatingCostsA-operatingCostsB
	}
}


function calculate(){
	
	makeCalc()
	makeCalc()
	makeCalc()

	console.log(electricityCost)
	
	// header
	if (profitTotalB > profitTotalA+1){
		productionTotalBH.fadeIn(300).next().fadeIn(300)
		salesPriceTotalBH.fadeIn(300).next().fadeIn(300)
		profitTotalH.fadeIn(300).next().fadeIn(300)
		productionTotalBH.html(awesomify(productionTotalB))
		salesPriceTotalBH.html(awesomify(salesPriceTotalB))
	}
	
	var salesPricePlusCache = salesPriceTotalB-salesPriceTotalA
	if (salesPricePlusCache == 0){
		salesPriceTotalPlus.html("")
	} else {
		salesPriceTotalPlus.html("+" + awesomify(salesPricePlusCache) + " $/t")
	}
	
	if (profitTotalB-profitTotalA < 1){
		profitTotalPlus.html("")
	} else {
		profitTotalPlus.html("+" + awesomify(profitTotalB-profitTotalA) + " $/y")
	}
	
	if (profitTotalB > profitTotalA+1){
		profitTotalH.html(awesomify(profitTotalB))
		var profitPercentB = profitTotalB/(productionTotalB*salesPriceTotalB)*100
		profitPercentBH.html(awesomify(profitPercentB))
	} else {
		productionTotalBH.hide().next().hide()
		salesPriceTotalBH.hide().next().hide()
		profitTotalH.hide().next().hide()
	}
	
	
	// quality
	salesPriceAH.html(awesomify(salesPriceTotalA))
	salesPriceBH.html(awesomify(salesPriceTotalB))
	salesPricePlus.html(salesPriceTotalPlus.html())
	if (salesPricePlusCache == 0){
		salesPricePlusTotal.html("")
		qualityPlusH.html("")
		qualityH.removeClass("withPlus")
	} else {
		// bei qualityTotal wird mit productionTotalA gerechnet, weil es sich sonst bei Productivity doppelt
		//qualityTotal = salesPricePlusCache*productionTotalA*profitPercent*0.01
		qualityTotal = (salesPriceTotalB - salesPriceTotalA) * productionTotalA
		salesPricePlusTotal.html("(+" + awesomify(qualityTotal) + "&thinsp;$/y)")
		qualityPlusH.html("+" + awesomify(qualityTotal) + "&thinsp;$/y")
		qualityH.addClass("withPlus")
	}
	
	// productivity	
	salesQuantityAH.html(awesomify(productionTotalA))
	salesQuantityBH.html(awesomify(productionTotalB))
	salesAH.html(awesomify(salesA))
	salesBH.html(awesomify(salesB))
	if (salesB-salesA == 0 || isNaN(salesB-salesA)){
		salesPlusTotal.html("")
		productivityPlusH.html("")
		productivityH.removeClass("withPlus")
	} else {
		//productivityPlus = (salesB-salesA)*profitPercent*0.01
		productivityPlus = (productionTotalB - productionTotalA) * salesPriceTotalB * profitPercent * 0.01
		salesPlusTotal.html("(+" + awesomify(productivityPlus) + "&thinsp;$/y)")
		productivityPlusH.html("+" + awesomify(productivityPlus) + "&thinsp;$/y")
		productivityH.addClass("withPlus")
	}
	if (productionTotalB-productionTotalA == 0){
		salesPlus.html("")
	} else {
		salesPlus.html("(+" + awesomify(productionTotalB-productionTotalA) + "&thinsp;t/y)")
	}
	
	// waste	
	finesAndStreamersAH.html(awesomify(finesAndStreamersA))
	finesAndStreamersBH.html(awesomify(finesAndStreamersB))
	disposalAH.html("" + awesomify(-disposalA))
	disposalBH.html("" + awesomify(-disposalB) + " + " + awesomify(bonus))
	finesAndStreamersPlus.html("-" + awesomify(finesAndStreamersA-finesAndStreamersB) + "&thinsp;t/y")
	if (wastePlus == 0 || isNaN(wastePlus)){
		wastePlusH.html("")
		wasteH.removeClass("withPlus")
	} else {
		disposalPlusTotal.html("(+" + awesomify(wastePlus) + "&thinsp;$/y)")
		wastePlusH.html("+" + awesomify(wastePlus) + "&thinsp;$/y")
		wasteH.addClass("withPlus")
	}

	// energy
	installedCapacityH.html(installedCapacity + "&thinsp;kW")
	salesQuantityEnergyAH.html(awesomify(productionTotalA))
	salesQuantityEnergyBH.html(awesomify(productionTotalB))
	specificCapacityBH.html(awesomify(specificCapacityB))
	electricityPriceAH.html(awesomify(electricityPriceA))
	electricityPriceBH.html(awesomify(electricityPriceB))
	operatingCostsAH.html(awesomify(operatingCostsA))
	operatingCostsBH.html(awesomify(operatingCostsB))
	
	if (electricityPriceB-electricityPriceA == 0 || isNaN(electricityPriceB-electricityPriceA)){
		operatingCostsPlus.html("")
	} else {
		operatingCostsPlus.html(awesomify(electricityPriceB-electricityPriceA) + "&thinsp;$/t")
	}
	if (energyPlus == 0 || isNaN(energyPlus)){
		operatingCostsPlusTotal.html("")
		energyPlusH.html("")
		energyH.removeClass("withPlus")
	} else {
		operatingCostsPlusTotal.html("(+" + awesomify(energyPlus) + "&thinsp;$/y)")
		energyPlusH.html("+" + awesomify(energyPlus) + "&thinsp;$/y")
		energyH.addClass("withPlus")
	}
	
	// operation
	if (operationPlus == 0){
		operationPlusH.html("")
		operationH.removeClass("withPlus")
	} else {
		operationPlusH.html("+" + awesomify(operationPlus) + "&thinsp;$/y")
		operationH.addClass("withPlus")
	}
}

function suggestProfit(){
	profitTotalA = salesPriceTotalA*productionTotalA*profitPercent*0.01
	if (productionTotal && salesPriceTotal){
		$("#profitTotalInput").html(awesomify(profitTotalA));
		//$("#profitTotalInput").html((profitTotalA).toFixed(0));
		//$("#profitTotalInput").val((profitTotalA).toFixed(0))
	}
}

function changeFixVariables(){
	profitPercentAH.html(awesomify(profitPercent))
	
	$("#dustCreationA").html(dustCreationA)
	$("#dustContentA").html(dustContentA)
	$("#dustCreationB").html(dustCreationB)
	$("#dustContentB").html(dustContentB)
	
	$("#decreaseEnergyPrice").html(decreaseEnergyPrice + "%")
	$("#operatingHours").html(operatingHours + "&thinsp;h/y")
	specificCapacityAH.html(specificCapacityA)
	
}


// MAIN

var profitPercent = 10 // änderbar
var profitPercentAH = $("#profitPercentA")
var profitPercentBH = $("#profitPercentB")

var productionCover = $("#productionCover")
var salesPriceCover = $("#salesPriceCover")

var productionTotalA = 0
var productionTotalB = 0
var productionTotalBH = $("#productionTotal")
var salesPriceTotalA = 0
var salesPriceTotalB = 0
var salesPriceTotalBH = $("#salesPriceTotal")
var salesPriceTotalPlus = $("#salesPriceTotalPlus")
var profitTotalA = 0
var profitTotalB = 0
var profitTotalH = $("#profitTotal")
var profitTotalPlus = $("#profitTotalPlus")

$("#productionTotalInput").on("input", function () {
    productionTotalA = parseFloat($(this).val())
    suggestProfit()
    calculate()
}).on("focus", function(){
	productionCover.hide()
}).on("focusout", function(){
	if (productionTotalA > 0){
		productionCover.html(awesomify(productionTotalA, false, true))
		productionCover.show()
	}
})

$("#salesPriceTotalInput").on("input", function () {
    salesPriceTotalA = parseFloat($(this).val())
    suggestProfit()
    calculate()
}).on("focus", function(){
	salesPriceCover.hide()
}).on("focusout", function(){
	if (salesPriceTotalA > 0){
		salesPriceCover.html(awesomify(salesPriceTotalA, false, true))
		salesPriceCover.show()
	}
})



$("#profitPercentSliderA").on("input", function () {
	profitPercent = parseFloat($(this).val());
	
	profitTotalA = (productionTotalA*salesPriceTotalA) * profitPercent/100.0;
	
	$("#profitPercentA").html(awesomify(profitPercent))
	$("#profitTotalInput").html(awesomify(profitTotalA));
    
    calculate()
})

/*$("#profitTotalInput").on("input", function () {
    profitTotalA = parseFloat($(this).val())
    profitPercent = 100*profitTotalA/(productionTotalA*salesPriceTotalA)
    if (profitPercent > 100){
    	profitPercent = 100
    }

    $("#profitPercentSliderA").slider('value',profitPercent);

    profitPercentAH.html(awesomify(profitPercent))

    calculate()
})*/



// QUALITY

var salesPriceIncrease = 0
var salesPriceIncreaseH = $("#salesPriceRangeValue")
var salesPriceAH = $("#salesPriceA")
var salesPriceBH = $("#salesPriceB")
var salesPricePlus = $("#salesPricePlus")
var salesPricePlusTotal = $("#salesPricePlusTotal")

var dustCreationA = 200	// änderbar
var dustCreationB = 20 // änderbar
var dustContentA = 40 // änderbar
var dustContentB = 10 // änderbar

$("#salesPriceRange").on("input", function () {
	qualityActive = true
    salesPriceIncrease = parseFloat($(this).val())
    salesPriceIncreaseH.html(awesomify(salesPriceIncrease))
    calculate()
})


// PRODUCTIVITY

var debottlenecking = 0
var debottleneckingH = $("#debottleneckingRangeValue")

var salesQuantityAH = $("#salesQuantityA")
var salesQuantityBH = $("#salesQuantityB")
var salesA = 0
var salesB = 0
var salesAH = $("#salesA")
var salesBH = $("#salesB")
var salesPlus = $("#salesPlus")
var salesPlusTotal = $("#salesPlusTotal")

$("#debottleneckingRange").on("input", function () {
	productivityActive = true
    debottlenecking = parseFloat($(this).val())
    debottleneckingH.html(awesomify(debottlenecking, true))
    calculate()
})


// WASTE

var disposalCost = 0
var finesAndStreamersA = 0
var finesAndStreamersB = 0
var disposalA = 0
var disposalB = 0

var finesAndStreamersPercentA = 0.016 // änderbar
var finesAndStreamersPercentB = 0.001 // änderbar

var finesAndStreamersAH = $("#finesAndStreamersA")
var finesAndStreamersBH = $("#finesAndStreamersB")
var finesAndStreamersPlus = $("#finesAndStreamersPlus")
var disposalAH = $("#disposalA")
var disposalBH = $("#disposalB")
var disposalPlusTotal = $("#disposalPlusTotal")

$("#disposalCostInput").on("input", function () {
	wasteActive = true
    disposalCost = parseFloat($(this).val())
    if (isNaN(disposalCost)){
    	disposalCost = 0
    }
    calculate()
})



// ENERGY

var electricityCost = 0
var installedCapacity = 0

var decreaseEnergyPrice = 20 // änderbar
var operatingHours = 8000 // änderbar
var specificCapacityA = 10 // änderbar

var installedCapacityH = $("#installedCapacity")
var salesQuantityEnergyAH = $("#salesQuantityEnergyA")
var salesQuantityEnergyBH = $("#salesQuantityEnergyB")
var specificCapacityAH = $("#specificCapacityA")
var specificCapacityBH = $("#specificCapacityB")
var electricityPriceAH = $("#electricityPriceA")
var electricityPriceBH = $("#electricityPriceB")
var operatingCostsAH = $("#operatingCostsA")
var operatingCostsBH = $("#operatingCostsB")
var operatingCostsPlus = $("#operatingCostsPlus")
var operatingCostsPlusTotal = $("#operatingCostsPlusTotal")

$("#electricityCost").on("input", function () {
	energyActive = true
    electricityCost = parseFloat($(this).val())
    if (isNaN(electricityCost)){
    	electricityCost = 0
    }
    calculate()
})


// PROFIT INCREASE

var operationPlus = 0

$("#profitIncrease").on("input", function () {
	operationActive = true
    operationPlus = parseFloat($(this).val())
    if (isNaN(operationPlus)){
    	operationPlus = 0
    }
    calculate()
})


// TAB PLUSses

var qualityActive = false
var productivityActive = false
var wasteActive = false
var energyActive = false
var operationActive = false

var qualityPlus = 0
var productivityPlus = 0
var wastePlus = 0
var energyPlus = 0

var qualityH = $("#qualityHeadline")
var productivityH = $("#productivityHeadline")
var wasteH = $("#wasteHeadline")
var energyH = $("#energyHeadline")
var operationH = $("#operationHeadline")

var qualityPlusH = $("#qualityPlus")
var productivityPlusH = $("#productivityPlus")
var wastePlusH = $("#wastePlus")
var energyPlusH = $("#energyPlus")
var operationPlusH = $("#operationPlus")








changeFixVariables()
calculate()













