"use strict";

var inputFormElem = document.querySelector(".input-form");
var translateElem = document.querySelector(".translate");
var inputTextElem = document.querySelector("#textarea1");
var inputLang = document.querySelector("#input-lang");
var outputLang = document.querySelector("#output-lang");
var API_KEY = "trnsl.1.1.20190722T131111Z.3f825e6017b4ee3e.6c0ee262dea2f67467a5c74bc63e250ac1a5d07f";


inputFormElem.addEventListener("submit", function (event) {
  event.preventDefault();

  function detectTranslateLang() {
    var promise = new Promise(function (resolve, reject) {
      var reqDetect = new XMLHttpRequest();
      var response;
      var url = "https://translate.yandex.net/api/v1.5/tr.json/detect";
      url += "?key=" + API_KEY;
      url += "&text=" + inputTextElem.value;
      url += "&hint=" + inputLang.value;
      reqDetect.open("get", url);
      reqDetect.send();
      reqDetect.onload = function () {
        response = JSON.parse(reqDetect.response);
        if (response.code !== 200) { reject(response.message) };
        resolve(response);
      };
    });
    return promise;
  };

  function getTranslation(detectedLang) {
    var reqTranslate = new XMLHttpRequest();
    var response;
    var url = "https://translate.yandex.net/api/v1.5/tr.json/translate";
    url += "?key=" + API_KEY;
    url += "&text=" + inputTextElem.value;
    url += "&lang=" + detectedLang.lang + "-" + outputLang.value;
    reqTranslate.open("get", url);
    reqTranslate.send();
    reqTranslate.onload = function () {
      response = JSON.parse(reqTranslate.response);
      if (response.code !== 200) { reject() };
      translateElem.innerHTML = response.text;
    };
  };

  function showErrorMessage(message) {
    console.error('Oшибка перевода: ' + message);
  };

  detectTranslateLang()
    .then(getTranslation)
    .catch(showErrorMessage);
});

