import { Router } from "express";
import { createTicket, getTickets } from "./controllers/ticket.controller";
import {
  createEvent,
  getAllEvents,
  getEventsByIds,
} from "./controllers/event.controller";
import { register, login } from "./controllers/user.controller";
import { authenticateToken } from "./middlewares/auth.middleware";

const router = Router();

router.post("/api/auth/register", register);
router.post("/api/auth/login", login);

router.get("/api/events/explore", authenticateToken, getAllEvents);
router.get("/api/events", authenticateToken, getEventsByIds);
router.post("/api/events/create", authenticateToken, createEvent);

router.get("/api/tickets", authenticateToken, getTickets);
router.post("/api/tickets/create", authenticateToken, createTicket);

export default router;
