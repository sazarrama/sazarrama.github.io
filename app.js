window.onload = function () {
    loadJQuery(function () {
        loadCommon();
        loadLoading(); // Load and show the loading page initially
        loadFooter();
    });
};

function loadJQuery(callback) {
    // Check if jQuery is already loaded
    if (typeof jQuery === 'undefined') {
        var script = document.createElement('script');
        script.src = 'https://code.jquery.com/jquery-3.6.4.min.js';
        script.onload = callback;
        document.head.appendChild(script);
    } else {
        callback();
    }
}

// After jQuery is loaded, load other scripts
loadJQuery(function () {
    // jQuery-dependent code inside $(document).ready()
    $(function () {
        // Event listener for thumbnail clicks using event delegation
        $(document).on("click", ".thumbnail", function () {
            var imageIndex = $(this).data("image-index");

            // Open the carousel with the selected image index
            openCarousel(imageIndex);
        });
    });

    // Load other scripts after jQuery is ready
    loadCommon();
    loadLoading(); // Load and show the loading page initially
    loadFooter();
});

function loadCommon() {
    fetch("https://sazarrama.github.io/common.html")
        .then(response => response.text())
        .then(commonData => {
            const commonContainer = document.createElement('div');
            commonContainer.innerHTML = commonData;
            document.body.insertBefore(commonContainer, document.body.firstChild);

            hideLoading();
            showContent();
            loadImages();
        })
        .catch(error => console.error(error));
}

function loadLoading() {
    fetch("https://sazarrama.github.io/loading.html")
        .then(response => response.text())
        .then(loadingData => {
            const loadingContainer = document.getElementById('loading');
            if (loadingContainer) {
                loadingContainer.innerHTML = loadingData;
            }
        })
        .catch(error => console.error(error));
}

function loadFooter() {
    fetch("https://sazarrama.github.io/footer.html")
        .then(response => response.text())
        .then(footerData => {
            const footerElement = document.getElementById("footer");
            if (footerElement) {
                footerElement.innerHTML = footerData;
            } else {
                console.warn("Footer element not found.");
            }
        })
        .catch(error => console.error(error));
}

function hideLoading() {
    document.getElementById('loading-container').style.display = 'none';
}

function showContent() {
    document.getElementById('content').style.display = 'block';
}
const imagePaths = Array.from({ length: 14 }, (_, i) => `https://raw.githubusercontent.com/sazarrama/sazarrama.github.io/main/portfolio/${i + 1}.jpg`);

function loadImages() {
    const imagePaths = Array.from({ length: 14 }, (_, i) => `https://raw.githubusercontent.com/sazarrama/sazarrama.github.io/main/portfolio/${i + 1}.jpg`);
    const thumbnailsContainer = document.getElementById("grid-container");

    if (!thumbnailsContainer) {
        console.error("thumbnailsContainer not found");
        return;
    }

    // Clear existing thumbnails
    thumbnailsContainer.innerHTML = "";

    fetch(imagePaths)
        .then(response => response.json())
        .then(data => {
            console.log("Data received from the API:", data);

            data.forEach(file => {
                if (file.type === "file" && file.name.endsWith(".jpg")) {
                    const imageNumber = file.name.split(".")[0];
                    const thumbnailDiv = createThumbnailDiv(imageNumber);
                    thumbnailsContainer.appendChild(thumbnailDiv);

                    // Add click and touchend event listeners
                    thumbnailDiv.addEventListener('click', () => handleThumbnailClick(imageNumber));
                    thumbnailDiv.addEventListener('touchend', () => handleThumbnailClick(imageNumber));
                }
            });

            // Initialize the Bootstrap carousel
            $('#imageCarousel').carousel();
        })
        .catch(error => console.error(error));
}

function handleThumbnailClick(imageNumber) {
    // Add your logic for handling thumbnail clicks or taps here
    console.log(`Thumbnail ${imageNumber} clicked or tapped`);
}

function createThumbnailDiv(imageNumber, imagePath) {
    const thumbnailDiv = document.createElement("div");
    thumbnailDiv.classList.add("thumbnail");
    thumbnailDiv.innerHTML = `<img src="${imagePath}" class="d-block w-100" alt="Image ${imageNumber}" onclick="openCarousel(${imageNumber}, ${JSON.stringify(imagePaths)})">`;
    return thumbnailDiv;
}

function openCarousel(imageIndex, imagePaths) {
    // Add each image to the carousel
    const carouselInner = document.querySelector('#modalImageCarousel .carousel-inner');
    carouselInner.innerHTML = '';
    imagePaths.forEach((path, index) => {
        const carouselItem = document.createElement('div');
        carouselItem.classList.add('carousel-item');
        if (index === 0) {
            carouselItem.classList.add('active');
        }
        carouselItem.innerHTML = `<img src="${path}" class="d-block w-100" alt="Image ${index + 1}">`;
        carouselInner.appendChild(carouselItem);
    });

    // Show the modal with the carousel
    $('#imageModal').modal('show');
}

window.addEventListener('load', function () {
    hideLoading();
});

function hideLoading() {
    document.getElementById('loading-container').style.display = 'none';
}

function showContent() {
    document.getElementById('content').style.display = 'block';
}

$(document).on("click", ".thumbnail", function () {
    var imageIndex = $(this).data("image-index");

    // Open the carousel with the selected image index
    openCarousel(imageIndex);
});

$(function () {
    // Handle thumbnail click event
    $(".thumbnail").on("click", function () {
        var imageIndex = $(this).data("image-index");

        // Open the carousel with the selected image index
        openCarousel(imageIndex);
    });
});

function openCarousel(imageIndex) {
    // Add each image to the carousel
    const carouselInner = document.querySelector('#modalImageCarousel .carousel-inner');
    carouselInner.innerHTML = '';

    imagePaths.forEach((path, index) => {
        const carouselItem = document.createElement('div');
        carouselItem.classList.add('carousel-item');
        if (index === 0) {
            carouselItem.classList.add('active');
        }
        carouselItem.innerHTML = `<img src="${path}" class="d-block w-100" alt="Image ${index + 1}">`;
        carouselInner.appendChild(carouselItem);
    });

    // Show the modal with the carousel
    $('#imageModal').modal('show');

    // Initialize the Bootstrap carousel
    $('#modalImageCarousel').carousel();

    // Handle next and previous button clicks
    $('#modalImageCarouselPrev').on('click', function() {
        $('#modalImageCarousel').carousel('prev');
    });

    $('#modalImageCarouselNext').on('click', function() {
        $('#modalImageCarousel').carousel('next');
    });
}

// Function to close the carousel modal
function closeCarousel() {
    $('#imageModal').modal('hide');
}


