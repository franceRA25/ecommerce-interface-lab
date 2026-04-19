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

//number4
function getTopScorers(playerList) {
    return playerList
    .filter(player => player.score > 8)
    .map(player => player.name)
    .join(", ") ;
}

const players = [
    {name: "john patrick", score: 10},
    {name: "francis", score: 5},
    {name: "jayson", score: 67}
];
console.log(getTopScorers(players));

//number 5
class Item{
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





//task 6
class Product {
  constructor(id, name, price, image) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.image = image;
  }
}

const products = [
  new Product(1, "Amd Ryzen 5 5600G", 4899.00, "shop/shopping.webp"),
  new Product(2, "Nokia E series E63", 1289.00, "shop/shopping (1).webp"),
  new Product(3, "ARYE RCC-1 Wireless Gaming Mouse", 9690.00, "shop/shopping (2).webp"),
  new Product(4, "Logitic PRO X2 Lightspeed Wireless Gaming Headset", 12416.00, "shop/shopping (3).webp"),
  new Product(5, "Autodesk AutoCAD 2026 Latest Version", 99.00, "shop/shopping (4).webp"),
  new Product(6, "SERVO Mini Cellphone Q3308 Black", 5980.00, "shop/shopping (5).webp"),
  new Product(7, "ViewPlus MG-24HI 165HZ Monitor", 6767.00, "shop/shopping (6).webp")
];

const productList = document.getElementById("product-list");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

if (productList) {
  products.forEach(product => {

    const article = document.createElement("article");
    article.classList.add("product-card");

    const img = document.createElement("img");
    img.src = product.image;
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


document.body.addEventListener("click", function (event) {

  if (event.target.matches("button[data-id]")) {

    const id = Number(event.target.dataset.id);
    const product = products.find(p => p.id === id);

    const existing = cart.find(item => item.id === id);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    // ⭐ PUT IT HERE (RIGHT AFTER localStorage)
    const productCard = event.target.closest(".product-card");

    productCard.classList.add("fade-in");

    setTimeout(() => {
      productCard.classList.remove("fade-in");
    }, 400);
  }
});


function renderCart() {

  const cartList = document.getElementById("cart-list");
  const totalDisplay = document.getElementById("cart-total");
  const emptyMessage = document.getElementById("empty-message");

  if (!cartList || !totalDisplay) return;

  cartList.innerHTML = "";

  if (cart.length === 0) {
    if (emptyMessage) emptyMessage.style.display = "block";
    totalDisplay.textContent = "0";
    return;
  } else {
    if (emptyMessage) emptyMessage.style.display = "none";
  }

  cart.forEach(item => {
    const li = document.createElement("li");
    const img = document.createElement("img");
    img.src = item.image;
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

  const total = cart.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  totalDisplay.textContent = total.toLocaleString();

  localStorage.setItem("cart", JSON.stringify(cart));
}


document.body.addEventListener("change", function (event) {

  if (event.target.matches("input[type='number'][data-id]")) {

    const id = Number(event.target.dataset.id);
    const value = Number(event.target.value);

    if (value === 0) {
      cart = cart.filter(item => item.id !== id);
    } else {
      const item = cart.find(p => p.id === id);
      if (item) item.quantity = value;
    }

    renderCart();
  }
});


if (window.location.pathname.includes("cart.html")) {
  renderCart();
}

const form = document.querySelector("#checkout-form");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.querySelector("#name");
  const street = document.querySelector("#street");
  const zip = document.querySelector("#zip");
  const payment = document.querySelectorAll("input[name='payment']");

  let valid = true;

  [name, street, zip].forEach(input => {
    input.classList.remove("error");
  });

  function checkEmpty(input) {
    if (input.value.trim() === "") {
      input.classList.add("error");
      valid = false;
    }
  }

  checkEmpty(name);
  checkEmpty(street);
  checkEmpty(zip);

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

