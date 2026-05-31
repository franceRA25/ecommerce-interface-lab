const BACKEND_URL = "http://localhost:8080";

document.getElementById("register-form").addEventListener("submit", async function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;
    const errorMessage = document.getElementById("error-message");
    const successMessage = document.getElementById("success-message");

    errorMessage.style.display = "none";
    successMessage.style.display = "none";

    try {
        const response = await fetch(`${BACKEND_URL}/api/v1/auth/register`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password, role })
        });

        if (response.ok) {
            // Registration successful
            successMessage.style.display = "block";
        } else {
            // Show validation errors from server
            const data = await response.json();
            if (data.errors) {
                errorMessage.textContent = data.errors.join(", ");
            } else {
                errorMessage.textContent = "Registration failed. Please try again.";
            }
            errorMessage.style.display = "block";
        }

    } catch (error) {
        console.error("Registration error:", error.message);
        errorMessage.textContent = "Could not connect to server.";
        errorMessage.style.display = "block";
    }
});