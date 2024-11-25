import { FastifyInstance } from "fastify";
import { authRoutes } from "./authRoutes";
import { guestRoutes } from "./guestRoutes";
import { productRoutes } from "./productRoutes";
import { dashboardRoutes } from "./dashboardRoutes";
import { orderRoutes } from "./orderRoutes";
import { roomRoutes } from "./roomRoutes";

export const routes = (app: FastifyInstance) => {
    app.register(authRoutes);
    app.register(guestRoutes);
    app.register(productRoutes);
    app.register(dashboardRoutes);
    app.register(orderRoutes);
    app.register(roomRoutes);
};
