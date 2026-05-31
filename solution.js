//number 1
function checkVariable(input) {
  switch (typeof input) {
    case "string":
      return "string";
    case "number":
      return "number";
    case "boolean":
      return "boolean";
    case "bigint":
      return "bigint";
    case "undefined":
      return "undefined";
    case "object":
      return "object";
    default:
      return "object";
  }
}

//number 2
function generateIDs(count) {
  const ids = [];
  for (let i = 0; i < count; i++) {
    if (i === 5) {
      continue;
    }
    ids.push(`ID-${i}`);
  }
  return ids;
}
console.log(generateIDs(7));

//number 3
function calculateTotal(...numbers) {
  return numbers.reduce((total, current) => {
    if (typeof current !== "number") {
      throw new TypeError("Invalid input: All arguments must be numbers");
    }
    return total + current;
  }, 0);
}

//number 4
function getTopScorers(playerList) {
  return playerList
    .filter(player => player.score > 8)
    .map(player => player.name)
    .join(", ");
}
const players = [
  { name: "john patrick", score: 10 },
  { name: "francis", score: 5 },
  { name: "jayson", score: 67 }
];
console.log(getTopScorers(players));

//number 5
class Item {
  #discount = 0.1;
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }
  get finalPrice() {
    return this.price - (this.price * this.#discount);
  }
}
const item1 = new Item("mouse", 1500);
console.log(item1.finalPrice);

//number 6
function safeDivide(a, b) {
  try {
    if (b === 0) {
      throw new Error("Cannot divide by zero");
    }
    return a / b;
  } catch (error) {
    return error.message;
  } finally {
    console.log("Operation Attempted");
  }
}
console.log(safeDivide(10, 2));
console.log(safeDivide(10, 0));


// ============================================================
// TASK 5: Fetch API & Asynchronous Data
// ============================================================

class Product {
  constructor(id, name, price, image) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.image = image;
  }
}

// Base URL for the Spring Boot REST API
const BASE_URL = "http://localhost:8080/api/v1/products";

// Cart stored in localStorage so it persists across page reloads
let cart = JSON.parse(localStorage.getItem("cart")) || [];

/**
 * Fetches all products from the Spring Boot API.
 * Uses async/await for cleaner asynchronous code.
 * try/catch handles network errors and non-OK responses.
 * Checks response.ok manually to catch 404 and 500 errors.
 * Returns empty array if fetch fails to prevent UI crash.
 */
async function fetchProducts() {
  try {
    const response = await fetch(BASE_URL);

    // Manually check response status for specific error handling
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("404: Products not found");
      } else if (response.status === 500) {
        throw new Error("500: Server error, please try again later");
      } else {
        throw new Error(`Error: ${response.status}`);
      }
    }

    const data = await response.json();
    return data;

  } catch (error) {
    // Log specific error message to console for debugging
    console.error("fetchProducts failed:", error.message);
    return [];
  }
}

/**
 * Dynamically renders product cards into the product-list div inside <main>.
 * Handles empty state if API returns no products.
 * Creates and appends HTML elements for each product.
 */
function renderProducts(products) {
  const productList = document.getElementById("product-list");
  if (!productList) return;

  productList.innerHTML = "";

  // Empty state - shown when API returns no products
  if (products.length === 0) {
    productList.innerHTML = `
      <div style="text-align:center; padding:40px; width:100%;">
        <h2>No products found</h2>
        <p>Check back later or try a different filter.</p>
      </div>`;
    return;
  }

  // Dynamically inject product cards into the DOM
  products.forEach(product => {
    const article = document.createElement("article");
    article.classList.add("product-card");

    const img = document.createElement("img");
    img.src = product.imageUrl || "shop/shopping.webp";
    img.alt = product.name;

    const title = document.createElement("h3");
    title.textContent = product.name;

    const price = document.createElement("p");
    price.textContent = "₱" + product.price.toLocaleString();

    const link = document.createElement("a");
    link.href = `detail.html?id=${product.id}`;
    link.textContent = "View Details";

    const button = document.createElement("button");
    button.textContent = "Add to Cart";
    button.setAttribute("data-id", product.id);

    article.appendChild(img);
    article.appendChild(title);
    article.appendChild(price);
    article.appendChild(link);
    article.appendChild(button);

    productList.appendChild(article);
  });
}

// Call fetchProducts on page load to dynamically inject products into <main>
if (document.getElementById("product-list")) {
  fetchProducts().then(products => renderProducts(products));
}

/**
 * Handles Add to Cart button clicks.
 * Fetches the specific product from the API using its ID.
 * try/catch handles cases where the product fetch fails.
 * Updates cart in localStorage after adding the product.
 */
document.body.addEventListener("click", async function (event) {
  if (event.target.matches("button[data-id]")) {
    const id = Number(event.target.dataset.id);

    // Fetch single product from API by ID
    let product;
    try {
      const response = await fetch(`${BASE_URL}/${id}`);

      // Throw error if product not found or server error
      if (!response.ok) throw new Error("Product not found");
      product = await response.json();
    } catch (error) {
      // Log error to console for debugging
      console.error("Could not add to cart:", error.message);
      return;
    }

    // Update quantity if product already in cart, otherwise add new entry
    const existing = cart.find(item => item.id === id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    // Visual feedback animation on the product card
    const productCard = event.target.closest(".product-card");
    productCard.classList.add("fade-in");
    setTimeout(() => productCard.classList.remove("fade-in"), 400);
  }
});

/**
 * Renders all cart items into the cart page.
 * Shows empty state message if cart is empty.
 * Calculates and displays the total price.
 */
function renderCart() {
  const cartList = document.getElementById("cart-list");
  const totalDisplay = document.getElementById("cart-total");
  const emptyMessage = document.getElementById("empty-message");

  if (!cartList || !totalDisplay) return;

  cartList.innerHTML = "";

  // Show empty message if cart has no items
  if (cart.length === 0) {
    if (emptyMessage) emptyMessage.style.display = "block";
    totalDisplay.textContent = "0";
    return;
  } else {
    if (emptyMessage) emptyMessage.style.display = "none";
  }

  // Render each cart item as a list element
  cart.forEach(item => {
    const li = document.createElement("li");

    const img = document.createElement("img");
    // Support both imageUrl (from API) and image (from old static data)
    img.src = item.imageUrl || item.image || "shop/shopping.webp";

    const title = document.createElement("h3");
    title.textContent = item.name;

    const price = document.createElement("p");
    price.textContent = "₱" + item.price.toLocaleString();

    const label = document.createElement("label");
    label.textContent = "Quantity: ";

    const input = document.createElement("input");
    input.type = "number";
    input.min = "0";
    input.value = item.quantity;
    input.dataset.id = item.id;

    label.appendChild(input);

    const buyBtn = document.createElement("button");
    buyBtn.textContent = "Buy";

    li.appendChild(img);
    li.appendChild(title);
    li.appendChild(price);
    li.appendChild(label);
    li.appendChild(buyBtn);

    cartList.appendChild(li);
  });

  // Calculate and display total price
  const total = cart.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  totalDisplay.textContent = total.toLocaleString();
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Update cart quantity when user changes the number input
document.body.addEventListener("change", function (event) {
  if (event.target.matches("input[type='number'][data-id]")) {
    const id = Number(event.target.dataset.id);
    const value = Number(event.target.value);

    // Remove item from cart if quantity is set to 0
    if (value === 0) {
      cart = cart.filter(item => item.id !== id);
    } else {
      const item = cart.find(p => p.id === id);
      if (item) item.quantity = value;
    }

    renderCart();
  }
});

// Render cart only on the cart page
if (window.location.pathname.includes("cart.html")) {
  renderCart();
}

/**
 * Checkout form validation.
 * Checks all required fields are filled in.
 * Checks a payment method is selected.
 * Adds error styling to invalid fields.
 * Redirects to thankyou.html on successful validation.
 */
const form = document.querySelector("#checkout-form");

if (form) {
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.querySelector("#name");
    const street = document.querySelector("#street");
    const zip = document.querySelector("#zip");
    const payment = document.querySelectorAll("input[name='payment']");

    let valid = true;

    // Remove previous error styling
    [name, street, zip].forEach(input => {
      input.classList.remove("error");
    });

    // Add error styling to empty required fields
    function checkEmpty(input) {
      if (input.value.trim() === "") {
        input.classList.add("error");
        valid = false;
      }
    }

    checkEmpty(name);
    checkEmpty(street);
    checkEmpty(zip);

    // Check at least one payment method is selected
    let paymentSelected = false;
    payment.forEach(radio => {
      if (radio.checked) paymentSelected = true;
    });

    if (!paymentSelected) {
      alert("Please select a payment method");
      valid = false;
    }

    if (valid) {
      console.log("Order placed successfully!");
      window.location.href = "thankyou.html";
    }
  });
}