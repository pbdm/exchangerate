var bgpg = chrome.extension.getBackgroundPage();
var from,to;
var name_liste;//name of ficher du list du code devise
var currency=["CNY","EUR","USD","AED","ANG","ARS","AUD","BDT",
"BGN",
"BHD",
"BND",
"BOB",
"BRL",
"BWP",
"CAD",
"CHF",
"CLP",
"COP",
"CRC",
"CZK",
"DKK",
"DOP",
"DZD",
"EEK",
"EGP",
"FJD",
"GBP",
"HKD",
"HNL",
"HRK",
"HUF",
"IDR",
"ILS",
"INR",
"JMD",
"JOD",
"JPY",
"KES",
"KRW",
"KWD",
"KYD",
"KZT",
"LBP",
"LKR",
"LTL",
"LVL",
"MAD",
"MDL",
"MKD",
"MUR",
"MVR",
"MXN",
"MYR",
"NAD",
"NGN",
"NIO",
"NOK",
"NPR",
"NZD",
"OMR",
"PEN",
"PGK",
"PHP",
"PKR",
"PLN",
"PYG",
"QAR",
"RON",
"RSD",
"RUB",
"SAR",
"SCR",
"SEK",
"SGD",
"SKK",
"SLL",
"SVC",
"THB",
"TND",
"TRY",
"TTD",
"TWD",
"TZS",
"UAH",
"UGX",
"UYU",
"UZS",
"VEF",
"VND",
"XOF",
"YER",
"ZAR",
"ZMK"];
function click(va){
	localStorage["fromCurrency"]=from.value;
	localStorage["toCurrency"]=to.value;
}
function insert(ft){
document.write("<select id="+ft+" onchange=click(this.value)>");
for(i=0;i<currency.length;i++)
		document.write("<option value="+currency[i]+">"+currency[i]+"</option>");
document.write("</select>");

}

function subm(){
	window.close();
	bgpg.request();	
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
	
	
	bgpg.request();	
}

document.write("<div id=\"header\">"+localStorage["fromCurrency"]+"-"+localStorage["toCurrency"]+":<br />"+bgpg.taux+"</div>");
document.write("<hr />");
document.write("<div id=\"list\"><form onsubmit=subm()>");
insert("fromCurrency");
document.write("-");
insert("toCurrency");

from=document.getElementById("fromCurrency");
to=document.getElementById("toCurrency");
from.value=localStorage["fromCurrency"];
to.value=localStorage["toCurrency"];

document.write("<input type=\"submit\" value=\""+chrome.i18n.getMessage("submit")+"\" /></form></div>");
document.write("<hr />");
document.write("<input type=\"button\" value=\""+chrome.i18n.getMessage("search_taux")+"\" onclick=curre()>");
document.write("<hr />");

if(window.navigator.language.substring(0,2)=="zh"||window.navigator.language.substring(0,2)=="fr")
	name_liste=window.navigator.language.substring(0,2);
else
	name_liste="en";
	
document.write("<a href=\"code_"+name_liste+".html\" target=\"_blank\">"+chrome.i18n.getMessage("search_code")+"</a>");