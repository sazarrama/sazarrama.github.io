/* Loads footer from footer.html */

function loadFooter() {
    fetch("/footer.html") // Path to your footer file
        .then(response => response.text())
        .then(data => {
            // Insert the footer HTML into the div with id "footer"
            document.getElementById("footer").innerHTML = data;
        })
        .catch(error => console.error("Error fetching footer: " + error));
}


