// DEVELOPER API
let apiKey = "0c0b1ebd44d8f1bffcaebdcf320c7874";

// SEARCH BUTTON
let searchButton = $("#search-button"); // LINK TO HTML
searchButton.on("click", function (event) {
  // ON CLICK DO THE FOLLOWING
  event.preventDefault(); // PREVENT DEFAULT
  let userSearch = $("#search-input").val().trim(); // USER SEARCH IS THE TRIMMED VALUE OF SEARCH-INPUT
  let searchHistory = []; // CREATE A SEARCH HISTOY ARRAY
  searchHistory.push(userSearch); // PUSH THE USER SEARCH TO THE SEARCH HISTORY
  let history = $("#history"); // LINK TO HTML TO USE BELOW

  //  CURRENT WEATHER
  let geoQueryURL = // SEARCH OPEN WEATHER API
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
    userSearch + // USER INPUT
    "&limit=1&appid=" + // LIMIT IT TO 1 SEARCH AND ADD THIS API KEY
    apiKey; // API KEY
  $.ajax({
    url: geoQueryURL, // USING THE URL ABOVE
    method: "GET", // GET THE FOLLOWING:
  }).then(function (result) {
    let lat = result[0].lat; // GET LATTITUDE
    let lon = result[0].lon; // GET LONGITUDE
    latFixed = lat.toFixed(2); // FIX IT TO 2 DECIMAL PLACES
    lonFixed = lon.toFixed(2); // FIX IT TO 2 DECIMAL PLACES

    // RETRIEVE CURRENT WEATHER
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

      // CREATE A CURRENT WEATHER DIV
    }).then(function (result) {
      let currentLocation = result.name;
      let currentDate = moment().format("DD/MM/YYYY");
      let currentTempK = result.main.temp;
      let currentWind = result.wind.speed;
      let currentHumidity = result.main.humidity;
      let currentIconId = result.weather[0].icon;
      let currentTempC = currentTempK - 273.15;
      let currentTempCFixed = currentTempC.toFixed(2);
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

    // CREATE HISTORY BUTTON FOR USER SEARCH
    $.ajax({
      url: weatherQueryURL,
      method: "GET",
    }).then(function (result) {
      let historyLocation = "historyLocation";
      let currentLocation = result.name;
      localStorage.setItem(historyLocation, currentLocation); // ADD THE CURRENT USER SEARCH TO LOCAL STORAGE
      let historyBtn = $("<button>").text(
        // CREATE A HITORY BUTTON
        localStorage.getItem("historyLocation") // ADD THE TEXT FROM LOCAL STOARGE TO THE BUTTON(S)
      );
      history.append(historyBtn); // ADD THE HISTOR BUTTONS TO THE HISTORY DIV
    });

    // 5 DAY FORECAST
    // RETRIEVE FORECAST
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

      // DAY 1
      let dayoneDateID = result.list[8].dt_txt; // GET THE DATE
      dayoneDate = moment(dayoneDateID).format("dddd"); // FORMAT THE DATE
      let dayoneTempK = result.list[8].main.temp; // GET THE TEMP
      let dayoneTempC = dayoneTempK - 273.15; // CONVERT THE TEMP TO CELCIUS
      let dayoneTempCFixed = dayoneTempC.toFixed(2); // FIX THE TEMP TO 2 DECIMAL PLACES
      let dayoneWind = result.list[8].wind.speed; // GET THE WIND
      let dayoneHumidity = result.list[8].main.humidity; // GET THE HUMIDITY
      let dayone = $("<ul>"); // CREATE A LIST
      let dayoneTitle = $("<h5>"); // CREATE A H5
      dayoneTitle.text(dayoneDate); // USE THE FORMATED DATE AS TEXT IN THE H5
      let dayoneFTempCFixed = $("<li>"); // CREATE LIST ENTRY
      let dayoneFWind = $("<li>"); // CREATE LIST ENTRY
      let dayoneFHumidity = $("<li>"); // CREATE LIST ENTRY
      dayoneFTempCFixed.text("Temp: " + dayoneTempCFixed + "°C"); // ADD TEMP TO LIST
      dayoneFWind.text("Wind: " + dayoneWind + " KPH"); // ADD WIND TO LIST
      dayoneFHumidity.text("Humidity: " + dayoneHumidity + "%"); // ADD HUMIDITY TO LIST
      dayone.append(
        dayoneTitle,
        dayoneFTempCFixed,
        dayoneFWind,
        dayoneFHumidity
      ); // APPEND H5 AND LIST ENTRIES TO DAY ONE

      // DAY 2
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

      // DAY 3
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

      // DAY 4
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

      // DAY 5
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
      // APPEND DAYS TOGETHER
      forecastWDiv.append(dayone, daytwo, daythree, dayfour, dayfive);
    });
  });
});
