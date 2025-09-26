const Booking = require("../models/booking");

// MAKE PAYMENT (guest only)
const makePayment = async (req, res) => {
  try {
    if (req.user.role !== "guest") {
      return res.status(403).json({ message: "Only guests can make payments" });
    }

    const { bookingId, amount, paymentMethod, paymentStatus } = req.body;

    if (!bookingId || !amount || !paymentMethod) {
      return res
        .status(400)
        .json({
          message: "Booking ID, amount and payment method are required",
        });
    }

    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    if (booking.guest.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Not authorized to pay for this booking" });
    }

    // Simulate payment process (replace with Stripe/PayPal integration)
    const payment = {
      amount,
      method: paymentMethod,
      status: paymentStatus || "paid",
      paidAt: new Date(),
    };

    booking.payment = payment;
    booking.status = "confirmed"; // mark booking as confirmed after payment
    await booking.save();

    res.status(200).json({ message: "Payment successful", booking });
  } catch (error) {
    console.error("Payment error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET PAYMENT INFO (guest)
const getPaymentByBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.bookingId);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    if (req.user.role === "guest" && booking.guest.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Not authorized to view this payment" });
    }

    res.status(200).json({ payment: booking.payment });
  } catch (error) {
    console.error("Get payment error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET ALL PAYMENTS (admin only)
const getAllPayments = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Only admins can view all payments" });
    }

    const bookings = await Booking.find({
      "payment.status": { $exists: true },
    }).select("guest hotel payment");
    res.status(200).json(bookings);
  } catch (error) {
    console.error("Get all payments error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  makePayment,
  getPaymentByBooking,
  getAllPayments,
};
