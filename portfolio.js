document.addEventListener("DOMContentLoaded", function () {
    if (document.body.classList.contains("body")) {
        loadImages();
        attachPortfolioEventListeners();
    }

    // Load Images into the grid
    function loadImages() {
        const imagePaths = Array.from({ length: 14 }, (_, i) =>
            `https://raw.githubusercontent.com/sazarrama/sazarrama.github.io/main/portfolio/${i + 1}.jpg`
        );
        const thumbnailsContainer = document.getElementById("grid-container");

        if (!thumbnailsContainer) {
            console.error("❌ Thumbnails container not found.");
            return;
        }

        thumbnailsContainer.innerHTML = ""; // Clear any existing images

        // Create and append thumbnail divs
        imagePaths.forEach((path, index) => {
            const thumbnailDiv = document.createElement("div");
            thumbnailDiv.classList.add("thumbnail");
            thumbnailDiv.innerHTML = `
                <img src="${path}" class="thumbnail-img" alt="Image ${index + 1}" data-image-index="${index}">
            `;
            thumbnailsContainer.appendChild(thumbnailDiv);
        });
    }

    // Event listeners for thumbnail clicks
    function attachPortfolioEventListeners() {
        document.getElementById("grid-container").addEventListener("click", function (event) {
            let target = event.target;
            if (target.tagName === "IMG" && target.closest(".thumbnail")) {
                let imageIndex = parseInt(target.dataset.imageIndex, 10);
                openCarousel(imageIndex);
            }
        });
    }

    // Open the image carousel in the modal
    function openCarousel(imageIndex) {
        const carouselInner = document.querySelector("#modalImageCarousel .carousel-inner");
        if (!carouselInner) {
            console.error("❌ Carousel inner container not found.");
            return;
        }
        carouselInner.innerHTML = ""; // Clear existing carousel items

        const imagePaths = Array.from({ length: 14 }, (_, i) =>
            `https://raw.githubusercontent.com/sazarrama/sazarrama.github.io/main/portfolio/${i + 1}.jpg`
        );

        // Create carousel items
        imagePaths.forEach((path, index) => {
            const carouselItem = document.createElement("div");
            carouselItem.classList.add("carousel-item");
            if (index === imageIndex) {
                carouselItem.classList.add("active");
            }
            carouselItem.innerHTML = `<img src="${path}" class="d-block w-100" alt="Image ${index + 1}">`;
            carouselInner.appendChild(carouselItem);
        });

        // Show the modal and set up the carousel
        var imageModal = new bootstrap.Modal(document.getElementById("imageModal"));
        imageModal.show();

        var modalImageCarousel = new bootstrap.Carousel(document.getElementById("modalImageCarousel"), {
            interval: false // Ensure the carousel does not auto-play
        });

        // Add functionality for previous and next buttons
        document.getElementById("modalImageCarouselPrev").addEventListener("click", function () {
            modalImageCarousel.prev();
        });

        document.getElementById("modalImageCarouselNext").addEventListener("click", function () {
            modalImageCarousel.next();
        });
    }
});
