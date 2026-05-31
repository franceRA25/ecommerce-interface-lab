const BACKEND_URL = "http://localhost:8080";

document.getElementById("login-form").addEventListener("submit", async function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("error-message");

    try {
        // Step 1: GET /login first to retrieve CSRF token
        const csrfResponse = await fetch(`${BACKEND_URL}/login`, {
            method: "GET",
            credentials: "include" // important: sends and receives cookies
        });

        // Extract CSRF token from response headers
        const csrfToken = csrfResponse.headers.get("X-CSRF-TOKEN") || "";

        // Step 2: POST /login with credentials and CSRF token
        // Uses application/x-www-form-urlencoded as required by Spring Security
        const loginResponse = await fetch(`${BACKEND_URL}/login`, {
            method: "POST",
            credentials: "include", // browser stores JSESSIONID cookie automatically
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams({
                username: username,
                password: password,
                _csrf: csrfToken
            })
        });

        if (loginResponse.ok || loginResponse.redirected) {
            // Login successful - redirect to products page
            console.log("Login successful!");
            window.location.href = "products.html";
        } else {
            // Login failed - show error message
            console.error("Login failed:", loginResponse.status);
            errorMessage.style.display = "block";
        }

    } catch (error) {
        // Network or server error
        console.error("Login error:", error.message);
        errorMessage.style.display = "block";
    }
});