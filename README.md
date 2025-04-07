# Capstone Project - Winter 2025

## Project Overview
For our Capstone Project, our team has developed BizHorizon – an Operations Management Platform for Small Businesses. 

BizHorizon is a fully responsive operations management platform designed for small businesses. It provides a modernized UI, secure authentication, and seamless payment integration via Stripe. With an interactive admin dashboard, real-time data visualization, and automated order processing, BizHorizon helps businesses enhances online presence and optimizes business operations.

### Key Features
- User Authentication (Login, Registration, Profile)
- Product Catalog & Customer Management
- Payment Integration (Stripe)
- Admin Dashboard
- Frontend Implementation 
- RESTful API Development with Express.js and MySQL
- Role-Based Access Control (RBAC)
- Postman API Testing
- Modern & Responsive UI 
- Dashboard with Interactive UI Elements

This README provides an overview of the completed components, project structure, and setup guide.

## Project Structure
```
CapstoneProject_T101/
│── config/
│   ├── database.js             # Database connection setup
│   ├── keys.env                # Environment variables (DO NOT COMMIT)
│
│── controllers/
│   ├── analyticsController.js  # Handles analytics-related requests
│   ├── customerController.js   # Handles customer-related logic
│   ├── feedbackController.js   # Manages feedback-related logic
│   ├── orderController.js      # Manages order-related logic
│   ├── paymentController.js    # Handles payment transactions (Stripe)
│   ├── productController.js    # Handles product management logic
│   ├── userController.js       # Manages user authentication & profile updates
│
│── middlewares/
│   ├── authMiddleware.js       # Authentication middleware for JWT verification
│
│── models/
│   ├── customerModel.js        # Customer data model
│   ├── feedbackModel.js        # Feedback data model
│   ├── orderModel.js           # Order data model
│   ├── paymentModel.js         # Payment transactions schema
│   ├── productModel.js         # Product catalog schema
│   ├── userModel.js            # User authentication schema
│
│── node_modules/               # Dependencies (Ignored in Git)
│
│── public/
│   ├── assets/                  # Static assets (images, icons, etc.)
│   ├── css/
│   │   ├── analytics_style.css  # Styles for analytics page
│   │   ├── catalog.css          # Styles for catalog page
│   │   ├── homepage_styles.css  # Styles for homepage
│   │   ├── style.css            # Global styles for the application
│   ├── js/
│   │   ├── adminFeedback.js     # Handles feedback management
│   │   ├── adminOrders.js       # Handles order management for admin
│   │   ├── analytics.js         # Handles analytics logic
│   │   ├── catalog.js           # Manages catalog display and actions
│   │   ├── catalogadmin.js      # Admin catalog management
│   │   ├── checkout.js          # Handles checkout functionality
│   │   ├── payment.js           # Payment handling script
│   │   ├── script.js            # Main frontend script
│   ├── analytics.html           # Admin Analytics page
│   ├── catalog.html             # Public Catalog page
│   ├── catalogadmin.html        # Admin Product Management page
│   ├── checkout.html            # Checkout page for payments
│   ├── home.html                # Home page
│   ├── index.html               # Landing page (Main)
│
│── routes/
│   ├── analyticsRoutes.js       # Analytics API routes
│   ├── customerRoutes.js        # Customer-related API routes
│   ├── feedbackRoutes.js        # Feedback API routes
│   ├── orderRoutes.js           # Order management API routes
│   ├── payment.js               # Payment-related API routes
│   ├── productRoutes.js         # Product-related API routes
│   ├── userRoutes.js            # User authentication API routes
│
│── .env                        # Environment variables (DO NOT COMMIT)
│── .gitignore                  # Files/Folders ignored in Git
│── customers.json              # Sample data for customers
│── index.html                  # Main frontend page
│── package-lock.json           # Dependency lock file
│── package.json                # Node.js project dependencies
│── README.md                   # Project documentation
│── script.js                   # Main script for UI handling
│── server.js                   # Main server file (Entry Point)
│── styles.css                  # General frontend styles

```

---
## Technologies Used
### Backend
- Node.js – JavaScript runtime for server-side execution.
- Express.js – Web framework for building RESTful APIs.
- MySQL – Relational database for storing users, products, payments, and customer data.
- Sequelize ORM – Object-Relational Mapping (ORM) tool for interacting with MySQL.
- JWT (JSON Web Token) – Secure authentication & authorization for API endpoints.
- Bcrypt.js – Password hashing for secure authentication.
- Dotenv – Manages environment variables securely.
- Cors – Enables cross-origin requests for API communication.
- Express Validator – Input validation and sanitization for API endpoints.

### Frontend
- HTML, CSS, JavaScript – Core web technologies for building the user interface.
- Bootstrap – Responsive design framework for styling.
- AJAX (Fetch API / Axios) – Handles API requests asynchronously.
- Stripe.js – Secure online payment integration with Stripe.
- Font Awesome – Icons for UI enhancement.
- Google Fonts – Improved typography and design customization.
- Custom CSS – Modern and responsive UI with Soft Minimalist color palette.

### Payment Integration
- Stripe API – Secure online payment processing.
- Stripe.js & Elements – Client-side payment handling for improved UX.
- Test Cards – Supports Stripe’s test environment for simulating real payments.

### API Development & Testing
- Postman – API testing and debugging tool.
- Express Validator – Used for request validation and sanitization.
- Error Handling & Logging – Implemented structured error responses for debugging.

### Version Control & Deployment
- Git & GitHub – Version control and collaboration.
---

## Completed Features
### 1. User Authentication & Management
- Secure User Registration, Login, and Profile Management.
- Password hashing using bcrypt.js for enhanced security.
- JWT-based Authentication for session management.
- Ability to view, update, and delete user profiles.
- Token-based authorization for protected routes.
- Improved error handling for authentication failures.

### 2. Product Catalog Management
- CRUD functionality for product management, including adding, updating, retrieving, and deleting products.
- Product data stored in MySQL with structured queries.
- Validation checks for product creation and updates.

### 3. Customer Management
- Store and manage customer records in a structured database.
- CRUD operations for customer management.
- Added search functionality for easier customer retrieval.

### 4. Orders Management
- Order Placement with customer and product association.
- CRUD operations for order management.
- Added real-time order status updates and validations.
- Orders stored in the MySQL database with proper foreign key relationships.

### 5. Payment Integration (Stripe)
- Stripe API Integration for secure online transactions.
- Implemented Stripe.js & Elements for a better UI/UX in payment handling.
- Test Card support for payment testing.
- Enhanced error handling for failed or declined transactions.

### 6. RESTful API Development
- Well-structured API routes, controllers, and models for all key functionalities.
- Implemented role-based access control (RBAC) for better security.
- Tested and Debugged APIs using Postman.
- Optimized database queries for MySQL.
- Improved error handling and validation mechanisms.

### 7. Admin Dashboard (Backend & Frontend APIs)
- Backend APIs implemented for managing Users, Products, Customers, and Payments
- Frontend UI built with improved styling and Soft Minimalist Palette for modern design.
- Dashboard navigation and sidebar implemented with dynamic sections.
- Button styles and UI elements improved for better user experience.

### 8. Analytics Management
- Integrated real-time data analytics in the admin dashboard.
- Implemented API to visualize business data dynamically.

### 9. Feedback Management
- Feedback submission with comments and rating.
- Admin Response functionality to user feedback.
- CRUD operations for feedback management.

### 10. Code & Database Enhancements
- Fixed various issues in Models, Controllers, and Routes.
- Successfully created and validated MySQL tables for users, catalog, and customers. 
- Code refactored and cleaned for better maintainability.

## Pending Features
- File Uploads (Multer) – (Feature planned for future versions).

## API Endpoints:
- http://localhost:4000/api/users
- http://localhost:4000/api/payment
- http://localhost:4000/api/catalog
- http://localhost:4000/admin
- http://localhost:4000/api/customers
- http://localhost:4000/api/feedbacks
- http://localhost:4000/api/orders

### User Authentication & Management
- Register User → POST /api/users/register.
- Login User → POST /api/users/login.
- Get User Profile (Protected) → GET /profile.
- Get All Users → GET /api/users.
- Update User Details → PUT /api/users/:id.
- Delete User → DELETE /api/users/:id.

### Product Catalog Management
- Retrieve All Products → GET /api/catalog.
- Add a New Product → POST /api/catalog.
- Update Product Details → PUT /api/catalog/:id.
- Delete a Product → DELETE /api/catalog/:id.

### Customer Management
- Retrieve All Customers → GET /api/customers.
- Add a New Customer → POST /api/customers
- Update Customer Details → PUT /api/customers/:id.
- Delete a Customer → DELETE /api/customers/:id.

### Payment Processing
- Process Payment via Stripe → POST /api/payment.
- Handle Payment Errors (Automatic error handling for invalid transactions).

### Admin Dashboard 
- Admin Panel Route → GET /admin
- Backend routes for managing Users, Products, Customers, and Payments.

### Analytics Management 
- Get Analytics Data → GET /api/analytics

### Feedback Management    
- Retrieve All Feedbacks → GET /api/feedbacks.
- Add a New Feedback → POST /api/feedbacks.
- Update Feedback Details → PUT /api/feedbacks/:id.
- Delete a Feedback → DELETE /api/feedbacks/:id.
---

## Frontend Pages
- http://localhost:4000/admin (Dashboard)
- http://localhost:4000/home (Home page for end users)

## Links
- GitHub Repository: [CapstoneProject_Winter2025](https://github.com/Nigar0826/CapstoneProject_Winter2025)  
- Live Deployment (Frontend): [https://bizhorizon.onrender.com](https://bizhorizon.onrender.com)  
- Live Deployment (Backend): [https://bizhorizon-backend.onrender.com](https://bizhorizon-backend.onrender.com)


## Installation & Setup
### Prerequisites 
- Node.js installed on your machine.
- MySQL Database setup.
- Stripe Account (required for payments).
- GitHub for version control.

### Step 1: Clone the Repository
```sh
git clone https://github.com/Nigar0826/CapstoneProject_Winter2025.git
cd CapstoneProject_T101
```

### Step 2: Install Dependencies
```
npm install
```

### Step 3: Set Up Environment Variables
1. Create a Stripe Account at [Stripe Dashboard](https://dashboard.stripe.com/register).
2. Get your Secret and Publishable keys from the Stripe Dashboard.
3. Create a `keys.env` file in the `config/` directory and add:
```sh
STRIPE_SECRET_KEY=sk_test_your_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key
```
4. Replace `sk_test_your_secret_key` and `pk_test_your_publishable_key` with your actual Stripe API keys.
5. Add `config/keys.env` to `.gitignore` to prevent sensitive key exposure.

**Important:** Never expose the `STRIPE_SECRET_KEY` in the frontend or GitHub.

### Step 4: Start the Server
```sh
node server.js or nodemon server.js
```
The server runs on: `http://localhost:4000`
---

## How to Test the Payment System
1. Open the payment form in a browser: `http://localhost:4000/payment' or 'http://localhost:4000/admin`
2. Enter Stripe test card details:
   - Valid Card: `4242 4242 4242 4242`
   - Expired Card: `4000 0000 0000 0069`
   - Insufficient Funds: `4000 0000 0000 9995`
3. Submit the form and check results:
   - Success: Payment confirmation displayed.
   - Failure: Proper error messages shown.
---

## Enhancements 
- Security Enhancements – Strengthen security measures, including rate limiting, input sanitization, and vulnerability scanning.
- Inventory Management Module – Add inventory tracking and stock management for seamless product catalog maintenance.
- Data Backup & Recovery – Set up automatic backups and database recovery options to ensure data safety.
- AI/ML for Business Insights – Integrate AI/ML for intelligent predictions on customer behavior and sales trends.
- Implement Functionality for End Users – Develop a customer-facing interface for end users to browse the product catalog, place orders, and manage their profiles.
- Mobile App Development – Plan a mobile version of BizHorizon to improve accessibility for business owners.

## Contributors
- Nigar - Project Lead, Payment Integration, Stripe.js Integration, API Testing, Documentation, Deployment.
- Elizabeth - Back-End Development, Authentication, Database Optimization.
- Anar - Front-End Development, UI/UX Design.
- Fatima - Admin Dashboard, API Documentation, Error Handling.

