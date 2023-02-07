$(document).ready(function () {
  let fiveday = $("#fiveday");
  fiveday.text("5-Day Forecast:");
  //   // User API Key
  let apiKey = "0c0b1ebd44d8f1bffcaebdcf320c7874";
  //   // Let userSearch take the value given in the input area with the id of search-input
  let searchButton = $("#search-button")
  searchButton.onclick = function(e){
    e.preventDefault()
  let userSearch = "";
  userSearch = "bristol";
  let history = $("#history");


  //  Current Weather
  //   GeoLocation
  let geoQueryURL =
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
    userSearch +
    "&limit=1&appid=" +
    apiKey;
  $.ajax({
    url: geoQueryURL,
    method: "GET",
  }).then(function (result) {
    let lat = result[0].lat;
    let lon = result[0].lon;
    latFixed = lat.toFixed(2);
    lonFixed = lon.toFixed(2);

    let weatherQueryURL =
      "https://api.openweathermap.org/data/2.5/weather?lat=" +
      latFixed +
      "&lon=" +
      lonFixed +
      "&appid=" +
      apiKey;
    $.ajax({
      url: weatherQueryURL,
      method: "GET",
    }).then(function (result) {
      let currentLocation = result.name;
      let currentDate = moment().format("DD/MM/YYYY");
      let currentTempK = result.main.temp;
      let currentWind = result.wind.speed;
      let currentHumidity = result.main.humidity;
      let currentIconId = result.weather[0].icon;
      let currentTempC = currentTempK - 273.15;
      currentTempCFixed = currentTempC.toFixed(2);
      let currentWDiv = $("#today");
      let currentWTitle = $("<h2>");
      let currentWUl = $("<ul>");
      let currentWTempC = $("<li>");
      let currentWWind = $("<li>");
      let currentWHumidity = $("<li>");
      currentWTempC.text("Temp: " + currentTempCFixed + "°C");
      currentWWind.text("Wind: " + currentWind + " KPH");
      currentWHumidity.text("Humidity: " + currentHumidity + "%");
      currentWUl.append(currentWTempC, currentWWind, currentWHumidity);
      currentWTitle.text(currentLocation + " " + currentDate);
      currentWDiv.append(currentWTitle, currentWUl);
    });
    $.ajax({
      url: weatherQueryURL,
      method: "GET",
    }).then(function (result) {
      let historyLocation = "historyLocation";
      let currentLocation = result.name;
      localStorage.setItem(historyLocation, currentLocation);
      let historyBtn = $("<button>").text(
        localStorage.getItem("historyLocation")
      );
      history.append(historyBtn);
    });

    // 5 day forecast
    let forecastQueryURL =
      "https://api.openweathermap.org/data/2.5/forecast?lat=" +
      latFixed +
      "&lon=" +
      lonFixed +
      "&appid=" +
      apiKey;
    $.ajax({
      url: forecastQueryURL,
      method: "GET",
    }).then(function (result) {
      console.log(result);
      let forecastWDiv = $("#forecast");

      //   Day 1 Forecast
      let dayoneDateID = result.list[8].dt_txt;
      dayoneDate = moment(dayoneDateID).format("dddd");
      console.log(dayoneDate);
      let dayoneTempK = result.list[8].main.temp;
      let dayoneTempC = dayoneTempK - 273.15;
      let dayoneTempCFixed = dayoneTempC.toFixed(2);
      let dayoneWind = result.list[8].wind.speed;
      let dayoneHumidity = result.list[8].main.humidity;
      let dayone = $("<ul>");
      let dayoneTitle = $("<h5>");
      dayoneTitle.text(dayoneDate);
      let dayoneFTempCFixed = $("<li>");
      let dayoneFWind = $("<li>");
      let dayoneFHumidity = $("<li>");
      dayoneFTempCFixed.text("Temp: " + dayoneTempCFixed + "°C");
      dayoneFWind.text("Wind: " + dayoneWind + " KPH");
      dayoneFHumidity.text("Humidity: " + dayoneHumidity + "%");
      dayone.append(
        dayoneTitle,
        dayoneFTempCFixed,
        dayoneFWind,
        dayoneFHumidity
      );

      // Day 2
      let daytwoDateID = result.list[16].dt_txt;
      daytwoDate = moment(daytwoDateID).format("dddd");
      let daytwoTempK = result.list[16].main.temp;
      let daytwoTempC = daytwoTempK - 273.15;
      let daytwoTempCFixed = daytwoTempC.toFixed(2);
      let daytwoWind = result.list[16].wind.speed;
      let daytwoHumidity = result.list[16].main.humidity;
      let daytwo = $("<ul>");
      let daytwoTitle = $("<h5>");
      daytwoTitle.text(daytwoDate);
      let daytwoFTempCFixed = $("<li>");
      let daytwoFWind = $("<li>");
      let daytwoFHumidity = $("<li>");
      daytwoFTempCFixed.text("Temp: " + daytwoTempCFixed + "°C");
      daytwoFWind.text("Wind: " + daytwoWind + " KPH");
      daytwoFHumidity.text("Humidity: " + daytwoHumidity + "%");
      daytwo.append(
        daytwoTitle,
        daytwoFTempCFixed,
        daytwoFWind,
        daytwoFHumidity
      );

      //Day 3
      let daythreeDateID = result.list[24].dt_txt;
      daythreeDate = moment(daythreeDateID).format("dddd");
      let daythreeTempK = result.list[24].main.temp;
      let daythreeTempC = daythreeTempK - 273.15;
      let daythreeTempCFixed = daythreeTempC.toFixed(2);
      let daythreeWind = result.list[24].wind.speed;
      let daythreeHumidity = result.list[24].main.humidity;
      let daythree = $("<ul>");
      let daythreeTitle = $("<h5>");
      daythreeTitle.text(daythreeDate);
      let daythreeFTempCFixed = $("<li>");
      let daythreeFWind = $("<li>");
      let daythreeFHumidity = $("<li>");
      daythreeFTempCFixed.text("Temp: " + daythreeTempCFixed + "°C");
      daythreeFWind.text("Wind: " + daythreeWind + " KPH");
      daythreeFHumidity.text("Humidity: " + daythreeHumidity + "%");
      daythree.append(
        daythreeTitle,
        daythreeFTempCFixed,
        daythreeFWind,
        daythreeFHumidity
      );

      //Day 4
      let dayfourDateID = result.list[32].dt_txt;
      dayfourDate = moment(dayfourDateID).format("dddd");
      let dayfourTempK = result.list[32].main.temp;
      let dayfourTempC = dayfourTempK - 273.15;
      let dayfourTempCFixed = dayfourTempC.toFixed(2);
      let dayfourWind = result.list[32].wind.speed;
      let dayfourHumidity = result.list[32].main.humidity;
      let dayfour = $("<ul>");
      let dayfourTitle = $("<h5>");
      dayfourTitle.text(dayfourDate);
      let dayfourFTempCFixed = $("<li>");
      let dayfourFWind = $("<li>");
      let dayfourFHumidity = $("<li>");
      dayfourFTempCFixed.text("Temp: " + dayfourTempCFixed + "°C");
      dayfourFWind.text("Wind: " + dayfourWind + " KPH");
      dayfourFHumidity.text("Humidity: " + dayfourHumidity + "%");
      dayfour.append(
        dayfourTitle,
        dayfourFTempCFixed,
        dayfourFWind,
        dayfourFHumidity
      );

      //Day 5
      let dayfiveDateID = result.list[39].dt_txt;
      dayfiveDate = moment(dayfiveDateID).format("dddd");
      let dayfiveTempK = result.list[39].main.temp;
      let dayfiveTempC = dayfiveTempK - 273.15;
      let dayfiveTempCFixed = dayfiveTempC.toFixed(2);
      let dayfiveWind = result.list[39].wind.speed;
      let dayfiveHumidity = result.list[39].main.humidity;
      let dayfive = $("<ul>");
      let dayfiveTitle = $("<h5>");
      dayfiveTitle.text(dayfiveDate);
      let dayfiveFTempCFixed = $("<li>");
      let dayfiveFWind = $("<li>");
      let dayfiveFHumidity = $("<li>");
      dayfiveFTempCFixed.text("Temp: " + dayfiveTempCFixed + "°C");
      dayfiveFWind.text("Wind: " + dayfiveWind + " KPH");
      dayfiveFHumidity.text("Humidity: " + dayfiveHumidity + "%");
      dayfive.append(
        dayfiveTitle,
        dayfiveFTempCFixed,
        dayfiveFWind,
        dayfiveFHumidity
      );
      forecastWDiv.append(dayone, daytwo, daythree, dayfour, dayfive);
    });
  });
}
});

// var value = "aa";
// localStorage.setItem("testKey", value);
// var test = localStorage.getItem("testKey");
// alert(test);

// let currentIconImage = $("<img>");
// currentIconImage.scr =
//   "http://openweathermap.org/img/wn/" + currentIconId + "@2x.png";
// currentWTitle.append(currentIconImage);

// let list = [];
//   list.push("<h1>John<h1>");
//   list.push("<h2>David<h2>");
//   localStorage.setItem("list", JSON.stringify(list));

//   // Retrieve
//   document.getElementById("result").innerHTML = JSON.parse(
//     localStorage.getItem("list")
//   );
// } else {
//   document.getElementById("result").innerHTML =
//     "Sorry, your browser does not support Web Storage...";
// }

// }).then(function (result) {
//   let historyLocation = "historyLocation";
//   let currentLocation = result.name;
//   localStorage.setItem(historyLocation, currentLocation);
//   let historyBtn = $("<button>").text(
//     localStorage.getItem("historyLocation")
//   );
//   history.append(historyBtn);
// });
