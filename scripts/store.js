// === GLOBAL CART STATE ===
const cart = [];

// === DOM REFERENCES ===
const storeContainer = document.getElementById("store-container");
const cartContainer = document.getElementById("cart");
const viewCartBtn = document.getElementById("view-cart");

// === FETCH REMOTE DATA ===
const API_URL = "https://mocki.io/v1/be294d29-b69d-46d7-b0e6-f3a367054623"; 

axios.get(API_URL)
  .then(response => {
    const products = response.data;
    renderProducts(products);
  })
  .catch(error => {
    console.error("Error fetching product data:", error);
    storeContainer.innerHTML = "<p>Failed to load products. Please try again later.</p>";
  });

// === RENDER PRODUCTS ===
function renderProducts(products) {
  storeContainer.innerHTML = "";
  products.forEach(product => {
    const card = document.createElement("div");
    card.classList.add("product-card");

    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <h3>$${product.price}</h3>
      <button data-id="${product.id}">Add to Cart</button>
    `;

    const addButton = card.querySelector("button");
    addButton.addEventListener("click", () => addToCart(product));

    storeContainer.appendChild(card);
  });
}

// === ADD TO CART ===
function addToCart(product) {
  cart.push(product);
  Swal.fire({
    title: "Added to Cart",
    text: `${product.name} added to cart.`,
    icon: "success",
    timer: 1500,
    background: "#222",
    color: "#fff",
    showConfirmButton: false
  });
}

// === VIEW CART ===
viewCartBtn.addEventListener("click", () => {
  cartContainer.classList.toggle("hidden");
  renderCart();
});

function renderCart() {
  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  let total = 0;
  cartContainer.innerHTML = "<h2>Your Cart</h2>";

  cart.forEach((item, index) => {
    total += item.price;
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("cart-item");
    itemDiv.innerHTML = `
      <span>${item.name} - $${item.price}</span>
      <button data-index="${index}">Remove</button>
    `;

    itemDiv.querySelector("button").addEventListener("click", () => {
      cart.splice(index, 1);
      renderCart();
    });

    cartContainer.appendChild(itemDiv);
  });

  const totalDiv = document.createElement("div");
  totalDiv.classList.add("cart-total");
  totalDiv.innerHTML = `<strong>Total: $${total}</strong>`;
  cartContainer.appendChild(totalDiv);

  const checkoutBtn = document.createElement("button");
  checkoutBtn.textContent = "Checkout";
  checkoutBtn.addEventListener("click", () => simulateCheckout(total));
  cartContainer.appendChild(checkoutBtn);
}

function simulateCheckout(total) {
  Swal.fire({
    background: "#222",
    color: "#fff",
    title: "Order Complete",
    text: `Thank you for your purchase! Total: $${total}`,
    icon: "success"
  });
  cart.length = 0;
  renderCart();
}
