import { AuthController } from "@/controllers/AuthController";
import { FastifyInstance } from "fastify";

export const authRoutes = (app: FastifyInstance) => {
    app.post("/login", AuthController.login);
    app.post("/register", AuthController.register);
};
