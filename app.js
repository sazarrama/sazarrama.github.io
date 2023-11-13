window.onload = function () {
    loadLoading(); // Load and show the loading page initially
    loadFooterAndCommon();
};

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

function loadFooterAndCommon() {
    Promise.all([
        fetch("https://sazarrama.github.io/common.html").then(response => response.text()),
        fetch("https://sazarrama.github.io/footer.html").then(response => response.text())
    ]).then(([commonData, footerData]) => {
        const commonContainer = document.createElement('div');
        commonContainer.innerHTML = commonData;
        document.body.insertBefore(commonContainer, document.body.firstChild);

        const footerElement = document.getElementById("footer");
        if (footerElement) {
            footerElement.innerHTML = footerData;
        } else {
            console.warn("Footer element not found.");
        }

        hideLoading();
        showContent();
        loadImages();
    }).catch(error => console.error(error));
}

function loadImages() {
    const imagePath = "https://api.github.com/repos/sazarrama/sazarrama.github.io/contents/portfolio";
    const thumbnailsContainer = document.getElementById("grid-container");

    if (!thumbnailsContainer) {
        console.error("thumbnailsContainer not found");
        return;
    }

    fetch(imagePath)
        .then(response => response.json())
        .then(data => {
            data.forEach(file => {
                if (file.type === "file" && file.name.endsWith(".jpg")) {
                    const imageNumber = file.name.split(".")[0];
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
    hideLoading();
});

function hideLoading() {
    document.getElementById('loading-container').style.display = 'none';
}

function showContent() {
    document.getElementById('content').style.display = 'block';
}

function openModal(imageNumber) {
    const modal = document.getElementById('myModal');
    const modalContent = document.querySelector('.modal-content');
    const imagePath = `https://raw.githubusercontent.com/sazarrama/sazarrama.github.io/main/portfolio/${imageNumber}.jpg`;

    modalContent.innerHTML = `<img src="${imagePath}" class="d-block w-100" alt="Image ${imageNumber}">`;
    modal.style.display = 'block';
}

// Close the modal when clicking outside the image
window.addEventListener('click', function (event) {
    const modal = document.getElementById('myModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

function openCarousel(imageNumber) {
    const carouselInner = document.querySelector('#imageCarousel .carousel-inner');
    carouselInner.innerHTML = ''; // Clear existing carousel images

    const imagePath = `https://raw.githubusercontent.com/sazarrama/sazarrama.github.io/main/portfolio/${imageNumber}.jpg`;
    const modalContent = document.querySelector('.modal-content');
    const carouselItem = document.createElement('div');
    carouselItem.classList.add('carousel-item');
    carouselItem.innerHTML = `<img src="${imagePath}" class="d-block w-100" alt="Image ${imageNumber}">`;

    carouselInner.appendChild(carouselItem);
    
    // Activate the first item in the carousel
    const firstItem = document.querySelector('#imageCarousel .carousel-item');
    firstItem.classList.add('active');

    // Show the modal with the carousel
    document.getElementById('myModal').style.display = 'block';
}

function closeCarousel() {
    document.getElementById('myModal').style.display = 'none';
}
