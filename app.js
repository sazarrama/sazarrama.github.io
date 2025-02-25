document.addEventListener("DOMContentLoaded", function () {
    function loadCommonAndFooter() {
        let commonLoaded = fetch("https://sazarrama.github.io/common.html")
            .then(response => response.text())
            .then(commonData => {
                const commonContainer = document.createElement("div");
                commonContainer.innerHTML = commonData;
                document.body.insertBefore(commonContainer, document.body.firstChild);
            })
            .catch(error => console.error("Error loading common.html:", error));

        let footerLoaded = fetch("https://sazarrama.github.io/footer.html")
            .then(response => response.text())
            .then(footerData => {
                const footerElement = document.getElementById("footer");
                if (footerElement) {
                    footerElement.innerHTML = footerData;
                } else {
                    console.error("Footer element not found.");
                }
            })
            .catch(error => console.error("Error loading footer:", error));

        // Wait for both fetches to complete before proceeding
        Promise.all([commonLoaded, footerLoaded]).then(() => {
            console.log("✅ Common and Footer loaded");
            showContent();
            loadImages();
            attachEventListeners();
        });
    }

     // Function to load loading content
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

    
    // Function to hide loading
    function hideLoading() {
        document.getElementById('loading-container').style.display = 'none';
    }

    function showContent() {
        const contentElement = document.getElementById("content");
        if (contentElement) {
            contentElement.style.display = "block";
        } else {
            console.warn("Content element not found.");
        }
    }

    function attachEventListeners() {
        document.body.addEventListener("click", function (event) {
            let target = event.target;
            if (target.tagName === "IMG" && target.closest(".thumbnail")) {
                let imageIndex = target.dataset.imageIndex;
                openCarousel(parseInt(imageIndex, 10));
            }
        });

        const footerIcons = document.querySelectorAll(".social-icon");
        footerIcons.forEach(icon => {
            icon.addEventListener("click", function (event) {
                console.log("Icon clicked:", event.target);
            });
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
            interval: false
        });

        document.getElementById("modalImageCarouselPrev").addEventListener("click", function () {
            modalImageCarousel.prev();
        });

        document.getElementById("modalImageCarouselNext").addEventListener("click", function () {
            modalImageCarousel.next();
        });
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

    // Load common and footer before proceeding
    /* TODO: FIX LOADING??? */
    loadLoading();
    loadCommonAndFooter();
    hideLoading();
});
