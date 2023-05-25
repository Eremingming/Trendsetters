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

function displayProducts() {
  // Create an AJAX request
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var products = JSON.parse(xhr.responseText);
      var productList = document.getElementById('product-list');
      
      // Clear any existing products
      productList.innerHTML = '';

      // Loop through the products and create HTML elements
      for (var i = 0; i < products.length; i++) {
        var product = products[i];

        // Create product card HTML
        var card = document.createElement('div');
        card.className = 'col mb-5';
        card.innerHTML = `
          <div class="card h-100">
            <img src="${product.image}" class="card-img-top" alt="Product Image">
            <div class="card-body p-4">
              <div class="text-center">
                <h5 class="fw-bolder">${product.name}</h5>
                <span class="text-muted">${product.description}</span>
              </div>
            </div>
            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
              <div class="text-center">
                <div class="text-muted">${product.price}</div>
                <button class="btn btn-outline-dark mt-auto btn-add-to-cart" data-product='${JSON.stringify(product)}'>Add to Cart</button>
              </div>
            </div>
          </div>
        `;

        // Append the product card to the product list
        productList.appendChild(card);
      }

      // Add event listeners for the "Add to Cart" buttons
      var addToCartButtons = document.querySelectorAll('.btn-add-to-cart');
      addToCartButtons.forEach(function(button) {
        button.addEventListener('click', function() {
          var productData = JSON.parse(button.getAttribute('data-product'));
          addToCart(productData);
        });
      });
    }
  };

  // Send the AJAX request to fetch the JSON
  xhr.open('GET', 'json/products.json', true);
  xhr.send();
}

// Call the function to display products on page load
window.onload = displayProducts;


// Function to update the cart badge count in the navigation
function updateCartBadge(count) {
  const badgeElements = document.querySelectorAll('.cart-badge');
  badgeElements.forEach(function(element) {
    element.textContent = count;
  });
}


// Function to add a product to the cart
function addToCart(product) {
  let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  // Check if the product already exists in the cart
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

  // Update the cart badge count asynchronously
  updateCartBadgeAsync();

  // Update the cart badge count
  const cartItemsCount = cartItems.reduce((count, item) => count + item.quantity, 0);
  updateCartBadge(cartItemsCount);
}

// Function to update the cart badge count asynchronously
function updateCartBadgeAsync() {
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const cartItemsCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  // Simulate an asynchronous delay to mimic an AJAX request
  setTimeout(() => {
    updateCartBadge(cartItemsCount);
  }, 500); // Adjust the delay as needed
}

// Function to initialize the app
function initApp() {
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

  // Update the cart badge count on page load
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const cartItemsCount = cartItems.reduce((count, item) => count + item.quantity, 0);
  updateCartBadge(cartItemsCount);
}

// Call the initApp function to start the app
initApp();

