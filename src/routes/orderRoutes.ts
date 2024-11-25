import { ConsumptionsController } from "@/controllers/ComsumptionsController";
import { FastifyInstance } from "fastify";

export const orderRoutes = (app: FastifyInstance) => {
    app.get("/guests/:guestId/consumptions", ConsumptionsController.getOrder);
    app.post(
        "/guests/:guestId/consumptions",
        ConsumptionsController.updateComsumption
    );
    app.delete(
        "/guests/:guestId/consumptions",
        ConsumptionsController.deleteComsumption
    );
};
