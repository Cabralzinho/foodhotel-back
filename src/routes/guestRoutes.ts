import { FastifyInstance } from "fastify";
import { GuestController } from "../controllers/GuestController";
import { authMiddleware } from "./middlewares/authMiddleware";

export const guestRoutes = (app: FastifyInstance) => {
    app.addHook("onRequest", authMiddleware);

    app.get("/guests", GuestController.getGuests);
    app.post("/guests", GuestController.createGuest);
    app.delete("/guests/:id", GuestController.deleteGuest);
};
