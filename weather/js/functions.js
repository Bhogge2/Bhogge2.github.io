/* *************************************
 *  Weather Site JavaScript Functions
 ************************************* */

// Variables for Function Use

var idHeader = {
    headers: {
        "User-Agent": "Student Learning Project - hog15005@byui.edu"
    }
};

var storage = window.localStorage;


// Calculate the Windchill
function buildWC(speed, temp) {
    let feelsLike = document.getElementById('feelsTemp');
    // Compute the windchill
    let wc = 35.74 + 0.6215 * temp - 35.75 * Math.pow(speed, 0.16) + 0.4275 * temp * Math.pow(speed, 0.16);
    console.log(wc);
    // Round the answer down to integer
    wc = Math.floor(wc);
    // If chill is greater than temp, return the temp
    wc = (wc > temp) ? temp : wc;
    // Display the windchill
    console.log(wc);
    wc = 'Feels like ' + wc + '&deg;F';
    feelsTemp.innerHTML = wc;
}

// Wind Dial Function
function windDial(direction) {
    // Get the container
    let dial = document.getElementById("dial");
    console.log(direction.innerHTML);
    // Determine the dial class
    switch (direction.innerHTML) {
        // North
        case "North":
        case "N":
            dial.setAttribute("class", "n");
            break;
            // Northeast
        case "NE":
        case "NNE":
        case "ENE":
            dial.setAttribute("class", "ne");
            break;
            // Northwest
        case "NW":
        case "NNW":
        case "WNW":
            dial.setAttribute("class", "nw");
            break;
            // South
        case "South":
        case "S":
            dial.setAttribute("class", "s");
            break;
            // Southeast
        case "SE":
        case "SSE":
        case "ESE":
            dial.setAttribute("class", "se");
            break;
            // Southwest
        case "SW":
        case "SSW":
        case "WSW":
            dial.setAttribute("class", "sw");
            break;
            // East
        case "E":
        case "East":
            dial.setAttribute("class", "e");
            break;
            // West
        case "W":
        case "West":
            dial.setAttribute("class", "w");
            break;
    }
}

// Get the weather condition
function getCondition(condition) {
    // Check the condition passed in
    console.log(condition);
    // Make all lowercase
    let lowerCondition = condition.toLowerCase();
    // Determine the currentWeather class based on what is in the string
    switch (true) {
        // Clear
        case (lowerCondition.includes("clear") || lowerCondition.includes("sun")):
            return "clear";
            // Rain
        case (lowerCondition.includes("wet") || lowerCondition.includes("rain") || lowerCondition.includes("storm") || lowerCondition.includes("shower")):
            return "rain";
            // Clouds
        case (lowerCondition.includes("cloud")):
            return "clouds";
            // Snow
        case (lowerCondition.includes("snow")):
            return "snow";
            // Fog
        case (lowerCondition.includes("fog")):
            return "fog";
        default:
            return "clear";
    }
}

function changeSummaryImage(newCondition) {
    // Checks the weather condition
    console.log(newCondition);

    // changes the class depending on the condition
    switch (newCondition) {
        // Clear
        case "clear":
            currentWeather.setAttribute("class", "clear");
            skyBox.setAttribute("class", "clear");
            break;
            // Rain
        case "rain":
            currentWeather.setAttribute("class", "rain");
            skyBox.setAttribute("class", "rain");
            break;
            // Clouds
        case "clouds":
            currentWeather.setAttribute("class", "clouds");
            skyBox.setAttribute("class", "clouds");
            break;
            // Snow
        case "snow":
            currentWeather.setAttribute("class", "snow");
            skyBox.setAttribute("class", "snow");
            break;
            // Fog
        case "fog":
            currentWeather.setAttribute("class", "fog");
            skyBox.setAttribute("class", "fog");
            break;
    }
}

function convertMetersToFeet(meters) {
    // Convert to feet
    let feet = meters * 3.28084;
    // Checks before rounding
    console.log(feet);
    // Rounds to nearest integer
    feet = Math.round(feet);

    elevationHeight.innerHTML = feet;
}

function convertElevation(elevationFeet) {
    // Input feet into HTML
    elevationHeight.innerHTML = elevationFeet;
}

// Convert, Format time to 12 hour format
function format_time(hour) {
    if (hour > 23) {
        hour -= 24;
    }
    let amPM = (hour > 11) ? "pm" : "am";
    if (hour > 12) {
        hour -= 12;
    }
    if (hour == 0) {
        hour = "12";
    }
    return hour + amPM;
}

// Build the hourly temperature list
function buildHourlyData(nextHour, hourlyTemps) {
    // Data comes from a JavaScript object of hourly temp name - value pairs
    // Next hour should have a value between 0-23
    // The hourlyTemps variable holds an array of temperatures
    // Line 8 builds a list item showing the time for the next hour 
    // and then the first element (value in index 0) from the hourly temps array
    let hourlyListItems = '<li>' + format_time(nextHour) + ': ' + hourlyTemps[0] + '&deg;F</li>';
    // Build the remaining list items using a for loop
    for (let i = 1, x = hourlyTemps.length; i < x; i++) {
        hourlyListItems += '<li>' + format_time(nextHour + i) + ': ' + hourlyTemps[i] + '&deg;F</li>';
    }
    console.log('HourlyList is: ' + hourlyListItems);
    return hourlyListItems;
}

function convertCelsiusToFahrenheit(temp) {

    // Convert to Fahrenheit
    let fahrenheit = (temp * 9/5) + 32;
    // Round Fahrenheit
    let roundedFahrenheit = Math.round(fahrenheit);

    return roundedFahrenheit;
}



// functions copied from geo_loc.js




// Gets location information from the NWS API
function getLocation(locale) {
    const URL = "https://api.weather.gov/points/" + locale;
    // NWS User-Agent header (built above) will be the second parameter 
    fetch(URL, idHeader)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            throw new ERROR('Response not OK.');
        })
        .then(function (data) {
            // Let's see what we got back
            console.log('Json object from getLocation function:');
            console.log(data);
            // Store data to localstorage 
            storage.setItem("locName", data.properties.relativeLocation.properties.city);
            storage.setItem("locState", data.properties.relativeLocation.properties.state);

            // Next, get the weather station ID before requesting current conditions 
            // URL for station list is in the data object 
            let stationsURL = data.properties.observationStations;
            // Call the function to get the list of weather stations
            getStationId(stationsURL);
            // URL for forecast and hourly forecast
            let forecastURL = data.properties.forecast;
            let hourlyForecastURL = data.properties.forecastHourly;

            // Call getForecast to get more data
            getForecast(forecastURL);

            // Call getHourlyForecast to get hourly data
            getHourlyForecast(hourlyForecastURL);

        })
        .catch(error => console.log('There was a getLocation error: ', error))
} // end getLocation function

// Gets weather station list and the nearest weather station ID from the NWS API
function getStationId(stationsURL) {
    // NWS User-Agent header (built above) will be the second parameter 
    fetch(stationsURL, idHeader)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            throw new ERROR('Response not OK.');
        })
        .then(function (data) {
            // Let's see what we got back
            console.log('From getStationId function:');
            console.log(data);

            // Store station ID and elevation (in meters - will need to be converted to feet) 
            let stationId = data.features[0].properties.stationIdentifier;
            let stationElevation = data.features[0].properties.elevation.value;
            console.log('Station and Elevation are: ' + stationId, stationElevation);

            // Store data to localstorage 
            storage.setItem("stationId", stationId);
            storage.setItem("stationElevation", stationElevation);

            // Request the Current Weather for this station 
            getWeather(stationId);
        })
        .catch(error => console.log('There was a getStationId error: ', error))
} // end getStationId function

// Gets current weather information for a specific weather station from the NWS API
function getWeather(stationId) {
    // This is the URL for current observation data 
    const URL = 'https://api.weather.gov/stations/' + stationId + '/observations/latest';
    // NWS User-Agent header (built above) will be the second parameter 
    fetch(URL, idHeader)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            throw new ERROR('Response not OK.');
        })
        .then(function (data) {
            // Let's see what we got back
            console.log('From getWeather function:');
            console.log(data);

            // Store weather information to localStorage 
            storage.setItem("shortLat", data.geometry.coordinates[0].toFixed(2));
            storage.setItem("shortLon", data.geometry.coordinates[1].toFixed(2));
            storage.setItem("temp", data.properties.temperature.value);
            storage.setItem("wind", data.properties.windSpeed.value);
            storage.setItem("summary", data.properties.textDescription);
            storage.setItem("elevation", data.properties.elevation.value);

            buildPage(); 

        })
        .catch(error => console.log('There was a getWeather error: ', error))
} // end getWeather function

// Gets the forecast object from the URL provided by the station object
function getForecast(forecastURL) {
    // NWS User-Agent header (built above) will be the second parameter 
    fetch(forecastURL, idHeader)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            throw new ERROR('Response not OK.');
        })
        .then(function (data) {
            // Let's see what we got back
            console.log('From getForecast function:');
            console.log(data);

            // Storing different weather data in the local storage
            storage.setItem("windDirection", data.properties.periods[0].windDirection);
            storage.setItem("gusts", data.properties.periods[0].windSpeed);
            if (data.properties.periods[0].temperature > data.properties.periods[1].temperature) {
                storage.setItem("high", data.properties.periods[0].temperature)
                storage.setItem("low", data.properties.periods[1].temperature)
            } else {
                storage.setItem("low", data.properties.periods[0].temperature)
                storage.setItem("high", data.properties.periods[1].temperature)
            }
        })
        .catch(error => console.log('There was a getForecast error: ', error))
}

function getHourlyForecast(hourlyForecastURL) {
    fetch(hourlyForecastURL, idHeader)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            throw new ERROR('Response not OK.');
        })
        .then(function (data) {
            // Let's see what we got back
            console.log('From getHourlyForecast function:');
            console.log(data);

            storage.setItem("hourOne", data.properties.periods[0].temperature);
            storage.setItem("hourTwo", data.properties.periods[1].temperature);
            storage.setItem("hourThree", data.properties.periods[2].temperature);
            storage.setItem("hourFour", data.properties.periods[3].temperature);
            storage.setItem("hourFive", data.properties.periods[4].temperature);
            storage.setItem("hourSix", data.properties.periods[5].temperature);
            storage.setItem("hourSeven", data.properties.periods[6].temperature);
            storage.setItem("hourEight", data.properties.periods[7].temperature);
            storage.setItem("hourNine", data.properties.periods[8].temperature);
            storage.setItem("hourTen", data.properties.periods[9].temperature);
            storage.setItem("hourEleven", data.properties.periods[10].temperature);
            storage.setItem("hourTwelve", data.properties.periods[11].temperature);
            storage.setItem("hourThirteen", data.properties.periods[12].temperature);

            // Create a varibale with the current date
            let ct = new Date();
            // Get the hour and format it
            let hour1 = format_time(ct.getHours());
            // Check to see if it formatted correctly
            console.log(hour1);
            // Try again and add 1 to get the next hour
            let hour2 = format_time((ct.getHours() + 1));
            // Check to see if it worked through the console
            console.log(hour2);
            // Do that for each of the 13 hours in the hourly forecast
            storage.setItem("hour1", hour1);
            storage.setItem("hour2", hour2);
            storage.setItem("hour3", format_time((ct.getHours() + 2)));
            storage.setItem("hour4", format_time((ct.getHours() + 3)));
            storage.setItem("hour5", format_time((ct.getHours() + 4)));
            storage.setItem("hour6", format_time((ct.getHours() + 5)));
            storage.setItem("hour7", format_time((ct.getHours() + 6)));
            storage.setItem("hour8", format_time((ct.getHours() + 7)));
            storage.setItem("hour9", format_time((ct.getHours() + 8)));
            storage.setItem("hour10", format_time((ct.getHours() + 9)));
            storage.setItem("hour11", format_time((ct.getHours() + 10)));
            storage.setItem("hour12", format_time((ct.getHours() + 11)));
            storage.setItem("hour13", format_time((ct.getHours() + 12)));
        })
        .catch(error => console.log('There was a getHourlyForecast error: ', error))
}

function buildPage() {

    // Input all the local storage values into variables
    // Location and current weather
    let locName = storage.getItem('locName');
    let locState = storage.getItem('locState');
    let shortLat = storage.getItem('shortLat');
    let shortLon = storage.getItem('shortLon');
    let temp = storage.getItem('temp');
    let wind = storage.getItem('wind');
    let summary = storage.getItem('summary');
    let elevation = storage.getItem('elevation');
    let windDirection = storage.getItem('windDirection');
    let gusts = storage.getItem('gusts');
    let high = storage.getItem('high');
    let low = storage.getItem('low');
    // Temperature for each hour
    let hourOne = storage.getItem('hourOne');
    let hourTwo = storage.getItem('hourTwo');
    let hourThree = storage.getItem('hourThree');
    let hourFour = storage.getItem('hourFour');
    let hourFive = storage.getItem('hourFive');
    let hourSix = storage.getItem('hourSix');
    let hourSeven = storage.getItem('hourSeven');
    let hourEight = storage.getItem('hourEight');
    let hourNine = storage.getItem('hourNine');
    let hourTen = storage.getItem('hourTen');
    let hourEleven = storage.getItem('hourEleven');
    let hourTwelve = storage.getItem('hourTwelve');
    let hourThirteen = storage.getItem('hourThirteen');
    // Specific hour with AM or PM
    let hour1 = storage.getItem('hour1');
    let hour2 = storage.getItem('hour2');
    let hour3 = storage.getItem('hour3');
    let hour4 = storage.getItem('hour4');
    let hour5 = storage.getItem('hour5');
    let hour6 = storage.getItem('hour6');
    let hour7 = storage.getItem('hour7');
    let hour8 = storage.getItem('hour8');
    let hour9 = storage.getItem('hour9');
    let hour10 = storage.getItem('hour10');
    let hour11 = storage.getItem('hour11');
    let hour12 = storage.getItem('hour12');
    let hour13 = storage.getItem('hour13');

    // Use those varibles and input them into the HTML or where needed
    // Inputting the hourly forcast with hour 
    document.getElementById('hour1').innerHTML = hour1;
    document.getElementById('hour2').innerHTML = hour2;
    document.getElementById('hour3').innerHTML = hour3;
    document.getElementById('hour4').innerHTML = hour4;
    document.getElementById('hour5').innerHTML = hour5;
    document.getElementById('hour6').innerHTML = hour6;
    document.getElementById('hour7').innerHTML = hour7;
    document.getElementById('hour8').innerHTML = hour8;
    document.getElementById('hour9').innerHTML = hour9;
    document.getElementById('hour10').innerHTML = hour10;
    document.getElementById('hour11').innerHTML = hour11;
    document.getElementById('hour12').innerHTML = hour12;
    document.getElementById('hour13').innerHTML = hour13;
    // Inputting the hourly forecast with the temperature
    document.getElementById('hourOne').innerHTML = hourOne;
    document.getElementById('hourTwo').innerHTML = hourTwo;
    document.getElementById('hourThree').innerHTML = hourThree;
    document.getElementById('hourFour').innerHTML = hourFour;
    document.getElementById('hourFive').innerHTML = hourFive;
    document.getElementById('hourSix').innerHTML = hourSix;
    document.getElementById('hourSeven').innerHTML = hourSeven;
    document.getElementById('hourEight').innerHTML = hourEight;
    document.getElementById('hourNine').innerHTML = hourNine;
    document.getElementById('hourTen').innerHTML = hourTen;
    document.getElementById('hourEleven').innerHTML = hourEleven;
    document.getElementById('hourTwelve').innerHTML = hourTwelve;
    document.getElementById('hourThirteen').innerHTML = hourThirteen;
    // Inputting the location and current weather data into the correct spots
    let fullName = locName + ', ' + locState;
    console.log(fullName);
    // Input the fullName into the title

    // Input the location name onto the page
    document.getElementById('contentHeading').innerHTML = fullName;
    // Latitude, Longitude
    document.getElementById('latitude').innerHTML = shortLat;
    document.getElementById('longitude').innerHTML = shortLon;
    // Elevation and change it into feet
    convertMetersToFeet(elevation);
    // High and low
    document.getElementById('daily-high').innerHTML = high + '&deg;F';
    document.getElementById('daily-low').innerHTML = low + '&deg;F';
    // Wind, gusts and direction
    document.getElementById('direction').innerHTML = windDirection;
    document.getElementById('gusts').innerHTML = gusts;
    document.getElementById('windSpeed').innerHTML = Math.round(wind);

    // Run celsius to fahrenheit function
    document.getElementById('current-temp').innerHTML = (convertCelsiusToFahrenheit(temp)) + '&deg;F';
    // Run the Wind Chill function
    buildWC(wind, convertCelsiusToFahrenheit(temp));

    // Run Wind Dial function
    windDial(direction);

    // Run getCondition function
    let newCondition = getCondition(summary);

    // Run changeSummaryImage
    changeSummaryImage(newCondition);
    
    // Input the Summary text into the heading
    document.getElementById('summary').innerHTML = summary;

    // Change the title of the page
    let pageTitle = document.getElementById('pageTitle');
    // if there is already a node there, remove it
    if (pageTitle.childNodes.length > 1) {
    pageTitle.childNodes[0].remove();
    }
    // Create a text node containing the full name 
    let fullNameNode = document.createTextNode(fullName);
    // inserts the fullName value before any other content that might exist
    pageTitle.insertBefore(fullNameNode, pageTitle.childNodes[0]);

    // Remove the hide class to display the results
    document.getElementById('status').setAttribute('class', 'hide');
    mainContent.setAttribute('class', '');

}

// let pageTitle = doc.getElementById('pageTitle')
// if (pageTitle.childNodes.length > 1)
// pageTitle.childNodes[0].remove();