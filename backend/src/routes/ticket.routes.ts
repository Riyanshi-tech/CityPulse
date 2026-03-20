import { scanTicketController } from "../controllers/ticket.controller";
import router from "./seat.routes";

router.post("/tickets/scan", scanTicketController);