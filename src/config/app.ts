import fastify from "fastify";
import { NotFoundError } from "../errors/NotFoundError";
import { authRoutes } from "../routes/authRoutes";
import { guestRoutes } from "@/routes/guestRoutes";
import { productRoutes } from "@/routes/productRoutes";
import { UnauthorizedError } from "@/errors/UnauthorizedError";
import { dashboardRoutes } from "@/routes/dashboardRoutes";

const app = fastify();

app.register(require("@fastify/cors"), {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Authorization", "Content-Type"]
});

app.register(require("@fastify/jwt"), {
    secret: process.env.JWT_SECRET
});

app.register(require("@fastify/multipart"), {
    limits: {
        fileSize: 6 * 1024 * 1024
    }
});

app.register(require("@fastify/static"), {
    root: require("path").join(__dirname, "uploads"),
    prefix: "/uploads/"
});

app.register(authRoutes);
app.register(guestRoutes);
app.register(productRoutes);
app.register(dashboardRoutes);

app.setErrorHandler(async (error, request, reply) => {
    if (error instanceof NotFoundError) {
        return reply.status(404).send({
            message: error.message
        });
    }

    if (error instanceof UnauthorizedError) {
        return reply.status(401).send({
            message: error.message
        });
    }

    return reply.status(500).send({
        message: error.message
    });
});

app.listen({
    port: 8080,
    host: "0.0.0.0"
});
