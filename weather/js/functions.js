/* *************************************
 *  Weather Site JavaScript Functions
 ************************************* */

// Variables for Function Use

// // Feels like temp
// let temp = 31;
// let speed = 5;
// buildWC(speed, temp);

// // Wind dial direction
// let direction = "NNE";
// windDial(direction);

// // Changes background image
// let condition = "Partly cloudy";
// let newCondition = getCondition(condition);
// changeSummaryImage(newCondition);

// // Converts meters to feet
// let meters = 1514.246;
// convertMetersToFeet(meters);

// // Change elevation to feet
// let elevationFeet = convertMetersToFeet(meters);
// convertElevation(elevationFeet);

// // Hourly Temperature
// // Get the next hour based on the current time
// let date = new Date(); 
// let nextHour = date.getHours() + 1;



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
    // Determine the dial class
    switch (direction) {
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
        case (lowerCondition.includes("wet") || lowerCondition.includes("rain") || lowerCondition.includes("storm") || lowerCondition.include("shower")):
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
        default :
            return "clear";
    }
}

function changeSummaryImage(newCondition) {
    // Checks the weather condition
    console.log(newCondition);

    // changes the class depending on the condition
    switch (newCondition) {
        // Clear
        case "clear": currentWeather.setAttribute("class", "clear");
        skyBox.setAttribute("class", "clear");
        break;
        // Rain
        case "rain": currentWeather.setAttribute("class", "rain");
        skyBox.setAttribute("class", "rain");
        break;
        // Clouds
        case "clouds": currentWeather.setAttribute("class", "clouds");
        skyBox.setAttribute("class", "clouds");
        break;
        // Snow
        case "snow": currentWeather.setAttribute("class", "snow");
        skyBox.setAttribute("class", "snow");
        break;
        // Fog
        case "fog": currentWeather.setAttribute("class", "fog");
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
    if(hour > 23){ 
     hour -= 24; 
    } 
    let amPM = (hour > 11) ? "pm" : "am"; 
    if(hour > 12) { 
     hour -= 12; 
    } 
    if(hour == 0) { 
     hour = "12"; 
    } 
    return hour + amPM;
   }

   // Build the hourly temperature list
function buildHourlyData(nextHour,hourlyTemps) {
    // Data comes from a JavaScript object of hourly temp name - value pairs
    // Next hour should have a value between 0-23
    // The hourlyTemps variable holds an array of temperatures
    // Line 8 builds a list item showing the time for the next hour 
    // and then the first element (value in index 0) from the hourly temps array
     let hourlyListItems = '<li>' + format_time(nextHour) + ': ' + hourlyTemps[0] + '&deg;F</li>';
     // Build the remaining list items using a for loop
     for (let i = 1, x = hourlyTemps.length; i < x; i++) {
      hourlyListItems += '<li>' + format_time(nextHour+i) + ': ' + hourlyTemps[i] + '&deg;F</li>';
     }
     console.log('HourlyList is: ' +hourlyListItems);
     return hourlyListItems;
    }