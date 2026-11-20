# Feedr - Food Ordering Website (MERN)

Customer site + API + database. **No online payments**: orders are placed as Cash on Delivery.

```
feedr/
├── backend/    Node + Express + MongoDB API        -> deploy on Render
├── frontend/   Feedr customer website (React/Vite) -> deploy on Vercel
└── admin/      Admin panel (React/Vite, optional)  -> deploy on Vercel
```

The admin panel is optional. `npm run seed` loads a sample menu and creates an admin login,
so the site works with only the **backend + frontend + database**. Use the admin panel when you
want to add/remove dishes or update order status from a UI.

---

## 1. Requirements

- Node.js 18 or newer (`node -v`)
- A MongoDB database: a free **MongoDB Atlas** cluster (recommended) or a local MongoDB

## 2. Set up MongoDB Atlas

1. Create a free **M0 cluster** at https://www.mongodb.com/atlas
2. **Database Access** -> *Add New Database User* -> choose a username and password
   (use letters and numbers only to avoid URL-encoding problems).
3. **Network Access** -> *Add IP Address* -> **Allow access from anywhere** (`0.0.0.0/0`).
   Needed so Render can connect.
4. **Database** -> *Connect* -> *Drivers* -> copy the connection string and add a database
   name (`/feedr`) before the `?`:
   ```
   mongodb+srv://USER:PASSWORD@cluster0.xxxxx.mongodb.net/feedr?retryWrites=true&w=majority
   ```

## 3. Run locally

### Backend
```bash
cd backend
cp .env.example .env        # Windows: copy .env.example .env
```
Open `backend/.env` and set:
- `MONGO_URL` - your Atlas string from step 2
- `JWT_SECRET` - any long random string. Generate one with:
  `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
- optionally `ADMIN_EMAIL` / `ADMIN_PASSWORD` for the admin login that gets created

Then:
```bash
npm install
npm run seed       # creates the admin user + 32 sample dishes (safe to run again)
npm run server     # API on http://localhost:4000  (should print "DB Connected")
```

### Frontend (new terminal)
```bash
cd frontend
npm install
npm run dev        # http://localhost:5173
```
It talks to `http://localhost:4000` by default. Sign up, add dishes to the cart and place an
order; it appears under **Orders** in the profile menu.

### Admin panel (optional, new terminal)
```bash
cd admin
npm install
npm run dev        # http://localhost:5174
```
Log in with the admin email/password from your `.env`
(defaults: `admin@feedr.com` / `admin12345`). **Change the password before going live.**
Categories must be one of: `Salad, Rolls, Deserts, Sandwich, Cake, Pure Veg, Pasta, Noodles`.

---

## 4. Deploy

Deploy in this order, because each step needs the URL from the previous one.

### Step 1 - Push to GitHub
```bash
git init
git add .
git commit -m "Feedr"
# create an empty repo on GitHub, then:
git remote add origin https://github.com/<you>/<repo>.git
git branch -M main
git push -u origin main
```
`.gitignore` already keeps `node_modules` and `.env` out of the repo.

### Step 2 - Seed the production database (from your computer)
Render's free plan has no shell, so seed Atlas directly from your machine: make sure
`backend/.env` has your **Atlas** `MONGO_URL`, then run `npm run seed` inside `backend/`.

### Step 3 - Backend on Render
1. Render -> **New -> Web Service** -> select your repo.
2. Settings:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
3. **Environment Variables:** `MONGO_URL`, `JWT_SECRET`, `SALT` (= `10`).
4. Deploy. Open the Render URL; it should say **API Working**.
   Note the URL, e.g. `https://feedr-api.onrender.com`.

Notes on the free plan:
- The service sleeps after inactivity; the first request can take ~50 seconds.
- The disk is wiped on every redeploy. The 32 sample dish images are part of the repo
  (`backend/uploads`) so they survive. **Images you upload later through the admin panel will
  be lost** on redeploy. For permanent uploads use a Render persistent disk (paid) or move
  image storage to a service such as Cloudinary.

### Step 4 - Frontend on Vercel
1. Vercel -> **Add New -> Project** -> import the repo.
2. **Root Directory:** `frontend` (Vite is detected automatically).
3. **Environment Variable:** `VITE_API_URL` = your Render URL (no trailing slash).
4. Deploy. `vercel.json` is included so refreshing pages like `/cart` works.

### Step 5 - Admin on Vercel (optional)
Repeat Step 4 as a second Vercel project with **Root Directory** `admin` and the same
`VITE_API_URL`.

> `VITE_API_URL` is baked in at build time. If you change it, **redeploy** the project.

---

## Troubleshooting

| Problem | Fix |
|---|---|
| `MONGO_URL is missing` / `DB connection failed` | Check `.env`, the DB user's password, and that Atlas Network Access allows `0.0.0.0/0`. |
| Site shows no dishes | Run `npm run seed` against the same database the backend uses. |
| Dishes don't load on Vercel | `VITE_API_URL` is wrong, has a trailing slash, or you forgot to redeploy after setting it. |
| Broken dish images | They load from `<API URL>/images/...`; check the backend is awake and the URL is right. |
| Login says wrong credentials as admin | Run `npm run seed` again, or check `ADMIN_EMAIL` / `ADMIN_PASSWORD`. |
| Port already in use | Change `PORT` in `backend/.env` (and `VITE_API_URL` to match). |
