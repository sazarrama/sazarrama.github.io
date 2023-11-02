window.onload = function () {
    showLoading(); // Show loading page initially
    loadFooterAndCommon();
}

function loadFooterAndCommon() {
    Promise.all([
        fetch("https://sazarrama.github.io/common.html").then(response => response.text()),
        fetch("https://sazarrama.github.io/footer.html").then(response => response.text())
    ]).then(([commonData, footerData]) => {
        // Create a temporary container to hold the common HTML content
        const commonContainer = document.createElement('div');
        commonContainer.innerHTML = commonData;

        // Insert the common content at the beginning of the body
        document.body.insertBefore(commonContainer, document.body.firstChild);

        // Insert the footer HTML into the div with id "footer"
        const footerElement = document.getElementById("footer");
        if (footerElement) {
            footerElement.innerHTML = footerData;
        } else {
            console.warn("Footer element not found.");
        }

        hideLoading(); // Hide loading page once content is loaded
        showContent(); // Show the main content
    }).catch(error => console.error(error));
}

function showLoading() {
    document.getElementById('loading').style.display = 'block';
}

function hideLoading() {
    document.getElementById('loading').style.display = 'none';
}

function showContent() {
    document.getElementById('content').style.display = 'block';
}
