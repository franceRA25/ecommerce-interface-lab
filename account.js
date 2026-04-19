const currentUser = {
  name: "John Patrick",
  orderHistory: [
    {
      date: "March 15, 2026",
      items: "Wireless Mouse",
      total: 25
    },
    {
      date: "February 9, 2026",
      items: "Keyboard",
      total: 40
    }
  ]
};

document.querySelector("header h1").textContent =
  `${currentUser.name}'s Account`;


  const summaries = document.querySelectorAll("summary");

summaries.forEach((summary, index) => {
  summary.addEventListener("click", function () {

    const order = currentUser.orderHistory[index];
    const details = summary.parentElement;

    // prevent duplication
    if (details.querySelector(".loaded")) return;

    const content = document.createElement("div");
    content.classList.add("loaded");

    content.innerHTML = `
      <p><strong>Date:</strong> ${order.date}</p>
      <p><strong>Item:</strong> ${order.items}</p>
      <p><strong>Total:</strong> $${order.total}</p>
    `;

    details.appendChild(content);
  });
});