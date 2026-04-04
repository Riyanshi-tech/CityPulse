"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirmBookingController = exports.createPaymentController = exports.createBookingController = void 0;
const booking_service_1 = require("../services/booking.service");
const createBookingController = async (req, res) => {
    try {
        const userId = req.user.id;
        const eventId = Number(req.params.eventId);
        const { seatIds } = req.body;
        if (!seatIds || seatIds.length === 0) {
            return res.status(400).json({
                message: "seatIds required"
            });
        }
        const booking = await (0, booking_service_1.createBooking)(userId, eventId, seatIds);
        res.json({
            message: "Booking created. Proceed to payment",
            booking
        });
    }
    catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};
exports.createBookingController = createBookingController;
const createPaymentController = async (req, res) => {
    try {
        const userId = req.user.id;
        const { bookingId } = req.body;
        if (!bookingId) {
            return res.status(400).json({
                message: "bookingId is required"
            });
        }
        const result = await (0, booking_service_1.createPaymentService)(bookingId, userId);
        res.json({
            message: "Payment created successfully",
            payment: result.payment,
            order: result.order
        });
    }
    catch (error) {
        const message = error?.error?.description ||
            error?.message ||
            JSON.stringify(error) ||
            "Payment creation failed";
        console.error("[createPayment] Error:", JSON.stringify(error));
        res.status(400).json({ message });
    }
};
exports.createPaymentController = createPaymentController;
const confirmBookingController = async (req, res) => {
    try {
        const userId = req.user.id;
        const { bookingId, paymentId, razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        const result = await (0, booking_service_1.confirmPaymentService)(bookingId, paymentId, razorpay_order_id, razorpay_payment_id, userId, razorpay_signature);
        res.json(result);
    }
    catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};
exports.confirmBookingController = confirmBookingController;
//# sourceMappingURL=booking.controller.js.map