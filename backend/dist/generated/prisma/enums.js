"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentGateway = exports.PaymentStatus = exports.TicketStatus = exports.BookingStatus = exports.SeatStatus = exports.SeatType = exports.VenueType = exports.EventCategory = exports.EventStatus = exports.userRole = void 0;
exports.userRole = {
    USER: 'USER',
    ADMIN: 'ADMIN',
    ORGANIZER: 'ORGANIZER'
};
exports.EventStatus = {
    DRAFT: 'DRAFT',
    PENDING: 'PENDING',
    APPROVED: 'APPROVED',
    REJECTED: 'REJECTED',
    CANCELLED: 'CANCELLED',
    COMPLETED: 'COMPLETED'
};
exports.EventCategory = {
    MUSIC: 'MUSIC',
    SPORTS: 'SPORTS',
    TECH: 'TECH',
    ART: 'ART',
    BUSINESS: 'BUSINESS',
    EDUCATION: 'EDUCATION',
    OTHER: 'OTHER'
};
exports.VenueType = {
    THEATER: 'THEATER',
    STADIUM: 'STADIUM',
    HALL: 'HALL',
    CONFERENCE_CENTER: 'CONFERENCE_CENTER',
    OPEN_GROUND: 'OPEN_GROUND',
    OTHER: 'OTHER'
};
exports.SeatType = {
    REGULAR: 'REGULAR',
    VIP: 'VIP',
    BALCONY: 'BALCONY'
};
exports.SeatStatus = {
    AVAILABLE: 'AVAILABLE',
    LOCKED: 'LOCKED',
    BOOKED: 'BOOKED'
};
exports.BookingStatus = {
    PENDING_PAYMENT: 'PENDING_PAYMENT',
    CONFIRMED: 'CONFIRMED',
    CANCELLED: 'CANCELLED',
    EXPIRED: 'EXPIRED'
};
exports.TicketStatus = {
    ISSUED: 'ISSUED',
    SCANNED: 'SCANNED',
    CANCELLED: 'CANCELLED',
    EXPIRED: 'EXPIRED'
};
exports.PaymentStatus = {
    CREATED: 'CREATED',
    PROCESSING: 'PROCESSING',
    SUCCESS: 'SUCCESS',
    FAILED: 'FAILED',
    REFUNDED: 'REFUNDED'
};
exports.PaymentGateway = {
    RAZORPAY: 'RAZORPAY',
    STRIPE: 'STRIPE',
    PAYTM: 'PAYTM'
};
//# sourceMappingURL=enums.js.map