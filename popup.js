var currency=["CNY","EUR","USD","AED","ANG","ARS","AUD","BDT","BGN","BHD","BND","BOB","BRL","BWP","CAD","CHF","CLP","COP","CRC","CZK","DKK","DOP","DZD","EEK","EGP","FJD","GBP","HKD","HNL","HRK","HUF","IDR","ILS","INR","JMD","JOD","JPY","KES","KRW","KWD","KYD","KZT","LBP","LKR","LTL","LVL","MAD","MDL","MKD","MUR","MVR","MXN","MYR","NAD","NGN","NIO","NOK","NPR","NZD","OMR","PEN","PGK","PHP","PKR","PLN","PYG","QAR","RON","RSD","RUB","SAR","SCR","SEK","SGD","SKK","SLL","SVC","THB","TND","TRY","TTD","TWD","TZS","UAH","UGX","UYU","UZS","VEF","VND","XOF","YER","ZAR","ZMK"];

function init(){
	//first time
	if(localStorage["fromCurrency"]==null){
		localStorage["fromCurrency"]="EUR";
		localStorage["toCurrency"]="CNY";
 	}
	//init les different currency
	for( i = 0; i < currency.length; i++){
		$("#fromCurrency").append("<option value="+currency[i]+">"+currency[i]+"</option>");
		$("#toCurrency").append("<option value="+currency[i]+">"+currency[i]+"</option>");
	}
	$("#fromCurrency").val(localStorage["fromCurrency"]);
	$("#toCurrency").val(localStorage["toCurrency"]);
	$("#fromCurrency").change(changeCurrency);
	$("#toCurrency").change(changeCurrency);
	//init le confirm button
	$("#confirm").val(chrome.i18n.getMessage("submit"));
	$("#confirm").click(subm);

	//init le search_taux button
	$("#search_taux").val(chrome.i18n.getMessage("search_taux"));
	$("#search_taux").click(curre);

	//inti le search_code lien
	$("#search_code").html(chrome.i18n.getMessage("search_code"));
	$("#search_code").attr('href',chrome.i18n.getMessage("url_code"));

	//les different currency a ce moment la et le taux de change
	$("#from").html('from');
	$("#to").html('to');
	$("#taux").html('taux');
	request();
	window.setInterval("request()", 600000);
}

//function pour mis a jour le currency
function changeCurrency(){
	localStorage["fromCurrency"] = $("#fromCurrency").val();
	localStorage["toCurrency"] = $("#toCurrency").val();
	request();
}

//function pour request le taux et mis a jour
function request(){
	chrome.browserAction.setTitle({title:localStorage["fromCurrency"]+"-"+localStorage["toCurrency"]});
	$.ajax({
		url:"http://rate-exchange.appspot.com/currency?from=" + localStorage["fromCurrency"] + "&to=" + localStorage["toCurrency"],
		async:true,
		type:'GET',
		success: su,
		error: er
	});
}

function su(xhr){
	taux = xhr.rate;
	chrome.browserAction.setBadgeText({text:String(taux)});
	$("#taux").html(taux);
}

function er(){
	chrome.browserAction.setBadgeText({text:String('ERR')});
	$("#taux").html('ERR');
}

function subm(){
 	window.close();
}

function curre(){
	switch (window.navigator.language)
	{
		case "zh-CN":
			window.open("http://www.google.com.hk/finance?&q=CURRENCY:"+localStorage["fromCurrency"]+localStorage["toCurrency"]+"&gl=cn");
			break;
		case "zh-TW":
			window.open("http://www.google.com.hk/finance?&q=CURRENCY:"+localStorage["fromCurrency"]+localStorage["toCurrency"]);
			break;
		default:
			window.open("http://www.google.com/finance?&q=CURRENCY:"+localStorage["fromCurrency"]+localStorage["toCurrency"]);
	}
	request();	
}

$(document).ready(init);