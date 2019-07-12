/* *************************************
 *  ACME JavaScript Functions
 ************************************* */

"use strict";

// Variables for Function Use

let navBar = document.getElementById("navBar");

// Functions
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

    let acmeURL = "/acme-project/js/acme.json";

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