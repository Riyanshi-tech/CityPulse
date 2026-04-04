"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const err_middleware_1 = require("./middlewares/err.middleware");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const auth_routes_1 = __importDefault(require("./auth/auth.routes"));
const event_routes_1 = __importDefault(require("./routes/event.routes"));
const venue_routes_1 = __importDefault(require("./routes/venue.routes"));
const booking_routes_1 = __importDefault(require("./routes/booking.routes"));
const seat_routes_1 = __importDefault(require("./routes/seat.routes"));
const review_routes_1 = __importDefault(require("./routes/review.routes"));
const favorite_routes_1 = __importDefault(require("./routes/favorite.routes"));
const ticket_routes_1 = __importDefault(require("./routes/ticket.routes"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use("/api/auth", auth_routes_1.default);
app.use('/api', user_routes_1.default);
app.use("/api", event_routes_1.default);
app.use("/api", venue_routes_1.default);
app.use("/api/booking", booking_routes_1.default);
app.use("/api", seat_routes_1.default);
app.use("/api/reviews", review_routes_1.default);
app.use("/api", favorite_routes_1.default);
app.use("/api/tickets", ticket_routes_1.default);
app.get('/', (req, res) => {
    res.send("citypulse api running");
});
app.use(err_middleware_1.errorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map