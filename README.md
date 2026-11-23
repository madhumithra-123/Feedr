# Feedr - Food. Love. Delivered.

Feedr is a full-stack food ordering web application built with the **MERN stack**
(MongoDB, Express, React, Node.js). Customers browse a menu, build a cart, and place
orders (Cash on Delivery). Admins manage the menu and track orders from a separate panel.

| App | Live URL |
|---|---|
| Customer website | https://feedr-ten.vercel.app/ |
| Admin panel | https://feedr-qjd6.vercel.app/ |

> **Heads up:** the backend runs on a free hosting plan that sleeps when idle. The first
> load after a quiet period can take up to ~50 seconds while the server wakes up. After that
> everything is fast.

---

# Part 1 - How to use Feedr

## A. For customers (https://feedr-ten.vercel.app/)

### 1. Browse the menu
- The home page opens with the hero section ("Delicious Food Delivered To Your Door"),
  quick stats, and the **Explore our menu** category tiles.
- Click a category tile (Salad, Rolls, Deserts, Sandwich, Cake, Pure Veg, Pasta, Noodles)
  to filter **Popular dishes** to that category. The selected tile glows pink.
- Click **View all** (next to "Popular dishes") to clear the filter and show every dish.
- The **Exclusive offers** and **Why choose us** sections are informational banners.
- The navbar links (Home, Menu, Offers, Mobile-app, Contact us) scroll to sections of the page.

### 2. Create an account / sign in
1. Click **Sign in** in the top-right corner.
2. To register, click **Click here** under "Create a new account?", then enter your
   **name, email and password** (password must be **at least 8 characters**).
3. Tick the terms checkbox and press **Create account**. You are signed in immediately.
4. Next time, use the **Login** form with your email and password.

You can browse without an account, but you need to be signed in to **place an order** and
to have your cart **saved on the server**.

### 3. Add dishes to your cart
- On any dish card press **Add +**. The button turns into a counter: use **−** and **+**
  to change the quantity.
- A pink dot appears on the **bag icon** in the navbar whenever your cart has items.

### 4. Review your cart
1. Click the **bag icon** to open the Cart page.
2. Each row shows the image, title, price, quantity and line total. Click the **x** to
   remove an item completely.
3. **Cart Totals** shows the subtotal, a flat **$2 delivery fee**, and the total.
4. Press **Proceed to checkout**.

### 5. Place your order
1. Fill in the **Delivery Information** form: name, email, street, city, state, zip code,
   country and phone.
2. Check the totals on the right. Payment is **Cash on Delivery**: you pay when the
   food arrives, so no card details are needed.
3. Press **Place Order**. You'll see a success message and be taken to your orders page.

### 6. Track your orders
- Open **Orders** from the profile (user icon) menu in the navbar, or go to the
  Orders page after checkout.
- Each order shows the items, amount, item count and its **status**:
  `Food Processing` -> `Out for delivery` -> `Delivered`.
- Press **Track Order** on an order to refresh and see the latest status.

### 7. Sign out
Hover the **user icon** and choose **Logout**.

---

## B. For admins (https://feedr-qjd6.vercel.app/)

The admin panel is only for people whose account has the `admin` role.
The admin account is created when the project is seeded (`npm run seed`, see Part 3);
its email and password come from `ADMIN_EMAIL` / `ADMIN_PASSWORD` in the backend settings.
Regular customer accounts **cannot** use the admin panel.

### 1. Log in
Open the admin URL and sign in with the admin email and password. A normal user account is
rejected with "You are not admin".
Default admin credentials admin@feedr.com/admin12345

### 2. Add Items
1. Click **Add Items** in the sidebar.
2. Click the upload box and choose a food photo.
3. Enter the **product name**, **description**, pick a **category** and enter the **price**.
4. Press **Add**. The dish appears on the customer website immediately.

Categories must be one of: `Salad, Rolls, Deserts, Sandwich, Cake, Pure Veg, Pasta, Noodles`
(these match the customer menu tiles).

### 3. List Items
**List Items** shows all dishes (image, name, category, price). Press the round **x**
to delete a dish; its image file is deleted too.

### 4. Orders
**Orders** lists every customer order with items, delivery address, phone, total and a
**status dropdown**. Change the status to `Food Processing`, `Out for delivery` or
`Delivered`; the customer sees it the next time they open or refresh **Orders**.

### 5. Logout
Use the **Logout** button in the admin navbar.

---

# Part 2 - How Feedr works (full-stack flow)

## 1. Architecture

```
┌────────────────────┐        ┌────────────────────┐
│  Customer website  │        │    Admin panel     │
│  React + Vite      │        │  React + Vite      │
│  (frontend/)       │        │  (admin/)          │
└─────────┬──────────┘        └─────────┬──────────┘
          │      HTTPS / JSON (axios)   │
          └──────────────┬──────────────┘
                         ▼
              ┌─────────────────────┐
              │  Backend API        │
              │  Node + Express     │      ┌───────────────┐
              │  (backend/)         │◄────►│   MongoDB     │
              │  JWT auth, multer   │      │  users, foods │
              │  uploads/ images    │      │  orders       │
              └─────────────────────┘      └───────────────┘
```

- **Two React apps, one API.** The customer site and the admin panel are separate
  single-page apps that talk to the **same** Express backend.
- **The backend is the only thing that touches the database.** The browsers never connect
  to MongoDB directly.
- **Every app knows the API address** from the `VITE_API_URL` environment variable
  (defaults to `http://localhost:4000` for local development).

## 2. Tech stack

| Layer | Technology |
|---|---|
| Customer site / Admin | React 18, Vite, React Router, Axios, React Toastify, plain CSS |
| Backend | Node.js, Express, Mongoose |
| Database | MongoDB (Atlas) |
| Auth | JSON Web Tokens (`jsonwebtoken`), password hashing with `bcrypt` |
| Validation | `validator` (email format) |
| File uploads | `multer` (images saved to `backend/uploads`) |

## 3. Project structure

```
Feedr/
├── backend/
│   ├── server.js              App entry: middleware, routes, DB connect
│   ├── config/db.js           MongoDB connection (Mongoose)
│   ├── models/                userModel, foodModel, orderModel
│   ├── controllers/           user, food, cart, order logic
│   ├── routes/                userRoute, foodRoute, cartRoute, orderRoute
│   ├── middleware/auth.js     JWT verification
│   ├── seed/                  seed.js + foods.json (admin user + sample menu)
│   └── uploads/               Dish images (served at /images)
├── frontend/src/
│   ├── context/StoreContext   Global state: food list, cart, token, API helpers
│   ├── pages/                 Home, Cart, PlaceOrder, MyOrders
│   └── components/            Navbar, Header (hero), ExploreMenu, FoodDisplay,
│                              FoodItem, Offers, WhyChoose, AppDownload, Footer,
│                              LoginPopup, Logo, Icons
└── admin/src/
    ├── context/StoreContext   Admin token + role state
    ├── pages/                 Add, List, Orders
    └── components/            Navbar, Sidebar, Login, Logo, Icons
```

## 4. Database models (MongoDB collections)

**users**
| Field | Type | Notes |
|---|---|---|
| `name`, `email`, `password` | String | email is unique; password is a bcrypt hash, never plain text |
| `role` | String | `"user"` (default) or `"admin"` |
| `cartData` | Object | `{ "<foodId>": quantity }`, the user's saved cart |

**foods**
| Field | Type | Notes |
|---|---|---|
| `name`, `description`, `category` | String | category matches the menu tiles |
| `price` | Number | in dollars |
| `image` | String | filename inside `backend/uploads` |

**orders**
| Field | Type | Notes |
|---|---|---|
| `userId` | String | who placed it |
| `items` | Array | snapshot of ordered dishes with `quantity` |
| `amount` | Number | items total + $2 delivery, calculated on the server |
| `address` | Object | delivery form data |
| `status` | String | default `Food Processing` |
| `payment` | Boolean | `false`: paid on delivery |
| `date` | Date | when the order was placed |

## 5. API reference

Base URL: the backend address (`VITE_API_URL`). All responses are JSON of the form
`{ success: true/false, ... }`. **Auth** means the request must send the login token in a
`token` HTTP header.

| Method | Endpoint | Auth | Purpose |
|---|---|---|---|
| POST | `/api/user/register` | no | Create account, returns `token` + `role` |
| POST | `/api/user/login` | no | Log in, returns `token` + `role` |
| GET | `/api/food/list` | no | All dishes (used by the website and admin) |
| POST | `/api/food/add` | admin | Add a dish (multipart form with image) |
| POST | `/api/food/remove` | admin | Delete a dish and its image file |
| POST | `/api/cart/add` | user | +1 of an item in the saved cart |
| POST | `/api/cart/remove` | user | −1 of an item (removes the key at 0) |
| POST | `/api/cart/get` | user | Fetch the saved cart |
| POST | `/api/order/place` | user | Create an order from the cart |
| POST | `/api/order/userorders` | user | The logged-in user's orders |
| GET | `/api/order/list` | admin | All orders |
| POST | `/api/order/status` | admin | Update an order's status |
| GET | `/images/<file>` | no | Static dish images |

## 6. Authentication & authorization flow

1. **Register / login** (`LoginPopup` -> `/api/user/register` or `/login`).
   - Registration checks the email format, requires a password of 8+ characters, rejects
     duplicate emails, hashes the password with `bcrypt` (`SALT` rounds), and saves the user.
   - Login looks the user up by email and compares the password hash with `bcrypt.compare`.
2. The server signs a **JWT** containing the user's id (using `JWT_SECRET`) and returns it
   with the user's `role`.
3. The browser stores the token in **`localStorage`** (`token`) and keeps it in React state.
   On every page load the app reads it back, so you stay signed in after refresh.
4. For protected routes the browser sends the token in the `token` header.
   `middleware/auth.js` verifies it with `jwt.verify`, then copies the user id into
   `req.body.userId` for the controller to use.
5. **Role check:** admin-only controllers (add/remove food, list orders, update status)
   load the user from the database and require `role === "admin"`. Hiding buttons in the
   UI is only cosmetic; the real enforcement is on the server, so a normal user cannot call
   these endpoints successfully even by hand.

## 7. Customer flow in detail

### 7.1 App start
`StoreContextProvider` (frontend) runs once when the site loads:
1. `GET /api/food/list` fills `food_list` (the whole menu, kept in React state).
2. If a token exists in `localStorage`, it restores it and calls `POST /api/cart/get` to
   restore the saved cart.

Every page reads this shared state through `useContext(StoreContext)`.

### 7.2 Browsing & filtering
`Home` holds a `category` state (default `All`). `ExploreMenu` sets it when a tile is
clicked; `FoodDisplay` renders only the dishes whose `category` matches. This filtering
happens in the browser; no extra API call is made.

### 7.3 Cart
- **Add/remove:** `addToCart(id)` / `removeFromCart(id)` update `cartItems`
  (`{ foodId: qty }`) in React state immediately so the UI feels instant.
- **If signed in**, the same action is also sent to `/api/cart/add` or `/remove`, which
  updates `users.cartData` in MongoDB, so the cart follows the user across devices and refreshes.
- **If not signed in**, the cart exists only in memory for that visit.
- **Totals:** `getTotalCartAmount()` multiplies each cart item's price (looked up in
  `food_list`) by its quantity. The Cart page adds the flat $2 delivery fee.

### 7.4 Placing an order (Cash on Delivery)
1. `PlaceOrder` collects the delivery address and builds the order payload:
   the cart items (full dish objects + `quantity`), the address, and an `amount`.
2. `POST /api/order/place` (with the token). The backend:
   - rejects an empty cart,
   - **looks up every dish in MongoDB and recalculates the price on the server**
     (`sum(price × quantity) + $2`), ignoring any amount the browser sent, so the total
     can't be tampered with,
   - saves an `orders` document with `payment: false` and status `Food Processing`,
   - empties the user's saved `cartData`.
3. The frontend clears its local cart, shows a success toast and navigates to `/myorders`.

### 7.5 Viewing orders
`MyOrders` calls `POST /api/order/userorders`; the server returns only orders whose
`userId` matches the token's user. **Track Order** re-fetches so a status change made by
the admin shows up.

## 8. Admin flow in detail

1. **Login:** the admin app uses the same `/api/user/login`. It stores the token and
   `role` in `localStorage`; a non-admin role is rejected with "You are not admin".
2. **Add dish:** the form is sent as `multipart/form-data` to `/api/food/add`.
   `multer` first saves the image to `backend/uploads` as `<timestamp><original name>`,
   then the controller verifies the admin role and stores the dish in MongoDB with that
   filename in `image`.
3. **List / delete dish:** `/api/food/list` fills the table; `/api/food/remove` checks the
   admin role, deletes the image file from `uploads`, and deletes the database record.
4. **Orders:** `/api/order/list` returns all orders. Changing the status dropdown calls
   `/api/order/status`, which updates the order's `status` field.
5. Because both apps share one database, a dish added in the admin panel appears on the
   customer site on the next load, and a status change appears in the customer's Orders page.

## 9. How images work

1. Admin uploads a photo -> `multer` writes it to `backend/uploads/`.
2. Only the **filename** is stored in MongoDB (`foods.image`).
3. Express serves that folder publicly at `/images` (`app.use("/images", express.static("uploads"))`).
4. The website builds the image address as `<API URL>/images/<filename>` and uses it in an `<img>`.

The project ships with 32 sample dish images in `uploads/` for the seeded menu.
Note: on free hosting the server's disk is temporary, so images uploaded later through
the admin panel may disappear when the backend restarts or redeploys.

## 10. Seeding (starter data)

`npm run seed` (in `backend/`) connects to the database and:
1. creates an **admin user** (`ADMIN_EMAIL` / `ADMIN_PASSWORD`, defaults in `.env.example`),
   or promotes the account if it exists;
2. inserts the **32 sample dishes** from `seed/foods.json`, matching them to the sample
   images in `uploads/`.
It is safe to run repeatedly; existing records are skipped.

## 11. Environment variables

**backend/.env**
| Variable | Purpose |
|---|---|
| `PORT` | Port the API listens on (default 4000) |
| `MONGO_URL` | MongoDB connection string (include a database name such as `/feedr`) |
| `JWT_SECRET` | Long random string used to sign login tokens |
| `SALT` | bcrypt rounds for password hashing (e.g. `10`) |
| `ADMIN_EMAIL`, `ADMIN_PASSWORD` | Used only by `npm run seed` |

**frontend/.env and admin/.env**
| Variable | Purpose |
|---|---|
| `VITE_API_URL` | Backend address, no trailing slash (defaults to `http://localhost:4000`) |

---

# Part 3 - Run it locally

Requirements: Node.js 18+, and a MongoDB database (Atlas or local).

```bash
# 1) Backend
cd backend
cp .env.example .env          # then fill in MONGO_URL and JWT_SECRET
npm install
npm run seed                  # admin user + sample menu
npm run server                # http://localhost:4000  ("DB Connected")

# 2) Customer website (new terminal)
cd frontend
npm install
npm run dev                   # http://localhost:5173

# 3) Admin panel (new terminal)
cd admin
npm install
npm run dev                   # http://localhost:5174
```

Generate a `JWT_SECRET` with:
`node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

---

# Notes & current behaviour

- **No online payments:** every order is Cash on Delivery (`payment: false`).
- **Guest carts aren't saved:** items added before signing in live only in the browser and are not merged into the account cart on login.
- **Delivery fee:** a flat $2 per order, added on the server.
- **Status updates** appear in a customer's Orders page when they reload it or press **Track Order** (there is no live push).
- **Security basics in place:** hashed passwords, signed tokens, server-side admin checks, and server-side price calculation. Change the default admin password before real use.
