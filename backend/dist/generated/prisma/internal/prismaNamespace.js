"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineExtension = exports.NullsOrder = exports.QueryMode = exports.SortOrder = exports.PaymentScalarFieldEnum = exports.FavoriteScalarFieldEnum = exports.ReviewScalarFieldEnum = exports.TicketScalarFieldEnum = exports.BookingScalarFieldEnum = exports.EventSeatScalarFieldEnum = exports.SeatScalarFieldEnum = exports.VenueScalarFieldEnum = exports.EventsScalarFieldEnum = exports.UserScalarFieldEnum = exports.RefreshTokenScalarFieldEnum = exports.TransactionIsolationLevel = exports.ModelName = exports.AnyNull = exports.JsonNull = exports.DbNull = exports.NullTypes = exports.prismaVersion = exports.getExtensionContext = exports.Decimal = exports.Sql = exports.raw = exports.join = exports.empty = exports.sql = exports.PrismaClientValidationError = exports.PrismaClientInitializationError = exports.PrismaClientRustPanicError = exports.PrismaClientUnknownRequestError = exports.PrismaClientKnownRequestError = void 0;
const runtime = __importStar(require("@prisma/client/runtime/client"));
exports.PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
exports.PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
exports.PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
exports.PrismaClientInitializationError = runtime.PrismaClientInitializationError;
exports.PrismaClientValidationError = runtime.PrismaClientValidationError;
exports.sql = runtime.sqltag;
exports.empty = runtime.empty;
exports.join = runtime.join;
exports.raw = runtime.raw;
exports.Sql = runtime.Sql;
exports.Decimal = runtime.Decimal;
exports.getExtensionContext = runtime.Extensions.getExtensionContext;
exports.prismaVersion = {
    client: "7.5.0",
    engine: "280c870be64f457428992c43c1f6d557fab6e29e"
};
exports.NullTypes = {
    DbNull: runtime.NullTypes.DbNull,
    JsonNull: runtime.NullTypes.JsonNull,
    AnyNull: runtime.NullTypes.AnyNull,
};
exports.DbNull = runtime.DbNull;
exports.JsonNull = runtime.JsonNull;
exports.AnyNull = runtime.AnyNull;
exports.ModelName = {
    RefreshToken: 'RefreshToken',
    User: 'User',
    Events: 'Events',
    Venue: 'Venue',
    Seat: 'Seat',
    EventSeat: 'EventSeat',
    Booking: 'Booking',
    Ticket: 'Ticket',
    Review: 'Review',
    Favorite: 'Favorite',
    Payment: 'Payment'
};
exports.TransactionIsolationLevel = runtime.makeStrictEnum({
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
});
exports.RefreshTokenScalarFieldEnum = {
    id: 'id',
    token: 'token',
    userId: 'userId',
    expiresAt: 'expiresAt',
    createdAt: 'createdAt'
};
exports.UserScalarFieldEnum = {
    id: 'id',
    username: 'username',
    password: 'password',
    firstName: 'firstName',
    lastName: 'lastName',
    createdAt: 'createdAt',
    email: 'email',
    role: 'role',
    updatedAt: 'updatedAt'
};
exports.EventsScalarFieldEnum = {
    id: 'id',
    title: 'title',
    description: 'description',
    category: 'category',
    startDateTime: 'startDateTime',
    endDateTime: 'endDateTime',
    city: 'city',
    address: 'address',
    isOnline: 'isOnline',
    onlineLink: 'onlineLink',
    totalTickets: 'totalTickets',
    soldTickets: 'soldTickets',
    status: 'status',
    isApproved: 'isApproved',
    organizerId: 'organizerId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    venueId: 'venueId'
};
exports.VenueScalarFieldEnum = {
    id: 'id',
    name: 'name',
    city: 'city',
    address: 'address',
    type: 'type',
    capacity: 'capacity',
    isAvailable: 'isAvailable',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.SeatScalarFieldEnum = {
    id: 'id',
    seatType: 'seatType',
    venueId: 'venueId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.EventSeatScalarFieldEnum = {
    id: 'id',
    eventId: 'eventId',
    seatType: 'seatType',
    seatNumber: 'seatNumber',
    seatId: 'seatId',
    bookingId: 'bookingId',
    status: 'status',
    lockedAt: 'lockedAt',
    bookedAt: 'bookedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    lockedById: 'lockedById'
};
exports.BookingScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    eventId: 'eventId',
    status: 'status',
    totalAmount: 'totalAmount',
    currency: 'currency',
    expiresAt: 'expiresAt',
    confirmedAt: 'confirmedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.TicketScalarFieldEnum = {
    id: 'id',
    bookingId: 'bookingId',
    eventSeatId: 'eventSeatId',
    userId: 'userId',
    eventId: 'eventId',
    ticketCode: 'ticketCode',
    qrCodeData: 'qrCodeData',
    status: 'status',
    issuedAt: 'issuedAt',
    scannedAt: 'scannedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.ReviewScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    eventId: 'eventId',
    rating: 'rating',
    comment: 'comment',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.FavoriteScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    eventId: 'eventId',
    createdAt: 'createdAt'
};
exports.PaymentScalarFieldEnum = {
    id: 'id',
    bookingId: 'bookingId',
    userId: 'userId',
    amount: 'amount',
    currency: 'currency',
    status: 'status',
    gateway: 'gateway',
    gatewayOrderId: 'gatewayOrderId',
    gatewayPaymentId: 'gatewayPaymentId',
    gatewaySignature: 'gatewaySignature',
    failureReason: 'failureReason',
    refundedAt: 'refundedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    completedAt: 'completedAt'
};
exports.SortOrder = {
    asc: 'asc',
    desc: 'desc'
};
exports.QueryMode = {
    default: 'default',
    insensitive: 'insensitive'
};
exports.NullsOrder = {
    first: 'first',
    last: 'last'
};
exports.defineExtension = runtime.Extensions.defineExtension;
//# sourceMappingURL=prismaNamespace.js.map