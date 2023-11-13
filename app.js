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

// Carousel script
function openCarousel(imageNumber) {
    const carouselContainer = document.getElementById('carouselContainer');
    const carouselImage = document.getElementById('carouselImage');
    const imagePath = `https://raw.githubusercontent.com/sazarrama/sazarrama.github.io/main/portfolio/${imageNumber}.jpg`;

    carouselImage.src = imagePath;
    carouselContainer.style.display = 'flex';
}

function closeCarousel() {
    const carouselContainer = document.getElementById('carouselContainer');
    carouselContainer.style.display = 'none';
}

// JavaScript to handle thumbnail click and update the carousel
document.addEventListener('DOMContentLoaded', function() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    const carouselInner = document.querySelector('.carousel-inner');
    let counter = 1;

    thumbnails.forEach(thumbnail => {
          thumbnail.addEventListener('click', function() {
            const imgSrc = this.dataset.imgSrc;
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
});
