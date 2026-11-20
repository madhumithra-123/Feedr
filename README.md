# 🍔 Feedr – Online Food Ordering System

Feedr is a full-stack online food ordering web application that allows customers to browse food items, explore different food categories, add products to their cart, and place orders online with Cash on Delivery (COD).

The project also includes a separate Admin Panel that allows administrators to manage food products, upload food images, view customer orders, and update order delivery statuses.

The application is developed using the **MERN Stack (MongoDB, Express.js, React.js and Node.js)**.

---

## 📌 Table of Contents

1. Project Overview
2. Main Features
3. Technologies Used
4. Project Architecture
5. Detailed Working of the Project
6. User Authentication and Authorization
7. Shopping Cart Management
8. Order Processing System
9. Admin Panel
10. Database Design
11. API Endpoints
12. Project Folder Structure
13. Installation and Setup
14. Environment Variables
15. Running the Application

---

## 1. Project Overview

Feedr provides an online platform where customers can conveniently order food without visiting a physical restaurant.

The application consists of three major components:

- **Customer Frontend:** Allows users to browse food items, register, log in, manage their cart and place orders.
- **Admin Panel:** Allows administrators to add and remove food items and manage customer orders.
- **Backend Server:** Handles authentication, database operations, food management, cart operations and order processing.

MongoDB is used to store user information, food details, cart data and order information.

---

## 2. Main Features

### Customer Features
- User registration and login.
- Browse all available food items.
- Explore food items based on categories.
- View food descriptions and prices.
- Add food items to the shopping cart.
- Increase or decrease item quantities.
- View cart subtotal and delivery charges.
- Enter delivery information.
- Place orders using Cash on Delivery.
- View previously placed orders.
- Track order status.

### Admin Features
- Secure admin login.
- Add new food products.
- Upload food images.
- Specify food name, description, price and category.
- View all available food products.
- Remove food products.
- View all customer orders.
- View customer delivery information.
- Update order status.

---

## 3. Technologies Used

| Technology | Purpose |
|---|---|
| React.js | Frontend user interface |
| Vite | Frontend development and build tool |
| Node.js | Backend runtime environment |
| Express.js | Backend API development |
| MongoDB Atlas | Cloud database |
| Mongoose | MongoDB object modelling |
| JWT | User authentication |
| Bcrypt | Password hashing |
| Axios | HTTP requests between frontend and backend |
| Multer | Food image uploads |
| React Router | Frontend navigation |
| React Toastify | Success and error notifications |
| CSS | Application styling |

---

## 4. Project Architecture

Feedr follows a three-part application architecture.

**1. Frontend Layer**

The React frontend provides the customer interface. Users interact with the application through pages such as Home, Cart, Place Order and My Orders.

**2. Backend Layer**

The Express.js backend receives requests from both the customer frontend and admin panel. It processes requests through routes, controllers and middleware.

**3. Database Layer**

MongoDB stores application data. Mongoose models define the structure of users, food products and orders.

### Application Flow

Customer Frontend / Admin Panel  
↓  
Axios HTTP Requests  
↓  
Express.js Backend  
↓  
Authentication Middleware (JWT)  
↓  
Controllers  
↓  
Mongoose Models  
↓  
MongoDB Database

The backend also serves uploaded food images through a static `/images` endpoint.

---

## 5. Detailed Working of the Project

### 5.1 Customer Registration

When a new customer registers:

1. The customer enters their name, email and password.
2. The frontend sends the registration details to the backend.
3. The backend checks whether the email already exists.
4. It validates the email format using Validator.
5. It checks whether the password contains at least eight characters.
6. Bcrypt generates a salt and hashes the password.
7. The new user is saved in MongoDB.
8. A JWT authentication token is generated.
9. The token and user role are returned to the frontend.

Passwords are stored as hashed values rather than plain text.

### 5.2 Customer Login

1. The customer enters their email and password.
2. The frontend sends the credentials to the login API.
3. The backend searches for the user using their email.
4. Bcrypt compares the entered password with the stored password hash.
5. If the credentials are valid, the backend generates a JWT token.
6. The token and user role are returned.
7. The frontend stores the token in local storage.

The token is subsequently used to authenticate protected requests.

### 5.3 Browsing Food Items

The home page displays the available food products.

1. The frontend requests the food list from the backend.
2. The backend retrieves all food documents from MongoDB.
3. The food information is returned as a JSON response.
4. React displays the food items with their images, names, descriptions and prices.

Food items can be explored through categories such as:

- Salad
- Rolls
- Deserts
- Sandwich
- Cake
- Pure Veg
- Pasta
- Noodles

### 5.4 Shopping Cart Management

The shopping cart allows customers to select multiple food items.

**Adding Items:**

1. The customer clicks the Add button.
2. The selected food item's ID is sent to the backend.
3. The backend identifies the user through the JWT token.
4. The item's quantity is increased in the user's cart data.
5. The updated cart is stored in MongoDB.

**Removing Items:**

1. The customer clicks the remove option.
2. The backend identifies the selected item.
3. If the quantity is greater than one, it decreases the quantity by one.
4. Otherwise, the item is removed from the cart.
5. The updated cart is saved in MongoDB.

**Cart Calculation:**

The subtotal is calculated using:

Subtotal = Σ (Item Price × Quantity)

Delivery Fee = $2

Total Amount = Subtotal + Delivery Fee

The cart data is also retrieved from MongoDB when an authenticated customer returns to the application.

### 5.5 Placing an Order

The order placement process works as follows:

1. The customer proceeds to checkout.
2. The customer enters delivery information, including name, email, street, city, state, ZIP code, country and phone number.
3. The frontend collects all selected food items and their quantities.
4. The order details and delivery address are sent to the backend.
5. The backend retrieves the actual food prices from MongoDB.
6. It recalculates the subtotal using database prices rather than trusting the amount sent by the browser.
7. A delivery fee of $2 is added.
8. A new order document is created in MongoDB.
9. The payment field is set to false because the application uses Cash on Delivery.
10. The customer's cart is cleared after successful order placement.
11. The customer is redirected to the My Orders page.

### 5.6 Order Tracking

Customers can view their previously placed orders.

1. The customer opens the My Orders page.
2. The frontend sends an authenticated request to the backend.
3. The backend retrieves orders associated with the customer's user ID.
4. The frontend displays the ordered items, total amount and current order status.

The order status can be:

- Food Processing
- Out for delivery
- Delivered

Customers can refresh their order information using the Track Order button.

---

## 6. User Authentication and Authorization

Feedr uses JSON Web Tokens (JWT) to authenticate users.

### JWT Authentication Working

1. The user logs in with valid credentials.
2. The backend generates a JWT token containing the user's ID.
3. The token is returned to the frontend.
4. The frontend stores the token in local storage.
5. For protected API requests, the token is included in the request headers.
6. The authentication middleware verifies the token using the JWT secret.
7. If valid, the user's ID is attached to the request.
8. The request proceeds to the appropriate controller.

### Role-Based Access

The application supports two user roles:

- **User:** Can browse food, manage their cart and place orders.
- **Admin:** Can manage food products and customer orders.

The backend checks the user's role before performing administrative operations.

---

## 7. Admin Panel Working

The Admin Panel is a separate React application.

### Admin Login

- The administrator enters their email and password.
- The backend verifies the credentials.
- The role returned by the backend is checked.
- Only users with the admin role can access administrative functionality.

### Add Food

The administrator provides:

- Food name
- Description
- Price
- Category
- Food image

Multer handles image uploads and stores the image in the backend uploads folder. The image filename and other food information are saved in MongoDB.

### List and Remove Food

The admin can view all food products stored in the database.

When an administrator removes a product, the backend deletes its database document and removes its associated uploaded image.

### Manage Orders

The admin can view all customer orders, including:

- Ordered food items
- Customer name
- Delivery address
- Phone number
- Total amount
- Order status

The administrator can update the order status to Food Processing, Out for delivery or Delivered.

---

## 8. Database Design

Feedr uses MongoDB with three main collections.

### 8.1 User Collection

Stores registered customer and administrator information.

| Field | Description |
|---|---|
| name | User name |
| email | Unique email address |
| password | Bcrypt hashed password |
| role | User or admin |
| cartData | Shopping cart information |

The role defaults to `user`.

### 8.2 Food Collection

Stores food product information.

| Field | Description |
|---|---|
| name | Food item name |
| description | Food description |
| price | Food price |
| image | Uploaded image filename |
| category | Food category |

### 8.3 Order Collection

Stores customer order information.

| Field | Description |
|---|---|
| userId | ID of the customer |
| items | Ordered food items and quantities |
| amount | Total order amount |
| address | Customer delivery information |
| status | Current order status |
| date | Order creation date |
| payment | Payment status |

The default order status is Food Processing, and the default payment value is false.

---

## 9. API Endpoints

The backend provides the following REST API endpoints.

### User APIs

| Method | Endpoint | Function |
|---|---|---|
| POST | `/api/user/register` | Register a new user |
| POST | `/api/user/login` | Authenticate a user |

### Food APIs

| Method | Endpoint | Function |
|---|---|---|
| GET | `/api/food/list` | Retrieve all food items |
| POST | `/api/food/add` | Add a new food item |
| POST | `/api/food/remove` | Remove a food item |

### Cart APIs

| Method | Endpoint | Function |
|---|---|---|
| POST | `/api/cart/add` | Add an item to cart |
| POST | `/api/cart/remove` | Remove an item from cart |
| POST | `/api/cart/get` | Retrieve cart information |

### Order APIs

| Method | Endpoint | Function |
|---|---|---|
| POST | `/api/order/place` | Place a new order |
| POST | `/api/order/userorders` | Retrieve customer orders |
| GET | `/api/order/list` | Retrieve all orders for admin |
| POST | `/api/order/status` | Update order status |

Protected endpoints require a valid JWT token in the request headers.

---

## 10. Project Folder Structure

```text
Feedr/
│
├── frontend/
│   ├── public/
│   └── src/
│       ├── assets/
│       ├── components/
│       ├── context/
│       ├── pages/
│       ├── App.jsx
│       └── main.jsx
│
├── admin/
│   ├── public/
│   └── src/
│       ├── assets/
│       ├── components/
│       ├── context/
│       ├── pages/
│       ├── App.jsx
│       └── main.jsx
│
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── userController.js
│   │   ├── foodController.js
│   │   ├── cartController.js
│   │   └── orderController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── userModel.js
│   │   ├── foodModel.js
│   │   └── orderModel.js
│   ├── routes/
│   │   ├── userRoute.js
│   │   ├── foodRoute.js
│   │   ├── cartRoute.js
│   │   └── orderRoute.js
│   ├── seed/
│   ├── uploads/
│   └── server.js
│
└── README.md
```

---

## 11. Installation and Setup

### Prerequisites

Install the following:

- Node.js (version 18 or later)
- npm
- MongoDB Atlas account
- Git

### Step 1: Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd Feedr
```

### Step 2: Install Backend Dependencies

```bash
cd backend
npm install
```

### Step 3: Configure Backend Environment Variables

Create a `.env` file inside the backend folder.

Configure the MongoDB connection URL, JWT secret and other required environment variables.

### Step 4: Install Frontend Dependencies

Open a new terminal:

```bash
cd frontend
npm install
```

### Step 5: Install Admin Dependencies

Open another terminal:

```bash
cd admin
npm install
```

---

## 12. Environment Variables

### Backend – `backend/.env`

```env
PORT=4000
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_secure_random_secret
SALT=10

ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=change_this_password
```

### Frontend – `frontend/.env`

```env
VITE_API_URL=http://localhost:4000
```

### Admin – `admin/.env`

```env
VITE_API_URL=http://localhost:4000
```

**Security:** Never upload actual `.env` files, MongoDB credentials or JWT secrets to GitHub. Use placeholder values in example files.

---

## 13. Running the Application

Three separate terminals are required.

### Terminal 1 – Backend

```bash
cd backend
npm run server
```

Backend runs at:

`http://localhost:4000`

### Terminal 2 – Customer Frontend

```bash
cd frontend
npm run dev
```

### Terminal 3 – Admin Panel

```bash
cd admin
npm run dev
```

### Initial Database Setup

To create the administrator account and insert sample food items, run:

```bash
cd backend
npm run seed
```

The seed script creates the admin account using the configured `ADMIN_EMAIL` and `ADMIN_PASSWORD` values and inserts sample food products from the seed data.

Use the configured administrator credentials to log in to the Admin Panel.

---

## 14. Future Enhancements

The project can be extended with:

- Online payment gateway integration.
- Order cancellation functionality.
- Customer reviews and ratings.
- Real-time order tracking.
- Email and SMS order notifications.
- Search and advanced food filters.
- Discount coupons and promotional offers.
- Cloud image storage.
- Improved admin analytics and sales reports.

---

## 15. Conclusion

Feedr is a full-stack food ordering application that demonstrates the integration of React.js, Node.js, Express.js and MongoDB.

It provides a complete ordering workflow, starting from customer registration and food browsing to cart management, order placement and order tracking.

The separate administrator interface provides food management and order management functionality.

The project demonstrates practical implementation of REST APIs, JWT authentication, password hashing, role-based access, database operations, image uploading and frontend-backend integration.

**Project Name:** Feedr – Online Food Ordering System

**Technology Stack:** MERN (MongoDB, Express.js, React.js, Node.js)