/* Loads footer from footer.html */

document.addEventListener("DOMContentLoaded", function () {
        fetch("footer.html") // Path to your footer file
            .then(response => response.text())
            .then(data => {
                // Insert the footer HTML into the div with id "footer-container"
                document.getElementById("footer-container").innerHTML = data;
            })
            .catch(error => console.error("Error fetching footer: " + error));
});

