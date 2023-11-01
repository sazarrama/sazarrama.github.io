/* Loads footer from footer.html once page is loaded fully */

document.addEventListener("DOMContentLoaded", function () {
    loadFooter();

    function loadFooter() {
        fetch("https://sazarrama.github.io/footer.html") // Path to your footer file
            .then(response => response.text())
            .then(data => {
                // Insert the footer HTML into the div with id "footer"
                const footerElement = document.getElementById("footer");
                if (footerElement) {
                    footerElement.innerHTML = data;
                } else {
                    console.warn("Footer element not found.");
                }
            })
            .catch(error => {
                console.error("Error fetching footer: " + error);
            });
    }

    function loadCommon() {
        fetch("https://sazarrama.github.io/common.html")
            .then(response => response.text())
            .then(data => {
                // Create a temporary container to hold the common HTML content
                const commonContainer = document.createElement('div');
                commonContainer.innerHTML = data;
    
                // Insert the common content at the beginning of the body
                document.body.insertBefore(commonContainer, document.head.firstChild);
            })
            .catch(error => console.error(error));
    }
    
});











