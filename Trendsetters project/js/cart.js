// Check if the navigation bar is already loaded
if (!localStorage.getItem('navbarLoaded')) {
  // Fetch the navigation bar HTML file
  fetch('navbar.html')
    .then(response => response.text())
    .then(html => {
      // Insert the navigation bar HTML into the container
      document.getElementById('navbar-container').innerHTML = html;
      // Set the flag indicating that the navigation bar is loaded
      localStorage.setItem('navbarLoaded', true);
    });
}

// Define a variable to hold the product data
let productsData = [];

// Function to update the cart items and count in the HTML
function updateCart() {
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const cartItemsElement = document.querySelector('.cart-items');
  const badgeElement = document.querySelector('.cart-badge');
  let totalPrice = 0; // Variable to hold the total price

  // Clear the cart items container
  cartItemsElement.innerHTML = '';

  // Loop through the cart items and add them to the HTML
  cartItems.forEach((product, index) => {
    const cartItemElement = document.createElement('li');
    cartItemElement.className = 'cart-item';
    cartItemElement.innerHTML = `
      <div class="cart-item-image">
        <img src="${product.image}" alt="${product.name}" />
      </div>
      <div class="cart-item-details">
        <div class="cart-item-title">${product.name}</div>
        <div class="cart-item-price">${product.price}</div>
        <div class="cart-item-quantity">
          <button class="btn btn-outline-secondary btn-decrease-quantity" data-index="${index}">-</button>
          <span>${product.quantity}</span>
          <button class="btn btn-outline-secondary btn-increase-quantity" data-index="${index}">+</button>
        </div>
        <button class="btn btn-outline-danger btn-delete-item" data-index="${index}">Delete</button>
      </div>
    `;
    cartItemsElement.appendChild(cartItemElement);

    // Calculate the price for the current item and add it to the total price
    const itemPrice = product.price * product.quantity;
    totalPrice += itemPrice;
  });

  // Add event listeners for the delete buttons
  document.querySelectorAll('.btn-delete-item').forEach((button) => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const index = parseInt(button.getAttribute('data-index'));
      removeFromCart(index);
    });
  });

  // Add event listeners for the quantity buttons
  document.querySelectorAll('.btn-decrease-quantity').forEach((button) => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const index = parseInt(button.getAttribute('data-index'));
      decreaseQuantity(index);
    });
  });

  document.querySelectorAll('.btn-increase-quantity').forEach((button) => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const index = parseInt(button.getAttribute('data-index'));
      increaseQuantity(index);
    });
  });

  // Update the total price in the HTML
  const totalPriceElement = document.querySelector('.total-price');
  totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;

  // Reset the cart badge value to the updated cart items count
  const cartItemsCount = cartItems.reduce((count, item) => count + item.quantity, 0);
  badgeElement.textContent = cartItemsCount;
}

// Function to add a product to the cart
function addToCart(product) {
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const existingProductIndex = cartItems.findIndex((item) => item.id === product.id);

  if (existingProductIndex !== -1) {
    // If the product already exists in the cart, increase its quantity
    cartItems[existingProductIndex].quantity += 1;
  } else {
    // Otherwise, add the product with quantity 1 to the cart
    product.quantity = 1;
    cartItems.push(product);
  }

  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  updateCart();
}

// Function to remove a product from the cart
function removeFromCart(index) {
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  cartItems.splice(index, 1);
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  updateCart();
}

// Function to decrease the quantity of a product in the cart
function decreaseQuantity(index) {
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  if (cartItems[index].quantity > 1) {
    cartItems[index].quantity -= 1;
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCart();
  }
}

// Function to increase the quantity of a product in the cart
function increaseQuantity(index) {
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  cartItems[index].quantity += 1;
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  updateCart();
}

// Function to load products using AJAX
function loadProducts() {
  fetch('json/products.json') // Path to your JSON file containing product data
    .then((response) => response.json())
    .then((data) => {
      // Store the product data in the variable
      productsData = data;

      let productHTML = '';
      data.forEach((product) => {
        productHTML += `
          <div class="col mb-5">
            <div class="card h-100">
              <!-- Product image -->
              <img class="card-img-top" src="${product.image}" alt="${product.name}" />
              <div class="card-body p-4">
                <!-- Product name -->
                <h5 class="card-title">${product.name}</h5>
                <!-- Product price -->
                <h6 class="card-price">$${product.price}</h6>
                <!-- Product description -->
                <p class="card-text">${product.description}</p>
              </div>
              <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                <div class="text-center">
                  <!-- Add to cart button -->
                  <a class="btn btn-outline-dark mt-auto btn-add-to-cart" href="#" data-product="${product.id}">Add to Cart</a>
                </div>
              </div>
            </div>
          </div>
        `;
      });

      // Add the generated HTML to the product list container
      document.querySelector('.cart-items').innerHTML = productHTML;

      // Add event listener for the "Add to Cart" buttons
      document.querySelectorAll('.btn-add-to-cart').forEach((button) => {
        button.addEventListener('click', (e) => {
          e.preventDefault();
          const productId = button.getAttribute('data-product');

          // Find the selected product from the products array
          const selectedProduct = productsData.find((product) => product.id === parseInt(productId));

          // Add the selected product to the cart
          addToCart(selectedProduct);
        });
      });

      updateCart();
    });
}

// Function to initialize the app
function initApp() {
  loadProducts();
}

// Call the initApp function to start the app
initApp();

// Function to view the cart
function viewCart() {
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  // Display cart items in the console
  console.log(cartItems);
}

// Call the updateCart() function after defining it
updateCart();

// Event listener for updating the cart badge
window.addEventListener('storage', () => {
  updateCart();
});
