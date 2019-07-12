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

            let acmeURL = "/acme/js/acme.json";

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
                })

                .catch(function (error) {
                    console.log('There was a fetch problem: ', error.message);
                    statusContainer.innerHTML = 'Sorry, the data could not be processed.';


                })
        })