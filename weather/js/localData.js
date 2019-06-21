"use strict";


// Set variable equal to elements
let pageNav = document.getElementById('pageNav');
let statusContainer = document.getElementById('status');
let contentContainer = document.getElementById('mainContent');
let weatherURL = "https://Bhogge2.github.io/weather/js/weather.json";

fetchData(weatherURL);

function fetchData(weatherURL){
  let cityName = 'Greenville'; // The data we want from the weather.json file
  fetch(weatherURL)
  .then(function(response) {
  if(response.ok){
  return response.json();
  }
  throw new ERROR('Network response was not OK.');
  })

  .then(function(data){
    // Check the data object that was retrieved
    console.log(data);
    // data is the full JavaScript object, but we only want the greenville part
    // shorten the variable and focus only on the data we want to reduce typing
    let g = data[cityName];

    // ************ Get the content ******************************
    
    // Get the location data
    let locName = g.City;
    let locState = g.State;
    // Put them together
    let fullName = locName+', '+locState;
    // See if it worked
    console.log('fullName is: '+fullName);

    // Get the temperature data
    let high = g.High;
    let low = g.Low;
    let temp = g.Temp;

    // Get the wind data 
    let wind = g.Wind;
    let direction = g.Direction;
    let gusts = g.Gusts;


    // Get the current conditions
    let summary = g.Summary;
    let precip = g.Precip;

    // Get the hourly data 
    let twelveAM = g.Hourly[0];
    let oneAM = g.Hourly[1];
    let twoAM = g.Hourly[2];
    let threeAM = g.Hourly[3];
    let fourAM = g.Hourly[4];
    let fiveAM = g.Hourly[5];
    let sixAM = g.Hourly[6];
    let sevenAM = g.Hourly[7];
    let eightAM = g.Hourly[8];
    let nineAM = g.Hourly[9];
    let tenAM = g.Hourly[10];
    let elevenAM = g.Hourly[11];
    let twelvePM = g.Hourly[12];

    //Get zip code, elevation and location
    let zip = g.Zip;
    let elevation = g.Elevation;
    let latitude = g.Latitude;
    let longitude = g.Longitude;


    // ************ Display the content ******************************
    // Set the title with the location name at the first
    // Gets the title element so it can be worked with
    let pageTitle = document.getElementById('pageTitle');
    // Create a text node containing the full name 
    let fullNameNode = document.createTextNode(fullName);
    // inserts the fullName value before any other content that might exist
    pageTitle.insertBefore(fullNameNode, pageTitle.childNodes[0]);
    // When this is done the title should look something like this:
    // Greenville, SC | The Weather Site

    // Set the Location information
    // Get the h1 to display the city location
    let contentHeading = document.getElementById('contentHeading');
    contentHeading.innerHTML = fullName;
    // The h1 in main h1 should now say "Greenville, SC"


    // Set the temperature information
    let currentTemp = document.getElementById('current-temp');
    currentTemp.innerHTML = temp;
    let highTemp = document.getElementById('daily-high');
    highTemp.innerHTML = high;
    let lowTemp = document.getElementById('daily-low');
    lowTemp.innerHTML = low;

    // Set the wind information
    let windDirection = document.getElementById('direction');
    windDirection.innerHTML = direction;
    let windGusts = document.getElementById('gusts');
    windGusts.innerHTML = gusts;
    let windSpeed = document.getElementById('windSpeed');
    windSpeed.innerHTML = wind;

    buildWC(wind, temp);

    // Set the current conditions information
    let inputSummary = document.getElementById('summary');
    inputSummary.innerHTML = summary;

    let newCondition = getCondition(summary);
    changeSummaryImage(newCondition);


    // Set the hourly temperature information
    let inputTwelveAM = document.getElementById('12am');
    inputTwelveAM.innerHTML = twelveAM;
    let inputOneAM = document.getElementById('1am');
    inputOneAM.innerHTML = oneAM;
    let inputTwoAM = document.getElementById('2am');
    inputTwoAM.innerHTML = twoAM;
    let inputThreeAM = document.getElementById('3am');
    inputThreeAM.innerHTML = threeAM;
    let inputFourAM = document.getElementById('4am');
    inputFourAM.innerHTML = fourAM;
    let inputFiveAM = document.getElementById('5am');
    inputFiveAM.innerHTML = fiveAM;
    let inputSixAM = document.getElementById('6am');
    inputSixAM.innerHTML = sixAM;
    let inputSevenAM = document.getElementById('7am');
    inputSevenAM.innerHTML = sevenAM;
    let inputEightAM = document.getElementById('8am');
    inputEightAM.innerHTML = eightAM;
    let inputNineAM = document.getElementById('9am');
    inputNineAM.innerHTML = nineAM;
    let inputTenAM = document.getElementById('10am');
    inputTenAM.innerHTML = tenAM;
    let inputElevenAM = document.getElementById('11am');
    inputElevenAM.innerHTML = elevenAM;
    let inputTwelvePM = document.getElementById('12pm');
    inputTwelvePM.innerHTML = twelvePM;

    // Set location, zip and elevation
    let inputZip = document.getElementById('zipData');
    inputZip.innerHTML = zip;

    let inputElevation = document.getElementById('elevationHeight');
    inputElevation.innerHTML = elevation;

    let inputLatitude = document.getElementById('latitude');
    inputLatitude.innerHTML = latitude;

    let inputLongitude = document.getElementById('longitude');
    inputLongitude.innerHTML = longitude;

    convertMetersToFeet(elevation);



    // Change the status of the containers
    contentContainer.setAttribute('class', ''); // removes the hide class
    statusContainer.setAttribute('class', 'hide'); // hides the status container
  })
  .catch(function(error){
  console.log('There was a fetch problem: ', error.message);
  statusContainer.innerHTML = 'Sorry, the data could not be processed.';
  })
}