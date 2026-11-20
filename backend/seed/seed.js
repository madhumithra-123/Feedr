// Usage: npm run seed
// Creates (1) an admin user and (2) the sample menu, using the sample images in /uploads.
// Safe to run more than once - it skips anything that already exists.
import "dotenv/config";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import foodModel from "../models/foodModel.js";
import userModel from "../models/userModel.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const foods = JSON.parse(fs.readFileSync(path.join(__dirname, "foods.json"), "utf8"));
const uploadsDir = path.join(__dirname, "..", "uploads");

const run = async () => {
  if (!process.env.MONGO_URL) throw new Error("MONGO_URL is missing in .env");
  await mongoose.connect(process.env.MONGO_URL);
  console.log("DB Connected");

  // ---- admin user ----
  const email = process.env.ADMIN_EMAIL || "admin@feedr.com";
  const password = process.env.ADMIN_PASSWORD || "admin12345";
  let admin = await userModel.findOne({ email });
  if (!admin) {
    const salt = await bcrypt.genSalt(Number(process.env.SALT) || 10);
    admin = await userModel.create({
      name: "Admin",
      email,
      password: await bcrypt.hash(password, salt),
      role: "admin",
    });
    console.log(`Admin created  ->  ${email} / ${password}`);
  } else if (admin.role !== "admin") {
    admin.role = "admin";
    await admin.save();
    console.log(`Existing user ${email} promoted to admin`);
  } else {
    console.log(`Admin already exists (${email})`);
  }

  // ---- sample menu ----
  const files = fs.readdirSync(uploadsDir);
  let added = 0;
  for (const f of foods) {
    const image = files.find((name) => name.endsWith(f.imageKey));
    if (!image) { console.log(`  ! image for "${f.name}" not found, skipped`); continue; }
    const exists = await foodModel.findOne({ name: f.name });
    if (exists) continue;
    await foodModel.create({
      name: f.name, description: f.description, price: f.price,
      category: f.category, image,
    });
    added++;
  }
  console.log(`Menu: ${added} dishes added, ${foods.length - added} already existed`);
  await mongoose.disconnect();
};

run().catch((e) => { console.error(e.message); process.exit(1); });
