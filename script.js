document.addEventListener("DOMContentLoaded", function () {

  // **User Registration Form Validation and Submission**
  const registrationForm = document.getElementById('registrationForm');

  registrationForm.addEventListener('submit', async function (e) {
    e.preventDefault();  // Prevent the default form submission

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Validate password confirmation
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      // Send the registration data to the backend (POST /api/register)
      const response = await fetch('http://127.0.0.1:4000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });

      const data = await response.json();

      if (data.success) {
        alert('Registration successful!');
        registrationForm.reset(); // Clear the form fields
      } else {
        alert('Registration failed: ' + data.message);
      }
    } catch (error) {
      alert('Error: ' + error);
    }
  });

  // Product Catalog Dynamic Rendering (Fetching from API)
  const productCatalog = document.getElementById('productCatalog');

  async function fetchProductCatalog() {
    try {
      const response = await fetch('http://127.0.0.1:4000/api/catalog');
      if (!response.ok) {
        throw new Error('Failed to load products');
      }

      const products = await response.json();

      if (products && products.length > 0) {
        // Loop through products and display them in the catalog
        products.forEach(product => {
          const productCard = `
            <div class="col-md-4 mb-3">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">${product.name}</h5>
                  <p class="card-text">${product.description}</p>
                  <p class="card-text"><strong>Price: ${product.price}</strong></p>
                </div>
              </div>
            </div>
          `;
          productCatalog.innerHTML += productCard;  // Add to the catalog container
        });
      } else {
        productCatalog.innerHTML = '<p>No products available at the moment.</p>';
      }
    } catch (error) {
      console.error('Error fetching product catalog:', error);
      productCatalog.innerHTML = '<p>Failed to load products. Try again later.</p>';
    }
  }

  // Call the function to load products
  fetchProductCatalog();

  // Booking Form Validation and Submission
  const bookingForm = document.getElementById('bookingForm');

  bookingForm.addEventListener('submit', async function (e) {
    e.preventDefault();  // Prevent form submission

    const service = document.getElementById('service').value;
    const date = document.getElementById('date').value;

    // Simple validation for date and service selection
    if (!service || !date) {
      alert('Please select a service and a booking date');
      return;
    }

    try {
      // Send booking data to backend (POST /api/booking)
      const response = await fetch('http://127.0.0.1:5500/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ service, date })
      });

      const data = await response.json();

      if (data.success) {
        alert('Booking successful!');
        bookingForm.reset(); // Clear the form fields
      } else {
        alert('Booking failed: ' + data.message);
      }
    } catch (error) {
      alert('Error: ' + error);
    }
  });
  
});
