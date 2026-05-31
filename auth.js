const BACKEND_URL = "http://localhost:8080";


async function checkAuth() {
    try {
        const response = await fetch(`${BACKEND_URL}/api/v1/auth/me`, {
            method: "GET",
            credentials: "include"
        });

        if (response.status === 401) {
            // Not logged in - redirect to login page
            console.error("401: Unauthorized - redirecting to login");
            window.location.href = "login.html";
            return false;
        }

        if (response.status === 403) {
            // Logged in but wrong role
            console.error("403: Forbidden - access denied");
            showAccessDenied();
            return false;
        }

        return true;

    } catch (error) {
        console.error("Auth check failed:", error.message);
        window.location.href = "login.html";
        return false;
    }
}

function showAccessDenied() {
    document.body.innerHTML = `
        <div style="text-align:center; padding:50px;">
            <h1 style="color:red;">Access Denied</h1>
            <p>You don't have permission to view this page.</p>
            <a href="products.html">Go back to Products</a>
        </div>
    `;
}


async function authFetch(url, options = {}) {
    try {
        // Always include credentials so JSESSIONID cookie is sent
        const response = await fetch(url, {
            ...options,
            credentials: "include"
        });

        if (response.status === 401) {
            console.error("401: Unauthorized - redirecting to login");
            window.location.href = "login.html";
            return null;
        }

        if (response.status === 403) {
            console.error("403: Forbidden - access denied");
            showAccessDenied();
            return null;
        }

        return response;

    } catch (error) {
        console.error("authFetch failed:", error.message);
        return null;
    }
}