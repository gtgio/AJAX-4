"use strict"
const debug = true;

let weerButton = document.getElementById('weatherButton');
let weerButton2 = document.getElementById('weatherButton2');
let weatherTickerTape = document.getElementById('weatherTickerTape');
let weatherHere = document.getElementById('weatherHere');
let completeWeatherHere = document.getElementById('completeWeatherHere');
weerButton.addEventListener('click', getWeather);
weerButton2.addEventListener('click', getWeather2);
// weatherTickerTape.addEventListener('click', getWeatherTicker);

let apiAddress = "http://weerlive.nl/api/json-data-10min.php?key="
let key = "demo";
//let key = "77f9e00dfd";
let locatie = "&locatie="

function getLocation() {
	if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(changeLocation);
	} else {
		x.innerHTML = "Geolocation is not supported by this browser.";
	}
}

let geoLocation = "Amsterdam";
//getLocation();

function changeLocation(position) {
	geoLocation = position.coords.latitude + ", " + position.coords.longitude;
}

let url = apiAddress + key + locatie + geoLocation;

function getWeather2() {
	weatherHere.innerHTML = "";
	makeAjaxCall(url, "GET"). then (showWeather2, errorHandler);
}
function getWeather() {
	weatherHere.innerHTML = "";
	makeAjaxCall(url, "GET"). then (showWeather, errorHandler);
}

function showWeather2(weatherString) {
	let weatherObject = JSON.parse(weatherString);
	let completeData = "";
	for (const [key, value] of Object.entries(weatherObject.liveweer[0])) {
		debug ? console.log(`${key}: ${value}`) : "";
		completeData += key + " : " + value + "<br>";
		weatherHere.innerHTML = completeData;
	}
}
function showWeather(weatherString) {
	let weatherObject = JSON.parse(weatherString);
	let ditWeer = weatherObject.liveweer[0].plaats +
	"<br>Temperatuur " + weatherObject.liveweer[0].temp + " &#176;C" +
	"<br>Verwachting " + weatherObject.liveweer[0].verw +
	"<br>Weerbeeld " +  weatherObject.liveweer[0].samenv +
	"<br>Icoon " + "<img src='icons/" + weatherObject.liveweer[0].image + ".png'>" +
	"<br>Neerslag " + weatherObject.liveweer[0].d0neerslag + "	&#x25;";
	weatherHere.innerHTML = ditWeer;
}

function makeAjaxCall(url, methodType) {
	let promiseObj = new Promise(function(resolve, reject) {
		debug ? console.log(url) : "";
		let xmlhttp = new XMLHttpRequest();
		xmlhttp.open(methodType, url, true);
		xmlhttp.send();
		xmlhttp.onreadystatechange = function() {
			if(xmlhttp.readyState === 4) {
				if(xmlhttp.status === 200) {
					debug ? console.log("xmlhttp done successfully") : "";
					let serverResponse = xmlhttp.responseText;
					debug ? console.log(serverResponse) : "";
					resolve(serverResponse);
				} else {
					reject(xmlhttp.status);
					console.log("xmlhttp failed");
				}
			} else {
				debug ? console.log("xmlhttp processing going on") : "";
			}
		}
		debug ? console.log("request sent successfully") : "";
	});
	return promiseObj;
}

function errorHandler(statusCode) {
	console.log("failed with status", status);
}
