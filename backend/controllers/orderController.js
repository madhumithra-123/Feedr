import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import foodModel from "../models/foodModel.js";

const DELIVERY_FEE = 2;

// placing user order (Cash on Delivery - no online payment)
const placeOrder = async (req, res) => {
  try {
    const { userId, items, address } = req.body;
    if (!Array.isArray(items) || items.length === 0) {
      return res.json({ success: false, message: "Your cart is empty" });
    }

    // Recalculate the total on the server from the real prices in the database,
    // so the amount can't be tampered with from the browser.
    const foods = await foodModel.find({ _id: { $in: items.map((i) => i._id) } });
    const priceById = new Map(foods.map((f) => [String(f._id), f.price]));
    let subtotal = 0;
    for (const item of items) {
      const price = priceById.get(String(item._id));
      if (price === undefined) {
        return res.json({ success: false, message: "An item in your cart is no longer available" });
      }
      subtotal += price * Number(item.quantity);
    }

    const newOrder = new orderModel({
      userId,
      items,
      amount: subtotal + DELIVERY_FEE,
      address,
      payment: false, // paid in cash on delivery
    });
    await newOrder.save();
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, orderId: newOrder._id, message: "Order placed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// user orders for frontend
const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// Listing orders for admin pannel
const listOrders = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    if (userData && userData.role === "admin") {
      const orders = await orderModel.find({});
      res.json({ success: true, data: orders });
    } else {
      res.json({ success: false, message: "You are not admin" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// api for updating status
const updateStatus = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    if (userData && userData.role === "admin") {
      await orderModel.findByIdAndUpdate(req.body.orderId, {
        status: req.body.status,
      });
      res.json({ success: true, message: "Status Updated Successfully" });
    } else {
      res.json({ success: false, message: "You are not an admin" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { placeOrder, userOrders, listOrders, updateStatus };
