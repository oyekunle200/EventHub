import mongoose from "mongoose";
import payment from "../models/payment.model.js";
import booking from "../models/booking.model.js";
import user from "../models/user.model.js";

export const createPayment = async (req, res) => {
    try {
        const { user, booking, amount, reference, } = req.body;
         const payment = await Payment.create({
      user: user,
      booking: booking,
      amount: booking.amount,
      status: "PENDING",
      reference,
    });

    return res.status(201).json({
      success: true,
      message: "Payment created successfully",
      payment,
    });
  } catch (error) {
    console.error("Create payment error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong while creating payment",
    });
  }
};
const verifyPayment = async (req, res) => {
  try {
    const { reference } = req.params;
    const payment = await Payment.findOne({ reference });

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }
    if (payment.status === "SUCCESS") {
      return res.status(400).json({
        success: false,
        message: "Payment already verified",
      });
    }
    payment.status = "SUCCESS";
    payment.paymentDate = new Date();

    await payment.save();
    return res.status(200).json({
      success: true,
      message: "Payment verified successfully",
      payment,
    });

  } catch (error) {
    
  }
};
 const getPayment = async (req, res) => {
  try {
    const { id } = req.params;
     const payment = await Payment.findById(id).populate("user", "name email") .populate("booking");

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }
return res.status(200).json({
      success: true,
      message: "Payment gotten successfully",
      payment,
    });
  } catch (error) {
    console.error("Get payment error:", error);
return res.status(500).json({
      success: false,
      message: "Something went wrong while getting payment",
    });
  }
}
