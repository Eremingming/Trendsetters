function showPaymentForm() {
    // Get references to the form elements
    const form = document.getElementById("payment-form");
    const nameInput = document.getElementById("name");
    const addressInput = document.getElementById("address");
    const phoneNumberInput = document.getElementById("phone-number");
    const submitButton = document.getElementById("submit-button");

    // Handle form submission
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        // Disable the submit button to prevent multiple submissions
        submitButton.disabled = true;

        // Create an object to hold the form data
        const formData = {
            name: nameInput.value,
            address: addressInput.value,
            phoneNumber: phoneNumberInput.value,
        };

        // Perform client-side validation on the form data
        if (!validateFormData(formData)) {
            // If the data is invalid, re-enable the submit button and return
            submitButton.disabled = false;
            return;
        }

        // Send the form data to the server
        // The following is just an example and should not be used in a real-world scenario
        // as it lacks security measures and proper payment gateway integration
        fetch("/charge", {
                method: "POST",
                body: JSON.stringify(formData),
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((response) => response.json())
            .then((data) => {
                // Handle the server response
                if (data.success) {
                    // Payment was successful
                    alert("Payment successful!");
                } else {
                    // Payment failed
                    alert("Payment failed. Please try again.");
                    submitButton.disabled = false;
                }
            })
            .catch((error) => {
                console.error(error);
                alert("An error occurred. Please try again.");
                submitButton.disabled = false;
            });
    });

    function validateFormData(data) {
        // Example validation checks
        if (!data.name) {
            alert("Please enter a valid name.");
            return false;
        }
        if (!data.address) {
            alert("Please enter a valid address.");
            return false;
        }
        if (!data.phoneNumber) {
            alert("Please enter a valid phone number.");
            return false;
        }
        return true;
    }
}