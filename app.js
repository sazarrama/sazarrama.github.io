window.onload = function () {
    loadLoading(); // Load and show the loading page initially
    loadFooterAndCommon();
}

function loadLoading() {
    fetch("https://sazarrama.github.io/loading.html") // Load your loading page content
        .then(response => response.text())
        .then(loadingData => {
            const loadingContainer = document.getElementById('loading');
            if (loadingContainer) {
                loadingContainer.innerHTML = loadingData;
            }
        })
        .catch(error => console.error(error));
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

        hideLoading(); // Hide the loading page once content is loaded
        showContent(); // Show the main content
        generateThumbnails(); // Generate the image thumbnails dynamically
    }).catch(error => console.error(error));
}

window.addEventListener('load', function () {
    hideLoading(); // Call a function to hide the loading container
});

function hideLoading() {
    document.getElementById('loading-container').style.display = 'none';
}

function showContent() {
    document.getElementById('content').style.display = 'block';
}

// Function to create a carousel item
function createCarouselItem(index) {
    const carouselInner = document.querySelector('.carousel-inner');
    const item = document.createElement('div');
    item.className = 'carousel-item';
    const img = document.createElement('img');
    img.src = imageUrls[index];
    img.className = 'd-block w-100';
    img.alt = `Image ${index + 1}`;
    item.appendChild(img);
    carouselInner.appendChild(item);
}

// Function to generate carousel items
function generateCarouselItems() {
    for (let i = 0; i < imageUrls.length; i++) {
        createCarouselItem(i);
    }
}

// Call the function to generate carousel items
generateCarouselItems();

// Initialize Bootstrap Carousel
document.addEventListener('DOMContentLoaded', function () {
    const carousel = new bootstrap.Carousel(document.getElementById('carouselExample'), {
        interval: false, // Disable automatic cycling
    });

    // Carousel script
    window.openCarousel = function (imageNumber) {
        // Adjusted index to match array (1-indexed)
        const currentIndex = imageNumber - 1;

        // Activate the corresponding carousel item
        carousel.to(currentIndex);

        // Display the carousel
        document.getElementById('carouselContainer').style.display = 'flex';
    };

    // Close the carousel
    window.closeCarousel = function () {
        document.getElementById('carouselContainer').style.display = 'none';
    };
});


const imageUrls = [
    "https://github.com/sazarrama/sazarrama.github.io/blob/main/portfolio/MNV001.jpg?raw=true",
    "https://github.com/sazarrama/sazarrama.github.io/blob/main/portfolio/EB001.jpg?raw=true",
    "https://github.com/sazarrama/sazarrama.github.io/blob/main/portfolio/EB002.jpg?raw=true",
    "https://github.com/sazarrama/sazarrama.github.io/blob/main/portfolio/EB003.jpg?raw=true",
    "https://github.com/sazarrama/sazarrama.github.io/blob/main/portfolio/LW001.jpg?raw=true",
    "https://github.com/sazarrama/sazarrama.github.io/blob/main/portfolio/LW002.jpg?raw=true",
    "https://github.com/sazarrama/sazarrama.github.io/blob/main/portfolio/LOG001.jpg?raw=true",
    "https://github.com/sazarrama/sazarrama.github.io/blob/main/portfolio/MG001.jpg?raw=true",
    "https://github.com/sazarrama/sazarrama.github.io/blob/main/portfolio/MG002.jpg?raw=true",
    "https://github.com/sazarrama/sazarrama.github.io/blob/main/portfolio/MG003.jpg?raw=true",
    "https://github.com/sazarrama/sazarrama.github.io/blob/main/portfolio/MFA001.jpg?raw=true",
    "https://github.com/sazarrama/sazarrama.github.io/blob/main/portfolio/TWF001.jpg?raw=true",
    "https://github.com/sazarrama/sazarrama.github.io/blob/main/portfolio/TWF002.jpg?raw=true",
    "https://github.com/sazarrama/sazarrama.github.io/blob/main/portfolio/TWF003.jpg?raw=true",
];

// Function to create a thumbnail element
function createThumbnail(index) {
    const thumbnailContainer = document.getElementById('gridContainer');
    const thumbnail = document.createElement('div');
    thumbnail.className = 'thumbnail';
    thumbnail.onclick = function() {
        openCarousel(index + 1);
    };
    const img = document.createElement('img');
    img.src = imageUrls[index];
    img.className = 'd-block w-100';
    img.alt = `Image ${index + 1}`;
    thumbnail.appendChild(img);
    thumbnailContainer.appendChild(thumbnail);
}

// Function to generate thumbnails
function generateThumbnails() {
    for (let i = 0; i < imageUrls.length; i++) {
        createThumbnail(i);
    }
}
