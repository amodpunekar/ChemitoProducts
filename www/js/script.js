$(document).ready(function(){

	/*$.getJSON("data/data.json", function(json) {
	    console.log(json); // this will show the info it in firebug console
	});*/

	/*var url = "data/data.json";
	var request = new XMLHttpRequest();

	request.open("GET", url, true);
	request.responseType = 'json';
	request.send();

	request.onload = function() {
		var data = request.response;
		console.log(data);
	}*/

	/*request.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
	        var myArr = JSON.parse(this.responseText);
	        myFunction(myArr);
	    }
	};*/


	$("#btnSec1").click(function(){
		addProds();

		$("#scr2").css("display","block");
		$("#scr2Text").text("List of products");
		$("#scr2").animate({left:'0', right:'0'});
	});

	function addProds(){
		for(var m=0; m<prodArray.length; m++){
			 
			var prod = $("<div></div>")
							.addClass("prod")
							.attr("id","p"+(m+1))
							.hover(function(){
						        $(this).toggleClass("prodHover");
						    })
						    .click(function(){
						    	showFuncsForSelectedProd($(this).attr("id"));
						    });

				var prodImage = $("<img>")
								.addClass("prodImage")
								.attr("src","img/ImagePH.png");

				prod.append(prodImage);

				var prodText = $("<div></div>")
								.addClass("prodText");

					var prodTitle = $("<div></div>")
									.addClass("prodTitle")
									.text(prodNames[m]);

					prodText.append(prodTitle);

					var prodFunc = $("<div></div>")
									.addClass("prodFunc")
									.text("Short description about the product.");

					prodText.append(prodFunc);

				prod.append(prodText);

			$("#prodsContainer").append(prod);
		}
	}

	$("#btnSec2").click(function(){
		$("#scr1").css("display","block");
		$("#funcsContainer").scrollTop(0);
		$("#scr1").animate({left:'0', right:'0'});
	});

	

	var totalFuncs = arrFuncText.length;
	var selFuncs = [];
	var matchProds = [];
	var selProdNo;


	for(var i=1; i<=totalFuncs; i++){

		var funcRow = $("<div></div>")
			.addClass("func")
			.attr("id","f"+i)
			.click(function(){
				toggleFuncSel($(this).attr("id"));
			});

		var tableMain = $("<table></table>");
		var tableTr = $("<tr></tr>");

		var funcNum = $("<td></td>")
			.addClass("funcNum")
			.text(i);

		var funcText = $("<td></td>")
			.addClass("funcText")
			.text(arrFuncText[i-1]);

		tableTr.append(funcNum);
		tableTr.append(funcText);
		tableMain.append(tableTr);
		funcRow.append(tableMain);
		
		$("#funcsContainer").append(funcRow);
	}
	



	function toggleFuncSel(value){
		$("#" + value).toggleClass("funcSel");

		var index = selFuncs.indexOf(value);

		if (index === -1){
			selFuncs.push(value);
		}else{
			selFuncs.splice(index, 1);
		}

		console.log(selFuncs);
	}


	$("#btnBack1").click(function(){
		$("#scr1").animate({left:'100%', right:'-100%'},function(){
			for(var i=1; i<=totalFuncs; i++){
				$("#f"+i).removeClass("funcSel");
			}
			selFuncs = [];
			clearProds();
			$("#scr1").css("display","none");
		});
	});



	$("#btnSubmit").click(function(){
		clearProds();
		chkProds();
		$("#scr2Text").text("Matching products");
		addMatchingProds();
		showProductsScreen();
	});

	function clearProds(){
		var list = document.getElementById("prodsContainer");
		while (list.hasChildNodes()) {
		    list.removeChild(list.firstChild);
		}		
	}

	function chkProds(){
		matchProds = [];
		var c = 0;
		for(var j=prodArray.length-1; j>=0; j--){
			for(var i=0; i<selFuncs.length; i++){
				for (var k=0; k<prodArray[j].length; k++) {
					if (selFuncs[i] === prodArray[j][k]) {
						c++;
					}
				}
			}
			if(c==selFuncs.length){
				matchProds.push(j+1);
			}
			c = 0;
		}
		console.log(matchProds);
	}

	function addMatchingProds(){
		for(var m=matchProds.length-1; m>=0; m--){
			 
			var prod = $("<div></div>")
							.addClass("prod")
							.attr("id","p"+matchProds[m])
							.hover(function(){
						        $(this).toggleClass("prodHover");
						    })
						    .click(function(){
						    	showFuncsForSelectedProd($(this).attr("id"));
						    });

				var prodImage = $("<img>")
								.addClass("prodImage")
								.attr("src","img/ImagePH.png");

				prod.append(prodImage);

				var prodText = $("<div></div>")
								.addClass("prodText");

					var prodNo = matchProds[m] -1;
					var prodTitle = $("<div></div>")
									.addClass("prodTitle")
									.text(prodNames[prodNo]);

					prodText.append(prodTitle);

					var prodFunc = $("<div></div>")
									.addClass("prodFunc")
									.text("Short description about the product.");

					prodText.append(prodFunc);

				prod.append(prodText);

			$("#prodsContainer").append(prod);
		}
	}

	function showProductsScreen(){
		$("#scr2").css("display","block");
		$("#scr2").animate({left:'0', right:'0'});
	}

	$("#btnBack2").click(function(){
		$("#funcsContainer").scrollTop(0);
		$("#scr2").animate({left:'100%', right:'-100%'},function(){
			clearProds();
			$("#scr2").css("display","none");
		});
	})



	function showFuncsForSelectedProd(value){
		selProdNo = value.slice(1);
		console.log(selProdNo);

		$("#selProdName").text(prodNames[selProdNo-1]);
		
		clearProdFuncs();
		addMatchingProdsFuncs();
		showSelectedProdFuncsScr();
	}

	function clearProdFuncs(){
		var list = document.getElementById("prodFuncsContainer");
		while (list.hasChildNodes()) {
		    list.removeChild(list.firstChild);
		}	
	}

	function addMatchingProdsFuncs(){

		var tableMain = $("<table></table>")
			.addClass("fullWidth");

		for(var i=0; i<prodArray[selProdNo-1].length; i++){
			
			var tableTr = $("<tr></tr>")
				.addClass("funcUnselectable");

			var funcNum = $("<td></td>")
				.addClass("funcNum")
				.text(i+1);

			var str = prodArray[selProdNo-1][i];
			var nFunc = str.slice(1);

			var funcText = $("<td></td>")
				.addClass("funcText")
				.text(arrFuncText[nFunc-1]);

			tableTr.append(funcNum);
			tableTr.append(funcText);
			tableMain.append(tableTr);
		}

		$("#prodFuncsContainer").append(tableMain);
	}

	function showSelectedProdFuncsScr(){
		$("#scr3").css("display","block");
		$("#prodFuncsContainer").scrollTop(0);
		$("#scr3").animate({left:'0', right:'0'});
	}

	$("#btnBack3").click(function(){
		$("#prodsContainer").scrollTop(0);
		$("#scr3").animate({left:'100%', right:'-100%'},function(){
			$("#scr3").css("display","none");
		});
	})
	
});