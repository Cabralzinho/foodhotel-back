import { FastifyInstance } from "fastify";
import { ProductController } from "../controllers/ProductController";
import { authMiddleware } from "./middlewares/authMiddleware";

export const productRoutes = (app: FastifyInstance) => {
    app.addHook("onRequest", authMiddleware);

    app.post("/products", ProductController.createProduct);
    app.get("/products", ProductController.getProducts);
    app.delete("/products/:id", ProductController.deleteProduct);
    app.put("/products/:id", ProductController.updateProduct);
};
