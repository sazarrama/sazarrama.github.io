document.addEventListener("DOMContentLoaded", function () {
    function loadCommon() {
        return fetch("https://sazarrama.github.io/common.html")
            .then(response => response.text())
            .then(commonData => {
                const commonContainer = document.createElement("div");
                commonContainer.innerHTML = commonData;
                document.body.insertBefore(commonContainer, document.body.firstChild);
                console.log("✅ Common loaded");
                attachCommonEventListeners();
            })
            .catch(error => console.error("❌ Error loading common.html:", error));
    }

    function loadFooter() {
        const cacheBuster = new Date().getTime();
        fetch(`https://sazarrama.github.io/footer.html?nocache=${cacheBuster}`)
            .then(response => response.text())
            .then(footerData => {
                let footerElement = document.getElementById("footer");

                if (footerElement) {
                    footerElement.innerHTML = footerData; // ✅ Replace content
                    setActiveNavLink(); // Set active class after footer is loaded
                } else {
                    console.error("❌ Footer element not found in the HTML.");
                }

                attachFooterEventListeners();
            })
            .catch(error => console.error("❌ Error loading footer.html:", error));
    }
    
    function setActiveNavLink() {
        // Get the current page URL
        let currentPage = window.location.pathname.split("/").pop(); // Get current page filename
        if (!currentPage) currentPage = "index.html"; // Default to index.html if empty
    
        // Find all .nav-link elements and compare href with current page
        const navbarLinks = document.querySelectorAll(".nav-link");
        navbarLinks.forEach(link => {
            if (link.getAttribute("href") === currentPage) {
                link.classList.add("active"); // Add active class
            } else {
                link.classList.remove("active"); // Remove active class from other links
            }
        });
    }          
       
    function attachCommonEventListeners() {
        const navbarLinks = document.querySelectorAll(".nav-link");
    
        // Highlight the active link based on the current page
        let currentPage = window.location.pathname.split("/").pop(); // Get current page filename
        if (!currentPage) currentPage = "index.html"; // Default to index.html if empty
    
        navbarLinks.forEach(link => {
            if (link.getAttribute("href") === currentPage) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
    
            link.addEventListener("click", function (event) {
                console.log("Navbar link clicked:", event.target.textContent);
            });
        });
    
        const toggleMenu = document.getElementById("menu-toggle");
        if (toggleMenu) {
            toggleMenu.addEventListener("click", function () {
                document.body.classList.toggle("menu-open");
                console.log("Menu toggled");
            });
        }
    }    

    function attachFooterEventListeners() {
        const footerIcons = document.querySelectorAll(".social-icon");
        footerIcons.forEach(icon => {
            icon.addEventListener("click", function (event) {
                console.log("Icon clicked:", event.target);
            });
        });
    }

    function showContent() {
        const contentElement = document.getElementById("content");
        if (contentElement) {
            contentElement.style.display = "block";
            console.log("✅ Content displayed");
        } else {
            console.error("❌ Content element not found.");
        }
    }
    
    // Load common and footer, then images and portfolio
    async function initializePage() {
        try {
            await Promise.all([loadCommon(), loadFooter()]);
            console.log("✅ Common and Footer loaded");
    
            showContent(); // Show content after common/footer are loaded
            await loadImagesAndPortfolio(); // Load images & carousel after content is visible
        } catch (error) {
            console.error("❌ Error initializing page:", error);
        }
    }
    
    // Run when page loads
    document.addEventListener("DOMContentLoaded", initializePage);    

    // Load common and footer, then show content
    Promise.all([loadCommon(), loadFooter()])
        .then(() => {
            showContent(); // Make sure content is visible after loading
        })
        .catch(error => console.error("❌ Error loading components:", error));
});
