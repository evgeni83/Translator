"use strict";

var inputFormElem = document.querySelector(".input-form");
var translateElem = document.querySelector(".translate");
var inputTextElem = document.querySelector("#textarea1");
var inputLang = document.querySelector("#input-lang");
var outputLang = document.querySelector("#output-lang");

inputFormElem.addEventListener("submit", function(event) {
  event.preventDefault();

  var req = new XMLHttpRequest();
  var API_KEY =
    "trnsl.1.1.20190722T131111Z.3f825e6017b4ee3e.6c0ee262dea2f67467a5c74bc63e250ac1a5d07f";
  var url = "https://translate.yandex.net/api/v1.5/tr.json/translate";

  url += "?key=" + API_KEY;
  url += "&text=" + inputTextElem.value;
  url += "&lang=" + inputLang.value + "-" + outputLang.value;

  req.addEventListener("load", function() {
    console.log(req.response);
    var response = JSON.parse(req.response);
    console.log(response);

    if (response.code !== 200) {
      translateElem.innerHTML =
        "Произошла ошибка при получении ответа от сервера:\n" +
        response.message;
      return;
    }

    if (response.text.length === 0) {
      translateElem.innerHTML =
        "К сожалению, перевод для данного слова не найден";
      return;
    }

    translateElem.innerHTML = response.text;
  });

  req.open("get", url);
  req.send();
});
