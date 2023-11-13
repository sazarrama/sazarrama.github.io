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
        loadImages(); // Load images and thumbnails dynamically
    }).catch(error => console.error(error));
}

function loadImages() {
    const imagePath = "https://api.github.com/repos/sazarrama/sazarrama.github.io/contents/portfolio";
    const thumbnailsContainer = document.getElementById("thumbnailsContainer");

    fetch(imagePath)
        .then(response => response.json())
        .then(data => {
            data.forEach(file => {
                if (file.type === "file" && file.name.endsWith(".jpg")) {
                    const imageNumber = file.name.split(".")[0]; // Extracting the image number
                    const thumbnailDiv = createThumbnailDiv(imageNumber);
                    thumbnailsContainer.appendChild(thumbnailDiv);
                }
            });
        })
        .catch(error => console.error(error));
}

function createThumbnailDiv(imageNumber) {
    const thumbnailDiv = document.createElement("div");
    thumbnailDiv.classList.add("thumbnail");
    thumbnailDiv.addEventListener("click", function () {
        openCarousel(imageNumber);
    });

    const imageSrc = `https://raw.githubusercontent.com/sazarrama/sazarrama.github.io/main/portfolio/${imageNumber}.jpg`;
    thumbnailDiv.innerHTML = `<img src="${imageSrc}" class="d-block w-100" alt="Image ${imageNumber}">`;

    return thumbnailDiv;
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

// Carousel

function openCarousel(imageNumber) {
    const carouselContainer = document.getElementById('imageCarousel');
    const carouselInner = document.querySelector('.carousel-inner');
    const imagePath = `https://raw.githubusercontent.com/sazarrama/sazarrama.github.io/main/portfolio/${imageNumber}.jpg`;

    // Create a new carousel item
    const carouselItem = document.createElement('div');
    carouselItem.classList.add('carousel-item');
    carouselItem.innerHTML = `<img src="${imagePath}" class="d-block w-100" alt="Image ${imageNumber}">`;

    // Remove any existing active item
    const activeItem = carouselInner.querySelector('.carousel-item.active');
    if (activeItem) {
        activeItem.classList.remove('active');
    }

    // Add the new carousel item and make it active
    carouselInner.appendChild(carouselItem);
    carouselItem.classList.add('active');

    // Show the carousel container
    carouselContainer.style.display = 'flex';
}

function closeCarousel() {
    const carouselContainer = document.getElementById('imageCarousel');
    carouselContainer.style.display = 'none';
}

// JavaScript to handle thumbnail click and update the carousel
document.addEventListener('DOMContentLoaded', function () {
    const thumbnails = document.querySelectorAll('.thumbnail');
    const carouselInner = document.querySelector('.carousel-inner');
    let counter = 1;

    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', function () {
            const imgSrc = thumbnail.querySelector('img').src; // Get the image source directly
            const carouselItem = document.createElement('div');
            carouselItem.classList.add('carousel-item');
            carouselItem.innerHTML = `<img src="${imgSrc}" class="d-block w-100" alt="Image ${counter}">`;

            // Remove any existing active item
            const activeItem = carouselInner.querySelector('.carousel-item.active');
            if (activeItem) {
                activeItem.classList.remove('active');
            }

            carouselInner.appendChild(carouselItem);
            carouselItem.classList.add('active');

            // Increment the counter for the next image
            counter++;
        });
    });

    // Manually initialize the carousel
    $('#imageCarousel').carousel({
        interval: false  // Set interval to false to prevent automatic sliding
    });

    // Handle thumbnail clicks to open the carousel
    const thumb = document.querySelectorAll('.thumbnail');
    thumbn.forEach((thumbnail, index) => {
        thumb.addEventListener('click', function () {
            openCarousel(index + 1);  // index + 1 because your image numbers start from 1
        });
    });

    // Handle carousel slide event to update the active thumbnail
    $('#imageCarousel').on('slide.bs.carousel', function (event) {
        const activeIndex = event.to;
        updateActiveThumbnail(activeIndex);
    });

    function updateActiveThumbnail(index) {
        // Remove active class from existing active thumbnail
        const activeThumbnail = document.querySelector('.thumbnail.active');
        if (activeThumbnail) {
            activeThumbnail.classList.remove('active');
        }

        // Add active class to the corresponding thumbnail
        const thumbnails = document.querySelectorAll('.thumbnail');
        if (thumbnails[index]) {
            thumbnails[index].classList.add('active');
        }
    }
});
