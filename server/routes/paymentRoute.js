const router = require("express").Router();
const Razorpay = require("razorpay");
const crypto = require("crypto");
const OrderModel = require("../models/customerOrderModel");

// Creating Order
router.post("/orders", async (req, res) => {
    const { amount, customername, product, address, city, email, contact } = req.body;

    try {
        const newOrder = await OrderModel.create({
            customername, product, amount, address, city, email, contact
        });

        const instance = new Razorpay({
            key_id: process.env.KEY_ID,
            key_secret: process.env.KEY_SECRET,
        });

        const options = {
            amount: amount * 100, // Amount in paise
            currency: "INR",
            receipt: crypto.randomBytes(10).toString("hex"),
        };

        instance.orders.create(options, (error, order) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ message: "Something went wrong!" });
            }
            res.status(200).json({ data: order });
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error!" });
    }
});

// Verifying the payment
router.post("/verify", async (req, res) => {
    try {
        const { razorpay_orderID, razorpay_paymentID, razorpay_signature } = req.body;

        const sign = razorpay_orderID + "|" + razorpay_paymentID;
        const resultSign = crypto
            .createHmac("sha256", process.env.KEY_SECRET)
            .update(sign.toString())
            .digest("hex");

        if (razorpay_signature === resultSign) {
            return res.status(200).json({ message: "Payment verified successfully" });
        } else {
            return res.status(400).json({ message: "Payment verification failed!" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error!" });
    }
});

module.exports = router;
