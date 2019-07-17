/* *************************************
 *  ACME JavaScript Functions
 ************************************* */

"use strict";

// Variables for Function Use
let navBar = document.getElementById("navBar");
let acmeURL = "/acme-project/js/acme.json";

// Run function
getNavList(acmeURL);

// Functions
// Get the names o
function getNavList() {
    fetch(acmeURL)
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
            // Create an array that contains the name of each page
            let navItems = Object.keys(data);
            console.log(navItems);

            //Set the inner HTML to the list items
            let navBar = document.getElementById('navBar');
            navBar.innerHTML = buildNavBar(navItems);

        })
        .catch(error => console.log('There was a getLocation error: ', error))
}

//This function builds the navigations bar through js
function buildNavBar(navItems) {
    let navigationList = '<li><a href="https://bhogge2.github.io/acme-project/index.html" title="Go to the home page">Home</a></li>';

    for (let i = 0; navItems.length > i; i++) {
        navigationList += '<li><a href="https://bhogge2.github.io/acme-project/' + 
        navItems[i] + '.html" title ="Go to the ' + navItems[i] + 'page">' + navItems[i] + '</li>';
    }

    console.log("Nav Bar inner HTML = " + navigationList);
    
    return navigationList;


}

// Run this when something on the navBar is clicked
navBar.addEventListener('click', function (evt) {

    // Get the city name
    let pageName = evt.target.innerHTML;
    switch (pageName) {
        case "Anvils":
        case "Explosives":
        case "Decoys":
        case "Traps":
            evt.preventDefault();
            break;
    }

    fetch(acmeURL)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            throw new ERROR('Network response was not OK.');
        })

        .then(function (data) {
            // Check the data object that was retrieved
            console.log(data);

            // Create shortcut for object
            let i = data[pageName];

            // Create variable and input the object data into them

            let description = i.description;
            // Check
            console.log(description);

            let manufacturer = i.manufacturer;
            // Check
            console.log(manufacturer);

            let reviews = i.reviews;
            // Check
            console.log(reviews);

            let price = i.price;
            // Check
            console.log(price);

            let name = i.name;
            // Check
            console.log(name);

            let path = i.path;
            // Check
            console.log(path);

            // Start inputting the info into the page
            document.getElementById("itemName").innerHTML = name;
            document.getElementById("itemDescription").innerHTML = description;
            document.getElementById("manufacturer").innerHTML = manufacturer;
            document.getElementById("price").innerHTML = price;
            document.getElementById("reviewScore").innerHTML = reviews;
            document.getElementById("itemImage").src = path;

            // Change the page title
            document.getElementById("pageTitle").innerHTML = "ACME | " + name;

            // Display content pages and hide home page
            contentPage.setAttribute('class', '');
            homePage.setAttribute('class', 'hide');

        })

        .catch(function (error) {
            console.log('There was a fetch problem: ', error.message);
            statusContainer.innerHTML = 'Sorry, the data could not be processed.';


        })
})