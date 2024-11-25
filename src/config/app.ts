import fastify from "fastify";
import { NotFoundError } from "../errors/NotFoundError";
import { authRoutes } from "../routes/authRoutes";
import { guestRoutes } from "@/routes/guestRoutes";
import { productRoutes } from "@/routes/productRoutes";
import { UnauthorizedError } from "@/errors/UnauthorizedError";
import { dashboardRoutes } from "@/routes/dashboardRoutes";
import multipart from "@fastify/multipart";
import cors from "@fastify/cors";
import fastifyStatic from "@fastify/static";
import path from "path";
import { fileURLToPath } from "url";
import { orderRoutes } from "@/routes/orderRoutes";
import { routes } from "@/routes/routes";

const app = fastify();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.register(cors, {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Authorization", "Content-Type"]
});

app.register(multipart, {
    attachFieldsToBody: "keyValues",
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});

app.register(fastifyStatic, {
    root: path.join(__dirname, "../../uploads"),
    prefix: "/uploads/"
});

app.register(routes);

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

    console.log(error);

    return reply.status(500).send({
        message: error.message
    });
});

app.listen({
    port: 8080,
    host: "0.0.0.0"
});
