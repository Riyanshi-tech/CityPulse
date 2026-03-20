import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import { createPaymentService,confirmPaymentService, createBooking } from "../services/booking.service";
import { verifyRazorpaySignature } from "../utils/verify";

export const createBookingController = async (
  req: AuthRequest,
  res: Response
) => {

  try {
    const userId = req.user.id;
    const eventId = Number(req.params.eventId);
    const { seatIds } = req.body;

    if (!seatIds || seatIds.length === 0) {
      return res.status(400).json({
        message: "seatIds required"
      });
    }

    const booking = await createBooking(userId, eventId, seatIds);

    res.json({
      message: "Booking created. Proceed to payment",
      booking
    });

  } catch (error: any) {
    res.status(400).json({
      message: error.message
    });
  }

};
export const createPaymentController = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const userId = req.user.id;
    const { bookingId } = req.body;

    // ✅ validation
    if (!bookingId) {
      return res.status(400).json({
        message: "bookingId is required"
      });
    }

    const payment = await createPaymentService(bookingId, userId);

    res.json({
      message: "Payment created successfully",
      payment
    });

  } catch (error: any) {
    res.status(400).json({
      message: error.message
    });
  }
};
export const confirmBookingController = async (
  req: AuthRequest,
  res: Response) => {
  try {
    const userId = req.user.id;
    const {bookingId,paymentId,razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const result = await confirmPaymentService(bookingId, paymentId, userId, razorpay_signature);
    const isValid = verifyRazorpaySignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    );

    if (!isValid) {
      return res.status(400).json({
        message: "Invalid payment signature"
      });
    }
    
    

    res.json(result);
  } catch (error: any) {
    res.status(400).json({
      message: error.message
    });
  }
};