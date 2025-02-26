document.addEventListener("DOMContentLoaded", function () {
    if (document.body.classList.contains("portfolio-page")) {
        loadImages();
        attachPortfolioEventListeners();
    }

    function loadImages() {
        const imagePaths = Array.from({ length: 14 }, (_, i) =>
            `https://raw.githubusercontent.com/sazarrama/sazarrama.github.io/main/portfolio/${i + 1}.jpg`
        );
        const thumbnailsContainer = document.getElementById("grid-container");

        if (!thumbnailsContainer) {
            console.error("❌ Thumbnails container not found.");
            return;
        }

        thumbnailsContainer.innerHTML = "";

        imagePaths.forEach((path, index) => {
            const imageNumber = index + 1;
            const thumbnailDiv = document.createElement("div");
            thumbnailDiv.classList.add("thumbnail");
            thumbnailDiv.innerHTML = `<img src="${path}" class="d-block w-100" alt="Image ${imageNumber}" data-image-index="${imageNumber}">`;
            thumbnailsContainer.appendChild(thumbnailDiv);
        });
    }

    function attachPortfolioEventListeners() {
        document.body.addEventListener("click", function (event) {
            let target = event.target;
            if (target.tagName === "IMG" && target.closest(".thumbnail")) {
                let imageIndex = target.dataset.imageIndex;
                openCarousel(parseInt(imageIndex, 10));
            }
        });
    }

    function openCarousel(imageIndex) {
        const carouselInner = document.querySelector("#modalImageCarousel .carousel-inner");
        if (!carouselInner) {
            console.error("❌ Carousel inner container not found.");
            return;
        }
        carouselInner.innerHTML = "";

        const imagePaths = Array.from({ length: 14 }, (_, i) =>
            `https://raw.githubusercontent.com/sazarrama/sazarrama.github.io/main/portfolio/${i + 1}.jpg`
        );

        imagePaths.forEach((path, index) => {
            const carouselItem = document.createElement("div");
            carouselItem.classList.add("carousel-item");
            if (index === imageIndex) {
                carouselItem.classList.add("active");
            }
            carouselItem.innerHTML = `<img src="${path}" class="d-block w-100" alt="Image ${index + 1}">`;
            carouselInner.appendChild(carouselItem);
        });

        var imageModal = new bootstrap.Modal(document.getElementById("imageModal"));
        imageModal.show();

        var modalImageCarousel = new bootstrap.Carousel(document.getElementById("modalImageCarousel"), {
            interval: false // Ensure the carousel does not auto-play
        });

        document.getElementById("modalImageCarouselPrev").addEventListener("click", function () {
            modalImageCarousel.prev();
        });

        document.getElementById("modalImageCarouselNext").addEventListener("click", function () {
            modalImageCarousel.next();
        });
    }
});
