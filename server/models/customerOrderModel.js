const mongoose = require("mongoose");

const customerorderSchema = new mongoose.Schema({
  customername: String,
  product: String,
  amount: Number,
  address: String,
  city: String,
  email: String,
  contact: String,
  createdAt: { type: Date, default: Date.now }
});

const CustomerOrder = mongoose.models.customerorder || mongoose.model("customerorder", customerorderSchema);

module.exports = CustomerOrder;
