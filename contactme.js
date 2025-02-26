document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");

    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault(); // Prevent default form submission

            // Get form values
            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const telephone = document.getElementById("telephone").value.trim();
            const message = document.getElementById("message").value.trim();

            // Simple validation
            if (!name || !email || !message) {
                alert("Please fill in all required fields.");
                return;
            }

            // Prepare email data
            const templateParams = {
                name: name,
                email: email,
                telephone: telephone || "Not provided",
                message: message,
            };

            // Send email using EmailJS
            emailjs.send("service_ctjihkg", "template_xgicbud", templateParams, "IYnRbwhSYEpqDDNHi")
                .then(function (response) {
                    console.log("Email sent successfully:", response);
                    alert("Message sent successfully!");
                    form.reset(); // Reset form after successful submission
                })
                .catch(function (error) {
                    console.error("Error sending email:", error);
                    alert("An error occurred. Please try again.");
                });
        });
    }
});
