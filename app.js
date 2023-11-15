document.addEventListener('DOMContentLoaded', function () {

    loadImages();

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
        const thumbnailsContainer = document.getElementById("grid-container");

        if (!thumbnailsContainer) {
            console.error("thumbnailsContainer not found");
            return;
        }

        // Clear existing thumbnails
        thumbnailsContainer.innerHTML = "";

        // Create thumbnails using the imagePaths array
        imagePaths.forEach((path, index) => {
            const imageNumber = index + 1;
            const thumbnailDiv = createThumbnailDiv(imageNumber, path);
            thumbnailsContainer.appendChild(thumbnailDiv);
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        // Initialize the Bootstrap carousel
        var imageModal = new bootstrap.Modal(document.getElementById('imageModal'));
        imageModal.show();

        var modalImageCarousel = new bootstrap.Carousel(document.getElementById('modalImageCarousel'), {
            interval: false
        });

        // Handle next and previous button clicks
        document.getElementById('modalImageCarouselPrev').addEventListener('click', function () {
            modalImageCarousel.prev();
        });

        document.getElementById('modalImageCarouselNext').addEventListener('click', function () {
            modalImageCarousel.next();
        });
    });

    function createThumbnailDiv(imageNumber, imagePath) {
        const thumbnailDiv = document.createElement("div");
        thumbnailDiv.classList.add("thumbnail");
        thumbnailDiv.innerHTML = `<img src="${imagePath}" class="d-block w-100" alt="Image ${imageNumber}" data-image-index="${imageNumber}">`;
        return thumbnailDiv;
    }

    function openCarousel(imageIndex) {
        const carouselInner = document.querySelector('#modalImageCarousel .carousel-inner');
        carouselInner.innerHTML = '';

        imagePaths.forEach((path, index) => {
            const carouselItem = document.createElement('div');
            carouselItem.classList.add('carousel-item');
            if (index === imageIndex) {
                carouselItem.classList.add('active');
            }
            carouselItem.innerHTML = `<img src="${path}" class="d-block w-100" alt="Image ${index + 1}">`;
            carouselInner.appendChild(carouselItem);
        });

        var imageModal = new bootstrap.Modal(document.getElementById('imageModal'));
        imageModal.show();

        var modalImageCarousel = new bootstrap.Carousel(document.getElementById('modalImageCarousel'), {
            interval: false
        });

        // Handle next and previous button clicks
        document.getElementById('modalImageCarouselPrev').addEventListener('click', function () {
            modalImageCarousel.prev();
        });

        document.getElementById('modalImageCarouselNext').addEventListener('click', function () {
            modalImageCarousel.next();
        });
    }

    // Event listener for thumbnail clicks using event delegation
    document.body.addEventListener("click", function (event) {
        if (event.target.classList.contains("thumbnail")) {
            var imageIndex = event.target.dataset.imageIndex;

            // Open the carousel with the selected image index
            openCarousel(imageIndex);
        }
    });

    // Handle the Bootstrap modal events
    document.getElementById('imageModal').addEventListener('shown.bs.modal', function () {
        var modalImageCarousel = new bootstrap.Carousel(document.getElementById('modalImageCarousel'), {
            interval: false
        });
    });
});
