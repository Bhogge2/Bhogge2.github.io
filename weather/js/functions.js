/* *************************************
 *  Weather Site JavaScript Functions
 ************************************* */

// Variables for Function Use

// Feels like temp
let temp = 31;
let speed = 5;
buildWC(speed, temp);

// Wind dial direction
let direction = "NNE";
windDial(direction);

// Changes background image
let condition = "Partly cloudy";
let newCondition = getCondition(condition);
changeSummaryImage(newCondition);

// Converts meters to feet
let meters = 1514.246;
convertMetersToFeet(meters);

// Change elevation to feet
const elevationFeet = convertMetersToFeet(meters);
convertElevation(elevationFeet);



// Calculate the Windchill
function buildWC(speed, temp) {
    const feelsLike = document.getElementById('feelsTemp');
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
    const dial = document.getElementById("dial");
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
    // Determine the currentWeather class based on what is in the string
    switch (true) {
        // Clear
        case (condition.includes("clear") || condition.includes("sun")):
            return "clear";
        // Rain
        case (condition.includes("wet") || condition.includes("rain")):
            return "rain";
        // Clouds
        case (condition.includes("cloud")):
            return "clouds";
        // Snow
        case (condition.includes("snow")):
            return "snow";
        // Fog
        case (condition.includes("fog")):
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
        break;
        // Rain
        case "rain": currentWeather.setAttribute("class", "rain");
        break;
        // Clouds
        case "clouds": currentWeather.setAttribute("class", "clouds");
        break;
        // Snow
        case "snow": currentWeather.setAttribute("class", "snow");
        break;
        // Fog
        case "fog": currentWeather.setAttribute("class", "fog");
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

    return feet;
}

function convertElevation(elevationFeet) {
    // Input feet into HTML
    elevationHeight.innerHTML = elevationFeet;
}