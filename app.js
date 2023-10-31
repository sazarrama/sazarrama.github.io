/* Loads footer from footer.html */

fetch("https://sazarrama.github.io/footer.html") // Use your GitHub Pages URL
    .then(response => response.text())
    .then(data => {
        // Insert the footer HTML into the div with id "footer"
        document.getElementById("footer").innerHTML = data;
    })
    .catch(error => console.error("Error fetching footer: " + error)
);



