import { FastifyInstance } from "fastify";
import { authMiddleware } from "./middlewares/authMiddleware";

export const dashboardRoutes = (app: FastifyInstance) => {
  app.addHook("onRequest", authMiddleware);

  app.get("/", authMiddleware);
};