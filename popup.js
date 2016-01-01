var currency = [
	"EUR",
  "USD",
  "CNY",
	"AUD",
  "BGN",
  "BRL",
  "CAD",
  "CHF",
  "CZK",
  "DKK",
  "GBP",
  "HKD",
  "HRK",
  "HUF",
  "IDR",
  "ILS",
  "INR",
  "JPY",
  "KRW",
  "MXN",
  "MYR",
  "NOK",
  "NZD",
  "PHP",
  "PLN",
  "RON",
  "RUB",
  "SEK",
  "SGD",
  "THB",
  "TRY",
  "ZAR"
];

function init() {
  //first time
  if (localStorage["fromCurrency"] == null) {
    localStorage["fromCurrency"] = "EUR";
    localStorage["toCurrency"] = "CNY";
  }
  //init les different currency
  for (i = 0; i < currency.length; i++) {
    $("#fromCurrency").append("<option value=" + currency[i] + ">" + currency[i] + "</option>");
    $("#toCurrency").append("<option value=" + currency[i] + ">" + currency[i] + "</option>");
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
  $("#search_code").attr('href', chrome.i18n.getMessage("url_code"));

  //les different currency a ce moment la et le taux de change
  $("#from").html('from');
  $("#to").html('to');
  $("#taux").html('taux');
  request();
  window.setInterval("request()", 600000);
}

//function pour mis a jour le currency
function changeCurrency() {
  localStorage["fromCurrency"] = $("#fromCurrency").val();
  localStorage["toCurrency"] = $("#toCurrency").val();
  request();
}

//function pour request le taux et mis a jour
function request() {
  chrome.browserAction.setTitle({
    title: localStorage["fromCurrency"] + "-" + localStorage["toCurrency"]
  });
  $.ajax({
    url: "http://api.fixer.io/latest?base=" + localStorage["fromCurrency"] + "&symbols=" + localStorage["toCurrency"],
    async: true,
    type: 'GET',
    success: su,
    error: er
  });
}

function su(xhr) {
  var toCurrency = localStorage.toCurrency;
  taux = xhr.rates[toCurrency];
  chrome.browserAction.setBadgeText({
    text: String(taux)
  });
  $("#taux").html(taux);
}

function er() {
  chrome.browserAction.setBadgeText({
    text: String('ERR')
  });
  $("#taux").html('ERR');
}

function subm() {
  window.close();
}

function curre() {
  switch (window.navigator.language) {
    case "zh-CN":
      window.open("http://www.google.com.hk/finance?&q=CURRENCY:" + localStorage["fromCurrency"] + localStorage["toCurrency"] + "&gl=cn");
      break;
    case "zh-TW":
      window.open("http://www.google.com.hk/finance?&q=CURRENCY:" + localStorage["fromCurrency"] + localStorage["toCurrency"]);
      break;
    default:
      window.open("http://www.google.com/finance?&q=CURRENCY:" + localStorage["fromCurrency"] + localStorage["toCurrency"]);
  }
  request();
}

$(document).ready(init);
